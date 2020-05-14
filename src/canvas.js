const svg = d3.select('#mySVG')
const nodesG = svg.select("g.nodes")
const linksG = svg.select("g.links")
const nodeRadius = 12;
var graphs = {
    "nodes": [{
        "name": "Peter",
        "label": "Person 1",
        "id": 1
    },
        {
            "name": "Michael",
            "label": "Person 2",
            "id": 2
        },
        {
            "name": "Michael",
            "label": "Person 3",
            "id": 3
        },
        {
            "name": "Michael",
            "label": "Person 4",
            "id": 4
        }
    ],
    "links": [{
        "source": 1,
        "target": 2,
        "type": "KNOWS 1.2.1",
        "since": 2010
    }, {
        "source": 2,
        "target": 1,
        "type": "knows 1.2.2",
        "since": 2010
    }, {
        "source": 1,
        "target": 2,
        "type": "knows 1.2.3",
        "since": 2010
    }, {
        "source": 1,
        "target": 2,
        "type": "knows 1.2.4",
        "since": 2010
    },
 {
        "source": 1,
        "target": 2,
        "type": "knows 1.2.5",
        "since": 2010
    },

        {
            "source": 1,
            "target": 3,
            "type": "ALSO knows 3",
            "since": 2010
        }, {
            "source": 1,
            "target": 4,
            "type": "ALSO knows 4.1.1",
            "since": 2010
        }, {
            "source": 1,
            "target": 4,
            "type": "ALSO knows 4.1.2",
            "since": 2010
        }, {
            "source": 2,
            "target": 4,
            "type": "ALSO knows 4.3",
            "since": 2010
        },

    ]
}


// // get the
// let graphLinksCountAggregate = {};
// graphs.links.forEach(function (d, i) {
//     const uniqueId = d.target + "-" + d.source;
//     if (uniqueId in graphLinksCountAggregate) {
//         graphLinksCountAggregate[uniqueId] += 1;
//     } else {
//         graphLinksCountAggregate[uniqueId] = 1;
//     }
// });
//
// graphs.links.forEach(function (d, i) {
//     let _ = graphLinksCountAggregate[d.target + "-" + d.source];
//
//     if (d.source + "-" + d.target in graphLinksCountAggregate) {
//         _ += graphLinksCountAggregate[d.source + "-" + d.target]
//     }
//     graphs.links[i].nLinksbetweenNodes = _
// });


// graphs.links.forEach(function (s, i) {
//     graphs.links[i].sameIndex = (i + 1);
//     graphs.links[i].sameTotal = graphs.links.length;
//     graphs.links[i].sameTotalHalf = (graphs.links[i].sameTotal / 2);
//     graphs.links[i].sameUneven = ((graphs.links[i].sameTotal % 2) !== 0);
//     graphs.links[i].sameMiddleLink = ((graphs.links[i].sameUneven === true) && (Math.ceil(graphs.links[i].sameTotalHalf) === graphs.links[i].sameIndex));
//     graphs.links[i].sameLowerHalf = (graphs.links[i].sameIndex <= graphs.links[i].sameTotalHalf);
//     graphs.links[i].sameArcDirection = graphs.links[i].sameLowerHalf ? 0 : 1;
//     graphs.links[i].sameIndexCorrected = graphs.links[i].sameLowerHalf ? graphs.links[i].sameIndex : (graphs.links[i].sameIndex - Math.ceil(graphs.links[i].sameTotalHalf));
//
//
// });
graphs.links.forEach(function (link) {

    // find other links with same target+source or source+target


    let same = graphs.links.filter(function (v, i) {
        return ((v.source === link.source && v.target === link.target));
    })
    let sameAlt = graphs.links.filter(function (v, i) {
        return ((v.source === link.target && v.target === link.source));
    })

    let sameAll = same.concat(sameAlt);
    sameAll.forEach(function (s, i) {
        //
        // s.sameIndex = (i + 1);
        // s.sameTotal = sameAll.length;
        // s.sameTotalHalf = (s.sameTotal / 2);
        // s.sameUneven = ((s.sameTotal % 2) !== 0);
        // s.sameMiddleLink = ((s.sameUneven === true) && (Math.ceil(s.sameTotalHalf) === s.sameIndex));
        // s.sameLowerHalf = (s.sameIndex <= s.sameTotalHalf);
        // s.sameArcDirection = s.sameLowerHalf ? 0 : 1;
        // s.sameIndexCorrected = s.sameLowerHalf ? s.sameIndex : (s.sameIndex - Math.ceil(s.sameTotalHalf));
        //

        s.sameIndex = (i + 1);
        s.sameTotal = sameAll.length;
        s.sameTotalHalf = (s.sameTotal / 2);
        s.sameUneven = ((s.sameTotal % 2) !== 0);
        s.sameMiddleLink = ((s.sameUneven === true) && (Math.ceil(s.sameTotalHalf) === s.sameIndex));
        s.sameLowerHalf = (s.sameIndex <= s.sameTotalHalf);
        s.sameArcDirection = s.sameLowerHalf ? 0 : 1;
        s.sameIndexCorrected = s.sameLowerHalf ? s.sameIndex : (s.sameIndex - Math.ceil(s.sameTotalHalf));

        // s.sameIndex = (i + 1);
        // s.sameTotal = sameAll.length;
        // s.sameTotalHalf = (s.sameTotal / 2);
        // s.sameUneven = ((s.sameTotal % 2) !== 0);
        // s.sameMiddleLink = ((s.sameUneven === true) && (Math.ceil(s.sameTotalHalf) === s.sameIndex));
        // s.sameLowerHalf = (s.sameIndex <= s.sameTotalHalf);
        // s.sameArcDirection = s.sameLowerHalf ? 0 : 1;
        // s.sameIndexCorrected = s.sameLowerHalf ? s.sameIndex : (s.sameIndex - Math.ceil(s.sameTotalHalf));
    });
});

graphs.links.sort(function (a, b) {
    if (a.sameTotal < b.sameTotal) return -1;
    if (a.sameTotal > b.sameTotal) return 1;
    return 0;
});

console.log("graphs.links", graphs.links)
var maxSame = graphs.links[graphs.links.length - 1].sameTotal;

graphs.links.forEach(function (link, i) {
    graphs.links[i].maxSameHalf = Math.round(maxSame / 3);
});

// sort by  sameIndex
graphs.links.sort(function (a, b) {
    if (a.sameIndex < b.sameIndex) return -1;
    if (a.sameIndex > b.sameIndex) return 1;
    return 0;
});

svg.append("svg:defs").selectAll("marker")
    .data(graphs.links)
    .enter().append("svg:marker")
    .attr("id", (d, i) => "link-arrow-" + i)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", (nodeRadius * 1.5))
    .attr("refY", 0)
    .attr("markerWidth", nodeRadius)
    .attr("markerHeight", nodeRadius)
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

const htmtSelector = document.querySelector("#mySVG");
const simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(d => d.id))
    .force("center", d3.forceCenter(htmtSelector.clientWidth / 2, htmtSelector.clientHeight / 2))
    .force('link', d3.forceLink().id(d => d.id).distance(100))
    .force('charge', d3.forceManyBody().strength(-50))
    .force('collide', d3.forceCollide(25));


let linksData = graphs.links.map(link => {
    var obj = link;
    obj.source = link.source;
    obj.target = link.target;
    return obj;
})

const links = linksG
    .selectAll("g")
    .data(graphs.links)
    .enter().append("g")
    .attr("cursor", "pointer")

const linkPaths = links
    .append("path")
    .attr("id", function (d, i) {
        return "link-" + i;
    })
    .attr("association-id", function (d, i) {
        return "link-" + d.target + "-" + d.source;
    })
    .attr("sameIndexCorrected", function (d, i) {
        return d.sameIndexCorrected;
    })
    .attr('stroke', '#444444')
    // .attr('opacity', 0.75)
    .attr("stroke-width", 1)
    .attr("fill", "transparent")
    .attr('marker-end', (d, i) => 'url(#link-arrow-' + i + ')');

const linkText = links
    .append("text")
    .attr("dy", 4)
    .append("textPath")
    .attr("xlink:href", function (d, i) {
        return "#link-" + i;
    })
    .style("text-anchor", "middle")

    .attr("startOffset", "50%")
    .attr('stroke', '#444444')
    // .attr('fill', '#ffffff')
    // .attr('opacity', 1)
    .text((d, i) => `${d.type}`);

const nodes = nodesG
    .selectAll("g")
    .data(graphs.nodes)
    .enter().append("g")
    .attr("cursor", "pointer")
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

const circles = nodes.append("circle")
    .attr("r", nodeRadius)
    .attr("fill", "#333333")
// .attr("opacity", "0.3")

nodes.append("title")
    .text(function (d) {
        return d.label;
    })
nodes.append("text")
    .attr("dy", -16)
    .attr("dx", 6)
    .text(function (d) {
        return d.label || d.id;
    })
    .style("fill", function (d, i) {
        return "#c1c1c1";
    })
    .style("font-size", function (d, i) {
        return "12px";
    })
    .style("font-weight", function (d, i) {
        return "bold";
    })
    .style("text-shadow", function (d, i) {
        return "1px 1px #424242";
    });

simulation
    .nodes(graphs.nodes)
    .on("tick", ticked);

simulation.force("link", d3.forceLink().links(linksData)
    .id((d, i) => d.id)
    .distance(200));

// function linkArc(d) {
//
//     //
//     var dx = (d.target.x - d.source.x),
//         dy = (d.target.y - d.source.y),
//         dr = Math.sqrt(dx * dx + dy * dy);
//     // unevenCorrection = (d.sameUneven ? 0 : 0.5);
//     // // let unevenCorrection = (d.sameTotal % d.sameIndexCorrected === 1) ? 0 : 0.5;
//     // // curvature term defines how tight the arcs are (lower number = tigher curve)
//     // var curvature = 1.8,
//     //     arc = (1.0 / curvature) * ((dr * d.maxSameHalf) / (d.sameIndexCorrected ));
//     //
//     // //console.log(d.maxSameHalf)
//     // //d.maxSameHalf always showing zero...
//     // if (d.sameMiddleLink) {
//     //     arc = 0;
//     // }
//
//     // let unevenCorrection = (d.sameUneven === 0 ? 0 : 0.5);
//     let unevenCorrection = (d.sameTotal % d.sameIndexCorrected === 1) ? 0 : 0.5;
//     // curvature term defines how tight the arcs are (lower number = tigher curve)
//
//     // console.log("dr", dr)
//     // console.log("d", d)
//     // console.log("unevenCorrection", unevenCorrection)
//
//     var curvature = 2.5,
//         arc = (1.0 / curvature) * ((dr * d.maxSameHalf) / (d.sameIndexCorrected - unevenCorrection));
//
//     // console.log("======arc", arc)
//     if (d.sameMiddleLink) {
//         arc = 0;
//     }
//     // console.log("=============")
//
//     return "M" + d.source.x + "," + d.source.y + "A" + arc + "," + arc + " 0 0," + d.sameArcDirection + " " + d.target.x + "," + d.target.y;
// }
// some more info: http://stackoverflow.com/questions/11368339/drawing-multiple-edges-between-two-nodes-with-d3
function linkArc(d) {
    var dx = (d.target.x - d.source.x),
        dy = (d.target.y - d.source.y),
        dr = Math.sqrt(dx * dx + dy * dy),
        unevenCorrection = (d.sameUneven ? 0 : 0.5),
        arc = ((dr * d.maxSameHalf) / (d.sameIndexCorrected - unevenCorrection));

    if (d.sameMiddleLink
        // && (d.sameTotal % d.sameIndexCorrected === 1)
    ) {
        arc = 0;
    }

    return "M" + d.source.x + "," + d.source.y + "A" + arc + "," + arc + " 0 0," + d.sameArcDirection + " " + d.target.x + "," + d.target.y;
}

function ticked() {
    linkPaths.attr("d", linkArc)

    // linkPaths.attr("d", function (d) {
    //     // length of current path
    //     var pl = this.getTotalLength(),
    //         // radius of circle plus backoff
    //         r = (nodeRadius) * 3,
    //         // position close to where path intercepts circle
    //         m = this.getPointAtLength(pl - r);
    //
    //     // var dx = m.x - d.source.x,
    //     //     dy = m.y - d.source.y,
    //     //     dr = Math.sqrt(dx * dx + dy * dy);
    //
    //     // curvature term defines how tight the arcs are (lower number = tigher curve)
    //     var curvature = 1.5;
    //
    //
    //     // graphLinksCountAggregate[uniqueId] = 1
    //     // graphs.links[i].nLinksbetweenNodes = graphLinksCountAggregate[uniqueId];
    //     //
    //     // var unevenCorrection = (d.nLinksbetweenNodes % d.sameIndexCorrected === 1 ? 0 : 0.5);
    //     //
    //     // let arc;
    //     // //d.maxSameHalf always showing zero...
    //     // if ((d.nLinksbetweenNodes === 1 && d.sameIndexCorrected === 1)
    //     //     || (d.nLinksbetweenNodes === 3 && d.sameIndexCorrected === 1)
    //     //     || (d.nLinksbetweenNodes === 5 && d.sameIndexCorrected === 1)
    //     // ) {
    //     // //        if (d.sameMiddleLink === 0) {
    //     //
    //     //
    //     //
    //     //     arc = 0;
    //     // } else {
    //     //     console.log("====, ", unevenCorrection)
    //     //     arc = (1.0 / curvature) * ((dr * d.maxSameHalf) / (d.sameIndexCorrected - unevenCorrection));
    //     // }
    //
    //           var dx = (d.target.x - d.source.x),
    //             dy = (d.target.y - d.source.y),
    //             dr = Math.sqrt(dx * dx + dy * dy),
    //             unevenCorrection = (d.sameUneven ? 0 : 0.5);
    //         // curvature term defines how tight the arcs are (lower number = tigher curve)
    //         var curvature = 1.8;
    //
    //         console.log("==unevenCorrection", unevenCorrection)
    //         let arc = (1.0 / curvature) * ((dr * d.maxSameHalf) );// / (d.sameIndexCorrected - unevenCorrection));
    //
    //         //console.log(d.maxSameHalf)
    //         //d.maxSameHalf always showing zero...
    //         if (d.sameMiddleLink) {
    //             arc = 0;
    //         }
    //
    //
    //     // console.log("assoc", document.querySelectorAll('[association-id*="link-' + d.target.id + "-" + d.source.id + '"]').length)
    //     // if (document.querySelectorAll('[association-id*="link-' + d.target.id + "-" + d.source.id + '"]').length === 1) {
    //     //     arc = 0;
    //     // }
    //
    //     return "M" + d.source.x + "," + d.source.y + "A" + arc + "," + arc + " 0 0," + d.sameArcDirection + " " + d.target.x + "," + d.target.y;
    // });


    nodes
        .attr("transform", d => `translate(${d.x}, ${d.y})`);


}

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}
