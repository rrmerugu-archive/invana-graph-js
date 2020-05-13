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
        "type": "KNOWS",
        "since": 2010
    }, {
        "source": 2,
        "target": 1,
        "type": "ALSO knows",
        "since": 2010
    }, {
        "source": 1,
        "target": 2,
        "type": "ALSO knows 2",
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
            "type": "ALSO knows 4",
            "since": 2010
        }, {
            "source": 1,
            "target": 4,
            "type": "ALSO knows 4.2",
            "since": 2010
        }, {
            "source": 2,
            "target": 4,
            "type": "ALSO knows 4",
            "since": 2010
        },

    ]
}
graphs.links.sort(function (a, b) {
    var keyA = new Date(a.sameTotal),
        keyB = new Date(b.sameTotal);
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
});


// get the
let graphLinksCountAggregate = {};
graphs.links.forEach(function (d, i) {
    const uniqueId = d.target + "-" + d.source;
    if (uniqueId in graphLinksCountAggregate) {
        graphLinksCountAggregate[uniqueId] += 1;
    } else {
        graphLinksCountAggregate[uniqueId] = 1;
    }
});

graphs.links.forEach(function (d, i) {
    let _ = graphLinksCountAggregate[d.target + "-" + d.source];

    if (d.source + "-" + d.target in graphLinksCountAggregate) {
        _ += graphLinksCountAggregate[d.source + "-" + d.target]
    }
    graphs.links[i].nLinksbetweenNodes = _
});


graphs.links.forEach(function (s, i) {
    graphs.links[i].sameIndex = (i + 1);
    graphs.links[i].sameTotal = graphs.links.length;
    graphs.links[i].sameTotalHalf = (s.sameTotal / 2);
    graphs.links[i].sameUneven = ((s.sameTotal % 2) !== 0);
    graphs.links[i].sameMiddleLink = ((s.sameUneven === true) && (Math.ceil(s.sameTotalHalf) === s.sameIndex));
    graphs.links[i].sameLowerHalf = (s.sameIndex <= s.sameTotalHalf);
    graphs.links[i].sameArcDirection = s.sameLowerHalf ? 0 : 1;
    graphs.links[i].sameIndexCorrected = s.sameLowerHalf ? s.sameIndex : (s.sameIndex - Math.ceil(s.sameTotalHalf));


});


console.log("graphs.links", graphs.links)
var maxSame = graphs.links[graphs.links.length - 1].sameTotal;

graphs.links.forEach(function (link, i) {
    graphs.links[i].maxSameHalf = Math.round(maxSame / 2);
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


const simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(d => d.id))
    .force("charge", d3.forceManyBody().strength(-600))
    .force("center", d3.forceCenter(500 / 2, 500 / 2));

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
    .attr('stroke', '#444444')
    // .attr('opacity', 0.75)
    .attr("stroke-width", 1)
    .attr("fill", "transparent")
    .attr('marker-end', (d, i) => 'url(#link-arrow-' + i + ')');

const linkText = links
    .append("text")
    .attr("dy", -4)
    .append("textPath")
    .attr("xlink:href", function (d, i) {
        return "#link-" + i;
    })
    .style("text-anchor", "middle")

    .attr("startOffset", "50%")
    .attr('stroke', '#444444')
    // .attr('opacity', 1)
    .text((d, i) => `text is ${i}`);

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

function ticked() {

    linkPaths.attr("d", function (d) {
        // length of current path
        var pl = this.getTotalLength(),
            // radius of circle plus backoff
            r = (nodeRadius) * 3,
            // position close to where path intercepts circle
            m = this.getPointAtLength(pl - r);

        var dx = m.x - d.source.x,
            dy = m.y - d.source.y,
            dr = Math.sqrt(dx * dx + dy * dy);

        // curvature term defines how tight the arcs are (lower number = tigher curve)
        var curvature = 1.5;


        // graphLinksCountAggregate[uniqueId] = 1
        // graphs.links[i].nLinksbetweenNodes = graphLinksCountAggregate[uniqueId];

        const selector = '[association-id*="link-' + d.target.id + "-" + d.source.id + '"]';
        const selector2 = '[association-id*="link-' + d.source.id + "-" + d.target.id + '"]';
        let createdLinksCount = document.querySelectorAll(selector).length + document.querySelectorAll(selector2).length;


        var unevenCorrection = ( d.nLinksbetweenNodes % createdLinksCount === 1 ? 0 : 0.5);

        let arc;
        //d.maxSameHalf always showing zero...
        if ((d.nLinksbetweenNodes === 1 && createdLinksCount === 1)
            || (d.nLinksbetweenNodes === 3 && createdLinksCount === 1)
            || (d.nLinksbetweenNodes === 5 && createdLinksCount === 1)
        ) {
            arc = 0;
        } else {
            console.log("====, ", unevenCorrection)
            arc = (1.0 / curvature) * ((dr * d.maxSameHalf) / (d.sameIndexCorrected - unevenCorrection));
        }

        // console.log("assoc", document.querySelectorAll('[association-id*="link-' + d.target.id + "-" + d.source.id + '"]').length)
        // if (document.querySelectorAll('[association-id*="link-' + d.target.id + "-" + d.source.id + '"]').length === 1) {
        //     arc = 0;
        // }

        return "M" + d.source.x + "," + d.source.y + "A" + arc + "," + arc + " 0 0," + d.sameArcDirection + " " + d.target.x + "," + d.target.y;
    });


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
