# A Visual Analytics Framework for Reviewing Streaming Performance Data. - Web interface

Visual analytics framework for exploring and analyzing performance data from the ROSS PDES engine.

# Requirements
Server backend requires Python version >= 3.6.

Follow the installation instructions for the listed algorithms from [mv-streaming-algorithms](https://github.com/VIDILabs/mv-streaming-algorithms).

* [Progressive causality](https://github.com/VIDILabs/mv-streaming-algorithms/tree/master/causality/prog_causality)
* [Progressive K-means clustering](https://github.com/VIDILabs/mv-streaming-algorithms/tree/master/clustering/prog_kmeans)
* [Incremental PCA-based change point detection](https://github.com/VIDILabs/mv-streaming-algorithms/tree/master/cpd/ipca_aff_cpd)
* [Progressive Incremental PCA](https://github.com/VIDILabs/mv-streaming-algorithms/tree/master/cpd/ipca_aff_cpd)

Note: Virtualenv is recommended for running the server backend: 

```
virtualenv -p python3 venv
source venv/bin/activate
```

Note: Python version >= 3.6

# Server
App server with streaming data support for developing data analytics and visualization applications to analyze the performance of the ROSS simulator engine.

## Installation
```
cd server
pip install -r requirements.txt
```

## Running
To start the app server for listening HTTP and WebSocket requests on port 8888 and receiving data streams on port 8000:

```
 python server.py --http=8899 --datafile=./DATA_SRC/DATA_FILE.bin --appdir=../ross-vis/dist' 
```

# App client server

## Installation
``` bash
cd public
npm install
```

## Running
``` bash
npm run dev
```

After the server is started with HTTP port = 8888, use a web browser to access the ROSS-Vis app at http://localhost:8888.

******
How to Cite
-----
Please, cite:

~~~
Suraj P. Kesavan, Takanori Fujiwara, Jianping Kelvin Li, Caitlin Ross, Misbah Mubarak, Christopher D. Carothers, Robert B. Ross, and Kwan-Liu Ma. "A Visual Analytics Framework for Reviewing Streaming Performance Data." In Proceedings of IEEE Pacific Visualization Symposium (PacificVis), forthcoming
~~~