webpackJsonp([1],{

/***/ "12xM":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("mO0D");

module.exports = function(data, spec){
    if(!Array.isArray(data))
        throw new Error("Inproper input data format.");

    if(typeof(spec) === "function") {
        data.forEach(spec);
    } else {
        var result = [],
            tranfs = {};

        Object.keys(spec).forEach(function(s){
            if(typeof(spec[s]) == "function") {
                tranfs[s] = function(d) { d[s] = spec[s](d) };
            } else {
                tranfs[s] = Function("attr", "attr." + s + "=" + spec[s].replace(/@/g, 'attr.').replace(/\$/g, '$.') + ";");
            }
        });

        data.forEach(function(d){
            Object.keys(spec).forEach(function(s){
                tranfs[s](d);
            });
        });
    }

    return data;
}


/***/ }),

/***/ "16Nc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["request"] = request;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (immutable) */ __webpack_exports__["getAll"] = getAll;
/* harmony export (immutable) */ __webpack_exports__["post"] = post;
function request(arg) {
    var url = arg.url || arg,
        method = arg.method || "GET",
        dataType = arg.dataType || "json",
        data = arg.data || [],
        query = [];  //arraybuffer, blob, document, json, text

    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }

    return new Promise(function(resolve, reject) {

        var req = new XMLHttpRequest();
        req.open(method, url);
        req.responseType = dataType;

        req.onload = function() {
          if (req.status == 200) {
            resolve(req.response);
          }
          else {
            reject(Error(req.statusText));
          }
        };

        req.onerror = function() {
          reject(Error("Network Error"));
        };

        if (method == 'POST') {
            req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }

        req.send(data);
    });
};

let get = request;

function getAll(options) {
    var promises = [];
    options.forEach(function(option){
        promises.push(
            request(option)
            .then(function(result){
                return new Promise(function(resolve, reject) {
                    resolve(result);
                });
            })
        );
    });

    return Promise.all(promises);
}

function post(arg) {
    arg.method = "POST";
    return ajax.request(arg);
};


/***/ }),

/***/ "2snl":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_main__ = __webpack_require__("IpZ0");


var root = typeof self == 'object' && self.self === self && self ||
           typeof global == 'object' && global.global === global && global ||
           this;

root.picos = __WEBPACK_IMPORTED_MODULE_0__src_main__["a" /* default */];

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__src_main__["a" /* default */]);

if(typeof module != 'undefined' && module.exports)
    module.exports = __WEBPACK_IMPORTED_MODULE_0__src_main__["a" /* default */];
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("DuR2"), __webpack_require__("f1Eh")(module)))

/***/ }),

/***/ "31Cv":
/***/ (function(module, exports) {

module.exports = "<v-app id=\"inspire\">\n  <WebSocket ref=\"WebSocket\" @connect=\"connect\" />\n  <v-toolbar\n    color=\"blue-grey\"\n    dark\n    fixed\n    app\n    clipped-right\n  >\n    <v-toolbar-side-icon @click.stop=\"left = !left\">\n    </v-toolbar-side-icon>\n    <v-toolbar-title style=\"margin-right: 3em;\">{{ appName }}</v-toolbar-title>\n      <v-flex xs4 class=\"ma-2\">\n        <v-select box\n          label=\"Metric\"\n          :items=\"metrics\"\n          multiple\n          v-model=\"selectedMetrics\"\n          persistent-hint\n          v-on:change=\"visualize()\"\n        >\n        </v-select>\n      </v-flex>\n    <v-spacer></v-spacer>\n    <v-flex xs2>\n    </v-flex>\n  </v-toolbar>\n  <v-content class=\"pa-2\">\n    <v-container fluid fill-height class=\"pa-1\">\n      <v-layout justify-center align-center>\n        <v-flex xs7 fill-height class=\"pa-1\">\n          <TimeSeries ref=\"TimeSeries\"></TimeSeries>\n        </v-flex>\n        <v-flex xs5 fill-height class=\"pa-1\">\n          <Communication  ref=\"Communication\" />\n        </v-flex>\n      </v-layout>\n    </v-container>\n  </v-content>\n  <!-- <v-footer color=\"blue-grey\" class=\"white--text\" app> -->\n    <!-- <span> VIDi Labs, University of California, Davis </span>\n    <v-spacer></v-spacer>\n    <span>&copy; 2018</span> -->\n  <!-- </v-footer> -->\n</v-app>\n";

/***/ }),

/***/ "3ySA":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "7zck":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "BpKz":
/***/ (function(module, exports) {

/**
 * alloc(options) - allocating memory for storing data values in different schemaures.
 * @exports allocate
 * @param {Object} options - Options for allocating memory.
 * @param {Array} options.array - Array containing the data values.
 * @param {Array} options.fields - Fields in the data.
 * @param {number} [options.skip=0] - Number of rows to be skiped in data.
 * @param {object[]} [options.data] - default data
 *
 */
module.exports = function allocate(options) {
    'use strict';
    var array = options.array || [],
        header = options.fields || options.header || array[0],
        types = options.types || [],
        schema = options.schema || undefined,
        skip = options.skip || 0,
        data = options.data || [];

    var ds = {},
        parsers = [];

    if (types.length && typeof(types) == 'string') {
        var ta = [];
        for (var i = 0; i < header.length; i++) {
            ta.push(types);
        }
        types = ta;
    }

    if (typeof schema == 'object') {
        header = Object.keys(schema);
        types = Object.keys(schema).map(function(h) {
            return schema[h];
        });
    }

    if (typeof skip == 'number') {
        for (var j = 0; j < skip; j++)
            array.shift();
    }

    types.forEach(function(t) {
        parsers.push(getParser(t));
    })

    function getParser(type) {
        if (type == 'int' || type.match('veci*')) {
            return function(value) {
                var res = parseInt(value);
                return (isNaN(res)) ? 0 : res;
            };
        } else if (type == 'float' || type.match('vecf*')) {
            return function(value) {
                var res = parseFloat(value);
                return (isNaN(res)) ? 0 : res;
            };
        } else if (['date', 'time', 'datetime'].indexOf(type) != -1) {
            return function(value) {
                return new Date(value);
            };
        } else if (['money', 'price', 'cost'].indexOf(type) != -1) {
            return function(value) {
                return parseFloat(value.substring(1));
            };
        } else {
            return function(value) {
                return value;
            };
        }
    }

    ds.insertRows = function(rows) {
        array = array.concat(rows);
    }
    
    /**
    * @method objectArray
    * @return {Object[]} - Return data as array of objects
    */
    ds.objectArray = function() {
        if (typeof(header) !== 'undefined' && header.length) {
            var l = header.length;
            array.forEach(function(a) {
                var o = {},
                    offset = 0;
                for (var i = 0; i < l; i++) {
                    var k = header[i];
                    if (k.length) {
                        if (types[i].match(/^(veci|vecf)\d+$/)) {
                            var vl = parseInt(types[i].slice(4)),
                                vector = [];
                            a.slice(offset, offset + vl).forEach(function(vi) {
                                vector.push(parsers[i](vi));
                            });
                            o[k] = vector;
                            offset += vl;
                        } else {
                            o[k] = parsers[i](a[offset]);
                            offset++;
                        }
                    }
                }
                data.push(o);
            });
        }
        return data;
    }

    /**
    * @method rowArray
    * @return {Array[]} - data as row arrays
    */
    ds.rowArray = function() {
        array.forEach(function(a) {
            var row = [];
            header.forEach(function(k, i) {
                if (k.length) {
                    row.push(parsers[i](a[i]));
                }
            });
            data.push(row);
        });
        data.fields = header;
        data.schema = 'rowArray';
        return data;
    }

    /**
    * @method collumArray
    * @return {Array[]} - data as column arrays
    */
    ds.columnArray = function() {
        header.forEach(function(k, i) {
            var column = array.map(function(a) {
                return parsers[i](a[i]);
            });
            data.push(column);
        });
        data.fields = header;
        data.schema = 'columnArray';
        return data;
    }
    //TODO: make columnArray extensible like rowArray and objectArray

    return ds;
};


/***/ }),

/***/ "CT2f":
/***/ (function(module, exports) {

module.exports = function embed(spec) {
    var id = spec.$id || spec.$by,
        attributes = Object.keys(spec);

    if(!id) throw Error("No id specified for embed!");

    attributes.filter(function(attr){
        return (attr != "$by" && attr != "$id")
    })
    .forEach(function(attr){
        var embedKey = spec[attr][0][id],
            i = 0,
            n = data.length,
            l = spec[attr].length;

        var lookup = data.map(function(d){ d[attr] = []; return d[id];});

        for(i = 0; i < l; i++) {
            var index = lookup.indexOf(spec[attr][i][id]);
            if(index !== -1) {
                data[index][attr].push(spec[attr][i]);
            }
            // delete spec[attr][i][id];
        }
    });
    return data;
}


/***/ }),

/***/ "IB2n":
/***/ (function(module, exports) {

module.exports = "<v-app id=\"inspire\">\n  <WebSocket ref=\"WebSocket\" @connect=\"connect\" />\n  <v-toolbar\n    color=\"blue-grey\"\n    dark\n    fixed\n    app\n    clipped-right\n  >\n    <v-toolbar-side-icon @click.stop=\"left = !left\">\n    </v-toolbar-side-icon>\n    <v-toolbar-title style=\"margin-right: 3em;\">{{ appName }}</v-toolbar-title>\n    <v-spacer></v-spacer>\n  </v-toolbar>\n  <v-content class=\"pa-2\">\n    <v-container fluid style=\"height: 90%\" class=\"pa-2\">\n      <v-layout fill-height row>\n          <v-flex xs6 fill-height class=\"pa-1\">\n            <Dimensionality ref=\"Dimensionality\"></Dimensionality>\n          </v-flex>\n          <v-flex xs6 fill-height class=\"pa-1\">\n            <Communication  ref=\"Communication\" />\n          </v-flex>\n      </v-layout>\n    </v-container>\n  </v-content>\n</v-app>\n";

/***/ }),

/***/ "IpZ0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/d3-scale/src/index.js + 51 modules
var src = __webpack_require__("dJjO");

// EXTERNAL MODULE: ./node_modules/d3-scale-chromatic/src/index.js + 42 modules
var d3_scale_chromatic_src = __webpack_require__("u6Xv");

// CONCATENATED MODULE: ../picos/src/colors.js



function mapColor(colors, colorDomain) {
    var getColor;
    if(typeof colors == 'function') {
        getColor = function(d) { return colors(d); };
        getColor.domain = () => {}
    } else if(typeof colors == 'string') {
        var getRange = Object(src["b" /* scaleLinear */])().domain(colorDomain).range([0, 1]);
        // var getRange = scalePow().exponent(0.333).domain(colorDomain).range([0, 1]);
        getColor = function(value) {
            if(typeof d3_scale_chromatic_src['interpolate' + colors] == 'function') {
                return d3_scale_chromatic_src['interpolate' + colors](getRange(value));
            } else {
                return '#000000';
            }
        }
        getColor.domain = function(d) {
            getRange = Object(src["b" /* scaleLinear */])().domain(d).range([0, 1]);
            return getRange;
        }
    } else {
        getColor = Object(src["b" /* scaleLinear */])()
            .domain(colorDomain)
            .range(colors);
    }
    return getColor;
}
// EXTERNAL MODULE: ./node_modules/d3-chord/src/index.js + 5 modules
var d3_chord_src = __webpack_require__("s5jH");

// EXTERNAL MODULE: ./node_modules/d3-shape/src/index.js + 51 modules
var d3_shape_src = __webpack_require__("1gFY");

// CONCATENATED MODULE: ../picos/src/chord.js




function Chord(arg) {
    let options = arg || {},
        container = options.container || "body",
        data = options.data,
        radius = options.radius || 100,
        padding = options.padding || 0.1,
        ignoreDiagonal = options.ignoreDiagonal || false,
        colorDomain = options.colorDomain || null,
        colors = options.colors || ['steelblue', 'red'],
        threshold = options.threshold || 0,
        hover = options.hover || function(d) {};

    let chord = Object(d3_chord_src["a" /* chord */])().padAngle(padding)
        // .sortSubgroups(d3Chord.descending)

    let matrix = {};
    matrix.size = data.map((rows, i) => {
        return rows.map((row, j) => {
            return  (i == j) ? 1 * ((ignoreDiagonal) ? 0 : 1) : 1;
        });
    });

    matrix.color =  data.map((rows, i) => {
        return rows.map((row, j) => {
            return (i == j) ? row * ((ignoreDiagonal) ? 0 : 1) : row;
        });
    });

    let colorValues = [];
    matrix.color.forEach((row) => { colorValues = colorValues.concat(row)});
    colorValues = colorValues.filter(d => d !== 0)

    let chords = chord(matrix.size);

    if(colorDomain === null) {
        colorDomain = [Math.min.apply(null, colorValues), Math.max.apply(null, colorValues)];
    }

    let interpolateColor = mapColor(colors, colorDomain);

    let getColor = function(d) {
        let send = matrix.color[d.source.index][d.target.index];
        let recv = matrix.color[d.target.index][d.source.index];
        return interpolateColor(Math.max(send, recv));
    }

    let getOpacity = function(d) {
        let send = matrix.color[d.source.index][d.target.index];
        let recv = matrix.color[d.target.index][d.source.index];
        if( Math.max(send, recv) <= threshold) {
            return 0;
        } else {
            return 1;
        }
    } 

    let svg = container;
    let links;

    if(chords.groups.length < 13) {
        let core = svg.append("g")
            .attr("class", "chord")
            .selectAll("path")
            .data(chords)
            .enter();

        links = core.append("path").attr("class", "ribbons")
            .attr("d", Object(d3_chord_src["b" /* ribbon */])().radius(radius))
            .style("fill",  getColor)
            .style("stroke", "#FFF")
            .style("opacity", 1);

    } else {
        let line = Object(d3_shape_src["f" /* lineRadial */])()
            .curve(d3_shape_src["d" /* curveBundle */].beta(0.5))
            .radius(d => d.radius)
            .angle(d => { return d.angle})

        let linkData = chords.map((conn) => {
            let source = chords.groups[conn.source.index];
            let sourceAngle = source.startAngle + (source.endAngle - source.startAngle) / 2;
            let target = chords.groups[conn.target.index];
            let targetAngle = target.startAngle + (target.endAngle - target.startAngle) / 2;
            return {
                points: [
                    {angle: sourceAngle, radius},
                    {angle: 0, radius: 0, link: conn}, // curve midpoint
                    {angle: targetAngle, radius}
                ], 
                link: conn 
            } 
        })

        links = svg.append("g")
            .selectAll(".links")
            .data(linkData)
            .enter().append('path')
            .attr('class', 'link')
            .attr('d', d => line(d.points))
            .attr('fill', 'none')
            .style("stroke-width", 1)
            .style("opacity", d => getOpacity(d.link))
            .style("stroke", d => getColor(d.link))
    }

    chords.colorDomain = colorDomain;
    chords.updateColor = function(colorDomain) {
        chords.colorDomain = colorDomain;
        interpolateColor.domain(colorDomain);
        links.style("stroke", d => getColor(d.link));
    }

    chords.filter = function (newThreshold) {
        threshold = newThreshold
        links.style("opacity", d => getOpacity(d.link))
    }

    return chords;
}
// CONCATENATED MODULE: ../picos/src/text.js
function Text(arg) {
    var options = arg || {},
        container = options.container || "body",
        data = options.data,
        prefix = options.prefix || '',
        radius = options.radius || 200,
        color = options.color || '#000000',
        groups = options.groups || [],
        hover = options.hover || function(d) {};

    function textTransform(d) {
        var offset = (d.startAngle + (d.endAngle - d.startAngle)/2);
        return (offset > Math.PI/2 && offset < 1.5*Math.PI) ? "rotate(270)" :"rotate(90)";
    }

    function textRotate(d) {
        var offset = (d.startAngle + (d.endAngle - d.startAngle)/2);
        return "rotate(" + (offset * 180 / Math.PI - 90)
            + ")translate(" + (radius+5) + ",0)";
    }

    var groupLabel = container.append("g").selectAll("groupLabel")
            .data(groups)
            .enter().append("g")
            .attr("transform", textRotate);

    groupLabel.append("text")
        .style("font-size", "0.9em")
        .style("text-anchor", "middle")
        .attr("dy", ".35em")
        .attr("transform",  textTransform)
        .text(function(d, i) { return  prefix + data[i]; });

    return groupLabel;
}


// CONCATENATED MODULE: ../picos/src/stats.js
function stats_stats(data, fields){

    if(!Array.isArray(data))
        throw new Error("Inproper input data format.");

    var result = {};

    fields.forEach(function(f) {
        var a = data.map(function(d){return d[f]; });
        result[f] = {
            min: Math.min.apply(null, a),
            max: Math.max.apply(null, a)
        };
    });

    return result;
};
// EXTERNAL MODULE: ./node_modules/d3-selection/src/index.js + 50 modules
var d3_selection_src = __webpack_require__("sHXk");

// CONCATENATED MODULE: ../picos/src/rect.js


 



function rect_bars(arg) {
    var options = arg || {},
        container = options.container || "body",
        data = options.data,
        vmap = options.vmap,
        width = options.width || 800,
        height = options.height || width,
        outerRadius = options.outerRadius || Math.min(width/2, height/2),
        innerRadius = options.innerRadius || outerRadius / 4,
        padding = options.padding || 0.05,
        domain = options.domain || null,
        colorDomain = options.colorDomain || null,
        stats = options.stats || null,
        tooltip = options.tooltip || function() {},
        colors = options.colors || ['white', 'steelblue'],
        
        hover = options.hover || function(d) {};

    var getSize = function() { return outerRadius; },
        getColor = (typeof colors === 'function') ? colors : function() { return colors[0]};

    if(stats === null) {
        stats = stats_stats(data, Object.keys(vmap).map(function(k){ return vmap[k]; }));
    }

    if(vmap.color && typeof(colors) != 'function') {
        if(colorDomain === null) {
            if(stats[vmap.color].max == stats[vmap.color].min) stats[vmap.color].max+=0.000001;
            colorDomain = [stats[vmap.color].min, stats[vmap.color].max];
        }
        if(typeof colors == 'function') {
            getColor = colors;
        } else if(typeof colors == 'string') {
            var getRange = Object(src["b" /* scaleLinear */])().domain(colorDomain).range([0, 1]);
            getColor = function(value) {
                if(typeof d3_scale_chromatic_src['interpolate' + colors] == 'function') {
                    return d3_scale_chromatic_src['interpolate' + colors](getRange(value));
                } else {
                    return 'steelblue';
                }
            }
        } else {
            getColor = Object(src["b" /* scaleLinear */])()
                .domain(colorDomain)
                .range(colors);
        }
    }

    if(vmap.size) {
        getSize =  Object(src["d" /* scalePow */])().exponent(0.9)
            .domain([stats[vmap.size].min, stats[vmap.size].max])
            .range([innerRadius, outerRadius]);
    }

    function createArc(d) {
        return Object(d3_shape_src["a" /* arc */])()
            .innerRadius(innerRadius)
            .outerRadius(getSize(d[vmap.size]))
            (d);
    }


    var bars = container.append("g").selectAll(".bar")
        .data(data)
        .enter()


    var marks = bars.append("path").attr("class", "bars")
        .attr('class', 'bars')
        .style("fill", function(d) { return getColor(d[vmap.color]); })
        // .style("stroke", function(d) { return getColor(d[vmap.color]); })
        .style("stroke", '#000')
        .style("stroke-width", 0)
        // .style("fill-opacity", function(d){return getOpacity(d[opacityAttr])})
        .attr("d", createArc)
        .on("mouseover", function(d){
            let pos = this.getBBox();
            Object(d3_selection_src["a" /* select */])(this).style('stroke-width', 2)
            tooltip.show(pos, d)
        })
        .on("mouseout", function() {
            tooltip.hide();
            Object(d3_selection_src["a" /* select */])(this).style('stroke-width', 0)
        }); 

    bars.colorDomain = colorDomain;
    bars.updateColor = function(colorDomain) {
        bars.colorDomain = colorDomain;
        getColor.domain(colorDomain);
        marks.style("fill", function(d) { return getColor(d[vmap.color]); })
    }

    return bars;
}
// CONCATENATED MODULE: ../picos/src/scatter.js


function scatter_scatter(arg) {
    var options = arg || {},
        container = options.container || "body",
        data = options.data,
        vmap = options.vmap,
        width = options.width || 800,
        height = options.height || width,
        outerRadius = options.outerRadius || Math.min(width/2, height/2),
        innerRadius = options.innerRadius || outerRadius / 4,
        padding = options.padding || 0.05,
        domain = options.domain || null,
        colorDomain = options.colorDomain || null,        
        stats = options.stats || null,
        colors = options.colors || ['white', 'steelblue'],
        hover = options.hover || function(d) {};

    var scatter = {};
    var getSize = function() { return 5; },
        getPosX = function() { return 0; },
        getPosY = function() { return 0; },
        getColor = (typeof colors === 'function') ? colors : function() { return colors[0]};

    if(stats === null) {
        stats = stats_stats(data, Object.keys(vmap).map(function(k){ return vmap[k]; }));
    }
    if(vmap.color && typeof(colors) != 'function') {
        if(colorDomain === null) {
            if(stats[vmap.color].max == stats[vmap.color].min) stats[vmap.color].max+=0.000001;
            colorDomain = [stats[vmap.color].min, stats[vmap.color].max];
        }

        if(typeof colors == 'function') {
            getColor = colors;
        } else if(colors == 'string') {
            var getRange = d3.scale.linear().domain(colorDomain).range([0, 1]);
            getColor = function(value) {
                if(typeof colorScales['interpolate' + colors] == 'function') {
                    return colorScales['interpolate' + colors](getRange(value));
                } else {
                    return 'steelblue';
                }
            }
        } else {
            getColor =  d3.scale.linear()
                .domain(colorDomain)
                .range(colors);
        }
    }

    if(vmap.x) {
        var xScale = d3.scale.linear()
        .domain([stats[vmap.x].min, stats[vmap.x].max]);

        getPosX = function(d) {
            var v = xScale.range([ d.startAngle, d.endAngle])(d[vmap.x]);
            return v;
        }
    }

    if(vmap.y) {
        getPosY = d3.scale.linear()
            .domain([stats[vmap.y].min, stats[vmap.y].max])
            .range([innerRadius, outerRadius]);
    }

    function createArc(d) {
        return d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(getSize(d[vmap.size]))
            (d);
    }

    var visualElement = container.append("g").selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function(d){return getSize(d[vmap.size])})
        .attr("cx", function(d){return getPosY(d[vmap.y]) * Math.cos(getPosX(d))})
        .attr("cy",function(d){return getPosY(d[vmap.y]) * Math.sin(getPosX(d))})
        .style("fill", function(d){return getColor(d[vmap.color])});

    scatter.colorDomain = colorDomain;
    scatter.updateColor = function(colorDomain) {
        scatter.colorDomain = colorDomain;
        getColor.domain(colorDomain);
        visualElement.style("fill", function(d) { 
            return getColor(d[vmap.color]); 
        })
    }

    return scatter;
}


// EXTERNAL MODULE: ./node_modules/d3-format/src/index.js + 15 modules
var d3_format_src = __webpack_require__("F+za");

// CONCATENATED MODULE: ../picos/src/colorlegend.js




var gradientID = 0;
function colorLegend({
    container = null,
    width = 200,
    height = 20,
    pos = [0, 0],
    padding = {left: 25, right: 25, top: 20, bottom: 0},
    colors = ['#eee', 'steelblue'],
    domain = ['min', 'max'],
    noLabel = false,
    format = Object(d3_format_src["a" /* format */])('.2s'),
    title = ''
}){
    width -= padding.left + padding.right;
    height -= padding.top + padding.bottom;
    
    let legend;
    if(container === null) {
        legend = Object(d3_selection_src["a" /* select */])(document.createElementNS('http://www.w3.org/2000/svg', 'svg'));
        legend.attr("width", width).attr("height", height);
    } else {
        legend = container;
        if(typeof container.appendChild === 'function') {
            container.appendChild(legend);
        } else if(typeof container === 'string') {
            document.getElementById(container).appendChild(legend);
        }
    } 
       
    function linearGradient(colors) {
        let gradient = legend.append("defs")
            .append("linearGradient")
                .attr("id", "gradlegend" + gradientID)
                .attr("x1", "0%")
                .attr("x2", "100%")
                .attr("y1", "0%")
                .attr("y2", "0%");

        if(Array.isArray(colors)) {
            colors.forEach(function(c, i){
                gradient.append("stop")
                    .attr("offset", i / colors.length )
                    .attr("stop-color", c);
            });
        } else if(typeof colors == 'string' ) {
            if(typeof d3_scale_chromatic_src['interpolate' + colors] == 'function') {
                for(var i = 0; i < 128; i++) {
                    gradient.append("stop")
                    .attr("offset", i / 128 )
                    .attr("stop-color", d3_scale_chromatic_src['interpolate' + colors](i/128));
                }
            }
        }

        return gradientID++;
    }

    var rect = legend.append("g");
    rect.attr('transform', 'translate(' + padding.left + ', ' + padding.right + ')')
        .append("rect")
        .attr("x", pos[0])
        .attr("y", pos[1])
        .attr("width", width-padding.left)
        .attr("height", height)
        .style("fill","url(#gradlegend" + linearGradient(colors) + ")");

    if(!noLabel) {
        rect.append("text")
            .attr("x", pos[0])
            .attr("y", pos[1] + height/2 + 5)
            .style("fill", "#222")
            .style("text-anchor", 'end')
            // .style("font-size", ".9em")
            .text(format(domain[0]) || 0);

        rect.append("text")
            .attr("x", pos[0] + width - padding.left)
            .attr("y", pos[1] + height/2 + 5)
            .style("fill", "#222")
            .style("text-anchor", 'begin')
            // .style("font-size", ".9em")
            .text(format(domain[1]) || 'max');
    }

    if(title) {
        rect.append("g")
            .append("text")
            .attr("y", pos[1])
            .attr("x", pos[0] + (width - padding.left) / 2)
            // .attr("dy", "0.7em")
            .style("text-anchor", "middle")
            // .style("font-size", "0.7em")
            .text(title);
    }

    return legend;
}
// CONCATENATED MODULE: ../picos/src/main.js
/* harmony export (immutable) */ __webpack_exports__["a"] = Picos;








function getExtent(data, field) {
    var tuple = data.map(function (d) {
        return d[field];
    });
    var min = Math.min.apply(null, tuple);
    var max = Math.max.apply(null, tuple);
    if (max == min) max += 1e-4;

    return [min, max];
}

function Picos(spec) {
    let layers = spec.layers;
    let rings = new Array(layers.length);

    var config = spec.config;
    var width = config.width || 800;
    var height = config.height || width;
    var padding = config.padding || 10;
    var outerRadius = config.outerRadius || Math.min(width / 2, height / 2);
    var innerRadius = config.innerRadius || Math.min(width / 4, height / 4);
    var container = config.container || "body";
    var parentRing = container;
    var chartTitle = config.chartTitle || false;
    var colorDomains = config.colorDomains || [];
    var groups = [];

    outerRadius -= padding;

    
    var offset = Math.min((width / 2), (height / 2));
    var baseSVG = Object(d3_selection_src["a" /* select */])(container).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + offset + "," + offset + ")");

    var cirRange = outerRadius - innerRadius - padding,
        cirOffset = innerRadius,
        sectionRadius = cirOffset,
        cirSize = layers
        .map(function (layer) {
            return layer.size;
        })
        .reduce(function (a, b) {
            return a + b;
        });

    var tipBox;    
    var tip = null;
    let tipTextBox;
    let tipTexts = [];
    
    let tooltip = {
        show(pos, dataItem) {
            if (tip === null) {
                tip = tipBox.append('rect')
                    .attr("class", "tooltip")
                    .attr('fill', '#EEE')
                    .attr('stroke', '#222')
                    .attr('width', 100)
                    .attr('height', 50)
                    .style("opacity", 0);

                tipTextBox = tipBox.append('text')
                    .attr('x', 10)
                    .attr('y', 10)
            }
            tip.style("opacity", .9)
            tipBox.attr('transform', 'translate (' +  [pos.x + pos.width, pos.y + pos.height].join(',') + ')')

            let texts = Object.entries(dataItem).slice(0, 10)
            texts.forEach((text, i) => {
                let label = tipTextBox.append('tspan')
                    .attr('y', i * 15)
                    .attr('x', 15)
                    .attr('dy', 20)
                    .text(text.join(': '));
                tipTexts.push(label)
            })
            let textBBox = tipTextBox.node().getBBox();
            tip.attr('width', textBBox.width + 15*2)
                .attr('height', textBBox.height + 15*2)
 
        },

        hide () {
            tip.style("opacity", .0)
            tipTexts.forEach((t) => t.remove())
        }
    }

    layers.forEach(function (layer, li) {
        var sectionRadiusRange = cirOffset + layer.size / cirSize * cirRange,
            cirPadding = 0.05 * sectionRadiusRange,
            sectionRadius = sectionRadiusRange,
            colorDomain = ['min', 'max'];

        var colors = layer.colors;
        var getColor;

        if (layer.type == 'link') {
            let linkOption = Object.assign({
                container: baseSVG,
                radius: cirOffset,
                colorDomain: colorDomains[li],
            }, layer)
            rings[li] = Chord(linkOption);
            parentRing = rings[li];
            groups = parentRing.groups;
            colorDomain = rings[li].colorDomain;
            
        } else if (layer.type == 'text') {
            layer.container = baseSVG;
            layer.radius = cirOffset;
            layer.groups = groups;
            rings[li] = Text(layer);
            cirOffset = sectionRadius + cirPadding;
        } else {

            var dataItems = [];
            groups.forEach(function (chord, ci) {
                var delta = (chord.endAngle - chord.startAngle) / layer.data[ci].length;
                layer.data[ci].forEach(function (d, di) {
                    var start = chord.startAngle + di * delta;
                    d.startAngle = start;
                    d.endAngle = start + delta;
                    d.index = chord.index;
                })
                dataItems = dataItems.concat(layer.data[ci]);
            })

            colorDomain = (Array.isArray(colorDomains[li])) ? colorDomains[li] : getExtent(dataItems, layer.vmap.color);

            getColor = mapColor(layer.colors || ['red', 'steelblue'], colorDomain);

            var plot;
            if (layer.type == 'circle') {
                plot = scatter_scatter;
            } else {
                plot = rect_bars;
            }

            rings[li] = plot({
                container: baseSVG,
                data: dataItems,
                innerRadius: cirOffset,
                outerRadius: sectionRadius,
                colors: getColor,
                colorDomain: colorDomain,
                tooltip: tooltip,
                vmap: layer.vmap || layer.encoding,
            });

            cirOffset = sectionRadius + cirPadding;

        }

        if (layer.type !== 'text' && layer.vmap) {
            if (config.legend) {
                if (rings[li].colorDomain) colorDomain = rings[li].colorDomain;
                colorLegend({
                    container: baseSVG,
                    colors: layer.colors,
                    height: Math.min(50, outerRadius / 2 / rings.length),
                    width: (width / 2 - outerRadius / 2 - padding) * 0.9,
                    title:  (layer.vmap) ? layer.vmap.color : null,
                    domain: colorDomain,
                    pos: [
                        width / 2 - (width / 2 - outerRadius / 2 - padding) * 0.9,
                        outerRadius / 2 + outerRadius / 2 / (rings.length) * li]
                })
            }
        }

        if (chartTitle) {
            baseSVG.append("text")
                .style("font-size", "1.1em")
                .style("text-anchor", "middle")
                .attr("x", 0)
                .attr("y", height / 2 - 15)
                .text(function (d, i) {
                    return chartTitle
                });
        }

        tipBox = baseSVG.append('g')
    });

    rings.createColorLegend = function (options) {
        var svg = Object(d3_selection_src["a" /* select */])(options.container).append('svg')
            .attr('width', options.width).attr('height', options.height);

        layers.forEach(function (layer, li) {
            if (layer.type == 'text') return;
            var colorDomain = (options.colorDomains) ? options.colorDomains[li] : rings[li].colorDomain;
            colorLegend({
                container: svg,
                colors: layer.colors,
                height: options.height / (layers.length - 1),
                width: options.width,
                title: layer.project + ' (' + ((layer.vmap) ? layer.vmap.color : null) + ')',
                domain: colorDomain,
                padding: options.padding,
                pos: [0, options.height / (layers.length - 1) * li]
            });
        });
    }

    rings.updateColor = function (colorDomains) {
        rings.forEach(function (ring, ri) {
            if (layers[ri].type !== 'text') {
                ring.updateColor(colorDomains[ri]);
            }
        })
    }

    rings.updateLink = rings[0].filter

    return rings;
}

/***/ }),

/***/ "L1ge":
/***/ (function(module, exports, __webpack_require__) {

var ArrayOpts = __webpack_require__("mO0D");

module.exports = function(data, spec, headers){
    var i,
        l = data.length,
        attributes = headers || Object.keys(data[0]),
        bin,
        bins = [],
        binCollection = {},
        result = [],
        ks;

    if(!spec.hasOwnProperty('$group') && !spec.hasOwnProperty('$bin')) return result;

    if(typeof spec.$bin == 'object') {
        var binAttr = Object.keys(spec.$bin)[0],
            binCount = spec.$bin[binAttr];

        if(attributes.indexOf(binAttr) !== -1) {
            var column = data.map(function(d){return d[binAttr]}),
                min = ArrayOpts.min(column),
                max = ArrayOpts.max(column),
                binInterval = (max - min) / binCount;

            for(i = 0; i < l; i++){
                data[i]['bin@' + binAttr] = Math.min(Math.floor(data[i][binAttr]/binInterval), binCount-1);
            }

            spec.$group = 'bin@' + binAttr;
            attributes.push('bin@' + binAttr);
        }
    }

    for(i = 0; i < l; i++){
        if(Array.isArray(spec.$group)) {
            ks = [];
            spec.$group.forEach(function(si){
                ks.push(data[i][si]);
            });
            bin = JSON.stringify(ks);
        } else {
            bin = data[i][spec.$group];
        }
        if( bins.indexOf(bin) < 0 ){
            bins.push(bin);
            binCollection[bin] = [data[i]];
        } else {
            binCollection[bin].push(data[i]);
        }
    }

    var bl = bins.length;

    for(i = 0; i < bl; i++){
        var res = {};
        if(Array.isArray(spec.$group)) {
            ks = JSON.parse(bins[i]);
            spec.$group.forEach(function(s, j){
                res[s] = ks[j];
            })

        } else {
            res[spec.$group] = bins[i];
        }

        if(spec.$data) {
            res.data = binCollection[bins[i]];
        }

        if(spec.$group) {
            var gkeys = Array.isArray(spec.$group) ? spec.$group : [spec.$group];

            gkeys.forEach(function(gk){
                if(attributes.indexOf(gk) === -1) {
                    throw Error('Invalid attribute name: ', gk);
                }
            })
        }

        var out = spec.$collect || spec.$reduce || [];
        var keys = Object.keys(out);
        if(keys.length === 0 && !spec.$data) return result;
        keys.forEach(function(key){
            var attr = key,
                opt = out[key];

            if(opt === "$count" || opt === "$data") {
                attr = key;
            }
            if(typeof out[key] === 'object'){
                opt = Object.keys(out[key])[0];
                attr = out[key][opt];

                if(attributes.indexOf(attr) === -1 && attr !== "*" && !Array.isArray(attr)) {
                    var warnMsg = "No matching attribute or operation defined for the new attribute " + key + ":" + spec[key];
                    console.warn(warnMsg);
                    return;
                }
            }

            if(typeof opt === "function") {
                // res[key] = binCollection[bins[i]].map(function(a){ return a[attr]; }).reduce(opt);
                res[key] = opt.call(null, binCollection[bins[i]].map(function(a){ return a[attr]; }));
            } else if(typeof opt === "string") {
                if(opt === "$unique") {
                    res[key] = ArrayOpts.unique(binCollection[bins[i]].map(function(a){ return a[key]; }));
                } else if (opt === "$list") {
                    res[key] = binCollection[bins[i]].map(function(a){ return a[attr]; });
                } else if (opt === "$first") {
                    res[key] = binCollection[bins[i]][0][attr];
                } else if (opt === "$merge") {
                    var mergedResult = [];
                    binCollection[bins[i]].map(function(a){ return a[attr]; }).forEach(function(m){
                        mergedResult = mergedResult.concat(m);
                    })
                    res[key] = mergedResult;
                } else if (opt === "$count") {
                    res[key] = binCollection[bins[i]].length;
                } else if (opt === "$data") {
                    var collect = (spec.$collect) ? '$collect' : '$reduce';
                    res[key] = (spec[collect][key][opt] == '*')
                        ? binCollection[bins[i]]
                        : binCollection[bins[i]].map(function(data){
                            var row = {};
                            spec[key][opt].forEach(function(k){ row[k] = data[k] });
                            return row;
                        });
                } else {
                    var fname = opt.slice(1);

                    if(fname in ArrayOpts) {
                        res[key] = ArrayOpts[fname].call(null, binCollection[bins[i]].map(function(a){
                            return a[attr];
                        }));
                    }
                }
            }
        });
        result.push(res);
    }

    return result;
};


/***/ }),

/***/ "NHnr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.esm.js
var vue_esm = __webpack_require__("7+uW");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/App.vue
//
//
//
//
//
//

/* harmony default export */ var App = ({
  name: 'App'
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-79a6cfec","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/App.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('router-view')],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var selectortype_template_index_0_src_App = (esExports);
// CONCATENATED MODULE: ./src/App.vue
function injectStyle (ssrContext) {
  __webpack_require__("XYhO")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  App,
  selectortype_template_index_0_src_App,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_App = (Component.exports);

// EXTERNAL MODULE: ./node_modules/vue-router/dist/vue-router.esm.js
var vue_router_esm = __webpack_require__("/ocq");

// EXTERNAL MODULE: ./node_modules/vuetify/dist/vuetify.js
var vuetify = __webpack_require__("3EgV");
var vuetify_default = /*#__PURE__*/__webpack_require__.n(vuetify);

// EXTERNAL MODULE: ./node_modules/vuetify/dist/vuetify.min.css
var vuetify_min = __webpack_require__("7zck");
var vuetify_min_default = /*#__PURE__*/__webpack_require__.n(vuetify_min);

// EXTERNAL MODULE: ./node_modules/material-design-icons-iconfont/dist/material-design-icons.css
var material_design_icons = __webpack_require__("gJtD");
var material_design_icons_default = /*#__PURE__*/__webpack_require__.n(material_design_icons);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/keys.js
var keys = __webpack_require__("fZjL");
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/json/stringify.js
var stringify = __webpack_require__("mvHQ");
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/promise.js
var promise = __webpack_require__("//Fk");
var promise_default = /*#__PURE__*/__webpack_require__.n(promise);

// EXTERNAL MODULE: ./src/html/WebSocket.html
var html_WebSocket = __webpack_require__("ZtXa");
var WebSocket_default = /*#__PURE__*/__webpack_require__.n(html_WebSocket);

// CONCATENATED MODULE: ./src/components/WebSocket.js




/* harmony default export */ var components_WebSocket = ({
  name: 'WebSocket',
  template: WebSocket_default.a,
  data: function data() {
    return {
      dialog: true,
      socketError: false,
      server: 'localhost:8888',
      modes: ['Post Hoc', 'In Situ'],
      defaultMode: 'Post Hoc'
    };
  },
  methods: {
    connect: function connect() {
      var _this = this;

      return new promise_default.a(function (resolve, reject) {
        var socket = new WebSocket('ws://' + _this.server + '/websocket');
        socket.onopen = function () {
          _this.dialog = !_this.dialog;
          _this.socketError = false;
          socket.send(stringify_default()({ data: 'KpData', method: 'get' }));
        };

        socket.onerror = function (error) {
          _this.socketError = true;
          reject(error);
        };

        socket.onmessage = function (event) {
          var dataObj = JSON.parse(event.data);
          if (dataObj.schema.hasOwnProperty('CommData')) {
            dataObj.schema.CommData = 'int';
          }
          dataObj.data.forEach(function (d) {
            d.RbPrim = d.RbTotal - d.RbSec;
          });
          resolve({ data: dataObj.data, schema: dataObj.schema });
        };
      });
    }
  }
});
// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/get-iterator.js
var get_iterator = __webpack_require__("BO1k");
var get_iterator_default = /*#__PURE__*/__webpack_require__.n(get_iterator);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__("woOf");
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("Gu7T");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ../p3/index.js
var p3 = __webpack_require__("vsA5");
var p3_default = /*#__PURE__*/__webpack_require__.n(p3);

// EXTERNAL MODULE: ../picos/index.js
var picos = __webpack_require__("2snl");

// EXTERNAL MODULE: ./src/html/Communication.html
var Communication = __webpack_require__("w3S9");
var Communication_default = /*#__PURE__*/__webpack_require__.n(Communication);

// CONCATENATED MODULE: ./src/components/Communication.js








/* harmony default export */ var components_Communication = ({
  name: 'Communication',
  template: Communication_default.a,
  data: function data() {
    return {
      drawer: false,
      data: null,
      timeDomain: null,
      allMetrics: [],
      metrics: [],
      showIntraComm: false,
      numKP: 0,
      numPE: 0,
      threshold: 0,
      rings: [],
      maxLinkValue: 1,
      isComparisonMode: false,
      granularity: 'KpGid',
      colors: ['red', 'blue', 'yellow', 'green', 'purple']

    };
  },
  computed: {
    thresholdValue: function thresholdValue() {
      return (this.threshold / 100 * this.maxLinkValue).toFixed(0);
    }
  },
  methods: {
    updateLink: function updateLink() {
      var _this = this;

      this.rings.forEach(function (ring) {
        ring.updateLink(_this.thresholdValue);
      });
    },
    updateMetrics: function updateMetrics() {
      this.$emit('updateMetrics', this.metrics);
    },
    visualize: function visualize(_ref) {
      var _this2 = this;

      var data = _ref.data,
          timeDomain = _ref.timeDomain,
          metrics = _ref.metrics,
          timeIntervals = _ref.timeIntervals,
          measure = _ref.measure,
          _ref$processIds = _ref.processIds,
          processIds = _ref$processIds === undefined ? [] : _ref$processIds,
          _ref$clusterIds = _ref.clusterIds,
          clusterIds = _ref$clusterIds === undefined ? [] : _ref$clusterIds,
          _ref$clusterColors = _ref.clusterColors,
          clusterColors = _ref$clusterColors === undefined ? this.colors : _ref$clusterColors;

      if (data !== undefined && Array.isArray(data)) {
        this.data = data;
        if (processIds.length > 0) {
          this.data = data.filter(function (d) {
            return processIds.indexOf(d.KpGid);
          });
        }
        this.numPE = Math.max.apply(Math, toConsumableArray_default()(this.data.map(function (d) {
          return d.Peid;
        }))) + 1;
        this.numKP = Math.max.apply(Math, toConsumableArray_default()(this.data.map(function (d) {
          return d.Kpid;
        }))) + 1;
      }
      this.rings = new Array(timeIntervals.length);
      var colorDomains = new Array(metrics.length + 1);
      var container = this.$refs.container;
      container.innerHTML = '';
      if (timeIntervals.length > 1) {
        this.isComparisonMode = true;
      }

      timeIntervals.forEach(function (timeInterval, tii) {
        var aggregateByTime = p3_default.a.pipeline();
        if (timeInterval !== null) {
          var _match = {};
          _match[timeDomain] = timeInterval;
          aggregateByTime.match(_match);
        }

        var tsData = aggregateByTime.aggregate({
          $group: timeDomain,
          $collect: {
            items: { $data: '*' }
          }
        }).execute(_this2.data);

        var tsCommData = tsData.map(function (sample) {
          return sample.items.sort(function (a, b) {
            return a.Peid - b.Peid;
          }).map(function (item) {
            return item.CommData;
          });
        });
        var accCommData = tsCommData[0];

        if (tsCommData.length > 1) {
          tsCommData.slice(1).forEach(function (sample) {
            sample.forEach(function (rows, i) {
              rows.forEach(function (value, j) {
                if (i < accCommData.length) accCommData[i][j] += value;
              });
            });
          });
        }
        accCommData = accCommData.map(function (rows) {
          var newRows = new Array(_this2.numPE);
          for (var i = 0; i < _this2.numPE; i++) {
            newRows[i] = rows.slice(i * _this2.numKP, (i + 1) * _this2.numKP).reduce(function (a, b) {
              return a + b;
            });
          }
          return newRows;
        });

        var commData = accCommData[0].map(function (a, i) {
          return p3_default.a.vector.sum(accCommData.slice(i * _this2.numKP, (i + 1) * _this2.numKP));
        });

        var collection = {};
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = get_iterator_default()(metrics), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var metric = _step.value;

            collection[measure + '.' + metric] = {};
            collection[measure + '.' + metric]['$' + measure] = metric;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var aggrSpec = {
          $aggregate: {
            $group: ['Kpid', 'Peid'],
            $reduce: collection
          }
        };

        var transform = p3_default.a.pipeline();
        var match = {};
        if (timeInterval !== null) {
          match[timeDomain] = timeInterval;
        }

        if (keys_default()(match).length) {
          transform.match(match);
        }

        var result = transform.aggregate(aggrSpec.$aggregate).execute(_this2.data);

        var metricData = p3_default.a.aggregate(result, {
          $group: 'Peid',
          $collect: { items: { $data: '*' } }
        }).sort(function (a, b) {
          return a.items[0].Peid - b.items[0].Peid;
        }).map(function (r) {
          return r.items;
        });

        var colorSets = [['#EEE', 'teal'], ['#EEE', 'purple'], ['#EEE', 'orange'], ['#EEE', 'steelblue'], ['#EEE', 'red'], ['steelblue', 'red'], ['green', 'yellow']];

        var layers = [{
          type: 'link',
          data: commData,
          threshold: 0,
          ignoreDiagonal: !_this2.showIntraComm,
          size: 2,
          vmap: { color: 'CommData' },
          colors: ['steelblue', 'red'],
          colorDomain: colorDomains[0]
        }];

        var layerSpec = {
          type: 'rect',
          size: 1
        };

        if (clusterIds.length && processIds.length) {
          metricData.forEach(function (items) {
            items.forEach(function (item) {
              var gid = item.Peid * _this2.numKP + item.Kpid;
              var pid = processIds.indexOf(gid);
              item.clusterId = clusterIds[pid];
            });
          });

          layerSpec.colors = function (d) {
            return clusterColors[d];
          };
          layerSpec.vmap = { color: 'clusterId' };
        }

        metrics.forEach(function (metric, mi) {
          var layer = assign_default()({}, layerSpec);
          layer.data = metricData;
          layer.colorDomain = colorDomains[mi + 1];

          if (clusterIds.length && processIds.length) {
            layer.vmap.size = measure + '.' + metric;
          } else {
            layer.vmap = { color: measure + '.' + metric };
            layer.colors = colorSets[mi];
          }
          layers.push(layer);
        });

        layers.push({
          type: 'text',
          data: metricData.map(function (r, i) {
            return 'PE' + i;
          }),
          size: 1
        });

        var div = document.createElement('div');
        var radius = container.clientWidth / timeIntervals.length;
        _this2.rings[tii] = Object(picos["a" /* default */])({
          config: {
            container: div,
            legend: tii === timeIntervals.length - 1,
            width: radius,
            height: radius
          },
          layers: layers
        });

        container.appendChild(div);
        _this2.rings[tii].forEach(function (ring, rii) {
          if (Array.isArray(colorDomains[rii])) {
            colorDomains[rii][0] = Math.min(colorDomains[rii][0], ring.colorDomain[0]);
            colorDomains[rii][1] = Math.max(colorDomains[rii][1], ring.colorDomain[1]);
          } else {
            if (Array.isArray(ring.colorDomain)) {
              colorDomains[rii] = ring.colorDomain;
            }
          }
        });
      });
      this.maxLinkValue = colorDomains[0][1];
      if (timeIntervals.length > 1) {
        this.rings.forEach(function (ringLayers) {
          ringLayers.forEach(function (ringLayer, rii) {
            if (typeof ringLayer.updateColor === 'function') {
              ringLayer.updateColor(colorDomains[rii]);
            }
          });
        });
      }
    }
  }
});
// EXTERNAL MODULE: ../p4/index.js
var p4 = __webpack_require__("m82B");

// EXTERNAL MODULE: ./src/html/TimeSeries.html
var TimeSeries = __webpack_require__("SUQ4");
var TimeSeries_default = /*#__PURE__*/__webpack_require__.n(TimeSeries);

// CONCATENATED MODULE: ./src/components/TimeSeries.js




/* harmony default export */ var components_TimeSeries = ({
  name: 'TimeSeries',
  template: TimeSeries_default.a,
  data: function data() {
    return {
      data: null,
      view: null,
      vis: null,
      container: null,
      enableInteraction: true,
      height: 0,
      width: 0,
      metrics: [],
      timeDomains: ['LastGvt', 'RealTs', 'VirtualTime'],
      granularities: ['System', 'PE', 'KP'],
      measures: ['avg', 'sum', 'max', 'min'],
      selectedTimeDomain: 'LastGvt',
      granularity: 'System',
      selectedMeasure: 'sum',
      selectedMetrics: ['NeventProcessed', 'RbTotal'],
      callback: null,
      colors: ['teal', 'purple', 'orange', 'steelblue'],
      visMarks: {
        System: 'area',
        PE: 'line',
        KP: 'line'
      },
      clusters: null,
      colorEncoding: null,
      colorSet: ['green', 'orange', 'purple', 'steelblue', 'red']
    };
  },
  watch: {
    clusters: function clusters(cls) {
      this.colorEncoding = cls[0];
    }
  },
  mounted: function mounted() {
    this.container = document.getElementById('RossVisTimeSeries');
  },

  methods: {
    init: function init(dataObj) {
      var cache = p4["a" /* default */].cstore({});
      cache.import(dataObj);
      cache.index('RealTs');
      cache.index('LastGvt');
      this.data = cache.data();
      this.width = this.container.clientWidth;
      this.height = this.container.clientHeight * 0.9;
      var config = {
        container: this.container,
        viewport: [this.width, this.height],
        padding: { left: 100, right: 20, top: 20, bottom: 50 }
      };
      this.vis = Object(p4["a" /* default */])(config).data(this.data);
    },
    destroy: function destroy() {
      this.vis = null;
      this.container.innerHTML = '';
    },
    visualize: function visualize(callback) {
      var _this = this;

      if (typeof callback === 'function') {
        this.callback = callback;
      }
      var aggregation = [];
      var collection = {};
      var views = [];
      var metrics = this.selectedMetrics;
      metrics.forEach(function (metric, mi) {
        collection[metric] = {};
        collection[metric]['$' + _this.selectedMeasure] = metric;
      });

      var firstMetric = {};
      var firstMetricName = keys_default()(collection)[0];
      firstMetric[firstMetricName] = collection[firstMetricName];

      var vmap = {
        mark: this.visMarks[this.granularity],
        x: this.selectedTimeDomain,
        color: 'colors',
        y: 'metrics',
        size: 1,
        gridlines: { y: true },
        opacity: this.granularity === 'KP' ? 0.5 : 1,
        facets: {
          rows: {
            metrics: metrics,
            colors: this.colors
          },
          sortBy: { var: 'metrics' }
        }
      };

      if (this.enableInteraction) {
        vmap.facets.brush = {
          condition: { x: true, lazy: true },
          callback: function callback(selection) {
            _this.callback(selection[_this.selectedTimeDomain]);
          }
        };
      }

      if (Array.isArray(this.clusters)) {
        this.clusters.forEach(function (cluster) {
          collection[cluster] = { $max: cluster };
        });
        if (this.colorEncoding) {
          vmap.color = {
            field: this.colorEncoding,
            range: this.colorSet,
            "interpolate": false
          };
        }
      }

      if (this.granularity === 'PE') {
        vmap.by = 'Peid';
        aggregation = [this.selectedTimeDomain, 'Peid'];
      } else if (this.granularity === 'KP') {
        aggregation = [this.selectedTimeDomain, 'KpGid'];
      } else {
        aggregation = [this.selectedTimeDomain];
      }

      this.vis.view(views).head().aggregate({
        $group: aggregation,
        $collect: collection
      }).visualize(vmap);

      this.selectedMetrics = vmap.facets.rows.metrics;
    }
  }
});
// EXTERNAL MODULE: ./src/html/TimeNet.html
var TimeNet = __webpack_require__("31Cv");
var TimeNet_default = /*#__PURE__*/__webpack_require__.n(TimeNet);

// CONCATENATED MODULE: ./src/components/TimeNet.js






/* harmony default export */ var components_TimeNet = ({
  name: 'TimeNet',
  template: TimeNet_default.a,
  components: {
    WebSocket: components_WebSocket,
    TimeSeries: components_TimeSeries,
    Communication: components_Communication
  },
  data: function data() {
    return {
      appName: 'ROSS-Vis',
      granularity: ['PE', 'KP', 'LP'],
      measures: ['avg', 'sum', 'max', 'min'],
      timeIndexes: null,
      selectedTimeDomain: 'LastGvt',
      selectedTimeInterval: null,
      selectedGran: 'PE',
      selectedMeasure: 'sum',
      isAggregated: true,
      left: false,
      metrics: [],
      selectedMetrics: ['NeventProcessed', 'RbTotal']
    };
  },
  methods: {
    connect: function connect() {
      var _this = this;

      this.$refs.WebSocket.connect().then(function (dataObj) {
        // this.timeIndexes = data.uniqueValues
        var timeDomains = _this.$refs.TimeSeries.timeDomains;
        _this.$refs.TimeSeries.init(dataObj);
        _this.data = dataObj.data;
        _this.metrics = keys_default()(dataObj.schema).filter(function (k) {
          return timeDomains.indexOf(k) === -1 && !k.match(/id$/i);
        });
        _this.reset();
      });
    },
    reset: function reset() {
      this.selectMetrics = ['NeventProcessed', 'RbTotal'];
      this.selectedTimeInterval = null;
      this.visualize();
    },
    updateCommunication: function updateCommunication() {
      this.$refs.Communication.visualize({
        data: this.data,
        measure: this.selectedMeasure,
        timeDomain: this.selectedTimeDomain,
        metrics: this.selectedMetrics,
        timeIntervals: [this.selectedTimeInterval]
      });
    },
    updateTimeSeries: function updateTimeSeries(callback) {
      this.$refs.TimeSeries.selectedMetrics = this.selectedMetrics;
      this.$refs.TimeSeries.visualize(callback);
      this.selectedMetrics = this.$refs.TimeSeries.selectedMetrics;
    },
    updateTimeDomain: function updateTimeDomain(timeDomain) {
      this.selectedTimeDomain = timeDomain;
      this.updateCommunication();
    },
    visualize: function visualize() {
      var _this2 = this;

      var callback = function callback(selection) {
        _this2.selectedTimeInterval = selection;
        _this2.updateCommunication();
      };
      this.updateTimeSeries(callback);
      this.updateCommunication();
    }
  }
});
// EXTERNAL MODULE: ./src/html/Dimensionality.html
var Dimensionality = __webpack_require__("XMpN");
var Dimensionality_default = /*#__PURE__*/__webpack_require__.n(Dimensionality);

// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__("mtWM");
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// CONCATENATED MODULE: ./src/components/Dimensionality.js






/* harmony default export */ var components_Dimensionality = ({
  name: 'Dimensionality',
  template: Dimensionality_default.a,
  data: function data() {
    return {
      data: null,
      server: null,
      dimensionalMethods: ['PCA', 'tSNE'],
      dimensionalSelected: 'PCA',
      clusteringMethods: ['DBSCAN', 'KMeans'],
      clusteringSelected: 'DBSCAN',
      metrics: [],
      metricX: null,
      metricY: null,
      granularities: ['PE', 'KP'],
      granularity: 'PE',
      proc: null,
      oncomplete: null,
      colorSet: ['teal', 'purple', 'orange', 'steelblue']
    };
  },
  methods: {
    init: function init() {
      var container = this.$refs.Vis;
      var width = container.parentElement.clientWidth;
      var height = container.parentElement.clientHeight;
      container.innerHTML = '';
      this.proc = Object(p4["a" /* default */])({
        container: container,
        viewport: [width, height],
        padding: { left: 80, right: 30, top: 30, bottom: 80 }
      }).view([{
        width: width, height: height,
        offset: [0, 0],
        color: {
          range: this.colorSet,
          interpolate: false
        }
      }]);
      return this.analyze();
    },
    analyze: function analyze() {
      var _this = this;

      var baseURL = 'http://localhost:8888/analysis';
      var dr = this.dimensionalSelected.toLowerCase();
      var cl = this.clusteringSelected.toLowerCase();
      var url = [baseURL, this.granularity, dr].join('/');

      return new promise_default.a(function (resolve, reject) {
        axios_default.a.get(url).then(function (result) {
          _this.metrics = keys_default()(result.data.schema);
          var data = p4["a" /* default */].cstore().import({
            data: result.data.data,
            schema: result.data.schema
          }).data();
          _this.proc.data(data);
          _this.visualize();

          var res = {
            schema: result.data.schema,
            data: result.data.data,
            granularity: _this.granularity,
            clustering: _this.clusteringMethods.map(function (d) {
              return d.toLowerCase();
            })
          };
          if (typeof _this.oncomplete === 'function') {
            _this.oncomplete(res);
          }
          resolve(res);
        }).catch(function (err) {
          reject(err);
        });
      });
    },
    visualize: function visualize() {
      this.proc.visualize({
        x: 'PC0',
        y: 'PC1',
        color: this.clusteringSelected.toLowerCase(),
        opacity: 0.5,
        size: this.granularity === 'PE' ? 20 : 10
      });
    }
  }
});
// EXTERNAL MODULE: ./src/html/DimNet.html
var DimNet = __webpack_require__("IB2n");
var DimNet_default = /*#__PURE__*/__webpack_require__.n(DimNet);

// CONCATENATED MODULE: ./src/components/DimNet.js







/* harmony default export */ var components_DimNet = ({
  name: 'DimNet',
  template: DimNet_default.a,
  components: {
    WebSocket: components_WebSocket,
    Dimensionality: components_Dimensionality,
    Communication: components_Communication
  },
  data: function data() {
    return {
      appName: 'ROSS-Vis',
      timeDomains: ['LastGvt', 'RealTs', 'VirtualTime'],
      granularity: ['PE', 'KP', 'LP'],
      measures: ['avg', 'sum', 'max', 'min'],
      timeIndexes: null,
      selectedTimeDomain: 'LastGvt',
      selectedTimeInterval: null,
      selectedGran: 'PE',
      selectedMeasure: 'sum',
      isAggregated: true,
      left: false,
      metrics: [],
      selectedMetrics: []
    };
  },
  methods: {
    connect: function connect() {
      var _this = this;

      this.$refs.Dimensionality.init();
      this.$refs.WebSocket.connect().then(function (dataObj) {
        _this.$refs.Dimensionality.server = _this.$refs.WebSocket.server;
        _this.data = dataObj.data;
        _this.metrics = keys_default()(dataObj.schema).filter(function (k) {
          return _this.timeDomains.indexOf(k) === -1 && !k.match(/id$/i);
        });
        _this.reset();
      });
    },
    reset: function reset() {
      this.selectMetrics = ['NeventProcessed', 'RbTotal'];
      this.selectedTimeInterval = null;
      this.visualize();
    },
    updateCommunication: function updateCommunication() {
      this.$refs.Communication.visualize({
        data: this.data,
        measure: this.selectedMeasure,
        timeDomain: this.selectedTimeDomain,
        metrics: this.selectedMetrics,
        timeIntervals: [this.selectedTimeInterval]
      });
    },
    visualize: function visualize() {
      // let callback = (selection) => {
      //   let ti = this.timeIndexes[this.selectedTimeDomain]
      //   let start = Math.floor(selection[this.selectedTimeDomain][0])
      //   let end = Math.ceil(selection[this.selectedTimeDomain][1])
      //   if (end - start > 1) {
      //     this.selectedTimeInterval = [ti[start], ti[end]]
      //     this.updateCommunication()
      //   }
      // }
      // this.updateTimeSeries(callback)
      // this.updateCommunication()
    }
  }
});
// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("bOdI");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./src/html/DimTime.html
var DimTime = __webpack_require__("td/E");
var DimTime_default = /*#__PURE__*/__webpack_require__.n(DimTime);

// CONCATENATED MODULE: ./src/components/DimTime.js







/* harmony default export */ var components_DimTime = ({
  name: 'DimTime',
  template: DimTime_default.a,
  components: {
    WebSocket: components_WebSocket,
    Dimensionality: components_Dimensionality,
    TimeSeries: components_TimeSeries
  },
  data: function data() {
    var _ref;

    return _ref = {
      appName: 'ROSS-Vis',
      timeDomains: ['LastGvt', 'RealTs', 'VirtualTime'],
      granularity: ['PE', 'KP', 'LP'],
      measures: ['avg', 'sum', 'max', 'min'],
      timeIndexes: null,
      selectedTimeDomain: 'LastGvt',
      selectedTimeInterval: null
    }, defineProperty_default()(_ref, 'granularity', 'PE'), defineProperty_default()(_ref, 'selectedMeasure', 'sum'), defineProperty_default()(_ref, 'isAggregated', true), defineProperty_default()(_ref, 'left', false), defineProperty_default()(_ref, 'metrics', []), defineProperty_default()(_ref, 'selectedMetrics', []), _ref;
  },
  methods: {
    connect: function connect() {
      var _this = this;

      this.$refs.WebSocket.connect().then(function (dataObj) {
        _this.$refs.Dimensionality.server = _this.$refs.WebSocket.server;
        _this.data = dataObj.data;
        _this.metrics = keys_default()(dataObj.schema).filter(function (k) {
          return _this.timeDomains.indexOf(k) === -1 && !k.match(/id$/i);
        });

        _this.$refs.Dimensionality.oncomplete = function (result) {
          _this.$refs.TimeSeries.granularity = result.granularity;
          _this.$refs.TimeSeries.clusters = result.clustering;
          _this.$refs.TimeSeries.colorEncoding = result.clustering[0];
          _this.$refs.TimeSeries.enableInteraction = false;
          if (_this.$refs.TimeSeries.vis !== null) {
            _this.$refs.TimeSeries.destroy();
          }
          _this.$refs.TimeSeries.init(_this.joinData(dataObj, result));
          _this.$refs.TimeSeries.visualize();
        };
        _this.$refs.Dimensionality.init();
      });
    },
    joinData: function joinData(dataObj, result) {
      var sid = result.granularity === 'PE' ? 'Peid' : 'KpGid';
      var clusters = {};
      result.clustering.forEach(function (clm) {
        clusters[clm] = result.data.sort(function (a, b) {
          return a[sid] - b[sid];
        }).map(function (d) {
          return d[clm];
        });
        dataObj.schema[clm] = 'int';
      });

      dataObj.data.forEach(function (d) {
        result.clustering.forEach(function (clm) {
          d[clm] = clusters[clm][d[sid]];
        });
      });

      return dataObj;
    },
    reset: function reset() {
      this.selectMetrics = ['NeventProcessed', 'RbTotal'];
      this.selectedTimeInterval = null;
      this.visualize();
    },
    visualize: function visualize() {
      // let callback = (selection) => {
      //   let ti = this.timeIndexes[this.selectedTimeDomain]
      //   let start = Math.floor(selection[this.selectedTimeDomain][0])
      //   let end = Math.ceil(selection[this.selectedTimeDomain][1])
      //   if (end - start > 1) {
      //     this.selectedTimeInterval = [ti[start], ti[end]]
      //     this.updateCommunication()
      //   }
      // }
      // this.updateTimeSeries(callback)
      // this.updateCommunication()
    }
  }
});
// EXTERNAL MODULE: ./src/html/CommPanels.html
var CommPanels = __webpack_require__("cD/j");
var CommPanels_default = /*#__PURE__*/__webpack_require__.n(CommPanels);

// CONCATENATED MODULE: ./src/components/CommPanels.js








/* harmony default export */ var components_CommPanels = ({
  name: 'Dashboard',
  template: CommPanels_default.a,
  components: {
    Communication: components_Communication
  },
  data: function data() {
    return {
      socketError: false,
      server: 'vidi1.cs.ucdavis.edu:8888',
      timeDomains: ['LastGvt', 'RealTs', 'VirtualTime'],
      granularity: ['PE', 'KP', 'LP'],
      measures: ['avg', 'sum', 'max', 'min'],
      timeIndexes: null,
      timeDomain: 'LastGvt',
      selectedGran: 'PE',
      selectedMeasure: 'sum',
      metrics: ['RbSec', 'RbPrim'],
      timeIntervals: [[204471, 238514], [242484, 263715], [280495, 363079]],
      processIds: [],
      clusterIds: [],
      clusterColors: [[227, 119, 194], [188, 189, 34], [23, 190, 207], [127, 127, 127]]
    };
  },
  mounted: function mounted() {
    this.init();
  },


  methods: {
    init: function init() {
      var _this = this;

      var socket = new WebSocket('ws://' + this.server + '/websocket');
      socket.onopen = function () {
        _this.dialog = !_this.dialog;
        _this.socketError = false;
        socket.send(stringify_default()({ method: 'get', data: 'KpData' }));
      };

      socket.onerror = function (error) {
        _this.socketError = true;
      };

      socket.onmessage = function (event) {
        var data = JSON.parse(event.data);
        data.data.forEach(function (d) {
          d.RbPrim = d.RbTotal - d.RbSec;
        });
        _this.data = data.data;
        if (data.schema.hasOwnProperty('CommData')) {
          data.schema.CommData = 'int';
        }
        _this.$refs.container.allMetrics = keys_default()(data.schema).filter(function (k) {
          return k.slice(-2) !== 'id' && k.slice(-2) !== 'Id';
        });
        var params = data.params || {};

        if (params.timeIntervals) _this.timeIntervals = params.timeIntervals;
        if (params.timeMetric) _this.timeDomain = params.timeMetric;
        if (params.ringMetrics) {
          _this.metrics = params.ringMetrics;
          _this.$refs.container.metrics = params.ringMetrics;
        }
        if (params.processIds) _this.processIds = params.processIds;
        if (params.clusterIds) _this.clusterIds = params.clusterIds;
        if (params.clusterColors) _this.clusterColors = params.clusterColors.map(function (c) {
          return 'rgb(' + c.join(',') + ')';
        });
        _this.update();
      };
    },
    update: function update() {
      this.$refs.container.visualize({
        data: this.data,
        measure: 'sum',
        timeDomain: this.timeDomain,
        metrics: this.metrics,
        timeIntervals: this.timeIntervals,
        processIds: this.processIds,
        clusterIds: this.clusterIds,
        clusterColors: this.clusterColors
      });
    },
    updateMetrics: function updateMetrics(metrics) {
      this.metrics = metrics;
      this.update();
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/HomePage.vue
//
//
//
//
//
//
//
//

/* harmony default export */ var HomePage = ({
  name: 'HomePage'
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-27cb0925","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/HomePage.vue
var HomePage_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"RossVisHome"}},[_c('p',[_c('router-link',{attrs:{"to":"/timenet"}},[_vm._v("TimeSeries + Communication Analysis")])],1),_vm._v(" "),_c('p',[_c('router-link',{attrs:{"to":"/dimtime"}},[_vm._v("Dimensionality + TimeSeries Analysis")])],1),_vm._v(" "),_c('p',[_c('router-link',{attrs:{"to":"/dimnet"}},[_vm._v("Dimensionality + Communication Analysis")])],1)])}
var HomePage_staticRenderFns = []
var HomePage_esExports = { render: HomePage_render, staticRenderFns: HomePage_staticRenderFns }
/* harmony default export */ var components_HomePage = (HomePage_esExports);
// CONCATENATED MODULE: ./src/components/HomePage.vue
function HomePage_injectStyle (ssrContext) {
  __webpack_require__("3ySA")
}
var HomePage_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var HomePage___vue_template_functional__ = false
/* styles */
var HomePage___vue_styles__ = HomePage_injectStyle
/* scopeId */
var HomePage___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var HomePage___vue_module_identifier__ = null
var HomePage_Component = HomePage_normalizeComponent(
  HomePage,
  components_HomePage,
  HomePage___vue_template_functional__,
  HomePage___vue_styles__,
  HomePage___vue_scopeId__,
  HomePage___vue_module_identifier__
)

/* harmony default export */ var src_components_HomePage = (HomePage_Component.exports);

// CONCATENATED MODULE: ./src/router.js




vue_esm["default"].use(vue_router_esm["a" /* default */]);
vue_esm["default"].use(vuetify_default.a);










/* harmony default export */ var router = (new vue_router_esm["a" /* default */]({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'HomePage',
    component: src_components_HomePage
  }, {
    path: '/dimtime',
    name: 'DimTime',
    component: components_DimTime
  }, {
    path: '/timenet',
    name: 'TimeNet',
    component: components_TimeNet
  }, {
    path: '/dimnet',
    name: 'DimNet',
    component: components_DimNet
  }, {
    path: '/communications',
    name: 'Communications',
    component: components_CommPanels
  }]
}));
// CONCATENATED MODULE: ./src/main.js
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.




vue_esm["default"].config.productionTip = false;

/* eslint-disable no-new */
new vue_esm["default"]({
  el: '#app',
  router: router,
  components: { App: src_App },
  template: '<App/>'
});

/***/ }),

/***/ "OZ8g":
/***/ (function(module, exports, __webpack_require__) {

const derive = __webpack_require__("12xM");
const queries = __webpack_require__("l+1b");
const aggregate = __webpack_require__("L1ge");
const match = __webpack_require__("Xj71");

module.exports = function pipeline (data){
    var queue = [],
        cache = {},
        opt = {},
        workers = [],
        completed = 0,
        result = [],
        callback = function() {};

    if(Array.isArray(data)) {
        result = data;
    }

    opt.derive = derive;
    opt.match = match;
    opt.aggregate = aggregate;

    Object.keys(queries).forEach(function(f) {
        opt[f] = queries[f];
    });

    opt.cache = function(data, tag){
        cache[tag] = pipeline.result();
    };

    opt.map = function(f){
        result = data.map(f);
        return pipeline;
    };

    var merge = {
        aggregate: function (lastJob) {
            var mergeSpec = {};
            for(var key in lastJob.aggregate) {
                var optSpec = lastJob.aggregate[key];
                if(typeof optSpec == 'object')
                    mergeSpec[key] = Object.keys(optSpec)[0];
                else
                    mergeSpec[key] = optSpec;
            }
            return opt.aggregate(finalResult, mergeSpec);
        }
    }

    var finalResult = [];

    function mergeResult(workerResult) {
        var rl = finalResult.length,
            wl = workerResult.length;
        for(var i = 0; i < wl; i++) {
            finalResult[rl+i] = workerResult[i];
        }
        completed += 1;

        if(completed == workers.length) {
            var lastJob = queue[queue.length-1],
                lastJobOpt = Object.keys(lastJob)[0];
            if( lastJobOpt == 'aggregate') {
                finalResult = merge.aggregate(lastJob);
            }
            callback(finalResult);
        }
    }

    var pipeline = {};

    // pipeline.opt = opt;
    Object.keys(opt).forEach(function(o){
        pipeline[o] = function(spec) {
            var task = {};
            task[o] = spec;
            queue.push(task);
            return pipeline;
        };
    })

    pipeline.then = function(_callback) {
        callback = _callback;
        queue.forEach(function(q){
            var f = Object.keys(q)[0];
            result = opt[f](result, q[f]);
        });
        return result;
    }

    pipeline.execute = function(data) {
        if(Array.isArray(data)) result = data;
        queue.forEach(function(q){
            var f = Object.keys(q)[0];
            result = opt[f](result, q[f]);
        });
        return result;
    }

    pipeline.oncomplete = pipeline.then;

    pipeline.result = function() {
        return result;
    };

    pipeline.data = function(data) {
        result = data;
        return pipeline
    }

    pipeline.queue = function() {
        return queue;
    }

    pipeline.runSpec = function(specs) {
        specs.forEach(function(spec){
            let opt = Object.keys(spec)[0];
            pipeline[opt.replace('$', '')](spec[opt])
        })
        return pipeline.execute();
    }

    return pipeline;
}


/***/ }),

/***/ "PU2m":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ../p4/src/ctypes.js
var ctypes = __webpack_require__("h6yt");

// CONCATENATED MODULE: ../p4/src/utils.js


function seq(dtype, start, end, interval) {
    var step = interval || 1,
        size = (end - start) / step + 1,
        buf;

    buf = new ctypes[dtype](size);
    for (var i = 0; i < size; i++) {
        buf[i] = start + i * step;
    }
    return buf;
}

let seqInt = seq.bind(null, "int");
let seqFloat = seq.bind(null, "float");

// EXTERNAL MODULE: ../p4/src/arrays.js
var arrays = __webpack_require__("S2QL");

// CONCATENATED MODULE: ../p4/src/allocate.js


const vecId = ['x', 'y', 'z'];
/* harmony default export */ var allocate = (function($p, dataProps) {
    let data = dataProps || [];
    $p.indexes = data.indexes || [];
    $p.categoryIndex = data.strValues || {};
    $p.strValues = data.strValues || {};
    $p.strLists = data.strLists || {};
    $p.dkeys =  data.keys || [];
    $p.dtypes =  data.dtypes || data.types || [];
    $p.intervals =  data.intervals || {};
    $p.uniqueValues = data.uniqueValues;
    $p.dataSchema = data.struct;

    let dkeys = $p.dkeys;
    let dtypes = $p.dtypes;
    let stats =  data.stats || null;
    
    if (Number.isInteger(data.size)) {
        $p.dataSize = data.size;
    } else if (Array.isArray(data)) {
        $p.dataSize = Math.max(...data.map(d => d.length));
    }

    let rowSize = Math.min($p.dataSize, $p.rowSize);
    let colSize = Math.ceil($p.dataSize / rowSize);

    $p.dataDimension = [rowSize, colSize];
    $p.resultDimension = [rowSize, colSize];
    $p.fields = $p.indexes.concat(dkeys.filter(function(k) {
        return $p.indexes.indexOf(k) === -1;
    }));
    $p.fieldWidths = new Array($p.fields.length).concat(new Array($p.deriveMax).fill(1));
    $p.fieldCount = $p.fields.length - $p.indexes.length;
   
    function getDataWidth(fid, range) {
        var range = Math.abs(range[1] - range[0]);
        if (dtypes[fid] == "index" || dtypes[fid] == "int" || dtypes[fid] == "string") {
            return range + 1;
        } else if (dtypes[fid] == "histogram") {
            return range + 1;
        } else if (["nominal", "ordinal", "categorical"].indexOf(dtypes[fid]) > -1) {
            return data.TLB.length;
        } else if (dtypes[fid] in ["float", "double", "numeric"]) {
            return 10;
        } else {
            return range + 1;
        }
    }
    $p.fields.forEach(function(field) {
        var min = stats[field].min,
            max = stats[field].max,
            fi = dkeys.indexOf(field);
        $p.fieldWidths[fi] = getDataWidth(fi, [min, max]);
    });
    $p.getDataWidth = getDataWidth;
    $p.deriveDomains = new Array($p.deriveMax).fill([0, 1]);
    $p.deriveWidths = new Array($p.deriveMax).fill(1);
    $p.deriveFieldCount = 0;

    $p.getFieldId = function (fieldName) {
        let fieldId = $p.fields.indexOf(fieldName);
        if($p.indexes.length > 0 && fieldId >= $p.indexes.length) {
            fieldId -= $p.indexes.length; 
        }
        return fieldId; 
    }

    if ($p.indexes.length === 0) {
        $p.attribute("aDataIdx", "float", seqFloat(0, $p.dataDimension[0] - 1));
        $p.attribute("aDataIdy", "float", seqFloat(0, $p.dataDimension[1] - 1));
        $p.attribute("aDataValx", "float", seqFloat(0, $p.dataDimension[0] - 1));
        $p.attribute("aDataValy", "float", seqFloat(0, $p.dataDimension[1] - 1));
    } else {
        $p.indexes.forEach(function(id, i) {
            let indexAttrData = Object(arrays["unique"])(data[id]).sort( (a, b) => b - a );
            $p.attribute("aDataVal" + vecId[i], "float", new Float32Array(indexAttrData));
            $p.attribute("aDataId" + vecId[i], "float", seqFloat(0, indexAttrData.length - 1));
            $p.fieldWidths[i] = indexAttrData.length;
            $p.dataDimension[i] = indexAttrData.length;
        });
    }

    $p.attribute("aDataItemVal0", "float", null);
    $p.attribute("aDataItemVal1", "float", null);
    $p.attribute("aDataItemId", "float", new Float32Array($p.dataSize).map((d,i)=>i));
    $p.attribute("aDataFieldId", "vec2", new Float32Array($p.fields.length * 2).map((d,i)=>i));
    $p.attribute("aVertexId", "float", [0, 1, 2, 3, 4, 5]);
    $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aVertexId.location, 0);
    $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aDataFieldId.location, 0);
    $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aDataItemId.location, 1);

    $p.attribute(
        "_square",
        "vec2",
        new Float32Array([
            -1.0, -1.0, 1.0, -1.0, 
            -1.0, 1.0, -1.0, 1.0,
            1.0, -1.0, 1.0, 1.0
        ])
    );
    $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute._square.location, 1);

    //TODO: get data statistics using the GPU
    if(stats !== null) {
        $p.fieldDomains = $p.fields.map(function(k, i) {
            return [stats[k].min, stats[k].max];
        }).concat(new Array($p.deriveMax).fill([0, 1]));
        $p.uniform("uFieldDomains", "vec2",  $p.fieldDomains);
    } else {
        $p.uniform("uFieldDomains", "vec2",  $p.fields.map(f => [0, 1]));
    }

    let filterControls = new Array($p.fieldCount).fill(0);
    //setup all attribute, uniform, texture, varying needed by all the shaders
    $p.uniform("uDataSize",    "float", $p.dataSize);
    $p.uniform("uDataDim",     "vec2",  $p.dataDimension);
    $p.uniform("uResultDim",   "vec2",  $p.dataDimension);
    $p.uniform("uIndexCount",  "int",   $p.indexes.length);
    $p.uniform("uFieldWidths", "float", $p.fieldWidths);
    $p.uniform("uFieldCount",  "int",   $p.fieldCount);
    $p.uniform("uFieldId",     "int",   0);
    $p.uniform("uFilterFlag",  "int",   0);
    $p.uniform("uFilterControls","int", filterControls)
    $p.uniform("uVisControls","int", filterControls);
    $p.uniform("uFilterRanges","vec2", $p.fieldDomains);
    $p.uniform("uVisRanges","vec2", $p.fieldDomains);
    // $p.uniform("uGroupFields", "int",   [0, -1]);
    $p.uniform("uDataInput",   "sampler2D");
    $p.uniform("uDeriveCount", "int", $p.deriveMax);
    // $p.uniform("uDeriveDomains", "vec2", $p.deriveDomains);
    // $p.uniform("uDeriveWidths", "float", $p.deriveWidths);
    $p.uniform("uFilterLevel", "float", 0.1)
    $p.uniform('uVisLevel',    "float", 0.1)

    $p.varying("vResult", "float");
    $p.varying("vDiscardData", "float");
    $p.texture(
        "tData",
        "float",
        new Float32Array($p.dataDimension[0] * $p.dataDimension[1] * $p.fieldCount), [$p.dataDimension[0], $p.dataDimension[1] * $p.fieldCount],
        "alpha"
    );
    $p.framebuffer("fFilterResults", "unsigned_byte", $p.dataDimension);
    $p.framebuffer("fGroupResults", "float", [1024, 1]);
    $p.framebuffer("fDerivedValues", "float", [$p.dataDimension[0], $p.dataDimension[1] * $p.deriveMax]);
    $p.framebuffer("fStats", "float", [2, $p.fieldCount]);
    $p.parameter({
        fieldCount: $p.fields.length - $p.indexes.length,
        indexCount: $p.indexes.length
    });

    $p.fields.slice($p.indexes.length).forEach(function(attr, ai) {
        let buf = new Float32Array($p.dataDimension[0] * $p.dataDimension[1]);
        for (let i = 0, l = data[attr].length; i < l; i++) {
            buf[i] = data[attr][i];
        }

        $p.texture.tData.update(
            buf, [0, $p.dataDimension[1] * ai], $p.dataDimension
        );
    });

    // $p.texture.tData.sampler = $p.uniform.uDataInput;
    $p.uniform.uDataInput = $p.texture.tData;

    function getFieldWidth({fid = 'int'}) {
        return this.uFieldWidths[fid];
    }

    function getFieldDomain({fid = 'int'}) {
        return this.uFieldDomains[fid];
    }

    function getData({fid = 'int', r = 'float', s = 'float'}) {
        var t, value;
        if (fid >= this.uFieldCount + this.uIndexCount) {
            t = (float(fid - this.uFieldCount - this.uIndexCount) + s) /
                float(this.uDeriveCount);
            value = texture2D(this.fDerivedValues, vec2(r, t)).a;
        } else {
            if (this.uIndexCount > 0 && fid == 0) value = this.aDataValx;
            else if (this.uIndexCount > 1 && fid == 1) value = this.aDataValy;
            else {
                t = (float(fid - this.uIndexCount) + s) / float(this.uFieldCount);
                value = texture2D(this.uDataInput, vec2(r, t)).a;
            }
        }
        return value;
    }

    function getNonIndexedData({fieldId = 'int', addrX = 'float', addrY = 'float'}) {
        var offsetY, value;
        if (fieldId >= this.uFieldCount + this.uIndexCount) {
            offsetY = (float(fieldId - this.uFieldCount - this.uIndexCount) + addrY) /
                float(this.uDeriveCount);
            value = texture2D(this.fDerivedValues, vec2(addrX, offsetY)).a;
        } else {
            offsetY = (float(fieldId - this.uIndexCount) + addrY) / float(this.uFieldCount);
            value = texture2D(this.uDataInput, vec2(addrX, offsetY)).a;
        }
        return value;
    }

    $p.subroutine("getFieldWidth", "float", getFieldWidth);
    $p.subroutine("getFieldDomain", "vec2", getFieldDomain);
    $p.subroutine("getData", "float", getData);
    $p.subroutine("getNonIndexedData", "float", getNonIndexedData);

    var gl = $p.ctx;
    gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataIdx.location, 0);
    gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataValx.location, 0);
    gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataIdy.location, 1);
    gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataValy.location, 1);

});

// EXTERNAL MODULE: ../p4/src/io/ajax.js
var ajax = __webpack_require__("16Nc");

// EXTERNAL MODULE: ../p4/src/cstore.js
var cstore = __webpack_require__("z27Q");

// EXTERNAL MODULE: ../p4/src/io/parse.js
var parse = __webpack_require__("R4fJ");

// CONCATENATED MODULE: ../p4/src/io/input.js




const INPUT_TYPES = [
    'json',
    'csv',
    'text',
    'RowArrays',
    'ColArrays',
    'cstore',
];

const INPUT_METHODS = ['memory', 'http', 'websocket', 'file'];

function input({
    type = 'cstore',
    method = 'memory',
    delimiter = ',',
    size,
    schema,
    source,
    onready,
    uniqueKeys = []
}) {
    if(INPUT_TYPES.indexOf(type) === -1) {
        throw Error('Invalid input type ', type)
    }

    if(INPUT_METHODS.indexOf(method) === -1) {
        throw Error('Unknown method ', method)
    }

    let cache;

    function createIndexes() {
        uniqueKeys.forEach(function(uk){
            cache.index(uk);
        })
    }

    let dataHandlers = {
        json: function(data) {
            cache = Object(cstore["a" /* default */])({schema, size})
            cache.import((method == 'websocket') ? JSON.parse(data) : data);
            createIndexes();
            return cache.data();
        },
        csv: function(text) {
            let data = Object(parse["a" /* default */])(text, delimiter);
            let fields = data.shift();
            cache = Object(cstore["a" /* default */])({keys: fields, types: fields.map(() => 'float')})
            cache.addRows(data);
            createIndexes();
            return cache.data();
        },
        cstore: function() {
            if(Number.isInteger(source.size) && Array.isArray(source.types)) {
                return source;
            }
        }
    }

    dataHandlers.text = dataHandlers.csv;

    let response = function(data) {
        return new Promise(function(resolve, reject) {
            if(typeof(dataHandlers[type]) === 'function') {
                resolve(dataHandlers[type](data));
            } else {
                reject(Error('No handler for data type ', type));
            }
        })
    }

    if(method === 'http') {
        return ajax["get"]({url: source, dataType: type}).then(response);
    } else if (method == 'websocket') {
        return new Promise(function(resolve, reject) {
            var socket = new WebSocket(source);
            socket.onopen = function() {
                if(typeof(onready) === 'function') onready(socket)
            }
            socket.onmessage = function(event) {
                resolve(dataHandlers[type](event.data));
            }
            socket.onerror = function(err) {
                reject(err);
            }
        });
    } else {
        return response(source);
    }
}

// CONCATENATED MODULE: ../p4/src/io/output.js
/* harmony default export */ var output = (function($p) {

    let output = {};
    
    output.result = function({format = 'row', outputTag = 'fGroupResults'}) {
        let objectArray = new Array();
        let match = null;
        if($p.uniform.uFilterFlag.data == 1){
            match = $p.getMatchBuffer()
        }
        // $p.setInput(outputTag)
        // console.log($p.extraDimension)
        for(let edi = 0; edi < $p.extraDimension; edi++) { 
            let buf = $p.getResultBuffer({outputTag, offset: [edi * $p.resultDimension[0], 0]});
            let res = {};
            let offset = 0;
            let rs = 0;
            if(typeof buf.subarray !== 'function') return buf;
            if($p.indexes.length > 0) {
                if ($p.resultDimension[0] > 1) {
                    res[$p.fields[rs]] = $p.attribute.aDataValx.data;
                    rs++;
                }
                if ($p.resultDimension[1] > 1) {
                    var bx = $p.attribute.aDataValx.data;
                    var by = $p.attribute.aDataValy.data;
                    var ax = new Array($p.resultDimension[0] * $p.resultDimension[1]);
                    var ay = new Array($p.resultDimension[0] * $p.resultDimension[1]);

                    for (var y = 0; y < $p.resultDimension[1]; y++) {
                        for (var x = 0; x < $p.resultDimension[0]; x++) {
                            ax[y * $p.resultDimension[0] + x] = bx[x];
                            ay[y * $p.resultDimension[0] + x] = by[y]
                        }
                    }
                    res[$p.fields[0]] = ax;
                    res[$p.fields[rs]] = ay;
                    rs++;
                }
            }
 
            var arraySize = $p.resultDimension[0] * $p.resultDimension[1];
            let fields = $p.fields.filter( f => f !== $p.indexes[2]);
            for (var i = rs; i < fields.length; i++) {
                res[fields[i]] = buf.subarray(offset, offset + arraySize);
                offset += arraySize;
            };

            for (var i = 0; i < arraySize; i++) {
                if(match !== null && match[i] == 0) continue
    
                var obj = (format == 'array') ? new Array(fields.length) : {};
                if($p.extraDimension > 0 && $p.indexes.length === 3) {
                    let fieldName = $p.indexes[2];
                    obj[fieldName] = ($p.strLists.hasOwnProperty(fieldName)) ?  $p.strLists[fieldName][edi] : edi + 1;
                } 
                fields.forEach(function(f, fi) {
                    let kid = $p.dkeys.indexOf(f);
                    let dtype = $p.dtypes[kid];
                    let key = (format == 'array') ? fi : f;

                    if (dtype == 'string' && $p.strLists.hasOwnProperty(f)) {
                        obj[key] = $p.strLists[f][res[f][i]];
                    } else if ($p.intervals.hasOwnProperty(f) && $p.intervals[f].dtype == 'histogram') {
                        obj[key] = $p.intervals[f].min + res[f][i] * $p.intervals[f].interval;
                    } else if ($p.uniqueValues.hasOwnProperty(f)) {
                        obj[key] = $p.uniqueValues[f][res[f][i]];
                    } else {
                        obj[key] = res[f][i];
                    }
                });
                objectArray.push(obj);
            }
        }
        return objectArray;

    }

    output.readPixels = function({
        offset = [0, 0],
        resultSize =  $p.dataDimension[0]* $p.dataDimension[1],
        rowSize = Math.min(resultSize, $p.dataDimension[0]),
        colSize = Math.ceil(resultSize / $p.dataDimension[0])
    }) {
        let result = new Uint8Array(rowSize * colSize * 4);
        $p.bindFramebuffer(null);
        $p.ctx.readPixels(offset[0], offset[1], rowSize, colSize, gl.RGBA, gl.UNSIGNED_BYTE, result);
        return result.filter(function(d, i){ return i%4===3;} );
    }
    
    return output;
});

// EXTERNAL MODULE: ../p4/flexgl/index.js
var flexgl = __webpack_require__("pcb+");

// CONCATENATED MODULE: ../p4/src/initialize.js


function init({
    context = null,
    container = document.body,
    viewport =  [800, 450],
    padding = {left:0, right: 0,top: 0, bottom: 0},
    attributes = {},
    views
}){
    let $p = context;
    let defaultLayout = [
        {
            width: viewport[0],
            height: viewport[1],
            // padding: {left: 30, right: 30, top: 30, bottom: 30},
            offset: [0, 0]
        }
    ];
    if ($p === null) {
        $p = new flexgl["a" /* default */]({
            container: container,
            width: viewport[0],
            height: viewport[1],
            padding: {left:0, right: 0,top: 0, bottom: 0},
            attributes: attributes
        });
    }
    $p.container = container;
    $p.padding = padding;
    $p.viewport = viewport;
    $p.views = views || defaultLayout;
    return $p;
}

// CONCATENATED MODULE: ../p4/src/vis/brush.js
function brush(arg){

    var option = arg || {},
        container = option.container || this.svg[0],
        width = option.width || this.width,
        height = option.height || this.height,
        x = function(s) {return s},
        y = function(s) {return s},
        base = option.base || null,
        selectX = option.x || false,
        selectY = option.y || false,
        border = option.border || "#FFF",
        color = option.color || "#111",
        brush = option.brush || function() {},
        brushstart = option.brushstart || function() {},
        brushend = option.brushend || function() {};

    if(typeof(selectX) === "function") {
        x = selectX;
        selectX = true;
    }
    if(typeof(selectY) === "function") {
        y = selectY;
        selectY = true;
    }
    if(base === null){
        base = container.append("g").attr("class", "selector");
    } else {
        base = container;
    };

    base.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .attr("fill-opacity", 0)
        .attr("stroke", "none")
        .css("cursor", "crosshair");

    var selector = base.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 0)
        .attr("height", 0)
        .attr("fill-opacity", 0.1)
        .css("fill", color)
        .css("stroke", border)
        .css("cursor", "move");

    var sx, sy,
        dx, dy,
        bx, by,
        selection = {},
        intStart = false,
        drag = false;

    base.svg.addEventListener("mousedown", function(evt){
        evt.preventDefault();
        brushstart.call(this);
        intStart = true;
        sx = evt.clientX;
        sy = evt.clientY;

        var sp = selector.svg.getBoundingClientRect();
        var box = base.svg.getBoundingClientRect();
        var x0, y0, nw, nh;

        if(sx>sp.left && sy>sp.top && sx<sp.left+sp.width && sy<sp.top+sp.height) {
            drag = true;
            bx = sp.left;
            by = sp.top;
        }

        if(!drag){
            x0 = selectX ? sx - box.left : 0;
            y0 = selectY ? sy - box.top : 0;
            selector.attr("x", x0)
                .attr("y", y0)
                .attr("width", 0);
        }

        ondrag = function(evt){
            if(intStart){
                dx = evt.clientX - sx;
                dy = evt.clientY - sy;
                var selectorBox = selector.svg.getBoundingClientRect();
                if(drag){

                    var nx = bx + dx-box.left,
                        ny = by + dy-box.top;

                    if(bx+dx < box.left) nx = 0;
                    if(bx+dx+selectorBox.width > box.right) nx = width - selectorBox.width ;
                    if(by+dy < box.top) ny = 0;
                    if(by+dy+selectorBox.height > box.bottom) ny = height - selectorBox.height;
                    selector.attr("x", nx).attr("y", ny);
                } else {
                    if(evt.clientX < box.left) dx = box.left - sx;
                    if(evt.clientX > box.right) dx = box.right - sx;
                    if(evt.clientY > box.bottom) dy = box.bottom - sy;
                    if(evt.clientY < box.top) dy = box.top - sy;

                    x0 = selectX ? sx + dx - box.left: 0;
                    y0 = selectY ? sy + dy - box.top : 0;
                    nw = selectX ? Math.abs(dx) : width;
                    nh = selectY ? Math.abs(dy) : height;

                    if(dx<0 && dy>=0) selector.attr("x", x0);
                    if(dy<0 && dx>=0) selector.attr("y", y0);
                    if(dx<0 && dy<0) selector.attr("x", x0).attr("y", y0);
                    selector.attr("width", nw).attr("height", nh);
                }
                if(selectX) {
                    selection.x = [ x(selectorBox.left - box.left ), x(selectorBox.right - box.left )];
                }
                if(selectY) {
                    selection.y = [y(selectorBox.top - box.top), y(selectorBox.bottom - box.top)];
                }
                brush.call(this, selection);
            }
        };

        window.addEventListener("mousemove", ondrag, false);
        window.addEventListener("mouseup", function(evt){
            if(intStart){
                ondrag(evt);
                intStart = false;
                if(drag){
                    drag = false;
                }
            }
            brushend.call(this, selection);
            window.removeEventListener("mousemove", ondrag, false);
        }, false);
    });
};

// CONCATENATED MODULE: ../p4/src/interact.js


function interact($p, options) {
    var viewTags = options.view || [$p.views[0].id];

    if(!Array.isArray(viewTags)) viewTags = [viewTags];

    var actions = options.actions || options.events || [],
        condition = options.condition || {},
        facet = options.facet || false,
        callback = options.callback || function() {};

    if($p._update) return;

    if(!condition.x && !condition.y) {
        condition.x = condition.y = true;
    }

    viewTags.forEach(function(viewTag){
        var vis = $p.views.filter(v=>v.id == viewTag)[0];
        if(!Array.isArray(actions)) {
            actions = [actions];
        }

        if(vis === undefined || !vis.hasOwnProperty('chart')) return;

        var vmap = vis.vmap,
            p = vis.padding || $p.padding,
            w = vis.width - p.left - p.right,
            h = vis.height - p.top - p.bottom;
        
        var interactor = vis.chart.svg.append("g")
            .attr("class", "selector")

        if(facet === 'rows') {
            h = $p.viewport[1] - p.bottom;
        } else if(facet === 'columns') {
            w = $p.viewport[0] - p.right;
        }

        var rect = interactor.append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", w)
          .attr("height", h/2)
          .attr("fill-opacity", 0)
          .attr("stroke", "none");

        var svg = interactor.svg,
            box = rect.svg.getBoundingClientRect();

        function getSelection(e) {
            var dx = e.clientX - box.left;
            var dy = e.clientY - box.top;
            var selection = {};
            if(vmap.x) {
                selection[vmap.x] = [vis.chart.x.invert(dx)];
            }
            if(vmap.y) {
                selection[vmap.y] = [vis.chart.y.invert(h - dy)];
            }
            return selection;
        }

        actions.forEach(function(action){
            if(action == 'brush') {
                svg.style.cursor = "crosshair";
                var brushOptions = {
                    container: interactor,
                    width: w,
                    height: h
                };

                if(!Array.isArray(vmap.x) && !Array.isArray(vmap.y)) {
                    let updateEvent = (condition.lazy) ? 'brushend' : 'brush';
                    brushOptions[updateEvent] = function(d) {
                        var selection = {};
                        if(vmap.x && d.x) selection[vmap.x] = d.x;
                        if(vmap.y && d.y) {
                            if (d.y[0] > d.y[1]) {
                                selection[vmap.y] = d.y.reverse();
                            } else {
                                selection[vmap.y] = d.y;
                            }
                        }

                        Object.keys(selection).forEach(k => {
                            if ($p.uniqueValues.hasOwnProperty(k)) {
                                let values = $p.uniqueValues[k]
                                let start = Math.floor(selection[k][0]);
                                let end = Math.floor(selection[k][1]);
                                if(end === start) start -= 1;
                                selection[k] = [values[start], values[end]];
                            } 
                        })

                        callback(selection);
                    }
                    if(condition.x && typeof(vis.chart.x.invert) == 'function')
                        brushOptions.x = vis.chart.x.invert;

                    if(condition.y && typeof(vis.chart.y.invert) == 'function') {
                        brushOptions.y = (y) => { 
                            if(vmap.mark === 'rect') {
                                return vis.chart.y.invert(h-y);
                            }
                            return vis.chart.y.invert(y);
                        } 
                    }
                    
                    new brush(brushOptions);
                }

                var dims = ['x', 'y'],
                    selections = {};

                dims.forEach(function(dim){
                    if(Array.isArray(vmap[dim]) && Array.isArray(vis.chart[dim])){
                        var axisDist = (dim == 'x') ? h : w,
                            selectors = vis.chart.svg.append('g');

                        axisDist =  axisDist / (vmap[dim].length-1);

                        vmap[dim].forEach(function(d, i) {

                            var axisSelect = selectors.append("g");
                            if(dim == 'x') {
                                brushOptions.height = axisDist * 0.2;
                                axisSelect.translate(0, axisDist * (i - 0.1));
                                brushOptions.brush = function(range) {
                                    selections[d] = range[dim];
                                    callback(selections);
                                }
                            } else {
                                brushOptions.width = axisDist * 0.2;
                                axisSelect.translate(axisDist * (i - 0.1), 0);
                                brushOptions.brush = function(range) {
                                    selections[d] = range[dim].reverse();
                                    callback(selections);
                                }
                            }
                            brushOptions.container = axisSelect;
                            brushOptions[dim] = vis.chart[dim][i].invert;

                            new brush(brushOptions);
                        });
                    }
                })
            } else if(action == 'zoom') {
                vis.updateDomain = true;
                let delta = {x: null, y: null};
                let scale = 0.05;
                svg.onmousewheel = function(e) {
                    let dir = (e.deltaY > 0) ? 1 : -1;
                    let selection = {};
                    let proportion = {
                        x: (e.clientX - box.left) / box.width,
                        y: 1.0 - (e.clientY - box.top) / box.height
                    }

                    for (let dim of ['x', 'y']) {
                        if(condition[dim]) {
                            let attr = vis.vmap[dim];
                            if(delta[dim] === null ){
                                delta[dim] =  scale * (vis.domains[attr][1] - vis.domains[attr][0]);
                            }
      
                            let domain = vis.domains[attr];
                            let newDomain = [domain[0] - dir * delta[dim] * (proportion[dim]), domain[1] + dir * delta[dim] * (1-proportion[dim])];
                            if(newDomain[1] - newDomain[0] > 1e-9){
                                selection[attr] = newDomain;
                                vis.domains[attr] = newDomain;
                            } else {
                                scale *= 0.5;
                            }

                        }
                    }
                    callback(selection);
                }

            } else if(action == 'pan') {
                svg.style.cursor = 'move';
                vis.updateDomain = true;
                let selection = {};
                svg.onmousedown = function(e) {
                    let sx = e.clientX;
                    let sy = e.clientY;
                    svg.style.cursor = 'move';

                    function onpan(e) {
                        let delta = {
                            x: -(e.clientX - sx) / box.width,
                            y: (e.clientY - sy) / box.height
                        }
                        for (let dim of ['x', 'y']) {
                            if(condition[dim]) {
                                let attr = vis.vmap[dim];
                                let domain = vis.domains[attr];
                                let diff = delta[dim] * (domain[1] - domain[0]);
                                let newDomain = [domain[0] + diff, domain[1] + diff];
                                selection[attr] = newDomain;
                                vis.domains[attr] = newDomain;
                            }
                        }
                        sx = e.clientX;
                        sy = e.clientY;
                        callback(selection);
                    }

                    window.addEventListener("mousemove", onpan, false);
                    window.addEventListener("mouseup", function(){
                        svg.style.cursor = 'default';
                        window.removeEventListener("mousemove", onpan, false);
                    }, false);

                }

            } else if(action == 'click') {
                svg.onclick = function(e) {
                    callback(getSelection(e));
                }
            } 
            
            if(action == 'hover') {
                svg.onmouseover = function(e) {
                    callback(getSelection(e));
                    svg.onmousemove = function(e) {
                        callback(getSelection(e));
                    }

                    // svg.onmouseout = function(e) {
                    //     updatePos(e);
                    //     svg.style.cursor = 'default';
                    //     svg.onmousemove = null;
                    //     svg.onmouseover = null;
                    // }
                }
            }
        })
    })
}

// CONCATENATED MODULE: ../p4/src/control.js
/* harmony default export */ var control = (function ($p) {

    let registers = {};
    let control = {};

    let serializeArray = function(arrayOfArray) {
        return [].concat.apply([], arrayOfArray);
    }

    control.register = function(tag) {
        registers[tag] = {
            indexes: $p.indexes.slice(),
            dataSize: $p.dataSize,
            fields: $p.fields.slice(),
            fieldCount: $p.fieldCount,
            dataDim: $p.uniform.uDataDim.data.slice(),
            fieldWidths: $p.fieldWidths.slice(),
            fieldDomains: $p.fieldDomains.slice(),
            deriveCount: $p.deriveCount,
            filterFlag: $p.uniform.uFilterFlag.data,
            filterControls: $p.uniform.uFilterControls.data.slice(),
            dataInput: $p.uniform.uDataInput.data,
            resultDim: $p.resultDimension.slice(),
            attribute: {
                aDataIdx: {
                    ids: $p.attribute.aDataIdx.data,
                    value: $p.attribute.aDataValx.data
                },
                aDataIdy: {
                    ids: $p.attribute.aDataIdy.data,
                    value: $p.attribute.aDataValy.data
                },
                aDataFieldId: $p.attribute.aDataFieldId.data,
                aDataItemId: $p.attribute.aDataItemId.data
            },
            extraDim: $p.extraDimension
        }
        return control;
    }

    control.updateRegister = function(tag, props) {
        if(registers.hasOwnProperty(tag)) {
            Object.keys(props).forEach(k => {
                registers[tag][k] = props[k];
            })
        }
        return control;
    }
    
    control.resume = function(tag) {
        if (!registers.hasOwnProperty(tag))
            throw new Error('"' + tag + '" is not found in regesters.');
    
        var reg = registers[tag];
        //resume CPU registers
        $p.indexes = reg.indexes;
        $p.dataSize = reg.dataSize;
        $p.deriveCount = reg.deriveCount;
        $p.fieldCount = reg.fieldCount;
        $p.fields = reg.fields.slice();
        $p.fieldWidths = reg.fieldWidths.slice();
        $p.fieldDomains = reg.fieldDomains.slice();
        $p.dataDimension = reg.dataDim.slice();
        $p.resultDimension = reg.resultDim.slice();
        $p.extraDimension = reg.extraDim;
        //resume GPU Uniforms
        $p.uniform.uFieldCount.data = $p.fieldCount;
        $p.uniform.uDataSize.data = $p.dataSize;
        $p.uniform.uDataDim.data = reg.dataDim;
        $p.uniform.uIndexCount.data = reg.indexes.length;
        $p.uniform.uFieldDomains.data = serializeArray(reg.fieldDomains);
        $p.uniform.uFieldWidths.data = reg.fieldWidths;
        $p.uniform.uFilterFlag.data = reg.filterFlag;
        // $p.uniform.uFilterControls.data = reg.filterControls;
        $p.uniform.uDataInput.data = reg.dataInput;
    
        //resume GPU Attribute Buffers
        $p.attribute['aDataIdx'] = reg.attribute['aDataIdx'].ids;
        $p.attribute['aDataIdy'] = reg.attribute['aDataIdy'].ids;
        $p.attribute['aDataValx'] = reg.attribute['aDataIdx'].value;
        $p.attribute['aDataValy'] = reg.attribute['aDataIdy'].value;
        $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute['aDataIdx'].location, 0);
        $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute['aDataIdy'].location, 1);
        $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute['aDataValx'].location, 0);
        $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute['aDataValy'].location, 1);
    
        $p.attribute['aDataFieldId'] = reg.attribute['aDataFieldId'];
        $p.attribute['aDataItemId'] = reg.attribute['aDataItemId'];
    
        return control;
    }

    // control.head = function() {
    //     control.resume('__init__');
    //     return control;
    // }

    var branchID = 0;
    control.branch = function(branches) {
        branches.forEach(function(b){
            var operations = Object.keys(b).map(function(o) {
                var obj = {};
                obj[o] = b[o];
                return obj;
            });
            control.run(operations);
            control.resume('_branch' + branchID);
        })
        branchID++;

        return control;
    }

    return control;
});

// CONCATENATED MODULE: ../p4/src/pipeline.js
function pipeline($p) {    
    let pipeline = {};
    let async = false;
    let optID = 0;
    let queue = [];
    
    pipeline.addModule = function(mod) {
        let newModule = mod($p)

        Object.keys(newModule).forEach(name => {
            if (typeof(newModule[name]) === 'function') {
                pipeline[name] = function() {
                    newModule[name].apply(null, arguments);
                    return pipeline;
                }
            }
        })
        return pipeline;
    }

    pipeline.addToQueue = function (opt, arg) {
        if(!$p._update && !$p._progress) {
            let spec = {};
            spec[opt] = arg;
            queue.push(spec);
            return optID++;
        } else {
            return -1;
        }
    }

    pipeline.addOperation = function(name, operation, overwrite = false) {
        if(!pipeline.hasOwnProperty(name) || overwrite) {
            pipeline[name] = function(arg) {
                if(!async) {
                    pipeline.addToQueue(name, arg);
                }
                let getResult = operation(arg);
                if(typeof(getResult) === 'function') {
                    $p.getResult = getResult;
                }
                return pipeline;
            }
        }   
    }

    pipeline.clearQueue = function() {
        queue = [];
        return pipeline;
    }

    pipeline.run = function(jobs = queue) {
        for (let q of jobs) {
            let opt = Object.keys(q)[0];
            if(typeof pipeline[opt] === 'function') {
                pipeline[opt](q[opt]);
            }
        }
        return pipeline;
    }

    pipeline.queue = function() {
        return queue;
    }

    pipeline.async = function(isAsync) {
        async = isAsync;
    }

    return pipeline;
}
// CONCATENATED MODULE: ../p4/src/ops/gpgpu/Aggregation.gl.js
const Aggregate = {
  vertexShader() {
    gl_PointSize = 1.0;

    var i, j;
    var groupKeyValue;

    i = (this.aDataIdx + 0.5) / this.uDataDim.x;
    j = (this.aDataIdy + 0.5) / this.uDataDim.y;

    if (this.aDataIdy * this.uDataDim.x + this.aDataIdx >= this.uDataSize) {
        this.vResult = 0.0;
    } else {
        if(this.uAggrOpt != 2.0) {
            this.vResult = this.getData(this.uFieldId, i, j);
        } else {
            this.vResult = 1.0;
        }
    }

    if (this.uFilterFlag == 1) {
        if (texture2D(this.fFilterResults, vec2(i, j)).a < this.uVisLevel - 0.01) {
            this.vResult = 0.0;
        }
    }

    var pos = new Vec2();
    for (var ii = 0; ii < 2; ii++) {
        var gid = new Int();
        gid = this.uGroupFields[ii];
        if (gid != -1) {
            if (this.uIndexCount > 0) {
                if (gid == 0) {
                    groupKeyValue = i;
                } else if (gid == 1) {
                    groupKeyValue = j;
                }
            }
            if (this.uIndexCount == 0 || gid > 1) {
                var d = new Vec2();
                var w = this.getFieldWidth(gid);
                var value = this.getData(gid, i, j);

                d = this.getFieldDomain(gid);

                if(this.uBinCount[ii] > 0) {
                    value = max(ceil((value - d[0]) / this.uBinIntervals[ii]), 1.0);
                    groupKeyValue = value / float(this.uBinCount[ii]);
                } else {
                    groupKeyValue = (value - d.x) / (d.y - d.x) * w / (w + 1.0);
                    groupKeyValue += 0.5 / w;
                }
            }
            pos[ii] = groupKeyValue * 2.0 - 1.0;
        } else {
            pos[ii] = 0.5;
        }
    }

    if(this.uGroupFields[2] != -1) {
        var keyValue = this.getData(this.uGroupFields[2], i, j);
        if(keyValue != this.uExtraKeyValue) {
            this.vResult = 0.0;
        }
    }

    gl_Position = vec4(pos, 0.0, 1.0);
  },

  fragmentShader() {
    if (this.vResult == 0.0) discard;
    if (this.uAggrOpt == 2.0)
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    else
        gl_FragColor = vec4(0.0, 0.0, 1.0, this.vResult);
  }
}

const GetStats = {
  vertexShader() {
    gl_Position = vec4(this._square, 0, 1);
  },

  fragmentShader() {
    var x, y, res;
    $vec4(value);

    if (this.uAggrOpt > 3.0) {
        x = (gl_FragCoord.x) / this.uResultDim.x;
        y = (gl_FragCoord.y) / (this.uResultDim.y * float(this.uFieldCount));
        value = texture2D(this.uDataInput, vec2(x, y));
        res = value.a / value.b;
    } else {
        res = value.a;
    }
    gl_FragColor = vec4(0.0, 0.0, 0.0, res);
  }
}

const FillValues = {
  vertexShader() {
    gl_Position = vec4(this._square, 0, 1);
  },

  fragmentShader() {
    gl_FragColor = vec4(0.0, 0.0, 0.0, this.uFillValue);
  }
}

// CONCATENATED MODULE: ../p4/src/ops/aggregate.js



const VEC_IDS = ['x', 'y', 'z'];
const METRICS = ['$min', '$max', '$count', '$sum', '$avg', '$var', '$std'];

function aggregate_aggregate($p) {
    let aggregate = {};

    $p.uniform('uFillValue', 'float', 0.0);
    $p.uniform('uBinIntervals', 'vec2', [0.0, 0.0]);
    $p.uniform('uBinCount', 'ivec2', [0, 0]);
    $p.uniform('uAggrOpt', 'float', 2.0);
    $p.uniform("uGroupFields", "int",   [0, -1, -1]);
    $p.uniform("uExtraKeyValue", "float",  0.0);
    $p.extraDimension = 1;

    $p.program(
        'AggregateCompute',
        $p.shader.vertex(Aggregate.vertexShader),
        $p.shader.fragment(Aggregate.fragmentShader)
    );

    $p.program(
        'GetAggrStats',
        $p.shader.vertex(GetStats.vertexShader),
        $p.shader.fragment(GetStats.fragmentShader)
    );
    $p.program(
        'FillValues',
        $p.shader.vertex(FillValues.vertexShader),
        $p.shader.fragment(FillValues.fragmentShader)
    );

    var resultFieldCount,
        getAvgValues = false,
        getVarStd = false,
        resultDomains;

    function compute(opts, groupFieldIds, resultFieldIds, outputTag) {
        resultFieldCount = resultFieldIds.length;
        let gl = $p.program('FillValues');
        $p.bindFramebuffer(outputTag);

        if(!$p._progress) {
            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }

        gl.disable(gl.BLEND);
        resultFieldIds.forEach(function(f, i) {
            gl.viewport(0, i * $p.resultDimension[1], $p.resultDimension[0], $p.resultDimension[1]);
            var opt = METRICS.indexOf(opts[i]);
            if (opt == 0) {
                $p.uniform.uFillValue = Math.pow(2, 127);
                gl.drawArrays(gl.TRIANGLES, 0, 6);
            } else if(opt == 1) {
                $p.uniform.uFillValue = -Math.pow(2, 128);
                gl.drawArrays(gl.TRIANGLES, 0, 6);
            }
        });

        gl = $p.program('AggregateCompute');
      
        $p.framebuffer.enableRead('fDerivedValues');
        $p.framebuffer.enableRead('fFilterResults');

        gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataIdx.location, 0);
        gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataValx.location, 0);
        gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataIdy.location, 1);
        gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataValy.location, 1);

        $p.uniform.uGroupFields = groupFieldIds;

        gl.disable(gl.CULL_FACE);
        gl.disable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE);
        gl.blendEquation(gl.FUNC_ADD);
        $p.uniform.uResultDim = $p.resultDimension;

        let postComputeFieldIds = [];
        
        getAvgValues = false;
        getVarStd = false;

        for (var ii = 0; ii < $p.extraDimension; ii++) {
            postComputeFieldIds = [];
            resultFieldIds.forEach(function(f, i) {
                var opt = METRICS.indexOf(opts[i]);
                if (opt == -1) throw Error('unknowm operator for aggregation: ' + opts[i]);

                if (opt > 3) {
                    getAvgValues = true;
                    $p.bindFramebuffer('fAggrStats');
                    postComputeFieldIds.push(i);
                } else {
                    $p.bindFramebuffer(outputTag);
                }

                gl.viewport(ii * $p.resultDimension[0], i * $p.resultDimension[1], $p.resultDimension[0], $p.resultDimension[1]);
                if (opt == 0) {
                    gl.blendEquation(gl.MIN_EXT);
                } else if (opt == 1) {
                    gl.blendEquation(gl.MAX_EXT);
                } else {
                    gl.blendEquation(gl.FUNC_ADD);
                }

                $p.uniform.uFieldId = f;
                $p.uniform.uAggrOpt = opt;
                if(groupFieldIds[2] !== -1) {
                    $p.uniform.uExtraKeyValue = seqFloat($p.fieldDomains[groupFieldIds[2]][0], $p.fieldDomains[groupFieldIds[2]][1])[ii];
                }
                
                gl.ext.drawArraysInstancedANGLE(
                    gl.POINTS, 0,
                    $p.dataDimension[0],
                    $p.dataDimension[1]
                );
            });
        }
        $p.uniform.uFieldCount.data = resultFieldIds.length;
        if(getAvgValues) {
            postCompute(opts, postComputeFieldIds, resultFieldIds, outputTag);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    function postCompute(opts, postComputeFieldIds, resultFieldIds, outputTag) {
        $p.uniform.uDataInput.data = $p.framebuffer.fAggrStats.texture;
        var gl = $p.program('GetAggrStats');
        $p.bindFramebuffer(outputTag);
        $p.uniform.uResultDim = [$p.resultDimension[0] * $p.extraDimension, $p.resultDimension[1]];
        $p.framebuffer.enableRead('fAggrStats');
        // gl.ext.vertexAttribDivisorANGLE($p.attribute._square.location, 0);
        
        gl.viewport(0, 0, $p.resultDimension[0] * $p.extraDimension, $p.resultDimension[1] * resultFieldIds.length);
        gl.disable(gl.BLEND);

        postComputeFieldIds.forEach(function(f) {
            $p.uniform.uAggrOpt = METRICS.indexOf(opts[f]);
            $p.uniform.uFieldId = f;
            gl.viewport(
                0, 
                f * $p.resultDimension[1], 
                $p.resultDimension[0] * $p.extraDimension,
                $p.resultDimension[1]
            );
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        })
    }

    aggregate.execute = function(spec) {
        let newFieldSpec = spec.$collect || spec.$reduce || null;
        let groupFields = spec.$group || spec.group;
        let groupFieldIds = [-1, -1, -1];
        let outputTag = spec.out || 'fGroupResults';
        if (!Array.isArray(groupFields)) groupFields = [groupFields];
        if (groupFields.length >= 2) {
            groupFieldIds[0] = $p.fields.indexOf(groupFields[0]);
            groupFieldIds[1] = $p.fields.indexOf(groupFields[1]);
            $p.resultDimension = [
                $p.fieldWidths[groupFieldIds[0]],
                $p.fieldWidths[groupFieldIds[1]]
            ];
            if(groupFields.length === 3) {
                groupFieldIds[2] = $p.fields.indexOf(groupFields[2]);
                $p.extraDimension = $p.fieldWidths[groupFieldIds[2]];
            } else {
                $p.extraDimension = 1
            }
        } else {
            groupFieldIds[0] = $p.fields.indexOf(groupFields[0]);
            $p.resultDimension = [$p.fieldWidths[groupFieldIds[0]], 1];
        }

        // For backward compatibility, allowing new fields specified without using the $collect or $reduce
        if (newFieldSpec === null) {
            newFieldSpec = {};
            Object.keys(spec)
            .filter(d => d != '$by' && d != '$group')
            .forEach(function(d) {
                newFieldSpec[d] = spec[d];
            });
        }

        let newFieldNames = Object.keys(newFieldSpec);
        let resultFields = newFieldNames.map(f => newFieldSpec[f][Object.keys(newFieldSpec[f])[0]]);
        let resultFieldIds = resultFields.map( f => (f == '*') ? 0 : $p.fields.indexOf(f));
        let operators = resultFields.map( (f,i) => { 
            return (typeof(newFieldSpec[newFieldNames[i]]) === 'object')
                ? Object.keys(newFieldSpec[newFieldNames[i]])[0]
                : newFieldSpec[newFieldNames[i]]
        });
        let twoPassFields = operators.filter(opt => METRICS.indexOf(opt) > 2 );

        if (!$p._update && !$p._progress) {
            $p.framebuffer(
                outputTag,
                'float', [$p.resultDimension[0] * $p.extraDimension, $p.resultDimension[1] * resultFieldIds.length]
            );

            if(twoPassFields.length > 0) {
                $p.framebuffer(
                    'fAggrStats',
                    'float', [$p.resultDimension[0] * $p.extraDimension, $p.resultDimension[1] * resultFieldIds.length]
                );
            }
        }
        $p.bindFramebuffer(outputTag);

        compute(operators, groupFieldIds, resultFieldIds, outputTag);

        $p.getResult = aggregate.result;
        $p.indexes = groupFields;
        $p.dataDimension = $p.resultDimension;
        $p.uniform.uDataInput.data = $p.framebuffer[outputTag].texture;

        var oldFieldIds = groupFields.concat(resultFields).map( f => $p.fields.indexOf(f));

        $p.fields = groupFields.concat(newFieldNames);
        $p.uniform.uDataDim.data = $p.resultDimension;
        $p.uniform.uIndexCount.data = $p.indexes.length;
        $p.fieldCount = $p.fields.length - $p.indexes.length;
        $p.uniform.uFieldCount.data = $p.fieldCount;

        // $p.fieldWidths = $p.fieldWidths.concat($p.deriveWidths);
        // $p.fieldDomains = $p.fieldDomains.concat($p.deriveDomains);
       
        let newFieldDomains = oldFieldIds.map(f => $p.fieldDomains[f]);
        let newFieldWidths = oldFieldIds.map(f => $p.fieldWidths[f]);
        
        oldFieldIds.slice(0, groupFields.length).forEach((fid, fii) => {
            if($p.uniform.uBinCount.data[fii] > 0) {
                newFieldDomains[fii] = [0, $p.uniform.uBinCount.data[fii]-1];
            }
        })
        $p.uniform.uBinCount.data = [0,0];

        $p.fieldDomains = newFieldDomains;
        $p.fieldWidths = newFieldWidths;
       
        $p.attribute.aDataItemId = seqFloat(0, $p.resultDimension[0] * $p.resultDimension[1] - 1);
        $p.dataSize = $p.resultDimension[0] * $p.resultDimension[1];
        $p.uniform.uDataSize.data = $p.dataSize;
        $p.uniform.uFieldDomains.data = $p.fieldDomains;
        $p.uniform.uFieldWidths.data = $p.fieldWidths;
        $p.uniform.uFilterFlag.data = 0;

        $p.indexes.forEach(function(d, i) {
            $p.attribute['aDataId' + VEC_IDS[i]] = seqFloat(0, $p.resultDimension[i]-1);
            var interval = 1;
            var ifid = $p.fields.indexOf(d);
            // if ($p.intervals.hasOwnProperty(d)) interval = $p.intervals[d].interval;
            $p.attribute['aDataVal' + VEC_IDS[i]] = seqFloat(
                $p.fieldDomains[ifid][0],
                $p.fieldDomains[ifid][1],
                interval
            );
            $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute['aDataId' + VEC_IDS[i]].location, i);
            $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute['aDataVal' + VEC_IDS[i]].location, i);
        });
        if ($p.indexes.length == 1) {
            $p.attribute.aDataIdy = new Float32Array(1);
            $p.attribute.aDataValy = new Float32Array(1);
            $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aDataIdy.location, 1);
            $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aDataValy.location, 1);
        }
        if (!$p._update) {
            let resultFieldIds = resultFields.map( f => (f == '*') ? 0 : $p.fields.indexOf(f));
            resultDomains = $p.extent(resultFieldIds, $p.dataDimension);
        }
        for (var ii = $p.indexes.length; ii < $p.indexes.length + resultFields.length; ii++) {
            $p.fieldDomains[ii] = resultDomains[ii - $p.indexes.length];
            $p.fieldWidths[ii] = resultDomains[ii - $p.indexes.length][1] - resultDomains[ii - $p.indexes.length][0];
        }
        $p.getResultBuffer = aggregate.result;
        // console.log(aggregate.result({outputTag}))
    }

    aggregate.result = function(arg) {
        let options = arg || {};
        let outputTag =  arg.outputTag || 'fGroupResults';
        let offset = options.offset || [0, 0];
        let resultSize = options.size || $p.resultDimension[0] * $p.resultDimension[1];
        let rowTotal = Math.min(resultSize, $p.resultDimension[0]);
        let colTotal = Math.ceil(resultSize / $p.resultDimension[0]);
        let result = new Float32Array(rowTotal * colTotal * 4 * resultFieldCount);
        $p.bindFramebuffer(outputTag);
        let gl = $p.program('AggregateCompute');
        gl.readPixels(offset[0], offset[1], rowTotal, colTotal * resultFieldCount, gl.RGBA, gl.FLOAT, result);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        return result.filter((d, i) => i % 4 === 3);
    }

    return aggregate;
}

// CONCATENATED MODULE: ../p4/src/ops/cache.js
function cache_cache($p) {
    var cache = {},
        dataDimension = $p.uniform.uDataDim.data,
        fieldCount =  $p.uniform.uFieldCount.data,
        cacheTag;

    var vs = $p.shader.vertex(function () {
         gl_Position = vec4(this._square, 0, 1);
    });

    var fs = $p.shader.fragment(function () {
        var x, y;

        x = (gl_FragCoord.x) / this.uDataDim.x;
        y = (gl_FragCoord.y) / (this.uDataDim.y * float(this.uFieldCount));

        gl_FragColor = texture2D(this.uDataInput, vec2(x, y));
    });

    $p.program("cache", vs, fs);

    cache.execute = function(tag) {
        cacheTag = tag;
        dataDimension = $p.uniform.uDataDim.data;
        fieldCount = $p.uniform.uFieldCount.data;
        $p.framebuffer(tag, "float", [dataDimension[0], dataDimension[1] * fieldCount]);
        $p.bindFramebuffer(tag);
        var gl = $p.program("cache");
        gl.viewport(0, 0, dataDimension[0], dataDimension[1] * fieldCount);
        gl.clearColor( 0.0, 0.0, 0.0, 0.0 );
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
        gl.disable(gl.CULL_FACE);
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.BLEND);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        $p.framebuffer.enableRead(tag);
        $p.uniform.uDataInput = $p.framebuffer[tag].texture;
    }

    cache.result =  function() {
        var gl = $p.ctx;
        $p.bindFramebuffer(cacheTag);
        dataDimension = $p.uniform.uDataDim.data;
        var result = new Float32Array(dataDimension[0]*dataDimension[1]*4*fieldCount);
        gl.readPixels(0, 0, dataDimension[0], dataDimension[1] * fieldCount, gl.RGBA, gl.FLOAT, result);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        result = result.filter(function(d, i){ return i%4===3;} );
        return result;
    }

    return cache;
}

// CONCATENATED MODULE: ../p4/src/ops/datetime.js

// Calculate the current day of the week as an integer
//   now - Unix timestamp like that from time(NULL)
//   tz_offset - Number of hours off from UTC; i.e. PST = -8
//   Return value: Sunday=0, Monday=1, ... Saturday=6
// int dayofweek(time_t now, int tz_offset) {
// 	// Calculate number of seconds since midnight 1 Jan 1970 local time
// 	time_t localtime = now + (tz_offset * 60 * 60);
// 	// Convert to number of days since 1 Jan 1970
// 	int days_since_epoch = localtime / 86400;
// 	// 1 Jan 1970 was a Thursday, so add 4 so Sunday is day 0, and mod 7
// 	int day_of_week = (days_since_epoch + 4) % 7; 

// 	return day_of_week;
// }

// function getDateTime(s) {
//   let z = Math.floor(s / 86400) + 719468;
//   let era = Math.floor(z >= 0 ? z : z - 146096) / 146097;
//   let doe = Math.floor((z - era * 146097));
//   let yoe = Math.floor((doe - doe / 1460 + doe / 36524 - doe / 146096) / 365);
//   let year = Math.floor((yoe) + era * 400);
//   let doy = Math.floor(doe - (365 * yoe + yoe / 4 - yoe / 100));
//   let mp = Math.floor(( 5 * doy + 2) / 153);
//   let day = Math.floor(doy - (153 * mp + 2) / 5 + 1);
//   let month = Math.floor(mp + (mp < 10 ? 3 : -9));
//   year += (month <= 2);
//   return {year, month, day};
// }

function getDateTime(s) {
  let second = s % 60
  let minute = Math.floor(s / 60) % 60
  let hour = Math.floor(s / 3600) % 24
  let days = Math.floor(s / 3600 / 24) 
  let years = Math.floor(days / 365.25)
  let year = 1970 + years;
  let dayOfWeek = (days + 4) % 7

  // let leapDays = 0
  // for (var i = 1970; i < year; i++) {
  //   if ((i % 4 === 0 && i % 100 !== 0) || (i % 400 == 0)) {
  //     leapDays += 1;
  //   }
  // }
  // days = days - (years * 365 + leapDays);
  days = days - Math.ceil(years * 365.25);
  let isLeapYear = ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0));
  let month = 1
  let daysInMonth
  while (month <= 12) {
    
    if(month === 2) {
      daysInMonth = 28 + isLeapYear;
    } else {
      daysInMonth = 30 + (month + (month < 7)) % 2
    }

    if (days > daysInMonth) {
      days -= daysInMonth
      month += 1
    } else {
      break;
    }
  }

  return {year, month, days, hour, minute, second, dayOfWeek}
}


function getHour({ts = 'float'}) {
  var hours = floor(ts / 3600.0);
  return hours - (24.0 * floor(hours / 24.0)) + 1.0;
}

function getYear({ts = 'float'}) {
  var days = floor(ts / 3600.0 / 24.0);
  var years = floor(days / 365.25);
  return 1970.0 + years;
}

function floatMod({a = "float", b = "float"}) {
  return a - (b * floor(a / b));
}

// export function getMonth({ts = 'float'}) {
//   var days = floor(ts / 3600.0 / 24.0);
//   var years = floor(days / 365.25) + 1970.0;
//   var months = floor(days / 30.5);
//   return months - floor(months / 12.0);
// }

function getDayOfWeek({ts = 'float'}) {
  var days = floor(ts / 3600.0 / 24.0) + 4.0;
  return days - (7.0 * floor(days / 7.0)) + 1.0;
} 

function getMonth({ts = 'float'}) {
  var days = floor(ts / 3600.0 / 24.0);
  var years = floor(days / 365.25);
  days = days - ceil(years * 365.25);
  var month = new int();
  var daysInMonth;
  var year = 1970.0 + years;
  var isLeapYear = 0.0;
  if( (year - (4.0 * floor(year/4.0)) == 0.0 
    && year - (100.0 * floor(year/100.0)) != 0.0)
    || (year - (100.0 * floor(year/400.0)) == 0.0)
  ) {
    isLeapYear = 1.0;
  }
  month = 1;
  for (var i = 1; i<=12; i++) {
    if(month == 2) {
      daysInMonth = 28.0 + isLeapYear;
    } else if( month == 4 || month == 6 || month == 9 || month == 11) {
      daysInMonth = 30.0;
    } else {
      daysInMonth = 31.0;
    }
    if (days > daysInMonth) {
      days -= daysInMonth;
      month += 1;
    }
  }
  return float(month);
}
// CONCATENATED MODULE: ../p4/src/ops/derive.js


function derive_derive($p, spec) {

    var derive = {},
        dataDimension = $p.uniform.uDataDim.data,
        deriveMax = $p.uniform.uDeriveCount.data,
        derivedFields = Object.keys(spec);

    var fields = $p.fields;
    if(derivedFields.length > $p.deriveMax) {
        throw Error('Error: cannot derive more than ' + $p.deriveMax + ' new attributes');
    }

    $p.subroutine("hour", "float", getHour);
    $p.subroutine("month", "float", getMonth);
    $p.subroutine("year", "float", getYear);
    $p.subroutine("dayOfWeek", "float", getDayOfWeek);

    var marco = "\t";

    derivedFields.forEach(function(d, i){
        var re = new RegExp("("+fields.join("|")+")","g");
        // var formula = spec[d].replace(/@([\w|\d|_]+)/g, function(matched){
        var formula = spec[d].replace(re, function(matched){
            // console.log(matched);
            var index = fields.indexOf(matched);
            return 'this.getNonIndexedData ('  + index + ', pos.x, pos.y)';
        });
        marco += 'if (index == ' + i + ') return ' + formula + "; \n \telse ";
    });

    marco = marco.replace(/\$/g, 'this.') + " return 0.0;";

    $p.uniform("uOptMode", "float", 0)
        .uniform("uDeriveId", "int", 0)
        .subroutine("getDerivedValue", "float", new Function("$int_index", "$vec2_pos", marco));

    function vertexShader() {
        gl_PointSize = 1.0;

        var i, j;

        i = (this.aDataIdx+0.5) / this.uDataDim.x;
        j = (this.aDataIdy+0.5) / this.uDataDim.y;

        this.vResult = this.getDerivedValue(this.uDeriveId, vec2(i, j));
        if(this.uFilterFlag == 1) {
            if(texture2D(this.fFilterResults, vec2(i, j)).a == 0.0)
                this.vResult = 0.0;
        }
        var x, y;
        if(this.uOptMode == 0.0){
            x = 0.5;
            y = 0.5;
        } else {
            x = i * 2.0 - 1.0;
            y = j * 2.0 - 1.0;
        }

        gl_Position = vec4(x, y, 0.0, 1.0);
    }

    function fragmentShader() {
        if(this.vResult == 0.0) discard;
        if(this.uOptMode > 0.0 || this.vResult >= 0.0)
            gl_FragColor = vec4(0.0, 0.0, 1.0, this.vResult);
        else
            gl_FragColor = vec4(-1.0, this.vResult, 0.0, 0.0);
    }

    var vs = $p.shader.vertex(vertexShader),
        fs = $p.shader.fragment(fragmentShader),
        gl = $p.createProgram("derive", vs, fs);

    // gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataIdx.location, 0);
    // gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataValx.location, 0);
    // gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataIdy.location, 1);
    // gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataValy.location, 1);

    function _execute() {

        var gl = $p.program("derive");
        $p.framebuffer.enableRead("fFilterResults");
        $p.bindFramebuffer("fDerivedValues");
        gl.disable(gl.CULL_FACE);
        gl.disable(gl.DEPTH_TEST);
        gl.enable( gl.BLEND );
        gl.blendFunc( gl.ONE, gl.ONE );
        gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataIdx.location, 0);
        gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataIdy.location, 1);
        
        if($p.indexes.length > 0)
            gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataValx.location, 0);
       
        if($p.indexes.length > 1)
            gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataValy.location, 1);
        $p.uniform.uOptMode = 0.0;
        // $p.uniform.uDeriveCount = derivedFields.length;
        var deriveDomains = [];
        derivedFields.forEach(function(d, i){
            $p.uniform.uDeriveId = i;
            gl.clearColor( 0.0, 0.0, 0.0, 0.0 );
            gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
            gl.viewport(0, 0, 1,  1);

            var result = new Float32Array(8);

            gl.blendEquation(gl.MAX_EXT);
            gl.ext.drawArraysInstancedANGLE(gl.POINTS, 0, dataDimension[0], dataDimension[1]);
            // gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.FLOAT, max);

            gl.viewport(1, 0, 1,  1);
            gl.ext.drawArraysInstancedANGLE(gl.POINTS, 0, dataDimension[0], dataDimension[1]);

            gl.blendEquation(gl.MIN_EXT);
            gl.ext.drawArraysInstancedANGLE(gl.POINTS, 0, dataDimension[0], dataDimension[1]);
            gl.readPixels(0, 0, 2, 1, gl.RGBA, gl.FLOAT, result);

            var minValue = (result[4] < 0) ? result[5] : result[7],
                maxValue = (result[2] > 0) ? result[3] : result[1];
            deriveDomains[i] = [minValue, maxValue];

            // deriveDomains[i] = [Math.min(min[0], min[3]), Math.max(max[0], max[3])];
        });
        gl.viewport(0, 0, dataDimension[0], dataDimension[1]*deriveMax);
        gl.disable( gl.BLEND );
        gl.clearColor( 0.0, 0.0, 0.0, 0.0 );
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

        $p.uniform.uOptMode = 1.0;

        derivedFields.forEach(function(d, i){
            $p.uniform.uDeriveId = i;
            gl.viewport(0, dataDimension[1]*i, dataDimension[0], dataDimension[1]);
            gl.ext.drawArraysInstancedANGLE(gl.POINTS, 0, dataDimension[0], dataDimension[1]);
        });

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        return deriveDomains;
    }

    derive.execute = function(spec) {
        var derivedFields = Object.keys(spec);
        var newDerivedDomains = _execute();
        if(!$p._update) {
            newDerivedDomains.forEach(function(d, i) {
                var fieldId = $p.fields.indexOf(derivedFields[i]);
                if(fieldId === -1) {
                    $p.fields.push(derivedFields[i]);
                    fieldId = $p.fields.indexOf(derivedFields[i]);
                    $p.deriveCount += 1;
                }

                $p.fieldDomains[fieldId] = d;
                $p.fieldWidths[fieldId] = d[1] - d[0] + 1;
                console.log(derivedFields[i], $p.fieldWidths[fieldId], d[1], d[0])
            });
            $p.uniform.uFieldDomains.value($p.fieldDomains);
            $p.uniform.uFieldWidths.data = $p.fieldWidths;
        }
    }

    derive.result = function(arg) {
        var options = arg || {},
            offset = options.offset || [0, 0],
            resultSize = options.size || $p.dataDimension[0]* $p.dataDimension[1],
            fid = options.fieldId || options.deriveFieldId || 0,
            rowSize = Math.min(resultSize, $p.dataDimension[0]),
            colSize = Math.ceil(resultSize/$p.dataDimension[0]);
        
        $p.bindFramebuffer('DerivedValues');
        var result = new Float32Array(rowSize * colSize * 4);
        gl.readPixels(0, dataDimension[1]*fid, rowSize, colSize, gl.RGBA, gl.FLOAT, result);
        return result.filter(function(d, i){ return i%4===3;} ); //return channel alpha in rgba
    }

    return derive;
}

// CONCATENATED MODULE: ../p4/src/ops/extent.js

const smallest = -Math.pow(2, 128);
function extent($p) {

    var vs = $p.shader.vertex(function() {
        gl_PointSize = 1.0;
        var i, j;
        if (this.aDataIdy * this.uDataDim.x + this.aDataIdx >= this.uDataSize) {
            this.vDiscardData = 1.0;
        } else {
            this.vDiscardData = 0.0;
            i = (this.aDataIdx + 0.5) / this.uDataDim.x;
            j = (this.aDataIdy + 0.5) / this.uDataDim.y;
            this.vResult = this.getData(this.uFieldId, i, j);
        }
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    });

    var fs = $p.shader.fragment(function() {
        if (this.vDiscardData == 1.0) discard;
        if (this.vResult >= 0.0) {
            gl_FragColor = vec4(0.0, 0.0, 1.0, this.vResult);
        } else {
            gl_FragColor = vec4(-1.0, this.vResult, 0.0, 0.0);
        }
    });

    var gl = $p.program("stats", vs, fs);

    return function(fieldIds, dataDimension) {
        if (!$p._update) {
            $p.framebuffer("fStats", "float", [2, fieldIds.length]);
        }
        var gl = $p.program("stats");
        $p.framebuffer.enableRead("fGroupResults");

        gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataIdx.location, 0);
        gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataValx.location, 0);
        gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataIdy.location, 1);
        gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataValy.location, 1);

        $p.bindFramebuffer("fStats");
        gl.clearColor(smallest, smallest, smallest, smallest);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.disable(gl.CULL_FACE);
        gl.disable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE);

        var extents = new Array(fieldIds.length);

        var idCount = $p.uniform.uIndexCount.data;
        fieldIds.forEach(function(d, i) {
            $p.uniform.uFieldId = i + idCount;
            gl.viewport(0, i, 1, 1);
            gl.blendEquation(gl.MAX_EXT);
            gl.ext.drawArraysInstancedANGLE(gl.POINTS, 0, dataDimension[0], dataDimension[1]);
            // gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.FLOAT, max);

            gl.viewport(1, i, 1, 1);
            gl.ext.drawArraysInstancedANGLE(gl.POINTS, 0, dataDimension[0], dataDimension[1]);

            gl.blendEquation(gl.MIN_EXT);
            gl.ext.drawArraysInstancedANGLE(gl.POINTS, 0, dataDimension[0], dataDimension[1]);

            // var extent = new Float32Array(8);
            // gl.readPixels(0, i, 2, 1, gl.RGBA, gl.FLOAT, extent);
            // console.log(extent);
            // var ext = extent;
            // var minValue = (ext[0] > 0) ? ext[1] : ext[7],
            //     maxValue = (ext[2] > 0) ? ext[3] : ext[5];
            //  extents[i] = [minValue, maxValue];
        });
        var extent = new Float32Array(8 * fieldIds.length);
       
        gl.readPixels(0, 0, 2, fieldIds.length, gl.RGBA, gl.FLOAT, extent);
        fieldIds.forEach(function(d, i) {
            var ext = extent.slice(i * 8, i * 8 + 8);
            var minValue = (ext[4] < 0) ? ext[5] : ext[7],
                maxValue = (ext[2] > 0) ? ext[3] : ext[1];
            extents[i] = [minValue, maxValue];
        });
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        return extents;
    }
}

// CONCATENATED MODULE: ../p4/src/ops/gpgpu/Match.gl.js
const NumericalMatch = {
  vertexShader() {
    var i, j, k, value;
    var filter = new Int(0);
    var sel = new Int(0);
    var visSelect = new Bool(false);
    i = (this.aDataIdx+0.5) / this.uDataDim.x;
    j = (this.aDataIdy+0.5) / this.uDataDim.y;
  
    for(var f = 0; f < $(fieldCount) + $(indexCount); f++) {
        if(this.uFilterControls[f] == 1 || this.uVisControls[f] == 1) {
            value = this.getData(f, i, j);
  
            if(this.uFilterControls[f] == 1) {
                if(value < this.uFilterRanges[f].x || value > this.uFilterRanges[f].y) {
                    filter -= 1;
                }
            }
            if(this.uVisControls[f] == 1) {
                if(value < this.uVisRanges[f].x || value > this.uVisRanges[f].y) {
                    sel -= 1;
                }
                visSelect = true;
            }
        }
    }
    this.vResult = 0.1;
    if(filter < 0) {
        this.vResult = 0.0;
    } else {
        if(visSelect)
            this.vResult = (sel < 0) ? 0.1 : 0.2;
    }
    var x = i * 2.0 - 1.0;
    var y = j * 2.0 - 1.0;
    gl_PointSize = 1.0;
    gl_Position = vec4(x, y, 0.0, 1.0);
  },

  fragmentShader() {
    gl_FragColor = vec4(0., 0., 0., this.vResult);
  }
}

const CategoricalMatch = {
  vertexShader() {
    var i, j, k, value;
    i = (this.aDataIdx+0.5) / this.uDataDim.x;
    j = (this.aDataIdy+0.5) / this.uDataDim.y;
    this.vResult = this.uFilterLevel - 0.1;
    value = this.getData(this.uFieldId, i, j);
    for(var l = 0; l < 100; l++){
        if(l < this.uSelectCount) {
            if(value == this.uInSelections[l]) {
                this.vResult = this.uFilterLevel;
            }
        }
    }
    var x = i * 2.0 - 1.0;
    var y = j * 2.0 - 1.0;
    gl_PointSize = 1.0;
    gl_Position = vec4(x, y, 0.0, 1.0);
  },

  fragmentShader() {
    gl_FragColor = vec4(0., 0., 0., this.vResult);
  }
}
// CONCATENATED MODULE: ../p4/src/ops/match.js


function match_match($p) {
    const SELECT_MAX = 100;
    var match = {},
        dataDimension = $p.uniform.uDataDim.data,
        fieldCount = $p.fields.length,
        filterControls = new Array(fieldCount).fill(0),
        filterRanges = $p.fieldDomains,
        visControls = new Array(fieldCount).fill(0),
        visRanges = $p.fieldDomains,
        inSelections = new Array(SELECT_MAX);

    $p.uniform('uInSelections', 'float', Float32Array.from(inSelections));
    $p.uniform('uSelectMax', 'int', SELECT_MAX);
    $p.uniform('uSelectCount', 'int', 0);

    var filter = {
        vs: $p.shader.vertex(NumericalMatch.vertexShader),
        fs: $p.shader.fragment(NumericalMatch.fragmentShader)
    };

    var sel = {
        vs: $p.shader.vertex(CategoricalMatch.vertexShader),
        fs: $p.shader.fragment(CategoricalMatch.fragmentShader)
    };

    $p.program('filter', filter.vs, filter.fs);
    $p.program('match', sel.vs, sel.fs);

    match.control = function(ctrl) {
        // filterControls = ctrl;
    }

    function _execute(spec){
        var fields = $p.fields
        var gl;
        var matchFields = Object.keys(spec).filter(function(s){
            return spec[s].hasOwnProperty('$in');
        })
        .concat(Object.keys($p.crossfilters).filter(function(s){
            return $p.crossfilters[s].hasOwnProperty('$in');
        }))

        $p.bindFramebuffer('fFilterResults');
       
        $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aDataIdy.location, 1);
        $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aDataValy.location, 1);
        if(matchFields.length) {
            gl = $p.program('match');
            if($p.deriveCount > 0) {
                $p.framebuffer.enableRead('fDerivedValues');
            }

            gl.viewport(0, 0, dataDimension[0], dataDimension[1]);
            $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aDataIdx.location, 0);
            $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aDataValx.location, 0);
            $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aDataIdy.location, 1);
            $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aDataValy.location, 1);
            gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
            gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
            gl.enable( gl.BLEND );
            gl.blendFunc( gl.ONE, gl.ONE );
            gl.blendEquation(gl.MIN_EXT);

            matchFields.forEach(function(k){
                var fieldId = $p.fields.indexOf(k);
                var inSelections = (spec.hasOwnProperty(k)) ? spec[k].$in :  $p.crossfilters[k].$in;
                if($p.strValues.hasOwnProperty(k)) {
                    inSelections = inSelections
                        .slice(0, SELECT_MAX)
                        .map(function(v) { return $p.strValues[k][v]; });
                } else {
                    inSelections = inSelections.slice(0, SELECT_MAX);
                }
                $p.uniform.uSelectCount = inSelections.length;
                $p.uniform.uInSelections = Float32Array.from(inSelections);
                $p.uniform.uFieldId = fieldId;

                gl.ext.drawArraysInstancedANGLE(gl.POINTS, 0, $p.dataDimension[0], $p.dataDimension[1]);
                // filterRanges[fieldId*2] = Math.min.apply(null, spec[k].$in);
                // filterRanges[fieldId*2+1] = Math.max.apply(null, spec[k].$in);
                filterRanges[fieldId] = [Math.min.apply(null, inSelections), Math.max.apply(null, inSelections)];
            })
        }

        var filterSelections = Object.keys(spec).filter(function(s){
            return !spec[s].hasOwnProperty('$in');
        });

        var viewSelections = Object.keys($p.crossfilters).filter(function(s){
            return !$p.crossfilters[s].hasOwnProperty('$in'); 
        });
     
        if(filterSelections.length || viewSelections.length){
            filterControls = new Array(fieldCount).fill(0);

            filterSelections.forEach(function(k){
                var fieldId = $p.fields.indexOf(k);
                if(fieldId === -1) {
                    console.log('Skipped: Matching on invalid data field ' + k);
                    return;
                }
                if(spec[k].length < 2) spec[k][1] = spec[k][0];
                filterControls[fieldId] = 1;
                filterRanges[fieldId] = spec[k];
                // filterRanges[fieldId*2] = spec[k][0];
                // filterRanges[fieldId*2+1] = spec[k][1];
            });

            viewSelections.forEach(function(k){
                
                var fieldId = $p.fields.indexOf(k);
                if(fieldId === -1) {
                    console.log('Skipped: Matching on invalid data field ' + k);
                    return;
                }
                if($p.crossfilters[k].length < 2) $p.crossfilters[k][1] = $p.crossfilters[k][0];
                visControls[fieldId] = 1;
                visRanges[fieldId] = $p.crossfilters[k];
            });

            $p.uniform.uFilterControls.data = filterControls;
            $p.uniform.uFilterRanges.data = filterRanges;
            $p.uniform.uVisControls.data = visControls;
            $p.uniform.uVisRanges.data = visRanges;
            gl = $p.program('filter');
            if($p.deriveCount > 0) {
                $p.framebuffer.enableRead('fDerivedValues');
            }
            $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aDataIdx.location, 0);
            $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aDataValx.location, 0);
            $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aDataIdy.location, 1);
            $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aDataValy.location, 1);
            gl.disable(gl.BLEND);
            // gl.clearColor( 0.0, 0.0, 0.0, 0.0 );
            // gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
            gl.viewport(0, 0, $p.dataDimension[0], $p.dataDimension[1]);
            gl.ext.drawArraysInstancedANGLE(gl.POINTS, 0, $p.dataDimension[0], $p.dataDimension[1]);
        }
        $p.ctx.bindFramebuffer($p.ctx.FRAMEBUFFER, null);
        return filterRanges;
    }

    match.execute = function(spec) {
        filterControls = new Array($p.fields.length).fill(0);
        visControls = new Array($p.fields.length).fill(0);
        var filterSpec = spec;

        Object.keys($p.crossfilters).forEach(function(k, i) {
            if($p.strValues.hasOwnProperty(k) && !$p.crossfilters[k].$in) {
                let filterValues = $p.crossfilters[k];
                if(filterValues.length > 1) {
                    let startIndex = $p.strLists[k].indexOf($p.crossfilters[k][0]);
                    let endIndex = $p.strLists[k].indexOf($p.crossfilters[k][1]);
                    filterValues = $p.strLists[k].slice(startIndex, endIndex + 1);
                }
                $p.crossfilters[k] = {$in: filterValues};
            }
        });

        Object.keys(filterSpec).forEach(function(k, i) {
            if($p.strValues.hasOwnProperty(k) && !spec[k].$in) {
                spec[k] = {$in: spec[k]};
            }
        });

        $p.uniform.uFilterFlag = 1;
        if(!$p._update) {
           
            $p.framebuffer('fFilterResults', 'unsigned_byte', $p.dataDimension);
            filterRanges = $p.fieldDomains.slice();
            visRanges = $p.fieldDomains.slice();
        }
        var newDomains = _execute(spec);

        if(!$p._update){
            newDomains.forEach(function(domain, fid) {
                var d = domain;
                // if($p.dtypes[fid] == 'int') d[1] -= 1;
                $p.fieldDomains[fid] = d;
                $p.fieldWidths[fid] = $p.getDataWidth(fid, d);
            });

            $p.uniform.uFieldDomains.value($p.fieldDomains);
            $p.uniform.uFieldWidths.data = $p.fieldWidths;
        }
        $p.getMatchBuffer = match.result;
    }

    match.result = function(arg) {
        var options = arg || {},
            offset = options.offset || [0, 0],
            resultSize = options.size || $p.dataDimension[0]* $p.dataDimension[1],
            rowSize = Math.min(resultSize, $p.dataDimension[0]),
            colSize = Math.ceil(resultSize/$p.dataDimension[0]);

        $p.bindFramebuffer('fFilterResults');

        var gl = $p.ctx;
        var bitmap = new Uint8Array(rowSize*colSize*4);
        gl.readPixels(offset[0], offset[1], rowSize, colSize, gl.RGBA, gl.UNSIGNED_BYTE, bitmap);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        return  bitmap.filter((d, i) => i % 4 === 3);
    }

    return match;
}

// CONCATENATED MODULE: ../p4/src/vis/gradients.js
const gradients = {
    "inferno": ["#000004", "#010005", "#010106", "#010108", "#02010a", "#02020c", "#02020e", "#030210", "#040312", "#040314", "#050417", "#060419", "#07051b", "#08051d", "#09061f", "#0a0722", "#0b0724", "#0c0826", "#0d0829", "#0e092b", "#10092d", "#110a30", "#120a32", "#140b34", "#150b37", "#160b39", "#180c3c", "#190c3e", "#1b0c41", "#1c0c43", "#1e0c45", "#1f0c48", "#210c4a", "#230c4c", "#240c4f", "#260c51", "#280b53", "#290b55", "#2b0b57", "#2d0b59", "#2f0a5b", "#310a5c", "#320a5e", "#340a5f", "#360961", "#380962", "#390963", "#3b0964", "#3d0965", "#3e0966", "#400a67", "#420a68", "#440a68", "#450a69", "#470b6a", "#490b6a", "#4a0c6b", "#4c0c6b", "#4d0d6c", "#4f0d6c", "#510e6c", "#520e6d", "#540f6d", "#550f6d", "#57106e", "#59106e", "#5a116e", "#5c126e", "#5d126e", "#5f136e", "#61136e", "#62146e", "#64156e", "#65156e", "#67166e", "#69166e", "#6a176e", "#6c186e", "#6d186e", "#6f196e", "#71196e", "#721a6e", "#741a6e", "#751b6e", "#771c6d", "#781c6d", "#7a1d6d", "#7c1d6d", "#7d1e6d", "#7f1e6c", "#801f6c", "#82206c", "#84206b", "#85216b", "#87216b", "#88226a", "#8a226a", "#8c2369", "#8d2369", "#8f2469", "#902568", "#922568", "#932667", "#952667", "#972766", "#982766", "#9a2865", "#9b2964", "#9d2964", "#9f2a63", "#a02a63", "#a22b62", "#a32c61", "#a52c60", "#a62d60", "#a82e5f", "#a92e5e", "#ab2f5e", "#ad305d", "#ae305c", "#b0315b", "#b1325a", "#b3325a", "#b43359", "#b63458", "#b73557", "#b93556", "#ba3655", "#bc3754", "#bd3853", "#bf3952", "#c03a51", "#c13a50", "#c33b4f", "#c43c4e", "#c63d4d", "#c73e4c", "#c83f4b", "#ca404a", "#cb4149", "#cc4248", "#ce4347", "#cf4446", "#d04545", "#d24644", "#d34743", "#d44842", "#d54a41", "#d74b3f", "#d84c3e", "#d94d3d", "#da4e3c", "#db503b", "#dd513a", "#de5238", "#df5337", "#e05536", "#e15635", "#e25734", "#e35933", "#e45a31", "#e55c30", "#e65d2f", "#e75e2e", "#e8602d", "#e9612b", "#ea632a", "#eb6429", "#eb6628", "#ec6726", "#ed6925", "#ee6a24", "#ef6c23", "#ef6e21", "#f06f20", "#f1711f", "#f1731d", "#f2741c", "#f3761b", "#f37819", "#f47918", "#f57b17", "#f57d15", "#f67e14", "#f68013", "#f78212", "#f78410", "#f8850f", "#f8870e", "#f8890c", "#f98b0b", "#f98c0a", "#f98e09", "#fa9008", "#fa9207", "#fa9407", "#fb9606", "#fb9706", "#fb9906", "#fb9b06", "#fb9d07", "#fc9f07", "#fca108", "#fca309", "#fca50a", "#fca60c", "#fca80d", "#fcaa0f", "#fcac11", "#fcae12", "#fcb014", "#fcb216", "#fcb418", "#fbb61a", "#fbb81d", "#fbba1f", "#fbbc21", "#fbbe23", "#fac026", "#fac228", "#fac42a", "#fac62d", "#f9c72f", "#f9c932", "#f9cb35", "#f8cd37", "#f8cf3a", "#f7d13d", "#f7d340", "#f6d543", "#f6d746", "#f5d949", "#f5db4c", "#f4dd4f", "#f4df53", "#f4e156", "#f3e35a", "#f3e55d", "#f2e661", "#f2e865", "#f2ea69", "#f1ec6d", "#f1ed71", "#f1ef75", "#f1f179", "#f2f27d", "#f2f482", "#f3f586", "#f3f68a", "#f4f88e", "#f5f992", "#f6fa96", "#f8fb9a", "#f9fc9d", "#fafda1", "#fcffa4"],
    "magma": ["#000004", "#010005", "#010106", "#010108", "#020109", "#02020b", "#02020d", "#03030f", "#030312", "#040414", "#050416", "#060518", "#06051a", "#07061c", "#08071e", "#090720", "#0a0822", "#0b0924", "#0c0926", "#0d0a29", "#0e0b2b", "#100b2d", "#110c2f", "#120d31", "#130d34", "#140e36", "#150e38", "#160f3b", "#180f3d", "#19103f", "#1a1042", "#1c1044", "#1d1147", "#1e1149", "#20114b", "#21114e", "#221150", "#241253", "#251255", "#271258", "#29115a", "#2a115c", "#2c115f", "#2d1161", "#2f1163", "#311165", "#331067", "#341069", "#36106b", "#38106c", "#390f6e", "#3b0f70", "#3d0f71", "#3f0f72", "#400f74", "#420f75", "#440f76", "#451077", "#471078", "#491078", "#4a1079", "#4c117a", "#4e117b", "#4f127b", "#51127c", "#52137c", "#54137d", "#56147d", "#57157e", "#59157e", "#5a167e", "#5c167f", "#5d177f", "#5f187f", "#601880", "#621980", "#641a80", "#651a80", "#671b80", "#681c81", "#6a1c81", "#6b1d81", "#6d1d81", "#6e1e81", "#701f81", "#721f81", "#732081", "#752181", "#762181", "#782281", "#792282", "#7b2382", "#7c2382", "#7e2482", "#802582", "#812581", "#832681", "#842681", "#862781", "#882781", "#892881", "#8b2981", "#8c2981", "#8e2a81", "#902a81", "#912b81", "#932b80", "#942c80", "#962c80", "#982d80", "#992d80", "#9b2e7f", "#9c2e7f", "#9e2f7f", "#a02f7f", "#a1307e", "#a3307e", "#a5317e", "#a6317d", "#a8327d", "#aa337d", "#ab337c", "#ad347c", "#ae347b", "#b0357b", "#b2357b", "#b3367a", "#b5367a", "#b73779", "#b83779", "#ba3878", "#bc3978", "#bd3977", "#bf3a77", "#c03a76", "#c23b75", "#c43c75", "#c53c74", "#c73d73", "#c83e73", "#ca3e72", "#cc3f71", "#cd4071", "#cf4070", "#d0416f", "#d2426f", "#d3436e", "#d5446d", "#d6456c", "#d8456c", "#d9466b", "#db476a", "#dc4869", "#de4968", "#df4a68", "#e04c67", "#e24d66", "#e34e65", "#e44f64", "#e55064", "#e75263", "#e85362", "#e95462", "#ea5661", "#eb5760", "#ec5860", "#ed5a5f", "#ee5b5e", "#ef5d5e", "#f05f5e", "#f1605d", "#f2625d", "#f2645c", "#f3655c", "#f4675c", "#f4695c", "#f56b5c", "#f66c5c", "#f66e5c", "#f7705c", "#f7725c", "#f8745c", "#f8765c", "#f9785d", "#f9795d", "#f97b5d", "#fa7d5e", "#fa7f5e", "#fa815f", "#fb835f", "#fb8560", "#fb8761", "#fc8961", "#fc8a62", "#fc8c63", "#fc8e64", "#fc9065", "#fd9266", "#fd9467", "#fd9668", "#fd9869", "#fd9a6a", "#fd9b6b", "#fe9d6c", "#fe9f6d", "#fea16e", "#fea36f", "#fea571", "#fea772", "#fea973", "#feaa74", "#feac76", "#feae77", "#feb078", "#feb27a", "#feb47b", "#feb67c", "#feb77e", "#feb97f", "#febb81", "#febd82", "#febf84", "#fec185", "#fec287", "#fec488", "#fec68a", "#fec88c", "#feca8d", "#fecc8f", "#fecd90", "#fecf92", "#fed194", "#fed395", "#fed597", "#fed799", "#fed89a", "#fdda9c", "#fddc9e", "#fddea0", "#fde0a1", "#fde2a3", "#fde3a5", "#fde5a7", "#fde7a9", "#fde9aa", "#fdebac", "#fcecae", "#fceeb0", "#fcf0b2", "#fcf2b4", "#fcf4b6", "#fcf6b8", "#fcf7b9", "#fcf9bb", "#fcfbbd", "#fcfdbf"],
    "plasma": ["#0d0887", "#100788", "#130789", "#16078a", "#19068c", "#1b068d", "#1d068e", "#20068f", "#220690", "#240691", "#260591", "#280592", "#2a0593", "#2c0594", "#2e0595", "#2f0596", "#310597", "#330597", "#350498", "#370499", "#38049a", "#3a049a", "#3c049b", "#3e049c", "#3f049c", "#41049d", "#43039e", "#44039e", "#46039f", "#48039f", "#4903a0", "#4b03a1", "#4c02a1", "#4e02a2", "#5002a2", "#5102a3", "#5302a3", "#5502a4", "#5601a4", "#5801a4", "#5901a5", "#5b01a5", "#5c01a6", "#5e01a6", "#6001a6", "#6100a7", "#6300a7", "#6400a7", "#6600a7", "#6700a8", "#6900a8", "#6a00a8", "#6c00a8", "#6e00a8", "#6f00a8", "#7100a8", "#7201a8", "#7401a8", "#7501a8", "#7701a8", "#7801a8", "#7a02a8", "#7b02a8", "#7d03a8", "#7e03a8", "#8004a8", "#8104a7", "#8305a7", "#8405a7", "#8606a6", "#8707a6", "#8808a6", "#8a09a5", "#8b0aa5", "#8d0ba5", "#8e0ca4", "#8f0da4", "#910ea3", "#920fa3", "#9410a2", "#9511a1", "#9613a1", "#9814a0", "#99159f", "#9a169f", "#9c179e", "#9d189d", "#9e199d", "#a01a9c", "#a11b9b", "#a21d9a", "#a31e9a", "#a51f99", "#a62098", "#a72197", "#a82296", "#aa2395", "#ab2494", "#ac2694", "#ad2793", "#ae2892", "#b02991", "#b12a90", "#b22b8f", "#b32c8e", "#b42e8d", "#b52f8c", "#b6308b", "#b7318a", "#b83289", "#ba3388", "#bb3488", "#bc3587", "#bd3786", "#be3885", "#bf3984", "#c03a83", "#c13b82", "#c23c81", "#c33d80", "#c43e7f", "#c5407e", "#c6417d", "#c7427c", "#c8437b", "#c9447a", "#ca457a", "#cb4679", "#cc4778", "#cc4977", "#cd4a76", "#ce4b75", "#cf4c74", "#d04d73", "#d14e72", "#d24f71", "#d35171", "#d45270", "#d5536f", "#d5546e", "#d6556d", "#d7566c", "#d8576b", "#d9586a", "#da5a6a", "#da5b69", "#db5c68", "#dc5d67", "#dd5e66", "#de5f65", "#de6164", "#df6263", "#e06363", "#e16462", "#e26561", "#e26660", "#e3685f", "#e4695e", "#e56a5d", "#e56b5d", "#e66c5c", "#e76e5b", "#e76f5a", "#e87059", "#e97158", "#e97257", "#ea7457", "#eb7556", "#eb7655", "#ec7754", "#ed7953", "#ed7a52", "#ee7b51", "#ef7c51", "#ef7e50", "#f07f4f", "#f0804e", "#f1814d", "#f1834c", "#f2844b", "#f3854b", "#f3874a", "#f48849", "#f48948", "#f58b47", "#f58c46", "#f68d45", "#f68f44", "#f79044", "#f79143", "#f79342", "#f89441", "#f89540", "#f9973f", "#f9983e", "#f99a3e", "#fa9b3d", "#fa9c3c", "#fa9e3b", "#fb9f3a", "#fba139", "#fba238", "#fca338", "#fca537", "#fca636", "#fca835", "#fca934", "#fdab33", "#fdac33", "#fdae32", "#fdaf31", "#fdb130", "#fdb22f", "#fdb42f", "#fdb52e", "#feb72d", "#feb82c", "#feba2c", "#febb2b", "#febd2a", "#febe2a", "#fec029", "#fdc229", "#fdc328", "#fdc527", "#fdc627", "#fdc827", "#fdca26", "#fdcb26", "#fccd25", "#fcce25", "#fcd025", "#fcd225", "#fbd324", "#fbd524", "#fbd724", "#fad824", "#fada24", "#f9dc24", "#f9dd25", "#f8df25", "#f8e125", "#f7e225", "#f7e425", "#f6e626", "#f6e826", "#f5e926", "#f5eb27", "#f4ed27", "#f3ee27", "#f3f027", "#f2f227", "#f1f426", "#f1f525", "#f0f724", "#f0f921"],
    "viridis": ["#440154", "#440256", "#450457", "#450559", "#46075a", "#46085c", "#460a5d", "#460b5e", "#470d60", "#470e61", "#471063", "#471164", "#471365", "#481467", "#481668", "#481769", "#48186a", "#481a6c", "#481b6d", "#481c6e", "#481d6f", "#481f70", "#482071", "#482173", "#482374", "#482475", "#482576", "#482677", "#482878", "#482979", "#472a7a", "#472c7a", "#472d7b", "#472e7c", "#472f7d", "#46307e", "#46327e", "#46337f", "#463480", "#453581", "#453781", "#453882", "#443983", "#443a83", "#443b84", "#433d84", "#433e85", "#423f85", "#424086", "#424186", "#414287", "#414487", "#404588", "#404688", "#3f4788", "#3f4889", "#3e4989", "#3e4a89", "#3e4c8a", "#3d4d8a", "#3d4e8a", "#3c4f8a", "#3c508b", "#3b518b", "#3b528b", "#3a538b", "#3a548c", "#39558c", "#39568c", "#38588c", "#38598c", "#375a8c", "#375b8d", "#365c8d", "#365d8d", "#355e8d", "#355f8d", "#34608d", "#34618d", "#33628d", "#33638d", "#32648e", "#32658e", "#31668e", "#31678e", "#31688e", "#30698e", "#306a8e", "#2f6b8e", "#2f6c8e", "#2e6d8e", "#2e6e8e", "#2e6f8e", "#2d708e", "#2d718e", "#2c718e", "#2c728e", "#2c738e", "#2b748e", "#2b758e", "#2a768e", "#2a778e", "#2a788e", "#29798e", "#297a8e", "#297b8e", "#287c8e", "#287d8e", "#277e8e", "#277f8e", "#27808e", "#26818e", "#26828e", "#26828e", "#25838e", "#25848e", "#25858e", "#24868e", "#24878e", "#23888e", "#23898e", "#238a8d", "#228b8d", "#228c8d", "#228d8d", "#218e8d", "#218f8d", "#21908d", "#21918c", "#20928c", "#20928c", "#20938c", "#1f948c", "#1f958b", "#1f968b", "#1f978b", "#1f988b", "#1f998a", "#1f9a8a", "#1e9b8a", "#1e9c89", "#1e9d89", "#1f9e89", "#1f9f88", "#1fa088", "#1fa188", "#1fa187", "#1fa287", "#20a386", "#20a486", "#21a585", "#21a685", "#22a785", "#22a884", "#23a983", "#24aa83", "#25ab82", "#25ac82", "#26ad81", "#27ad81", "#28ae80", "#29af7f", "#2ab07f", "#2cb17e", "#2db27d", "#2eb37c", "#2fb47c", "#31b57b", "#32b67a", "#34b679", "#35b779", "#37b878", "#38b977", "#3aba76", "#3bbb75", "#3dbc74", "#3fbc73", "#40bd72", "#42be71", "#44bf70", "#46c06f", "#48c16e", "#4ac16d", "#4cc26c", "#4ec36b", "#50c46a", "#52c569", "#54c568", "#56c667", "#58c765", "#5ac864", "#5cc863", "#5ec962", "#60ca60", "#63cb5f", "#65cb5e", "#67cc5c", "#69cd5b", "#6ccd5a", "#6ece58", "#70cf57", "#73d056", "#75d054", "#77d153", "#7ad151", "#7cd250", "#7fd34e", "#81d34d", "#84d44b", "#86d549", "#89d548", "#8bd646", "#8ed645", "#90d743", "#93d741", "#95d840", "#98d83e", "#9bd93c", "#9dd93b", "#a0da39", "#a2da37", "#a5db36", "#a8db34", "#aadc32", "#addc30", "#b0dd2f", "#b2dd2d", "#b5de2b", "#b8de29", "#bade28", "#bddf26", "#c0df25", "#c2df23", "#c5e021", "#c8e020", "#cae11f", "#cde11d", "#d0e11c", "#d2e21b", "#d5e21a", "#d8e219", "#dae319", "#dde318", "#dfe318", "#e2e418", "#e5e419", "#e7e419", "#eae51a", "#ece51b", "#efe51c", "#f1e51d", "#f4e61e", "#f6e620", "#f8e621", "#fbe723", "#fde725"]
};

// CONCATENATED MODULE: ../p4/src/vis/colorhex.js
const colorhex = {
    "aliceblue": "#f0f8ff",
    "antiquewhite": "#faebd7",
    "aqua": "#00ffff",
    "aquamarine": "#7fffd4",
    "azure": "#f0ffff",
    "beige": "#f5f5dc",
    "bisque": "#ffe4c4",
    "black": "#000000",
    "blanchedalmond": "#ffebcd",
    "blue": "#0000ff",
    "blueviolet": "#8a2be2",
    "brown": "#a52a2a",
    "burlywood": "#deb887",
    "cadetblue": "#5f9ea0",
    "chartreuse": "#7fff00",
    "chocolate": "#d2691e",
    "coral": "#ff7f50",
    "cornflowerblue": "#6495ed",
    "cornsilk": "#fff8dc",
    "crimson": "#dc143c",
    "cyan": "#00ffff",
    "darkblue": "#00008b",
    "darkcyan": "#008b8b",
    "darkgoldenrod": "#b8860b",
    "darkgray": "#a9a9a9",
    "darkgreen": "#006400",
    "darkkhaki": "#bdb76b",
    "darkmagenta": "#8b008b",
    "darkolivegreen": "#556b2f",
    "darkorange": "#ff8c00",
    "darkorchid": "#9932cc",
    "darkred": "#8b0000",
    "darksalmon": "#e9967a",
    "darkseagreen": "#8fbc8f",
    "darkslateblue": "#483d8b",
    "darkslategray": "#2f4f4f",
    "darkturquoise": "#00ced1",
    "darkviolet": "#9400d3",
    "deeppink": "#ff1493",
    "deepskyblue": "#00bfff",
    "dimgray": "#696969",
    "dodgerblue": "#1e90ff",
    "firebrick": "#b22222",
    "floralwhite": "#fffaf0",
    "forestgreen": "#228b22",
    "fuchsia": "#ff00ff",
    "gainsboro": "#dcdcdc",
    "ghostwhite": "#f8f8ff",
    "gold": "#ffd700",
    "goldenrod": "#daa520",
    "gray": "#808080",
    "green": "#008000",
    "greenyellow": "#adff2f",
    "honeydew": "#f0fff0",
    "hotpink": "#ff69b4",
    "indianred ": "#cd5c5c",
    "indigo": "#4b0082",
    "ivory": "#fffff0",
    "khaki": "#f0e68c",
    "lavender": "#e6e6fa",
    "lavenderblush": "#fff0f5",
    "lawngreen": "#7cfc00",
    "lemonchiffon": "#fffacd",
    "lightblue": "#add8e6",
    "lightcoral": "#f08080",
    "lightcyan": "#e0ffff",
    "lightgoldenrodyellow": "#fafad2",
    "lightgrey": "#d3d3d3",
    "lightgreen": "#90ee90",
    "lightpink": "#ffb6c1",
    "lightsalmon": "#ffa07a",
    "lightseagreen": "#20b2aa",
    "lightskyblue": "#87cefa",
    "lightslategray": "#778899",
    "lightsteelblue": "#b0c4de",
    "lightyellow": "#ffffe0",
    "lime": "#00ff00",
    "limegreen": "#32cd32",
    "linen": "#faf0e6",
    "magenta": "#ff00ff",
    "maroon": "#800000",
    "mediumaquamarine": "#66cdaa",
    "mediumblue": "#0000cd",
    "mediumorchid": "#ba55d3",
    "mediumpurple": "#9370d8",
    "mediumseagreen": "#3cb371",
    "mediumslateblue": "#7b68ee",
    "mediumspringgreen": "#00fa9a",
    "mediumturquoise": "#48d1cc",
    "mediumvioletred": "#c71585",
    "midnightblue": "#191970",
    "mintcream": "#f5fffa",
    "mistyrose": "#ffe4e1",
    "moccasin": "#ffe4b5",
    "navajowhite": "#ffdead",
    "navy": "#000080",
    "oldlace": "#fdf5e6",
    "olive": "#808000",
    "olivedrab": "#6b8e23",
    "orange": "#ffa500",
    "orangered": "#ff4500",
    "orchid": "#da70d6",
    "palegoldenrod": "#eee8aa",
    "palegreen": "#98fb98",
    "paleturquoise": "#afeeee",
    "palevioletred": "#d87093",
    "papayawhip": "#ffefd5",
    "peachpuff": "#ffdab9",
    "peru": "#cd853f",
    "pink": "#ffc0cb",
    "plum": "#dda0dd",
    "powderblue": "#b0e0e6",
    "purple": "#800080",
    "red": "#ff0000",
    "rosybrown": "#bc8f8f",
    "royalblue": "#4169e1",
    "saddlebrown": "#8b4513",
    "salmon": "#fa8072",
    "sandybrown": "#f4a460",
    "seagreen": "#2e8b57",
    "seashell": "#fff5ee",
    "sienna": "#a0522d",
    "silver": "#c0c0c0",
    "skyblue": "#87ceeb",
    "slateblue": "#6a5acd",
    "slategray": "#708090",
    "snow": "#fffafa",
    "springgreen": "#00ff7f",
    "steelblue": "#4682b4",
    "tan": "#d2b48c",
    "teal": "#008080",
    "thistle": "#d8bfd8",
    "tomato": "#ff6347",
    "turquoise": "#40e0d0",
    "violet": "#ee82ee",
    "wheat": "#f5deb3",
    "white": "#ffffff",
    "whitesmoke": "#f5f5f5",
    "yellow": "#ffff00",
    "yellowgreen": "#9acd32"
};

// CONCATENATED MODULE: ../p4/src/vis/color.js



const colorResolution = 256;
const colorSetMax = 32;
const defaultColorScheme = gradients['viridis'];
const defaultColorSet = [
    "steelblue",
    "red",
    "teal",
    "orange",
    "purple"
];

let gradient = defaultColorScheme;
let colorset = defaultColorSet;

function color_color($p) {
    let colorManager = {};

    $p.uniform('uColorMode',       'int',   0) // 0=categorical, 1=numeric
        .uniform('uColorCount',    'int',   colorSetMax)
        .uniform('uColorSet',      'vec3',  setColorTable(colorset))
        // .uniform('uColorGradient', 'vec4', setColorScheme(gradient))
        .texture('tColorGradient', 'float', setColorScheme(gradient),  [colorResolution, 1], 'rgba')
        .subroutine('mapColorRGB', 'vec3',  mapColorRGB);

    colorManager.updateScheme = function(newColors) {
        if(typeof newColors == 'string' && gradients.hasOwnProperty(newColors)) {
            gradient = gradients[newColors];
        } else if(Array.isArray(newColors)) {
            gradient = newColors;
        }
        let colorGradient = setColorScheme(gradient)
        $p.texture.tColorGradient = colorGradient;
        // $p.texture.update('tColorGradient', colorGradient, [0, 0]);
    }

    colorManager.updateTable = function(colors) {
        colorset = colors;
        $p.uniform.uColorSet.data = setColorTable(colors);
    }

    colorManager.colorTable = defaultColorSet.map(function(t){
        return rgba2hex(t);
    });

    colorManager.getColors = function() {
        if($p.uniform.uColorMode == 0) {
            return colorset;
        } else {
            return gradient;
        }
    }

    colorManager.updateColors = function(colors, colorMode) {
        
        colorManager.updateScheme(colors || defaultColorScheme);
        colorManager.updateTable(colors || defaultColorSet);
        if(Number.isInteger(colorMode)) {
            $p.uniform.uColorMode.data = colorMode;
        }
    }

    colorManager.rgb = rgb;
    colorManager.rgba = rgba;

    return colorManager;
}

function colorStrToHex(colorStr) {
    if (typeof colorhex[colorStr.toLowerCase()] != 'undefined') {
        return colorhex[colorStr.toLowerCase()];
    } else {
        return false;
    }
}

function rgb(hexStr) {
    var hex, r, g, b;

    if(hexStr.slice(0,1) == '#') {
        hex = hexStr.slice(1);
    } else {
        hex = colorStrToHex(hexStr).slice(1);
    }

    r = parseInt(hex.substring(0,2), 16) / 255;
    g = parseInt(hex.substring(2,4), 16) / 255;
    b = parseInt(hex.substring(4,6), 16) / 255;
    return [r, g, b];
}

function rgba(hexStr, alpha = 1.0) {
    let c = rgb(hexStr);
    return [c[0], c[1], c[2], alpha];
}

function rgba2hex(c) {
    var r = c[0],
        g = c[1],
        b = c[2],
        a = 1;
    if (r > 255 || g > 255 || b > 255 || a > 255) {
        throw 'Invalid color component';
    }
    return (256 + r).toString(16).substr(1) +((1 << 24) + (g << 16) | (b << 8) | a).toString(16).substr(1);
}

function setColorScheme(colors) {
    var cc = colors.length - 1,
        step = (cc >= 0) ? colorResolution / (cc+1) : 1,
        colorGradient = new Float32Array(colorResolution * 4);

    colors.push(colors[cc]);
    for(var i = 0; i < cc+1; i++) {
        var c0 = rgba(colors[i]),
            c1 = rgba(colors[i+1]),
            offset = Math.floor(i * step)*4;

        for(var x = 0; x < step; x++) {
            var xi = x / (step);
            colorGradient[offset+x*4]   = c0[0] + (c1[0] - c0[0]) * xi;
            colorGradient[offset+x*4+1] = c0[1] + (c1[1] - c0[1]) * xi;
            colorGradient[offset+x*4+2] = c0[2] + (c1[2] - c0[2]) * xi;
            colorGradient[offset+x*4+3] = c0[3] + (c1[3] - c0[3]) * xi;
        }
    }
    colors.pop();
    return colorGradient;
}

function setColorTable(colors) {
    let colorTable = new Float32Array(colorSetMax * 3);
    colors.forEach(function(c, i){
        let colorValue = rgb(c);
        colorTable[i*3] = colorValue[0];
        colorTable[i*3+1] = colorValue[1];
        colorTable[i*3+2] = colorValue[2];
    });
    return colorTable;
}

function mapColorRGB({fieldId = 'int', value = 'float'}) {
    var d = new Vec2();
    var colorRGB = new Vec3();
    var intValue = new Int();
    if(fieldId == -1) {
        colorRGB = this.uDefaultColor;
    } else {
        if(this.uColorMode == 1) {
            colorRGB = texture2D(this.tColorGradient, vec2(value, 1.0)).rgb;
        } else {
            d = this.uVisDomains[fieldId];
            intValue = int(value * (d.y - d.x));
            if(intValue >= this.uColorCount) {
                colorRGB = vec3(0.0, 0.0, 0.0);
            } else {
                colorRGB = this.uColorSet[intValue];
            }
        }
    }
    return colorRGB;
}

// CONCATENATED MODULE: ../p4/src/vis/reveal.js

function reveal($p) {
    $p.uniform('uRevealMode', 'int', 1)
        .framebuffer("offScreenFBO", "float", $p.viewport)
        .framebuffer("visStats", "float", [1, 1]);

    var aViewX = new Float32Array($p.viewport[0]).map((d, i) => i);
    var aViewY = new Float32Array($p.viewport[1]).map((d, i) => i);

    $p.attribute("aViewX", "float", aViewX);
    $p.attribute("aViewY", "float", aViewY);
    $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aViewX.location, 0);
    $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aViewY.location, 1);

    var vs = $p.shader.vertex(function(){
        var i, j;
        i = (this.aViewX+0.5) / this.uViewDim.x;
        j = (this.aViewY+0.5) / this.uViewDim.y;
        this.vColorRGBA = texture2D(this.offScreenFBO, vec2(i, j));
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    });

    var fs = $p.shader.fragment(function() {
        gl_FragColor = this.vColorRGBA;
    });

    $p.program("post-processing", vs, fs);

    var vs2 = $p.shader.vertex(function () {
         gl_Position = vec4(this._square, 0, 1);
    });

    var fs2 = $p.shader.fragment(function() {
        var x, y, a;
        var value = new Vec4();
        x = (gl_FragCoord.x+0.5) / this.uViewDim.x;
        y = (gl_FragCoord.y+0.5) / this.uViewDim.y;
        value = texture2D(this.offScreenFBO, vec2(x, y));

        if(value.a == 0.0) discard;
        // a = pow(((value.a - this.uDefaultAlpha) / (this.uMaxRGBA.a -this.uDefaultAlpha)), 0.33) * 0.85 + 0.15;
        a = pow((value.a / this.uMaxRGBA.a), 0.33) * 0.9 + 0.1;
        // a = value.a / this.uMaxRGBA.a;

        if(this.uRevealMode == 0) {
            gl_FragColor = vec4(this.uDefaultColor*a, a);
        } else {
            gl_FragColor = vec4(texture2D(this.tColorGradient, vec2(1.-a, 1.0)).rgb*this.uDefaultAlpha, this.uDefaultAlpha);
        }
    });

    $p.program("vis-render", vs2, fs2);

    let isFBOAllocatedFBO = false;

    return function(options) {
        var gl,
            viewIndex = options.viewIndex,
            viewDim = options.dim,
            offset = options.offset || [0, 0],
            padding = options.padding || {left: 0, right: 0, left: 0, right:0};

        if(!$p._update) {

            if(!isFBOAllocatedFBO) {
                isFBOAllocatedFBO = true;
                $p.framebuffer("visStats", "float", [1, $p.views.length]);
            }

            let vOffset = [
                offset[0] + padding.left,
                $p.viewport[1] - viewDim[1] + padding.bottom - offset[1],
            ]
            let vDim = [
                viewDim[0] - padding.left - padding.right,
                viewDim[1] - padding.top - padding.bottom
            ]

            $p.attribute.aViewX = seqFloat(vOffset[0], vOffset[0] + vDim[0] - 1);
            $p.attribute.aViewY = seqFloat(vOffset[1], vOffset[1] + vDim[1] - 1);
            gl = $p.program("post-processing");

            $p.framebuffer.enableRead("offScreenFBO");
            $p.bindFramebuffer("visStats");

            $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute._square.location, 0);
            $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aViewX.location, 0);
            $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aViewY.location, 1);
            // gl.clearColor( 0.0, 0.0, 0.0, 0.0 );
            // gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
            gl.disable(gl.CULL_FACE);
            gl.disable(gl.DEPTH_TEST);
            gl.enable( gl.BLEND );
            gl.blendFunc( gl.ONE, gl.ONE );
            gl.blendEquation(gl.MAX_EXT);
            gl.viewport(0, viewIndex, 1, 1);
            gl.ext.drawArraysInstancedANGLE(
                gl.POINTS,
                0,
                vDim[0],
                vDim[1]);

            var max = new Float32Array(4);
            gl.readPixels(0, viewIndex, 1, 1, gl.RGBA, gl.FLOAT, max);
            // if(max[3] == 0) {
            //     max[3] = Math.sqrt($p.dataSize) * Math.log2($p.dataSize);
            // }
            // console.log(offset, viewDim);
            $p.views[viewIndex].maxRGBA = max;
        }

        $p.uniform.uMaxRGBA = $p.views[viewIndex].maxRGBA;

        $p.bindFramebuffer(null);
        gl = $p.program("vis-render");
        gl.ext.vertexAttribDivisorANGLE($p.attribute._square.location, 0);
        $p.framebuffer.enableRead("offScreenFBO");

        gl.viewport(
            offset[0] + padding.left,
            // offset[1] + padding.bottom,
            $p.viewport[1] - viewDim[1] + padding.bottom - offset[1],
            viewDim[0] - padding.left - padding.right,
            viewDim[1] - padding.top - padding.bottom
        );
        // gl.blendEquation(gl.FUNC_ADD);
        gl.disable( gl.BLEND );
        // gl.clearColor( 0.0, 0.0, 0.0, 0.0 );
        // gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
}

// CONCATENATED MODULE: ../p4/src/vis/encode.js
const EncodingChannels = ['x', 'y', 'color', 'opacity', 'width', 'height', 'size']

function encode($p, vmap, colorManager) {
    let opacity = vmap.opacity || vmap.alpha;
    let vmapIndex = new Int32Array(EncodingChannels.length);
    let scaleExponents = new Float32Array(EncodingChannels.length).fill(1.0);
    
    EncodingChannels.forEach((channel, channelIndex) => {
        let encoding = vmap[channel];
        if (typeof(encoding) == 'object' && encoding.hasOwnProperty('field')) {
            if(encoding.exponent !== 1.0) {
                scaleExponents[channelIndex] = encoding.exponent;
            }
            encoding = vmap[channel].field;
        }
        vmapIndex[channelIndex] = $p.fields.indexOf(encoding);
    })
    $p.uniform.uVisualEncodings.data = vmapIndex;
    $p.uniform.uScaleExponents.data = scaleExponents;
    $p.uniform.uDefaultAlpha.data = 1.0;
    if(vmapIndex[2] === -1) {
        if (typeof(vmap.color) === 'string'){
            if(vmap.color === 'auto') {
                $p.revealDensity = true;
                $p.uniform.uRevealMode.data = 1;
            } else {
                $p.uniform.uDefaultColor.data = colorManager.rgb(vmap.color);
            }
        } else {
            if(typeof(vmap.size) == 'number') {
                $p.uniform.uMarkSize.data = vmap.size;
            }
        }
    } else {
        if($p.strLists.hasOwnProperty(vmap.color)) {
            $p.uniform.uColorMode.data = 0;
        } else {
            $p.uniform.uColorMode.data = 1;
        }
    }

    if(typeof(opacity) === 'number') {
        $p.uniform.uDefaultAlpha.data = opacity;
    } else if(vmapIndex[3] === -1 &&
        typeof(opacity) == 'string' &&
        opacity == 'auto'
    ) {
        $p.revealDensity = true;
        $p.uniform.uRevealMode.data = 0;
        // $p.uniform.uDefaultAlpha.data = 1.0;
    }

    if(vmapIndex[6] === -1 && typeof(vmap.size) == 'number') {
        $p.uniform.uMarkSize.data = vmap.size;
    }

    let viewSetting = {scale: {}, histogram: {}};
    let isRect = (['rect', 'bar'].indexOf(vmap.mark) !== -1);
    let markSpace = [0, 0];
    let isXYCategorical = [0, 0];
    if(vmapIndex[0] > -1) {
        let len = $p.fieldWidths[vmapIndex[0]];
        let ext = $p.fieldDomains[vmapIndex[0]];
        if($p.strLists.hasOwnProperty(vmap.x)){
            viewSetting.scale.x = 'categorical';
            viewSetting.domainX = new Array(len).fill(0).map(
                (d,i) => $p.strLists[vmap.x][i]
            );
            isXYCategorical[0] = 1;
         } else if (isRect) {
            viewSetting.scale.x = 'ordinal';
            viewSetting.domainX = new Array(len).fill(0).map((d,i) => ext[0] + i);
         }
         markSpace[0] = 0.02;

    }
    if(vmapIndex[1] > -1) {
        let len = $p.fieldWidths[vmapIndex[1]];
        let ext = $p.fieldDomains[vmapIndex[1]];

        if($p.strLists.hasOwnProperty(vmap.y)){
            viewSetting.scale.y = 'categorical';
            viewSetting.domainY = new Array(len).fill(0).map(
                (d,i)=>$p.strLists[vmap.y][i]
            );
            isXYCategorical[1] = 1;
        } else if (isRect) {
            viewSetting.scale.y = 'ordinal';
            viewSetting.domainY = new Array(len).fill(0).map((d,i)=>ext[0] + i);
        }
        markSpace[1] = 0.1;
    }

    if(vmapIndex[0] > -1 && vmapIndex[1] > -1) {
        markSpace = [0, 0];
    }
    let dims = ['x', 'y'];
    for(let dim of dims) {
        if($p.histograms.indexOf(vmap[dim]) !== -1) {
            let histMin = $p.intervals[vmap[dim]].min;
            let histMax = $p.intervals[vmap[dim]].max;
            let histIntv = $p.intervals[vmap[dim]].interval;
            let histBin = (histMax - histMin) / histIntv + 1;
            let d = (dim == 'x') ? 'domainX' : 'domainY';
            viewSetting.histogram[dim] = true;
            viewSetting[d] = new Array(histBin).fill(histMin).map((h, i) => h + i*histIntv);
            // markSpace[dims.indexOf(dim)] = 0.01;
        }
    }
    $p.uniform.uMarkSpace.data = markSpace;
    $p.uniform.uIsXYCategorical.data = isXYCategorical;

    if(!$p._update) {
        if(!vmap.width && vmap.x) {
            $p.uniform.uDefaultWidth.data = 1.0 / ($p.fieldWidths[$p.fields.indexOf(vmap.x)]);
        } else if(vmapIndex[4] === -1 && typeof(vmap.width) == 'number') {
            $p.uniform.uDefaultWidth.data = vmap.width / width;
        }

        if(!vmap.height && vmap.y) {
            $p.uniform.uDefaultHeight.data = 1.0 / ($p.fieldWidths[$p.fields.indexOf(vmap.y)]);
        } else if(vmapIndex[5] === -1 && typeof(vmap.width) == 'number') {
            $p.uniform.uDefaultHeight.data = vmap.height / height;
        }
    }
    return viewSetting;
}

// CONCATENATED MODULE: ../p4/src/vis/extend.js
/* harmony default export */ var extend = (function ($p, vmap, viewIndex, domains) {
  let chart = $p.views[viewIndex];
  let width = chart.width;
  let height = chart.height;
  let padding = chart.padding;

  $p.extensions.forEach((ext) => {
    if (ext.condition.call(null, vmap)) {
      let dataDomains = {};
      Object.keys(domains).forEach(f => {
        if ($p.uniqueValues.hasOwnProperty(f)) {
          let last = $p.uniqueValues[f].length - 1;
          dataDomains[f] = [$p.uniqueValues[f][0], $p.uniqueValues[f][last]];
        } else {
          dataDomains[f] = domains[f];
        }
      })

      $p.skipRender = ext.skipDefault;
      let data = {
        json: null,
        array: null,
        texture: null,
        vmap: vmap,
        fields: $p.fields,
        schema: $p.dataSchema,
        domains: dataDomains
      };

      let view = Object.assign({}, chart);
      view.width = width - padding.left - padding.right;
      view.height = height - padding.top - padding.bottom;
      view.encodings = vmap;
      view.svg = chart.chart.svg.svg;
      view.canvas = $p.canvas;

      if (ext.exportData) {
        data.json = $p.exportResult({format: 'row', outputTag: vmap.in});
      }

      if (typeof ext.onready === 'function') {
        ext.onready.call($p, data, view);
      }

      let execution = (ext.type == 'class')
        ? function (data, view) {
          chart.plot = new ext.function(data, view)
          return chart.plot;
        } 
        : ext.function;

      if (ext.restartOnUpdate) {
        execution.call(ext, data, view);
      } else {
        if (!$p._update) {
          execution.call(ext, data, view);
        }
      }
    }
  })
});
// CONCATENATED MODULE: ../p4/src/vis/shaders/interpolate.gl.js
/* harmony default export */ var interpolate_gl = ({
    visMap({
        channelId = 'int',
        addrX = 'float',
        addrY = 'float',
        indexedValue0 = 'float',
        indexedValue1 = 'float',
        defaultValue = 'float'
    }) {
        var value;
        var d = new Vec2();
        var fieldId = new Int();
        fieldId = this.uVisualEncodings[channelId];
        if (fieldId > -1) {
            if (fieldId >= this.uIndexCount) {
                value = this.getNonIndexedData(fieldId, addrX, addrY);
            } else if (fieldId < this.uIndexCount) {
                value = (fieldId == 0) ? indexedValue0 : indexedValue1;
            }
            d = this.uVisDomains[fieldId];
            value = (value - d.x) / (d.y - d.x);
            if (this.uScaleExponents[channelId] != 0.0) {
                value = pow(value, this.uScaleExponents[channelId]);
            }

            if (this.uGeoProjection == 1) {
                value = log(tan((value / 90.0 + 1.0) * 3.14159 / 4.0)) * 180.0 / 3.14159;
            }
        } else {
            value = defaultValue;
        }

        return value;
    },

    getEncodingByFieldId({
        fieldId = 'int',
        addrX = 'float',
        addrY = 'float'
    }) {
        var value;
        if (fieldId >= this.uIndexCount) {
            value = this.getNonIndexedData(fieldId, addrX, addrY);
        } else if (fieldId < this.uIndexCount) {
            value = (fieldId == 0) ? addrX : addrY;
        }
        var d = new Vec2();
        d = this.uVisDomains[fieldId];
        value = (value - d.x) / (d.y - d.x);
        return value;
    }
});
// CONCATENATED MODULE: ../p4/src/vis/svg.js
function setAttr(elem, attr) {
    for( var key in attr ){
        var value = attr[key],
            c = key.match(/[A-Z]/);
        if(c !== null) key = key.replace(c[0], "-"+c[0].toLowerCase())
        elem.setAttribute(key, value);
    }
}

function setStyle(elem, style) {
    for( var key in style ){
        var value = style[key],
            c = key.match(/[A-Z]/);
        if(c !== null) key = key.replace(c[0], "-"+c[0].toLowerCase())
        elem.style[key] = value;
    }
}

function Svg(arg){

    var self = (this instanceof Svg) ? this: {},
        option = arg || {},
        type = option.type || 'svg',
        svgNS = 'http://www.w3.org/2000/svg',
        svg = document.createElementNS(svgNS, type),
        width = option.width || 400,
        height = option.height || 300,
        parent = option.parent || option.container || this.parent,
        attr = option.attr || {},
        style = option.style || {},
        padding = option.padding || {left: 0, right: 0, top: 0, bottom: 0};

    if(type === 'svg') {
        var defaultAttr = {
            width   : width + padding.left + padding.right,
            height  : height + padding.top + padding.bottom,
            viewBox : [0, 0, width + padding.left + padding.right , height + padding.top + padding.bottom].join(' '),
            preserveAspectRatio: 'none'
        };
        setAttr(svg, defaultAttr);
    }

    self.innerWidth = function() {
        return width;
    }

    self.innerHeight = function() {
        return height;
    }

    self.padding = function() {
        return padding;
    }

    if(style) setStyle(svg, style);
    if(attr) setAttr(svg, attr);

    if(parent) {
        parent = (typeof parent == "string") ? document.getElementById(parent) : parent;
        parent.appendChild(svg);
    }

    self.svg = svg;
    self.parent = parent;

    self.node = () => svg;

    if(self instanceof Svg) {
        publicMethods(Svg.prototype);
    } else {
        publicMethods(self);
    }

    return self;
};

function publicMethods(context) {
    context.append = function(type, attr, style) {
        var options = {};
        options.parent = this.svg;
        options.type = type;
        options.attr = attr;
        options.style = style;
        return new Svg(options);
    };

    context.remove = function() {
        if(this.svg && this.svg.parentNode === this.parent){
            this.parent.removeChild(this.svg);
        }
    };

    context.attr = function(a, v) {
        if(typeof(a) == "object")
            setAttr(this.svg, a);
        else
            this.svg.setAttribute(a, v);

        return this;
    }

    context.Attr =  function(a, v) {
        setAttr(this.svg, a);
        return this;
    }

    context.Style =  function(a, v) {
        setStyle(this.svg, a);
        return this;
    }

    context.style = function(a, v) {
        if(typeof(a) == "object")
            setStyle(this.svg, a);
        else
            this.svg.style[a] = v;

        return this;
    }

    context.css = context.style;

    context.text = function(str){
        this.svg.appendChild(document.createTextNode(str));
        return this;
    };

    context.translate = function(x, y) {
        var p = this.svg.getAttribute("transform") || "";
        this.svg.setAttribute("transform", p + "translate(" + [x,y].join(",") + ") ");
        return this;
    };

    context.on = function(event, callback) {
        this.svg.addEventListner(event, callback);
        return this;
    }

    return context;
}

// CONCATENATED MODULE: ../p4/src/vis/scale.js
function scale_scale(arg) {
    var option = arg || {},
        align = option.align || 'center',
        type = option.type || 'linear',
        domain = option.domain || [0,1],
        margin = option.margin || 0,
        exponent = option.exponent || 1,
        range = option.range || [0,1];

    function getInterpolateFunction() {
        //intercepts and slopes for domain and range
        var d0 = -domain[0] / (domain[1] - domain[0]),
            d1 = 1 / (domain[1] - domain[0]),
            r0 = range[0],
            r1 = range[1] - range[0];

        if(type == "linear") {
            return function(v) { return r0 + (d0 + v * d1) * r1 };
        } else if(type == "power") {
            d0 = -Math.pow(-d0, exponent);
            d1 = Math.pow(d1, exponent);
            return function(v) { return r0 + (d0 + Math.pow(v, exponent) * d1) * r1 };
        } else if (type == "log") {
            exponent = option.exponent || 10;
            d0 = -(Math.log(-d0) / Math.log(exponent));
            d1 = (Math.log(d1) / Math.log(exponent));

            return function(v) { return r0 + (d0 + Math.log(v) / Math.log(exponent) * d1) * r1 };

        } else if(type == "ordinal" || type == "categorical") {
            return function(v) {
                if(align == 'outer')
                    return r0 + (domain.indexOf(v)+0.5) / (domain.length-1) * r1;
                else
                    return r0 + (domain.indexOf(v)+0.5) / domain.length * r1;
            };
        } else {
            return function(v) { return v };
        }
    }

    var scale = getInterpolateFunction();

    scale.interval = function(ticks) {
        if (type == "ordinal" || type == "categorical") {
            return (1 / domain.length * Math.abs(range[1] - range[0]));
        } else {
            var s = Math.pow(10, Math.floor(Math.log10(Math.abs(range[1] - range[0])))-1);
            return Math.floor( Math.abs(range[1] - range[0]) / (ticks * s) )  * s;
        }
    };

    scale.domainLength = function() {
        if(type == "linear")
            return Math.abs(domain[1] - domain[0]);
        else if(type == "ordinal" || type == "categorical")
            return domain.length;
    };

    scale.rangeLength = function() {
        return Math.abs(range[1] - range[0]);
    };

    scale.invert = function(r) {
        if(type == "linear") {
            return domain[0] + (r - range[0]) / (range[1] - range[0]) * (domain[1] - domain[0]);
        } else if(type == "ordinal" || type == "categorical") {
            var intv = intv = r / scale.rangeLength();
            return domain[Math.min(Math.floor(intv * (domain.length)), domain.length-1)];
        }
    }

    scale.domain = function() {
        return domain;
    }

    return scale;
};

// CONCATENATED MODULE: ../p4/src/vis/axis.js


function axis_axis(arg) {

    var option = arg || {},
        svg = option.container || option.parent,
        dim = option.dim || "x",
        color = option.color || "#000",
        position = option.position || 0,
        align = option.align || "",
        scale = option.scale || "linear",
        exponent = option.exponent || 1,
        metric = option.metric || null,
        domain = option.domain || [0, 1],
        width = option.width || svg.innerWidth(),
        height = option.height || svg.innerHeight(),
        padding = option.padding || svg.padding() || {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        },
        range = option.range || (dim == "x") ? [0, width] : [height, 0],
        styles = {
            stroke: color,
            'stroke-width': 1
        },
        ticks = option.ticks,
        tickLength = option.tickLength || 6,
        tickPosition = option.tickPosition || [0, 0],
        tickInterval = option.tickInterval || "auto",
        tickAlign = option.tickAlign || "center",
        skipLast = option.skipLast || false,
        tickFormat = option.tickFormat || null,
        grid = option.grid,
        format = option.format || function (_) {return _;},
        visable = option.visable || true,
        domainIntervals,
        labelPos = null,
        labelAngle = option.labelAngle || 0,
        X = [],
        Y = [];

    if (typeof (ticks) != "number") {
        ticks = (dim == "x") ? Math.ceil(width / 50) : Math.ceil(height / 50);
    }
    var tickLabelAlign = option.tickLabelAlign || "end";
    switch (align) {
        case "left" || "center":
            labelPos = option.labelPos || {
                x: -tickLength / 2,
                y: -5
            };
            tickLabelAlign = option.tickLabelAlign || "end";
            break;
        case "right":
            labelPos = {
                x: tickLength,
                y: -5
            };
            tickLabelAlign = option.tickLabelAlign || "start";
            if (!tickPosition) tickPosition = [tickLength / 2, 0];
            break;
        case "top":
            labelPos = {
                x: 0,
                y: 0
            };
            tickLabelAlign = "middle";
            if (!tickPosition) tickPosition = [0, -tickLength];
            break;
        case "bottom" || "middle":
            labelPos = option.labelPos || {
                x: 0,
                y: -tickLength * 3
            };
            tickLabelAlign = option.tickLabelAlign || "middle";
            break;
        default:
            labelPos = option.labelPos || option.labelPosition || {
                x: 0,
                y: 0
            };
            break;
    }

    function getTickInterval() {
        var vDomain = Math.abs(domain[1] - domain[0]),
            intv = vDomain / ticks,
            pow = Math.ceil(Math.log10(intv)),
            intv = intv / Math.pow(10, pow);

        if (intv > 0.2 && intv <= 0.25) {
            intv = 0.25;
        } else if (intv > 0.7 && intv <= 0.75) {
            intv = 0.75;
        } else {
            intv = Math.ceil(intv * 10) / 10;
        }
        return intv * Math.pow(10, pow);
    }

    if (scale == "categorical" || scale == "ordinal") {
        domainIntervals = function () {
            if(domain.length > 20) {
                var dstep = Math.floor(domain.length / 20);
                return domain.filter( (d,di) => di % dstep === 0)
            }
            return domain;
        };
    } else {
        var intv;

        if (tickInterval == "auto") {
            intv = getTickInterval();

        } else {
            if (typeof (tickInterval) == "number") {
                intv = tickInterval;
            } else {
                // intv = Math.abs(domain[1] - domain[0]) / ticks;
                intv = getTickInterval();
                domain[0] = intv * Math.floor(domain[0] / intv);
                domain[1] = intv * Math.ceil(domain[1] / intv);
            }
        }

        domainIntervals = function () {
            var di = [];

            if (domain[0] > domain[1]) {
                domain[0] += intv;
                for (var i = domain[0]; i > domain[1]; i = i - intv)
                    di.push(i);
            } else {
                for (var i = domain[0]; i < domain[1]; i = i + intv)
                    di.push(i);
            }

            if (di[di.length - 1] != domain[1] && !isNaN(domain[1]) && !skipLast) {

                if ((domain[1] - di[di.length - 1]) < 0.4 * intv)
                    di[di.length - 1] = domain[1];
                else
                    di.push(domain[1]);
            }
            return di;
        }
    }

    if (metric === null) {

        var scaleOptions = {
            align: tickAlign,
            type: scale,
            domain: domain,
            range: range
        };

        if (scale == "power") {
            scaleOptions.exponent = exponent;
        }

        metric = scale_scale(scaleOptions)
    } else {
        domain = metric.domain();
    }

    var axis = svg.append("g");

    if (dim == 'x') {
        if (!position && align) {
            position = [0, height / 2, height];
            position = position[["top", "middle", "bottom"].indexOf(align)];
        }
        Y[0] = Y[1] = position;
        X[0] = 0;
        X[1] = Math.abs(range[1] - range[0]);
    } else {
        if (!position && align) {
            position = [0, width / 2, width];
            position = position[["left", "center", "right"].indexOf(align)];
        }
        X[0] = X[1] = position;
        Y[0] = 0;
        Y[1] = Math.abs(range[1] - range[0]);
    }

    metric.show = metric.axis = function () {
        axis.append("g")
            .append("line")
            .Attr({
                x1: X[0],
                x2: X[1],
                y1: Y[0],
                y2: Y[1]
            })
            .Style(styles);

        var di = domainIntervals();

        for (var i = 0; i < di.length; i++) {
            var x1, x2, y1, y2;
            if (dim == 'x') {
                x1 = x2 = metric(di[i]) + tickPosition[0];
                y1 = position + tickPosition[1] + tickLength;
                y2 = y1 - tickLength;
            } else {
                y1 = y2 = metric(di[i]) + tickPosition[1];
                x1 = position + tickPosition[0];
                x2 = x1 - tickLength;
            }

            var svgTicks = axis.append("g");
            svgTicks.append("line", {
                x1: x1,
                x2: x2,
                y1: y1,
                y2: y2,
            }, styles);


            // if (dim == 'x') tickLabelAlign = "middle";
            // if (dim == 'x' && labelAngle) tickLabelAlign = "end";

            var tickLabel = svgTicks.append("text")
                .Attr({
                    x: x2 + labelPos.x,
                    y: y2 - labelPos.y,
                    class: "p4-axis-label",
                    "font-size": "0.9em",
                    textAnchor: tickLabelAlign
                });
            if (labelAngle) tickLabel.attr("transform", "rotate(" + [labelAngle, (x2 + labelPos.x), (y2 - labelPos.y)].join(",") + ")");

            var labelText = (typeof (tickFormat) == "function") ? format(tickFormat(di[i])) : format(di[i]);
            // tickLabel.appendChild( document.createTextNode(labelText) );
            tickLabel.text(labelText);

            if (grid) {
                var gx1, gx2, gy1, gy2;
                if (dim == 'x') {
                    gx1 = gx2 = metric(di[i]);
                    gy1 = 0;
                    gy2 = height;
                } else {
                    gy1 = gy2 = metric(di[i]);
                    gx1 = 0;
                    gx2 = width;
                }
                axis.append("line", {
                    x1: gx1,
                    x2: gx2,
                    y1: gy1,
                    y2: gy2,
                    class: "grid-lines"
                }, {
                    "stroke": color,
                    // "stroke-width": 0.5,
                    "stroke-opacity": 0.15
                });
            }
        }
        axis.translate(padding.left, padding.top);
        return axis;
    };

    metric.remove = function () {
        axis.remove();
    }

    if (visable) {
        metric.svg = metric.show();
    }

    return metric;
};
// CONCATENATED MODULE: ../p4/src/vis/format.js


function printformat(spec) {
    return function(value){
        if(typeof value !== "number") return value;
        var ret,
            convert,
            numericSymbols = ['y', 'z', 'a', 'f', 'p', 'n', 'µ', 'm', '', 'k', 'M','G', 'T', 'P', 'E', 'Z', 'Y'],
            n = Object(arrays["seq"])(-24,24,3),
            i = numericSymbols.length-1,
            parts,
            precision = spec.match(/\d+/)[0] || 3,
            number = Number(value),
            exp,
            suffix;

        if(spec[spec.length-1] == 's')
            precision--;

        parts = number.toExponential(precision).toString().match(/^(-{0,1})(\d+)\.?(\d*)[eE]([+-]?\d+)$/);
        exp = parseInt(parts[4]) || 0;

        while (i--) {
            if (exp >= n[i]) {
                if(i==7 && (exp-n[i]) > 1) {
                    // console.log(exp-n[i]);
                    suffix = numericSymbols[i+1];
                    exp -= n[i+1];
                    break
                } else {
                    suffix = numericSymbols[i];
                    exp -= n[i];
                    break;
                }
            }
        }
        ret = parseFloat(parts[1] + parts[2] + '.' + (parts[3]||0) + 'e' + exp.toString());
        return ret.toString() + suffix;
    }
}

// CONCATENATED MODULE: ../p4/src/vis/legend.js




const defaultColors = ['white', 'steelblue'];
const defaultSize = 20;
var gradID = 0;

function legend_color(arg){
    var gradientID = gradID++;

    var option = arg || {},
        container = option.container || null,
        width = option.width || null,
        height = option.height || null,
        pos = option.pos ||[0, 0],
        dim = option.dim || 'x',
        padding = option.padding || {left: 0, right: 0, top: 0, bottom: 0},
        vmap = option.vmap || {},
        label = option.label || false,
        colors = option.colors || defaultColors,
        domain = option.domain || ['min', 'max'],
        format = option.format || printformat('.3s');


    if(colors.length < 2) colors = defaultColors;
    width -= padding.left + padding.right;
    height -= padding.top + padding.bottom;

    var legend = (container === null)
        ? new Svg({width: width, height: height, padding: padding})
        : container.append('g');

    var gradDirection;
    if(dim == 'x') {
        gradDirection = {x1: 0, x2: 1, y1: 0, y2: 0};
        if(height === null) height = defaultSize;
    } else {
        gradDirection = {x1: 0, x2: 0, y1: 0, y2: 1};
        if(width === null) width = defaultSize;
    }

    function linearGradient(colors) {
        var gradient = legend.append('defs')
            .append('linearGradient')
                .attr('id', 'gradlegend'+gradientID)
                .attr(gradDirection);

        colors.forEach(function(c, i){
            gradient.append('stop')
                .attr('offset', i / (colors.length-1) )
                .attr('stop-color', colors[colors.length-i-1]);
        });
        return gradient;
    }

    var grad = linearGradient(colors);

    var rect = legend.append('g');

    var colorScale = rect.append('rect')
        .attr('width', width-padding.left)
        .attr('height', height)
        .style('fill','url(#gradlegend' + gradientID + ')');

    var domainLabel = legend.append('text');
    if(label) {
        label.append('text')
            .attr('x', pos[0] - 5)
            .attr('y', pos[1] + height/2 + 5)
            .style('fill', '#222')
            .style('text-anchor', 'end')
            .text(printformat('2s')(domain[0]));

        legend.append('text')
            .attr('x', pos[0] + width - padding.left + 5)
            .attr('y', pos[1] + height/2 + 5)
            .style('fill', '#222')
            .style('text-anchor', 'begin')
            // .style('font-size', '.9em')
            .text(printformat('2s')(domain[1]));
    }

    if(option.title) {
        legend.append('g')
          .append('text')
            .attr('y', pos[1] - padding.top)
            .attr('x', pos[0] + width/2)
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text(option.title);
    }

    if(dim == 'x') {
        new axis_axis({
            dim: 'x',
            domain: domain,
            container: legend,
            align: 'bottom',
            ticks: Math.floor(width / 30),
            height: height,
            width: width,
            labelPos: {x: 0, y: -20},
            format: format,
        });
    } else {
        new axis_axis({
            dim: 'y',
            domain: domain,
            container: legend,
            align: 'right',
            ticks: Math.floor(height / 30),
            height: height,
            width: width,
            labelPos: {x: 0, y: -20},
            format: format,
        });
    }


    // legend.appendChild(xAxis);

    legend.translate(pos[0]+padding.left, pos[1]+padding.top);

    // legend.update = function(newDomain, newColors) {
    //
    //     legend.removeChild(xAxis);
    //     xAxis = new Axis({
    //         dim: 'x',
    //         domain: newDomain,
    //         container: legend,
    //         align: 'bottom',
    //         ticks: 4,
    //         // tickInterval: 10000000,
    //         labelPos: {x: -5, y: -20},
    //          padding: padding,
    //         width: width-padding.left,
    //         format: format,
    //     }).show();
    //
    //     if(typeof(newColors) != 'undefined') {
    //         grad.remove();
    //         grad = linearGradient(newColors);
    //         colorScale.css('fill','url(#gradlegend' + gradientID + ')');
    //
    //     }
    //     // legend.appendChild(xAxis);
    //
    //     return legend;
    // }

    return legend;
}

// CONCATENATED MODULE: ../p4/src/vis/chart.js




function chart(frontSvg, backSvg, arg) {
    var options = arg || {},
        plot = frontSvg.append('g'),
        metavis = backSvg.append('g'),
        width = options.width,
        height = options.height,
        top = options.top || 0,
        left = options.left || 0,
        vmap = options.vmap || {},
        histogram =  options.histogram,
        features = options.fields || [],
        domain = options.domain,
        strLists = options.strLists,
        labels = plot.append('g'),
        onclick = options.onclick || null,
        onhover = options.onhover || null,
        showLegend = options.legend,
        tickOffset = options.axisOffset || [0, 0],
        padding = options.padding || {left: 0, right: 0, top: 0, bottom: 0},
        marks = [],
        frameBorder = options.frameBorder || false,
        gridlines = options.gridlines || {x: false, y: false},
        colors = options.colors;

    var scale = options.scale || {x: 'linear', y: 'linear'},
        domainX = options.domainX || domain[vmap.x] || domain[vmap.width],
        domainY = options.domainY || domain[vmap.y] || domain[vmap.height];

    width -= padding.left + padding.right;
    height -= padding.top + padding.bottom;

    var axisOption = {
        x: {
            container: metavis,
            dim: "x",
            width: width,
            height: height,
            domain: domainX,
            scale:  scale.x,
            align: "bottom",
            // ticks: 15,
            grid: gridlines.x,
            format: printformat(".3s"),
        },
        y: {
            container: metavis,
            dim: "y",
            domain: domainY,
            scale: scale.y,
            width: width,
            height: height,
            align: "left",
            // labelPos: {x: -5, y: -5},
            // ticks: 8,
            grid: gridlines.y,
            format: printformat(".3s"),
        }
    };

    let colorLegend;
    if(showLegend && features.indexOf(vmap.color) !== -1){
        colorLegend = legend_color({
            container: metavis,
            width: 20,
            height: 180,
            dim: "y",
            domain: domain[vmap.color],
            pos: [width + padding.right/2, 0],
            colors: colors
        });
    }

    let x, y, xAxes = [], yAxes = [];

    // For parallel coordinates
    if(Array.isArray(vmap.x)) {
        let axisDist = height / (vmap.x.length-1);

        vmap.x.forEach(function(d, i) {
            axisOption.x.position = i * axisDist + 1;
            axisOption.x.domain = domain[d];
            if(strLists.hasOwnProperty(d)){
                axisOption.x.scale = 'ordinal';
                axisOption.x.tickAlign = 'outer';
                axisOption.x.domain = strLists[d].reverse();
            }
            let labelOffset = 20;
            if(i === 0) {
                axisOption.x.tickPosition = [0, -5];
                axisOption.x.labelPos = {x: 0, y: 2};
                labelOffset = 35;
            } else {
                axisOption.x.tickPosition = null;
                axisOption.x.labelPos = null;
            }
            x = axis_axis(axisOption.x);
            xAxes[i] = x;

            labels
            .append("text")
              .attr("x", 5 )
              .attr("y", i * axisDist - labelOffset)
              .attr("dy", "1em")
              .css("text-anchor", "middle")
              .css("font-size", "1em")
              .text(d);
        });
    }

    if(Array.isArray(vmap.y)) {
        var axisDist = width / (vmap.y.length-1);

        vmap.y.forEach(function(d, i) {
            axisOption.y.position = i * axisDist;
            axisOption.y.domain = domain[d];
            if(strLists.hasOwnProperty(d)){
                axisOption.y.scale = 'ordinal';
                axisOption.y.tickAlign = 'outer';
                axisOption.y.domain = strLists[d].reverse();
            }
            if(i == vmap.y.length-1) {
                axisOption.y.tickPosition = [5, 0];
                axisOption.y.tickLabelAlign = "start";
                axisOption.y.labelPos = {x: 8, y: -5};

            }
            y = axis_axis(axisOption.y);
            yAxes[i] = y;

            labels.append("text")
              .attr("y", -padding.top + 10)
              .attr("x", i * axisDist)
              .attr("dy", "1em")
              .css("text-anchor", "middle")
              .css("font-size", "1em")
              .text(d);
        });
    }

    let histDomain = {
        x: domainX, 
        y: domainY
    };
    for(let dim of ['x', 'y']) {
        if(scale[dim] == 'ordinal' || scale[dim] == 'categorical') {
            if(width / histDomain[dim].length < 10) {
                axisOption[dim].ticks = histDomain[dim].length;
            }
            // while(width / axisOption[dim].ticks < 20) {
            //     axisOption[dim].ticks *= 0.5;
            // }
        }

        if(histogram[dim]) {
            axisOption[dim].tickPosition = (dim == 'x') 
                ? [-width / (histDomain[dim].length-1) /2, 0]
                : [0, height/ (histDomain[dim].length-1) /2]

            axisOption[dim].scale = "ordinal";
            axisOption[dim].tickAlign = "outer";
            axisOption[dim].domain = histDomain[dim];
            axisOption[dim].ticks = histDomain[dim].length;
        }
    }

    if((vmap.x || vmap.width) && !Array.isArray(vmap.x)) x = axis_axis(axisOption.x);
    if((vmap.y || vmap.height) && !Array.isArray(vmap.y)) y = axis_axis(axisOption.y);

    if((vmap.hasOwnProperty('x') || vmap.hasOwnProperty('width')) && !Array.isArray(vmap.x)) {
        let xAxisTitle = vmap.x || vmap.width;
        // xAxisTitle = xAxisTitle.replace(/_/g, ' ');
        // axisOption.x.grid = 1;
        labels.append("g")
          .append("text")
            .attr("x", width/2)
            .attr("y", height + padding.bottom/2 )
            .attr("dy", "1em")
            .css("text-anchor", "middle")
            .css("font-size", "1.0em")
            .css("font-weight", "bold")
            .css(" text-transform", "capitalize")
            .text(xAxisTitle);

    }
    if((vmap.hasOwnProperty('y') || vmap.hasOwnProperty('height')) && !Array.isArray(vmap.y)) {
        let yAxisTitle = vmap.y || vmap.height;
        // yAxisTitle = yAxisTitle.replace(/_/g, ' ');
        // axisOption.y.grid = 1;
        if(!Array.isArray(vmap.y)) {
            labels.append("g")
              .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", -padding.left/1.25 )
                .attr("x", -height/2 )
                .attr("dy", "1em")
                .css("text-anchor", "middle")
                .css("font-size", "1.0em")
                .css("font-weight", "bold")
                .css(" text-transform", "capitalize")
                .text(yAxisTitle);
        }
    }
    
    if(frameBorder) {
        plot.append("line")
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', 0)
            .attr('y2', 0)
            .css('stroke', '#000')
        plot.append("line")
            .attr('x1', width)
            .attr('x2', width)
            .attr('y1', 0)
            .attr('y2', height)
            .css('stroke', '#000')
            .css('stroke-opacity', 0.5)
    }

    plot.translate(padding.left+left, padding.top+top);
    metavis.translate(padding.left+left, padding.top+top);

    let chartLayer = {};
    chartLayer.updateAxisX =  function(newDomain) {
        x.remove();
        axisOption.x.domain = newDomain;
        x = axis_axis(axisOption.x)
        return chartLayer;
    }
    chartLayer.updateAxisY =  function(newDomain) {
        y.remove();
        axisOption.y.domain = newDomain;
        y = axis_axis(axisOption.y)
        return chartLayer;
    }
    chartLayer.removeAxis = function() {

        if(yAxes.length) {
            yAxes.forEach(function(yp) {
                yp.remove();
            })
        } else if(xAxes.length) {
            xAxes.forEach(function(xp) {
                xp.remove();
            })
        } else {
            x.remove();
            y.remove();
        }
    }
    chartLayer.removeLegend = function() {
        if(showLegend) {
            colorLegend.remove();
        }
    }
    chartLayer.svg = plot;
    chartLayer.x = Array.isArray(vmap.x) ? xAxes : x;
    chartLayer.y = Array.isArray(vmap.y) ? yAxes : y;

    return chartLayer;
};

// CONCATENATED MODULE: ../p4/src/vis/layout.js



function layout_assign(object, source) {
    Object.keys(source).forEach(function(key) {
        object[key] = source[key];
    });
}
var defaultProperties = {
    width: 400,
    height: 300,
    padding: {left: 0, right: 0, top: 0, bottom: 0},
}

function layout(arg){
    "use strict";

    /* Private */
    var viz = this,
        option = arg || {},
        container = option.container || document.body,
        style = option.style || null,
        layers = [];

    this.width = container.clientWidth || 400;
    this.height = container.clientHeight || 300;

    if(typeof container == 'string') container = document.getElementById(container);
    layout_assign(viz, defaultProperties);
    layout_assign(viz, option);

    this.vmap = option.vmap;

    this.width -= (this.padding.left + this.padding.right);
    this.height -= (this.padding.top + this.padding.bottom);


    /* Public */
    this.data = option.data || [];
    this.div = document.createElement("div");
    if(style !== null) {
        Object.keys(style).forEach(function(prop){
            viz.div.style[prop] = style[prop];
        })
    }

    this.init = function(){
        // container = (containerId == "body") ? document.body : document.getElementById(containerId);

        this.div.className = option.className || "p6-viz";
        this.div.style.position = 'relative';
        this.resize(
            this.width + this.padding.left + this.padding.right,
            this.height + this.padding.top + this.padding.bottom
        );

        if(option.style) this.css(option.style);

        container.appendChild(this.div);
        this.viz();
        return viz;
    };

    this.createSVG = function(arg) {
        var arg = arg || {},
            width = arg.width || this.width,
            height = arg.height || this.height,
            padding = arg.padding || this.padding;

        return new Svg({
            width: width,
            height: height,
            padding: padding,
            style: {position: 'absolute'}
        });
    }

    var canvas = option.canvas,
        svg = this.createSVG(),
        vmap = option.vmap,
        chartPadding = this.padding || {left: 0, right: 0, top: 0, bottom: 0},
        domain = option.domain || {x: [0, 1000], y: [0, 1]},
        scales = option.scales || {x: 'linear', y: 'linear'};

    var backSVG = this.createSVG(),
        frontSVG = this.createSVG();

    this.set = function(props) {
        layout_assign(viz, props);
    };

    this.addProperty = function(obj, prop) {
        layout_assign(obj, prop);
        return obj;
    }

    this.viz = function() {
        viz.div.appendChild(backSVG.svg);
        viz.div.appendChild(canvas);
        viz.div.appendChild(frontSVG.svg);
        return viz;
    };

    this.render = this.viz;

    this.css = function(style){
        for(var key in style){
            this.div.style[key] = style[key];
        }
        return this;
    };

    this.resize = function(w,h){
        this.div.style.width = w + "px";
        this.div.style.height = h + "px";
    };

    this.destroy = function() {
        this._super.destroy();
        container.removeChild(this.div);
        div = null;
    };

    this.hide = function() {
        this.div.style.display = 'none';
    }

    this.show = function() {
        this.div.style.display = 'block';
    }

    this.innerWidth = function() {
        return this.width;
    }

    this.innerHeight = function() {
        return this.height;
    }

    this.addChart = function(options) {
        return chart(frontSVG, backSVG, options)
    };

    this.exportImage = function(beforeExport) {
        var imageCanvas = document.createElement("canvas");
        imageCanvas.width = this.width;
        imageCanvas.height = this.height;
        return new Promise(function(resolve, reject) {

            var ctx = imageCanvas.getContext("2d");
            var svgString = new XMLSerializer().serializeToString(frontSVG.svg);

            var DOMURL = self.URL || self.webkitURL || self;
            var svgBlob = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
            var svgURL = DOMURL.createObjectURL(svgBlob);

            var canvasLayer = new Image();
            var svgLayer = new Image();
            canvasLayer.onload = function() {
                ctx.drawImage(canvasLayer, 0, 0);
                svgLayer.src = svgURL;
                svgLayer.onload = function() {
                    ctx.drawImage(svgLayer, 0, 0);
                    var png = imageCanvas.toDataURL("image/png");
                    DOMURL.revokeObjectURL(png);
                    resolve(png);
                };
            };

            canvasLayer.onerror = function() {
                reject(Error("Canvas Output Error!"));
            }

            svgLayer.onerror = function() {
                reject(Error("SVG Output Error!"));
            }
            beforeExport();
            canvasLayer.src = canvas.toDataURL("image/png");
        });

    }

    return viz.init();
};

// CONCATENATED MODULE: ../p4/src/vis/shaders/Renderer.gl.js
class Renderer {
  constructor({context, name}) {
    this.gl = context;
    this.name = name;
    this.gl.program(
      name,
      this.gl.shader.vertex(this.vertexShader),
      this.gl.shader.fragment(this.fragmentShader)
    )
  }

  vertexShader () {
    gl_Position = vec4(this._square, 0, 1);
  }

  fragmentShader () {
    if(this.vResult <= this.uVisLevel + 0.01 && this.vResult >= this.uVisLevel - 0.01) {
      gl_FragColor = this.vColorRGBA;
    } else {
      discard;
    }
  }

  load () {
    return this.gl.program(this.name);
  }

  render () {
    let gl = this.gl.ctx;
    gl.disable( gl.BLEND );
    gl.drawArrays(primitive || gl.TRIANGLES, 0, 6);
  }
}
// CONCATENATED MODULE: ../p4/src/vis/shaders/Instanced.gl.js


class Instanced extends Renderer{
    constructor(arg) {
        super(arg)        
    }

    vertexShader () {
        var i, j, posX, posY, color, alpha, size;
        var rgb = new Vec3();

        i = (this.aDataIdx + 0.5) / this.uDataDim.x;
        j = (this.aDataIdy + 0.5) / this.uDataDim.y;

        if (this.uFilterFlag == 1) {
            this.vResult = texture2D(this.fFilterResults, vec2(i, j)).a;
        } else {
            this.vResult = this.uVisLevel;
        }

        posX = this.visMap(0, i, j, this.aDataValx, this.aDataValy, 0.0);
        posY = this.visMap(1, i, j, this.aDataValx, this.aDataValy, 0.0);
        color = this.visMap(2, i, j, this.aDataValx, this.aDataValy, -1.0);
        alpha = this.visMap(3, i, j, this.aDataValx, this.aDataValy, this.uDefaultAlpha);
        size = this.visMap(6, i, j, this.aDataValx, this.aDataValy, 1.0);

        if(this.uIsXYCategorical[0] == 1) {
            var width = this.uFieldWidths[0];
            posX = 0.5 / width + posX * (width - 1.0) / width;
        }
        if(this.uIsXYCategorical[1] == 1) {
            var height = this.uFieldWidths[1];
            posY = 0.5 / height + posY * (height - 1.0) / height;
        }

        posX = posX * 2.0 - 1.0;
        posY = posY * 2.0 - 1.0;

        rgb = this.mapColorRGB(this.uVisualEncodings[2], color);
        gl_PointSize = size * this.uMarkSize;
        this.vColorRGBA = vec4(rgb, alpha);
        gl_Position = vec4(posX, posY, 0.0, 1.0);
    }

    fragmentShader() {
        var valid = new Bool();
        valid = this.vResult <= this.uVisLevel + 0.01 && this.vResult >= this.uVisLevel - 0.01;
        if (this.uVisMark == 1) {
            var dist = length(gl_PointCoord.xy - vec2(0.5, 0.5));
            if (dist > 0.5) discard;
            var delta = 0.15;
            var alpha = this.vColorRGBA.a - smoothstep(0.5 - delta, 0.5, dist);
            if (valid) {
                gl_FragColor = vec4(this.vColorRGBA.rgb * alpha, alpha);
            } else {
                discard;
            }
        } else {
            if (valid) {
                gl_FragColor = vec4(this.vColorRGBA.rgb * this.vColorRGBA.a, this.vColorRGBA.a);
            } else {
                discard;
            }
        }
    }

    render(primitive) {
        let $p = this.gl;
        $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aDataIdx.location, 0);
        $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aDataValx.location, 0);
        $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aDataIdy.location, 1);
        $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aDataValy.location, 1);
        $p.ctx.ext.drawArraysInstancedANGLE(primitive, 0, $p.dataDimension[0], $p.dataDimension[1]);

    }
}
// CONCATENATED MODULE: ../p4/src/vis/shaders/Polygon.gl.js


class Polygon extends Renderer{
  constructor (arg) {
    super(arg);
  }

  vertexShader () {
    var i, j;
    var rgb = new Vec3();
    var posX, posY, color, alpha, width, height, size;
    i = (mod(this.aDataItemId, this.uDataDim.x) + 0.5) / this.uDataDim.x;
    j = (floor(this.aDataItemId / this.uDataDim.x) + 0.5) / this.uDataDim.y;

    this.vResult = this.uVisLevel;

    if (this.uFilterFlag == 1) {
      this.vResult = texture2D(this.fFilterResults, vec2(i, j)).a;
    }
    var val0, val1;
    val0 = this.aDataItemVal0;
    val1 = this.aDataItemVal1;
    posX = this.visMap(0, i, j, val0, val1, 0.0);
    posY = this.visMap(1, i, j, val0, val1, 0.0);
    color = this.visMap(2, i, j, val0, val1, -1.0);
    alpha = this.visMap(3, i, j, val0, val1, this.uDefaultAlpha);
    width = this.visMap(4, i, j, val0, val1, this.uDefaultWidth);
    height = this.visMap(5, i, j, val0, val1, this.uDefaultHeight);
    size = this.visMap(6, i, j, val0, val1, this.uMarkSize);
    posX = posX * (this.uFieldWidths[this.uVisualEncodings[0]] - 1.0) / this.uFieldWidths[this.uVisualEncodings[0]];
    posY = posY * (this.uFieldWidths[this.uVisualEncodings[1]] - 1.0) / this.uFieldWidths[this.uVisualEncodings[1]];

    width *= 1.0 - this.uMarkSpace.x * 2.0;
    height *= 1.0 - this.uMarkSpace.y * 2.0;
    posX += this.uMarkSpace.x * width;
    posY += this.uMarkSpace.y * height;

    if (this.aVertexId == 0.0 || this.aVertexId == 3.0) {
      posX = posX * 2.0 - 1.0;
      posY = posY * 2.0 - 1.0;
    } else if (this.aVertexId == 1.0) {
      posX = posX * 2.0 - 1.0;
      posY = (posY + height) * 2.0 - 1.0;
    } else if (this.aVertexId == 2.0 || this.aVertexId == 5.0) {
      posX = (posX + width) * 2.0 - 1.0;
      posY = (posY + height) * 2.0 - 1.0;
    } else if (this.aVertexId == 4.0) {
      posX = (posX + width) * 2.0 - 1.0;
      posY = posY * 2.0 - 1.0;
    } else {
      posX = posX * 2.0 - 1.0;
      posY = posY * 2.0 - 1.0;
    }

    rgb = this.mapColorRGB(this.uVisualEncodings[2], color);
    this.vColorRGBA = vec4(rgb * alpha, alpha);
    gl_Position = vec4(posX, posY, 0.0, 1.0);
  }

  fragmentShader() {
    if (this.vResult <= this.uVisLevel + 0.01 && this.vResult >= this.uVisLevel - 0.01)
      gl_FragColor = this.vColorRGBA;
    else
      discard;
  }

  render() {
    let $p = this.gl;
    let primitive = $p.ctx.TRIANGLES;
    let val0 = new Float32Array($p.dataSize);
    let val1 = new Float32Array($p.dataSize);
    for(var y = 0; y < $p.dataDimension[1]; y++) {
      for(var x = 0; x < $p.dataDimension[0]; x++) {
        val0[y*$p.dataDimension[0] + x] = $p.attribute.aDataValx.data[x];
        val1[y*$p.dataDimension[0] + x] = $p.attribute.aDataValy.data[y];
      }
    }
    $p.attribute.aDataItemVal0 = val0;
    $p.attribute.aDataItemVal1 = val1;
    $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aVertexId.location, 0);
    $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aDataItemId.location, 1);
    $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aDataItemVal0.location, 1);
    $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aDataItemVal1.location, 1);
    $p.ctx.ext.drawArraysInstancedANGLE(primitive, 0, 6, $p.dataSize);
  }
}
// CONCATENATED MODULE: ../p4/src/vis/shaders/Interleaved.gl.js


class Interleaved_gl_Instanced extends Renderer{
    constructor(arg) {
        super(arg)        
    }

    vertexShader () {
      var i, j;
      var rgb = new Vec3();
      var posX, posY, size, color, alpha;
      gl_PointSize = this.uMarkSize;
      i = (mod(this.aDataItemId, this.uDataDim.x) + 0.5) / this.uDataDim.x;
      j = (floor(this.aDataItemId / this.uDataDim.x) + 0.5) / this.uDataDim.y;
  
      this.vResult = this.uVisLevel;
      if(this.uFilterFlag == 1) {
          this.vResult = texture2D(this.fFilterResults, vec2(i, j)).a;
      }
      if(this.uInterleaveX == 1) {
          posX = this.aDataFieldId.y / float(this.uFeatureCount-1);
          posY = this.getEncodingByFieldId(int(this.aDataFieldId.x), i, j);
      } else {
          posY = 1.0 - this.aDataFieldId.y / float(this.uFeatureCount-1);
          posX = this.getEncodingByFieldId(int(this.aDataFieldId.x), i, j);
      }
      color = this.visMap(2, i, j, i, j, -1.0);
      alpha = this.visMap(3, i, j, i, j, this.uDefaultAlpha);
  
      posX = posX * 2.0 - 1.0;
      posY = posY * 2.0 - 1.0;
  
      rgb = this.mapColorRGB(this.uVisualEncodings[2], color);
      this.vColorRGBA = vec4(rgb*alpha, alpha);
      gl_Position = vec4(posX, posY, 0.0, 1.0);
    }

    updateInstancedAttribute(vm) {
      let $p = this.gl;
      if(Array.isArray(vm)){
          let fv = new Float32Array(vm.length*2);
          vm.forEach(function(f, i) {
              fv[i*2] = $p.fields.indexOf(f);
              fv[i*2+1] = i;
          });
          $p.attribute.aDataFieldId = fv;
          $p.uniform.uFeatureCount = vm.length;
      }
    }

    render(primitive) {
      let $p = this.gl;
      $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aDataFieldId.location, 0);
      $p.ctx.ext.vertexAttribDivisorANGLE($p.attribute.aDataItemId.location, 1);
      let count = $p.attribute.aDataFieldId.data.length / $p.attribute.aDataFieldId.size;
      $p.ctx.ext.drawArraysInstancedANGLE(primitive, 0, count, $p.dataSize);
    }
}
// CONCATENATED MODULE: ../p4/src/vis/visualize.js











const userActions = ['click', 'hover', 'brush', 'zoom', 'pan'];
const visMarks = ['dot', 'circle', 'line', 'rect'];

function visualize($p) {

    let colorManager = color_color($p);
    let chartPadding = $p.padding || {left: 0, right: 0, top: 0, bottom: 0};
    let viewport = $p.viewport;

    let vis = new layout({
        container: $p.container,
        width: viewport[0] + chartPadding.left + chartPadding.right,
        height: viewport[1] + chartPadding.top + chartPadding.bottom,
        canvas: $p.canvas,
        padding: chartPadding
    });
    
    $p.uniform('uVisualEncodings',  'int',   new Array(EncodingChannels.length).fill(-1))
        .uniform('uScaleExponents', 'float',   new Array(EncodingChannels.length).fill(1.0))
        .uniform('uViewDim',        'vec2',  $p.viewport)
        .uniform('uVisMark',        'int',   1)
        .uniform('uInterleaveX',    'int',   0)
        .uniform('uVisDomains',     'vec2',  $p.fieldDomains.map(d=>d.slice()))
        .uniform('uVisScale',       'vec2',  [1.0, 1.0])
        .uniform('uPosOffset',      'vec2',  [0.0, 0.0])
        .uniform('uFeatureCount',   'int',   0)
        .uniform('uMarkSize',       'float', 16.0)
        .uniform('uMarkSpace',      'vec2',  [0.02, 0.02])
        .uniform('uDefaultAlpha',   'float', 1.0)
        .uniform('uDefaultWidth',   'float', 1.0 / $p.viewport[0])
        .uniform('uDefaultHeight',  'float', 1.0 / $p.viewport[1])
        .uniform('uMaxRGBA',        'vec4',  [0, 0, 0, 0])
        .uniform('uDefaultColor',   'vec3',  [0.8, 0, 0])
        .uniform('uGeoProjection',   'int',  0)
        .uniform('uColorMode',      'int',   1)
        .uniform('uIsXYCategorical','ivec2', [0, 0])
        .varying('vColorRGBA',      'vec4'   );

    let enhance = reveal($p);

    $p.framebuffer('offScreenFBO', 'float', $p.viewport);
    // $p.framebuffer('visStats', 'float', [1, 1]);
    // $p.framebuffer("visStats", "float", [$p.views.length, 1]);
    // $p.framebuffer.enableRead('offScreenFBO');
    $p.bindFramebuffer('offScreenFBO');
    $p.ctx.clearColor( 1.0, 1.0, 1.0, 0.0 );
    $p.ctx.clear( $p.ctx.COLOR_BUFFER_BIT | $p.ctx.DEPTH_BUFFER_BIT );
    $p.bindFramebuffer(null);
    $p.subroutine('visMap', 'float', interpolate_gl.visMap);
    $p.subroutine('getEncodingByFieldId', 'float', interpolate_gl.getEncodingByFieldId);
    
    let renderers = {
        instanced: new Instanced({context: $p, name: 'instanced'}),
        polygon: new Polygon({context: $p, name: 'polygon'}),
        interleave: new Interleaved_gl_Instanced({context: $p, name: 'interleave'})
    }

    return function(options) {
        $p.revealDensity = false;
        let renderer = 'instanced';
        let vmap = options.vmap || {};
        let mark = options.mark || vmap.mark || 'circle';
        let viewIndex = options.viewIndex;

        let visDomain = {};
        let visDimension = vmap.viewport || [$p.views[viewIndex].width, $p.views[viewIndex].height] || viewport;
        let width = visDimension[0];
        let height =  visDimension[1];
        let padding = vmap.padding || $p.views[viewIndex].padding || chartPadding;
        let offset = vmap.offset || $p.views[viewIndex].offset || [0, 0];
        let dimSetting = encode($p, vmap, colorManager);

        let pv = $p.views[viewIndex];
        let colorInfo = pv.color || vmap.color;
    
        let colorMode = 1;
        let colorMap;
        
        let viewSetting = {
            domain: visDomain,
            fields: $p.fields,
            vmap: vmap,
            // onclick: interaction,
            strLists: $p.strLists,
            padding: padding,
            left: offset[0],
            top:  offset[1],
            colors: colorManager.getColors(),
        };

        viewSetting = Object.assign(viewSetting, dimSetting);
        viewSetting = Object.assign(viewSetting, $p.views[viewIndex]);

        if(!$p._update){
            $p.fields.forEach(function(f, i){
                visDomain[f] = $p.fieldDomains[i].slice();
            });
            if(vmap.zero) {
                if($p.fields.indexOf(vmap.width) > -1) {
                    visDomain[vmap.width][0] = 0;
                }
                if($p.fields.indexOf(vmap.height) > -1) {
                    visDomain[vmap.height][0] = 0;
                }
                if($p.fields.indexOf(vmap.y) > -1) {
                    visDomain[vmap.y][0] = 0;
                }
            } 

            // pv.domains = Object.keys(visDomain).map(f=>visDomain[f]);
            pv.domains = visDomain;
            // $p.uniform.uVisDomains.data = pv.domains;
            if(vmap.append !== true && pv.hasOwnProperty('chart')) {
                pv.chart.svg.remove();
                pv.chart.removeAxis();
            }
            pv.chart = vis.addChart(viewSetting);
            pv.svg = pv.chart.svg.node();
            if(typeof(colorInfo) === 'object') {
                if(Array.isArray(colorInfo)) {
                    colorMap = colorInfo;
                } else {
                    if(colorInfo.hasOwnProperty('interpolate')) {
                        colorMode = (colorInfo.interpolate) ? 1 : 0;
                    }
                    colorMap = colorInfo.range || colorInfo.values; 
                }
                
            }
            colorManager.updateColors(colorMap, colorMode);

        } else {
            // $p.uniform.uVisDomains.data = pv.domains;
            if(pv.updateDomain === true) {
                pv.chart.updateAxisX(pv.domains[vmap.x]);
                pv.chart.updateAxisY(pv.domains[vmap.y]);
            }
        }
        $p.uniform.uVisDomains.data = Object.keys(pv.domains).map(f=>pv.domains[f]);
        $p.uniform.uVisMark.data = visMarks.indexOf(mark);
        $p.uniform.uGeoProjection.data = (vmap.projection) ? 1 : 0;
        //Check if need interleaving data attributes(e.g.,parallel coordinates)
        if(Array.isArray(vmap.x) || Array.isArray(vmap.y)) {
            renderer = 'interleave';
            if(Array.isArray(vmap.x)){
                // vmap.x = vmap.x.reverse();
                $p.uniform.uInterleaveX = 0;
            } else if(Array.isArray(vmap.y)) {
                $p.uniform.uInterleaveX = 1;
            }
            renderers[renderer].updateInstancedAttribute(vmap.x);
            renderers[renderer].updateInstancedAttribute(vmap.y);
        } else if(vmap.mark && ['rect', 'bar'].indexOf(vmap.mark) !== -1) {
            renderer = 'polygon';
        }

        let gl = renderers[renderer].load();
        $p.framebuffer.enableRead('fFilterResults');
        $p.framebuffer.enableRead('fDerivedValues');
        $p.framebuffer.enableRead(vmap.in || 'fGroupResults');

        if($p.revealDensity) {
            $p.bindFramebuffer('offScreenFBO');
            gl.clearColor( 1.0, 1.0, 1.0, 0.0 );
            gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
            gl.blendFunc(gl.ONE, gl.ONE );
        } else {
            $p.bindFramebuffer(null);
            // gl.clearColor( 1.0, 1.0, 1.0, 0.0 );
            gl.blendFunc( gl.ONE, gl.ONE_MINUS_SRC_ALPHA );
            // gl.blendFunc(gl.SRC_COLOR, gl.ONE_MINUS_SRC_ALPHA);
        }
        gl.viewport(
            offset[0] + padding.left,
            viewport[1] - height + padding.bottom - offset[1],
            width - padding.left - padding.right,
            height - padding.top - padding.bottom
        );
        gl.disable(gl.CULL_FACE);
        gl.disable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);

        let primitive = gl.POINTS;

        if(mark == 'line') {
            primitive = gl.LINE_STRIP;
            gl.lineWidth(vmap.size || 1.0);
        }

        extend($p, vmap, viewIndex, visDomain);

        if(!$p.skipRender) {
            renderers[renderer].render(primitive);
        } else {
            pv.chart.removeAxis();
            if($p.fields.indexOf(vmap.color)!==-1) pv.chart.removeLegend();
        }
        $p.skipRender = false;
        if($p.revealDensity) enhance({
            viewIndex: viewIndex,
            dim: [width, height],
            offset: offset,
            padding: padding
        });
        $p.bindFramebuffer(null);

        if(!$p._update) {
            let actions = Object.keys(vmap)
                .filter(function(act){ return userActions.indexOf(act) !== -1});

            actions.forEach(function(action) {
                let response = {};
                let viewId = vmap.id || $p.views[viewIndex].id;
                response[viewId] = vmap[action];
                let interactOptions = Object.assign({
                    event: action,
                    from: viewId,
                    response: response,
                }, vmap[action])
                $p.interactions.push(interactOptions)
            })
        }
    }
}

// CONCATENATED MODULE: ../p4/src/kernels.js







/* harmony default export */ var src_kernels = ({
    aggregate: aggregate_aggregate,
    cache: cache_cache,
    derive: derive_derive,
    extent: extent,
    match: match_match,
    visualize: visualize
});
// CONCATENATED MODULE: ../p4/src/compile.js








function compile($p, fields, spec) {

    // if(spec.hasOwnProperty('perceptual'))
    //     operations.perceptual = kernels.perceptual($p);
    //
    // if(spec.hasOwnProperty('derive'))
    //     operations.derive = kernels.derive($p, spec.derive);

    return {
        aggregate : aggregate_aggregate($p),
        cache     : cache_cache($p),
        match     : match_match($p, fields),
        extent    : extent($p),
        visualize : visualize($p)
    }
}

// CONCATENATED MODULE: ../p4/src/operate.js




/* harmony default export */ var operate = (function($p) {
    let operations = {};
    let kernels = compile($p);
    let bin = function (spec, binIndex) {
        let binAttr;
        let binCount;
    
        if (typeof spec == 'object') {
            binAttr = Object.keys(spec)[0];
            binCount = spec[binAttr];
        } else {
            binAttr = spec;
            // Apply Sturges' formula for determining the number of bins
            binCount = Math.ceil(Math.log2($p.dataSize)) + 1;
        }
        let binAttrId = $p.fields.indexOf(binAttr);
        let binDomain = $p.fieldDomains[$p.fields.indexOf(binAttr)];
        let binInterval = (binDomain[1] - binDomain[0]) / binCount;
        // debugger
        $p.uniform.uBinCount.data[binIndex] = binCount;
        $p.uniform.uBinIntervals.data[binIndex] = binInterval;
        $p.fieldWidths[binAttrId] = binCount;    
        $p.intervals[binAttr] = {};
        $p.intervals[binAttr].dtype = 'histogram';
        $p.intervals[binAttr].interval = binInterval;
        $p.intervals[binAttr].min = binDomain[0];
        $p.intervals[binAttr].max = binDomain[1];
        $p.histograms.push(binAttr);
        return binAttr;
    }
    
    operations.aggregate = function (spec) {
        if(spec.$bin) { 
            let binSpecs = Array.isArray(spec.$bin) ? spec.$bin : [spec.$bin];
            let binAttrs = binSpecs.map((spec, ii) => {
                return bin(spec, ii);
            })
            if(spec.$group) {
                spec.$group = binAttrs.filter(a => spec.$group.indexOf(a) === -1).concat(spec.$group);
            } else {
                spec.$group = binAttrs;
            }
        }
        if(Object.keys($p.crossfilters).length) {
            $p.uniform.uFilterFlag = 1;
        }
        if (!kernels.hasOwnProperty('aggregate')) {
            kernels.aggregate = src_kernels.aggregate($p, spec);
        }
        kernels.aggregate.execute(spec);
        if (typeof(spec.out) === 'string') {
            $p.setOutput(spec.out)
        }
        return kernels.aggregate.result;
    }

    operations.match = function(spec) {
        if (!kernels.hasOwnProperty('match')) {
            kernels.match = src_kernels.match($p);
        }
        kernels.match.execute(spec);
        return kernels.match.result;
    }

    operations.cache = function(tag) {
        if (!kernels.hasOwnProperty('cache')) {
            kernels.cache = src_kernels.cache($p);
        }
        kernels.cache.execute(tag);
        return kernels.cache.result;
    }

    operations.derive = function(spec) {
        // if (!kernels.hasOwnProperty('derive')) {
        if(!$p._update) {
            kernels.derive = src_kernels.derive($p, spec);
        }
        // }
        kernels.derive.execute(spec);
        return kernels.derive.result;
    }

    operations.visualize = function(vmap) {
        // if(Object.keys($p.crossfilters).length > 0)
        //     operations.match({});
        let vmaps;
        if(vmap.facets) {
            let facet = vmap.facets;
            let spec = facet.rows || facet.columns;
            if(facet.sortBy !== undefined) {
                let sortOpt = Object.keys(facet.sortBy)[0];
                let sortAttr = facet.sortBy[sortOpt];
                let result = $p.exportResult('row');
                let sorted = spec[sortAttr].map((fields) => {
                    let values = result.map(r => r[fields])
                    let min = Math.min(...values);
                    let max = Math.max(...values);
                    let normalizedValues = values.map( val => (val - min) / (max - min) )
                    if (sortOpt === 'var') sortOpt = 'variance';
                    let opt = typeof(arrays[sortOpt]) === 'function' ? sortOpt : 'avg'
                    return {
                        name: fields,
                        value: arrays[opt](normalizedValues)
                    }
                })
                .sort((a, b) => b.value - a.value )

                console.log(sorted)
                spec[sortAttr] = sorted.map(r => r.name);;
            }
            let encodings = Object.keys(vmap).filter(k => k !== 'facets')
            let variables = Object.keys(spec)
            let minLoopCount = Math.min(...variables.map(v => spec[v].length))

            vmaps = new Array(minLoopCount)
            for(let i = 0; i < minLoopCount; i++) {
                let rule = {}
                encodings.forEach(code => {
                    let vi = variables.indexOf(vmap[code])
                    if(vi < 0) {
                    rule[code] = vmap[code]     
                    } else {
                    rule[code] = spec[variables[vi]][i]
                    }
                })
                vmaps[i] = rule;
                if(facet.brush && i === 0) {
                    vmaps[i].brush = facet.brush;
                    vmaps[i].brush.facet = 'rows'
                }
            }
        } else {
            vmaps = Array.isArray(vmap) ? vmap : [vmap];
        }

        if($p.grid.views.length < vmaps.length) {
            $p.grid.reset();  
            $p.views = $p.grid.generateViews({
                count: vmaps.length, 
                width: $p.viewport[0],
                height: $p.viewport[1],
                padding: $p.padding,
                gridlines: vmap.gridlines
            })
        }
        vmaps.forEach( (vmap, vi) => {
            if (!kernels.hasOwnProperty('visualize')) {
                kernels.visualize = src_kernels.visualize($p);
            }
            if (vmap.in) {
                $p.setInput(vmap.in);
            }
            let viewIndex = vi;
            if(typeof vmap.id == 'string') {
                viewIndex = $p.views.map(d=>d.id).indexOf(vmap.id);
                if(viewIndex == -1) {
                    //find the next available view slot in all views
                    for(let vi = 0; vi < $p.views.length; vi++){
                        if(!$p.views[vi].id) {
                            viewIndex = vi;
                            $p.views[viewIndex].id = vmap.id;
                            break;
                        }
                    }
                }
            }

            if(vmap.mark == 'bar') vmap.zero = true;
            $p.views[viewIndex].vmap = vmap;
            let encoding = vmap,
                viewTag = $p.views[viewIndex].id;
    
            if($p._update && $p.responses.hasOwnProperty(viewTag)) {
                if($p.responses[viewTag].hasOwnProperty($p._responseType)) {
                    encoding = Object.assign({}, vmap, $p.responses[viewTag][$p._responseType]);
                }
            }
            if(encoding.opacity != 0){
                kernels.visualize({
                    vmap: encoding,
                    viewIndex: viewIndex
                });
                $p.respond();
            }
        })
        // $p.reset();
    }

    return operations;
});
// EXTERNAL MODULE: ./node_modules/d3-scale/src/index.js + 51 modules
var src = __webpack_require__("dJjO");

// EXTERNAL MODULE: ./node_modules/d3-selection/src/index.js + 50 modules
var d3_selection_src = __webpack_require__("sHXk");

// EXTERNAL MODULE: ./node_modules/d3-interpolate/src/index.js + 24 modules
var d3_interpolate_src = __webpack_require__("JyCv");

// EXTERNAL MODULE: ./node_modules/d3-axis/src/index.js + 3 modules
var d3_axis_src = __webpack_require__("Mx2h");

// CONCATENATED MODULE: ../p.plot/src/plot.js





let Data = {
    json: [],
    domains: {},
    vmap: {}
}

let View = {
    container: null,
    svg: null,
    height: 300,
    width: 400,
    axes: true
}

class plot_Plot {
    constructor(data = Data, view = View) {
        this.data = data;
        this.view = view;
        this.container = view.container;
        this.padding = view.padding || {top: 0, bottom: 0, left: 0, right: 0};
        this.height = view.height;
        this.width = view.width;
        this.svg = {};
        this.domains = data.domains || {};

        if(!view.svg || view.svg === null) {
            if(view.container !== null) {
                this.svg = this.createSvg();
            }
            this.height -= this.padding.top + this.padding.bottom;
            this.width -= this.padding.left + this.padding.right;
            this.svg.main = this.svg.append('g')
                .attr("transform", `translate(${this.padding.left}, ${this.padding.top})`);
    
        } else {
            this.svg.main = Object(d3_selection_src["a" /* select */])(view.svg);
        }
        
        if(this.data.json) {
            this.scales = this.getScales();
        }
    }

    createSvg() {
        let svg = Object(d3_selection_src["a" /* select */])(this.container)
            .append('svg')
                .attr('width', this.width)
                .attr('height', this.height);
        return svg;
    }

    channels() {
        return {
            x: [0, this.width],
            y: [this.height, 0],
            color: ['steelblue', 'red'],
            opacity: [0, 1],
            size: [2, 20],
            width: [0, this.width],
            height: [0, this.height]
        }
    }

    getScales() {
        let scales = {};
        let channels = this.channels();
        let vmap = this.data.vmap;

        let fields = this.data.fields || null;
        if(fields === null && this.data.json) {
            this.data.fields = Object.keys(this.data.json[0]);
            fields = Object.keys(this.data.json[0]);
        }
        
        for (let channel of Object.keys(channels)) {
            if(channel in vmap && fields.indexOf(vmap[channel]) !== -1) {
                let domain; 
                if(!this.domains.hasOwnProperty(vmap[channel])) {
                    let value = this.data.json.map(d=>d[vmap[channel]]);
                    let min = Math.min(...value) || 0;
                    let max = Math.max(...value) || 0;
                   
                    if(max === min) {
                        max += 1e-6;
                    }
                    domain = [min, max];
                    this.domains[vmap[channel]] = domain;
                } else {
                    domain = this.domains[vmap[channel]] || [0, 1];
                }
                let range = channels[channel];
                if( (this.data.schema && this.data.schema[vmap[channel] === 'string'])) {
                    scales[channel] = Object(src["c" /* scaleOrdinal */])().domain(domain).rangeRoundBands([0, this.width], .05);
                } else {
                    scales[channel] = Object(src["b" /* scaleLinear */])().domain(domain).range(range);
                }
                if(channel == 'color') {
                    scales[channel].interpolate(d3_interpolate_src["c" /* interpolateHcl */])
                }
            } else {
                scales[channel] = () => vmap[channel]
            }
        }

        return scales;
    }

    axes() {
        if(!this.view.hideAxes) {
            this.xAxis = this.svg.main.append('g')
            .attr("transform", `translate(0, ${this.height})`)
            .call(Object(d3_axis_src["a" /* axisBottom */])(this.scales.x).tickSizeOuter(0))
            
            this.yAxis = this.svg.main.append('g')
                .call(Object(d3_axis_src["b" /* axisLeft */])(this.scales.y).ticks(this.height/20))

            if(this.view.gridlines && this.view.gridlines.y) {
                this.yGridlines = this.yAxis.append('g')
                .style('opacity', 0.3)
                .call(Object(d3_axis_src["b" /* axisLeft */])(this.scales.y).ticks(this.height/30).tickSize(-this.width))
                .selectAll('text').remove()
            }
            
        }
    }

    render() {
        this.axes();
    }
}
// EXTERNAL MODULE: ./node_modules/d3-shape/src/index.js + 51 modules
var d3_shape_src = __webpack_require__("1gFY");

// CONCATENATED MODULE: ../p.plot/src/area.js



class area_AreaChart extends plot_Plot {
   
    constructor(data, view) {
        super(data, view);
        this.render();
    }

    render() {
        let vmap = this.data.vmap;
        super.axes();
        let shape = Object(d3_shape_src["b" /* area */])()
            .curve(d3_shape_src["c" /* curveBasis */])
            .x(d => this.scales.x(d[vmap.x]))
            .y0(this.height)
            .y1(d => this.scales.y(d[vmap.y]));

        this.svg.main.append("path")
            .datum(this.data.json)
            .attr("d", shape)
            .style("fill", vmap.color)
            .style("fill-opacity", vmap.opacity)
            .style("stroke-width", 0)
    }
}
// EXTERNAL MODULE: ./node_modules/d3-scale-chromatic/src/index.js + 42 modules
var d3_scale_chromatic_src = __webpack_require__("u6Xv");

// CONCATENATED MODULE: ../p.plot/src/spline.js





class spline_Spline extends plot_Plot {
    constructor(data, view) {
        super(data, view);
        this.render();
    }

    render() {
        let vmap = this.data.vmap;
        super.axes();
        let path = Object(d3_shape_src["e" /* line */])()
            .curve(d3_shape_src["c" /* curveBasis */])
            .x( d => this.scales.x(d[vmap.x]) )
            .y( d => this.scales.y(d[vmap.y]) );
    

        let datum = this.data.json;
        let color = () => vmap.color;
       
        let series =  vmap.by || vmap.color;
        if(this.data.fields.indexOf(series) !== -1) {
            let result = {}
            this.data.json.forEach(function(d){
                if(result.hasOwnProperty(d[series])) {
                    result[d[series]].push(d)
                } else {
                    result[d[series]] = [];
                }
            })
            datum = result;
            if(this.data.fields.indexOf(vmap.color) !== -1) {
                color = Object(src["c" /* scaleOrdinal */])(d3_scale_chromatic_src["schemeCategory10"]);
            }
        }

        if(Array.isArray(datum)) {
            this.svg.main.append("path")
            .datum(datum)
            .attr("d", path)
            .style("fill", 'none')
            .style("stroke", vmap.color)
            .style("stroke-width", vmap.size)
        } else if(typeof(datum) == 'object') {
            let series = Object.keys(datum);
            series .forEach((sample, di) => {
                this.svg.main.append("path")
                .datum(datum[sample])
                .attr("d", path)
                .style("fill", 'none')
                .style("stroke", color(sample))
                .style("stroke-width", vmap.size)
            
                if (this.data.fields.indexOf(vmap.color) !== -1) {
                    let legendWidth = Math.min(15, this.padding.right/2);
                    let legendPosY = (di + 1) * Math.min(30, this.width / series.length);
                    this.svg.main.append('rect')
                        .attr('x', this.width + 10)
                        .attr('y', legendPosY)
                        .attr('width', legendWidth)
                        .attr('height', 6)
                        .style('fill', color(sample))
                    
                    this.svg.main.append('text')
                        .attr('x', this.width + 15 + legendWidth)
                        .attr('y', legendPosY + 6)
                        .text(sample)
    
                    if(di == 0){
                        this.svg.main.append('text')
                            .attr('x', this.width + 10 + legendWidth/2)
                            .attr('y', 6)
                            .text(vmap.color)
                    }
                }
            })


        }

    }
}
// CONCATENATED MODULE: ../p.plot/src/circle.js


class ScatterPlot extends plot_Plot {
   
    constructor(data, view) {
        super(data, view);
        this.render();
    }

    render() {
        let vmap = this.data.vmap;

        super.axes();

        this.svg.main.selectAll('.plot-circles')
            .data(this.data.json)
            .enter()
            .append('circle')
                .attr('class', 'plot-circles')
                .attr('cx', d => this.scales.x(d[vmap.x]))
                .attr('cy', d => this.scales.y(d[vmap.y]))
                .attr('r', d => this.scales.size(d[vmap.size]))
                .style("fill", d => this.scales.color(d[vmap.color]))
                .style("fill-opacity", 1)
                .style("stroke-width", 0)
    }
}
// CONCATENATED MODULE: ../p.plot/src/bar.js


class bar_BarChart extends plot_Plot {
   
    constructor(data, view) {
        super(data, view);
        this.render();
    }

    render() {
        let vmap = this.data.vmap;
        
        let domainX = new Array(this.domains[vmap.x][1] - this.domains[vmap.x][0] + 1).fill(1).map((d, i) => i + this.domains[vmap.x][0])
        this.scales.x = Object(src["a" /* scaleBand */])().domain(domainX).range([0, this.width]).padding(0.05);
        super.axes();
        this.svg.main.selectAll(".plot-bars")
            .data(this.data.json)
          .enter().append("rect")
            .attr('class', 'plot-bars')
            .attr('x', d => this.scales.x(d[vmap.x || vmap.width]))
            .attr('y', d => this.scales.y(d[vmap.y || vmap.height]))
            .style("fill", d => this.scales.color(d[vmap.color]))
            .attr("width", this.scales.x.bandwidth())
            .attr("height", d => this.height - this.scales.y(d[vmap.y || vmap.height]));
    }

    update (newData, newColor) {
        // debugger
        let vmap = this.data.vmap;

        let bars = this.svg.main.selectAll(".plot-top-bars")
            .data(newData, d => d[vmap.x])
        
        bars.exit().remove();

        bars.enter().append("rect")
            .attr('class', 'plot-top-bars');

        bars.attr('x', d => this.scales.x(d[vmap.x || vmap.width]))
            .attr('y', d => this.scales.y(d[vmap.y || vmap.height]))
            .style("fill", newColor)
            .attr("width", this.scales.x.bandwidth())
            .attr("height", d => this.height - this.scales.y(d[vmap.y || vmap.height]));

    }
}
// EXTERNAL MODULE: ./node_modules/d3-geo/src/index.js + 58 modules
var d3_geo_src = __webpack_require__("qC7P");

// EXTERNAL MODULE: ./node_modules/topojson-client/index.js + 12 modules
var topojson_client = __webpack_require__("bPnB");

// EXTERNAL MODULE: ../p.plot/assets/world-110m.json
var world_110m = __webpack_require__("n/L2");
var world_110m_default = /*#__PURE__*/__webpack_require__.n(world_110m);

// EXTERNAL MODULE: ../p.plot/assets/countries.json
var countries = __webpack_require__("Z0dj");
var countries_default = /*#__PURE__*/__webpack_require__.n(countries);

// CONCATENATED MODULE: ../p.plot/src/map.js








class map_Map extends plot_Plot {
    constructor(data, view) {
        super(data, view);
        
        this.feature = data.feature || 'countries';
        this.circle = data.vmap.points;
        this.scale = data.vmap.scale;
        this.gis = data.gis || world_110m_default.a;

        this.borders = view.borders || true;
        this.translate = view.translate || [this.width / 2, this.height / 1.5];
        this.scale = view.scale || ((view.projection == 'Albers') ? 1 : 150);
        this.exponent = view.exponent || 1/3;
        this.defaultColor = view.defaultColor || '#eee';
        this.projection = d3_geo_src['geo'+ (view.projection || 'Albers')].call()
            .scale(this.scale)
            .translate(this.translate);

        this.path = d3_geo_src["geoPath"]()
            .projection(this.projection);

        if(data.vmap.color) {
            let valueById = {};
            data.json.forEach( d => {
                let country = countries_default.a.filter(c => c[data.join.type || 'code']== d[data.join.field])[0] || -1;
                if(country && country.id){
                    valueById[country.id] = typeof(d[data.vmap.color]) === 'string' && d[data.vmap.color].includes(',')
                      ? Number(d[data.vmap.color].replace(/,/g, ''))
                      : Number(d[data.vmap.color])
                }
            })
            let values = Object.keys(valueById).map(k => valueById[k]).filter(d=>!Number.isNaN(d));

            let domain = [Math.min(...values), Math.max(...values)]
            if (data.zero) domain[0] = 0
            let colorScale = Object(src["d" /* scalePow */])().exponent(this.exponent).domain(domain).range([0.1, 1]);
            this.setColor = (d) => {
                if(valueById[d.id] !== undefined) {
                    return Object(d3_scale_chromatic_src["interpolateBlues"])(colorScale(valueById[d.id]))
                } else {
                    return this.defaultColor
                }
                
            }
            if(view.color && typeof(view.color.setter) === 'function') {
                this.setColor = (d) => {
                    return this.color.setter(colorScale(valueById[d.id] || 0))
                }
            }
        }
    }

    render() { 
        this.svg.main.selectAll(".geo-paths")
            .data(topojson_client["a" /* feature */](this.gis, this.gis.objects[this.feature]).features)
            .enter()
            .append('path')
                .attr('class', 'geo-paths')
                .attr("d", this.path)
                .attr("stroke", "white")
                .attr("fill", this.setColor);
            
        if(this.borders) {
            this.svg.main.append("path")
            .attr('class', 'geo-borders')
            .datum(topojson_client["b" /* mesh */](this.gis, this.gis.objects[this.feature], function(a, b) { return a !== b; }))
            .attr("d", this.path)
            .attr("fill", "none")
            .attr("stroke", "white");
        }

        return this;
    }

    addLayer({type = 'point', radius = 1.0, data, feature}) {
        if(type == 'point') {
            this.path.pointRadius(radius);
            this.svg.main.append("path")
                .datum(topojson_client["a" /* feature */](data, data.objects[feature]))
                .attr("d", this.path);
        }
    }

    addMarker ({
        coordinate,
        color = 'orange',
        icon = 'fa fa-map-marker',
        title
    }) {
        let location = this.projection(coordinate);
        this.svg.main.append('svg:foreignObject')
        .attr("x", location[0] - 1)
        .attr("y", location[1] - 15)
        .attr('color', color)
        .attr('text-anchor', 'end')
        .append("xhtml:body")
        .html('<i title="'+ title + '" class="' + icon + '"></i>');
    }
}
// CONCATENATED MODULE: ../p.plot/index.js







/* harmony default export */ var p_plot = ({
    Plot: plot_Plot,
    ScatterPlot: ScatterPlot,
    BarChart: bar_BarChart,
    AreaChart: area_AreaChart,
    Spline: spline_Spline,
    GeoMap: map_Map
});


// CONCATENATED MODULE: ../p4/src/animate.js
function getValue ({fieldId = 'int', addrX = 'float', addrY = 'float'}){
    var value;
    var d = new Vec2();
    if(fieldId > -1) {
        value = this.getData(fieldId, addrX, addrY);
        d = this.uVisDomains[fieldId];
        value = (value - d.x) / (d.y - d.x);
    } else {
        value = 1.0;
    }
    return value;
};

function getVisProps({x = 'float', y = 'float'}) {
    var posX, posY, size; 
    posX = this.getValue(this.uAnimationEncodings[0], x, y);
    posY = this.getValue(this.uAnimationEncodings[1], x, y);
    size = this.getValue(this.uAnimationEncodings[6], x, y);

    var result = new Vec3();
    result = vec3(posX, posY, size);
    return result;
}

function interpolateVec3({
    v0 = 'vec3',
    v1 = 'vec3',
    dv = 'float'
}) {
    var x, y, z;

    x = v0.x + dv * (v1.x - v0.x);
    y = v0.y + dv * (v1.y - v0.y);
    z = v0.z + dv * (v1.z - v0.z);

    return vec3(x, y, z);
}

function interpolateVec4($vec4_v0, $vec4_v1, $float_dv) {
    var x, y, z, w;

    x = v0.x + dv * (v1.x - v0.x);
    y = v0.y + dv * (v1.y - v0.y);
    z = v0.z + dv * (v1.z - v0.z);
    z = v0.w + dv * (v1.w - v0.w);

    return vec3(x, y, z, w);
}

function getVisColor($float_x, $float_y) {
    var color, opacity;
    var rgb = new Vec3();
    color = this.getValue(this.uAnimationEncodings[2], x, y);
    opacity = this.getValue(this.uAnimationEncodings[3], x, y);
    rgb = this.mapColorRGB(this.uAnimationEncodings[2], color);
    return vec4(rgb, opacity);
}

let vShader  = function() {
    var i0, i1, j, posX, posY;
    var rgb = new Vec3();
    var props = new Vec3();
    var props0 = new Vec3();
    var props1 = new Vec3();

    i0 = (this.aDataIdx+0.5) / this.uDataDim.x;
    i1 = (this.aDataIdx+1.5) / this.uDataDim.x;
    j = (this.aDataIdy+0.5) / this.uDataDim.y;

    if(this.uFilterFlag == 1) {
        this.vResult = texture2D(this.fFilterResults, vec2(i0, j)).a;
    } else {
        this.vResult = this.uVisLevel;
    }
    
    this.vColorRGBA = this.getVisColor(i0, j);
    props0 = this.getVisProps(i0, j);
    props1 = this.getVisProps(i1, j);
    props = this.interpolateVec3(props0, props1, this.uAnimationInterval);
    // props = this.getVisProps(i0, j);
    posX = props[0] * 2.0 - 1.0;
    posY = props[1] * 2.0 - 1.0;
    gl_PointSize = props[2] * this.uMarkSize;
    gl_Position = vec4(posX, posY , 0.0, 1.0);
};

let fShader = function() {
    var valid = new Bool();
    valid = this.vResult <= this.uVisLevel + 0.01 && this.vResult >= this.uVisLevel - 0.01;
    if(this.uVisMark == 1) {
        var dist = length(gl_PointCoord.xy - vec2(0.5, 0.5));
        if (dist > 0.5) discard;
        var delta = 0.15;
        var alpha = this.vColorRGBA.a - smoothstep(0.5-delta, 0.5, dist);
        if(valid) {
            gl_FragColor = vec4(this.vColorRGBA.rgb*alpha, alpha);
        } else {
            discard;
        }
    } else {
        if(valid) {
            gl_FragColor = vec4(this.vColorRGBA.rgb * this.vColorRGBA.a,  this.vColorRGBA.a);
        } else {
            discard;
        }
    }
}

/* harmony default export */ var animate = (function($p) {
    $p.uniform('uAnimationInterval', 'float', 0.0);
    $p.uniform('uAnimationEncodings', 'int', $p.uniform.uVisualEncodings.data);

    $p.subroutine('getValue', 'float', getValue);
    $p.subroutine('getVisProps', 'vec3', getVisProps);
    $p.subroutine('getVisColor', 'vec4', getVisColor);
    $p.subroutine('interpolateVec3', 'vec3', interpolateVec3);
    $p.program("animate",
        $p.shader.vertex(vShader),
        $p.shader.fragment(fShader)
    );

    let animation = {
        elapsed : 0,
        interval : 500,
        then : 0,
        step : 0,
        stop: false,
    }

    $p.animation = animation;

    let animate = function(now) {
        if (animation.elapsed > animation.interval) {
            animation.elapsed = 0;
            animation.step += 1;
            console.log(animation.step);
        } else {
            animation.elapsed += now - animation.then; 
        }
        animation.then = now;
        $p.uniform.uAnimationInterval = animation.elapsed / animation.interval;
        if(animation.step <= $p.dataDimension[0] - 1) {
            $p.ctx.ext.drawArraysInstancedANGLE($p.ctx.POINTS, animation.step, 1, $p.dataDimension[1]);
            if(!animation.stop) requestAnimationFrame(animate);

        } else {
            console.log('animation completed with total steps of ' + animation.step)
        }
    }

    animation.start =  function() {
        requestAnimationFrame(animate);
    }

    return function() {
        let gl = $p.program('animate');
        $p.uniform.uAnimationEncodings = $p.uniform.uVisualEncodings.data;
        gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataIdx.location, 0);
        gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataValx.location, 0);
        gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataIdy.location, 1);
        gl.ext.vertexAttribDivisorANGLE($p.attribute.aDataValy.location, 1);
        animation.start();

        return animation;
    }
});

// CONCATENATED MODULE: ../p4/src/extensions.js



/* harmony default export */ var extensions = ([
    {
        name: 'spline',
        exportData: true,
        skipDefault: true,
        getContext: false,
        restartOnUpdate: false,
        compute: true,
        condition: vmap => vmap.mark === 'spline', 
        type: 'class',
        function: p_plot.Spline
    },
    {
        name: 'area',
        exportData: true,
        skipDefault: true,
        getContext: false,
        restartOnUpdate: false,
        condition: vmap => vmap.mark === 'area', 
        type: 'class',
        function: p_plot.AreaChart
    },
    {
        name: 'column',
        exportData: true,
        skipDefault: true,
        getContext: false,
        restartOnUpdate: false,
        condition: vmap => vmap.mark === 'column', 
        type: 'class',
        function: p_plot.BarChart
    },
    // {
    //     name: 'animate',
    //     // exportData: true,
    //     skipDefault: true,
    //     getContext: true,
    //     restartOnUpdate: false,
    //     condition: vmap => vmap.mark === 'circle' && vmap.animate === true, 
    //     function: animation
    // }
]);
// CONCATENATED MODULE: ../p4/src/grid.js
class Grid {
    constructor(views) {
        this.views = views
    }

    add (view) {
        this.view.push(view)
    }

    reset () {
        this.views.forEach(function(v){
            if(v.hasOwnProperty('chart')) {
                v.chart.svg.remove()
                v.chart.removeAxis()
                v.chart.removeLegend()
                delete v.chart
            }
        })
    }

    generateViews ({
        layout = 'rows',
        count = 1,
        width = 640,
        height = 480,
        padding = {left: 0, right: 0, top: 0, bottom: 0},
        gridlines = {x: false, y: false}
    }) {
        let views = new Array(count)
        let calcOffset
        // height -= padding.top + padding.bottom;
        // width -= padding.left + padding.right;
        if (layout == 'rows') {
            height = height / count
            calcOffset = (index) => [0, index * height]
        } else {
            width = width / count
            calcOffset = (index) => [index * width, 0]
        }
        for (let i = 0; i < count; i++) {
            let offset = calcOffset(i)
            views[i] = {width, height, padding, offset, gridlines}
        }
        this.views = views;
        return views;
    }
}
// CONCATENATED MODULE: ../p4/src/main.js
/* harmony export (immutable) */ __webpack_exports__["a"] = p4;














function p4(options) {
    let $p;
    $p = init(options);
    $p.views = [];
    $p.interactions = [];
    $p.histograms = [];
    $p.extensions = extensions;
    $p.responses = {};
    $p.crossfilters = {};
    $p.primitives = [];
    $p.dataSize = 0;
    $p.rowSize = options.dimX || 4096;
    $p.deriveMax = options.deriveMax || 4;
    $p.deriveCount = 0;
    
    $p._responseType = 'unselected';
    $p._update = false;
    $p._progress = false;
    $p.skipRender= false;

    $p.getResult = function() {};
    let api = pipeline($p);
    api.ctx = $p;
    api.addModule(control);
    // api.addModule(output);
    // api.addModule(view);
    let outputs = output($p)
    api.result = outputs.result;
    api.addOperation('head', function() {
        api.resume('__init__');
        if(Object.keys($p.crossfilters).length > 0) api.match({});
        $p.getResult = $p.getRawData;
        return api;
    });

    $p.grid = {views: []};
    api.view = function(views) {
        if($p.grid.views.length !== 0) {
            $p.grid.reset();
        } 
        $p.grid = new Grid(views);
        $p.views = $p.grid.views;
        return api;
    }

    api.getViews = function () {
        return $p.views;
    }
    
    $p.reset = api.head;
    $p.exportResult = api.result;

    $p.setInput = function(inputName) {
        api.resume(inputName);
        return api;
    }

    $p.setOutput = function(outputName) {
        api.register(outputName);
        // console.log(api.result({outputTag: outputName, format: 'row'}))
        return api;
    }

    function configPipeline($p) {
        $p.extent = src_kernels.extent($p);
        // $p.operations = compile($p);
        let operations = operate($p);
        api.getOperations = () => Object.keys(operations);
        for(let optName of Object.keys(operations)) {
            api.addOperation(optName, operations[optName], true);
        }
        
        for(let ext of $p.extensions) {
            if(ext.getContext === true) {
                ext.function = ext.function($p);
            }
        }
        api.register('__init__');
    }
    
    api.data = function(dataOptions) {
        allocate($p, dataOptions);
        configPipeline($p);
        $p.getResult = dataOptions.export;
        $p.getRawData = dataOptions.export;
        return api;
    }

    api.index = function(indexes) {
        data.indexes = indexes;
        return api;
    }

    api.input = function(arg) {
        let asyncPipeline = {};
        let inputReady = false;
        for(let program of Object.keys(api).concat(Object.keys(src_kernels))) {
            asyncPipeline[program] = function(spec) {
                api.addToQueue(program, spec);
                return asyncPipeline;
            }
        }

        asyncPipeline.execute = function() {
            return input(arg).then(function(data){
                if(Array.isArray(arg.indexes)) {
                    data.indexes = arg.indexes;
                }   
                api.data(data);
                api.async(true);
                api.run();
                api.async(false);
                inputReady = true;
                return new Promise(function(resolve, reject){
                    resolve(api.result('row'))
                    return api;
                })
            })
        }

        asyncPipeline.commit = asyncPipeline.execute;

        if(arg.dimX) $p.rowSize = arg.dimX;
        return asyncPipeline;
    }

    api.getResult = function (d) {
        return $p.getResult(d);
    }

    api.clearWebGLBuffers = function() {
        $p.bindFramebuffer("offScreenFBO");
        $p.ctx.clearColor( 0.0, 0.0, 0.0, 0.0 );
        $p.ctx.clear( $p.ctx.COLOR_BUFFER_BIT | $p.ctx.DEPTH_BUFFER_BIT );
        $p.bindFramebuffer("visStats");
        $p.ctx.clearColor( 0.0, 0.0, 0.0, 0.0 );
        $p.ctx.clear( $p.ctx.COLOR_BUFFER_BIT | $p.ctx.DEPTH_BUFFER_BIT );
        $p.bindFramebuffer(null);
        $p.ctx.clearColor( 0.0, 0.0, 0.0, 0.0 );
        $p.ctx.clear( $p.ctx.COLOR_BUFFER_BIT | $p.ctx.DEPTH_BUFFER_BIT );
    }

    api.runSpec = function(specs) {
        api.head();
        api.clearWebGLBuffers();
        $p.interactions = [];
        $p.responses = {};
        $p.crossfilters = [];
        $p.uniform.uFilterFlag.data = 0;
        api.clearQueue();
        // $p.uniform.uFilterRanges = $p.fieldDomains.concat($p.deriveDomains);
        specs.forEach(function(spec){
            let opt = Object.keys(spec)[0];
            let arg = spec[opt];
            opt = opt.slice(1); // ignore $ sign 
            if(typeof api[opt] == 'function') {
                api[opt](arg);
            }
        })
 
        return api;
    }
  
    api.interact = function(spec) {
        if(typeof(spec) != 'undefined') $p.interactions.push(spec);
        $p.interactions.forEach(function(interaction){
            // console.log(interaction)
            let callback = interaction.callback || function(selection) {
                $p.responses = interaction.response;
                if(!$p._update) {
                    $p._update = true;
                    $p.crossfilters = {};
                    if(typeof selection == 'object') {
                        Object.keys(selection).forEach(function(k) {
                            if(selection[k].length < 2) {
                                if($p.intervals.hasOwnProperty(k)) {
                                    var value = (Array.isArray(selection[k]))
                                        ? selection[k][0]
                                        : selection[k];
                                    selection[k] = [value-$p.intervals[k].interval, value];
                                } 
                                // else if(!$p.strLists.hasOwnProperty(k)) {
                                //     selection[k] = [selection[k][0] + selection[k][0] + 1];
                                // }
                            }
                            $p.crossfilters[k] = selection[k];
                        });
                    }
                    $p._responseType = 'unselected';
                    $p.uniform.uFilterLevel.data = 0.2;
                    $p.uniform.uVisLevel.data = 0.1;
                    api.head().run();
                    $p._responseType = 'selected';
                    $p.uniform.uVisLevel.data = 0.2;
                    api.head().run();
                    $p._responseType = 'unselected';
                    $p._update = false;
                    $p.uniform.uFilterLevel.data = 0.1;
                    $p.uniform.uVisLevel.data = 0.1;
                }
            }
            interact($p, {
                actions: interaction.event,
                view: interaction.from,
                condition: interaction.condition,
                facet: interaction.facet,
                callback: callback  
            })
        })
    }
    $p.respond = api.interact;

    api.updateData = function(newData) {
        let data;
        if(newData._p4_cstore_version) {
            data = newData
        } else {
            let cache = Object(cstore["a" /* default */])({
                schema: $p.dataSchema,
                strValues: $p.strValues
            })
            cache.addRows(newData)
            data = cache.data()
        }

        //update and combine all strValues
        Object.keys(data.strValues).forEach((attr) => {
            $p.strValues[attr] = Object.assign($p.strValues[attr], data.strValues[attr]);
        })

        if(data.size > 0) {
            $p.dataSize = data.size;
        }
        $p.fields
        .slice($p.indexes.length)
        .forEach((attr, ai) => {
            let buf = new Float32Array($p.dataDimension[0] * $p.dataDimension[1]);
            if(data[attr] === undefined) debugger;
            for (let i = 0, l = data[attr].length; i < l; i++) {
                buf[i] = data[attr][i];
            }
            $p.texture.tData.update(
                buf, [0, $p.dataDimension[1] * ai], $p.dataDimension
            );
            $p.fieldDomains[ai] = [
                Math.min(data.stats[attr].min, $p.fieldDomains[ai][0]),
                Math.max(data.stats[attr].max, $p.fieldDomains[ai][1])
            ]
            $p.fieldWidths[ai] = $p.fieldDomains[ai][1] - $p.fieldDomains[ai][0] + 1;
            if(data.strLists.hasOwnProperty(attr)){
                $p.fieldDomains[ai] = [0, data.strLists[attr].length - 1];
                $p.strLists[attr] = data.strLists[attr];
                $p.fieldWidths[ai] = data.strLists[attr].length;
            }
        });

        api.updateRegister('__init__', {
            fieldDomains: $p.fieldDomains,
            fieldWidths: $p.fieldWidths}
        )
        $p.uniform.uFieldDomains.data = $p.fieldDomains;
        $p.uniform.uFieldWidths.data = $p.fieldWidths;
        return api;
    }

    api.updateDataColumn = function(data, attribute) {
        if($p.fields.indexOf(attribute) === -1) {
            throw Error('Invalid attribute', attribute);
        }
        let buf = new Float32Array($p.dataDimension[0] * $p.dataDimension[1]);
        let attrId = $p.fields.indexOf(attribute) - $p.indexes.length;
        for (let i = 0, l = data[attribute].length; i < l; i++) {
            buf[i] = data[attr][i];
        }
        $p.texture.tData.update(
            buf, [0, $p.dataDimension[1] * attrId], $p.dataDimension
        );
    }

    api.updateDataRow = function(data, rowId) {
        let dataType = (Array.isArray(data)) ? 'array' : 'json';
        $p.fields.slice($p.indexes.length).forEach((attr, ai) => {
            let texPosX = rowId % $p.dataDimension[0];
            let value = (dataType == 'array') ? data[ai] : data[attr];
            if(value === undefined) throw Error('Cannot update data due to invalid data value');
            $p.texture.tData.update(
                new Float32Array(data[ai]), [texPosX, $p.dataDimension[1] * i], [1,1]
            );
        });
        return api;
    }

    api.extend = function(arg) {
        let extOptions = Object.assign({
            restartOnUpdate: true,
            skipDefault: false,
            exportData: false,
            getContext: false,
        }, arg)

        if(extOptions.name != undefined && 
            (typeof extOptions.function === 'function' 
            || typeof extOptions.constructor === 'function')
        ) {
            $p.extensions.push(extOptions);
        }
    }

    api.annotate = function ({
        id = 0,
        mark = 'vline',
        color = 'red',
        size = 3,
        position = {values: []}
    }) {
        let view = $p.views[0];
        if (Number.isInteger(id) && id < $p.views.length) {
            view = $p.views[id];
        } else {
            $p.views.filter(v => v.id == id);
            if (view.length > 0) {
                view = view[0];
            }
        }
        if (mark === 'vline') {
            let values = position[view.vmap.x || view.vmap.width] || position.values;
            values.forEach(val => {
                let x = view.chart.x(val);
                view.chart.svg.append('line')
                    .attr('x1', x)
                    .attr('x2', x)
                    .attr('y1', 0)
                    .attr('y2', view.height - view.padding.top - view.padding.bottom)
                    .attr('stroke', color)
                    .attr('stroke-width', size)
            })
        } else if (mark === 'hline') {
            let values = position[view.vmap.y || view.vmap.height] || position.values;
            values.forEach(val => {
                let y = view.chart.y(val);
                view.chart.svg.append('line')
                    .attr('x1', 0)
                    .attr('x2', view.width - view.padding.left - view.padding.height)
                    .attr('y1', y)
                    .attr('y2', y)
                    .attr('stroke', color)
                    .attr('stroke-width', size)
            }) 
        }
    }
    return api;
}


/***/ }),

/***/ "R4fJ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = parse;
function parse(text, delimiter) {
    "use strict";
    var size = text.length,
        accum = 0,
        i, //index for starting of a line
        row,
        rows = [],
        fields = [],
        lens = [],
        EOL = false;

    while(accum < size) {
        i = accum, EOL = false;
        row = loadLine(text, delimiter.charCodeAt(0), i);
        rows.push(row.fields);
        accum += row.size;
    }
    return rows;
}

function loadLine(text, delimiterCode, initPos) {
    // if(typeof(initPos) === 'undefined') initPos = 0;
    var EOL = false,
        QUOTE = false,
        c = initPos, //current pos
        code, //code at c
        f = initPos, // start pos of current field
        q, //start pos of quote
        fields = [],
        L = text.length;

    while(!EOL){
        code = text.charCodeAt(c);
        if(code === 10 || c>=L){
            EOL = true;
            // if(text.charCodeAt(c+1) === 13) ++c;
            fields.push( text.slice(f, c) );
        } else {
            if(code === delimiterCode && !QUOTE) {
                // console.log(f,c, text.slice(f, c));
                var field = text.slice(f, c);
                fields.push( field );
                f = c+1;
            } else if(code === 34){
                if(QUOTE){
                    if(text.charCodeAt(c+1) === delimiterCode){
                        QUOTE = false;
                        fields.push(text.slice(q, c));
                        f = c+2;
                        c++;
                    }
                } else {
                    q = c+1;
                    QUOTE = true;
                }
            }
        }
        c++;
    }
    return { fields: fields, size: c-initPos };
}


/***/ }),

/***/ "S2QL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["reduce"] = reduce;
/* harmony export (immutable) */ __webpack_exports__["avg"] = avg;
/* harmony export (immutable) */ __webpack_exports__["normalize"] = normalize;
/* harmony export (immutable) */ __webpack_exports__["seq"] = seq;
/* harmony export (immutable) */ __webpack_exports__["scan"] = scan;
/* harmony export (immutable) */ __webpack_exports__["iscan"] = iscan;
/* harmony export (immutable) */ __webpack_exports__["diff"] = diff;
/* harmony export (immutable) */ __webpack_exports__["intersect"] = intersect;
/* harmony export (immutable) */ __webpack_exports__["unique"] = unique;
/* harmony export (immutable) */ __webpack_exports__["lcm"] = lcm;
/* harmony export (immutable) */ __webpack_exports__["stats"] = stats;
/* harmony export (immutable) */ __webpack_exports__["histogram"] = histogram;
/* harmony export (immutable) */ __webpack_exports__["variance"] = variance;
/* harmony export (immutable) */ __webpack_exports__["std"] = std;
/* harmony export (immutable) */ __webpack_exports__["vectorAdd"] = vectorAdd;
/* harmony export (immutable) */ __webpack_exports__["vectorSum"] = vectorSum;
/* harmony export (immutable) */ __webpack_exports__["vectorAvg"] = vectorAvg;
function _reduce(array, opt) {
    var i,
        len = array.length,
        fn,
        result;

    if (!len) return 0;

    switch (opt) {
        case "max":
            result = array.reduce(function(a, b) {
                return (a > b) ? a : b;
            });
            break;
        case "min":
            result = array.reduce(function(a, b) {
                return (a < b) ? a : b;
            });
            break;
        case "and":
        case "&":
            result = array.reduce(function(a, b) {
                return a & b;
            });
            break;
        case "or":
        case "|":
            result = array.reduce(function(a, b) {
                return a | b;
            });
            break;
        case "mult":
        case "*":
            result = array.reduce(function(a, b) {
                return a * b;
            });
            break;
        default: // "sum" or "+"
            result = array.reduce(function(a, b) {
                return a + b;
            });
            break;
    }

    return result;
}

function reduce(opt) {
    return function(array) {
        var a = (array instanceof Array) ? array : Array.apply(null, arguments);
        return _reduce(a, opt);
    };
};

function avg(array) {
    return _reduce(array, "+") / array.length;
    // return array.reduce(function(a,b){ return 0.5 * (a + b)});
};

function normalize(array) {
    var max = _reduce(array, "max"),
        min = _reduce(array, "min"),
        range = max - min;

    return array.map(function(a) {
        return (a - min) / range;
    });
}

function seq(start, end, intv) {
    var interval = intv || 1,
        array = [];

    for (var i = start; i <= end; i += interval)
        array.push(i);

    return array;
};

// ["max", "min", "mult", "and", "or"].forEach(function(f) {
//     array[f] = array.reduce(f);
// });

// export sum = array.reduce("+");

function scan(a) {
    var pfsum = [],
        accum = 0;

    for (var i = 0; i < a.length; i++) {
        accum += a[i];
        pfsum.push(accum);
    }

    return pfsum;
};

function iscan(a) {
    return array.scan([0].concat(a));
};

function diff(a, b) {
    var difference = [];
    a.forEach(function(d) {
        if (b.indexOf(d) === -1) {
            difference.push(d);
        }
    });
    return difference;
};

function intersect(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function(e) {
        if (b.indexOf(e) !== -1) return true;
    });
};

function unique(a) {
    return a.reduce(function(b, c) {
        if (b.indexOf(c) < 0) b.push(c);
        return b;
    }, []);
};

function lcm(A) {
    var n = A.length,
        a = Math.abs(A[0]);
    for (var i = 1; i < n; i++) {
        var b = Math.abs(A[i]),
            c = a;
        while (a && b) {
            (a > b) ? a %= b: b %= a;
        }
        a = Math.abs(c * A[i]) / (a + b);
    }
    return a;
};

function stats(array) {
    return {
        max: _reduce(array, "max"),
        min: _reduce(array, "min"),
        avg: array.avg(array)
    };
};

function histogram(array, numBin, _max, _min) {
    var l = array.length,
        min = (typeof(_min) == 'number') ? _min : _reduce(array, "min"),
        max = (typeof(_max) == 'number') ? _max : _reduce(array, "max"),
        range = max - min,
        interval = range / numBin,
        bins = [],
        // ids = [],
        hg = new Array(numBin + 1).fill(0);

    for (var b = 0; b < numBin; b++) {
        bins.push([min + range * (b / (numBin)), min + range * (b + 1) / (numBin)]);
        // ids[b] = [];
    }

    // ids[numBin] = [];

    for (var i = 0; i < l; i++) {
        binID = Math.floor((array[i] - min) / range * (numBin));
        hg[binID]++;
        // ids[binID].push(i);
    };

    hg[numBin - 1] += hg[numBin];
    // ids[numBin-1] = ids[numBin-1].concat(ids.pop());
    return {
        bins: bins,
        counts: hg.slice(0, numBin),
        // ids: ids
    };
}

function variance(rowArray) {
    var m = _reduce(rowArray, "+") / rowArray.length,
        va = rowArray.map(function(a) {
            return Math.pow(a - m, 2)
        });

    return _reduce(va, "+") / (rowArray.length - 1);
}

function std(rowArray) {
    return Math.sqrt(variance(rowArray));
}

function vectorAdd(a, b) {
    var c = [];
    a.forEach(function(v, i) {
        c[i] = v + b[i];
    });

    return c;
}

function vectorSum(vectors) {
    var result = vectors[0],
        numberOfVectors = vectors.length;

    for (var i = 1; i < numberOfVectors; i++) {
        result = array.vectorAdd(result, vectors[i]);
    }

    return result;
}

function _vectorAvg(a, b) {
    var c = [];
    a.forEach(function(v, i) {
        c[i] = (v + b[i]) * 0.5;
    });

    return c;
}

function vectorAvg(vectors) {
    var result = vectors[0],
        numberOfVectors = vectors.length;

    for (var i = 1; i < numberOfVectors; i++) {
        result = _vectorAvg(result, vectors[i]);
    }

    return result;
}


/***/ }),

/***/ "SUQ4":
/***/ (function(module, exports) {

module.exports = "<v-flex fill-height>\n  <v-toolbar dense>\n    <v-flex xs3 class=\"ma-2\">\n      <v-select \n        label=\"TimeMode\"\n        :items=\"timeDomains\"\n        v-model=\"selectedTimeDomain\"\n        v-on:change=\"visualize()\"\n      > </v-select>\n    </v-flex>\n    <!-- <v-flex xs3 class=\"ma-2\">\n      <v-select \n        label=\"Measure\"\n        :items=\"measures\"\n        v-model=\"selectedMeasure\"\n        v-on:change=\"visualize()\"\n      >\n      </v-select>\n    </v-flex> -->\n    <v-flex xs2 class=\"ma-2\">\n      <v-select\n        label=\"Granularity\"\n        :items=\"granularities\"\n        v-model=\"granularity\"\n        v-on:change=\"visualize()\"\n      >\n      </v-select>\n    </v-flex>\n    <v-flex v-if=\"clusters\" xs2 class=\"ma-2\">\n      <v-select\n        label=\"Color by\"\n        :items=\"clusters\"\n        v-model=\"colorEncoding\"\n        v-on:change=\"visualize()\"\n      >\n      </v-select>\n    </v-flex>\n    <v-spacer></v-spacer>\n    <v-btn icon>\n      <v-icon v-on:click=\"reset()\">refresh</v-icon>\n    </v-btn>\n  </v-toolbar>\n  <v-card class=\"fill-height\" id=\"RossVisTimeSeries\"></v-card>\n</v-flex>\n";

/***/ }),

/***/ "XMpN":
/***/ (function(module, exports) {

module.exports = "<v-flex fill-height>\n    <v-toolbar dense>\n      <v-spacer></v-spacer>\n      <v-flex xs2 class=\"ma-2\">\n        <v-select\n          label=\"Granularity\"\n          :items=\"granularities\"\n          v-model=\"granularity\"\n          v-on:change=\"init()\"\n        >\n        </v-select>\n      </v-flex>\n      <v-flex xs3 class=\"ma-2\">\n        <v-select \n          label=\"Dimensional Reduction\"\n          :items=\"dimensionalMethods\"\n          v-model=\"dimensionalSelected\"\n          v-on:change=\"analyze()\"\n        >\n        </v-select>\n      </v-flex>\n      <v-flex xs3 class=\"ma-2\">\n        <v-select \n          label=\"Clustering Method\"\n          :items=\"clusteringMethods\"\n          v-model=\"clusteringSelected\"\n          v-on:change=\"visualize()\"\n        >\n        </v-select>\n      </v-flex>\n\n    </v-toolbar>\n    <v-card class=\"fill-height\">\n      <div ref=\"Vis\"></div>\n    </v-card>\n  </v-flex>\n  ";

/***/ }),

/***/ "XYhO":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Xj71":
/***/ (function(module, exports) {

module.exports = function match(data, spec) {
    var indexes = data[0];

    if(!Array.isArray(indexes)) indexes = [];

    return data.filter(function(a){
        if(_match(a, spec, indexes)) return a;
    });
};

function _match(obj, spec, indexes){
    var match,
        opt,
        index,
        sat = true,
        keys = Object.keys(spec);

    keys.forEach(function(key){
        if(key === "$not") {
            match = !_match(obj, spec[key], indexes);
        } else if(key == "$or" || key == "$and" ) {
            match = (key == "$and");
            spec[key].forEach(function(s){
                match = (key == "$and") ? match & _match(obj, s, indexes) : match | _match(obj, s, indexes);
            });
        } else {
            index = (indexes.length > 0) ? indexes.indexOf(key) : key;

            if(typeof spec[key] === 'object'){
                opt = Object.keys(spec[key])[0];

                if(opt[0] == "$" && spec[key][opt] instanceof Array){
                    if(opt == "$in" || opt == "$nin"){
                        match = ((opt == "$nin") ^ (spec[key][opt].indexOf(obj[index]) > -1));
                    } else if(opt == "$inRange"){
                        match =(obj[key] >= spec[key][opt][0] & obj[index] <= spec[key][opt][1]);
                    } else if(opt == "$ninRange"){
                        match =(obj[key] < spec[key][opt][0] | obj[index] > spec[key][opt][1]);
                    } else if(opt == "$inDate"){
                        match = (spec[key][opt].map(Number).indexOf(+(obj[index])) > -1);
                    }
                } else if(spec[key] instanceof Array) {
                    match =(obj[key] >= spec[key][0] & obj[index] <= spec[key][1]);
                }
            } else {
                if(spec[key][0] === "$") {
                    match = (obj[spec[key].slice(1)] === obj[index]);
                } else {
                    match = (spec[key] == obj[index]);
                }
            }
        }
        sat = sat & match;
    });

    return sat;
}


/***/ }),

/***/ "Z0dj":
/***/ (function(module, exports) {

module.exports = [{"name":"Kosovo","code":"-99","id":"-99"},{"name":"Somaliland","code":"-99","id":"-99"},{"name":"Northern Cyprus","code":"-99","id":"-99"},{"name":"Afghanistan","code":"AFG","id":"4"},{"name":"Angola","code":"AGO","id":"24"},{"name":"Albania","code":"ALB","id":"8"},{"name":"United Arab Emirates","code":"ARE","id":"784"},{"name":"Argentina","code":"ARG","id":"32"},{"name":"Armenia","code":"ARM","id":"51"},{"name":"Antarctica","code":"ATA","id":"10"},{"name":"France","code":"ATF","id":"260"},{"name":"Australia","code":"AUS","id":"36"},{"name":"Austria","code":"AUT","id":"40"},{"name":"Azerbaijan","code":"AZE","id":"31"},{"name":"Burundi","code":"BDI","id":"108"},{"name":"Belgium","code":"BEL","id":"56"},{"name":"Benin","code":"BEN","id":"204"},{"name":"Burkina Faso","code":"BFA","id":"854"},{"name":"Bangladesh","code":"BGD","id":"50"},{"name":"Bulgaria","code":"BGR","id":"100"},{"name":"The Bahamas","code":"BHS","id":"44"},{"name":"Bosnia and Herzegovina","code":"BIH","id":"70"},{"name":"Belarus","code":"BLR","id":"112"},{"name":"Belize","code":"BLZ","id":"84"},{"name":"Bolivia","code":"BOL","id":"68"},{"name":"Brazil","code":"BRA","id":"76"},{"name":"Brunei","code":"BRN","id":"96"},{"name":"Bhutan","code":"BTN","id":"64"},{"name":"Botswana","code":"BWA","id":"72"},{"name":"Central African Republic","code":"CAF","id":"140"},{"name":"Canada","code":"CAN","id":"124"},{"name":"Switzerland","code":"CHE","id":"756"},{"name":"Chile","code":"CHL","id":"152"},{"name":"China","code":"CHN","id":"156"},{"name":"Ivory Coast","code":"CIV","id":"384"},{"name":"Cameroon","code":"CMR","id":"120"},{"name":"Democratic Republic of the Congo","code":"COD","id":"180"},{"name":"Republic of Congo","code":"COG","id":"178"},{"name":"Colombia","code":"COL","id":"170"},{"name":"Costa Rica","code":"CRI","id":"188"},{"name":"Cuba","code":"CUB","id":"192"},{"name":"Cyprus","code":"CYP","id":"196"},{"name":"Czech Republic","code":"CZE","id":"203"},{"name":"Germany","code":"DEU","id":"276"},{"name":"Djibouti","code":"DJI","id":"262"},{"name":"Denmark","code":"DNK","id":"208"},{"name":"Dominican Republic","code":"DOM","id":"214"},{"name":"Algeria","code":"DZA","id":"12"},{"name":"Ecuador","code":"ECU","id":"218"},{"name":"Egypt","code":"EGY","id":"818"},{"name":"Eritrea","code":"ERI","id":"232"},{"name":"Western Sahara","code":"ESH","id":"732"},{"name":"Spain","code":"ESP","id":"724"},{"name":"Estonia","code":"EST","id":"233"},{"name":"Ethiopia","code":"ETH","id":"231"},{"name":"Finland","code":"FIN","id":"246"},{"name":"Fiji","code":"FJI","id":"242"},{"name":"United Kingdom","code":"FLK","id":"238"},{"name":"France","code":"FRA","id":"250"},{"name":"Gabon","code":"GAB","id":"266"},{"name":"United Kingdom","code":"GBR","id":"826"},{"name":"Georgia","code":"GEO","id":"268"},{"name":"Ghana","code":"GHA","id":"288"},{"name":"Guinea","code":"GIN","id":"324"},{"name":"Gambia","code":"GMB","id":"270"},{"name":"Guinea Bissau","code":"GNB","id":"624"},{"name":"Equatorial Guinea","code":"GNQ","id":"226"},{"name":"Greece","code":"GRC","id":"300"},{"name":"Denmark","code":"GRL","id":"304"},{"name":"Guatemala","code":"GTM","id":"320"},{"name":"Guyana","code":"GUY","id":"328"},{"name":"Honduras","code":"HND","id":"340"},{"name":"Croatia","code":"HRV","id":"191"},{"name":"Haiti","code":"HTI","id":"332"},{"name":"Hungary","code":"HUN","id":"348"},{"name":"Indonesia","code":"IDN","id":"360"},{"name":"India","code":"IND","id":"356"},{"name":"Ireland","code":"IRL","id":"372"},{"name":"Iran","code":"IRN","id":"364"},{"name":"Iraq","code":"IRQ","id":"368"},{"name":"Iceland","code":"ISL","id":"352"},{"name":"Israel","code":"ISR","id":"376"},{"name":"Italy","code":"ITA","id":"380"},{"name":"Jamaica","code":"JAM","id":"388"},{"name":"Jordan","code":"JOR","id":"400"},{"name":"Japan","code":"JPN","id":"392"},{"name":"Kazakhstan","code":"KAZ","id":"398"},{"name":"Kenya","code":"KEN","id":"404"},{"name":"Kyrgyzstan","code":"KGZ","id":"417"},{"name":"Cambodia","code":"KHM","id":"116"},{"name":"South Korea","code":"KOR","id":"410"},{"name":"Kuwait","code":"KWT","id":"414"},{"name":"Laos","code":"LAO","id":"418"},{"name":"Lebanon","code":"LBN","id":"422"},{"name":"Liberia","code":"LBR","id":"430"},{"name":"Libya","code":"LBY","id":"434"},{"name":"Sri Lanka","code":"LKA","id":"144"},{"name":"Lesotho","code":"LSO","id":"426"},{"name":"Lithuania","code":"LTU","id":"440"},{"name":"Luxembourg","code":"LUX","id":"442"},{"name":"Latvia","code":"LVA","id":"428"},{"name":"Morocco","code":"MAR","id":"504"},{"name":"Moldova","code":"MDA","id":"498"},{"name":"Madagascar","code":"MDG","id":"450"},{"name":"Mexico","code":"MEX","id":"484"},{"name":"Macedonia","code":"MKD","id":"807"},{"name":"Mali","code":"MLI","id":"466"},{"name":"Myanmar","code":"MMR","id":"104"},{"name":"Montenegro","code":"MNE","id":"499"},{"name":"Mongolia","code":"MNG","id":"496"},{"name":"Mozambique","code":"MOZ","id":"508"},{"name":"Mauritania","code":"MRT","id":"478"},{"name":"Malawi","code":"MWI","id":"454"},{"name":"Malaysia","code":"MYS","id":"458"},{"name":"Namibia","code":"NAM","id":"516"},{"name":"France","code":"NCL","id":"540"},{"name":"Niger","code":"NER","id":"562"},{"name":"Nigeria","code":"NGA","id":"566"},{"name":"Nicaragua","code":"NIC","id":"558"},{"name":"Netherlands","code":"NLD","id":"528"},{"name":"Norway","code":"NOR","id":"578"},{"name":"Nepal","code":"NPL","id":"524"},{"name":"New Zealand","code":"NZL","id":"554"},{"name":"Oman","code":"OMN","id":"512"},{"name":"Pakistan","code":"PAK","id":"586"},{"name":"Panama","code":"PAN","id":"591"},{"name":"Peru","code":"PER","id":"604"},{"name":"Philippines","code":"PHL","id":"608"},{"name":"Papua New Guinea","code":"PNG","id":"598"},{"name":"Poland","code":"POL","id":"616"},{"name":"United States of America","code":"PRI","id":"630"},{"name":"North Korea","code":"PRK","id":"408"},{"name":"Portugal","code":"PRT","id":"620"},{"name":"Paraguay","code":"PRY","id":"600"},{"name":"Israel","code":"PSE","id":"275"},{"name":"Qatar","code":"QAT","id":"634"},{"name":"Romania","code":"ROU","id":"642"},{"name":"Russia","code":"RUS","id":"643"},{"name":"Rwanda","code":"RWA","id":"646"},{"name":"Saudi Arabia","code":"SAU","id":"682"},{"name":"Sudan","code":"SDN","id":"729"},{"name":"Senegal","code":"SEN","id":"686"},{"name":"Solomon Islands","code":"SLB","id":"90"},{"name":"Sierra Leone","code":"SLE","id":"694"},{"name":"El Salvador","code":"SLV","id":"222"},{"name":"Somalia","code":"SOM","id":"706"},{"name":"Republic of Serbia","code":"SRB","id":"688"},{"name":"South Sudan","code":"SSD","id":"728"},{"name":"Suriname","code":"SUR","id":"740"},{"name":"Slovakia","code":"SVK","id":"703"},{"name":"Slovenia","code":"SVN","id":"705"},{"name":"Sweden","code":"SWE","id":"752"},{"name":"Swaziland","code":"SWZ","id":"748"},{"name":"Syria","code":"SYR","id":"760"},{"name":"Chad","code":"TCD","id":"148"},{"name":"Togo","code":"TGO","id":"768"},{"name":"Thailand","code":"THA","id":"764"},{"name":"Tajikistan","code":"TJK","id":"762"},{"name":"Turkmenistan","code":"TKM","id":"795"},{"name":"East Timor","code":"TLS","id":"626"},{"name":"Trinidad and Tobago","code":"TTO","id":"780"},{"name":"Tunisia","code":"TUN","id":"788"},{"name":"Turkey","code":"TUR","id":"792"},{"name":"Taiwan","code":"TWN","id":"158"},{"name":"United Republic of Tanzania","code":"TZA","id":"834"},{"name":"Uganda","code":"UGA","id":"800"},{"name":"Ukraine","code":"UKR","id":"804"},{"name":"Uruguay","code":"URY","id":"858"},{"name":"United States of America","code":"USA","id":"840"},{"name":"Uzbekistan","code":"UZB","id":"860"},{"name":"Venezuela","code":"VEN","id":"862"},{"name":"Vietnam","code":"VNM","id":"704"},{"name":"Vanuatu","code":"VUT","id":"548"},{"name":"Yemen","code":"YEM","id":"887"},{"name":"South Africa","code":"ZAF","id":"710"},{"name":"Zambia","code":"ZMB","id":"894"},{"name":"Zimbabwe","code":"ZWE","id":"716"}]

/***/ }),

/***/ "ZtXa":
/***/ (function(module, exports) {

module.exports = "<v-dialog v-model=\"dialog\" persistent max-width=\"600px\">\n  <v-btn slot=\"activator\" color=\"primary\" dark>Open Dialog</v-btn>\n  <v-card>\n    <v-card-title>\n      <span class=\"headline\">Server Settings</span>\n    </v-card-title>\n    <v-card-text>\n      <v-container grid-list-md>\n        <v-layout wrap>\n          <v-alert :value=\"socketError\" color=\"error\">\n            Cannot connect to server!\n          </v-alert>\n          <v-flex>\n            <v-select\n              :items=\"modes\"\n              label=\"App Mode\"\n              v-model=\"defaultMode\"\n              box\n            ></v-select>\n          </v-flex>\n          <v-flex xs12>\n            <v-text-field box label=\"Server Address\"  v-model=\"server\" required></v-text-field>\n          </v-flex>\n        </v-layout>\n      </v-container>\n    </v-card-text>\n    <v-card-actions>\n      <v-spacer></v-spacer>\n      <v-flex justify-center>\n        <v-btn color=\"primary\" @click=\"$emit('connect')\">Start</v-btn>\n      </v-flex>\n    </v-card-actions>\n  </v-card>\n</v-dialog>";

/***/ }),

/***/ "cD/j":
/***/ (function(module, exports) {

module.exports = "<v-app>\n    <Communication ref=\"container\" @updateMetrics=\"updateMetrics\"></Communication>\n</v-app>\n  ";

/***/ }),

/***/ "f/qL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ../p4/flexgl/src/uniform.js
function Uniform(glContext, name, type, data) {

    var uniform = (this instanceof Uniform) ? this : {},
        ctx = glContext;

    function serializeArray(arrayOfArray) {
        var sa = [];
        arrayOfArray.forEach(function(a){
            sa = sa.concat(a);
        })
        return sa;
    }

    function sanitize(data) {
        if(Array.isArray(data)) {
            var hasArray = data.filter(function(d){return Array.isArray(d);});
            if(hasArray.length > 0) {
               return serializeArray(data);
            } else {
                return data;
            }
        } else {
            return data
        }
    }

    function setUniform() {
        var type = this.type,
            location = this.location,
            size = this.size,
            data = this.data;
            
        if(Array.isArray(data)) {
            var hasArray = data.filter(function(d){return Array.isArray(d);});
            if(hasArray)
                data = serializeArray(data);
        }

        if((type == 'float' || type == 'int') && !Array.isArray(data) && !ArrayBuffer.isView(data))
            data = [data];

        var buf;
        if (type.slice(0,3) == 'vec' || type == 'float') {
            buf = new Float32Array(data);
            ctx['uniform' + size + 'fv'](location, buf);
        } else if(type.slice(0,4) == 'ivec' || type == 'int'){
            buf = new Int32Array(data);
            ctx['uniform' + size + 'iv'](location, buf);
        } else if(type.slice(0,3) == 'mat') {
            buf = new Float32Array(data);
            ctx['uniformMatrix' + size + 'fv'](location, false, buf);
        } else if(type == 'sampler2D') {
            if(data.hasOwnProperty('resourceType') && data.resourceType == 'texture') {
                ctx.activeTexture(ctx.TEXTURE0 + data.index);
                ctx.bindTexture(ctx.TEXTURE_2D, data.ptr);
                ctx.uniform1i(location, data.index);
            }
        }
    }

    uniform.create = function(name, type, data) {

        if(Array.isArray(data)) {
            var hasArray = data.filter(function(d){return Array.isArray(d);});
            if(hasArray.length > 0) {
                data = serializeArray(data);
            }
        }

        uniform[name] = {
            type: type,
            name: name,
            data: data,
            location: null,
            size: parseInt(type.slice(3,4)) || parseInt(type.slice(4,5)) || 1
        };

        uniform[name].link = function(program) {
            if(typeof this.data !== 'undefined' && this.data !== null) {
                this.location = ctx.getUniformLocation(program, this.name);
                setUniform.call(this);
            }
            return this;
        };

        uniform[name].value = function(val) {
           this.data = sanitize(val);
        }

        uniform[name].load = function(data) {
            this.data = data;
            return this;
        };

        uniform[name].header = function() {
            var header = 'uniform ' + this.type + ' ' + this.name,
                len = 0;
            
            if(this.type != 'sampler2D') {
                len = this.data.length / this.size;
            }

            //TODO: fix declaration for matrix
            if(len > 1 && type != 'mat4') {
                header += '[' + len + ']';
            }
            return header + ';\n';
        };

        return uniform[name];
    }


    return uniform;
}

// CONCATENATED MODULE: ../p4/flexgl/src/attribute.js
function Attribute(glContext) {
    
    var attribute = (this instanceof Attribute) ? this : {},
        ctx = glContext,
        attributeID = 0;

    function setAttribute(name, data) {
        if(Array.isArray(data) || ArrayBuffer.isView(data)){
            if(!ArrayBuffer.isView(data)) data = new Float32Array(data);
            attribute[name].data = data;
            ctx.bindBuffer(ctx.ARRAY_BUFFER, attribute[name].ptr);
            ctx.bufferData(ctx.ARRAY_BUFFER, data, ctx.STATIC_DRAW);
        }
    }
    attribute.create = function(name, type, data) {
        attribute[name] = {
            name: name,
            type: type || 'float',
            data: null,
            location: attributeID++,
            ptr: ctx.createBuffer(),
            size: parseInt(type.slice(3,4)) || 1
        };

        if(data !== null && data.length) setAttribute(name, data);

        attribute[name].link = function(program) {
            ctx.bindBuffer(ctx.ARRAY_BUFFER, this.ptr);
            this.location = ctx.getAttribLocation(program, this.name);
            ctx.vertexAttribPointer(this.location, this.size, ctx.FLOAT, false, 0, 0);
            ctx.enableVertexAttribArray(this.location);
            return this;
        }

        attribute[name].load = function(arrayBuffer) {
            setAttribute(this.name, arrayBuffer);
            return this;
        }

        attribute[name].header = function() {
            return 'attribute ' + this.type + ' ' + this.name + ';\n';
        }

        attribute[name].delete = function() {
            ctx.deleteBuffer(this.ptr);
        }

        return attribute[name];
    };

    return attribute;
}

// CONCATENATED MODULE: ../p4/flexgl/src/texture.js


function Texture(glContext) {

    var texture = (this instanceof Texture) ? this : {},
        ctx = glContext,
        textureID = 0;

    function setTexture(name, texData) {
        var type = ctx[texture[name].type.toUpperCase()],
            format = ctx[texture[name].channel.toUpperCase()],
            width = texture[name].dim[0],
            height = texture[name].dim[1];

        texture[name].data = texData;

        ctx.bindTexture(ctx.TEXTURE_2D, texture[name].ptr);
        ctx.texImage2D(ctx.TEXTURE_2D, 0, format, width, height, 0, format, type, texData);
        ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.NEAREST);
        ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MAG_FILTER, ctx.NEAREST);
        ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_S, ctx.CLAMP_TO_EDGE);
        ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_T, ctx.CLAMP_TO_EDGE);
        ctx.bindTexture(ctx.TEXTURE_2D, null);
    }

    function updateTexture(name, texData, offset = [0, 0], dim = [texture[name].dim[0], texture[name].dim[1]] ) {
        var type = ctx[texture[name].type.toUpperCase()],
            format = ctx[texture[name].channel.toUpperCase()],
            width = dim[0],
            height = dim[1];

        ctx.bindTexture(ctx.TEXTURE_2D, texture[name].ptr);
        ctx.texSubImage2D(ctx.TEXTURE_2D, 0, offset[0], offset[1], width, height, format, type, texData);
        ctx.bindTexture(ctx.TEXTURE_2D, null);
    }

    // TODO: Add support for texture compression
    // function compressTexture(texData) {
    //
    //     var ext = (
    //       ctx.getExtension("WEBGL_compressed_texture_s3tc") ||
    //       ctx.getExtension("MOZ_WEBGL_compressed_texture_s3tc") ||
    //       ctx.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc")
    //     );
    //
    //     ctx.compressedTexImage2D(ctx.TEXTURE_2D, 0, ext.COMPRESSED_RGBA_S3TC_DXT3_EXT, texture[name].dim[0], texture[name].dim[1], 0, texData);
    //     ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MAG_FILTER, ctx.LINEAR);
    //     ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.LINEAR);
    // }

    texture.create = function(name, type, dim, channel, data, sampler) {
        var texIndex = (texture.hasOwnProperty(name)) ? texture[name].index : textureID++;
        texture[name] = {
            name: name,
            index: texIndex,
            type: type || "float",
            dim: dim || [512, 512],
            channel: channel || "alpha",
            data: null,
            location: null,
            sampler: sampler || null,
            ptr: ctx.createTexture()
        };

        // if(data !== null && data.length)
        setTexture(name, data);

        if (texture[name].sampler === null) {
            texture[name].sampler = Uniform(ctx).create(name, 'sampler2D', texture[name]);
        } else {
            texture[name].sampler.data = texture[name];
        }

        texture[name].link = function(program) {
            if (this.data !== null) {
                // ctx.activeTexture(ctx.TEXTURE0 + this.index);
                // ctx.bindTexture(ctx.TEXTURE_2D, this.ptr);
                // this.location = ctx.getUniformLocation(program, this.name);
                // ctx.uniform1i(this.location, this.index);
                if (typeof(this.sampler.data) == 'undefined' || this.sampler.data === null)
                    this.sampler.data = texture[name];

                this.sampler.link(program);
            }
            return this;
        }

        texture[name].load = function(texData) {
            setTexture(this.name, texData);
            return this;
        }

        texture[name].copyFromFBO = function() {
            ctx.bindTexture(ctx.TEXTURE_2D, this.ptr);
            ctx.copyTexImage2D(
                ctx.TEXTURE_2D,
                0,
                ctx.RGBA,
                0,
                0,
                this.dim[0],
                this.dim[1],
                0
            );
            ctx.bindTexture(ctx.TEXTURE_2D, null);
        }

        texture[name].update = function(texData, offset, dim) {
            updateTexture(this.name, texData, offset, dim);
            return this;
        }

        texture[name].resize = function(dim, data) {
            this.dim = dim;
            setTexture(this.name, data);
        }

        texture[name].delete = function() {
            glContext.deleteTexture(this.ptr);
        }

        texture[name].header = function() {
            if (this.name == this.sampler.name)
                return 'uniform sampler2D ' + this.sampler.name + ';\n';
            else
                return '';
        }

        return texture[name];
    }

    return texture;
}

// CONCATENATED MODULE: ../p4/flexgl/src/varying.js
function Varying(glContext) {

    var varying = (this instanceof Varying) ? this : {},
        ctx = glContext;

    varying.create = function(name, type, size) {
        varying[name] = {
            name: name,
            type: type || 'float',
            size: size || 1,
        };

        varying[name].link = function() {};

        varying[name].header = function() {
            var header = 'varying ' + this.type + ' ' + this.name;
            if(this.size > 1)
                header += '[' + this.size + ']';
            return header + ';\n';
        }

        return varying[name];
    }

    return varying;
}

// CONCATENATED MODULE: ../p4/flexgl/src/subroutine.js
function Subroutine() {

    var subroutine = (this instanceof Subroutine) ? this : {};

    subroutine.create = function(name, type, fn) {
        subroutine[name] = {
            name: name,
            type: type || 'float',
            fn: fn,
            resourceType: "subroutine"
        };

        subroutine[name].link = function(program) {
            return this;
        }

        subroutine[name].load = function(fn) {
            subroutine[name].fn = fn;
            return this;
        }

        subroutine[name].header = function() {
            return this.fn.toString();
        }

        return subroutine[name];
    };

    return subroutine;
}

// CONCATENATED MODULE: ../p4/flexgl/src/resource.js






function Resource(glContext) {
    var resource = (this instanceof Resource) ? this : {},
        gpuResources = {};

    resource.uniform = new Uniform(glContext);
    resource.attribute = new Attribute(glContext);
    resource.texture = new Texture(glContext);
    resource.varying = new Varying(glContext);
    resource.subroutine = new Subroutine();

    var resourceTypes = ['uniform', 'attribute', 'texture', 'varying', 'subroutine'];

    resource.allocate = function(type, props) {
        if (resourceTypes.indexOf(type) === -1) {
            throw Error("Error: Invalid resource type: " + type);
        }
        var res = resource[type].create.apply(null, Array.prototype.slice.call(arguments, 1));
        res.resourceType = type;
        gpuResources[res.name] = res;
        if (!gpuResources.hasOwnProperty(res.name)) {
            Object.defineProperty(gpuResources, res.name, {
                get: function() {
                    return gpuResources[res.name];
                },
                set: function(data) {
                    gpuResources[res.name].load(data);
                }
            });
        }
        return res;
    };

    resource.link = function(program, resources) {
        var requiredResources = (Array.isArray(resources)) ? resources : Object.keys(gpuResources);
        requiredResources.forEach(function(resourceName) {
            if (gpuResources.hasOwnProperty(resourceName))
                gpuResources[resourceName].link(program);
        })
    };

    resource.get = function(name) {
        return gpuResources[name];
    }

    resource.create = resource.allocate;

    return resource;
};

// CONCATENATED MODULE: ../p4/flexgl/src/shader.js
function Shader(glContext, glResource) {
    
    var shader = (this instanceof Shader) ? this : {},
        ctx = glContext,
        resource = glResource,
        parameters = ctx._dict || {};

    shader.vertex = {};
    shader.fragment = {};

    var shaderType = {
        vertex: ctx.VERTEX_SHADER,
        fragment: ctx.FRAGMENT_SHADER
    };

    // Convert JS functions to GLSL codes
    function toGLSL(returnType, name, fn){

        var glsl = returnType + ' ' +
            name + '(' + applyEnvParameters(fn.toString())
            .replace(
                /var\s+([\w|\d]+)\s*=\s*new\s+([\w|\d]+)\((.*)\)/g,
                function(expr, name, dtype, value){
                    var parts;
                    if(value)
                        parts = [dtype.toLowerCase(), name, '=', value];
                    else
                        parts = [dtype.toLowerCase(), name];

                    return parts.join(' ')
                }
            )
            .replace(/for\s*\(\s*var\s+/g, 'for(int ')
            .replace(/(var|let)\s/g, 'float ')
            // .replace(/(\.0)([^\d])/g, '$10000000001 $2 ')
            .replace(/this./g, '')
            .replace(/\$(.*)\((.*)\)\s*(=|;)/g, "$1 $2 $3");
            // .replace(/\$(.*?)\./g, "$1 ")

        if(name == "main") {
            glsl = glsl.replace(/\(.*(function|\w).*\(\s*([\s\S]*?)\s*{/, '(){') + "\n";
        } else {
            var args = glsl.match(/function|\w.*\(\s*([\s\S]*?)\s*\)/)[1];
            var isObject = args.match(/{([\s\S]*)}/);
            if(isObject) {
                args = isObject[1].split(',')
                    .map(d=>d.split('='))
                    .map(d=> d[1].replace(/(\'|\")/g, '') + ' ' + d[0])
                    .join(', ')
            } else if(args != "") {
                args = args.replace(/\$([\w|\d]+)_/g, "$1 ");
            }
           
            glsl = glsl.replace(/\(.*(function|\w).*\(\s*([\s\S]*?)\s*\)/, '(' + args+')') + "\n";
        }
        return glsl;
    }

    //set parameters in JS functions before converting to GLSL codes
    function applyEnvParameters(str){
        //find all $(...) and replace them with parameters
        var envParam = Object.keys(parameters);
        if(envParam.length > 0){
            var re = new RegExp("\\$\\(("+envParam.join("|")+")\\)","g");
            str = str.replace(re, function(matched){
                return parameters[matched.slice(2,matched.length-1)];
            });
        }

        // Make uniforms to be used as parameters in shaders, like $(uniformName)
        // var envUniforms = Object.keys(resource.uniform);
        // re = new RegExp("\\$\\(("+envUniforms.join("|")+")\\)","g");
        // str = str.replace(re, function(matched){
        //     return resource.uniform[matched.slice(2,matched.length-1)].data;
        // });

        return str;
    }

    function compile(shaderType, shaderSource) {
        if (shaderType !== ctx.VERTEX_SHADER && shaderType !== ctx.FRAGMENT_SHADER) {
            throw ("Error: unknown shader type");
        }
        var _shader = ctx.createShader(shaderType);
        ctx.shaderSource(_shader, shaderSource);
        ctx.compileShader(_shader);

        // Check the compile status, get compile error if any
        var compiled = ctx.getShaderParameter(_shader, ctx.COMPILE_STATUS);
        if (!compiled) {
            var lastError = ctx.getShaderInfoLog(_shader);
            console.log(shaderSource + '\n ====================================================');
            throw new Error("Error compiling shader '" + _shader + "':" + lastError);

            ctx.deleteShader(_shader);
            return null;
        }

        return _shader;
    }

    function getDeps(fn) {
        var deps = [],
            sourceCode = fn.toString(),
            shaderArgs = sourceCode.match(/function\s.*?\(([^)]*)\)/),
            args = (shaderArgs !== null && shaderArgs.length) ? shaderArgs[1] : [];
        // args = args.replace(/(?:\r\n|\r|\n|\s)/g, '');
        //
        if(args.length) {
            deps = args.split(',').map(function(arg) {
                return arg.replace(/\/\*.*\*\//, '').trim();
            }).filter(function(arg) {
                return arg;
            });
        }

        var extraDeps = getExtraDeps(sourceCode);
        if(extraDeps.length) {
            deps = deps.concat(extraDeps
            .filter(function(d){
                return deps.indexOf(d) === -1;
            }))
        }

        return deps;
    }

    function getExtraDeps(fnString) {
        var extraDeps = fnString.match(/this\.(\w+)/g);
        if(extraDeps !== null) {
            extraDeps = extraDeps.map(function(d){
                return d.slice(5);
            });
        }
        if(extraDeps != null && extraDeps.length) {
            extraDeps.forEach(function(sdep){
                var sres = resource.get(sdep);
                if(sres && sres.resourceType == 'subroutine') {
                    extraDeps = extraDeps.concat(getExtraDeps(sres.fn.toString()));
                }
            });
        }
        return extraDeps || [];
    }

    function declareDep(dep) {
        var res = resource.get(dep);
        if(typeof res === 'undefined')
            throw new Error('Resource/dependence "' + dep + '" is not found.');
        if(res.resourceType == 'subroutine')
            return toGLSL(res.type, res.name, res.fn);
        else
            return res.header();
    }

    function uniqueDeps(deps) {
        var names = {};
        deps.forEach(function(d, i){
            names[d] = i;
        });

        return Object.keys(names);
    }

    shader.create = function(arg, fn){
        var option = arg || {},
            name = option.name || "default",
            type = option.type || "vertex",
            deps = option.require || option.deps || [],
            precision = option.precision || "high",
            debug = option.debug || false,
            main = option.main || fn || function() {};

        var shaderSource = 'precision ' + precision + 'p float;\n';

        if(deps.length === 0) deps = uniqueDeps(getDeps(main));

        //get dependence from subroutines if any
        var extraDeps = [];

        deps.forEach(function(dep){
            var res = resource.get(dep);
            if(typeof res == 'undefined') {
                console.log(dep);
                throw Error ('Error! Undefined variable in shader: '+  dep.name);
            }
            if(res.resourceType == 'subroutine') {
                // subRoutines.push(res.name);
                extraDeps  = getExtraDeps(res.fn.toString());
                
            }   
        })

        if(extraDeps.length) {
            var allDeps = extraDeps.concat(deps);
            deps = uniqueDeps(allDeps);
        }

        if(Array.isArray(deps)){
            deps.filter(function(d){
                return ctx.subroutineNames.indexOf(d) === -1;
            })
            .forEach(function(dep){
                shaderSource += declareDep(dep);
            });
            var t = deps.filter(function(d){
                return ctx.subroutineNames.indexOf(d) !== -1;
            })
            .reverse()
            .forEach(function(dep){
                shaderSource += declareDep(dep);
            });



        } else if(typeof(deps) == 'object') {
            console.log(deps)
            Object.keys(deps).forEach(function(resourceType){
                deps[resourceType].forEach(function(dep){
                    shaderSource += declareDep(dep);
                });
            })
        }

        shaderSource += toGLSL('void', 'main', main);
        if(debug)
            console.log(shaderSource);
        var _shader = compile(shaderType[type], shaderSource);
        _shader._shaderType = shaderType[type];
        _shader.deps = deps;
        _shader.source = shaderSource;
        shader[type][name] = _shader;
        return _shader;
    }

    return shader;
}

// CONCATENATED MODULE: ../p4/flexgl/src/program.js


function Program(glContext, resources) {

    var program,
        ctx = glContext,
        pm = {},
        kernels = {},
        shaders = new Shader(glContext, resources);

    pm.create = function(name, vs, fs) {
        var name = name || "default",
            vs = vs || "default",
            fs = fs || "default",
            deps = [];

        if (kernels.hasOwnProperty(name)) {
            pm.delete(name);
        }

        kernels[name] = ctx.createProgram();

        kernels[name].vs = (typeof vs == "object") ? vs : shaders.vertex[vs];
        kernels[name].fs = (typeof fs == "object") ? fs : shaders.fragment[fs];

        ctx.attachShader(kernels[name], kernels[name].vs);
        ctx.attachShader(kernels[name], kernels[name].fs);
        ctx.linkProgram(kernels[name]);
        var linked = ctx.getProgramParameter(kernels[name], ctx.LINK_STATUS);
        if (!linked) {
            var lastError = ctx.getProgramInfoLog(kernels[name]);
            throw ("Error in program linking:" + lastError);
            ctx.deleteProgram(kernels[name]);
            return null;
        }

        deps = deps.concat(kernels[name].vs.deps);
        deps = deps.concat(kernels[name].fs.deps);
        kernels[name].deps = deps;

        return kernels[name];
    }

    pm.use = pm.program = function(name, vs, fs) {
        if (kernels.hasOwnProperty(name)) {
            program = kernels[name];
            ctx.useProgram(program);
            resources.link(program, program.deps);
            return program;
        } else {
            return pm.create(name, vs, fs);
        }
    }

    pm.delete = function(name) {
        if (kernels.hasOwnProperty(name)) {
            ctx.detachShader(kernels[name], kernels[name].vs);
            ctx.detachShader(kernels[name], kernels[name].fs);
            ctx.deleteProgram(kernels[name]);
            delete kernels[name];
        }
    }

    pm.shader = function(arg, fn) {
        var options = arg;
        shaders.create(options, fn);
        return pm;
    }

    pm.shader.vertex = function(fn) {
        var options = {
            type: "vertex"
        };
        if (fn.name) options.name = fn.name;
        return shaders.create(options, fn);
    }

    pm.shader.fragment = function(fn) {
        var options = {
            type: "fragment"
        };
        if (fn.name) options.name = fn.name;
        return shaders.create(options, fn);
    }

    return pm;
}

// CONCATENATED MODULE: ../p4/flexgl/src/framebuffer.js


function Framebuffer(glContext) {

    var framebuffer = (this instanceof Framebuffer) ? this : {},
        ctx = glContext;

    framebuffer.create = function(name, type, dim, texture) {

        framebuffer[name] = {
            ptr: ctx.createFramebuffer(),
            name: name,
            type: type || "float",
            width: dim[0] || 1024,
            height: dim[1] || 1024,
            texture: texture || null,
            renderbuffer: ctx.createRenderbuffer(),
        }

        if (framebuffer[name].texture === null) {
            var buf = (type == 'float') ?
                new Float32Array(dim[0] * dim[1] * 4) :
                new Uint8Array(dim[0] * dim[1] * 4);
            framebuffer[name].texture = Texture(ctx).create(name, type, dim, "rgba", buf);
        }

        var renderbuffer = framebuffer[name].renderbuffer;
        ctx.bindFramebuffer(ctx.FRAMEBUFFER, framebuffer[name].ptr);
        ctx.bindRenderbuffer(ctx.RENDERBUFFER, renderbuffer);
        ctx.renderbufferStorage(
            ctx.RENDERBUFFER,
            ctx.DEPTH_COMPONENT16,
            framebuffer[name].width,
            framebuffer[name].height
        );
        ctx.framebufferTexture2D(
            ctx.FRAMEBUFFER,
            ctx.COLOR_ATTACHMENT0,
            ctx.TEXTURE_2D,
            framebuffer[name].texture.ptr,
            0
        );
        ctx.framebufferRenderbuffer(
            ctx.FRAMEBUFFER,
            ctx.DEPTH_ATTACHMENT,
            ctx.RENDERBUFFER,
            renderbuffer
        );
        ctx.bindRenderbuffer(ctx.RENDERBUFFER, null);
        ctx.bindFramebuffer(ctx.FRAMEBUFFER, null);

        framebuffer[name].enableRead = function(program) {
            ctx.activeTexture(ctx.TEXTURE0 + this.texture.index);
            ctx.bindTexture(ctx.TEXTURE_2D, this.texture.ptr);
            this.texture.location = ctx.getUniformLocation(program, this.texture.name);
            ctx.uniform1i(this.texture.location, this.texture.index);
        };

        framebuffer[name].delete = function() {
            ctx.bindRenderbuffer(gl.RENDERBUFFER, null);
            ctx.bindFramebuffer(gl.FRAMEBUFFER, null);
            ctx.deleteRenderbuffer(this.renderbuffer);
            ctx.deleteTexture(this.texture.ptr)
            ctx.deleteFramebuffer(this.ptr);
        };

        return framebuffer[name];
    }

    return framebuffer;
}

// CONCATENATED MODULE: ../p4/flexgl/src/main.js
/* harmony export (immutable) */ __webpack_exports__["a"] = FlexGL;





function FlexGL(arg) {

    var flexgl = (this instanceof FlexGL) ? this : {},
        options = arg || {},
        container = options.container || null,
        canvas = options.canvas || document.createElement("canvas"),
        viewport = options.viewport || [0, 0],
        width = options.width || viewport[0] || null,
        height = options.height || viewport[1] || null,
        padding = options.padding || {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        },
        ctx = options.context || options.ctx || null,
        kernels = {},
        program = null,
        glAttr = options.attributes || {},
        sharedFunction = options.sharedFunction || {};

    
    if (typeof(canvas) == "string") {
        if (canvas[0] == "#") canvas = document.getElementById(cavnas.substring(1));
        else canvas = document.getElementById(cavnas);
    }
    if (container) {
        container = (typeof(container) == "string") ? document.getElementById(container) : container;
        if (width === null) width = container.clientWidth;
        if (height === null) height = container.clientHeight;
    }
    // width -= padding.left + padding.right;
    // height -= padding.top + padding.bottom;
    canvas.width = width;
    canvas.height = height;
    canvas.style.position = "absolute";
    canvas.style.marginLeft = padding.left + "px";
    canvas.style.marginTop = padding.top + "px";

    if (ctx === null)
        ctx = setupWebGL(canvas);
    flexgl.ctx = ctx;
    flexgl.canvas = canvas;

    ctx._dict = options.env || options.dict || options.dictionary || {};
    ctx.subroutineNames = []; // save all subroutines' names 

    var resources = new Resource(ctx),
        framebuffers = new Framebuffer(ctx),
        programManager = new Program(ctx, resources),
        shaders = new Shader(ctx, resources);

    var blendExt = ctx.getExtension("EXT_blend_minmax");
    if (blendExt) {
        ctx.MAX_EXT = blendExt.MAX_EXT;
        ctx.MIN_EXT = blendExt.MIN_EXT;
    }

    ctx.ext = ctx.getExtension("ANGLE_instanced_arrays");
    enableExtension([
        "OES_texture_float",
        "OES_texture_float_linear",
        // "OES_texture_half_float",
        // "OES_texture_half_float_linear"
    ]);

    if (container)
        container.appendChild(canvas);

    function setupWebGL(canvas) {
        var names = ["webgl", "experimental-webgl"];
        var gl = null;
        for (var i = 0; i < names.length; ++i) {
            try {
                gl = canvas.getContext(names[i], glAttr);
            } catch (e) {}
            if (gl) break;
        }
        return gl;
    }

    function enableExtension(extensions) {
        if (!Array.isArray(extensions)) extensions = [extensions];
        extensions.forEach(function(extension) {
            var extProps = ctx.getExtension(extension);
            if (extProps !== null) {
                Object.keys(extProps).forEach(function(ep) {
                    if (!ext.hasOwnProperty(ep)) {
                        ctx.ext[ep] = extProps[ep];
                    }
                })
            }
        });
    };

    flexgl.enableExtension = enableExtension;

    /**
     * Allocate Attributes in vertex buffer array stored in GPU memory
     * @param  {String} name attribute name
     * @param  {String} type attribute type: float, vec2, ...
     * @param  {Array} data data values
     * @return {Object}      FLexGL object
     */
    flexgl.attribute = function(name, type, data) {
        resources.allocate("attribute", name, type, data);
        Object.defineProperty(flexgl.attribute, name, {
            get: function() {
                return resources.attribute[name];
            },
            set: function(data) {
                resources.attribute[name].load(data);
            }
        });
        return flexgl;
    };
    flexgl.buffer = flexgl.attribute; //alias

    /**
     * Create a Uniform variable for WebGL shader programs
     * @param  {String} name attribute name
     * @param  {String} type uniform variable type: float, vec2, ...
     * @param  {Array} data data values
     * @return {Object}      FLexGL object
     */
    flexgl.uniform = function(name, type, data) {
        resources.allocate("uniform", name, type, data);
        if (!flexgl.uniform.hasOwnProperty(name)) {
            Object.defineProperty(flexgl.uniform, name, {
                get: function() {
                    return resources.uniform[name];
                },
                set: function(data) {
                    resources.uniform[name].load(data);
                    if (ctx.isProgram(program))
                        resources.uniform[name].link(program);
                }
            });
        }
        return flexgl;
    };

    flexgl.uniform.serialize = function(aoa) {
        var sa = [];
        aoa.forEach(function(a) {
            sa = sa.concat(a);
        })
        return sa;
    }

    /**
     * Create a Uniform variable for WebGL shader programs
     * @param  {String} name attribute name
     * @param  {String} type texture type: unsigned_byte or float, ...
     * @param  {Array} data data values
     * @param  {Array} dim [width, height]
     * @param  {String} [channel='alpha'] WebGL formats (rgba, alpha)
     * @param  {Object} [sampler=null] FLexGL Uniform Object
     * @return {Object}      FLexGL object
     */
    flexgl.texture = function(name, type, data, dim, channel, sampler) {
        resources.allocate("texture", name, type, dim, channel, data, sampler);
        Object.defineProperty(flexgl.texture, name, {
            get: function() {
                return resources.texture[name];
            },
            set: function(data) {
                resources.texture[name].load(data);
            }
        });
        return flexgl;
    }

    flexgl.texture.update = function(name, data, offset, dim) {
        resources.texture[name].update(data, offset, dim);
    }

    /**
     * Create a Uniform variable for WebGL shader programs
     * @param  {String} name attribute name
     * @param  {String} [type] Varying variable type: float, vec2, ...
     * @param  {Number} [size=1] data array
     * @return {Object}      FLexGL object
     */
    flexgl.varying = function(name, type, size) {
        resources.allocate("varying", name, type, size);
        return flexgl;
    };

    /**
     * Create a Uniform variable for WebGL shader programs
     * @param  {String} name attribute name
     * @param  {String} type attribute type: float, vec2, ...
     * @param  {Array} dim [width, height]
     * @param  {Object} [texture=null] FLexGL Texture Object
     * @return {Object}      FLexGL object
     */
    flexgl.framebuffer = function(name, type, dim, texture) {
        var texture = texture || resources.allocate('texture', name, type, dim, 'rgba', null);

        framebuffers.create(name, type, dim, texture);
        if (!flexgl.framebuffer.hasOwnProperty(name)) {
            Object.defineProperty(flexgl.framebuffer, name, {
                get: function() {
                    return framebuffers[name];
                }
            });
        }
        return flexgl;
    }

    flexgl.framebuffer.enableRead = function(name) {
        framebuffers[name].enableRead(program);
    }

    flexgl.bindFramebuffer = function(fbName) {
        if (framebuffers.hasOwnProperty(fbName)) {
            ctx.bindFramebuffer(ctx.FRAMEBUFFER, framebuffers[fbName].ptr);
        } else {
            ctx.bindFramebuffer(ctx.FRAMEBUFFER, null);
        }
    }

    flexgl.subroutine = function(name, type, fn) {
        ctx.subroutineNames.push(name);
        resources.allocate("subroutine", name, type, fn);
        return flexgl;
    }

    flexgl.parameter = function(keyValuePairs) {
        Object.keys(keyValuePairs).forEach(function(key) {
            ctx._dict[key] = keyValuePairs[key];
            if (Array.isArray(ctx._dict[key])) {
                var i = 0;
                Object.defineProperty(ctx._dict, key, {
                    get: function() {
                        return keyValuePairs[key][i++];
                    },
                    set: function(newArray) {
                        i = 0;
                        ctx._dict[key] = newArray;
                    }
                });
            } else if(typeof(ctx._dict[key]) == 'object') {
                var dictKeys = Object.keys(ctx._dict[key]);
                fxgl.uniform('dict'+key, 'float', dictKeys.map(d=>ctx._dict[key][d]));
            }
        })
        return flexgl;
    }

    flexgl.dictionary = flexgl.parameter;

    flexgl.shader = programManager.shader;

    flexgl.program = function(name, vs, fs) {
        program = programManager.program(name, vs, fs);
        return ctx;
    }

    flexgl.createProgram = function(name, vs, fs) {
        program = programManager.create(name, vs, fs);
        return ctx;
    }

    flexgl.app = function(name, props) {
        var vs = flexgl.shader.vertex(props.vs),
            fs = flexgl.shader.fragment(props.fs),
            fb = props.framebuffer || null;

        flexgl.program(name, vs, fs);

        var draw = props.render || props.draw;

        return function(args) {
            var gl = flexgl.program(name);
            return draw.call(gl, args);
        }
    }

    flexgl.dimension = function() {
        return [canvas.width, canvas.height];
    }

    flexgl.resources = resources;

    return flexgl;
}


/***/ }),

/***/ "gJtD":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "h6yt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "int", function() { return int; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "short", function() { return short; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "float", function() { return float; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "double", function() { return double; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "string", function() { return string; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "time", function() { return time; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "datetime", function() { return datetime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "temporal", function() { return temporal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "integer", function() { return integer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numeric", function() { return numeric; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nominal", function() { return nominal; });
const int      = Int32Array;
const short    = Int16Array;
const float    = Float32Array;
const double   = Float64Array;
const string   = Uint16Array;
const time     = Float32Array;
const datetime = Float32Array;
const temporal = Float32Array;
const integer  = Int32Array;
const numeric  = Float32Array;
const nominal  = Uint16Array;




/***/ }),

/***/ "hxZH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = boundedRandom;
/* unused harmony export randomColumns */
/* harmony export (immutable) */ __webpack_exports__["c"] = randomJSONs;
/* harmony export (immutable) */ __webpack_exports__["b"] = randomArrays;
/* unused harmony export randomTypedColumns */
/* unused harmony export validate */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chai__ = __webpack_require__("tyws");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chai___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_chai__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jStat__ = __webpack_require__("0BPL");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jStat___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jStat__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_cstore__ = __webpack_require__("z27Q");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_ctypes__ = __webpack_require__("h6yt");






let equal = __WEBPACK_IMPORTED_MODULE_0_chai__["assert"].equal;
let closeTo = __WEBPACK_IMPORTED_MODULE_0_chai__["assert"].closeTo;
let hasAllKeys = __WEBPACK_IMPORTED_MODULE_0_chai__["assert"].hasAllKeys;
let normalDist = __WEBPACK_IMPORTED_MODULE_1_jStat__["normal"].sample;

function boundedRandom(p) {
    let min = p.min || 0;
    let max = p.max || p.values.length || 1;
    let value = min - 1;
    let rand = (p.dist == 'normal') 
        ? function() { return normalDist(p.mean, p.std); }
        : function() { return min + (max - min) * Math.random(); }
    while ( value < min || value > max) {
        // value = normalDist(p.mean, p.std);
        value = rand(p);
    }
    if(p.hasOwnProperty('values')){
        value = parseInt(value) ;
    }
    return value;
}

function randomColumns(arg) {
    let options = arg || {};
    let size = options.size || 0;
    let props = options.props || [];
    let db = Object(__WEBPACK_IMPORTED_MODULE_2__src_cstore__["a" /* default */])({});
    props.forEach(function(prop) {
        let dtype = p6.ctypes[prop.dtype] || Uint16Array;
        let tuples = new dtype(size);
        for(let i = 0; i < size; i++) {
            tuples[i] = boundedRandom(prop);
        }
        db.addColumn({
            data: tuples,
            name: prop.name,
            dtype: prop.dtype || 'string',
            values: prop.values
        });
    })
    return db;
}

function randomJSONs(arg) {
    let options = arg || {};
    let size = options.size || 0;
    let props = options.props || [];
    let data = new Array(size);
    for(let i = 0; i < size; i++) {
        data[i] = {};
        props.forEach(function(prop) {
            if(prop.hasOwnProperty('values')){
                let vid = parseInt( Math.round( Math.random() * (prop.values.length - 1) ) );
                data[i][prop.name] = prop.values[vid];
            } else {
                let value = boundedRandom(prop);
                data[i][prop.name] = (prop.dtype == 'float') ? parseFloat(value) : Math.round(value);
            }
        });
    }
    return data;
}

function randomArrays(arg) {
    let options = arg || {};
    let size = options.size || 0;
    let props = options.props || [];
    let data = new Array(size);
    for(let i = 0; i < size; i++) {
        data[i] = [];
        props.forEach(function(prop, pi) {
            if(prop.hasOwnProperty('values')){
                let vid = parseInt( Math.round( Math.random() * (prop.values.length - 1) ) );
                data[i][pi] = prop.values[vid];
            } else {
                let value = boundedRandom(prop);
                data[i][pi] = (prop.dtype == 'float') ? parseFloat(value) : Math.round(value);
            }
        });
    }
    return data;
}

function randomTypedColumns(arg) {
    let options = arg || {};
    let size = options.size || 0;
    let props = options.props || [];
    let data = new Array(props.length);

    props.forEach(function(prop, pi) {
        let column = new __WEBPACK_IMPORTED_MODULE_3__src_ctypes__[prop.dtype](size);
        for(let i = 0; i < size; i++) {
            if(prop.hasOwnProperty('values')){
                let vid = parseInt( Math.round( Math.random() * (prop.values.length - 1) ) );
                column[i] = prop.values[vid];
            } else {
                let value = boundedRandom(prop);
                column[i] = (prop.dtype == 'float') ? parseFloat(value) : Math.round(value);
            }
        }
        data[pi] = column;
    });

    return data;
}

function validate(actual, expected, _delta) {
    let delta = _delta || 1e-5;
    let count = actual.length; 

    equal(count, actual.length, 'the size of the result should be ' + count);

    for(let i = 0; i < count; i++) {
        let keys = Object.keys(actual[i]);
        hasAllKeys(expected[i], keys, 'result should have all the keys');
        
        for(let j = 0, l = keys.length; j < l; j++) {
            if(typeof(actual[i][keys[j]]) == 'number') {
                closeTo(actual[i][keys[j]], expected[i][keys[j]], expected[i][keys[j]]*delta);
            } else {
                equal(actual[i][keys[j]], expected[i][keys[j]]);
            }
        }
    }

}

/***/ }),

/***/ "jLOe":
/***/ (function(module, exports) {

module.exports = function toArray(data, arg){
    var options = arg || {},
        fields = options.fields || Object.keys(data[0]) || [],
        format = options.format || 'row';

    if(format == 'row') {
        return data.map(function(d){
            var row = new Array(fields.length);
            fields.forEach(function(f, i){
                row[i] = d[f];
            });
            return row;
        });
    } else {
        return fields.map(function(f){
            return data.map(function(d){ return d[f]; })
        })
    }
}


/***/ }),

/***/ "l+1b":
/***/ (function(module, exports, __webpack_require__) {

const arrayOpts = __webpack_require__("mO0D");
const aggregate = __webpack_require__("L1ge");
const match = __webpack_require__("Xj71");

var query = {};
query.match = match;
query.group = aggregate;

query.indexBy = function(data, id){
    var indexed = {};
    data.forEach(function(d){
        if(!indexed.hasOwnProperty(d[id])){
            indexed[d[id]] = [ d ];
        } else {
            indexed[d[id]].push(d);
        }
        delete d[id];
    });
    return indexed;
};

// query.list = function(data, id) {
//     return data.map(function(d){return d[id];});
// }

query.range = function(data, id) {
    var array = data.map(function(d){return d[id];});
    return [ arrayOpts.min(array), arrayOpts.max(array) ];
};

query.map = function(data, m) {
    var mf = function(d){return d};
    if(typeof m === "string")
        mf = function(d){return d[m]};
    else if(typeof m === "function")
        mf = m;

    return data.map(mf);
};

// Object.keys(arrayOpts).forEach(function(opt) {
//     query[opt] = function(data, id) {
//         var arr = query.map(data, id);
//         return arrayOpts[opt](arr);
//     }
// });



query.sortBy = function(data, spec) {
    function sortArray(a, b, p) {
        return a[p] > b[p] ? 1 : a[p] < b[p] ? -1 : 0;
    }
    return data.sort(function(a, b){
        var r = 0,
            i = 0,
            attributes = Object.keys(spec),
            al = attributes.length;

        while( r === 0 && i < al ) {
            r = sortArray(a, b, attributes[i]) * spec[attributes[i]];
            i++;
        }
        return r;
    })
};

query.orderBy = function(c, s, o) {
    var spec = {};
    s.forEach(function(ss){
        spec[ss] = o;
    });
    return query.sort(c, spec);
};

query.histogram = function(data, spec, max, min) {
    var result = {};
    for(var key in spec) {
        result[key] = arrayOpts.histogram(data.map(function(d){return d[key]}), spec[key], max, min);
    }
    return result;
};

query.binAggregate = function(data, spec) {
    var attrKey = Object.keys(spec)[0],
        attributes = Object.keys(spec).filter(function(k) { return k != "$data" && k!=attrKey;}) || [],
        embedData = spec.$data || false,
        numBin = spec[attrKey],
        array = data.map(function(d){ return d[attrKey]; }),
        l = array.length,
        min = arrayOpts.min(array),
        max = arrayOpts.max(array),
        range = max - min,
        interval = range / numBin,
        bins = [];


    for(var b = 0; b < numBin; b++) {
        bins[b] = {binID: b, rangeBegin: min + range * (b/(numBin)), rangeEnd: min + range*(b+1)/(numBin), count: 0};
        // if(embedData)
            bins[b].data = [];
        // attributes.forEach(function(attr){
        //     bins[b][attr] = 0;
        // })
    }

    // bins[numBin] = [];

    for(var i = 0; i < l; i++) {
        binID = Math.floor( (array[i] - min) / range * (numBin));
        if(binID == numBin) binID--;
        data[i].binID = binID;
        // if(embedData)
            bins[binID].data.push(data[i]);
        // bins[binID].count++;
        // attributes.forEach(function(attr){
        //     bins[binID][attr] += data[i][attr];
        // });
    }

    spec.$by = "binID";
    delete spec[attrKey];

    var result = query.group(data, spec);
    result = query.indexBy(result, "binID");


    // result.forEach(function(r){
    //     r.rangeBegin = bins[r.binID].rangeBegin;
    //     r.rangeEnd = bins[r.binID].rangeEnd;
    // })

    bins.forEach(function(bin){

        if(result.hasOwnProperty(bin.binID)) {
            attributes.forEach(function(attr){
                bin[attr] = result[bin.binID][0][attr];
            });
            if(embedData) bin.data = result[bin.binID][0].data;
        } else {
            attributes.forEach(function(attr){
                bin[attr] = 0;
            });
        }

    })
    // console.log(bins);
    // return result;
    return bins;
}

query.partition = function(data, numPart) {
    var len = data.length,
        p = Math.ceil(len / numPart),
        pid,
        partitions = [];

    for(var b = 0; b < numPart; b++) {
        partitions[b] = {partition: b, data: [], count: 0};
    }

    for(var i = 0; i < len; i++) {
        pid = Math.floor(i / p);
        partitions[pid].data.push(data[i]);
        partitions[pid].count++;
    }

    return partitions;
}

query.partitionBy = function(data, spec) {
    var len = data.length,
        pid,
        partitions = [],
        key = Object.keys(spec)[0],
        parts = spec[key];

    parts.forEach(function(b, bi) {
        partitions[bi] = {partition: bi, data: [], count: 0, name: b};
    })

    for(var i = 0; i < len; i++) {
        pid = parts.indexOf(data[i][key]);
        if(pid>-1){
            partitions[pid].data.push(data[i]);
            partitions[pid].count++;
        }
    }
    return partitions;
}

query.normalize = function(data, fields) {
    var hash = {};

    fields.forEach(function(f){
        var array = data.map(function(d){ return d[f]; });
        hash[f] = arrayOpts.normalize(array);
    });

    data.forEach(function(d, i){
        fields.forEach(function(f){
            d[f] = hash[f][i];
        });
    });

    return data;
}

query.toColumnArray = function(data) {
    var columnArray = [];
        attributes = Object.keys(data[0]).filter(function(k) { return k; });

    attributes.forEach(function(attr){
        columnArray.push(data.map(function(d){return d[attr];}));
    });

    columnArray.fields = attributes;

    attributes.forEach(function(attr, ai){
        columnArray[attr] = columnArray[ai];
    });

    return columnArray;
}

module.exports = query;


/***/ }),

/***/ "lv5u":
/***/ (function(module, exports, __webpack_require__) {

var array = __webpack_require__("mO0D");

function stats(data, fields){

    if(!Array.isArray(data))
        throw new Error("Inproper input data format.");

    var result = {};

    fields.forEach(function(f) {
        var a = data.map(function(d){return d[f]; });
        result[f] = {
            min: array.min(a),
            max: array.max(a),
            avg: array.avg(a),
            std: array.std(a)
        };
    });

    return result;
};


stats.domains = function(data, fields) {
    if(!Array.isArray(data))
        throw new Error("Inproper input data format.");

    var result = {};

    fields.forEach(function(f) {
        var a = data.map(function(d){return d[f]; });
        result[f] = [ array.min(a), array.max(a) ];
    });

    return result;
}

module.exports = stats;


/***/ }),

/***/ "m82B":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_main__ = __webpack_require__("PU2m");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_cstore__ = __webpack_require__("z27Q");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_ctypes__ = __webpack_require__("h6yt");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_io_ajax__ = __webpack_require__("16Nc");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_io_parse__ = __webpack_require__("R4fJ");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__test_data_babies__ = __webpack_require__("nxai");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__test_data_timeseries__ = __webpack_require__("yGlp");









var root = typeof self == 'object' && self.self === self && self ||
           typeof global == 'object' && global.global === global && global ||
           this;

__WEBPACK_IMPORTED_MODULE_0__src_main__["a" /* default */].ajax = __WEBPACK_IMPORTED_MODULE_3__src_io_ajax__;
__WEBPACK_IMPORTED_MODULE_0__src_main__["a" /* default */].cstore = __WEBPACK_IMPORTED_MODULE_1__src_cstore__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_0__src_main__["a" /* default */].ctypes = __WEBPACK_IMPORTED_MODULE_2__src_ctypes__;
__WEBPACK_IMPORTED_MODULE_0__src_main__["a" /* default */].parse = __WEBPACK_IMPORTED_MODULE_4__src_io_parse__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_0__src_main__["a" /* default */].datasets = {Babies: __WEBPACK_IMPORTED_MODULE_5__test_data_babies__["a" /* default */], TimeSeries: __WEBPACK_IMPORTED_MODULE_6__test_data_timeseries__["a" /* default */]};

root.p4 = __WEBPACK_IMPORTED_MODULE_0__src_main__["a" /* default */];
/* harmony default export */ __webpack_exports__["a"] = (root.p4);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("DuR2")))

/***/ }),

/***/ "mO0D":
/***/ (function(module, exports) {

var array = {};
function _reduce(array, opt) {
    var i,
        len = array.length,
        fn,
        result;

    if(!len) return 0;

    switch (opt) {
        case "max":
            result = array.reduce(function(a, b) {
                return (a > b) ? a : b;
            });
            break;
        case "min":
            result = array.reduce(function(a, b) {
                return (a < b) ? a : b;
            });
            break;
        case "and":
        case "&":
            result = array.reduce(function(a, b) {
                return a & b;
            });
            break;
        case "or":
        case "|":
            result = array.reduce(function(a, b) {
                return a | b;
            });
            break;
        case "mult":
        case "*":
            result = array.reduce(function(a, b) {
                return a * b;
            });
            break;
        default: // "sum" or "+"
            result = array.reduce(function(a, b) {
                return a + b;
            });
            break;
    }

    return result;
}

array.reduce = function(opt) {
    return function(array) {
        var a = (array instanceof Array) ? array : Array.apply(null, arguments);
        return _reduce(a, opt);
    };
};

array.avg = function(array) {
    return _reduce(array, "+") / array.length;
    // return array.reduce(function(a,b){ return 0.5 * (a + b)});
};

array.normalize = function(array) {
    var max = _reduce(array, "max"),
        min = _reduce(array, "min"),
        range = max - min;

    return array.map(function(a){
        return (a - min) / range;
    });
}

array.seq = function(start, end, intv) {
    var interval = intv || 1,
        array = [];

    for(var i=start; i<=end; i+=interval)
        array.push(i);

    return array;
};

["max", "min", "mult", "and", "or"].forEach(function(f) {
    array[f] = array.reduce(f);
});

array.sum = array.reduce("+");

array.scan = array.pfsum = function(a){
    var pfsum = [],
        accum = 0;

    for (var i = 0; i < a.length; i++) {
        accum += a[i];
        pfsum.push(accum);
    }

    return pfsum;
};

array.iscan = function(a) {
    return array.scan([0].concat(a));
};

array.diff = function(a, b) {
    var difference = [];
    a.forEach(function(d){
        if (b.indexOf(d)===-1) {
            difference.push(d);
        }
    });
    return difference;
};

array.intersect = function(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function (e) {
            if (b.indexOf(e) !== -1) return true;
    });
};

array.unique = function(a) {
    return a.reduce(function(b, c) {
        if (b.indexOf(c) < 0) b.push(c);
        return b;
    }, []);
};

array.lcm = function(A) {
    var n = A.length, a = Math.abs(A[0]);
    for (var i = 1; i < n; i++) {
        var b = Math.abs(A[i]), c = a;
        while (a && b){ (a > b) ? a %= b : b %= a; }
        a = Math.abs(c*A[i])/(a+b);
    }
    return a;
};

array.stats = function(array){
    return {
        max: _reduce(array, "max"),
        min: _reduce(array, "min"),
        avg: array.avg(array)
    };
};

array.histogram = function(array, numBin, _max, _min) {
    var l = array.length,
        min = (typeof(_min) == 'number') ? _min : _reduce(array, "min"),
        max = (typeof(_max) == 'number') ? _max : _reduce(array, "max"),
        range = max - min,
        interval = range / numBin,
        bins = [],
        // ids = [],
        hg = new Array(numBin+1).fill(0);

    for(var b = 0; b < numBin; b++) {
        bins.push([min + range * (b/(numBin)), min + range*(b+1)/(numBin)]);
        // ids[b] = [];
    }

    // ids[numBin] = [];

    for(var i = 0; i < l; i++) {
        binID = Math.floor( (array[i] - min) / range * (numBin));
        hg[binID]++;
        // ids[binID].push(i);
    };

    hg[numBin-1] += hg[numBin];
    // ids[numBin-1] = ids[numBin-1].concat(ids.pop());
    return {
        bins: bins,
        counts: hg.slice(0,numBin),
        // ids: ids
    };
}

array.var = function(rowArray) {
    var m = _reduce(rowArray, "+") / rowArray.length,
        va = rowArray.map(function(a){ return Math.pow(a-m, 2) });

    return _reduce(va, "+") / (rowArray.length - 1);
}

array.std = function(rowArray) {
    return Math.sqrt(array.var(rowArray));
}



module.exports = array;


/***/ }),

/***/ "n/L2":
/***/ (function(module, exports) {

module.exports = {"type":"Topology","objects":{"countries":{"type":"GeometryCollection","geometries":[{"type":"Polygon","arcs":[[0,1,2,3,4,5]],"id":"004"},{"type":"MultiPolygon","arcs":[[[6,7,8,9]],[[10,11,12]]],"id":"024"},{"type":"Polygon","arcs":[[13,14,15,16,17]],"id":"008"},{"type":"Polygon","arcs":[[18,19,20,21,22]],"id":"784"},{"type":"MultiPolygon","arcs":[[[23,24]],[[25,26,27,28,29,30]]],"id":"032"},{"type":"Polygon","arcs":[[31,32,33,34,35]],"id":"051"},{"type":"MultiPolygon","arcs":[[[36]],[[37]],[[38]],[[39]],[[40]],[[41]],[[42]],[[43]]],"id":"010"},{"type":"Polygon","arcs":[[44]],"id":"260"},{"type":"MultiPolygon","arcs":[[[45]],[[46]]],"id":"036"},{"type":"Polygon","arcs":[[47,48,49,50,51,52,53]],"id":"040"},{"type":"MultiPolygon","arcs":[[[54,-35]],[[55,56,-33,57,58]]],"id":"031"},{"type":"Polygon","arcs":[[59,60,61]],"id":"108"},{"type":"Polygon","arcs":[[62,63,64,65,66]],"id":"056"},{"type":"Polygon","arcs":[[67,68,69,70,71]],"id":"204"},{"type":"Polygon","arcs":[[72,73,74,-70,75,76]],"id":"854"},{"type":"Polygon","arcs":[[77,78,79]],"id":"050"},{"type":"Polygon","arcs":[[80,81,82,83,84,85]],"id":"100"},{"type":"MultiPolygon","arcs":[[[86]],[[87]],[[88]]],"id":"044"},{"type":"Polygon","arcs":[[89,90,91]],"id":"070"},{"type":"Polygon","arcs":[[92,93,94,95,96]],"id":"112"},{"type":"Polygon","arcs":[[97,98,99]],"id":"084"},{"type":"Polygon","arcs":[[100,101,102,103,-31]],"id":"068"},{"type":"Polygon","arcs":[[-27,104,-103,105,106,107,108,109,110,111,112]],"id":"076"},{"type":"Polygon","arcs":[[113,114]],"id":"096"},{"type":"Polygon","arcs":[[115,116]],"id":"064"},{"type":"Polygon","arcs":[[117,118,119,120]],"id":"072"},{"type":"Polygon","arcs":[[121,122,123,124,125,126,127]],"id":"140"},{"type":"MultiPolygon","arcs":[[[128]],[[129]],[[130]],[[131]],[[132]],[[133]],[[134]],[[135]],[[136]],[[137]],[[138,139,140,141]],[[142]],[[143]],[[144]],[[145]],[[146]],[[147]],[[148]],[[149]],[[150]],[[151]],[[152]],[[153]],[[154]],[[155]],[[156]],[[157]],[[158]],[[159]],[[160]]],"id":"124"},{"type":"Polygon","arcs":[[-51,161,162,163]],"id":"756"},{"type":"MultiPolygon","arcs":[[[-24,164]],[[-30,165,166,-101]]],"id":"152"},{"type":"MultiPolygon","arcs":[[[167]],[[168,169,170,171,172,173,-117,174,175,176,177,-4,178,179,180,181,182,183]]],"id":"156"},{"type":"Polygon","arcs":[[184,185,186,187,-73,188]],"id":"384"},{"type":"Polygon","arcs":[[189,190,191,192,193,194,-128,195]],"id":"120"},{"type":"Polygon","arcs":[[196,197,-60,198,199,200,201,-10,202,-13,203,-126,204]],"id":"180"},{"type":"Polygon","arcs":[[-12,205,206,-196,-127,-204]],"id":"178"},{"type":"Polygon","arcs":[[207,208,209,210,211,-107,212]],"id":"170"},{"type":"Polygon","arcs":[[213,214,215,216]],"id":"188"},{"type":"Polygon","arcs":[[217]],"id":"192"},{"type":"Polygon","arcs":[[218,219]],"id":"-99"},{"type":"Polygon","arcs":[[220,-220]],"id":"196"},{"type":"Polygon","arcs":[[-53,221,222,223]],"id":"203"},{"type":"Polygon","arcs":[[224,225,-222,-52,-164,226,227,-64,228,229,230]],"id":"276"},{"type":"Polygon","arcs":[[231,232,233,234]],"id":"262"},{"type":"MultiPolygon","arcs":[[[235]],[[-231,236]]],"id":"208"},{"type":"Polygon","arcs":[[237,238]],"id":"214"},{"type":"Polygon","arcs":[[239,240,241,242,243,244,245,246]],"id":"012"},{"type":"Polygon","arcs":[[247,-208,248]],"id":"218"},{"type":"Polygon","arcs":[[249,250,251,252,253]],"id":"818"},{"type":"Polygon","arcs":[[254,255,256,-235]],"id":"232"},{"type":"Polygon","arcs":[[257,258,259,260]],"id":"724"},{"type":"Polygon","arcs":[[261,262,263]],"id":"233"},{"type":"Polygon","arcs":[[-234,264,265,266,267,268,269,-255]],"id":"231"},{"type":"Polygon","arcs":[[270,271,272,273]],"id":"246"},{"type":"MultiPolygon","arcs":[[[274]],[[275]]],"id":"242"},{"type":"Polygon","arcs":[[276]],"id":"238"},{"type":"MultiPolygon","arcs":[[[277,278,279,-111]],[[280]],[[281,-227,-163,282,283,-259,284,-66]]],"id":"250"},{"type":"Polygon","arcs":[[285,286,-190,-207]],"id":"266"},{"type":"MultiPolygon","arcs":[[[287,288]],[[289]]],"id":"826"},{"type":"Polygon","arcs":[[290,291,-58,-32,292]],"id":"268"},{"type":"Polygon","arcs":[[293,-189,-77,294]],"id":"288"},{"type":"Polygon","arcs":[[295,296,297,298,299,300,-187]],"id":"324"},{"type":"Polygon","arcs":[[301,302]],"id":"270"},{"type":"Polygon","arcs":[[303,304,-299]],"id":"624"},{"type":"Polygon","arcs":[[305,-191,-287]],"id":"226"},{"type":"MultiPolygon","arcs":[[[306]],[[307,-15,308,-84,309]]],"id":"300"},{"type":"Polygon","arcs":[[310]],"id":"304"},{"type":"Polygon","arcs":[[311,312,-100,313,314,315]],"id":"320"},{"type":"Polygon","arcs":[[316,317,-109,318]],"id":"328"},{"type":"Polygon","arcs":[[319,320,-315,321,322]],"id":"340"},{"type":"Polygon","arcs":[[323,-92,324,325,326,327]],"id":"191"},{"type":"Polygon","arcs":[[-239,328]],"id":"332"},{"type":"Polygon","arcs":[[-48,329,330,331,332,-328,333]],"id":"348"},{"type":"MultiPolygon","arcs":[[[334]],[[335,336]],[[337]],[[338]],[[339]],[[340]],[[341]],[[342]],[[343,344]],[[345]],[[346]],[[347,348]],[[349]]],"id":"360"},{"type":"Polygon","arcs":[[-177,350,-175,-116,-174,351,-80,352,353]],"id":"356"},{"type":"Polygon","arcs":[[354,-288]],"id":"372"},{"type":"Polygon","arcs":[[355,-6,356,357,358,359,-55,-34,-57,360]],"id":"364"},{"type":"Polygon","arcs":[[361,362,363,364,365,366,-359]],"id":"368"},{"type":"Polygon","arcs":[[367]],"id":"352"},{"type":"Polygon","arcs":[[368,369,370,-254,371,372,373]],"id":"376"},{"type":"MultiPolygon","arcs":[[[374]],[[375]],[[376,377,-283,-162,-50]]],"id":"380"},{"type":"Polygon","arcs":[[378]],"id":"388"},{"type":"Polygon","arcs":[[-369,379,-365,380,381,-371,382]],"id":"400"},{"type":"MultiPolygon","arcs":[[[383]],[[384]],[[385]]],"id":"392"},{"type":"Polygon","arcs":[[386,387,388,389,-181,390]],"id":"398"},{"type":"Polygon","arcs":[[391,392,393,394,-267,395]],"id":"404"},{"type":"Polygon","arcs":[[-391,-180,396,397]],"id":"417"},{"type":"Polygon","arcs":[[398,399,400,401]],"id":"116"},{"type":"Polygon","arcs":[[402,403]],"id":"410"},{"type":"Polygon","arcs":[[-18,404,405,406]],"id":"-99"},{"type":"Polygon","arcs":[[407,408,-363]],"id":"414"},{"type":"Polygon","arcs":[[409,410,-172,411,-400]],"id":"418"},{"type":"Polygon","arcs":[[-373,412,413]],"id":"422"},{"type":"Polygon","arcs":[[414,415,-296,-186]],"id":"430"},{"type":"Polygon","arcs":[[416,-247,417,418,-252,419,420]],"id":"434"},{"type":"Polygon","arcs":[[421]],"id":"144"},{"type":"Polygon","arcs":[[422]],"id":"426"},{"type":"Polygon","arcs":[[423,424,425,-93,426]],"id":"440"},{"type":"Polygon","arcs":[[-228,-282,-65]],"id":"442"},{"type":"Polygon","arcs":[[427,-264,428,-94,-426]],"id":"428"},{"type":"Polygon","arcs":[[-244,429,430]],"id":"504"},{"type":"Polygon","arcs":[[431,432]],"id":"498"},{"type":"Polygon","arcs":[[433]],"id":"450"},{"type":"Polygon","arcs":[[434,-98,-313,435,436]],"id":"484"},{"type":"Polygon","arcs":[[-407,437,-85,-309,-14]],"id":"807"},{"type":"Polygon","arcs":[[438,-241,439,-74,-188,-301,440]],"id":"466"},{"type":"Polygon","arcs":[[441,-78,-352,-173,-411,442]],"id":"104"},{"type":"Polygon","arcs":[[443,-325,-91,444,-405,-17]],"id":"499"},{"type":"Polygon","arcs":[[445,-183]],"id":"496"},{"type":"Polygon","arcs":[[446,447,448,449,450,451,452,453]],"id":"508"},{"type":"Polygon","arcs":[[454,455,456,-242,-439]],"id":"478"},{"type":"Polygon","arcs":[[-454,457,458]],"id":"454"},{"type":"MultiPolygon","arcs":[[[459,460]],[[-348,461,-115,462]]],"id":"458"},{"type":"Polygon","arcs":[[463,-8,464,-119,465]],"id":"516"},{"type":"Polygon","arcs":[[466]],"id":"540"},{"type":"Polygon","arcs":[[-75,-440,-240,-417,467,-194,468,-71]],"id":"562"},{"type":"Polygon","arcs":[[469,-72,-469,-193]],"id":"566"},{"type":"Polygon","arcs":[[470,-323,471,-215]],"id":"558"},{"type":"Polygon","arcs":[[-229,-63,472]],"id":"528"},{"type":"MultiPolygon","arcs":[[[473,-274,474,475]],[[476]],[[477]],[[478]]],"id":"578"},{"type":"Polygon","arcs":[[-351,-176]],"id":"524"},{"type":"MultiPolygon","arcs":[[[479]],[[480]]],"id":"554"},{"type":"MultiPolygon","arcs":[[[481,482,-22,483]],[[-20,484]]],"id":"512"},{"type":"Polygon","arcs":[[-178,-354,485,-357,-5]],"id":"586"},{"type":"Polygon","arcs":[[486,-217,487,-210]],"id":"591"},{"type":"Polygon","arcs":[[-167,488,-249,-213,-106,-102]],"id":"604"},{"type":"MultiPolygon","arcs":[[[489]],[[490]],[[491]],[[492]],[[493]],[[494]],[[495]]],"id":"608"},{"type":"MultiPolygon","arcs":[[[496]],[[497]],[[-344,498]],[[499]]],"id":"598"},{"type":"Polygon","arcs":[[-226,500,501,-427,-97,502,503,-223]],"id":"616"},{"type":"Polygon","arcs":[[504]],"id":"630"},{"type":"Polygon","arcs":[[505,506,-404,507,-169]],"id":"408"},{"type":"Polygon","arcs":[[-261,508]],"id":"620"},{"type":"Polygon","arcs":[[-104,-105,-26]],"id":"600"},{"type":"Polygon","arcs":[[-383,-370]],"id":"275"},{"type":"Polygon","arcs":[[509,510]],"id":"634"},{"type":"Polygon","arcs":[[511,-433,512,513,-81,514,-332]],"id":"642"},{"type":"MultiPolygon","arcs":[[[515]],[[-502,516,-424]],[[517]],[[518]],[[519]],[[520]],[[521]],[[-506,-184,-446,-182,-390,522,-59,-292,523,524,-95,-429,-263,525,-271,-474,526]],[[527]],[[528]],[[529]]],"id":"643"},{"type":"Polygon","arcs":[[530,-61,-198,531]],"id":"646"},{"type":"Polygon","arcs":[[-243,-457,532,-430]],"id":"732"},{"type":"Polygon","arcs":[[533,-381,-364,-409,534,-511,535,-23,-483,536]],"id":"682"},{"type":"Polygon","arcs":[[537,538,-123,539,-420,-251,540,-256,-270,541]],"id":"729"},{"type":"Polygon","arcs":[[542,-268,-395,543,-205,-125,544,-538]],"id":"728"},{"type":"Polygon","arcs":[[545,-455,-441,-300,-305,546,-303]],"id":"686"},{"type":"MultiPolygon","arcs":[[[547]],[[548]],[[549]],[[550]],[[551]]],"id":"090"},{"type":"Polygon","arcs":[[552,-297,-416]],"id":"694"},{"type":"Polygon","arcs":[[553,-316,-321]],"id":"222"},{"type":"Polygon","arcs":[[-265,-233,554,555]],"id":"-99"},{"type":"Polygon","arcs":[[-396,-266,-556,556]],"id":"706"},{"type":"Polygon","arcs":[[-86,-438,-406,-445,-90,-324,-333,-515]],"id":"688"},{"type":"Polygon","arcs":[[557,-279,558,-110,-318]],"id":"740"},{"type":"Polygon","arcs":[[-504,559,-330,-54,-224]],"id":"703"},{"type":"Polygon","arcs":[[-49,-334,-327,560,-377]],"id":"705"},{"type":"Polygon","arcs":[[-475,-273,561]],"id":"752"},{"type":"Polygon","arcs":[[562,-450]],"id":"748"},{"type":"Polygon","arcs":[[-380,-374,-414,563,564,-366]],"id":"760"},{"type":"Polygon","arcs":[[-468,-421,-540,-122,-195]],"id":"148"},{"type":"Polygon","arcs":[[565,-295,-76,-69]],"id":"768"},{"type":"Polygon","arcs":[[566,-461,567,-443,-410,-399]],"id":"764"},{"type":"Polygon","arcs":[[-397,-179,-3,568]],"id":"762"},{"type":"Polygon","arcs":[[-356,569,-388,570,-1]],"id":"795"},{"type":"Polygon","arcs":[[571,-336]],"id":"626"},{"type":"Polygon","arcs":[[572]],"id":"780"},{"type":"Polygon","arcs":[[-246,573,-418]],"id":"788"},{"type":"MultiPolygon","arcs":[[[-293,-36,-360,-367,-565,574]],[[-310,-83,575]]],"id":"792"},{"type":"Polygon","arcs":[[576]],"id":"158"},{"type":"Polygon","arcs":[[-393,577,-447,-459,578,-201,579,-199,-62,-531,580]],"id":"834"},{"type":"Polygon","arcs":[[-532,-197,-544,-394,-581]],"id":"800"},{"type":"Polygon","arcs":[[-525,581,-513,-432,-512,-331,-560,-503,-96]],"id":"804"},{"type":"Polygon","arcs":[[-113,582,-28]],"id":"858"},{"type":"MultiPolygon","arcs":[[[583]],[[584]],[[585]],[[586]],[[587]],[[588,-437,589,-139]],[[590]],[[591]],[[592]],[[-141,593]]],"id":"840"},{"type":"Polygon","arcs":[[-571,-387,-398,-569,-2]],"id":"860"},{"type":"Polygon","arcs":[[594,-319,-108,-212]],"id":"862"},{"type":"Polygon","arcs":[[595,-401,-412,-171]],"id":"704"},{"type":"MultiPolygon","arcs":[[[596]],[[597]]],"id":"548"},{"type":"Polygon","arcs":[[598,-537,-482]],"id":"887"},{"type":"Polygon","arcs":[[-466,-118,599,-451,-563,-449,600],[-423]],"id":"710"},{"type":"Polygon","arcs":[[-458,-453,601,-120,-465,-7,-202,-579]],"id":"894"},{"type":"Polygon","arcs":[[-600,-121,-602,-452]],"id":"716"}]},"land":{"type":"GeometryCollection","geometries":[{"type":"MultiPolygon","arcs":[[[595,401,566,459,567,441,78,352,485,357,361,407,534,509,535,18,484,20,483,598,533,381,249,540,256,231,554,556,391,577,447,600,463,8,202,10,205,285,305,191,469,67,565,293,184,414,552,297,303,546,301,545,455,532,430,244,573,418,252,371,412,563,574,290,523,581,513,81,575,307,15,443,325,560,377,283,259,508,257,284,66,472,229,236,224,500,516,424,427,261,525,271,561,475,526,506,402,507,169],[123,544,538],[199,579],[542,268,541],[388,522,55,360,569]],[[24,164]],[[582,28,165,488,247,208,486,213,470,319,553,311,435,589,139,593,141,588,434,98,313,321,471,215,487,210,594,316,557,279,111],[558,277]],[[36]],[[37]],[[38]],[[39]],[[40]],[[41]],[[42]],[[43]],[[44]],[[45]],[[46]],[[86]],[[87]],[[88]],[[461,113,462,348]],[[128]],[[129]],[[130]],[[131]],[[132]],[[133]],[[134]],[[135]],[[136]],[[137]],[[142]],[[143]],[[144]],[[145]],[[146]],[[147]],[[148]],[[149]],[[150]],[[151]],[[152]],[[153]],[[154]],[[155]],[[156]],[[157]],[[158]],[[159]],[[160]],[[167]],[[217]],[[218,220]],[[235]],[[237,328]],[[274]],[[275]],[[276]],[[280]],[[288,354]],[[289]],[[306]],[[310]],[[334]],[[336,571]],[[337]],[[338]],[[339]],[[340]],[[341]],[[342]],[[344,498]],[[345]],[[346]],[[349]],[[367]],[[374]],[[375]],[[378]],[[383]],[[384]],[[385]],[[421]],[[433]],[[466]],[[476]],[[477]],[[478]],[[479]],[[480]],[[489]],[[490]],[[491]],[[492]],[[493]],[[494]],[[495]],[[496]],[[497]],[[499]],[[504]],[[515]],[[517]],[[518]],[[519]],[[520]],[[521]],[[527]],[[528]],[[529]],[[547]],[[548]],[[549]],[[550]],[[551]],[[572]],[[576]],[[583]],[[584]],[[585]],[[586]],[[587]],[[590]],[[591]],[[592]],[[596]],[[597]]]}]}},"arcs":[[[67002,71642],[284,-224],[209,79],[58,268],[219,89],[157,180],[55,472],[234,114],[44,211],[131,-158],[84,-19]],[[68477,72654],[154,-4],[210,-124]],[[68841,72526],[85,-72],[201,189],[93,-114],[90,271],[166,-12],[43,86],[29,239],[120,205],[150,-134],[-30,-181],[84,-28],[-26,-496],[110,-194],[97,125],[123,58],[173,265],[192,-44],[286,-1]],[[70827,72688],[50,-169]],[[70877,72519],[-162,-67],[-141,-109],[-319,-68],[-298,-124],[-163,-258],[66,-250],[32,-294],[-139,-248],[12,-227],[-76,-213],[-265,18],[110,-390],[-177,-150],[-118,-356],[15,-355],[-108,-166],[-103,55],[-212,-77],[-31,-166],[-207,1],[-154,-334],[-10,-503],[-361,-246],[-194,52],[-56,-129],[-166,75],[-278,-88],[-465,301]],[[66909,68203],[252,536],[-23,380],[-210,100],[-22,375],[-91,472],[119,323],[-121,87],[76,430],[113,736]],[[56642,44124],[29,-184],[-32,-286],[49,-277],[-41,-222],[24,-203],[-579,7],[-13,-1880],[188,-483],[181,-369]],[[56448,40227],[-510,-241],[-673,83],[-192,284],[-1126,-26],[-42,-41],[-166,267],[-180,17],[-166,-100],[-134,-113]],[[53259,40357],[-26,372],[38,519],[96,541],[15,254],[90,532],[66,243],[159,386],[90,263],[29,438],[-15,335],[-83,211],[-74,358],[-68,355],[15,122],[85,235],[-84,570],[-57,396],[-139,374],[26,115]],[[53422,46976],[115,79],[80,-11],[98,71],[820,-8],[68,-440],[80,-354],[64,-191],[106,-309],[184,47],[91,83],[154,-83],[42,148],[69,344],[172,23],[15,103],[142,2],[-24,-213],[337,5],[5,-372],[56,-228],[-41,-356],[21,-363],[93,-219],[-15,-703],[68,54],[121,-15],[172,89],[127,-35]],[[53383,47159],[-74,444]],[[53309,47603],[112,255],[84,100],[104,-203]],[[53609,47755],[-101,-124],[-45,-152],[-9,-258],[-71,-62]],[[55719,75309],[-35,-201],[39,-254],[115,-144]],[[55838,74710],[-5,-155],[-91,-85],[-16,-192],[-129,-287]],[[55597,73991],[-48,41],[-5,130],[-154,199],[-24,281],[23,403],[38,184],[-47,93]],[[55380,75322],[-18,188],[120,291],[18,-111],[75,52]],[[55575,75742],[59,-159],[66,-60],[19,-214]],[[64327,64904],[49,29],[11,-162],[217,93],[230,-15],[168,-18],[190,400],[207,379],[176,364]],[[65575,65974],[52,-202]],[[65627,65772],[38,-466]],[[65665,65306],[-142,-3],[-23,-384],[50,-82],[-126,-117],[-1,-241],[-81,-245],[-7,-238]],[[65335,63996],[-56,-125],[-835,298],[-106,599],[-11,136]],[[31400,18145],[-168,16],[-297,1],[0,1319]],[[30935,19481],[106,-274],[139,-443],[361,-355],[389,-147],[-125,-296],[-264,-29],[-141,208]],[[32587,37434],[511,-964],[227,-89],[339,-437],[286,-231],[40,-261],[-273,-898],[280,-160],[312,-91],[220,95],[252,453],[45,521]],[[34826,35372],[138,114],[139,-341],[-6,-472],[-234,-326],[-186,-241],[-314,-573],[-370,-806]],[[33993,32727],[-70,-473],[-74,-607],[3,-588],[-61,-132],[-21,-382]],[[33770,30545],[-19,-308],[353,-506],[-38,-408],[173,-257],[-14,-289],[-267,-757],[-412,-317],[-557,-123],[-305,59],[59,-352],[-57,-442],[51,-298],[-167,-208],[-284,-82],[-267,216],[-108,-155],[39,-587],[188,-178],[152,186],[82,-307],[-255,-183],[-223,-367],[-41,-595],[-66,-316],[-262,-2],[-218,-302],[-80,-443],[273,-433],[266,-119],[-96,-531],[-328,-333],[-180,-692],[-254,-234],[-113,-276],[89,-614],[185,-342],[-117,30]],[[30952,19680],[-257,93],[-672,79],[-115,344],[6,443],[-185,-38],[-98,214],[-24,626],[213,260],[88,375],[-33,299],[148,504],[101,782],[-30,347],[122,112],[-30,223],[-129,118],[92,248],[-126,224],[-65,682],[112,120],[-47,720],[65,605],[75,527],[166,215],[-84,576],[-1,543],[210,386],[-7,494],[159,576],[1,544],[-72,108],[-128,1020],[171,607],[-27,572],[100,537],[182,555],[196,367],[-83,232],[58,190],[-9,985],[302,291],[96,614],[-34,148]],[[31359,37147],[231,534],[364,-144],[163,-427],[109,475],[316,-24],[45,-127]],[[62106,74858],[386,92]],[[62492,74950],[57,-155],[106,-103],[-56,-148],[148,-202],[-78,-189],[118,-160],[124,-97],[7,-410]],[[62918,73486],[-101,-17]],[[62817,73469],[-113,342],[1,91],[-123,-2],[-82,159],[-58,-16]],[[62442,74043],[-109,172],[-207,147],[27,288],[-47,208]],[[33452,3290],[-82,-301],[-81,-266],[-582,81],[-621,-35],[-348,197],[0,23],[-152,174],[625,-23],[599,-58],[207,243],[147,208],[288,-243]],[[5775,3611],[-533,-81],[-364,208],[-163,209],[-11,35],[-180,162],[169,220],[517,-93],[277,-185],[212,-209],[76,-266]],[[37457,4468],[342,-255],[120,-359],[33,-254],[11,-301],[-430,-186],[-452,-150],[-522,-139],[-582,-116],[-658,35],[-365,197],[49,243],[593,162],[239,197],[174,254],[126,220],[168,209],[180,243],[141,0],[414,127],[419,-127]],[[16330,7154],[359,-93],[332,104],[-158,-208],[-261,-151],[-386,47],[-278,208],[60,197],[332,-104]],[[15122,7165],[425,-231],[-164,23],[-359,58],[-381,162],[202,127],[277,-139]],[[22505,8080],[305,-81],[304,69],[163,-335],[-217,46],[-337,-23],[-343,23],[-376,-35],[-283,116],[-146,243],[174,104],[353,-81],[403,-46]],[[30985,8657],[33,-266],[-49,-231],[-76,-220],[-326,-81],[-311,-116],[-364,11],[136,232],[-327,-81],[-310,-81],[-212,174],[-16,243],[305,231],[190,70],[321,-23],[82,301],[16,219],[-6,475],[158,278],[256,93],[147,-220],[65,-220],[120,-267],[92,-254],[76,-267]],[[0,529],[16,-5],[245,344],[501,-185],[32,21],[294,188],[38,-7],[32,-4],[402,-246],[352,246],[63,34],[816,104],[265,-138],[130,-71],[419,-196],[789,-151],[625,-185],[1072,-139],[800,162],[1181,-116],[669,-185],[734,174],[773,162],[60,278],[-1094,23],[-898,139],[-234,231],[-745,128],[49,266],[103,243],[104,220],[-55,243],[-462,162],[-212,209],[-430,185],[675,-35],[642,93],[402,-197],[495,173],[457,220],[223,197],[-98,243],[-359,162],[-408,174],[-571,35],[-500,81],[-539,58],[-180,220],[-359,185],[-217,208],[-87,672],[136,-58],[250,-185],[457,58],[441,81],[228,-255],[441,58],[370,127],[348,162],[315,197],[419,58],[-11,220],[-97,220],[81,208],[359,104],[163,-196],[425,115],[321,151],[397,12],[375,57],[376,139],[299,128],[337,127],[218,-35],[190,-46],[414,81],[370,-104],[381,11],[364,81],[375,-57],[414,-58],[386,23],[403,-12],[413,-11],[381,23],[283,174],[337,92],[349,-127],[331,104],[300,208],[179,-185],[98,-208],[180,-197],[288,174],[332,-220],[375,-70],[321,-162],[392,35],[354,104],[418,-23],[376,-81],[381,-104],[147,254],[-180,197],[-136,209],[-359,46],[-158,220],[-60,220],[-98,440],[213,-81],[364,-35],[359,35],[327,-93],[283,-174],[119,-208],[376,-35],[359,81],[381,116],[342,70],[283,-139],[370,46],[239,451],[224,-266],[321,-104],[348,58],[228,-232],[365,-23],[337,-69],[332,-128],[218,220],[108,209],[278,-232],[381,58],[283,-127],[190,-197],[370,58],[288,127],[283,151],[337,81],[392,69],[354,81],[272,127],[163,186],[65,254],[-32,244],[-87,231],[-98,232],[-87,231],[-71,209],[-16,231],[27,232],[130,220],[109,243],[44,231],[-55,255],[-32,232],[136,266],[152,173],[180,220],[190,186],[223,173],[109,255],[152,162],[174,151],[267,34],[174,186],[196,115],[228,70],[202,150],[157,186],[218,69],[163,-151],[-103,-196],[-283,-174],[-120,-127],[-206,92],[-229,-58],[-190,-139],[-202,-150],[-136,-174],[-38,-231],[17,-220],[130,-197],[-190,-139],[-261,-46],[-153,-197],[-163,-185],[-174,-255],[-44,-220],[98,-243],[147,-185],[229,-139],[212,-185],[114,-232],[60,-220],[82,-232],[130,-196],[82,-220],[38,-544],[81,-220],[22,-232],[87,-231],[-38,-313],[-152,-243],[-163,-197],[-370,-81],[-125,-208],[-169,-197],[-419,-220],[-370,-93],[-348,-127],[-376,-128],[-223,-243],[-446,-23],[-489,23],[-441,-46],[-468,0],[87,-232],[424,-104],[311,-162],[174,-208],[-310,-185],[-479,58],[-397,-151],[-17,-243],[-11,-232],[327,-196],[60,-220],[353,-220],[588,-93],[500,-162],[398,-185],[506,-186],[690,-92],[681,-162],[473,-174],[517,-197],[272,-278],[136,-220],[337,209],[457,173],[484,186],[577,150],[495,162],[691,12],[680,-81],[560,-139],[180,255],[386,173],[702,12],[550,127],[522,128],[577,81],[614,104],[430,150],[-196,209],[-119,208],[0,220],[-539,-23],[-571,-93],[-544,0],[-77,220],[39,440],[125,128],[397,138],[468,139],[337,174],[337,174],[251,231],[380,104],[376,81],[190,47],[430,23],[408,81],[343,116],[337,139],[305,139],[386,185],[245,197],[261,173],[82,232],[-294,139],[98,243],[185,185],[288,116],[305,139],[283,185],[217,232],[136,277],[202,163],[331,-35],[136,-197],[332,-23],[11,220],[142,231],[299,-58],[71,-220],[331,-34],[360,104],[348,69],[315,-34],[120,-243],[305,196],[283,105],[315,81],[310,81],[283,139],[310,92],[240,128],[168,208],[207,-151],[288,81],[202,-277],[157,-209],[316,116],[125,232],[283,162],[365,-35],[108,-220],[229,220],[299,69],[326,23],[294,-11],[310,-70],[300,-34],[130,-197],[180,-174],[304,104],[327,24],[315,0],[310,11],[278,81],[294,70],[245,162],[261,104],[283,58],[212,162],[152,324],[158,197],[288,-93],[109,-208],[239,-139],[289,46],[196,-208],[206,-151],[283,139],[98,255],[250,104],[289,197],[272,81],[326,116],[218,127],[228,139],[218,127],[261,-69],[250,208],[180,162],[261,-11],[229,139],[54,208],[234,162],[228,116],[278,93],[256,46],[244,-35],[262,-58],[223,-162],[27,-254],[245,-197],[168,-162],[332,-70],[185,-162],[229,-162],[266,-35],[223,116],[240,243],[261,-127],[272,-70],[261,-69],[272,-46],[277,0],[229,-614],[-11,-150],[-33,-267],[-266,-150],[-218,-220],[38,-232],[310,12],[-38,-232],[-141,-220],[-131,-243],[212,-185],[321,-58],[321,104],[153,232],[92,220],[153,185],[174,174],[70,208],[147,289],[174,58],[316,24],[277,69],[283,93],[136,231],[82,220],[190,220],[272,151],[234,115],[153,197],[157,104],[202,93],[277,-58],[250,58],[272,69],[305,-34],[201,162],[142,393],[103,-162],[131,-278],[234,-115],[266,-47],[267,70],[283,-46],[261,-12],[174,58],[234,-35],[212,-127],[250,81],[300,0],[255,81],[289,-81],[185,197],[141,196],[191,163],[348,439],[179,-81],[212,-162],[185,-208],[354,-359],[272,-12],[256,0],[299,70],[299,81],[229,162],[190,174],[310,23],[207,127],[218,-116],[141,-185],[196,-185],[305,23],[190,-150],[332,-151],[348,-58],[288,47],[218,185],[185,185],[250,46],[251,-81],[288,-58],[261,93],[250,0],[245,-58],[256,-58],[250,104],[299,93],[283,23],[316,0],[255,58],[251,46],[76,290],[11,243],[174,-162],[49,-266],[92,-244],[115,-196],[234,-105],[315,35],[365,12],[250,35],[364,0],[262,11],[364,-23],[310,-46],[196,-186],[-54,-220],[179,-173],[299,-139],[310,-151],[360,-104],[375,-92],[283,-93],[315,-12],[180,197],[245,-162],[212,-185],[245,-139],[337,-58],[321,-69],[136,-232],[316,-139],[212,-208],[310,-93],[321,12],[299,-35],[332,12],[332,-47],[310,-81],[288,-139],[289,-116],[195,-173],[-32,-232],[-147,-208],[-125,-266],[-98,-209],[-131,-243],[-364,-93],[-163,-208],[-360,-127],[-125,-232],[-190,-220],[-201,-185],[-115,-243],[-70,-220],[-28,-266],[6,-220],[158,-232],[60,-220],[130,-208],[517,-81],[109,-255],[-501,-93],[-424,-127],[-528,-23],[-234,-336],[-49,-278],[-119,-220],[-147,-220],[370,-196],[141,-244],[239,-219],[338,-197],[386,-186],[419,-185],[636,-185],[142,-289],[800,-128],[53,-45],[208,-175],[767,151],[636,-186],[-99520,-142]],[[69148,21851],[179,-186],[263,-74],[9,-112],[-77,-269],[-427,-38],[-7,314],[41,244],[19,121]],[[90387,26479],[269,-204],[151,81],[217,113],[166,-39],[20,-702],[-95,-203],[-29,-476],[-97,162],[-193,-412],[-57,32],[-171,19],[-171,505],[-38,390],[-160,515],[7,271],[181,-52]],[[89877,42448],[100,-464],[179,223],[92,-250],[133,-231],[-29,-262],[60,-506],[42,-295],[70,-72],[75,-505],[-27,-307],[90,-400],[301,-309],[197,-281],[186,-257],[-37,-143],[159,-371],[108,-639],[111,130],[113,-256],[68,91],[48,-626],[197,-363],[129,-226],[217,-478],[78,-475],[7,-337],[-19,-365],[132,-502],[-16,-523],[-48,-274],[-75,-527],[6,-339],[-55,-423],[-123,-538],[-205,-290],[-102,-458],[-93,-292],[-82,-510],[-107,-294],[-70,-442],[-36,-407],[14,-187],[-159,-205],[-311,-22],[-257,-242],[-127,-229],[-168,-254],[-230,262],[-170,104],[43,308],[-152,-112],[-243,-428],[-240,160],[-158,94],[-159,42],[-269,171],[-179,364],[-52,449],[-64,298],[-137,240],[-267,71],[91,287],[-67,438],[-136,-408],[-247,-109],[146,327],[42,341],[107,289],[-22,438],[-226,-504],[-174,-202],[-106,-470],[-217,243],[9,313],[-174,429],[-147,221],[52,137],[-356,358],[-195,17],[-267,287],[-498,-56],[-359,-211],[-317,-197],[-265,39],[-294,-303],[-241,-137],[-53,-309],[-103,-240],[-236,-15],[-174,-52],[-246,107],[-199,-64],[-191,-27],[-165,-315],[-81,26],[-140,-167],[-133,-187],[-203,23],[-186,0],[-295,377],[-149,113],[6,338],[138,81],[47,134],[-10,212],[34,411],[-31,350],[-147,598],[-45,337],[12,336],[-111,385],[-7,174],[-123,235],[-35,463],[-158,467],[-39,252],[122,-255],[-93,548],[137,-171],[83,-229],[-5,303],[-138,465],[-26,186],[-65,177],[31,341],[56,146],[38,295],[-29,346],[114,425],[21,-450],[118,406],[225,198],[136,252],[212,217],[126,46],[77,-73],[219,220],[168,66],[42,129],[74,54],[153,-14],[292,173],[151,262],[71,316],[163,300],[13,236],[7,321],[194,502],[117,-510],[119,118],[-99,279],[87,287],[122,-128],[34,449],[152,291],[67,233],[140,101],[4,165],[122,-69],[5,148],[122,85],[134,80],[205,-271],[155,-350],[173,-4],[177,-56],[-59,325],[133,473],[126,155],[-44,147],[121,338],[168,208],[142,-70],[234,111],[-5,302],[-204,195],[148,86],[184,-147],[148,-242],[234,-151],[79,60],[172,-182],[162,169],[105,-51],[65,113],[127,-292],[-74,-316],[-105,-239],[-96,-20],[32,-236],[-81,-295],[-99,-291],[20,-166],[221,-327],[214,-189],[143,-204],[201,-350],[78,1],[145,-151],[43,-183],[265,-200],[183,202],[55,317],[56,262],[34,324],[85,470],[-39,286],[20,171],[-32,339],[37,445],[53,120],[-43,197],[67,313],[52,325],[7,168],[104,222],[78,-289],[19,-371],[70,-71],[11,-249],[101,-300],[21,-335],[-10,-214]],[[54716,79012],[-21,-241],[-156,-2],[53,-128],[-92,-380]],[[54500,78261],[-53,-100],[-243,-14],[-140,-134],[-229,45]],[[53835,78058],[-398,153],[-62,205],[-274,-102],[-32,-113],[-169,84]],[[52900,78285],[-142,16],[-125,108],[42,145],[-10,104]],[[52665,78658],[83,33],[141,-164],[39,156],[245,-25],[199,106],[133,-18],[87,-121],[26,100],[-40,385],[100,75],[98,272]],[[53776,79457],[206,-190],[157,242],[98,44],[215,-180],[131,30],[128,-111]],[[54711,79292],[-23,-75],[28,-205]],[[62817,73469],[-190,78],[-141,273],[-44,223]],[[63495,75281],[146,-311],[141,-419],[130,-28],[85,-159],[-228,-47],[-49,-459],[-48,-207],[-101,-138],[7,-293]],[[63578,73220],[-69,-29],[-173,309],[95,292],[-82,174],[-104,-44],[-327,-436]],[[62492,74950],[68,96],[207,-169],[149,-36],[38,70],[-136,319],[72,82]],[[62890,75312],[78,-20],[191,-359],[122,-40],[48,150],[166,238]],[[58149,47921],[-17,713],[-70,268]],[[58062,48902],[169,-46],[85,336],[147,-38]],[[58463,49154],[16,-233],[60,-134],[3,-192],[-69,-124],[-108,-308],[-101,-214],[-115,-28]],[[50920,80916],[204,-47],[257,123],[176,-258],[153,-138]],[[51710,80596],[-32,-400]],[[51678,80196],[-72,-22],[-30,-331]],[[51576,79843],[-243,269],[-143,-46],[-194,279],[-129,237],[-129,10],[-40,207]],[[50698,80799],[222,117]],[[50747,54278],[-229,-69]],[[50518,54209],[-69,407],[13,1357],[-56,122],[-11,290],[-96,207],[-85,174],[35,311]],[[50249,57077],[96,67],[56,258],[136,56],[61,176]],[[50598,57634],[93,173],[100,2],[212,-340]],[[51003,57469],[-11,-197],[62,-350],[-54,-238],[29,-159],[-135,-366],[-86,-181],[-52,-372],[7,-376],[-16,-952]],[[49214,56277],[-190,152],[-130,-22],[-97,-149],[-125,125],[-49,195],[-125,129]],[[48498,56707],[-18,343],[76,250],[-7,200],[221,490],[41,405],[76,144],[134,-79],[116,120],[38,152],[216,265],[53,184],[259,246],[153,84],[70,-114],[178,3]],[[50104,59400],[-22,-286],[37,-269],[156,-386],[9,-286],[320,-134],[-6,-405]],[[50249,57077],[-243,13]],[[50006,57090],[-128,47],[-90,-96],[-123,43],[-482,-27],[-7,-336],[38,-444]],[[75742,63602],[-6,-424],[-97,90],[18,-476]],[[75657,62792],[-79,308],[-16,301],[-53,285],[-116,344],[-256,23],[25,-243],[-87,-329],[-118,120],[-41,-108],[-78,65],[-108,53]],[[74730,63611],[-43,486],[-96,444],[47,356],[-171,159],[62,215],[173,220],[-200,313],[98,401],[220,-255],[133,-30],[24,-410],[265,-81],[257,8],[160,-101],[-128,-500],[-124,-34],[-86,-336],[152,-306],[46,377],[76,2],[147,-937]],[[56293,76715],[80,-243],[108,43],[213,-92],[408,-31],[138,150],[327,138],[202,-215],[163,-62]],[[57932,76403],[-144,-245],[-101,-422],[89,-337]],[[57776,75399],[-239,79],[-283,-186]],[[57254,75292],[-3,-294],[-252,-56],[-196,206],[-222,-162],[-206,17]],[[56375,75003],[-20,391],[-139,189]],[[56216,75583],[46,84],[-30,70],[47,188],[105,185],[-135,255],[-24,216],[68,134]],[[28462,64617],[-68,-29],[-70,340],[-104,171],[60,375],[84,-23],[97,-491],[1,-343]],[[28383,66284],[-303,-95],[-19,219],[130,47],[184,-18],[8,-153]],[[28611,66290],[-48,-420],[-51,75],[4,309],[-124,234],[-1,67],[220,-265]],[[55279,77084],[100,2],[-69,-260],[134,-227],[-41,-278],[-65,-27]],[[55338,76294],[-52,-53],[-90,-138],[-41,-325]],[[55155,75778],[-246,224],[-105,247],[-106,130],[-127,221],[-61,183],[-136,277],[59,245],[99,-136],[60,123],[130,13],[239,-98],[192,8],[126,-131]],[[56523,82432],[268,-4],[302,223],[64,333],[228,190],[-26,264]],[[57359,83438],[169,100],[298,228]],[[57826,83766],[293,-149],[39,-146],[146,70],[272,-141],[27,-277],[-60,-159],[174,-387],[113,-108],[-16,-107],[187,-104],[80,-157],[-108,-129],[-224,20],[-54,-55],[66,-196],[68,-379]],[[58829,81362],[-239,-35],[-85,-129],[-18,-298],[-111,57],[-250,-28],[-73,138],[-104,-103],[-105,86],[-218,12],[-310,141],[-281,47],[-215,-14],[-152,-160],[-133,-23]],[[56535,81053],[-6,263],[-85,274],[166,121],[2,235],[-77,225],[-12,261]],[[25238,61101],[-2,87],[33,27],[51,-70],[99,357],[53,8]],[[25472,61510],[1,-87],[53,-3],[-5,-160],[-45,-256],[24,-91],[-29,-212],[18,-56],[-32,-299],[-55,-156],[-50,-19],[-55,-205]],[[25297,59966],[-83,0],[22,667],[2,468]],[[31359,37147],[-200,-81],[-109,814],[-150,663],[88,572],[-146,250],[-37,426],[-136,402]],[[30669,40193],[175,638],[-119,496],[63,199],[-49,219],[108,295],[6,503],[13,415],[60,200],[-240,951]],[[30686,44109],[206,-50],[143,13],[62,179],[243,239],[147,222],[363,100],[-29,-443],[34,-227],[-23,-396],[302,-529],[311,-98],[109,-220],[188,-117],[115,-172],[175,6],[161,-175],[12,-342],[55,-172],[3,-255],[-81,-10],[107,-688],[533,-24],[-41,-342],[30,-233],[151,-166],[66,-367],[-49,-465],[-77,-259],[27,-337],[-87,-122]],[[33842,38659],[-4,182],[-259,302],[-258,9],[-484,-172],[-133,-520],[-7,-318],[-110,-708]],[[34826,35372],[54,341],[38,350],[0,325],[-100,107],[-104,-96],[-103,26],[-33,228],[-26,541],[-52,177],[-187,160],[-114,-116],[-293,113],[18,802],[-82,329]],[[30686,44109],[-157,-102],[-126,68],[18,898],[-228,-348],[-245,15],[-105,315],[-184,34],[59,254],[-155,359],[-115,532],[73,108],[0,250],[168,171],[-28,319],[71,206],[20,275],[318,402],[227,114],[37,89],[251,-28]],[[30585,48040],[125,1620],[6,256],[-43,339],[-123,215],[1,430],[156,97],[56,-61],[9,226],[-162,61],[-4,370],[541,-13],[92,203],[77,-187],[55,-349],[52,73]],[[31423,51320],[153,-312],[216,38],[54,181],[206,138],[115,97],[32,250],[198,168],[-15,124],[-235,51],[-39,372],[12,396],[-125,153],[52,55],[206,-76],[221,-148],[80,140],[200,92],[310,221],[102,225],[-37,167]],[[33129,53652],[145,26],[64,-136],[-36,-259],[96,-90],[63,-274],[-77,-209],[-44,-502],[71,-299],[20,-274],[171,-277],[137,-29],[30,116],[88,25],[126,104],[90,157],[154,-50],[67,21]],[[34294,51702],[151,-48],[25,120],[-46,118],[28,171],[112,-53],[131,61],[159,-125]],[[34854,51946],[121,-122],[86,160],[62,-25],[38,-166],[133,42],[107,224],[85,436],[164,540]],[[35650,53035],[95,28],[69,-327],[155,-1033],[149,-97],[7,-408],[-208,-487],[86,-178],[491,-92],[10,-593],[211,388],[349,-212],[462,-361],[135,-346],[-45,-327],[323,182],[540,-313],[415,23],[411,-489],[355,-662],[214,-170],[237,-24],[101,-186],[94,-752],[46,-358],[-110,-977],[-142,-385],[-391,-822],[-177,-668],[-206,-513],[-69,-11],[-78,-435],[20,-1107],[-77,-910],[-30,-390],[-88,-233],[-49,-790],[-282,-771],[-47,-610],[-225,-256],[-65,-355],[-302,2],[-437,-227],[-195,-263],[-311,-173],[-327,-470],[-235,-586],[-41,-441],[46,-326],[-51,-597],[-63,-289],[-195,-325],[-308,-1040],[-244,-468],[-189,-277],[-127,-562],[-183,-337]],[[35174,30629],[-77,334],[122,280],[-160,402],[-218,327],[-286,379],[-103,-18],[-279,457],[-180,-63]],[[81723,53254],[110,221],[236,323]],[[82069,53798],[-13,-291],[-16,-377],[-133,19],[-58,-202],[-126,307]],[[75471,66988],[113,-189],[-20,-363],[-227,-17],[-234,39],[-175,-92],[-252,224],[-6,119]],[[74670,66709],[184,439],[150,150],[198,-137],[147,-14],[122,-159]],[[58175,37528],[-393,-435],[-249,-442],[-93,-393],[-83,-222],[-152,-47],[-48,-283],[-28,-184],[-178,-138],[-226,29],[-133,166],[-117,71],[-135,-137],[-68,-283],[-132,-177],[-139,-264],[-199,-60],[-62,207],[26,360],[-165,562],[-75,88]],[[55526,35946],[0,1725],[274,20],[8,2105],[207,19],[428,207],[106,-243],[177,231],[85,2],[156,133]],[[56967,40145],[50,-44]],[[57017,40101],[107,-473],[56,-105],[87,-342],[315,-649],[119,-64],[0,-208],[82,-375],[215,-90],[177,-267]],[[54244,54965],[229,44],[52,152],[46,-11],[69,-134],[350,226],[118,230],[145,207],[-28,208],[78,54],[269,-36],[261,273],[201,645],[141,239],[176,101]],[[56351,57163],[31,-253],[160,-369],[1,-241],[-45,-246],[18,-184],[96,-170]],[[56612,55700],[212,-258]],[[56824,55442],[152,-239],[2,-192],[187,-308],[116,-255],[70,-355],[208,-234],[44,-187]],[[57603,53672],[-91,-63],[-178,14],[-209,62],[-104,-51],[-41,-143],[-90,-18],[-110,125],[-309,-295],[-127,60],[-38,-46],[-83,-357],[-207,115],[-203,59],[-177,218],[-229,200],[-149,-190],[-108,-300],[-25,-412]],[[55125,52650],[-178,33],[-188,99],[-166,-313],[-146,-550]],[[54447,51919],[-29,172],[-12,269],[-127,190],[-103,305],[-23,212],[-132,309],[23,176],[-28,249],[21,458],[67,107],[140,599]],[[32315,78082],[202,-79],[257,16],[-137,-242],[-102,-38],[-353,250],[-69,198],[105,183],[97,-288]],[[32831,79592],[-135,-11],[-360,186],[-258,279],[96,49],[365,-148],[284,-247],[8,-108]],[[15692,79240],[-140,-82],[-456,269],[-84,209],[-248,207],[-50,168],[-286,107],[-107,321],[24,137],[291,-129],[171,-89],[261,-63],[94,-204],[138,-280],[277,-244],[115,-327]],[[34407,80527],[-184,-517],[181,199],[187,-126],[-98,-206],[247,-162],[128,144],[277,-182],[-86,-433],[194,101],[36,-313],[86,-367],[-117,-520],[-125,-22],[-183,111],[60,484],[-77,75],[-322,-513],[-166,21],[196,277],[-267,144],[-298,-35],[-539,18],[-43,175],[173,208],[-121,160],[234,356],[287,941],[172,336],[241,204],[129,-26],[-54,-160],[-148,-372]],[[13005,82584],[131,-76],[267,47],[-84,-671],[242,-475],[-111,1],[-167,270],[-103,272],[-140,184],[-51,260],[16,188]],[[27981,87304],[-108,-310],[-123,50],[-73,176],[13,41],[107,177],[114,-13],[70,-121]],[[27250,87631],[-325,-326],[-196,13],[-61,160],[207,273],[381,-6],[-6,-114]],[[26344,89371],[51,-259],[143,91],[161,-155],[304,-203],[318,-184],[25,-281],[204,46],[199,-196],[-247,-186],[-432,142],[-156,266],[-275,-314],[-396,-306],[-95,346],[-377,-57],[242,292],[35,465],[95,542],[201,-49]],[[28926,90253],[-312,-30],[-69,289],[118,331],[255,82],[217,-163],[3,-253],[-32,-82],[-180,-174]],[[23431,91410],[-173,-207],[-374,179],[-226,-65],[-380,266],[245,183],[194,256],[295,-168],[166,-106],[84,-112],[169,-226]],[[31350,77248],[-181,334],[0,805],[-123,171],[-187,-100],[-92,155],[-212,-446],[-84,-460],[-99,-269],[-118,-91],[-89,-30],[-28,-146],[-512,0],[-422,-4],[-125,-109],[-294,-425],[-34,-46],[-89,-231],[-255,1],[-273,-3],[-125,-93],[44,-116],[25,-181],[-5,-60],[-363,-293],[-286,-93],[-323,-316],[-70,0],[-94,93],[-31,85],[6,61],[61,207],[131,325],[81,349],[-56,514],[-59,536],[-290,277],[35,105],[-41,73],[-76,0],[-56,93],[-14,140],[-54,-61],[-75,18],[17,59],[-65,58],[-27,155],[-216,189],[-224,197],[-272,229],[-261,214],[-248,-167],[-91,-6],[-342,154],[-225,-77],[-269,183],[-284,94],[-194,36],[-86,100],[-49,325],[-94,-3],[-1,-227],[-575,0],[-951,0],[-944,0],[-833,0],[-834,0],[-819,0],[-847,0],[-273,0],[-825,0],[-788,0]],[[15878,79530],[-38,1],[-537,581],[-199,255],[-503,244],[-155,523],[40,363],[-356,252],[-48,476],[-336,429],[-6,304]],[[13740,82958],[154,285],[-7,373],[-473,376],[-284,674],[-173,424],[-255,266],[-187,242],[-147,306],[-279,-192],[-270,-330],[-247,388],[-194,259],[-271,164],[-273,17],[1,3364],[2,2193]],[[10837,91767],[518,-142],[438,-285],[289,-54],[244,247],[336,184],[413,-72],[416,259],[455,148],[191,-245],[207,138],[62,278],[192,-63],[470,-530],[369,401],[38,-449],[341,97],[105,173],[337,-34],[424,-248],[650,-217],[383,-100],[272,38],[374,-300],[-390,-293],[502,-127],[750,70],[236,103],[296,-354],[302,299],[-283,251],[179,202],[338,27],[223,59],[224,-141],[279,-321],[310,47],[491,-266],[431,94],[405,-14],[-32,367],[247,103],[431,-200],[-2,-559],[177,471],[223,-16],[126,594],[-298,364],[-324,239],[22,653],[329,429],[366,-95],[281,-261],[378,-666],[-247,-290],[517,-120],[-1,-604],[371,463],[332,-380],[-83,-438],[269,-399],[290,427],[202,510],[16,649],[394,-46],[411,-87],[373,-293],[17,-293],[-207,-315],[196,-316],[-36,-288],[-544,-413],[-386,-91],[-287,178],[-83,-297],[-268,-498],[-81,-259],[-322,-399],[-397,-39],[-220,-250],[-18,-384],[-323,-74],[-340,-479],[-301,-665],[-108,-466],[-16,-686],[409,-99],[125,-553],[130,-448],[388,117],[517,-256],[277,-225],[199,-279],[348,-163],[294,-248],[459,-34],[302,-58],[-45,-511],[86,-594],[201,-661],[414,-561],[214,192],[150,607],[-145,934],[-196,311],[445,276],[314,415],[154,411],[-23,395],[-188,502],[-338,445],[328,619],[-121,535],[-93,922],[194,137],[476,-161],[286,-57],[230,155],[258,-200],[342,-343],[85,-229],[495,-45],[-8,-496],[92,-747],[254,-92],[201,-348],[402,328],[266,652],[184,274],[216,-527],[362,-754],[307,-709],[-112,-371],[370,-333],[250,-338],[442,-152],[179,-189],[110,-500],[216,-78],[112,-223],[20,-664],[-202,-222],[-199,-207],[-458,-210],[-349,-486],[-470,-96],[-594,125],[-417,4],[-287,-41],[-233,-424],[-354,-262],[-401,-782],[-320,-545],[236,97],[446,776],[583,493],[415,58],[246,-289],[-262,-397],[88,-637],[91,-446],[361,-295],[459,86],[278,664],[19,-429],[180,-214],[-344,-387],[-615,-351],[-276,-239],[-310,-426],[-211,44],[-11,500],[483,488],[-445,-19],[-309,-72]],[[18287,93781],[-139,-277],[618,179],[386,-298],[314,302],[254,-194],[227,-580],[140,244],[-197,606],[244,86],[276,-94],[311,-239],[175,-575],[86,-417],[466,-293],[502,-279],[-31,-260],[-456,-48],[178,-227],[-94,-217],[-503,93],[-478,160],[-322,-36],[-522,-201],[-704,-88],[-494,-56],[-151,279],[-379,161],[-246,-66],[-343,468],[185,62],[429,101],[392,-26],[362,103],[-537,138],[-594,-47],[-394,12],[-146,217],[644,237],[-428,-9],[-485,156],[233,443],[193,235],[744,359],[284,-114]],[[20972,93958],[-244,-390],[-434,413],[95,83],[372,24],[211,-130]],[[28794,93770],[25,-163],[-296,17],[-299,13],[-304,-80],[-80,36],[-306,313],[12,213],[133,39],[636,-63],[479,-325]],[[25955,93803],[219,-369],[256,477],[704,242],[477,-611],[-42,-387],[550,172],[263,235],[616,-299],[383,-282],[36,-258],[515,134],[290,-376],[670,-234],[242,-238],[263,-553],[-510,-275],[654,-386],[441,-130],[400,-543],[437,-39],[-87,-414],[-487,-687],[-342,253],[-437,568],[-359,-74],[-35,-338],[292,-344],[377,-272],[114,-157],[181,-584],[-96,-425],[-350,160],[-697,473],[393,-509],[289,-357],[45,-206],[-753,236],[-596,343],[-337,287],[97,167],[-414,304],[-405,286],[5,-171],[-803,-94],[-235,203],[183,435],[522,10],[571,76],[-92,211],[96,294],[360,576],[-77,261],[-107,203],[-425,286],[-563,201],[178,150],[-294,367],[-245,34],[-219,201],[-149,-175],[-503,-76],[-1011,132],[-588,174],[-450,89],[-231,207],[290,270],[-394,2],[-88,599],[213,528],[286,241],[717,158],[-204,-382]],[[22123,94208],[331,-124],[496,75],[72,-172],[-259,-283],[420,-254],[-50,-532],[-455,-229],[-268,50],[-192,225],[-690,456],[5,189],[567,-73],[-306,386],[329,286]],[[24112,93575],[-298,-442],[-317,22],[-173,519],[4,294],[145,251],[276,161],[579,-20],[530,-144],[-415,-526],[-331,-115]],[[16539,92755],[-731,-285],[-147,259],[-641,312],[119,250],[192,432],[241,388],[-272,362],[939,93],[397,-123],[709,-33],[270,-171],[298,-249],[-349,-149],[-681,-415],[-344,-414],[0,-257]],[[23996,94879],[-151,-229],[-403,44],[-337,155],[148,266],[399,159],[243,-208],[101,-187]],[[22639,95907],[212,-273],[9,-303],[-127,-440],[-458,-60],[-298,94],[5,345],[-455,-46],[-18,457],[299,-18],[419,201],[390,-34],[22,77]],[[19941,95601],[109,-210],[247,99],[291,-26],[49,-289],[-169,-281],[-940,-91],[-701,-256],[-423,-14],[-35,193],[577,261],[-1255,-70],[-389,106],[379,577],[262,165],[782,-199],[493,-350],[485,-45],[-397,565],[255,215],[286,-68],[94,-282]],[[23699,96131],[308,-190],[547,1],[240,-194],[-64,-222],[319,-134],[177,-140],[374,-26],[406,-50],[441,128],[566,51],[451,-42],[298,-223],[62,-244],[-174,-157],[-414,-127],[-355,72],[-797,-91],[-570,-11],[-449,73],[-738,190],[-96,325],[-34,293],[-279,258],[-574,72],[-322,183],[104,242],[573,-37]],[[17722,96454],[-38,-454],[-214,-205],[-259,-29],[-517,-252],[-444,-91],[-377,128],[472,442],[570,383],[426,-9],[381,87]],[[23933,96380],[-126,-17],[-521,38],[-74,165],[559,-9],[195,-109],[-33,-68]],[[19392,96485],[-518,-170],[-411,191],[224,188],[406,60],[392,-92],[-93,-177]],[[19538,97019],[-339,-115],[-461,1],[5,84],[285,177],[149,-27],[361,-120]],[[23380,96697],[-411,-122],[-226,138],[-119,221],[-22,245],[360,-24],[162,-39],[332,-205],[-76,-214]],[[22205,96856],[108,-247],[-453,66],[-457,192],[-619,21],[268,176],[-335,142],[-21,227],[546,-81],[751,-215],[212,-281]],[[25828,97644],[334,-190],[-381,-176],[-513,-445],[-492,-42],[-575,76],[-299,240],[4,215],[220,157],[-508,-4],[-306,196],[-176,268],[193,262],[192,180],[285,42],[-122,135],[646,30],[355,-315],[468,-127],[455,-112],[220,-390]],[[30972,99681],[742,-47],[597,-75],[508,-161],[-12,-157],[-678,-257],[-672,-119],[-251,-133],[605,3],[-656,-358],[-452,-167],[-476,-483],[-573,-98],[-177,-120],[-841,-64],[383,-74],[-192,-105],[230,-292],[-264,-202],[-429,-167],[-132,-232],[-388,-176],[39,-134],[475,23],[6,-144],[-742,-355],[-726,163],[-816,-91],[-414,71],[-525,31],[-35,284],[514,133],[-137,427],[170,41],[742,-255],[-379,379],[-450,113],[225,229],[492,141],[79,206],[-392,231],[-118,304],[759,-26],[220,-64],[433,216],[-625,68],[-972,-38],[-491,201],[-232,239],[-324,173],[-61,202],[413,112],[324,19],[545,96],[409,220],[344,-30],[300,-166],[211,319],[367,95],[498,65],[849,24],[148,-63],[802,100],[601,-38],[602,-37]],[[52900,78285],[-22,-242],[-122,-100],[-206,75],[-60,-239],[-132,-19],[-48,94],[-156,-200],[-134,-28],[-120,126]],[[51900,77752],[-95,259],[-133,-92],[5,267],[203,332],[-9,150],[126,-54],[77,101]],[[52074,78715],[236,-4],[57,128],[298,-181]],[[31400,18145],[-92,-239],[-238,-183],[-137,19],[-164,48],[-202,177],[-291,86],[-350,330],[-283,317],[-383,662],[229,-124],[390,-395],[369,-212],[143,271],[90,405],[256,244],[198,-70]],[[30952,19680],[-247,4],[-134,-145],[-250,-213],[-45,-552],[-118,-14],[-313,192],[-318,412],[-346,338],[-87,374],[79,346],[-140,393],[-36,1007],[119,568],[293,457],[-422,172],[265,522],[94,982],[309,-208],[145,1224],[-186,157],[-87,-738],[-175,83],[87,845],[95,1095],[127,404],[-80,576],[-22,666],[117,19],[170,954],[192,945],[118,881],[-64,885],[83,487],[-34,730],[163,721],[50,1143],[89,1227],[87,1321],[-20,967],[-58,832]],[[30452,39739],[143,151],[74,303]],[[80649,61615],[-240,-284],[-228,183],[-8,509],[137,267],[304,166],[159,-14],[62,-226],[-122,-260],[-64,-341]],[[86288,75628],[-179,348],[-111,-331],[-429,-254],[44,-312],[-241,22],[-131,185],[-191,-419],[-306,-318],[-227,-379]],[[84517,74170],[-388,-171],[-204,-277],[-300,-161],[148,274],[-58,230],[220,397],[-147,310],[-242,-209],[-314,-411],[-171,-381],[-272,-29],[-142,-275],[147,-400],[227,-97],[9,-265],[220,-173],[311,422],[247,-230],[179,-15],[45,-310],[-393,-165],[-130,-319],[-270,-296],[-142,-414],[299,-325],[109,-581],[169,-541],[189,-454],[-5,-439],[-174,-161],[66,-315],[164,-184],[-43,-481],[-71,-468],[-155,-53],[-203,-640],[-225,-775],[-258,-705],[-382,-545],[-386,-498],[-313,-68],[-170,-262],[-96,192],[-157,-294],[-388,-296],[-294,-90],[-95,-624],[-154,-35],[-73,429],[66,228],[-373,189],[-131,-96]],[[80013,63313],[-280,154],[-132,240],[44,340],[-254,108],[-134,222],[-236,-315],[-271,-68],[-221,3],[-149,-145]],[[78380,63852],[-144,-86],[42,-676],[-148,16],[-25,139]],[[78105,63245],[-9,244],[-203,-172],[-121,109],[-206,222],[81,490],[-176,115],[-66,544],[-293,-98],[33,701],[263,493],[11,487],[-8,452],[-121,141],[-93,348],[-162,-44]],[[77035,67277],[-300,89],[94,248],[-130,367],[-198,-249],[-233,145],[-321,-376],[-252,-439],[-224,-74]],[[74670,66709],[-23,465],[-170,-124]],[[74477,67050],[-324,57],[-314,136],[-225,259],[-216,117],[-93,284],[-157,84],[-280,385],[-223,182],[-115,-141]],[[72530,68413],[-386,413],[-273,374],[-78,651],[200,-79],[9,301],[-111,303],[28,482],[-298,692]],[[71621,71550],[-457,239],[-82,454],[-205,276]],[[70827,72688],[-42,337],[10,230],[-169,134],[-91,-59],[-70,546]],[[70465,73876],[79,136],[-39,138],[266,279],[192,116],[294,-80],[105,378],[356,70],[99,234],[438,320],[39,134]],[[72294,75601],[-22,337],[190,154],[-250,1026],[550,236],[143,131],[200,1058],[551,-194],[155,267],[13,592],[230,56],[212,393]],[[74266,79657],[109,49]],[[74375,79706],[73,-413],[233,-313],[396,-222],[192,-476],[-107,-690],[100,-256],[330,-101],[374,-83],[336,-368],[171,-66],[127,-544],[163,-351],[306,14],[574,-133],[369,82],[274,-88],[411,-359],[336,1],[123,-184],[324,318],[448,205],[417,22],[324,208],[200,316],[194,199],[-45,195],[-89,227],[146,381],[156,-53],[286,-120],[277,313],[423,229],[204,391],[195,168],[404,78],[219,-66],[30,210],[-251,413],[-223,189],[-214,-219],[-274,92],[-157,-74],[-72,241],[197,590],[135,446]],[[82410,80055],[333,-223],[392,373],[-3,260],[251,627],[155,189],[-4,326],[-152,141],[229,294],[345,106],[369,16],[415,-176],[244,-217],[172,-596],[104,-254],[97,-363],[103,-579],[483,-189],[329,-420],[112,-555],[423,-1],[240,233],[459,175],[-146,-532],[-107,-216],[-96,-647],[-186,-575],[-338,104],[-238,-208],[73,-506],[-40,-698],[-142,-16],[2,-300]],[[49206,53531],[-126,-7],[-194,116],[-178,-7],[-329,-103],[-193,-170],[-275,-217],[-54,15]],[[47857,53158],[22,487],[26,74],[-8,233],[-118,247],[-88,40],[-81,162],[60,262],[-28,286],[13,172]],[[47655,55121],[44,0],[17,258],[-22,114],[27,82],[103,71],[-69,473],[-64,245],[23,200],[55,46]],[[47769,56610],[36,54],[77,-89],[215,-5],[51,172],[48,-11],[80,67],[43,-253],[65,74],[114,88]],[[49214,56277],[74,-841],[-117,-496],[-73,-667],[121,-509],[-13,-233]],[[53632,51919],[-35,32],[-164,-76],[-169,79],[-132,-38]],[[53132,51916],[-452,13]],[[52680,51929],[40,466],[-108,391],[-127,100],[-56,265],[-72,85],[4,163]],[[52361,53399],[71,418],[132,570],[81,6],[165,345],[105,10],[156,-243],[191,199],[26,246],[63,238],[43,299],[148,243],[56,414],[59,132],[39,307],[74,377],[234,457],[14,196],[31,107],[-110,235]],[[53939,57955],[9,188],[78,34]],[[54026,58177],[111,-378],[18,-392],[-10,-393],[151,-537],[-155,6],[-78,-42],[-127,60],[-60,-279],[164,-345],[121,-100],[39,-245],[87,-407],[-43,-160]],[[54447,51919],[-20,-319],[-220,140],[-225,156],[-350,23]],[[58564,52653],[-16,-691],[111,-80],[-89,-210],[-107,-157],[-106,-308],[-59,-274],[-15,-475],[-65,-225],[-2,-446]],[[58216,49787],[-80,-165],[-10,-351],[-38,-46],[-26,-323]],[[58149,47921],[50,-544],[-27,-307]],[[58172,47070],[55,-343],[161,-330]],[[58388,46397],[150,-745]],[[58538,45652],[-109,60],[-373,-99],[-75,-71],[-79,-377],[62,-261],[-49,-699],[-34,-593],[75,-105],[194,-230],[76,107],[23,-637],[-212,5],[-114,325],[-103,252],[-213,82],[-62,310],[-170,-187],[-222,83],[-93,268],[-176,55],[-131,-15],[-15,184],[-96,15]],[[53422,46976],[-39,183]],[[53609,47755],[73,-60],[95,226],[152,-6],[17,-167],[104,-105],[164,370],[161,289],[71,189],[-10,486],[121,574],[127,304],[183,285],[32,189],[7,216],[45,205],[-14,335],[34,524],[55,368],[83,316],[16,357]],[[57603,53672],[169,-488],[124,-71],[75,99],[128,-39],[155,125],[66,-252],[244,-393]],[[53309,47603],[-228,626]],[[53081,48229],[212,326],[-105,391],[95,148],[187,73],[23,261],[148,-283],[245,-25],[85,279],[36,393],[-31,461],[-131,350],[120,684],[-69,117],[-207,-48],[-78,305],[21,258]],[[29063,50490],[-119,140],[-137,195],[-79,-94],[-235,82],[-68,255],[-52,-10],[-278,338]],[[28095,51396],[-37,183],[103,44],[-12,296],[65,214],[138,40],[117,371],[106,310],[-102,141],[52,343],[-62,540],[59,155],[-44,500],[-112,315]],[[28366,54848],[36,287],[89,-43],[52,176],[-64,348],[34,86]],[[28513,55702],[143,-18],[209,412],[114,63],[3,195],[51,500],[159,274],[175,11],[22,123],[218,-49],[218,298],[109,132],[134,285],[98,-36],[73,-156],[-54,-199]],[[30185,57537],[-178,-99],[-71,-295],[-107,-169],[-81,-220],[-34,-422],[-77,-345],[144,-40],[35,-271],[62,-130],[21,-238],[-33,-219],[10,-123],[69,-49],[66,-207],[357,57],[161,-75],[196,-508],[112,63],[200,-32],[158,68],[99,-102],[-50,-318],[-62,-199],[-22,-423],[56,-393],[79,-175],[9,-133],[-140,-294],[100,-130],[74,-207],[85,-589]],[[30585,48040],[-139,314],[-83,14],[179,602],[-213,276],[-166,-51],[-101,103],[-153,-157],[-207,74],[-163,620],[-129,152],[-89,279],[-184,280],[-74,-56]],[[26954,55439],[-151,131],[-56,124],[32,103],[-11,130],[-77,142],[-109,116],[-95,76],[-19,173],[-73,105],[18,-172],[-55,-141],[-64,164],[-89,58],[-38,120],[2,179],[36,187],[-78,83],[64,114]],[[26191,57131],[42,76],[183,-156],[63,77],[89,-50],[46,-121],[82,-40],[66,126]],[[26762,57043],[70,-321],[108,-238],[130,-252]],[[27070,56232],[-107,-53],[1,-238],[58,-88],[-41,-70],[10,-107],[-23,-120],[-14,-117]],[[27147,64280],[240,-42],[219,-7],[261,-201],[110,-216],[260,66],[98,-138],[235,-366],[173,-267],[92,8],[165,-120],[-20,-167],[205,-24],[210,-242],[-33,-138],[-185,-75],[-187,-29],[-191,46],[-398,-57],[186,329],[-113,154],[-179,39],[-96,171],[-66,336],[-157,-23],[-259,159],[-83,124],[-362,91],[-97,115],[104,148],[-273,30],[-199,-307],[-115,-8],[-40,-144],[-138,-65],[-118,56],[146,183],[60,213],[126,131],[142,116],[210,56],[67,65]],[[59092,71341],[19,3],[40,143],[200,-8],[253,176],[-188,-251],[21,-111]],[[59437,71293],[-30,21],[-53,-45],[-42,12],[-14,-22],[-5,59],[-20,37],[-54,6],[-75,-51],[-52,31]],[[59437,71293],[8,-48],[-285,-240],[-136,77],[-64,237],[132,22]],[[53776,79457],[-157,254],[-141,142],[-30,249],[-49,176],[202,129],[103,147],[200,114],[70,113],[73,-68],[124,62]],[[54171,80775],[132,-191],[207,-51],[-17,-163],[151,-122],[41,153],[191,-66],[26,-185],[207,-36],[127,-291]],[[55236,79823],[-82,-1],[-43,-106],[-64,-26],[-18,-134],[-54,-28],[-7,-55],[-95,-61],[-123,10],[-39,-130]],[[52756,83065],[4,-228],[281,-138],[-3,-210],[283,111],[156,162],[313,-233],[132,-189]],[[53922,82340],[64,-300],[-77,-158],[101,-210],[69,-316],[-22,-204],[114,-377]],[[52074,78715],[35,421],[140,404],[-400,109],[-131,155]],[[51718,79804],[16,259],[-56,133]],[[51710,80596],[-47,619],[167,0],[70,222],[69,541],[-51,200]],[[51918,82178],[54,125],[232,32],[52,-130],[188,291],[-63,222],[-13,335]],[[52368,83053],[210,-78],[178,90]],[[61966,58083],[66,-183],[-9,-245],[-158,-142],[119,-161]],[[61984,57352],[-102,-317]],[[61882,57035],[-62,106],[-67,-42],[-155,10],[-4,180],[-22,163],[94,277],[98,261]],[[61764,57990],[119,-51],[83,144]],[[53524,83435],[-166,-478],[-291,333],[-39,246],[408,195],[88,-296]],[[52368,83053],[-113,328],[-8,604],[46,159],[80,177],[244,37],[98,163],[223,167],[-9,-304],[-82,-192],[33,-166],[151,-89],[-68,-223],[-83,64],[-200,-425],[76,-288]],[[30080,62227],[34,101],[217,-3],[165,-152],[73,15],[50,-209],[152,11],[-9,-176],[124,-21],[136,-217],[-103,-240],[-132,128],[-127,-25],[-92,28],[-50,-107],[-106,-37],[-43,144],[-92,-85],[-111,-405],[-71,94],[-14,170]],[[30081,61241],[5,161],[-71,177],[68,99],[21,228],[-24,321]],[[53333,64447],[-952,-1126],[-804,-1161],[-392,-263]],[[51185,61897],[-308,-58],[-3,376],[-129,96],[-173,169],[-66,277],[-937,1289],[-937,1289]],[[48632,65335],[-1045,1431]],[[47587,66766],[6,114],[-1,40]],[[47592,66920],[-2,700],[449,436],[277,90],[227,159],[107,295],[324,234],[12,438],[161,51],[126,219],[363,99],[51,230],[-73,125],[-96,624],[-17,359],[-104,379]],[[49397,71358],[267,323],[300,102],[175,244],[268,180],[471,105],[459,48],[140,-87],[262,232],[297,5],[113,-137],[190,35]],[[52339,72408],[-57,-303],[44,-563],[-65,-487],[-171,-330],[24,-445],[227,-352],[3,-143],[171,-238],[118,-1061]],[[52633,68486],[90,-522],[15,-274],[-49,-482],[21,-270],[-36,-323],[24,-371],[-110,-247],[164,-431],[11,-253],[99,-330],[130,109],[219,-275],[122,-370]],[[27693,48568],[148,442],[-60,258],[-106,-275],[-166,259],[56,167],[-47,536],[97,89],[52,368],[105,381],[-20,241],[153,126],[190,236]],[[29063,50490],[38,-449],[-86,-384],[-303,-619],[-334,-233],[-170,-514],[-53,-398],[-157,-243],[-116,298],[-113,64],[-114,-47],[-8,216],[79,141],[-33,246]],[[59700,68010],[-78,-238],[-60,-446],[-75,-308],[-65,-103],[-93,191],[-125,263],[-198,847],[-29,-53],[115,-624],[171,-594],[210,-920],[102,-321],[90,-334],[249,-654],[-55,-103],[9,-384],[323,-530],[49,-121]],[[60240,63578],[-1102,0],[-1077,0],[-1117,0]],[[56944,63578],[0,2175],[0,2101],[-83,476],[71,365],[-43,253],[101,283]],[[56990,69231],[369,10],[268,-156],[275,-175],[129,-92],[214,188],[114,169],[245,49],[198,-75],[75,-293],[65,193],[222,-140],[217,-33],[137,149]],[[59518,69025],[182,-1015]],[[61764,57990],[-95,191],[-114,346],[-124,190],[-71,204],[-242,237],[-191,7],[-67,124],[-163,-139],[-168,268],[-87,-441],[-323,124]],[[60119,59101],[-30,236],[120,868],[27,393],[88,181],[204,97],[141,337]],[[60669,61213],[161,-684],[77,-542],[152,-288],[379,-558],[154,-336],[151,-341],[87,-203],[136,-178]],[[47490,75324],[14,420],[-114,257],[393,426],[340,-106],[373,3],[296,-101],[230,31],[449,-19]],[[49471,76235],[111,-230],[511,-268],[101,127],[313,-267],[322,77]],[[50829,75674],[15,-344],[-263,-393],[-356,-125],[-25,-199],[-171,-327],[-107,-481],[108,-338],[-160,-263],[-60,-384],[-210,-118],[-197,-454],[-352,-9],[-265,11],[-174,-209],[-106,-223],[-136,49],[-103,199],[-79,340],[-259,92]],[[47929,72498],[-23,195],[103,222],[38,161],[-96,175],[77,388],[-111,355],[120,48],[11,280],[45,86],[3,461],[129,160],[-78,296],[-162,21],[-47,-75],[-164,0],[-70,289],[-113,-86],[-101,-150]],[[56753,84725],[32,349],[-102,-75],[-176,210],[-24,340],[351,164],[350,86],[301,-97],[287,17]],[[57772,85719],[42,-103],[-198,-341],[83,-551],[-120,-187]],[[57579,84537],[-229,1],[-239,219],[-121,73],[-237,-105]],[[61882,57035],[-61,-209],[103,-325],[102,-285],[106,-210],[909,-702],[233,4]],[[63274,55308],[-785,-1773],[-362,-26],[-247,-417],[-178,-11],[-76,-186]],[[61626,52895],[-190,0],[-112,200],[-254,-247],[-82,-247],[-185,47],[-62,68],[-65,-16],[-87,6],[-352,502],[-193,0],[-95,194],[0,332],[-145,99]],[[59804,53833],[-164,643],[-127,137],[-48,236],[-141,288],[-171,42],[95,337],[147,14],[42,181]],[[59437,55711],[-4,531]],[[59433,56242],[82,618],[132,166],[28,241],[119,451],[168,293],[112,582],[45,508]],[[57942,91385],[-41,-414],[425,-394],[-256,-445],[323,-673],[-187,-506],[250,-440],[-113,-385],[411,-405],[-105,-301],[-258,-341],[-594,-755]],[[57797,86326],[-504,-47],[-489,-216],[-452,-125],[-161,323],[-269,193],[62,582],[-135,533],[133,345],[252,371],[635,640],[185,124],[-28,250],[-387,279]],[[56639,89578],[-93,230],[-8,910],[-433,402],[-371,289]],[[55734,91409],[167,156],[309,-312],[362,29],[298,-143],[265,262],[137,433],[431,200],[356,-235],[-117,-414]],[[99547,40335],[96,-171],[-46,-308],[-172,-81],[-153,73],[-27,260],[107,203],[126,-74],[69,98]],[[0,41087],[57,27],[-34,-284],[-23,-32],[99822,-145],[-177,-124],[-36,220],[139,121],[88,33],[-99836,184]],[[33000,19946],[333,354],[236,-148],[167,237],[222,-266],[-83,-207],[-375,-177],[-125,207],[-236,-266],[-139,266]],[[34854,51946],[70,252],[24,269],[48,253],[-107,349]],[[34889,53069],[-22,404],[144,508]],[[35011,53981],[95,-65],[204,-140],[294,-499],[46,-242]],[[52655,75484],[-92,-456],[-126,120],[-64,398],[56,219],[179,226],[47,-507]],[[51576,79843],[62,-52],[80,13]],[[51900,77752],[-11,-167],[82,-222],[-97,-180],[72,-457],[151,-75],[-32,-256]],[[52065,76395],[-252,-334],[-548,160],[-404,-192],[-32,-355]],[[49471,76235],[144,354],[53,1177],[-287,620],[-205,299],[-424,227],[-28,431],[360,129],[466,-152],[-88,669],[263,-254],[646,461],[84,484],[243,119]],[[53081,48229],[-285,596],[-184,488],[-169,610],[9,196],[61,189],[67,430],[56,438]],[[52636,51176],[94,35],[404,-6],[-2,711]],[[48278,82406],[-210,122],[-172,-9],[57,317],[-57,317]],[[47896,83153],[233,24],[298,-365],[-149,-406]],[[49165,85222],[-297,-639],[283,81],[304,-3],[-72,-481],[-250,-530],[287,-38],[22,-62],[248,-697],[190,-95],[171,-673],[79,-233],[337,-113],[-34,-378],[-142,-173],[111,-305],[-250,-310],[-371,6],[-473,-163],[-130,116],[-183,-276],[-257,67],[-195,-226],[-148,118],[407,621],[249,127],[-2,1],[-434,98],[-79,235],[291,183],[-152,319],[52,387],[413,-54],[1,0],[40,343],[-186,364],[-4,8],[-337,104],[-66,160],[101,264],[-92,163],[-149,-279],[-17,569],[-140,301],[101,611],[216,480],[222,-47],[335,49]],[[61542,75120],[42,252],[-70,403],[-160,218],[-154,68],[-102,181]],[[61098,76242],[34,70],[235,-101],[409,-96],[378,-283],[48,-110],[169,93],[259,-124],[85,-242],[175,-137]],[[62106,74858],[-268,290],[-296,-28]],[[50294,54083],[-436,-346],[-154,-203],[-250,-171],[-248,168]],[[50006,57090],[-20,-184],[116,-305],[-1,-429],[27,-466],[69,-215],[-61,-532],[22,-294],[74,-375],[62,-207]],[[47655,55121],[-78,15],[-57,-238],[-78,3],[-55,126],[19,237],[-116,362],[-73,-67],[-59,-13]],[[47158,55546],[-77,-34],[3,217],[-44,155],[9,171],[-60,249],[-78,211],[-222,1],[-65,-112],[-76,-13],[-48,-128],[-32,-163],[-148,-260]],[[46320,55840],[-122,349],[-108,232],[-71,76],[-69,118],[-32,261],[-41,130],[-80,97]],[[45797,57103],[123,288],[84,-11],[73,99],[61,1],[44,78],[-24,196],[31,62],[5,200]],[[46194,58016],[134,-6],[200,-144],[61,13],[21,66],[151,-47],[40,33]],[[46801,57931],[16,-216],[44,1],[73,78],[46,-19],[77,-150],[119,-48],[76,128],[90,79],[67,83],[55,-15],[62,-130],[33,-163],[114,-248],[-57,-152],[-11,-192],[59,58],[35,-69],[-15,-176],[85,-170]],[[45321,58350],[36,262]],[[45357,58612],[302,17],[63,140],[88,9],[110,-145],[86,-3],[92,99],[56,-170],[-120,-133],[-121,11],[-119,124],[-103,-136],[-50,-5],[-67,-83],[-253,13]],[[45797,57103],[-149,247],[-117,39],[-63,166],[1,90],[-84,125],[-18,127]],[[45367,57897],[147,96],[92,-19],[75,67],[513,-25]],[[52636,51176],[-52,90],[96,663]],[[56583,71675],[152,-199],[216,34],[207,-42],[-7,-103],[151,71],[-35,-175],[-400,-50],[3,98],[-339,115],[52,251]],[[57237,74699],[-169,17],[-145,56],[-336,-154],[192,-332],[-141,-96],[-154,-1],[-147,305],[-52,-130],[62,-353],[139,-277],[-105,-129],[155,-273],[137,-171],[4,-334],[-257,157],[82,-302],[-176,-62],[105,-521],[-184,-8],[-228,257],[-104,473],[-49,393],[-108,272],[-143,337],[-18,168]],[[55838,74710],[182,53],[106,129],[150,-12],[46,103],[53,20]],[[57254,75292],[135,-157],[-86,-369],[-66,-67]],[[37010,99398],[932,353],[975,-27],[354,218],[982,57],[2219,-74],[1737,-469],[-513,-227],[-1062,-26],[-1496,-58],[140,-105],[984,65],[836,-204],[540,181],[231,-212],[-305,-344],[707,220],[1348,229],[833,-114],[156,-253],[-1132,-420],[-157,-136],[-888,-102],[643,-28],[-324,-431],[-224,-383],[9,-658],[333,-386],[-434,-24],[-457,-187],[513,-313],[65,-502],[-297,-55],[360,-508],[-617,-42],[322,-241],[-91,-208],[-391,-91],[-388,-2],[348,-400],[4,-263],[-549,244],[-143,-158],[375,-148],[364,-361],[105,-476],[-495,-114],[-214,228],[-344,340],[95,-401],[-322,-311],[732,-25],[383,-32],[-745,-515],[-755,-466],[-813,-204],[-306,-2],[-288,-228],[-386,-624],[-597,-414],[-192,-24],[-370,-145],[-399,-138],[-238,-365],[-4,-415],[-141,-388],[-453,-472],[112,-462],[-125,-488],[-142,-577],[-391,-36],[-410,482],[-556,3],[-269,324],[-186,577],[-481,735],[-141,385],[-38,530],[-384,546],[100,435],[-186,208],[275,691],[418,220],[110,247],[58,461],[-318,-209],[-151,-88],[-249,-84],[-341,193],[-19,401],[109,314],[258,9],[567,-157],[-478,375],[-249,202],[-276,-83],[-232,147],[310,550],[-169,220],[-220,409],[-335,626],[-353,230],[3,247],[-745,346],[-590,43],[-743,-24],[-677,-44],[-323,188],[-482,372],[729,186],[559,31],[-1188,154],[-627,241],[39,229],[1051,285],[1018,284],[107,214],[-750,213],[243,235],[961,413],[404,63],[-115,265],[658,156],[854,93],[853,5],[303,-184],[737,325],[663,-221],[390,-46],[577,-192],[-660,318],[38,253]],[[24973,58695],[-142,103],[-174,11],[-127,117],[-149,244]],[[24381,59170],[7,172],[32,138],[-39,111],[133,481],[357,2],[7,201],[-45,36],[-31,128],[-103,136],[-103,198],[125,1],[1,333],[259,1],[257,-7]],[[25297,59966],[90,-107],[24,88],[82,-75]],[[25493,59872],[-127,-225],[-131,-166],[-20,-113],[22,-116],[-58,-150]],[[25179,59102],[-65,-37],[15,-69],[-52,-66],[-95,-149],[-9,-86]],[[33400,55523],[183,-217],[171,-385],[8,-304],[105,-14],[149,-289],[109,-205]],[[34125,54109],[-44,-532],[-169,-154],[15,-139],[-51,-305],[123,-429],[89,-1],[37,-333],[169,-514]],[[33129,53652],[-188,448],[75,163],[-5,273],[171,95],[69,110],[-95,220],[24,215],[220,347]],[[25745,58251],[-48,185],[-84,51]],[[25613,58487],[19,237],[-38,64],[-57,42],[-122,-70],[-10,79],[-84,95],[-60,118],[-82,50]],[[25493,59872],[29,-23],[61,104],[79,8],[26,-48],[43,29],[129,-53],[128,15],[90,66],[32,66],[89,-31],[66,-40],[73,14],[55,51],[127,-82],[44,-13],[85,-110],[80,-132],[101,-91],[73,-162]],[[26903,59440],[-95,12],[-38,-81],[-97,-77],[-70,0],[-61,-76],[-56,27],[-47,90],[-29,-17],[-36,-141],[-27,5],[-4,-121],[-97,-163],[-51,-70],[-29,-74],[-82,120],[-60,-158],[-58,4],[-65,-14],[6,-290],[-41,-5],[-35,-135],[-86,-25]],[[55230,77704],[67,-229],[89,-169],[-107,-222]],[[55155,75778],[-31,-100]],[[55124,75678],[-261,218],[-161,213],[-254,176],[-233,434],[56,45],[-127,248],[-5,200],[-179,93],[-85,-255],[-82,198],[6,205],[10,9]],[[53809,77462],[194,-20],[51,100],[94,-97],[109,-11],[-1,165],[97,60],[27,239],[221,157]],[[54601,78055],[88,-73],[208,-253],[229,-114],[104,89]],[[30081,61241],[-185,100],[-131,-41],[-169,43],[-130,-110],[-149,184],[24,190],[256,-82],[210,-47],[100,131],[-127,256],[2,226],[-175,92],[62,163],[170,-26],[241,-93]],[[54716,79012],[141,-151],[103,-65],[233,73],[22,118],[111,18],[135,92],[30,-38],[130,74],[66,139],[91,36],[297,-180],[59,61]],[[56134,79189],[155,-161],[19,-159]],[[56308,78869],[-170,-123],[-131,-401],[-168,-401],[-223,-111]],[[55616,77833],[-173,26],[-213,-155]],[[54601,78055],[-54,200],[-47,6]],[[83531,44530],[-117,-11],[-368,414],[259,116],[146,-180],[97,-180],[-17,-159]],[[84713,45326],[28,-117],[5,-179]],[[84746,45030],[-181,-441],[-238,-130],[-33,71],[25,201],[119,360],[275,235]],[[82749,45797],[100,-158],[172,48],[69,-251],[-321,-119],[-193,-79],[-149,5],[95,340],[153,5],[74,209]],[[84139,45797],[-41,-328],[-417,-168],[-370,73],[0,216],[220,123],[174,-177],[185,45],[249,216]],[[80172,46575],[533,-59],[61,244],[515,-284],[101,-383],[417,-108],[341,-351],[-317,-225],[-306,238],[-251,-16],[-288,44],[-260,106],[-322,225],[-204,59],[-116,-74],[-506,243],[-48,254],[-255,44],[191,564],[337,-35],[224,-231],[115,-45],[38,-210]],[[87423,46908],[-143,-402],[-27,445],[49,212],[58,200],[63,-173],[0,-282]],[[85346,48536],[-104,-196],[-192,108],[-54,254],[281,29],[69,-195]],[[86241,48752],[101,-452],[-234,244],[-232,49],[-157,-39],[-192,21],[65,325],[344,24],[305,-172]],[[89166,49043],[5,-1925],[4,-1925]],[[89175,45193],[-247,485],[-282,118],[-69,-168],[-352,-18],[118,481],[175,164],[-72,642],[-134,496],[-538,500],[-229,50],[-417,546],[-82,-287],[-107,-52],[-63,216],[-1,257],[-212,290],[299,213],[198,-11],[-23,156],[-407,1],[-110,352],[-248,109],[-117,293],[374,143],[142,192],[446,-242],[44,-220],[78,-955],[287,-354],[232,627],[319,356],[247,1],[238,-206],[206,-212],[298,-113]],[[84788,51419],[-223,-587],[-209,-113],[-267,115],[-463,-29],[-243,-85],[-39,-447],[248,-526],[150,268],[518,201],[-22,-272],[-121,86],[-121,-347],[-245,-229],[263,-757],[-50,-203],[249,-682],[-2,-388],[-148,-173],[-109,207],[134,484],[-273,-229],[-69,164],[36,228],[-200,346],[21,576],[-186,-179],[24,-689],[11,-846],[-176,-85],[-119,173],[79,544],[-43,570],[-117,4],[-86,405],[115,387],[40,469],[139,891],[58,243],[237,439],[217,-174],[350,-82],[319,25],[275,429],[48,-132]],[[85746,51249],[-15,-517],[-143,58],[-42,-359],[114,-312],[-78,-71],[-112,374],[-82,755],[56,472],[92,215],[20,-322],[164,-52],[26,-241]],[[80461,51765],[47,-395],[190,-334],[179,121],[177,-43],[162,299],[133,52],[263,-166],[226,126],[143,822],[107,205],[96,672],[319,0],[241,-100]],[[82744,53024],[-158,-533],[204,-560],[-48,-272],[312,-546],[-329,-70],[-93,-403],[12,-535],[-267,-404],[-7,-589],[-107,-903],[-41,210],[-316,-266],[-110,361],[-198,34],[-139,189],[-330,-212],[-101,285],[-182,-32],[-229,68],[-43,793],[-138,164],[-134,505],[-38,517],[32,548],[165,392]],[[79393,47122],[-308,-12],[-234,494],[-356,482],[-119,358],[-210,481],[-138,443],[-212,827],[-244,493],[-81,508],[-103,461],[-250,372],[-145,506],[-209,330],[-290,652],[-24,300],[178,-24],[430,-114],[246,-577],[215,-401],[153,-246],[263,-635],[283,-9],[233,-405],[161,-495],[211,-270],[-111,-482],[159,-205],[100,-15],[47,-412],[97,-330],[204,-52],[135,-374],[-70,-735],[-11,-914]],[[72530,68413],[-176,-268],[-108,-553],[269,-224],[262,-289],[362,-332],[381,-76],[160,-301],[215,-56],[334,-138],[231,10],[32,234],[-36,375],[21,255]],[[77035,67277],[20,-224],[-97,-108],[23,-364],[-199,107],[-359,-408],[8,-338],[-153,-496],[-14,-288],[-124,-487],[-217,135],[-11,-612],[-63,-201],[30,-251],[-137,-140]],[[74730,63611],[-39,-216],[-189,7],[-343,-122],[16,-445],[-148,-349],[-400,-398],[-311,-695],[-209,-373],[-276,-387],[-1,-271],[-138,-146],[-251,-212],[-129,-31],[-84,-450],[58,-769],[15,-490],[-118,-561],[-1,-1004],[-144,-29],[-126,-450],[84,-195],[-253,-168],[-93,-401],[-112,-170],[-263,552],[-128,827],[-107,596],[-97,279],[-148,568],[-69,739],[-48,369],[-253,811],[-115,1145],[-83,756],[1,716],[-54,553],[-404,-353],[-196,70],[-362,716],[133,214],[-82,232],[-326,501]],[[68937,64577],[185,395],[612,-2],[-56,507],[-156,300],[-31,455],[-182,265],[306,619],[323,-45],[290,620],[174,599],[270,593],[-4,421],[236,342],[-224,292],[-96,400],[-99,517],[137,255],[421,-144],[310,88],[268,496]],[[48278,82406],[46,-422],[-210,-528],[-493,-349],[-393,89],[225,617],[-145,601],[378,463],[210,276]],[[64978,72558],[244,114],[197,338],[186,-17],[122,110],[197,-55],[308,-299],[221,-65],[318,-523],[207,-21],[24,-498]],[[66909,68203],[137,-310],[112,-357],[266,-260],[7,-520],[133,-96],[23,-272],[-400,-305],[-105,-687]],[[67082,65396],[-523,179],[-303,136],[-313,76],[-118,725],[-133,105],[-214,-106],[-280,-286],[-339,196],[-281,454],[-267,168],[-186,561],[-205,788],[-149,-96],[-177,196],[-104,-231]],[[63490,68261],[-153,311],[-3,314],[-89,0],[46,428],[-143,449],[-340,324],[-193,562],[65,461],[139,204],[-21,345],[-182,177],[-180,705]],[[62436,72541],[-152,473],[55,183],[-87,678],[190,168]],[[63578,73220],[88,-436],[263,-123],[193,-296],[395,-102],[434,156],[27,139]],[[63490,68261],[-164,29]],[[63326,68290],[-187,49],[-204,-567]],[[62935,67772],[-516,47],[-784,1188],[-413,414],[-335,160]],[[60887,69581],[-112,720]],[[60775,70301],[615,614],[105,715],[-26,431],[152,146],[142,369]],[[61763,72576],[119,92],[324,-77],[97,-150],[133,100]],[[45969,89843],[-64,-382],[314,-403],[-361,-451],[-801,-405],[-240,-107],[-365,87],[-775,187],[273,261],[-605,289],[492,114],[-12,174],[-583,137],[188,385],[421,87],[433,-400],[422,321],[349,-167],[453,315],[461,-42]],[[59922,69905],[-49,-186]],[[59873,69719],[-100,82],[-58,-394],[69,-66],[-71,-81],[-12,-156],[131,80]],[[59832,69184],[7,-230],[-139,-944]],[[59518,69025],[80,194],[-19,34],[74,276],[56,446],[40,149],[8,6]],[[59757,70130],[93,-1],[25,104],[75,8]],[[59950,70241],[4,-242],[-38,-90],[6,-4]],[[54311,73167],[-100,-465],[41,-183],[-58,-303],[-213,222],[-141,64],[-387,300],[38,304],[325,-54],[284,64],[211,51]],[[52558,74927],[166,-419],[-39,-782],[-126,38],[-113,-197],[-105,156],[-11,713],[-64,338],[153,-30],[139,183]],[[53835,78058],[-31,-291],[67,-251]],[[53871,77516],[-221,86],[-226,-210],[15,-293],[-34,-168],[91,-301],[261,-298],[140,-488],[309,-476],[217,3],[68,-130],[-78,-118],[249,-214],[204,-178],[238,-308],[29,-111],[-52,-211],[-154,276],[-242,97],[-116,-382],[200,-219],[-33,-309],[-116,-35],[-148,-506],[-116,-46],[1,181],[57,317],[60,126],[-108,342],[-85,298],[-115,74],[-82,255],[-179,107],[-120,238],[-206,38],[-217,267],[-254,384],[-189,340],[-86,585],[-138,68],[-226,195],[-128,-80],[-161,-274],[-115,-43]],[[28453,61504],[187,-53],[147,-142],[46,-161],[-195,-11],[-84,-99],[-156,95],[-159,215],[34,135],[116,41],[64,-20]],[[59922,69905],[309,-234],[544,630]],[[60887,69581],[-53,-89],[-556,-296],[277,-591],[-92,-101],[-46,-197],[-212,-82],[-66,-213],[-120,-182],[-310,94]],[[59709,67924],[-9,86]],[[59832,69184],[41,173],[0,362]],[[87399,70756],[35,-203],[-156,-357],[-114,189],[-143,-137],[-73,-346],[-181,168],[2,281],[154,352],[158,-68],[114,248],[204,-127]],[[89159,72524],[-104,-472],[48,-296],[-145,-416],[-355,-278],[-488,-36],[-396,-675],[-186,227],[-12,442],[-483,-130],[-329,-279],[-325,-11],[282,-435],[-186,-1004],[-179,-248],[-135,229],[69,533],[-176,172],[-113,405],[263,182],[145,371],[280,306],[203,403],[553,177],[297,-121],[291,1050],[185,-282],[408,591],[158,229],[174,723],[-47,664],[117,374],[295,108],[152,-819],[-9,-479],[-256,-595],[4,-610]],[[89974,76679],[195,-126],[197,250],[62,-663],[-412,-162],[-244,-587],[-436,404],[-152,-646],[-308,-9],[-39,587],[138,455],[296,33],[81,817],[83,460],[326,-615],[213,-198]],[[69711,75551],[-159,-109],[-367,-412],[-121,-422],[-104,-4],[-76,280],[-353,19],[-57,484],[-135,4],[21,593],[-333,431],[-476,-46],[-326,-86],[-265,533],[-227,223],[-431,423],[-52,51],[-715,-349],[11,-2178]],[[65546,74986],[-142,-29],[-195,463],[-188,166],[-315,-123],[-123,-197]],[[64583,75266],[-15,144],[68,246],[-53,206],[-322,202],[-125,530],[-154,150],[-9,192],[270,-56],[11,432],[236,96],[243,-88],[50,576],[-50,365],[-278,-28],[-236,144],[-321,-260],[-259,-124]],[[63639,77993],[-142,96],[29,304],[-177,395],[-207,-17],[-235,401],[160,448],[-81,120],[222,649],[285,-342],[35,431],[573,643],[434,15],[612,-409],[329,-239],[295,249],[440,12],[356,-306],[80,175],[391,-25],[69,280],[-450,406],[267,288],[-52,161],[266,153],[-200,405],[127,202],[1039,205],[136,146],[695,218],[250,245],[499,-127],[88,-612],[290,144],[356,-202],[-23,-322],[267,33],[696,558],[-102,-185],[355,-457],[620,-1500],[148,309],[383,-340],[399,151],[154,-106],[133,-341],[194,-115],[119,-251],[358,79],[147,-361]],[[72294,75601],[-171,87],[-140,212],[-412,62],[-461,16],[-100,-65],[-396,248],[-158,-122],[-43,-349],[-457,204],[-183,-84],[-62,-259]],[[61551,49585],[-195,-236],[-68,-246],[-104,-44],[-40,-416],[-89,-238],[-54,-393],[-112,-195]],[[60889,47817],[-399,590],[-19,343],[-1007,1203],[-47,65]],[[59417,50018],[-3,627],[80,239],[137,391],[101,431],[-123,678],[-32,296],[-132,411]],[[59445,53091],[171,352],[188,390]],[[61626,52895],[-243,-670],[3,-2152],[165,-488]],[[70465,73876],[-526,-89],[-343,192],[-301,-46],[26,340],[303,-98],[101,182]],[[69725,74357],[212,-58],[355,425],[-329,311],[-198,-147],[-205,223],[234,382],[-83,58]],[[78495,57780],[-66,713],[178,492],[359,112],[261,-84]],[[79227,59013],[229,-232],[126,407],[246,-217]],[[79828,58971],[64,-394],[-34,-708],[-467,-455],[122,-358],[-292,-43],[-240,-238]],[[78981,56775],[-233,87],[-112,307],[-141,611]],[[85652,73393],[240,-697],[68,-383],[3,-681],[-105,-325],[-252,-113],[-222,-245],[-250,-51],[-31,322],[51,443],[-122,615],[206,99],[-190,506]],[[85048,72883],[17,54],[124,-21],[108,266],[197,29],[118,39],[40,143]],[[55575,75742],[52,132]],[[55627,75874],[66,43],[38,196],[50,33],[40,-84],[52,-36],[36,-94],[46,-28],[54,-110],[39,4],[-31,-144],[-33,-71],[9,-44]],[[55993,75539],[-62,-23],[-164,-91],[-13,-121],[-35,5]],[[63326,68290],[58,-261],[-25,-135],[89,-445]],[[63448,67449],[-196,-16],[-69,282],[-248,57]],[[79227,59013],[90,266],[12,500],[-224,515],[-18,583],[-211,480],[-210,40],[-56,-205],[-163,-17],[-83,104],[-293,-353],[-6,530],[68,623],[-188,27],[-16,355],[-120,182]],[[77809,62643],[59,218],[237,384]],[[78380,63852],[162,-466],[125,-537],[342,-5],[108,-515],[-178,-155],[-80,-212],[333,-353],[231,-699],[175,-520],[210,-411],[70,-418],[-50,-590]],[[59757,70130],[99,482],[138,416],[5,21]],[[59999,71049],[125,-31],[45,-231],[-151,-223],[-68,-323]],[[47857,53158],[-73,-5],[-286,282],[-252,449],[-237,324],[-187,381]],[[46822,54589],[66,189],[15,172],[126,320],[129,276]],[[54125,64088],[-197,-220],[-156,324],[-439,255]],[[52633,68486],[136,137],[24,250],[-30,244],[191,228],[86,189],[135,170],[16,454]],[[53191,70158],[326,-204],[117,51],[232,-98],[368,-264],[130,-526],[250,-114],[391,-248],[296,-293],[136,153],[133,272],[-65,452],[87,288],[200,277],[192,80],[375,-121],[95,-264],[104,-2],[88,-101],[276,-70],[68,-195]],[[56944,63578],[0,-1180],[-320,-2],[-3,-248]],[[56621,62148],[-1108,1131],[-1108,1132],[-280,-323]],[[72718,55024],[-42,-615],[-116,-168],[-242,-135],[-132,470],[-49,849],[126,959],[192,-328],[129,-416],[134,-616]],[[58049,33472],[96,-178],[-85,-288],[-47,-192],[-155,-93],[-51,-188],[-99,-59],[-209,454],[148,374],[151,232],[130,120],[121,-182]],[[56314,82678],[-23,150],[30,162],[-123,94],[-291,103]],[[55907,83187],[-59,497]],[[55848,83684],[318,181],[466,-38],[273,59],[39,-123],[148,-38],[267,-287]],[[56523,82432],[-67,182],[-142,64]],[[55848,83684],[10,445],[136,371],[262,202],[221,-442],[223,12],[53,453]],[[57579,84537],[134,-136],[24,-287],[89,-348]],[[47592,66920],[-42,0],[7,-317],[-172,-19],[-90,-134],[-126,0],[-100,76],[-234,-63],[-91,-460],[-86,-44],[-131,-745],[-386,-637],[-92,-816],[-114,-265],[-33,-213],[-625,-48],[-5,1]],[[45272,63236],[13,274],[106,161],[91,308],[-18,200],[96,417],[155,376],[93,95],[74,344],[6,315],[100,365],[185,216],[177,603],[5,8],[139,227],[259,65],[218,404],[140,158],[232,493],[-70,735],[106,508],[37,312],[179,399],[278,270],[206,244],[186,612],[87,362],[205,-2],[167,-251],[264,41],[288,-131],[121,-6]],[[57394,79070],[66,87],[185,58],[204,-184],[115,-22],[125,-159],[-20,-200],[101,-97],[40,-247],[97,-150],[-19,-88],[52,-60],[-74,-44],[-164,18],[-27,81],[-58,-47],[20,-106],[-76,-188],[-49,-203],[-70,-64]],[[57842,77455],[-50,270],[30,252],[-9,259],[-160,352],[-89,249],[-86,175],[-84,58]],[[63761,43212],[74,-251],[69,-390],[45,-711],[72,-276],[-28,-284],[-49,-174],[-94,347],[-53,-175],[53,-438],[-24,-250],[-77,-137],[-18,-500],[-109,-689],[-137,-814],[-172,-1120],[-106,-821],[-125,-685],[-226,-140],[-243,-250],[-160,151],[-220,211],[-77,312],[-18,524],[-98,471],[-26,425],[50,426],[128,102],[1,197],[133,447],[25,377],[-65,280],[-52,372],[-23,544],[97,331],[38,375],[138,22],[155,121],[103,107],[122,7],[158,337],[229,364],[83,297],[-38,253],[118,-71],[153,410],[6,356],[92,264],[96,-254]],[[23016,65864],[-107,-518],[-49,-426],[-20,-791],[-27,-289],[48,-322],[86,-288],[56,-458],[184,-440],[65,-337],[109,-291],[295,-157],[114,-247],[244,165],[212,60],[208,106],[175,101],[176,241],[67,345],[22,496],[48,173],[188,155],[294,137],[246,-21],[169,50],[66,-125],[-9,-285],[-149,-351],[-66,-360],[51,-103],[-42,-255],[-69,-461],[-71,152],[-58,-10]],[[24381,59170],[-314,636],[-144,191],[-226,155],[-156,-43],[-223,-223],[-140,-58],[-196,156],[-208,112],[-260,271],[-208,83],[-314,275],[-233,282],[-70,158],[-155,35],[-284,187],[-116,270],[-299,335],[-139,373],[-66,288],[93,57],[-29,169],[64,153],[1,204],[-93,266],[-25,235],[-94,298],[-244,587],[-280,462],[-135,368],[-238,241],[-51,145],[42,365],[-142,138],[-164,287],[-69,412],[-149,48],[-162,311],[-130,288],[-12,184],[-149,446],[-99,452],[5,227],[-201,234],[-93,-25],[-159,163],[-44,-240],[46,-284],[27,-444],[95,-243],[206,-407],[46,-139],[42,-42],[37,-203],[49,8],[56,-381],[85,-150],[59,-210],[174,-300],[92,-550],[83,-259],[77,-277],[15,-311],[134,-20],[112,-268],[100,-264],[-6,-106],[-117,-217],[-49,3],[-74,359],[-181,337],[-201,286],[-142,150],[9,432],[-42,320],[-132,183],[-191,264],[-37,-76],[-70,154],[-171,143],[-164,343],[20,44],[115,-33],[103,221],[10,266],[-214,422],[-163,163],[-102,369],[-103,388],[-129,472],[-113,531]],[[17464,69802],[316,46],[353,64],[-26,-116],[419,-287],[634,-416],[552,4],[221,0],[0,244],[481,0],[102,-210],[142,-186],[165,-260],[92,-309],[69,-325],[144,-178],[230,-177],[175,467],[227,11],[196,-236],[139,-404],[96,-346],[164,-337],[61,-414],[78,-277],[217,-184],[197,-130],[108,18]],[[55993,75539],[95,35],[128,9]],[[46619,59216],[93,107],[47,348],[88,14],[194,-165],[157,117],[107,-39],[42,131],[1114,9],[62,414],[-48,73],[-134,2550],[-134,2550],[425,10]],[[51185,61897],[1,-1361],[-152,-394],[-24,-364],[-247,-94],[-379,-51],[-102,-210],[-178,-23]],[[46801,57931],[13,184],[-24,229],[-104,166],[-54,338],[-13,368]],[[77375,56448],[-27,439],[86,452],[-94,350],[23,644],[-113,306],[-90,707],[-50,746],[-121,490],[-183,-297],[-315,-421],[-156,53],[-172,138],[96,732],[-58,554],[-218,681],[34,213],[-163,76],[-197,481]],[[77809,62643],[-159,-137],[-162,-256],[-196,-26],[-127,-639],[-117,-107],[134,-519],[177,-431],[113,-390],[-101,-514],[-96,-109],[66,-296],[185,-470],[32,-330],[-4,-274],[108,-539],[-152,-551],[-135,-607]],[[55380,75322],[-58,46],[-78,192],[-120,118]],[[55338,76294],[74,-101],[40,-82],[91,-63],[106,-123],[-22,-51]],[[74375,79706],[292,102],[530,509],[423,278],[242,-182],[289,-8],[186,-276],[277,-22],[402,-148],[270,411],[-113,348],[288,612],[311,-244],[252,-69],[327,-152],[53,-443],[394,-248],[263,109],[351,78],[279,-78],[272,-284],[168,-302],[258,6],[350,-96],[255,146],[366,98],[407,416],[166,-63],[146,-198],[331,49]],[[59599,43773],[209,48],[334,-166],[73,74],[193,16],[99,177],[167,-10],[303,230],[221,342]],[[61198,44484],[45,-265],[-11,-588],[34,-519],[11,-923],[49,-290],[-83,-422],[-108,-410],[-177,-366],[-254,-225],[-313,-287],[-313,-634],[-107,-108],[-194,-420],[-115,-136],[-23,-421],[132,-448],[54,-346],[4,-177],[49,29],[-8,-579],[-45,-275],[65,-101],[-41,-245],[-116,-211],[-229,-199],[-334,-320],[-122,-219],[24,-248],[71,-40],[-24,-311]],[[59119,34780],[-211,5]],[[58908,34785],[-24,261],[-41,265]],[[58843,35311],[-23,212],[49,659],[-72,419],[-133,832]],[[58664,37433],[292,671],[74,426],[42,53],[31,348],[-45,175],[12,442],[54,409],[0,748],[-145,190],[-132,43],[-60,146],[-128,125],[-232,-12],[-18,220]],[[58409,41417],[-26,421],[843,487]],[[59226,42325],[159,-284],[77,54],[110,-149],[16,-237],[-59,-274],[21,-417],[181,-365],[85,410],[120,124],[-24,760],[-116,427],[-100,191],[-97,-9],[-77,768],[77,449]],[[46619,59216],[-184,405],[-168,435],[-184,157],[-133,173],[-155,-6],[-135,-129],[-138,51],[-96,-189]],[[45426,60113],[-24,318],[78,291],[34,557],[-30,583],[-34,294],[28,295],[-72,281],[-146,255]],[[45260,62987],[60,197],[1088,-4],[-53,853],[68,304],[261,53],[-9,1512],[911,-31],[1,895]],[[59226,42325],[-147,153],[85,549],[87,205],[-53,490],[56,479],[47,160],[-71,501],[-131,264]],[[59099,45126],[273,-110],[55,-164],[95,-275],[77,-804]],[[78372,54256],[64,-56],[164,-356],[116,-396],[16,-398],[-29,-269],[27,-203],[20,-349],[98,-163],[109,-523],[-5,-199],[-197,-40],[-263,438],[-329,469],[-32,301],[-161,395],[-38,489],[-100,322],[30,431],[-61,250]],[[77801,54399],[48,105],[227,-258],[22,-304],[183,71],[91,243]],[[80461,51765],[204,-202],[214,110],[56,500],[119,112],[333,128],[199,467],[137,374]],[[82069,53798],[214,411],[140,462],[112,2],[143,-299],[13,-257],[183,-165],[231,-177],[-20,-232],[-186,-29],[50,-289],[-205,-201]],[[54540,33696],[-207,446],[-108,432],[-62,575],[-68,428],[-93,910],[-7,707],[-35,322],[-108,243],[-144,489],[-146,708],[-60,371],[-226,577],[-17,453]],[[56448,40227],[228,134],[180,-34],[109,-133],[2,-49]],[[55526,35946],[0,-2182],[-248,-302],[-149,-43],[-175,112],[-125,43],[-47,252],[-109,162],[-133,-292]],[[96049,38125],[228,-366],[144,-272],[-105,-142],[-153,160],[-199,266],[-179,313],[-184,416],[-38,201],[119,-9],[156,-201],[122,-200],[89,-166]],[[54125,64088],[68,-919],[104,-153],[4,-188],[116,-203],[-60,-254],[-107,-1199],[-15,-769],[-354,-557],[-120,-778],[115,-219],[0,-380],[178,-13],[-28,-279]],[[53939,57955],[-52,-13],[-188,647],[-65,24],[-217,-331],[-215,173],[-150,34],[-80,-83],[-163,18],[-164,-252],[-141,-14],[-337,305],[-131,-145],[-142,10],[-104,223],[-279,221],[-298,-70],[-72,-128],[-39,-340],[-80,-238],[-19,-527]],[[52361,53399],[-289,-213],[-105,31],[-107,-132],[-222,13],[-149,370],[-91,427],[-197,389],[-209,-7],[-245,1]],[[26191,57131],[-96,186],[-130,238],[-61,200],[-117,185],[-140,267],[31,91],[46,-88],[21,41]],[[26903,59440],[-24,-57],[-14,-132],[29,-216],[-64,-202],[-30,-237],[-9,-261],[15,-152],[7,-266],[-43,-58],[-26,-253],[19,-156],[-56,-151],[12,-159],[43,-97]],[[50920,80916],[143,162],[244,869],[380,248],[231,-17]],[[58639,91676],[-473,-237],[-224,-54]],[[55734,91409],[-172,-24],[-41,-389],[-523,95],[-74,-329],[-267,2],[-183,-421],[-278,-655],[-431,-831],[101,-202],[-97,-234],[-275,10],[-180,-554],[17,-784],[177,-300],[-92,-694],[-231,-405],[-122,-341]],[[53063,85353],[-187,363],[-548,-684],[-371,-138],[-384,301],[-99,635],[-88,1363],[256,381],[733,496],[549,609],[508,824],[668,1141],[465,444],[763,741],[610,259],[457,-31],[423,489],[506,-26],[499,118],[869,-433],[-358,-158],[305,-371]],[[56867,96577],[-620,-241],[-490,137],[191,152],[-167,189],[575,119],[110,-222],[401,-134]],[[55069,97669],[915,-440],[-699,-233],[-155,-435],[-243,-111],[-132,-490],[-335,-23],[-598,361],[252,210],[-416,170],[-541,499],[-216,463],[757,212],[152,-207],[396,8],[105,202],[408,20],[350,-206]],[[57068,98086],[545,-207],[-412,-318],[-806,-70],[-819,98],[-50,163],[-398,11],[-304,271],[858,165],[403,-142],[281,177],[702,-148]],[[98060,26404],[63,-244],[198,239],[80,-249],[0,-249],[-103,-274],[-182,-435],[-142,-238],[103,-284],[-214,-7],[-238,-223],[-75,-387],[-157,-597],[-219,-264],[-138,-169],[-256,13],[-180,194],[-302,42],[-46,217],[149,438],[349,583],[179,111],[200,225],[238,310],[167,306],[123,441],[106,149],[41,330],[195,273],[61,-251]],[[98502,29218],[202,-622],[5,403],[126,-161],[41,-447],[224,-192],[188,-48],[158,226],[141,-69],[-67,-524],[-85,-345],[-212,12],[-74,-179],[26,-254],[-41,-110],[-105,-319],[-138,-404],[-214,-236],[-48,155],[-116,85],[160,486],[-91,326],[-299,236],[8,214],[201,206],[47,455],[-13,382],[-113,396],[8,104],[-133,244],[-218,523],[-117,418],[104,46],[151,-328],[216,-153],[78,-526]],[[64752,60417],[-91,413],[-217,975]],[[64444,61805],[833,591],[185,1182],[-127,418]],[[65665,65306],[125,-404],[155,-214],[203,-78],[165,-107],[125,-339],[75,-196],[100,-75],[-1,-132],[-101,-352],[-44,-166],[-117,-189],[-104,-404],[-126,31],[-58,-141],[-44,-300],[34,-395],[-26,-72],[-128,2],[-174,-221],[-27,-288],[-63,-125],[-173,5],[-109,-149],[1,-238],[-134,-165],[-153,56],[-186,-199],[-128,-34]],[[65575,65974],[80,201],[35,-51],[-26,-244],[-37,-108]],[[68937,64577],[-203,150],[-83,424],[-215,450],[-512,-111],[-451,-11],[-391,-83]],[[28366,54848],[-93,170],[-59,319],[68,158],[-70,40],[-52,196],[-138,164],[-122,-38],[-56,-205],[-112,-149],[-61,-20],[-27,-123],[132,-321],[-75,-76],[-40,-87],[-130,-30],[-48,353],[-36,-101],[-92,35],[-56,238],[-114,39],[-72,69],[-119,-1],[-8,-128],[-32,89]],[[27070,56232],[100,-212],[-6,-126],[111,-26],[26,48],[77,-145],[136,42],[119,150],[168,119],[95,176],[153,-34],[-10,-58],[155,-21],[124,-102],[90,-177],[105,-164]],[[30452,39739],[-279,340],[-24,242],[-551,593],[-498,646],[-214,365],[-115,488],[46,170],[-236,775],[-274,1090],[-262,1177],[-114,269],[-87,435],[-216,386],[-198,239],[90,264],[-134,563],[86,414],[221,373]],[[85104,55551],[28,-392],[16,-332],[-94,-540],[-102,602],[-130,-300],[89,-435],[-79,-277],[-327,343],[-78,428],[84,280],[-176,280],[-87,-245],[-131,23],[-205,-330],[-46,173],[109,498],[175,166],[151,223],[98,-268],[212,162],[45,264],[196,15],[-16,457],[225,-280],[23,-297],[20,-218]],[[84439,56653],[-100,-195],[-87,-373],[-87,-175],[-171,409],[57,158],[70,165],[30,367],[153,35],[-44,-398],[205,570],[-26,-563]],[[82917,56084],[-369,-561],[136,414],[200,364],[167,409],[146,587],[49,-482],[-183,-325],[-146,-406]],[[83856,57606],[166,-183],[177,1],[-5,-247],[-129,-251],[-176,-178],[-10,275],[20,301],[-43,282]],[[84861,57766],[78,-660],[-214,157],[5,-199],[68,-364],[-132,-133],[-11,416],[-84,31],[-43,357],[163,-47],[-4,224],[-169,451],[266,-13],[77,-220]],[[83757,58301],[-74,-510],[-119,295],[-142,450],[238,-22],[97,-213]],[[83700,61512],[171,-168],[85,153],[26,-150],[-46,-245],[95,-423],[-73,-491],[-164,-196],[-43,-476],[62,-471],[147,-65],[123,70],[347,-328],[-27,-321],[91,-142],[-29,-272],[-216,290],[-103,310],[-71,-217],[-177,354],[-253,-87],[-138,130],[14,244],[87,151],[-83,136],[-36,-213],[-137,340],[-41,257],[-11,566],[112,-195],[29,925],[90,535],[169,-1]],[[93299,46550],[-78,-59],[-120,227],[-122,375],[-59,450],[38,57],[30,-175],[84,-134],[135,-375],[131,-200],[-39,-166]],[[92217,47343],[-146,-48],[-44,-166],[-152,-144],[-142,-138],[-148,1],[-228,171],[-158,165],[23,183],[249,-86],[152,46],[42,283],[40,15],[27,-314],[158,45],[78,202],[155,211],[-30,348],[166,11],[56,-97],[-5,-327],[-93,-361]],[[89166,49043],[482,-407],[513,-338],[192,-302],[154,-297],[43,-349],[462,-365],[68,-313],[-256,-64],[62,-393],[248,-388],[180,-627],[159,20],[-11,-262],[215,-100],[-84,-111],[295,-249],[-30,-171],[-184,-41],[-69,153],[-238,66],[-281,89],[-216,377],[-158,325],[-144,517],[-362,259],[-235,-169],[-170,-195],[35,-436],[-218,-203],[-155,99],[-288,25]],[[92538,47921],[-87,-157],[-52,348],[-65,229],[-126,193],[-158,252],[-200,174],[77,143],[150,-166],[94,-130],[117,-142],[111,-248],[106,-189],[33,-307]],[[53922,82340],[189,174],[434,273],[350,200],[277,-100],[21,-144],[268,-7]],[[55461,82736],[342,-67],[511,9]],[[56535,81053],[139,-515],[-29,-166],[-138,-69],[-252,-491],[71,-266],[-60,35]],[[56266,79581],[-264,227],[-200,-84],[-131,61],[-165,-127],[-140,210],[-114,-81],[-16,36]],[[31588,61519],[142,-52],[50,-118],[-71,-149],[-209,4],[-163,-21],[-16,253],[40,86],[227,-3]],[[86288,75628],[39,-104]],[[86327,75524],[-106,36],[-120,-200],[-83,-202],[10,-424],[-143,-130],[-50,-105],[-104,-174],[-185,-97],[-121,-159],[-9,-256],[-32,-65],[111,-96],[157,-259]],[[85048,72883],[-135,112],[-34,-111],[-81,-49],[-10,112],[-72,54],[-75,94],[76,260],[66,69],[-25,108],[71,319],[-18,96],[-163,65],[-131,158]],[[47929,72498],[-112,-153],[-146,83],[-143,-65],[42,462],[-26,363],[-124,55],[-67,224],[22,386],[111,215],[20,239],[58,355],[-6,250],[-56,212],[-12,200]],[[64113,65205],[-18,430],[75,310],[76,64],[84,-185],[5,-346],[-61,-348]],[[64274,65130],[-77,-42],[-84,117]],[[56308,78869],[120,127],[172,-65],[178,-3],[129,-144],[95,91],[205,56],[69,139],[118,0]],[[57842,77455],[124,-109],[131,95],[126,-101]],[[58223,77340],[6,-152],[-135,-128],[-84,56],[-78,-713]],[[56293,76715],[-51,103],[65,99],[-69,74],[-87,-133],[-162,172],[-22,244],[-169,139],[-31,188],[-151,232]],[[89901,80562],[280,-1046],[-411,195],[-171,-854],[271,-605],[-8,-413],[-211,356],[-182,-457],[-51,496],[31,575],[-32,638],[64,446],[13,790],[-163,581],[24,808],[257,271],[-110,274],[123,83],[73,-391],[96,-569],[-7,-581],[114,-597]],[[55461,82736],[63,260],[383,191]],[[99999,92429],[-305,-30],[-49,187],[-99645,247],[36,24],[235,-1],[402,-169],[-24,-81],[-286,-141],[-363,-36],[99999,0]],[[89889,93835],[-421,-4],[-569,66],[-49,31],[263,234],[348,54],[394,-226],[34,-155]],[[91869,94941],[-321,-234],[-444,53],[-516,233],[66,192],[518,-89],[697,-155]],[[90301,95224],[-219,-439],[-1023,16],[-461,-139],[-550,384],[149,406],[366,111],[734,-26],[1004,-313]],[[65981,92363],[-164,-52],[-907,77],[-74,262],[-503,158],[-40,320],[284,126],[-10,323],[551,503],[-255,73],[665,518],[-75,268],[621,312],[917,380],[925,110],[475,220],[541,76],[193,-233],[-187,-184],[-984,-293],[-848,-282],[-863,-562],[-414,-577],[-435,-568],[56,-491],[531,-484]],[[63639,77993],[-127,-350],[-269,-97],[-276,-610],[252,-561],[-27,-398],[303,-696]],[[61098,76242],[-354,499],[-317,223],[-240,347],[202,95],[231,494],[-156,234],[410,241],[-8,129],[-249,-95]],[[60617,78409],[9,262],[143,165],[269,43],[44,197],[-62,326],[113,310],[-3,173],[-410,192],[-162,-6],[-172,277],[-213,-94],[-352,208],[6,116],[-99,256],[-222,29],[-23,183],[70,120],[-178,334],[-288,-57],[-84,30],[-70,-134],[-104,23]],[[57772,85719],[316,327],[-291,280]],[[58639,91676],[286,206],[456,-358],[761,-140],[1050,-668],[213,-281],[18,-393],[-308,-311],[-454,-157],[-1240,449],[-204,-75],[453,-433],[18,-274],[18,-604],[358,-180],[217,-153],[36,286],[-168,254],[177,224],[672,-368],[233,144],[-186,433],[647,578],[256,-34],[260,-206],[161,406],[-231,352],[136,353],[-204,367],[777,-190],[158,-331],[-351,-73],[1,-328],[219,-203],[429,128],[68,377],[580,282],[970,507],[209,-29],[-273,-359],[344,-61],[199,202],[521,16],[412,245],[317,-356],[315,391],[-291,343],[145,195],[820,-179],[385,-185],[1006,-675],[186,309],[-282,313],[-8,125],[-335,58],[92,280],[-149,461],[-8,189],[512,535],[183,537],[206,116],[736,-156],[57,-328],[-263,-479],[173,-189],[89,-413],[-63,-809],[307,-362],[-120,-395],[-544,-839],[318,-87],[110,213],[306,151],[74,293],[240,281],[-162,336],[130,390],[-304,49],[-67,328],[222,593],[-361,482],[497,398],[-64,421],[139,13],[145,-328],[-109,-570],[297,-108],[-127,426],[465,233],[577,31],[513,-337],[-247,492],[-28,630],[483,119],[669,-26],[602,77],[-226,309],[321,388],[319,16],[540,293],[734,79],[93,162],[729,55],[227,-133],[624,314],[510,-10],[77,255],[265,252],[656,242],[476,-191],[-378,-146],[629,-90],[75,-292],[254,143],[812,-7],[626,-289],[223,-221],[-69,-307],[-307,-175],[-730,-328],[-209,-175],[345,-83],[410,-149],[251,112],[141,-379],[122,153],[444,93],[892,-97],[67,-276],[1162,-88],[15,451],[590,-104],[443,4],[449,-312],[128,-378],[-165,-247],[349,-465],[437,-240],[268,620],[446,-266],[473,159],[538,-182],[204,166],[455,-83],[-201,549],[367,256],[2509,-384],[236,-351],[727,-451],[1122,112],[553,-98],[231,-244],[-33,-432],[342,-168],[372,121],[492,15],[525,-116],[526,66],[484,-526],[344,189],[-224,378],[123,262],[886,-165],[578,36],[799,-282],[-99610,-258],[681,-451],[728,-588],[-24,-367],[187,-147],[-64,429],[754,-88],[544,-553],[-276,-257],[-455,-61],[-7,-578],[-111,-122],[-260,17],[-212,206],[-369,172],[-62,257],[-283,96],[-315,-76],[-151,207],[60,219],[-333,-140],[126,-278],[-158,-251],[99997,-3],[-357,-260],[-360,44],[250,-315],[166,-487],[128,-159],[32,-244],[-71,-157],[-518,129],[-777,-445],[-247,-69],[-425,-415],[-403,-362],[-102,-269],[-397,409],[-724,-464],[-126,219],[-268,-253],[-371,81],[-90,-388],[-333,-572],[10,-239],[316,-132],[-37,-860],[-258,-22],[-119,-494],[116,-255],[-486,-302],[-96,-674],[-415,-144],[-83,-600],[-400,-551],[-103,407],[-119,862],[-155,1313],[134,819],[234,353],[14,276],[432,132],[496,744],[479,608],[499,471],[223,833],[-337,-50],[-167,-487],[-705,-649],[-227,727],[-717,-201],[-696,-990],[230,-362],[-620,-154],[-430,-61],[20,427],[-431,90],[-344,-291],[-850,102],[-914,-175],[-899,-1153],[-1065,-1394],[438,-74],[136,-370],[270,-132],[178,295],[305,-38],[401,-650],[9,-503],[-217,-590],[-23,-705],[-126,-945],[-418,-855],[-94,-409],[-377,-688],[-374,-682],[-179,-349],[-370,-346],[-175,-8],[-175,287],[-373,-432],[-43,-197]],[[79187,96845],[-1566,-228],[507,776],[229,66],[208,-38],[704,-336],[-82,-240]],[[64204,98169],[-373,-78],[-250,-45],[-39,-97],[-324,-98],[-301,140],[158,185],[-618,18],[542,107],[422,8],[57,-160],[159,142],[262,97],[412,-129],[-107,-90]],[[77760,97184],[-606,-73],[-773,170],[-462,226],[-213,423],[-379,117],[722,404],[600,133],[540,-297],[640,-572],[-69,-531]],[[58449,49909],[110,-333],[-16,-348],[-80,-74]],[[58216,49787],[67,-60],[166,182]],[[45260,62987],[12,249]],[[61883,60238],[-37,252],[-83,178],[-22,236],[-143,212],[-148,495],[-79,482],[-192,406],[-124,97],[-184,563],[-32,411],[12,350],[-159,655],[-130,231],[-150,122],[-92,339],[15,133],[-77,306],[-81,132],[-108,440],[-170,476],[-141,406],[-139,-3],[44,325],[12,206],[34,236]],[[63448,67449],[109,-510],[137,-135],[47,-207],[190,-249],[16,-243],[-27,-197],[35,-199],[80,-165],[37,-194],[41,-145]],[[64274,65130],[53,-226]],[[64444,61805],[-801,-226],[-259,-266],[-199,-620],[-130,-99],[-70,197],[-106,-30],[-269,60],[-50,59],[-321,-14],[-75,-53],[-114,153],[-74,-290],[28,-249],[-121,-189]],[[59434,56171],[-39,12],[5,294],[-33,203],[-143,233],[-34,426],[34,436],[-129,41],[-19,-132],[-167,-30],[67,-173],[23,-355],[-152,-324],[-138,-426],[-144,-61],[-233,345],[-105,-122],[-29,-172],[-143,-112],[-9,-122],[-277,0],[-38,122],[-200,20],[-100,-101],[-77,51],[-143,344],[-48,163],[-200,-81],[-76,-274],[-72,-528],[-95,-111],[-85,-65]],[[56635,55672],[-23,28]],[[56351,57163],[3,143],[-102,174],[-3,343],[-58,228],[-98,-34],[28,217],[72,246],[-32,245],[92,181],[-58,138],[73,365],[127,435],[240,-41],[-14,2345]],[[60240,63578],[90,-580],[-61,-107],[40,-608],[102,-706],[106,-145],[152,-219]],[[59433,56242],[1,-71]],[[59434,56171],[3,-460]],[[59445,53091],[-171,-272],[-195,1],[-224,-138],[-176,132],[-115,-161]],[[56824,55442],[-189,230]],[[45357,58612],[-115,460],[-138,210],[122,112],[134,415],[66,304]],[[45367,57897],[-46,453]],[[95032,44386],[78,-203],[-194,4],[-106,363],[166,-142],[56,-22]],[[94680,44747],[-108,-14],[-170,60],[-58,91],[17,235],[183,-93],[91,-124],[45,-155]],[[94910,44908],[-42,-109],[-206,512],[-57,353],[94,0],[100,-473],[111,-283]],[[94409,45654],[12,-119],[-218,251],[-152,212],[-104,197],[41,60],[128,-142],[228,-272],[65,-187]],[[93760,46238],[-56,-33],[-121,134],[-114,243],[14,99],[166,-250],[111,-193]],[[46822,54589],[-75,44],[-200,238],[-144,316],[-49,216],[-34,437]],[[25613,58487],[-31,-139],[-161,9],[-100,57],[-115,117],[-154,37],[-79,127]],[[61984,57352],[91,-109],[54,-245],[125,-247],[138,-2],[262,151],[302,70],[245,184],[138,39],[99,108],[158,20]],[[63596,57321],[-2,-9],[-1,-244],[0,-596],[0,-308],[-125,-363],[-194,-493]],[[63596,57321],[89,12],[128,88],[147,59],[132,202],[105,2],[6,-163],[-25,-344],[1,-310],[-59,-214],[-78,-639],[-134,-659],[-172,-755],[-238,-866],[-237,-661],[-327,-806],[-278,-479],[-415,-586],[-259,-450],[-304,-715],[-64,-312],[-63,-140]],[[34125,54109],[333,-119],[30,107],[225,43],[298,-159]],[[34889,53069],[109,-351],[-49,-254],[-24,-270],[-71,-248]],[[56266,79581],[-77,-154],[-55,-238]],[[53809,77462],[62,54]],[[56639,89578],[-478,-167],[-269,-413],[43,-361],[-441,-475],[-537,-509],[-202,-832],[198,-416],[265,-328],[-255,-666],[-289,-138],[-106,-992],[-157,-554],[-337,57],[-158,-468],[-321,-27],[-89,558],[-232,671],[-211,835]],[[58908,34785],[-56,-263],[-163,-63],[-166,320],[-2,204],[76,222],[26,172],[80,42],[140,-108]],[[59999,71049],[-26,452],[68,243]],[[60041,71744],[74,129],[75,130],[15,329],[91,-115],[306,165],[147,-112],[229,2],[320,222],[149,-10],[316,92]],[[50518,54209],[-224,-126]],[[78495,57780],[-249,271],[-238,-11],[41,464],[-245,-3],[-22,-650],[-150,-863],[-90,-522],[19,-428],[181,-18],[113,-539],[50,-512],[155,-338],[168,-69],[144,-306]],[[77801,54399],[-110,227],[-47,292],[-148,334],[-135,280],[-45,-347],[-53,328],[30,369],[82,566]],[[68841,72526],[156,598],[-60,440],[-204,140],[72,261],[232,-28],[132,326],[89,380],[371,137],[-58,-274],[40,-164],[114,15]],[[64978,72558],[-52,417],[40,618],[-216,200],[71,405],[-184,34],[61,498],[262,-145],[244,189],[-202,355],[-80,338],[-224,-151],[-28,-433],[-87,383]],[[65546,74986],[313,8],[-45,297],[237,204],[234,343],[374,-312],[30,-471],[106,-121],[301,27],[93,-108],[137,-609],[317,-408],[181,-278],[291,-289],[369,-253],[-7,-362]],[[84713,45326],[32,139],[239,133],[194,20],[87,74],[105,-74],[-102,-160],[-289,-258],[-233,-170]],[[32866,56937],[160,77],[58,-21],[-11,-440],[-232,-65],[-50,53],[81,163],[-6,233]],[[52339,72408],[302,239],[195,-71],[-9,-299],[236,217],[20,-113],[-139,-290],[-2,-273],[96,-147],[-36,-511],[-183,-297],[53,-322],[143,-10],[70,-281],[106,-92]],[[60041,71744],[-102,268],[105,222],[-169,-51],[-233,136],[-191,-340],[-421,-66],[-225,317],[-300,20],[-64,-245],[-192,-70],[-268,314],[-303,-11],[-165,588],[-203,328],[135,459],[-176,283],[308,565],[428,23],[117,449],[529,-78],[334,383],[324,167],[459,13],[485,-417],[399,-228],[323,91],[239,-53],[328,309]],[[57776,75399],[33,-228],[243,-190],[-51,-145],[-330,-33],[-118,-182],[-232,-319],[-87,276],[3,121]],[[83826,64992],[-167,-947],[-119,-485],[-146,499],[-32,438],[163,581],[223,447],[127,-176],[-49,-357]],[[60889,47817],[-128,-728],[16,-335],[178,-216],[8,-153],[-76,-357],[16,-180],[-18,-282],[97,-370],[115,-583],[101,-129]],[[59099,45126],[-157,177],[-177,100],[-111,99],[-116,150]],[[58388,46397],[-161,331],[-55,342]],[[58449,49909],[98,71],[304,-7],[566,45]],[[60617,78409],[-222,-48],[-185,-191],[-260,-31],[-239,-220],[16,-368],[136,-142],[284,35],[-55,-210],[-304,-103],[-377,-342],[-154,121],[61,277],[-304,173],[50,113],[265,197],[-80,135],[-432,149],[-19,221],[-257,-73],[-103,-325],[-215,-437]],[[35174,30629],[-121,-372],[-313,-328],[-205,118],[-151,-63],[-256,253],[-189,-19],[-169,327]],[[6794,61855],[-41,-99],[-69,84],[8,165],[-46,216],[14,65],[48,97],[-19,116],[16,55],[21,-11],[107,-100],[49,-51],[45,-79],[71,-207],[-7,-33],[-108,-126],[-89,-92]],[[6645,62777],[-94,-43],[-47,125],[-32,48],[-3,37],[27,50],[99,-56],[73,-90],[-23,-71]],[[6456,63091],[-9,-63],[-149,17],[21,72],[137,-26]],[[6207,63177],[-15,-34],[-19,8],[-97,21],[-35,133],[-11,24],[74,82],[23,-38],[80,-196]],[[5737,63567],[-33,-58],[-93,107],[14,43],[43,58],[64,-12],[5,-138]],[[31350,77248],[48,-194],[-296,-286],[-286,-204],[-293,-175],[-147,-351],[-47,-133],[-3,-313],[92,-313],[115,-15],[-29,216],[83,-131],[-22,-169],[-188,-96],[-133,11],[-205,-103],[-121,-29],[-162,-29],[-231,-171],[408,111],[82,-112],[-389,-177],[-177,-1],[8,72],[-84,-164],[82,-27],[-60,-424],[-203,-455],[-20,152],[-61,30],[-91,148],[57,-318],[69,-105],[5,-223],[-89,-230],[-157,-472],[-25,24],[86,402],[-142,225],[-33,491],[-53,-255],[59,-375],[-183,93],[191,-191],[12,-562],[79,-41],[29,-204],[39,-591],[-176,-439],[-288,-175],[-182,-346],[-139,-38],[-141,-217],[-39,-199],[-305,-383],[-157,-281],[-131,-351],[-43,-419],[50,-411],[92,-505],[124,-418],[1,-256],[132,-685],[-9,-398],[-12,-230],[-69,-361],[-83,-75],[-137,72],[-44,259],[-105,136],[-148,508],[-129,452],[-42,231],[57,393],[-77,325],[-217,494],[-108,90],[-281,-268],[-49,30],[-135,275],[-174,147],[-314,-75],[-247,66],[-212,-41],[-114,-92],[50,-157],[-5,-240],[59,-117],[-53,-77],[-103,87],[-104,-112],[-202,18],[-207,312],[-242,-73],[-202,137],[-173,-42],[-234,-138],[-253,-438],[-276,-255],[-152,-282],[-63,-266],[-3,-407],[14,-284],[52,-201]],[[17464,69802],[-46,302],[-180,340],[-130,71],[-30,169],[-156,30],[-100,159],[-258,59],[-71,95],[-33,324],[-270,594],[-231,821],[10,137],[-123,195],[-215,495],[-38,482],[-148,323],[61,489],[-10,507],[-89,453],[109,557],[34,536],[33,536],[-50,792],[-88,506],[-80,274],[33,115],[402,-200],[148,-558],[69,156],[-45,484],[-94,485]],[[7498,84325],[-277,-225],[-142,152],[-43,277],[252,210],[148,90],[185,-40],[117,-183],[-240,-281]],[[4006,85976],[-171,-92],[-182,110],[-168,161],[274,101],[220,-54],[27,-226]],[[2297,88264],[171,-113],[173,61],[225,-156],[276,-79],[-23,-64],[-211,-125],[-211,128],[-106,107],[-245,-34],[-66,52],[17,223]],[[13740,82958],[-153,223],[-245,188],[-78,515],[-358,478],[-150,558],[-267,38],[-441,15],[-326,170],[-574,613],[-266,112],[-486,211],[-385,-51],[-546,272],[-330,252],[-309,-125],[58,-411],[-154,-38],[-321,-123],[-245,-199],[-308,-126],[-39,348],[125,580],[295,182],[-76,148],[-354,-329],[-190,-394],[-400,-420],[203,-287],[-262,-424],[-299,-248],[-278,-180],[-69,-261],[-434,-305],[-87,-278],[-325,-252],[-191,45],[-259,-165],[-282,-201],[-231,-197],[-477,-169],[-43,99],[304,276],[271,182],[296,324],[345,66],[137,243],[385,353],[62,119],[205,208],[48,448],[141,349],[-320,-179],[-90,102],[-150,-215],[-181,300],[-75,-212],[-104,294],[-278,-236],[-170,0],[-24,352],[50,216],[-179,211],[-361,-113],[-235,277],[-190,142],[-1,334],[-214,252],[108,340],[226,330],[99,303],[225,43],[191,-94],[224,285],[201,-51],[212,183],[-52,270],[-155,106],[205,228],[-170,-7],[-295,-128],[-85,-131],[-219,131],[-392,-67],[-407,142],[-117,238],[-351,343],[390,247],[620,289],[228,0],[-38,-296],[586,23],[-225,366],[-342,225],[-197,296],[-267,252],[-381,187],[155,309],[493,19],[350,270],[66,287],[284,281],[271,68],[526,262],[256,-40],[427,315],[421,-124],[201,-266],[123,114],[469,-35],[-16,-136],[425,-101],[283,59],[585,-186],[534,-56],[214,-77],[370,96],[421,-177],[302,-83]],[[30185,57537],[-8,-139],[-163,-69],[91,-268],[-3,-309],[-123,-344],[105,-468],[120,38],[62,427],[-86,208],[-14,447],[346,241],[-38,278],[97,186],[100,-415],[195,-9],[180,-330],[11,-195],[249,-6],[297,61],[159,-264],[213,-74],[155,185],[4,149],[344,35],[333,9],[-236,-175],[95,-279],[222,-44],[210,-291],[45,-473],[144,13],[109,-139]],[[80013,63313],[-371,-505],[-231,-558],[-61,-410],[212,-623],[260,-772],[252,-365],[169,-475],[127,-1093],[-37,-1039],[-232,-389],[-318,-381],[-227,-492],[-346,-550],[-101,378],[78,401],[-206,335]],[[96623,40851],[-92,-78],[-93,259],[10,158],[175,-339]],[[96418,41756],[45,-476],[-75,74],[-58,-32],[-39,163],[-6,453],[133,-182]],[[64752,60417],[-201,-158],[-54,-263],[-6,-201],[-277,-249],[-444,-276],[-249,-417],[-122,-33],[-83,35],[-163,-245],[-177,-114],[-233,-30],[-70,-34],[-61,-156],[-73,-43],[-43,-150],[-137,13],[-89,-80],[-192,30],[-72,345],[8,323],[-46,174],[-54,437],[-80,243],[56,29],[-29,270],[34,114],[-12,257]],[[58175,37528],[113,-7],[134,-100],[94,71],[148,-59]],[[59119,34780],[-70,-430],[-32,-491],[-72,-267],[-190,-298],[-54,-86],[-118,-300],[-77,-303],[-158,-424],[-314,-609],[-196,-355],[-210,-269],[-290,-229],[-141,-31],[-36,-164],[-169,88],[-138,-113],[-301,114],[-168,-72],[-115,31],[-286,-233],[-238,-94],[-171,-223],[-127,-14],[-117,210],[-94,11],[-120,264],[-13,-82],[-37,159],[2,346],[-90,396],[89,108],[-7,453],[-182,553],[-139,501],[-1,1],[-199,768]],[[58409,41417],[-210,-81],[-159,-235],[-33,-205],[-100,-46],[-241,-486],[-154,-383],[-94,-13],[-90,68],[-311,65]]],"bbox":[-180,-85.60903777459767,180,83.64513000000001],"transform":{"scale":[0.0036000360003600037,0.00169255860333201],"translate":[-180,-85.60903777459767]}}

/***/ }),

/***/ "nxai":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__("hxZH");


let educations = ['High School', 'Some College', 'AA/AS', 'Bachelor', 'Master', 'Doctorate']
let races = ['White', 'Asian', 'Black', 'Mixed'];

let dataProps = [
    {name: 'BabyMonth', dtype: 'int', dist: 'uniform', min: 1, max: 12},
    {name: 'BabyGender', dtype: 'string', values: ['F', 'M']},
    {name: 'BabyWeight', dtype: 'float', dist: 'normal', min: 2, max: 20, mean: 7, std: 2},
    {name: 'MotherAge', dtype: 'int', dist: 'normal', min: 16, max: 70, mean: 30, std: 10},
    {name: 'MotherRace', dtype: 'string', values: races},
    {name: 'MotherStatus', dtype: 'string', values: ['Married', 'Unmarried']},
    {name: 'MotherEdu', dtype: 'string', values: educations},
    {name: 'MotherHeight', dtype: 'float', dist: 'normal', min: 120, max: 220, mean: 168, std: 20},
    {name: 'MotherWeight', dtype: 'float', dist: 'normal', min: 50, max: 290, mean: 100, std: 50},
    {name: 'MotherWgtGain', dtype: 'float', dist: 'normal', min: 0, max: 100, mean: 30, std: 10},
    {name: 'FatherAge', dtype: 'int', dist: 'normal', min: 16, max: 90, mean: 32, std: 10},
    {name: 'FatherRace', dtype: 'string', values: races},
    {name: 'FatherEdu', dtype: 'string', values: educations}
];

let schema = {};
for(let prop of dataProps) {
    schema[prop.name] = prop.dtype;
}

function Babies(arg) {
    let dataSize = (Number.isInteger(arg)) ? arg : arg.size;
    let props = arg.props || dataProps;
    let type = arg.type || 'json';
    let data = (type === 'json') ? Object(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* randomJSONs */])({props: props, size: dataSize}): Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* randomArrays */])({props: props, size: dataSize});
    return { data, schema };
}

Babies.schema = schema;

/* harmony default export */ __webpack_exports__["a"] = (Babies);

/***/ }),

/***/ "pcb+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_main__ = __webpack_require__("f/qL");


var root = typeof self == 'object' && self.self === self && self ||
           typeof global == 'object' && global.global === global && global ||
           this;

root.flexgl = __WEBPACK_IMPORTED_MODULE_0__src_main__["a" /* default */];

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__src_main__["a" /* default */]);

if(typeof module != 'undefined' && module.exports)
    module.exports = __WEBPACK_IMPORTED_MODULE_0__src_main__["a" /* default */];
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("DuR2"), __webpack_require__("f1Eh")(module)))

/***/ }),

/***/ "sfu5":
/***/ (function(module, exports) {

module.exports = function join(dataLeft, dataRight) {
    var len = dataLeft.length,
        keyL = Object.keys(dataLeft[0]),
        keyR = Object.keys(dataRight[0]);
        
    var keys = keyR.filter(function(kr){ return (keyL.indexOf(kr) === -1);});

    keys.forEach(function(k){
        for(var i = 0; i < len; i++) {
            dataLeft[i][k] = dataRight[i][k];    
        }
    });

    return dataLeft;
}


/***/ }),

/***/ "td/E":
/***/ (function(module, exports) {

module.exports = "<v-app id=\"inspire\">\n  <WebSocket ref=\"WebSocket\" @connect=\"connect\" />\n  <v-toolbar\n    color=\"blue-grey\"\n    dark\n    fixed\n    app\n    clipped-right\n  >\n    <v-toolbar-side-icon @click.stop=\"left = !left\">\n    </v-toolbar-side-icon>\n    <v-toolbar-title style=\"margin-right: 3em;\">{{ appName }}</v-toolbar-title>\n    <v-spacer></v-spacer>\n  </v-toolbar>\n  <v-content class=\"pa-2\">\n    <v-container fluid style=\"height: 90%\" class=\"pa-2\">\n      <v-layout fill-height row>\n          <v-flex xs5 fill-height class=\"pa-1\">\n            <Dimensionality ref=\"Dimensionality\"></Dimensionality>\n          </v-flex>\n          <v-flex xs7 fill-height class=\"pa-1\">\n            <TimeSeries  ref=\"TimeSeries\" />\n          </v-flex>\n      </v-layout>\n    </v-container>\n  </v-content>\n</v-app>\n";

/***/ }),

/***/ "vsA5":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var root = typeof self == 'object' && self.self === self && self ||
           typeof global == 'object' && global.global === global && global ||
           this;

var p3 = {
    allocate    : __webpack_require__("BpKz"),
    arrays      : __webpack_require__("mO0D"),
    aggregate   : __webpack_require__("L1ge"),
    pipeline    : __webpack_require__("OZ8g"),
    derive      : __webpack_require__("12xM"),
    match       : __webpack_require__("Xj71"),
    join        : __webpack_require__("sfu5"),
    stats       : __webpack_require__("lv5u"),
    embed       : __webpack_require__("CT2f"),
    toArray     : __webpack_require__("jLOe"),
    vector     : __webpack_require__("vxwt")
};

if(typeof root.p3 == 'object') {
    root.p3 = Object.assign(root.p3, p3);
} else {
    root.p3 = p3;
}

module.exports = p3;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("DuR2")))

/***/ }),

/***/ "vxwt":
/***/ (function(module, exports) {

module.exports = {
    add: vectorAdd,
    sum: vectorSum,
    avg: vectorAvg
}

function vectorAdd(a, b){
    var c = [];
    a.forEach(function(v, i){
        c[i] = v + b[i];
    });

    return c;
}

function vectorSum(vectors){
    var result = vectors[0],
        numberOfVectors = vectors.length;

    for(var i = 1; i < numberOfVectors; i++){
        result = vectorAdd(result, vectors[i]);
    }

    return result;
}

function _vectorAvg(a, b){
    var c = [];
    a.forEach(function(v, i){
        c[i] = (v + b[i]) * 0.5;
    });

    return c;
}

function vectorAvg(vectors){
    var result = vectors[0],
        numberOfVectors = vectors.length;

    for(var i = 1; i < numberOfVectors; i++){
        result =  _vectorAvg(result, vectors[i]);
    }

    return result;
}


/***/ }),

/***/ "w3S9":
/***/ (function(module, exports) {

module.exports = "<v-flex fill-height>\n  <v-toolbar dense flat v-if=\"!isComparisonMode\">\n  <v-switch\n    label=\"Intra-Comm\"\n    v-model=\"showIntraComm\"\n    v-on:change=\"visualize()\"\n  ></v-switch>\n  <v-spacer></v-spacer>\n  <v-slider\n    v-model=\"threshold\"\n    :thumb-size=\"24\"\n    :min=0\n    v-on:input=\"updateLink\"\n    label=\"link threshold\"\n  ></v-slider>\n  <span>{{thresholdValue}}</span>\n  </v-toolbar>\n  <v-card class=\"fill-height\">\n      <v-navigation-drawer temporary v-if=\"isComparisonMode\" v-model=\"drawer\" absolute style=\"padding: 3em 1em;\">\n        <p style=\"text-align: center\">\n          <v-slider\n            v-model=\"threshold\"\n            :thumb-size=\"24\"\n            :min=0\n            v-on:input=\"updateLink\"\n            label=\"link threshold\"\n          ></v-slider>\n          <span>{{thresholdValue}}</span>\n        </p>\n        <v-select \n          label=\"Metric\"\n          :items=\"allMetrics\"\n          multiple\n          v-model=\"metrics\"\n          :menu-props=\"{ maxHeight: '400' }\"\n          persistent-hint\n          v-on:change=\"updateMetrics\"\n        >\n        </v-select>\n      </v-navigation-drawer>\n      <v-btn\n        v-if=\"isComparisonMode\"\n        absolute\n        dark\n        fab\n        top\n        left\n        small\n        @click=\"drawer=!drawer\"\n        style=\"margin-top: 2em;\"\n        color=\"darken-2 blue\"\n      >\n        <v-icon>settings</v-icon>\n      </v-btn>\n    <div ref=\"container\" style=\"display: flex;\"></div>\n  </v-card>\n</v-flex>\n";

/***/ }),

/***/ "yGlp":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__("hxZH");


/* harmony default export */ __webpack_exports__["a"] = (function ({
  timesteps = 128,
  series = 8,
  interval = 1,
  props,
  label = {time: 'timestamp', series: 'sid'}
}) {
  let dsize = timesteps * series;
  let data = new Array(dsize);
  for(let i = 0; i < timesteps; i++) {
    for(let j = 0; j < series; j++) {
      let record = {};
      record[label.time] = i * interval;
      record[label.series] = j;
      for(let prop of props) {
          if(prop.hasOwnProperty('values')){
              let vid = parseInt( Math.round( Math.random() * (prop.values.length - 1) ) );
              record[prop.name] = prop.values[vid];
          } else {
              let value = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* boundedRandom */])(prop);
              record[prop.name] = (prop.dtype == 'float') ? parseFloat(value) : Math.round(value);
          }
      }
      data[i * series + j] = record;
    }
  }

  let schema = {};
  schema[label.time] = 'int';
  schema[label.series] = 'float';
  for(let prop of props) {
      schema[prop.name] = prop.dtype;
  }

  return {
    data,
    schema
  }
});

/***/ }),

/***/ "z27Q":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ColumnStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ctypes__ = __webpack_require__("h6yt");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__arrays__ = __webpack_require__("S2QL");



const __VERSION__ = 1.0;

function ColumnStore(arg){
    var cstore     = (this instanceof ColumnStore) ? this : {},
        options    = arg || {},
        columns    = [],                  // column-based binary data
        size       = options.size  || 0,   // max size
        count      = options.count || 0,   // number of entries stored
        types      = options.types || [],  // types of the columns
        attributes = options.attributes || options.keys || options.names || [],  // column attributes
        struct     = options.struct || options.schema || null,
        strValues  = options.strValues || {},  // string values 
        strLists   = options.strLists  || {},  // table lookaside buffer
        intervals  = {},
        indexes    = options.indexes || {},
        colStats   = {},
        colAlloc   = {},
        colRead    = {},                  // functions for reading values
        skip       = options.skip  || 0;

    if(typeof(struct) === 'object') initStruct(struct);

    function initCStore() {
        if(size && types.length === attributes.length && types.length > 0) {
            attributes.forEach(function(c, i){
                configureColumn(i);
                columns[i] = new colAlloc[c](size);
                if(!columns.hasOwnProperty(c)) {
                    Object.defineProperty(columns, c, {
                        get: function() { return columns[i]; }
                    });
                }
                if(intervals.hasOwnProperty(c)) {
                    cstore.intervalize(c, intervals[c]);
                }

                if(strValues[c] && Object.keys(strValues[c]).length > 0) {
                    strLists[c] = Object.keys(strValues[c]);
                }

            });
            columns.attributes = attributes;
            columns.keys = attributes;
            columns.types = types;
            columns.struct = struct;
            columns.strLists = strLists;
            columns.strValues = strValues;
            columns.uniqueValues = indexes;
            columns.size = size;
            columns.get = function(c) {
                var index = attributes.indexOf(c);
                if(index < 0 ) throw new Error("Error: No column named " + c);
                return columns[index];
            }
        } 
        return cstore;
    }

    function initStruct(s) {
        struct = s;
        if(Array.isArray(struct)) {
            struct.forEach(function(s){
                attributes.push(s.name);
                types.push(s.type || s.dtype);
            })
        } else {
            for(var k in struct){
                attributes.push(k);
                types.push(struct[k]);
            }
        }
        return struct;
    }

    function configureColumn(cid) {
        if(typeof(cid) == "string") cid = attributes.indexOf(cid);
        var f = attributes[cid];
        colAlloc[f] = __WEBPACK_IMPORTED_MODULE_0__ctypes__[types[cid]];
        var columnType = types[cid]
        if(columnType === 'string' || columnType === 'str'){
            if (!strValues.hasOwnProperty(f)) {
                strValues[f] = {};
                strLists[f] = [];
            }
            colRead[f] = function(value) {
                if(!strValues[f].hasOwnProperty(value)){
                    strValues[f][value] = strLists[f].length;
                    strLists[f].push(value);
                }
                return strValues[f][value];
            };
        } else if(['int', 'short', 'integer'].includes(columnType)) {
            colRead[f] = function(value) { return parseInt(value) || 0; };
        } else if(['float', 'double', 'numeric'].includes(columnType)){
            colRead[f] = function(value) { return parseFloat(value) || 0.0; };
        } else if(['date', 'time', 'datetime'].includes(columnType)){
            colRead[f] = function(value) { 
                let datetime = new Date(value);
                let ts = datetime.getTime() / 1000 - datetime.getTimezoneOffset() * 60; 
                return Math.floor(ts);
            };
        } else {
            throw new Error("Invalid data type for TypedArray data!")
        }
    }

    cstore.addRows = function(rowArray) {
        if(size === 0) {
            size = rowArray.length;
            initCStore();
        }
        if(count === 0 && skip > 0) {
            for(var j = 0; j<skip; j++)
                rowArray.shift();
        }
        rowArray.forEach(function(row, i){
            row.forEach(function(v,j){
                columns[j][count] = colRead[attributes[j]](v);
            });
            count++;
        });

        return count;
    }

    cstore.addObjects = function(objArray) {
        if(count === 0 && skip > 0) {
            for(var j = 0; j<skip; j++)
                objArray.shift();
        }
        objArray.forEach(function(obj, i){
            Object.keys(obj).forEach(function(v,j){
                if(typeof colRead[attributes[j]] !== 'function') {
                    console.log(attributes[j], j, v, obj)
                }
                columns[j][count] = colRead[attributes[j]](obj[v]);
            });
            count++;
        });
        return count;
    }

    cstore.addColumn = function(arg) {
        var props = arg || {},
            columnData = props.data || props.array,
            columnName = props.name,
            columnType = props.dtype,
            values = props.values || [];

        var cid = attributes.indexOf(columnName);
        if( cid < 0) {
            attributes.push(columnName);
            types.push(columnType);
            configureColumn(columnName);
            cid = types.length - 1;
            Object.defineProperty(columns, columnName, {
                get: function() { return columns[cid]; }
            });
        }

        if(columnData instanceof __WEBPACK_IMPORTED_MODULE_0__ctypes__[types[cid]]) {
            columns[cid] = columnData;
            if(values.length) {
                strLists[columnName] = values;
                strValues[columnName] = {};
                values.forEach(function(value, vi){
                    strValues[columnName][value] = vi;
                })
            }
        } else if(ArrayBuffer.isView(columnData)){
            columns[cid] = new colAlloc[columnName](size);
            for(var di = 0; di < size; di++) {
                columns[cid][di] = colRead[columnName](columnData[di]);
            }
        } else {
            throw new Error("Error: Invalid data type for columnArray!");
        }
        size = count = columnData.length;
    }

    cstore.metadata = cstore.info = function() {
        return {
            size: size,
            count: count,
            attributes: attributes,
            types: types,
            strLists: strLists,
            strValues: strValues,
            stats: cstore.stats()
        }
    }

    cstore.columns = function() {
        return columns;
    }

    cstore.data = function() {
        var data = columns;
        data.stats = cstore.stats();
        data.keys = attributes;
        data.size = size;
        data.strValues = strValues;
        data.strLists = strLists;
        data.dtypes = types;
        data.export = cstore.export;
        data._p4_cstore_version = __VERSION__;
        return data;
    }

    cstore.stats = function(col){
        var col = col || attributes;
        col.forEach(function(name, c){
            if(!colStats[c]){
                var min, max, avg;
                min = max = avg = columns[c][0];

                for(var i = 1; i < columns[c].length; i++){
                    var d = columns[c][i];
                    if(d > max) max = d;
                    else if(d < min) min = d;
                    avg = avg - (avg-d) / i;
                }
                if(max == min) max += 0.000001;
                colStats[name] = {min: min, max: max, avg: avg};
            }
        })
        return colStats;
    }

    cstore.domains = function(col){
        var col = col || attributes,
            domains = [];

        col.forEach(function(name, c){
            domains[name] = [colStats[name].min, colStats[name].max];
        })
        return domains;
    }

    cstore.ctypes = function() {
        return __WEBPACK_IMPORTED_MODULE_0__ctypes__;
    }

    cstore.size = size;

    cstore.exportAsJSON = function() {
        var rows = new Array(size);
        for(var ri = 0; ri < size; ri++) {
            var dataFrame = {};
            attributes.forEach(function(attr, ai) {
                if(types[ai] == 'string') {
                    dataFrame[attr] = strLists[attr][columns[ai][ri]];
                } else if(indexes.hasOwnProperty(attr)) {
                    dataFrame[attr] = indexes[attr][columns[ai][ri]];
                } else {
                    dataFrame[attr] = columns[ai][ri];
                }
            })
            rows[ri] = dataFrame;
        }
        return rows;
    }

    cstore.exportAsRowArray = function() {
        var rows = new Array(size);
        for(var ri = 0; ri < size; ri++) {
            var row = new Array(attributes.length);
            attributes.forEach(function(attr, ai) {
                if(types[ai] == 'string') {
                    row[ai] = strLists[attr][columns[ai][ri]];
                } else if(indexes.hasOwnProperty(attr)) {
                    row[ai] = indexes[attr][columns[ai][ri]];
                } else {
                    row[ai] = columns[ai][ri];
                }
            })
            rows[ri] = row;
        }
        return rows;
    }

    cstore.export = function(arg) {
        var format = arg || 'json';
        if(format == 'rowArray') {
            return cstore.exportAsRowArray();
        } else {
            return cstore.exportAsJSON();
        }
    }

    cstore.import = function({
        data,
        schema = null,
        type = 'json'
    }) {
        size = data.length;
        if(typeof(schema == 'object')) initStruct(schema);
        initCStore();
        if(type === 'json') {
            cstore.addObjects(data);
        } else {
            cstore.addRows(data);
        }
        
        return cstore;
    }

    cstore.scale = function(attr, factor) {
        let len = columns[attr].length;
        for(var i = 0; i < len; i++) {
            columns[attr] *= factor;
        }
        return cstore;
    }

    cstore.normalize = function(attr) {
        if(!colStats.hasOwnProperty(attr)) {
            cstore.stats();
        }
        let fid = attributes.indexOf(attr);
        let len = columns[attr].length;
        let max = colStats[f].max;
        let min = colStats[f].min;

        if(types[fid] === 'float') {
            for(var i = 0; i < len; i++) {
                columns[attr][i] = (columns[attr][i] - min) / (max - min);
            }
        } 
        return cstore;
    }

    cstore.intervalize = function(attr, interval) {
        intervals[attr] = interval;
        if(!colStats.hasOwnProperty(attr)) {
            cstore.stats([attr]);
        }
        let fid = attributes.indexOf(attr);
        let len = columns[attr].length;
        let min = colStats[f].min;

        if(types[fid] === 'int' || types[fid] === 'float') {
            for(var i = 0; i < len; i++) {
                columns[attr][i] = (columns[attr][i] - min) / interval;
            }
        } 
        return cstore;
    }

    cstore.index = function(attr) {
        let attrId = attributes.indexOf(attr);
        if(attrId === -1) throw Error('Invalid attribute for indexing');
        types[attrId] = 'int';
        indexes[attr] = Object(__WEBPACK_IMPORTED_MODULE_1__arrays__["unique"])(columns[attr]).sort(function(a, b) {
            return a - b;
        });
        let len = columns[attr].length;
        for(var i = 0; i < len; i++) {
            columns[attr][i] = indexes[attr].indexOf(columns[attr][i]); 
        }
        
        return cstore;
    }

    return initCStore();
}


/***/ })

},["NHnr"]);
//# sourceMappingURL=app.45e0f4dcb976a9a88996.js.map