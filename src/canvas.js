function InvanaGraphUI(canvasHTMLSelector,
                       nodesData,
                       linksData,
                       // node methods
                       onNodeMouseOver,
                       onNodeMouseOut,
                       onNodeClick,
                       // link methods
                       onLinkClick,
                       onLinkMouseOver,
                       onLinkMouseOut,
) {

    const svg = d3.select(canvasHTMLSelector);
    const everything = svg.append("g").attr("class", "everything");
    const linksG = everything.append("g").attr("class", "links");
    const nodesG = everything.append("g").attr("class", "nodes");
    const htmlSelector = document.querySelector(canvasHTMLSelector);
    const clientWidth = htmlSelector.clientWidth;
    const clientHeight = htmlSelector.clientHeight;


    const simulation = d3.forceSimulation()
        // .force("link", d3.forceLink().id(d => d.id))
        .force("center", d3.forceCenter(clientWidth / 2, clientHeight / 2))
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
        .attr('marker-end', (d, i) => 'url(#link-arrow-' + i + ')')
        .on("mouseover", function (d) {
            if (onLinkMouseOver) {
                onLinkMouseOver(d)
            }
        })
        .on("mouseout", function (d) {
            if (onLinkMouseOut) {
                onLinkMouseOut(d)
            }
        })
        .on("click", function (d) {
            if (onLinkClick) {
                onLinkClick(d)
            }
        });


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
            .on("end", dragEnded))
        .on("mouseover", function (d) {
            if (onNodeMouseOver) {
                onNodeMouseOver(d)
            }
        })
        .on("mouseout", function (d) {
            if (onNodeMouseOut) {
                onNodeMouseOut(d)
            }
        })
        .on("click", function (d) {
            if (onNodeClick) {
                onNodeClick(d)
            }
        });


    nodes.append("circle")
        .attr("r", (d) => d.meta.shapeOptions.radius)
        .attr("fill", (d) => d.meta.shapeOptions.fillColor)
    // .attr("stroke", (d) => d.meta.shapeOptions.strokeColor)
    // .attr("stroke-width", (d) => d.meta.shapeOptions.strokeWidth);

    const circles = nodes.append("circle")
        .attr("r", (d) => d.meta.shapeOptions.radius)
        .attr("fill", function (d) {
            if (d.meta && d.meta.bgImageUrl) {
                return "url(#pattern-node-" + d.id + ")";
            } else {
                return d.meta.shapeOptions.fillColor
            }
        })
        .attr("stroke", (d) => d.meta.shapeOptions.strokeColor)
        .attr("stroke-width", (d) => d.meta.shapeOptions.strokeWidth);


    nodes.append('g')
        .attr('transform', function (d) {
                const side = 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4);
                const dx = d.meta.shapeOptions.radius - (side / 2) * (2.5);
                const dy = d.meta.shapeOptions.radius - (side / 2) * (2.5) * (2.5 / 3) - 4;
                return 'translate(' + [dx, dy] + ')'
            }
        )
        .append("foreignObject")
        .attr("width", (d) => 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4)) // side
        .style("font-size", function (d) {
            return "12px";
        })
        .attr("height", (d) => 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4)) // side
        .append("xhtml:body")
        .style("text-align", "center")
        .style("color", (d) => d.meta.shapeOptions.textColor)
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .style("background-color", "transparent")
        .html(function (d) {
            return d.meta.shapeOptions.inShapeHTML
        });

    nodes.append('svg:defs').append('svg:pattern')
        .attr("id", function (d) {
            return "pattern-node-" + d.id + "";
        })
        .attr('patternUnits', 'objectBoundingBox')
        .attr('width', (d) => (d.meta.shapeOptions.radius * 2) + 4)
        .attr('height', (d) => (d.meta.shapeOptions.radius * 2) + 4)
        .append('svg:image')
        .attr("xlink:href", function (d) {
            if (d.meta && d.meta.bgImageUrl) {
                return d.meta.bgImageUrl;
            }
        })
        .attr('x', -2)
        .attr('y', -2)
        .attr('width', (d) => (d.meta.shapeOptions.radius * 2) + 4)
        .attr('height', (d) => (d.meta.shapeOptions.radius * 2) + 4);


    nodes.append("title")
        .text(function (d) {
            return d.meta.labelOptions.labelText || d.id;
        })
    nodes.append("text")
        .attr("dy", -16)
        .attr("dx", 6)
        .text(function (d) {
            return d.meta.labelOptions.labelText || d.id;
        })
        .attr("stroke", (d) => d.meta.labelOptions.labelColor)
        .attr("fill", (d) => d.meta.labelOptions.labelColor)
        .style("font-size", function (d, i) {
            return "12px";
        })
        .style("font-weight", function (d, i) {
            return "bold";
        })
        .style("display", (d) => (d.meta.labelOptions.showLabel) ? "block" : "none")
        .style("text-shadow", function (d, i) {
            return "1px 1px " + d3.rgb(d.meta.labelOptions.labelColor).darker(1);
        });


    everything.append("svg:defs").selectAll("marker")
        .data(linksData)
        .enter()
        .append("svg:marker")
        .attr("id", (d, i) => "link-arrow-" + i)
        .attr("viewBox", "0 -5 10 10")
        .attr("refY", 0)
        .attr("refX", (d, i) => (nodeRadius - (nodeRadius / 4) + nodeStrokeWidth))
        // .attr("refX", (d, i) => (d.meta.shapeOptions.radius - (d.meta.shapeOptions.radius / 4) +
        //       d.meta.shapeOptions.strokeWidth))
        //
        // .attr("fill", (d) => d.meta.shapeOptions.fillColor)
        // .attr("stroke", (d) => d.meta.shapeOptions.strokeColor)
        .attr("fill", (d) => linkFillColor)
        .attr("stroke", (d) => linkFillColor)

        .attr("markerWidth", 10)
        .attr("markerHeight", 10)
        .attr("orient", "auto")

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


    svg.call(d3.zoom()
        .extent([[0, 0], [clientWidth, clientHeight]])
        // .scaleExtent([1, 8])
        .on("zoom", zoomed));

    function zoomed() {
        everything.attr("transform", d3.event.transform);
    }


}
