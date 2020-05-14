function InvanaGraphUI(canvasHTMLSelector, nodesData, linksData) {

    const svg = d3.select(canvasHTMLSelector);
    const linksG = svg.append("g").attr("class", "links");
    const nodesG = svg.append("g").attr("class", "nodes");
    const htmlSelector = document.querySelector(canvasHTMLSelector);
    linksData = prepareLinksDataForCurves(linksData);


    const simulation = d3.forceSimulation()
        // .force("link", d3.forceLink().id(d => d.id))
        .force("center", d3.forceCenter(htmlSelector.clientWidth / 2, htmlSelector.clientHeight / 2))
        .force('charge', d3.forceManyBody().strength(0))
        .force('collide', d3.forceCollide(100));


    let links = linksG
        .selectAll("g")
        .data(linksData)
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
        .attr('stroke', linkFillColor)
        .attr("stroke-width", linkStrokeWidth)
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
        .attr('fill', linkTextColor)
        .attr('stroke', linkFillColor)
        .text((d, i) => `${d.label || d.id}`);

    let nodes = nodesG
        .selectAll("g")
        .data(nodesData)
        .enter().append("g")
        .attr("cursor", "pointer")
        .attr("class", "node")
        .call(d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded));

    const circles = nodes.append("circle")
        .attr("r", nodeRadius)
        .attr("fill", nodeFillColor)
        .attr("stroke", nodeBorderColor)
        .attr("stroke-width", nodeStrokeWidth);


    nodes.append("title")
        .text(function (d) {
            return d.properties.name || d.id;
        })
    nodes.append("text")
        .attr("dy", -16)
        .attr("dx", 6)
        .text(function (d) {
            return d.properties.name || d.id;
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

    svg.append("svg:defs").selectAll("marker")
        .data(linksData)
        .enter().append("svg:marker")
        .attr("id", (d, i) => "link-arrow-" + i)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", (d, i) => (nodeRadius - (nodeRadius / 4) + nodeStrokeWidth))
        .attr("refY", 0)
        .attr("markerWidth", 10)
        .attr("markerHeight", 10)
        .attr("orient", "auto")
        .attr("fill", linkFillColor)
        .attr("stroke", linkFillColor)
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");
    simulation
        .nodes(nodesData)
        .on("tick", ticked);

    simulation.force("link", d3.forceLink().links(linksData)
        .id((d, i) => d.id)
        .distance(linkDistance));


    function linkArc(d) {
        let dx = (d.target.x - d.source.x),
            dy = (d.target.y - d.source.y),
            dr = Math.sqrt(dx * dx + dy * dy),
            unevenCorrection = (d.sameUneven ? 0 : 0.5),
            arc = ((dr * d.maxSameHalf) / (d.sameIndexCorrected - unevenCorrection)) * linkCurvature;
        if (d.sameMiddleLink) {
            arc = 0;
        }
        return "M" + d.source.x + "," + d.source.y + "A" + arc + "," + arc + " 0 0," + d.sameArcDirection + " " + d.target.x + "," + d.target.y;
    }

    function ticked() {
        linkPaths.attr("d", linkArc)
        nodes
            .attr("transform", d => `translate(${d.x}, ${d.y})`);
    }

    function dragStarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.8).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragEnded(d) {
        if (!d3.event.active) simulation.alphaTarget(0.8);
        d.fx = null;
        d.fy = null;
    }
}
