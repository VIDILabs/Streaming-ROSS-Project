import urllib
import json
import tornado.websocket
import time
import base64
import pandas as pd
import logging

from ross_vis.DataModel import RossData
from ross_vis.DataCache import RossDataCache
from ross_vis.Transform import flatten, flatten_list
from ross_vis.StreamAnalysis import StreamDataAnalytics

class WebSocketHandler(tornado.websocket.WebSocketHandler):
    waiters = set()
    cache = RossDataCache()
    cache_size = 100
    KpData = []
    params = None

    def open(self):
        self.method = 'get' 
        self.algo = {
            'cpd': 'aff',
            'pca': 'prog_inc',
            'causality': 'var',
            'clustering': 'evostream',
        }
        self.stream_count = 0
        self.stream_objs = {}
        self.update = 1
        WebSocketHandler.waiters.add(self)

    def process(self, stream):  
        ret = {}
        self.calc_metrics = ['RbSec', 'RbPrim', 'NetworkSend']
        for idx, metric in enumerate(self.calc_metrics):
            print('Calculating results for {0}'.format(metric))
            if self.stream_count == 0: 
                self.stream_data = StreamDataAnalytics(stream, self.granularity, self.cluster_metric, self.calc_metrics, self.causality_metrics, self.communication_metrics, self.time_domain, metric)
                self.stream_objs[metric] = self.stream_data
                ret[metric] = self.stream_data.format()
                ret['data'] = [{}, {}]
            elif self.stream_count < 2: 
                stream_obj = self.stream_objs[metric]
                self.stream_data = stream_obj.update(stream)
                ret[metric] = self.stream_data.format()
                ret['data'] = stream_obj.comm_data_base(None)
            else:
                stream_obj = self.stream_objs[metric]
                if(self.update == 1):
                    self.stream_data = stream_obj.update(stream)
                else:
                    self.stream_data = stream_obj.deupdate(stream)
                ret[metric] = stream_obj.run_methods(self.stream_data, self.algo)
                ret['data'] = stream_obj.comm_data_base(None)
        return ret 
    
    def pre_calc(self):
        for idx, metric in enumerate(self.metric):
            ret = {}
            filename = self.stream_count + self.metric + '.csv'
            print("Reading from {0}".format(filename))
            results = pd.read_csv(filename)
            schema = {k:self.process_type(type(v).__name__) for k,v in self.df.iloc[0].items()}
            ret[metric] = (results.to_dict('records'), schema)
        return ret

    def on_message(self, message, binary=False):
        req = json.loads(message)

        # Tells the server to load the specific data from the bin file.
        if('data' in req and req['data'] in ['PeData', 'KpData', 'LpData']):
            self.data_attribute = req['data']

        # Kinds of request methods that can be queried in the server
        if('method' in req and req['method'] in ['stream', 'get', 'set', 'get-count', 'pre-calc', 'comm-data-interval']):
            self.method = req['method']
        
        # Granuality selected by the user. 
        if('granularity' in req and req['granularity'] in ['Peid', 'KpGid', 'Lpid', 'Kpid']):
            self.granularity = req['granularity']

        # y-axis metric
        if('timeDomain' in req and req['timeDomain'] in ['LastGvt', 'VirtualTime', 'RealTs']):
            self.time_domain = req['timeDomain']

        # Not used. (For different algorithms to be executied)
        if('cpdMethod' in req and req['cpdMethod'] in ['aff', 'stream']):
            self.algo.cpd = req['cpdMethod']

        # Not used. (For different algorithms to be executied)
        if('pcaMethod' in req and req['pcaMethod'] in ['prog_inc', 'inc']):
            self.algo.pca = req['pcaMethod']

        # For var
        if('causalityMethod' in req and req['causalityMethod'] in ['var']):
            self.algo.causality = req['causalityMethod']
    
        # For clustering
        if('clusteringMethod' in req and req['clusteringMethod'] in ['evostream']):
            self.algo.clustering = req['clusteringMethod']

        if('clusterMetric' in req):
            self.cluster_metric = req['clusterMetric']   
        else:
            print("Cluster metric not assigned, using Secondary rollback instead")
            self.cluster_metric = 'RbSec'

        if("communicationMetrics" in req):
            self.communication_metrics = req['communication_metrics']
        else:
            print("Communication metrics not assigned, using default list of metrics instead")
            self.communication_metrics =  ['CommData', 'RbTotal', 'RbSec', 'LastGvt', 'RbPrim']

        if('streamCount' in req):
            self.stream_count = req['streamCount']

        if('update' in req):
            self.update = req['update']
        
        if('request' in req):
            self.request = req['request']

        if('socket_request' in req):
            self.socket_request = req['socket_request']
        else:
            self.socket_request = None

        if('calcMetrics' in req):
            self.calc_metrics = req['calcMetrics']
        else:
            print("Calc metrics not assigned, using default list of metrics instead")
            # self.calc_metrics = ['NetworkRecv', 'NetworkSend', 'NeventProcessed', 'RbSec', 'RbTotal']

        if('causalityMetrics' in req):
            self.causality_metrics = req['causalityMetrics']
        else:
            self.causality_metrics = ['NetworkRecv', 'NetworkSend', 'NeventProcessed', 'NeventRb', 'RbSec', 'RbTime', 'RbTotal', 'RbPrim']

        if('play' in req):
            self.play = req['play']
        else:
            self.play = 0

        if(self.method == 'stream' and self.request == 0 and self.play == 1):
            rd = RossData([self.data_attribute])
            sample = WebSocketHandler.cache.data[self.stream_count]
            stream = flatten(rd.fetch(sample))
            res = self.process(stream)
            msg = {}
            for idx, metric in enumerate(self.calc_metrics):
                r = res.get(metric)
                result = r[0]
                schema = r[1]
               
                msg[metric] = {
                    'result': r[0],
                    'schema': r[1]
                }

            if(self.stream_count > 0):
                msg['comm'] = res.get('data')

        if(self.method == 'pre-calc' and self.request == 0):
            res = self.pre_calc()
            msg = {}
            for idx, metric in enumerate(self.metric):
                r = res.get(metric)
                result = r[0]
                schema = r[1]
                msg[metric] = {
                    'result': result,
                    'schema': schema
                }
            self.write_message(msg)

        if(self.method == 'stream-next' and self.request == 0):
            rd = RossData([self.data_attribute])
            sample = WebSocketHandler.cache.data.pop(0)
            msg = {'data': flatten(rd.fetch(sample))}
            self.write_message(msg)

        if(self.method == 'get' and self.request == 0):
            data = WebSocketHandler.cache.export_dict(self.data_attribute)
            schema = {k:type(v).__name__ for k,v in data[0].items()}
            self.write_message({
                'data': data,
                'schema': schema
            })
            
            msg = {'data': data, 'schema': schema}
            if(WebSocketHandler.params != None):
                msg['params'] = self.params
            self.write_message(msg)

        if(self.method == 'get-count' and self.request == 0):
            data = WebSocketHandler.cache.export_dict_count(self.data_attribute, self.stream_count)
            schema = {k: type(v).__name__ for k, v in data[0].items()}
            self.write_message({
                'data': data,
                'schema': schema
            })

        if(self.method == 'set' and self.request == 0):
            WebSocketHandler.params = req['params']
            self.write_message({'status': 'ok'})
            # print(WebSocketHandler.params)

        if(self.socket_request == 'comm-data-interval'):
            if('interval' in req):
                self.interval = req['interval']
            msg['aggr_comm'] = self.stream_objs[self.cluster_metric].comm_data_interval(self.interval)

        if(self.socket_request == 'comm-data-base'):
            msg = {}
            if('base_time' in req):
                self.base_time = req['base_time']
            msg['views'] = 1
            msg['base_comm'] = self.stream_objs[self.cluster_metric].comm_data_base(self.base_time)

        if(self.socket_request == 'comm-data-cpd'):
            msg = {}
            if('cpd ' in req):
                self.cpd = req['cpd']
            print(req)
            msg['views'] = 1
            msg['cpd_comm'] = self.stream_objs[self.cluster_metric].comm_data_base(req['cpd'])

        self.write_message(msg)


    def on_close(self):
        print('connection closed')
        WebSocketHandler.waiters.remove(self)

    def check_origin(self, origin):
        return True
        # parsed_origin = urllib.parse.urlparse(origin)
        # return parsed_origin.netloc.startswith("localhost:")

    @classmethod
    def push_updates(cls, data):
        for waiter in cls.waiters:
            try:
                waiter.write_message(data)
            except:
                logging.error("Error sending message", exc_info=True)        
