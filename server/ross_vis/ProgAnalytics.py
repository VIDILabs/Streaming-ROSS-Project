import pandas as pd
import numpy as np
import time
from collections import defaultdict

# Change point detection methods
from change_point_detection.ffstream.aff_cpp import AFF
from change_point_detection.pca_stream_cpd import pca_stream_cpd_cpp
from change_point_detection.pca_aff_cpd import pca_aff_cpd_cpp

# PCA methods
from ross_vis.prog_inc_pca import ProgIncPCA
#from ross_vis.inc_pca import IncPCA

# Clustering methods
from ross_vis.prog_evo_stream import ProgEvoStream
from ross_vis.prog_kmeans import ProgKMeans

# Causality methods
from ross_vis.causality import Causality

#from timer import Timer


class PCAAFFCPD(pca_aff_cpd_cpp.PCAAFFCPD):
    def __init__(self,
                 alpha,
                 eta=0.01,
                 burn_in_length=10,
                 inc_pca_forgetting_factor=1.0):
        super().__init__(alpha, eta, burn_in_length, inc_pca_forgetting_factor)

    def feed(self, new_time_point):
        return super().feed(new_time_point)

    def feed_with_pca_result_return(self, new_time_point):
        return super().feed_with_pca_result_return(new_time_point)

    def predict(self):
        return super().predict()

    def feed_predict(self, new_time_point):
        return super().feed_predict(new_time_point)

class PCAStreamCPD(pca_stream_cpd_cpp.PCAStreamCPD):
    def __init__(self,
                 win_size,
                 theta_factor=0.0,
                 divergence_metric="area",
                 thres_total_ex_var_ratio=0.99,
                 delta=0.005,
                 bin_width_factor=2.0):
        super().__init__(win_size, theta_factor, divergence_metric,
                         thres_total_ex_var_ratio, delta, bin_width_factor)

    def feed_predict(self, new_time_point):
        return super().feed_predict(new_time_point)

class StreamData:
    def __init__(self, data, granularity, cluster_metric, calc_metrics, causality_metrics, communication_metrics, time_domain, this_metric):
        self.count = 0
        self.granularity = granularity
        self.time_domain = time_domain
        self.communication_metrics = communication_metrics
        self.calc_metrics = calc_metrics
        self.causality_metrics = causality_metrics
        self.cluster_metric = cluster_metric
        self.this_metric = this_metric

        self.df = pd.DataFrame(data)
        self.df['RbPrim'] = self.df['RbTotal'] - self.df['RbSec']
        self.incoming_df = self.df
        self.new_data_df = self.df

        self.pe_count = len(self.df['Peid'].unique())
        self.kp_count = len(self.df['Kpid'].unique())
        
        self.metric_df = self.preprocess(self.df)
        # set new_data_df for the first stream as metric_df
        self.whole_data_df = self.metric_df
        
        # If granularity is KP, send both Kp and Pe data. 
        if(self.granularity == 'Kpid'):
            self.communication_metrics.append(self.granularity)
            self.communication_metrics.append('Peid')
        else:
            self.communication_metrics.append(self.granularity)

        self.algo_clustering = 'kmeans'

        self.cpd = CPD()
        self.pca = PCA()
        self.causal = Causal()
        self.clustering = Clustering()
        self.results = pd.DataFrame(data=self.df[granularity].astype(np.float64).tolist(), columns=[granularity])
        self._time = self.metric_df.columns.get_level_values(1).tolist()
        self.granIDs = self.df[self.granularity]
        #self.timer = Timer()


    def _format(self):
        # Convert metric_df to ts : { id1: [timeSeries], id2: [timeSeries] }    
        ret = {}
        columns = self.metric_df.columns.get_level_values(level=self.time_domain).tolist()
        ids = self.metric_df.T.columns.tolist()
        for i in ids:
            ret[i] = self.metric_df.T[(i)].tolist()
        ret_df = pd.DataFrame.from_dict(ret)
        schema = {k:type(v).__name__ for k,v in ret_df[0].items()}
        return({
            'data': ret,
            'schema': schema
        })

    def process_type(self, type):
        if(type == 'int64'):
            return 'int'
        if(type == 'float64'):
            return 'float'
        if(type == 'list'):
            return 'int'

    def format(self):
        schema = {k:self.process_type(type(v).__name__) for k,v in self.df.iloc[0].items()}
        return  (self.results.to_dict('records'), schema)

    def kp_matrix(self):
        ret = np.zeros([self.incoming_df.shape[0], self.incoming_df.shape[0]])
        for idx, row in self.incoming_df.iterrows():
            ret[idx] = row['CommData']
        return ret
    
    def comm_data(self):
        if(self.granularity == 'KpGid'):
            self.communication_metrics.append('Peid')
            self.communication_metrics.append('Kpid')

        # Remove unnecessary columns from df
        df = self.incoming_df[self.communication_metrics]
        
        # columns get duplicated somehow. Not sure why?
        df = df.loc[:,~df.columns.duplicated()]

        # Group by Pe to Pe level data.
        group_df = df.groupby(['Peid'])

        # Number of PEs = number of groups
        pe_count = group_df.ngroups

        min_pe_comm = 0
        max_pe_comm = 0
        pe_comm_arr = []
        # Loop through each key.
        for key, group in group_df:
            pe_df = group_df.get_group(key)

            # Get the required information.
            comm_data_series = pe_df['CommData']
            kpid = pe_df['Kpid']
            peid = pe_df['Peid'].unique()[0]
 
            # Calculate the inter communication between the PEs.
            mean_comm = []
            for idx, row in enumerate(comm_data_series):
                kp_mean_comm = []
                for i in range(0, pe_count):
                    pe_comm = row[i*self.kp_count: (i+1)*self.kp_count]
                    mean_pe_comm = np.sum(np.array(pe_comm), axis=0)
                    kp_mean_comm.append(mean_pe_comm)
                mean_comm.append(kp_mean_comm)
            
            # Calculate the mean across all KPs
            pe_comm_np = np.mean(np.array(mean_comm).T, axis=1)
            pe_comm_list = pe_comm_np.tolist()
            min_pe_comm = min(min_pe_comm, np.min(pe_comm_np))
            max_pe_comm = max(max_pe_comm, np.max(pe_comm_np))
            pe_comm_arr.append(pe_comm_list)

        ret_df = self.incoming_df[self.communication_metrics]
        schema = {k:self.process_type(type(v).__name__) for k,v in ret_df.iloc[0].items()}
        return {
            "kp_comm": ret_df.to_dict('records'),
            "pe_comm": pe_comm_arr,
            "kp_count": self.kp_count,
            "pe_count": self.pe_count,
            "min_comm": min_pe_comm,
            "max_comm": max_pe_comm,
            "schema": schema
        }
    
    def comm_df_time(self, df, time):
        # Drop columns we dont need.
        df = self.df[self.communication_metrics]

        # columns get duplicated somehow. Not sure why?
        df = df.loc[:,~df.columns.duplicated()]

        # Get the rows with self.time_domain == time. 
        time1 = time - 100.0
        time2 = time + 100.0
        # print("Times: {0}, {1}", time1, time2)
        df = df.loc[df[self.time_domain].between(time1, time2) == True]

        # print("df info: {1} shape {0}, ".format(df.shape, df[self.time_domain].unique()))
        return df

    ################################################
    # PE and KP communication for normal Comm data.
    ################################################
    def comm_df_to_pe_matrix(self, df, group_by):
        group_df = df.groupby([group_by])

        min_pe_comm = 0
        max_pe_comm = 0
        pe_comm_arr = []
        # Loop through each key.
        for key, group in group_df:
            # Group the df. 
            pe_df = group_df.get_group(key)

            # Get the required information.
            comm_data_series = pe_df['CommData']
            kpid = pe_df['Kpid']
            peid = pe_df['Peid'].unique()[0]

            # Calculate the inter communication between the PEs.
            mean_comm = []
            for idx, row in enumerate(comm_data_series):
                kp_mean_comm = []
                for i in range(0, self.pe_count):
                    pe_comm = row[i*self.kp_count: (i+1)*self.kp_count]
                    mean_pe_comm = np.sum(np.array(pe_comm), axis=0)
                    kp_mean_comm.append(mean_pe_comm)
                mean_comm.append(kp_mean_comm)
            
            # Calculate the mean across all KPs
            pe_comm_np = np.mean(np.array(mean_comm).T, axis=1)
            pe_comm_list = pe_comm_np.tolist()
            min_pe_comm = min(min_pe_comm, np.min(pe_comm_np))
            max_pe_comm = max(max_pe_comm, np.max(pe_comm_np))
            pe_comm_arr.append(pe_comm_list)
        return [pe_comm_arr, min_pe_comm, max_pe_comm]

    def comm_df_to_kp_matrix(self, df, group_by):
        group_df = df.groupby([group_by])

        # create the matrix we need to send. 
        number_of_pes = self.pe_count*self.kp_count
        kp_comm_matrix_shape = (number_of_pes, number_of_pes)
        kp_comm_matrix = np.zeros(shape=kp_comm_matrix_shape)
        
        # Loop through the communication at each sampled timepoint.
        for key, item in group_df:
            key_df = group_df.get_group(key)

            number_of_times = len(key_df[self.time_domain].unique())
            kp_comm_time_matrix_shape = (number_of_times, number_of_pes)

            kp_matrix = np.zeros(shape=kp_comm_time_matrix_shape)
            for idx, row in key_df.iterrows():
                # Get index of this sample. 
                peid = row['Peid']
                kpid = row['Kpid']
                index = peid*self.kp_count + kpid

                kp_time_group_df = key_df.groupby([self.time_domain])

                time_idx = 0
                for time, time_item in kp_time_group_df:
                    time_df = kp_time_group_df.get_group(time)
                    kp_matrix[time_idx] = time_df['CommData'].tolist()[0]
                    time_idx += 1
                    
            # Sum the matrices we got. 
            kp_matrix_sum = kp_matrix.sum(axis = 0)
        
            # For average of the runtimes use this. 
            # kp_matrix_avg = np.divide(kp_matrix_sum, number_of_pes)
            
            kp_comm_matrix[index] = kp_matrix_sum
        
        return kp_comm_matrix

    ########################################################
    # Base communication
    ########################################################
    def comm_data_base(self, time):
        if time == None:
            time = self.incoming_df[self.time_domain].unique()[0]
        print('-=----------------' +  str(time) + '------------------------=-')
        print(self.incoming_df[self.time_domain].unique()[0])
        if(self.granularity == 'KpGid'):
            self.communication_metrics.append('Peid')
            self.communication_metrics.append('Kpid')

        df_time = self.comm_df_time(self.df, time)
        df_time = df_time.sort_values(['KpGid'])
        print('Base dataframe shape: {0}'.format(df_time.shape))
        pe_matrix_results = self.comm_df_to_pe_matrix(df_time, 'Peid')
        kp_matrix = self.comm_df_to_kp_matrix(df_time, 'KpGid')  
        return {
            'data': df_time.to_dict('records'),
            "kp_comm": kp_matrix.tolist(),
            "pe_comm": pe_matrix_results[0],
            "kp_count": self.kp_count,
            "pe_count": self.pe_count,
            "min_comm": pe_matrix_results[1],
            "max_comm": pe_matrix_results[2],
        }

    ########################################################
    # Interval communication
    ########################################################
    def comm_data_interval(self, interval):
        if(self.granularity == 'KpGid'):
            self.communication_metrics.append('Peid')
            self.communication_metrics.append('Kpid')

        # Drop columns we dont need.
        df = self.df[self.communication_metrics]
        
        # columns get duplicated somehow. Not sure why?
        df = df.loc[:,~df.columns.duplicated()]

        # Filter between the time ranges
        filter_df = df.loc[df[self.time_domain].between(interval[0], interval[1]) == True]
        
        # Remove duplicated columns. Not sure why this happens.
        filter_df = filter_df.loc[:,~filter_df.columns.duplicated()]

        # Find number of Kps in the run.
        pe_count = len(self.df['Peid'].unique())
        kp_count = len(self.df['Kpid'].unique())
        
        # Group by the KpGid
        # group_df = filter_df.groupby(['Peid', 'Kpid'])
        group_df = filter_df.groupby(['KpGid'])
        unique_ids = filter_df[self.granularity].unique()
        
        # Drop columns in the return df
        # kp_comm_df = self.incoming_df[self.communication_metrics]
        
        # create the matrix we need to send. 
        number_of_pes = pe_count*kp_count
        kp_comm_matrix_shape = (number_of_pes, number_of_pes)
        kp_comm_matrix = np.zeros(shape=kp_comm_matrix_shape)
        
        # Loop through the communication at each sampled timepoint.
        for key, item in group_df:
            key_df = group_df.get_group(key)

            number_of_times = len(key_df[self.time_domain].unique())
            kp_comm_time_matrix_shape = (number_of_times, number_of_pes)

            # print('=========================-' + str(key) + '-===================================')
            kp_matrix = np.zeros(shape=kp_comm_time_matrix_shape)
            for idx, row in key_df.iterrows():
                # Get index of this sample. 
                peid = row['Peid']
                kpid = row['Kpid']
                index = peid*kp_count + kpid

                kp_time_group_df = key_df.groupby([self.time_domain])

                time_idx = 0
                for time, time_item in kp_time_group_df:
                    time_df = kp_time_group_df.get_group(time)
                    kp_matrix[time_idx] = time_df['CommData'].tolist()[0]
                    time_idx += 1
                    
            # Sum the matrices we got. 
            kp_matrix_sum = kp_matrix.sum(axis = 0)
            # print('-==============================================-')
            # print(kp_matrix_sum)

            # For average of the runtimes use this. 
            kp_matrix_avg = np.divide(kp_matrix_sum, number_of_times)
            
            # if(len(kp_comm_matrix[index]) != 0 ):
            #     print('Here')
            #     kp_comm_matrix[index] = np.add(kp_comm_matrix[index], kp_matrix_sum)  
            #     # print(kp_comm_matrix[index])          
            # else:
            kp_comm_matrix[index] = kp_matrix_avg

        # Create a new column "AggrCommData" and send the results
        # ret_df['AggrCommData'] = kp_comm_matrix.tolist()

        ### PE level communication ###

        # Group by Pe to Pe level data.
        group_df = filter_df.groupby(['Peid'])

        # Number of PEs = number of groups
        pe_count = group_df.ngroups

        max_pe_comm = 0
        min_pe_comm = 0
        pe_comm_matrix = []
        # Loop through each key.
        for key, group in group_df:
            pe_df = group_df.get_group(key)

            pe_matrix_shape = (number_of_times, number_of_pes, number_of_pes)

            pe_matrix = np.zeros(shape = pe_matrix_shape)
            pe_time_group_df = pe_df.groupby([self.time_domain])

            time_idx = 0
            for time, time_item in pe_time_group_df:
                time_df = pe_time_group_df.get_group(time)
                for time_df_idx, time_df_row in time_df.iterrows():
                    kpGid = time_df_row['KpGid']
                    pe_matrix[time_idx][kpGid] = time_df_row['CommData']
                time_idx += 1

            pe_matrix_sum = pe_matrix.sum(axis = 0)

            pe_matrix_avg = np.divide(pe_matrix_sum, number_of_times)

            # Get the required information.
            # comm_data_series = pe_df['CommData']
            comm_data_series = pe_matrix_sum

            kpid = pe_df['Kpid']
            peid = pe_df['Peid'].unique()[0]
 
            # Get number of KPs.
            kp_count = len(pe_df['Kpid'].unique())

            # Calculate the inter communication between the PEs.
            mean_comm = []
            for idx, row in enumerate(comm_data_series):
                kp_mean_comm = []
                for i in range(0, pe_count):
                    pe_comm = row[i*kp_count: (i+1)*kp_count]
                    mean_pe_comm = np.sum(np.array(pe_comm), axis=0)
                    kp_mean_comm.append(mean_pe_comm)
                mean_comm.append(kp_mean_comm)
            

            # print(np.array(mean_comm).shape)
            # Calculate the mean across all KPs
            pe_comm_np = np.mean(np.array(mean_comm), axis=0)

            # print(pe_comm_np)

            # Set maximum communication
            max_pe_comm = max(max_pe_comm, np.max(pe_comm_np))

            # Set minimum communication
            min_pe_comm = min(min_pe_comm, np.min(pe_comm_np))

            pe_comm_list = pe_comm_np.tolist()
            pe_comm_matrix.append(pe_comm_list)
        
        ret_df = self.incoming_df[self.communication_metrics]
        schema = {k:self.process_type(type(v).__name__) for k,v in ret_df.iloc[0].items()}
        result = {
            "data": ret_df.to_dict('records'), 
            "aggr_kp_comm": kp_comm_matrix.tolist(),
            "aggr_pe_comm": pe_comm_matrix,
            "kp_count": kp_count,
            "pe_count": pe_count,
            'max_comm': max_pe_comm,
            'min_comm': min_pe_comm,
            "schema": schema
        }

        return result

    def groupby(self, df, keys, metric = 'mean'):
        # Groups data by the keys provided
        self.groups = df.groupby(keys)
        measure = getattr(self.groups, metric)
        self.data = measure() 

    # Process (Group the data) for all cluster_metrics
    def preprocess(self, df):
        # Group the data by granularity (PE, KP, LP) and time. 
        # Converts into a table and the shape is (number of processing elements, number of time steps)
        self.groupby(df, [self.granularity, self.time_domain])
        table = pd.pivot_table(df, values=[self.this_metric], index=[self.granularity], columns=[self.time_domain])
        self.current_time = table.columns
        return table

    # Process (Group the data) only for a specific metric. 
    def processByMetric(self, df, metric):
        self.groupby(df, [self.granularity, self.time_domain])
        table = pd.pivot_table(df, values=[metric], index=[self.granularity], columns=[self.time_domain], fill_value=0)
        column_names = []
        for name, group in self.groups:
            column_names.append(name[1])
        table.columns = list(set(column_names))
        return table

    def drop_prev_results(self, attrs): 
        self.results.drop(attrs, axis=1, inplace=True)

    def update(self, new_data):
        self.whole_data_df = pd.DataFrame(new_data)
        self.whole_data_df['RbPrim'] = self.whole_data_df['RbTotal'] - self.whole_data_df['RbSec']   
        self.incoming_df = self.whole_data_df
        self.df = pd.concat([self.df, self.whole_data_df]) 
        self.new_data_df = self.preprocess(self.whole_data_df)
        # To avoid Nan values while concat
        self.metric_df.reset_index(drop=True, inplace=True)
        self.new_data_df.reset_index(drop=True, inplace=True)
        self.metric_df = pd.concat([self.metric_df, self.new_data_df], axis=1).T.drop_duplicates().T
        self.count = self.count + 1
        self._time = self.metric_df.columns.get_level_values(1).tolist()
        self.granIDs = self.df[self.granularity]
        if(self.count == 75):
            self.df.to_csv('communication_data.csv')
        return self     

    def deupdate(self, remove_data):
        self.whole_data_df = pd.DataFrame(remove_data)
        this_time = self.whole_data_df[self.time_domain].unique()[0]
        self.df = self.df[self.df[self.time_domain] != this_time]
        #self.metric_df.drop(columns=[this_time])
        self.count = self.count - 1
        self._time = this_time
        self.granIDs = self.df[self.granularity]  
        return self

    def clean_up(self):
        if(self.count > 2):
            self.drop_prev_results(['cpd'])
            self.drop_prev_results(['from_metrics','from_causality','from_IR_1', 'from_VD_1',
                                   'to_metrics', 'to_causality', 'to_IR_1', 'to_VD_1'
            ])
            self.drop_prev_results(['PC0','PC1'])
            if(self.algo_clustering == 'evostream'):
                self.drop_prev_results(['ids', 'normal', 'normal_clusters', 'normal_times','micro', 'micro_clusters', 'macro', 'macro_clusters', 'macro_times', 'micro_times'])
            elif(self.algo_clustering == 'kmeans'):
                self.drop_prev_results(['ids', 'normal', 'normal_clusters', 'normal_times', 'macro', 'macro_clusters', 'macro_times',])

    def run_methods(self, data, algo):
        self.clean_up()
        clustering_result = self.clustering.tick(data)
        pca_result = self.pca.tick(data, algo['pca'])
        cpd_result = self.cpd.tick(data, algo['cpd'])
        causal_result = self.causal.tick(data, algo['causality'])
        
        if(self.count >= 2):
            self.results = self.results.join(clustering_result)
            self.results = self.results.join(pca_result)
            self.results = self.results.join(cpd_result)
            self.results = self.results.join(causal_result)
        self.results = self.results.fillna(0)   
        #self.to_csv(self.count)
        return self.format()

    def to_csv(self, filename, metric):
        # Write the metric_df to a csv file
        self.results.to_csv(str(filename) + str(self.cluster_metric) + '.csv')

    def from_csv(self, filename, metric):
        self.results = pd.read_csv(str(filename) + str(self.cluster_metric) + '.csv')
        return self.format()

class CPD(StreamData):
    # Perform Change point detection on Streaming data.
    def __init__(self):
        # Stores the change points recorded.
        self.cps = []
        self.alpha = 0.1
        self.aff_obj = PCAAFFCPD(alpha=self.alpha)

    def format(self, result, count):
        cpd = [(result)]
        cpd_result = pd.DataFrame(cpd, columns=['cpd'])
        return cpd_result

    def tick(self, data, method):
        ret = False
        self.new_data_df = data.new_data_df
        self.count = data.count
        self.current_time = data.current_time
        self.method = method
        if(self.count == 1):
            if(self.method == 'aff'):
                result = self.aff()
            elif(self.method == 'stream'):
                result = self.stream()
        else:
            if(self.method == 'aff'):
                result = self.aff_update()
            elif(self.method == 'stream'):
                result = self.stream_update()
        return self.format(result, self.count)

    def get_change_points(self):
        # Getter to return the change points.
        return self.cps

    def stream(self):    
        self.stream = PCAStreamCPD(win_size=5)
        time_series = self.new_data_df.T.values
        change = self.stream.feed_predict(new_time_point)
        if change:
            self.cps.append(0)
            # print('Change', 0)
            return 1
        else:
            return 0

    def stream_update(self):
        X = np.array(self.new_data_df)
        Xt = X.transpose()
        change = self.stream.feed_predict(Xt)
        if(change):
            self.cps.append(self.count)
            # print('Change', self.count)
            return 1
        else:
            return 0

    def aff(self):
        X = np.array(self.new_data_df)
        Xt = X.transpose()
        
        # perform adaptive forgetting factor CPD
        change = self.aff_obj.feed_predict(Xt[0, :])
        if change:
            self.cps.append(0)
            print('Change', 0)
            return 1
        else:
            return 0
            
    def aff_update(self):
        print(self.count)
        X = np.array(self.new_data_df[self.current_time])
        Xt = X.transpose()
        change = self.aff_obj.feed_predict(Xt[0, :])
        if(change):
            self.cps.append(self.count)
            print('Change', self.count)
            return 1
        else:
            # print('No-change#######################', self.count)
            return 0

class PCA(StreamData):
    def __init__(self):
        self.n_components = 2
        self.time_series = np.array([])
        self.pcs_curr = np.array([])
        self.pcs_new = np.array([]) 
        self.pcs_curr_bg = np.array([])

    def format(self):
        pca_result = pd.DataFrame(data = self.pcs_curr, columns = ['PC%d' %x for x in range(0, self.n_components) ])
        schema = {k:type(v).__name__ for k,v in pca_result.items()}
        return({
            'data': pca_result.to_dict('records'),
            'schema': schema
        })

    def _format(self):
        return pd.DataFrame(data = self.pcs_curr, columns = ['PC%d' %x for x in range(0, self.n_components)])

    def tick(self, data, method):
        self.metric_df = data.metric_df
        self.new_data_df = data.new_data_df
        self.method = method
        self.count = data.count

        if(self.count < 2):
            pass
        elif(self.count == 2):
            if(method == 'prog_inc'):
                self.prog_inc()
            elif(self.method == 'inc'):
                self.inc()
            return self._format()
        else:
            if(self.method == 'prog_inc'):
                self.prog_inc_update()
            elif(self.method == 'inc'):
                self.inc()
            return self._format()
            
    def prog_inc(self):
        pca = ProgIncPCA(2, 1.0)
        self.time_series = self.metric_df.values
        pca.progressive_fit(self.time_series, 10, "random")
        self.pcs_curr = pca.transform(self.time_series) 
        pca.get_loadings()

    def prog_inc_update(self):
        new_time_series = self.new_data_df.values
        self.time_series = np.append(self.time_series, new_time_series, 1)
        pca = ProgIncPCA(2, 1.0)
        pca.progressive_fit(self.time_series, latency_limit_in_msec = 10)
        self.pcs_new = pca.transform(self.time_series)
        self.pcs_curr = ProgIncPCA.geom_trans(self.pcs_curr, self.pcs_new)
        
    def inc(self):
        pca = IncPCA(2, 1.0)
        pca.partial_fit(self.data)
        pcs = pca.transform(self.data.values)
        pca_result = pd.DataFrame(data = pcs, columns = ['PC%d'%x for x in range(0, self.n_components) ])
        return pca_result

    def inc_update(self):
        pass

class Clustering(StreamData):
    def __init__(self):
        self.n_clusters = 3
        self.mutation_rate = 0.1
        self.fit_latency_limit_in_msec = 10
        self.refine_latency_limit_in_msec = 30
        self.labels = np.array([])
        self.labels_macro = np.array([])
        self.labels_micro = np.array([])
        self.times_macro = np.array([])
        self.times_micro = np.array([])


    # def format(self):
    #     normal_result = pd.DataFrame.from_dict({'normal' : np.asmatrix(self.time_series).tolist(), 'normal_labels': self.labels }, orient='index')
    #     micro_result = pd.DataFrame.from_dict({'micro' : np.asmatrix(self.time_series_micro).tolist(), 'micro_labels': self.labels_micro }, orient='index')
    #     macro_result = pd.DataFrame.from_dict({'macro' : np.asmatrix(self.time_series_macro).tolist(), 'macro_labels': self.labels_macro }, orient='index')
        
    #     return({
    #         'normal': normal_result,
    #         'micro': micro_result,
    #     })

    def _format(self):
        normal = [(self.time_series.tolist(), self.labels, self._time, self.granIDs.tolist())]
        micro = [(self.time_series_micro.tolist(), self.labels_micro, self._time)]
        macro = [(self.time_series_macro.tolist(), self.labels_macro, self._time)]
        normal_result = pd.DataFrame(data=normal, columns=['normal', 'normal_clusters', 'normal_times', 'ids'])
        micro_result = pd.DataFrame(data=micro, columns=['micro', 'micro_clusters', 'micro_times'])
        macro_result = pd.DataFrame(data=macro, columns=['macro', 'macro_clusters', 'macro_times'])
        return [normal_result, micro_result, macro_result]
        
    def _kmeans_format(self):
        normal = [(self.time_series.tolist(), self.labels, self._time, self.granIDs.tolist())]
        macro = [(self.time_series_macro.tolist(), self.labels_macro, self._time)]
        normal_result = pd.DataFrame(data=normal, columns=['normal', 'normal_clusters', 'normal_times', 'ids'])
        macro_result = pd.DataFrame(data=macro, columns=['macro', 'macro_clusters', 'macro_times'])
        return [normal_result, macro_result]

    def tick(self, data):
        self.metric_df = data.metric_df
        self.new_data_df = data.new_data_df
        self.algo = data.algo_clustering
        self._time = data._time
        self.granIDs = data.granIDs
        self.granularity = data.granularity
        self.count = data.count 
        # self.time_series = np.zeros((1, self.metric_df.shape[0]))

        if(self.algo == 'evostream'):
            if(self.count < 2):
                return {}
            if(self.count == 2):
                self.evostream()
            elif(self.count > 2):
                self.evostream_update()
            self.macro()
            self.micro()
            return self._format()
        elif(self.algo == 'kmeans'):
            if(self.count < 2):
                return {}
            if(self.count == 2):
                self.kmeans()
            elif(self.count > 2):
                self.kmeans_update()
            self.kmeans_macro()
            # self.micro()
            return self._kmeans_format()

    def emptyCurrentToPrev(self):
        ret = {}
        for idx in range(self.n_clusters):
            ret[idx] = 0
        return ret

    def evostream(self):
        self.time_series = self.metric_df.values
        self.evo = ProgEvoStream(n_clusters=self.n_clusters, mutation_rate=self.mutation_rate)
        self.evo.progressive_fit(self.time_series, latency_limit_in_msec=self.fit_latency_limit_in_msec)
        self.evo.progressive_refine_cluster(latency_limit_in_msec=self.refine_latency_limit_in_msec)
        self.labels = self.evo.predict(self.time_series)
        self.current_to_prev = self.emptyCurrentToPrev()
        
    def evostream_update(self):
        new_time_series = self.new_data_df.values
        self.time_series = np.append(self.time_series, new_time_series, 1)
        self.evo.progressive_fit(self.time_series, latency_limit_in_msec=self.fit_latency_limit_in_msec, point_choice_method="random", verbose=True)
        self.evo.progressive_refine_cluster(latency_limit_in_msec=self.refine_latency_limit_in_msec)
        self.labels, self.current_to_prev = self.evo.consistent_labels(self.labels, self.evo.predict(self.time_series))

    def macro(self):
        self.time_series_macro = np.array(self.evo.get_macro_clusters())
        self.labels_macro = [self.current_to_prev[i] for i in range(self.time_series_macro.shape[0])]
        self.times_macro = np.array(self._time)

    def micro(self):
        self.time_series_micro = np.array(self.evo.get_micro_clusters())
        self.lables_micro = self.evo.predict(self.time_series_micro)
        self.labels_micro = [self.current_to_prev[i] for i in self.labels_micro]
        self.times_micro = np.array(self._time)

    def kmeans(self):
        self.time_series = self.metric_df.values
        self.evo = ProgKMeans(n_clusters=self.n_clusters)
        self.evo.progressive_fit(self.time_series, latency_limit_in_msec=self.fit_latency_limit_in_msec)
        # self.evo.progressive_refine_cluster(latency_limit_in_msec=self.refine_latency_limit_in_msec)
        self.labels = self.evo.predict(self.time_series).tolist()
        self.current_to_prev = self.emptyCurrentToPrev()
        
    def kmeans_update(self):
        new_time_series = self.new_data_df.values
        self.time_series = np.append(self.time_series, new_time_series, 1)
        self.evo.progressive_fit(self.time_series, latency_limit_in_msec=self.fit_latency_limit_in_msec, point_choice_method="fromPrevCluster", verbose=True)
        # self.evo.progressive_refine_cluster(latency_limit_in_msec=self.refine_latency_limit_in_msec)
        self.labels, self.current_to_prev = self.evo.consistent_labels(self.labels, self.evo.predict(self.time_series))

    def kmeans_macro(self):
        self.time_series_macro = np.array(self.evo.get_centers())
        self.labels_macro = [self.current_to_prev[i] for i in range(self.time_series_macro.shape[0])]
        self.times_macro = np.array(self._time)

    # def micro(self):
    #     self.time_series_micro = np.array(self.evo.get_micro_clusters())
    #     self.lables_micro = self.evo.predict(self.time_series_micro)
    #     self.labels_micro = [self.current_to_prev[i] for i in self.labels_micro]
    #     self.times_micro = np.array(self._time)

class Causal(StreamData):
    def __init__(self):
        self.pivot_table_results = {}

    def numpybool_to_bool(self, arr):
        ret = []
        for idx, val in enumerate(arr):
            if(val == True):
                ret.append(1)
            elif(val == False):
                ret.append(0)
            else:
                ret.append(-1)
        return ret

    def flatten(self, l):
        flat_list = []
        for sublist in l:
            for item in sublist:
                flat_list.append(item)
        return flat_list


    def tick(self, data, method):
        self.df = data.whole_data_df
        self.incoming_df = data.incoming_df
        self.cluster_metric = data.cluster_metric
        self.time_domain = data.time_domain
        self.granularity = data.granularity
        self.causality_metrics = data.causality_metrics
        
        # self.data_metrics = ['NetworkRecv', 'NetworkSend', 'NeventProcessed', 'NeventRb', 'RbSec', \
        #  'RbTime', 'RbTotal', 'RbPrim']

        # self.calc_metrics =  ['NetworkRecv', 'NetworkSend', 'NeventProcessed', 'NeventRb', 'RbSec', \
        #  'RbTime', 'RbTotal', 'RbPrim']

        self.data_metrics = ['NetworkRecv', 'NetworkSend', 'NeventProcessed', 'RbSec', 'NeventRb', 'RbTotal', 'RbPrim', 'NetReadTime', 'FcAttempts', 'EventTies', 'EventProcTime']
        self.calc_metrics = ['NetworkRecv', 'NetworkSend', 'NeventProcessed', 'RbSec', 'NeventRb', 'RbTotal', 'RbPrim', 'NetReadTime', 'FcAttempts', 'EventTies', 'EventProcTime']

        self.data_metrics.append(self.granularity)
        self.data_metrics.append(self.time_domain)

        pca = ProgIncPCA(1)
        total_latency_for_pca = 100
        latency_for_each = int(total_latency_for_pca / len(self.data_metrics))
        n = self.incoming_df.shape[0]
        X = np.empty(shape=(n, len(self.data_metrics)))
        self.df = self.df[self.data_metrics] 

        for i, metric in enumerate(self.calc_metrics):
            start = time.time()
            metric_pd = data.processByMetric(self.df, metric)
            if(metric not in self.pivot_table_results):
                self.pivot_table_results[metric] = metric_pd
            else:
                self.pivot_table_results[metric] = pd.concat([self.pivot_table_results[metric], metric_pd], axis=1)
                metric_pd = self.pivot_table_results[metric]
            metric_nd = metric_pd.values
            
            pca.progressive_fit(
                    metric_nd,
                    latency_limit_in_msec=latency_for_each,
                    point_choice_method='random',
                    verbose=False)
            metric_1d = pca.transform(metric_nd)
            X[:, i] = metric_1d[:, 0]

        X = pd.DataFrame(X, columns=self.data_metrics)
        X = X[self.causality_metrics]
        is_non_const_col = (X != X.iloc[0]).any()
        X = X.loc[:, is_non_const_col]
        X = X.replace([np.inf, -np.inf], np.nan)
        X = X.fillna(0.0)

        causality_from = pd.DataFrame(
            index=[0], columns=self.causality_metrics).fillna(False)
        causality_to = pd.DataFrame(
            index=[0], columns=self.causality_metrics).fillna(False)

        ir_from = pd.DataFrame(index=[0], columns=self.causality_metrics).fillna(0.0)
        ir_to = pd.DataFrame(index=[0], columns=self.causality_metrics).fillna(0.0)

        vd_from = pd.DataFrame(index=[0], columns=self.causality_metrics).fillna(0.0)
        vd_to = pd.DataFrame(index=[0], columns=self.causality_metrics).fillna(0.0)

        if is_non_const_col.loc[self.cluster_metric]:
            causality = Causality()
            causality.adaptive_progresive_var_fit(
                X, latency_limit_in_msec=100, point_choice_method="reverse")

            causality_from, causality_to = causality.check_causality(self.cluster_metric, signif=0.1)

            try:
                tmp_ir_from, tmp_ir_to = causality.impulse_response(
                    self.cluster_metric)
                ir_from.loc[0, is_non_const_col] = tmp_ir_from[:, 1]
                ir_to.loc[0, is_non_const_col] = tmp_ir_to[:, 1]
            except:
                b = 1
                # print(
                    # "impulse reseponse was not excuted. probably matrix is not",
                    # "positive definite")

            try:
                tmp_vd_from, tmp_vd_to = causality.variance_decomp(self.cluster_metric)
                vd_from.loc[0, is_non_const_col] = tmp_vd_from[:, 1]
                vd_to.loc[0, is_non_const_col] = tmp_vd_to[:, 1]
            except:
                a = 1
                # print(
                    # "impulse reseponse was not excuted. probably matrix is not",
                    #  "positive definite")

        causality_from = causality_from
        causality_to = causality_to
        ir_from = ir_from.loc[0, :].tolist()
        ir_to = ir_to.loc[0, :].tolist()
        vd_from = vd_from.loc[0, :].tolist()
        vd_to = vd_to.loc[0, :].tolist()

        
        from_ = [(self.causality_metrics, self.numpybool_to_bool(causality_from),
                  ir_from, vd_from)]
        to_ = [(self.causality_metrics, self.numpybool_to_bool(causality_to), ir_to,
                vd_to)]
            
        from_result = pd.DataFrame(
            data=from_,
            columns=[
                'from_metrics', 'from_causality', 'from_IR_1', 'from_VD_1'
            ])
        to_result = pd.DataFrame(
            data=to_,
            columns=['to_metrics', 'to_causality', 'to_IR_1', 'to_VD_1'])

        return [from_result, to_result]