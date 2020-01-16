import * as d3 from 'd3'
import "d3-selection-multi";
import adjacencyMatrixLayout from './d3-adjacency-matrix-layout'
import template from '../html/BaseKpMatrix.html'
import EventHandler from './EventHandler'

export default {
    name: 'BaseKpMatrix',
    template: template,
    components: {
    },
    props: [],

    data: () => ({
        id: null,
        height: 0,
        width: 0,
        message: "Base Communication view",
        matrix: null,
        matrixScale: 0.85,
        offset: 30,
        currentClustersIds: [],
        clusterIds: [],
        idx: 0,
        weights: [],
        max_weight: 0,
        scaleKpCount: 16,
        pes: 0,
        matrixData: [],
        max_weight: 0,
        matrixWidth: 0,
        matrixHeight: 0
    }),

    watch: {
    },

    mounted() {
        this.id = 'base-kp-matrix-overview' + this._uid

        // Start the base communication view adn then fetch the request. 
        // Probably should be the other way.
        // Data is being fetched here. 
        let self = this
        EventHandler.$on('init_base_communication', function () {
            self.initSVG()
            EventHandler.$emit('fetch_kpmatrix_on_base_request', self.$store.selectedDragTime)
        })
        
    },

    methods: {
        init() {
            
        },

        reset() {
            if (this.firstRender) {
                this.initSVG()
                this.firstRender = false
            }
        },

        change() {

        },

        initSVG() {
            let visContainer = document.getElementById('live-kpmatrix-overview')
            this.containerWidth = visContainer.clientWidth

            let dashboardHeight = document.getElementById('dashboard').clientHeight
            let toolbarHeight = document.getElementById('toolbar').clientHeight
            this.chipContainerHeight = document.getElementById('chip-container').clientHeight
            this.colormapHeight = 40
            this.containerHeight = (dashboardHeight - toolbarHeight - this.chipContainerHeight) / 3 - this.colormapHeight

            this.matrixLength = Math.min(this.containerHeight, this.containerWidth)
            this.matrixWidth = this.matrixLength * this.matrixScale
            this.matrixHeight = this.matrixLength * this.matrixScale + 10
            // this.$refs.LiveMatrixColormap.init('base-kp-matrix-overview')

            this.$store.matrixHeight = this.matrixHeight
            this.$store.matrixWidth = this.matrixWidth

            let kpMatrixHeight = document.getElementsByClassName('.KpMatrix0').clientHeight
        },

        visualize() {
            let idx = 'base'
            this.pes = this.matrix.length
            this.nodeWidth = Math.ceil(this.matrixWidth / this.pes) + 0.5
            this.nodeHeight = Math.ceil(this.matrixHeight / this.pes) + 0.5

            if (this.pes < this.scaleKpCount) {
                this.clusterNodeOffset = this.nodeWidth / 2
            }
            else {
                this.clusterNodeOffset = this.nodeHeight * 3
            }
            let adjacencyMatrix = adjacencyMatrixLayout()
                .size([this.matrixWidth, this.matrixHeight])
                .useadj(true)
                .adj(this.matrix)

            
            this.$store.baseMatrix = adjacencyMatrix()
            let matrixData = this.$store.baseMatrix

            if (!Number.isNaN(matrixData[0].x)) {
                this.max_weight = matrixData[0]['maxComm']
                this.min_weight = matrixData[0]['minComm']
                // this.$refs.LiveMatrixColormap.clear()
                // this.$refs.LiveMatrixColormap.render(this.min_weight, this.max_weight)


                d3.selectAll('.KpMatrix' + idx).remove()
                this.svg = d3.select('#' + this.id)
                    .append('svg')
                    .attrs({
                        transform: `translate(${5}, ${0})`,
                        width: this.matrixWidth + this.clusterNodeOffset,
                        height: this.matrixHeight + this.clusterNodeOffset,
                        class: 'KpMatrix' + idx,
                    })

                console.log("Maximum communication in the GVT", this.max_weight)
                this.svg.selectAll('.base-rect')
                    .data(matrixData)
                    .enter()
                    .append('rect')
                    .attrs({
                        class: (d, i) => 'base-rect base-rect-kp' + d.kpid,
                        'id': (d, i) => 'base-rect-pe-' + d.peid,
                        'width': (d) => this.nodeWidth,
                        'height': (d) => this.nodeHeight,
                        'x': (d) => d.x + this.clusterNodeOffset,
                        'y': (d) => d.yAggr + this.clusterNodeOffset,
                    })
                    .style('stroke', (d, i) => {
                        if (d.target % this.scaleKpCount == this.scaleKpCount - 1 || d.source % this.scaleKpCount == this.scaleKpCount - 1)
                            return '#black'
                        else
                            return '#white'
                    })
                    .style('stroke-width', (d, i) => {
                        if (d.target % this.scaleKpCount == this.scaleKpCount - 1 || d.source % this.scaleKpCount == this.scaleKpCount - 1)
                            return '0.1px'
                        else
                            return '0px'
                    })
                    .style('stroke-opacity', 1)
                    .style('fill', d => {
                        let val = Math.pow((d.weightAggr / this.max_weight), 0.33)
                        return d3.interpolateGreys(val)
                    })
                    .on('click', (d) => {
                        let peid = d.peid
                        console.log("Toggling : ", peid)
                        d3.selectAll('#base-rect-pe-' + d.peid)
                            .style('fill', d => {
                                return d3.interpolateGreys(Math.pow((d.weight - 750/ this.max_weight - 750), 1))
                            })
                    })

                    this.clusterNodeWidth = this.matrixWidth / this.pes
                    this.clusterNodeHeight = this.matrixHeight / this.pes

                // Append the kp value indicators:

                this.selectedDragTime = Math.floor(this.$store.selectedDragTime)
                this.clusterIds = this.$store.result[this.selectedDragTime]['clusterIds']
                this.svg.selectAll('.clusterrectY' + idx)
                    .data(this.clusterIds)
                    .enter()
                    .append('rect')
                    .attrs({
                        class: 'clusterrectY' + idx,
                        'width': (d) => this.clusterNodeOffset,
                        'height': (d) => this.clusterNodeHeight ,
                        'x': (d) => 0,
                        'y': (d, i) => this.clusterNodeHeight * (i) + this.clusterNodeOffset,
                    })
                    .style('stroke-opacity', .3)
                    .style('fill', (d, i) => this.$store.colorset[this.clusterIds[i]])
                    .on('click', (d, i) => {
                        console.log(d, i)
                    })

                this.svg.selectAll('.clusterrectX' + idx)
                    .data(this.clusterIds)
                    .enter()
                    .append('rect')
                    .attrs({
                        class: 'clusterrectX' + idx,
                        'width': (d) => this.clusterNodeWidth,
                        'height': (d) => this.clusterNodeOffset,
                        'x': (d, i) => this.clusterNodeWidth * (i) + this.clusterNodeOffset,
                        'y': (d, i) => 0,
                    })
                    .style('stroke-opacity', .3)
                    .style('fill', (d, i) => this.$store.colorset[this.clusterIds[i]])

                d3.select('.KpMatrix')
                    .call(adjacencyMatrix.xAxis);

                d3.select('.KpMatrix')
                    .call(adjacencyMatrix.yAxis);
            }

        },

        clear() {
            d3.select('')
        },
    }
}

