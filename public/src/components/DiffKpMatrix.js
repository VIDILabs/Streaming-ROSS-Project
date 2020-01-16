import * as d3 from 'd3'
import "d3-selection-multi";
import adjacencyMatrixLayout from './d3-adjacency-matrix-layout'
import template from '../html/AggrKpMatrix.html'

export default {
    name: 'DiffKpMatrix',
    template: template,
    components: {
    },
    props: [],

    data: () => ({
        id: null,
        height: 0,
        width: 0,
        message: "Difference Communication view",
        matrix: null,
        matrixScale: 0.85,
        offset: 100,
        colorSet: ["#fb8072", "#E8CA4F", "#AB769F"],
        currentClustersIds: [],
        clusterIds: [],
        idx: 0,
        weights: [],
        max_weight: 0,
        scaleKpCount: 16,
        pes: 0,
        matrixData: [],
        max_weight: 0,
        globalMinPE: Number.POSITIVE_INFINITY,
        globalMaxPE: Number.NEGATIVE_INFINITY,
        globalMinKP: Number.POSITIVE_INFINITY,
        globalMaxKP: Number.NEGATIVE_INFINITY,
        globalMin: Number.POSITIVE_INFINITY,
        globalMax: Number.NEGATIVE_INFINITY,
        minPE: Number.POSITIVE_INFINITY,
        maxPE: Number.NEGATIVE_INFINITY,
        minKP: Number.POSITIVE_INFINITY,
        maxKP: Number.NEGATIVE_INFINITY,
    }),

    watch: {
    },

    mounted() {
        this.id = 'kpmatrix-overview' + this._uid
    },

    methods: {
        init() {
            this.$store.DiffMatrixID = 0
        },

        reset() {
            this.visualize()
        },

        clearLine() {
            d3.selectAll('.intersectLine').remove()
        },

        drawLine(x, y) {
            let xPoints = [];
            for (let i = 0; i < this.cpds.length; i += 1) {
                xPoints.push()
            }

            this.svg.selectAll('intersectLine')
                .data(xPoints)
                .enter()
                .append('line')
                .attrs({
                    'class': 'intersectLine',
                    'x1': (d) => { return this.nodeWidth * 1 },
                    'y1': 0,
                    'x2': (d) => { return this.x(d) },
                    'y2': this.height - this.padding.bottom,
                })
                .style('stroke', '#DA535B')
                .style('stroke-width', '3.5px')
                .style('z-index', 100)
        },

        initContainer() {
            let panel1Height = document.getElementById('panel1').clientHeight
            let panel2Height = document.getElementById('panel2').clientHeight
            let chipContainerHeight = document.getElementById('chip-container').clientHeight
            this.containerHeight = window.innerHeight - panel1Height - panel2Height - 3 * chipContainerHeight;
            this.containerWidth = this.containerHeight

            this.matrixWidth = this.containerWidth * this.matrixScale
            this.matrixHeight = this.containerHeight * this.matrixScale
        },

        process() {
            this.pes = this.matrix.length
            this.nodeWidth = Math.ceil(this.matrixWidth / this.pes) + 0.5
            this.nodeHeight = Math.ceil(this.matrixHeight / this.pes) + 0.5

            if (this.pes < this.scaleKpCount) {
                this.clusterNodeOffset = this.nodeWidth / 2
            }
            else {
                this.clusterNodeOffset = this.nodeHeight * 3
            }

            this.adjacencyMatrix = adjacencyMatrixLayout()
                .size([this.matrixWidth, this.matrixHeight])
                .useadj(true)
                .adj(this.matrix)
        },

        initSvg() {
            // d3.selectAll('.KpMatrixI' + this.idx).remove()
            this.svg = d3.select('#' + this.id)
                .append('svg')
                .attrs({
                    transform: `translate(${this.offset * this.$store.DiffMatrixID + this.offset}, ${0})`,
                    width: this.matrixWidth + this.clusterNodeOffset,
                    height: this.matrixHeight + this.clusterNodeOffset,
                    id: 'aggrMatrix-' + this.$store.DiffMatrixID,
                })

            // Update the matrixData. 
            this.$store.cpdMatrix.push(this.adjacencyMatrix())
        },

        findMinMax(matrix) {
            for (let i = 0; i < matrix.length; i += 1) {
                let weightAggr = this.$store.baseMatrix[i].weightAggr - matrix[i].weightAggr
                let weight = this.$store.baseMatrix[i].weight - matrix[i].weight
                this.minPE = Math.min(weightAggr, this.minPE)
                this.maxPE = Math.max(Math.abs(weightAggr), this.maxPE)
                this.minKP = Math.min(weight, this.minKP)
                this.maxKP = Math.max(Math.abs(weight), this.maxKP)
            }

            this.globalMinPE = Math.min(this.globalMinPE, this.minPE)
            this.globalMaxPE = Math.max(this.globalMaxPE, this.maxPE)
            this.globalMinKP = Math.min(this.globalMinKP, this.minKP)
            this.globalMaxKP = Math.min(this.globalMaxKP, this.maxPE)

            this.globalMin = Math.min(this.globalMin, Math.min(this.globalMinKP, this.globalMinPE))
            this.globalMax = Math.max(this.globalMax, Math.max(this.globalMaxKP, this.globalMinPE))

            console.log(this.minKP, this.maxKP, this.minPE, this.maxPE)
            console.log(this.globalMinKP, this.globalMaxKP, this.globalMinPE, this.globalMaxPE)
            console.log(this.globalMin, this.globalMax)
        },

        visualize() {

            // Init the container to have the Aggregated Matrix view.
            this.initContainer()

            // Process the incoming data to a adjancency matrix. 
            this.process()

            this.initSvg()

            this.findMinMax(this.$store.cpdMatrix[this.$store.DiffMatrixID])

            // Update the colors on the existing matrices. 
            this.$parent.max_weight = Math.max(this.$parent.max_weight, this.$parent.maxComm)
            for (let i = 0; i < this.$store.DiffMatrixID; i += 1) {
                d3.selectAll('.aggrRect' + i)
                    .style('fill', (d, i) => {
                        let val = (d.weightAggr - this.$store.baseMatrix[i].weightAggr)
                        let val_normalized = ((val) / (this.maxPE) + 1)/2
                        return d3.interpolateRdBu(val_normalized)
                    })
            }


            // Draw the current matrix. 
            this.svg.selectAll('.aggrRect' + this.$store.DiffMatrixID)
                .data(this.$store.cpdMatrix[this.$store.DiffMatrixID])
                .enter()
                .append('rect')
                .attrs({
                    class: 'aggrRect aggrRect' + this.$store.DiffMatrixID,
                    'width': (d) => this.nodeWidth,
                    'height': (d) => this.nodeHeight,
                    'x': (d) => d.x + this.clusterNodeOffset,
                    'y': (d) => d.yAggr + this.clusterNodeOffset,
                    'id': (d, i) => "aggr-rect-pe-" + d.peid
                })
                .style('stroke', (d, i) => {
                    if (d.target % this.scaleKpCount == this.scaleKpCount - 1 || d.source % this.scaleKpCount == this.scaleKpCount - 1)
                        return '#black'
                    else
                        return '#white'
                })
                .style('stroke-opacity', 1)
                .style('fill', (d, i) => {
                    let val = (d.weightAggr - this.$store.baseMatrix[i].weightAggr)
                    let val_normalized = ((val) / (this.maxPE) + 1)/2
                    return d3.interpolateRdBu(val_normalized)
                })
                .on('click', (d) => {
                    let peid = d.peid
                    console.log("Toggling : ", peid)
                    // this.granularity_level[d.peid] = 'kp'
                    d3.selectAll('#aggr-rect-pe-' + peid)
                        .style('fill-opacity', (d, i) => {
                            let val = Math.abs(d.weight - this.$store.baseMatrix[i].weight)
                            let val_normalized = ((val) / (this.maxPE) + 1)/2
                            return Math.abs(val_normalized)
                        })
                })

            this.clusterNodeWidth = this.matrixWidth / this.pes
            this.clusterNodeHeight = this.matrixHeight / this.pes
                
            let clusterIds = this.$store.result[this.$store.currentCPDRound].clusterIds 
            // Append the kp value indicators:
            this.svg.selectAll('.clusterrectIY' + this.$store.DiffMatrixID)
                .data(clusterIds)
                .enter()
                .append('rect')
                .attrs({
                    class: 'clusterrectIY' + this.$store.DiffMatrixID,
                    'width': (d) => this.clusterNodeOffset,
                    'height': (d) => this.clusterNodeHeight,
                    'x': (d) => 0,
                    'y': (d, i) => this.clusterNodeHeight * (i) + this.clusterNodeOffset,
                })
                .style('stroke-opacity', .3)
                .style('fill', (d, i) => this.$store.colorset[clusterIds[i]])

            this.svg.selectAll('.clusterrectIX' + this.$store.DiffMatrixID)
                .data(clusterIds)
                .enter()
                .append('rect')
                .attrs({
                    class: 'clusterrectIX' + this.$store.DiffMatrixID,
                    'width': (d) => this.clusterNodeWidth,
                    'height': (d) => this.clusterNodeOffset,
                    'x': (d, i) => this.clusterNodeWidth * (i) + this.clusterNodeOffset,
                    'y': (d, i) => 0,
                })
                .style('stroke-opacity', .3)
                .style('fill', (d, i) => this.$store.colorset[clusterIds[i]])

            d3.select('.KpMatrixI')
                .call(this.adjacencyMatrix.xAxis);

            d3.select('.KpMatrixI')
                .call(this.adjacencyMatrix.yAxis);


            this.drawCommLabels()

            this.$store.DiffMatrixID += 1
        },

        drawCommLabels() {
            this.navLabelContainer = this.svg
                .data([this.idx])
                .enter()
                .append('g')

            this.navLabelContainer
                .append('circle')
                .attrs({
                    'class': 'commNavLabel',
                    'id': 'commNavLabel-' + this.comm_count,
                    'r': 10,
                    'stroke': 'black',
                    'fill': 'white',
                    'cx': (d, i) => {
                        let xOffset = this.matrixWidth * d + this.nodeWidth * this.clusterIds.length
                        return xOffset
                    },
                    'cy': 10
                })

            this.navLabelContainer.append("text")
                .attrs({
                    "x": (d, i) => {
                        let xOffset = this.matrixWidth * d + this.nodeWidth * this.clusterIds.length
                        return xOffset
                    },
                    "dx": (d) => -5,
                    "y": 15,
                    "class": 'commNavLabelText'
                })
                .text((d, i) => i)
        },

        update(max_weight) {
            // Update the colors on the existing matrices. 
            max_weight = Math.max(max_weight, this.$parent.maxComm)
            for (let i = 0; i < this.$store.DiffMatrixID; i += 1) {
                console.log("Updating matrix: ", max_weight)
                d3.selectAll('.aggrRect' + i)
                    .style('fill', (d, i) => {
                        let val = d.weightAggr / max_weight
                        return d3.interpolateGreens(val)
                    })
            }
        }
    }
}

