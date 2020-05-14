function prepareLinksDataForCurves(links) {
    /*
    This method will set attributes on to the links that will
    help us controls the curves of the links.
     */
    links.forEach(function (link) {

        // find other links with same target+source or source+target
        let same = graphs.links.filter(function (v, i) {
            return ((v.source === link.source && v.target === link.target));
        })
        let sameAlt = graphs.links.filter(function (v, i) {
            return ((v.source === link.target && v.target === link.source));
        })

        let sameAll = same.concat(sameAlt);
        sameAll.forEach(function (s, i) {
            s.sameIndex = (i + 1);
            s.sameTotal = sameAll.length;
            s.sameTotalHalf = (s.sameTotal / 2);
            s.sameUneven = ((s.sameTotal % 2) !== 0);
            s.sameMiddleLink = ((s.sameUneven === true) && (Math.ceil(s.sameTotalHalf) === s.sameIndex));
            s.sameLowerHalf = (s.sameIndex <= s.sameTotalHalf);
            s.sameArcDirection = s.sameLowerHalf ? 0 : 1;
            s.sameIndexCorrected = s.sameLowerHalf ? s.sameIndex : (s.sameIndex - Math.ceil(s.sameTotalHalf));

            if (s.sameIndexCorrected === 2) {
                s.sameArcDirection = 1;
            }
            if (s.sameIndexCorrected === 1) {
                s.sameArcDirection = 0;
            }
        });
    });

    links.sort(function (a, b) {
        if (a.sameTotal < b.sameTotal) return -1;
        if (a.sameTotal > b.sameTotal) return 1;
        return 0;
    });

    const maxSame = links[links.length - 1].sameTotal;

    links.forEach(function (link, i) {
        links[i].maxSameHalf = Math.round(maxSame / 3);
    });


    return links.map(link => {
        let obj = link;
        obj.source = link.source;
        obj.target = link.target;
        return obj;
    })
}


function prepareNodesDataWithOptions(nodes, options) {
    /*
        options = {
            "Planet": {
                "bgImagePropertyKey": "image",
                "nodeShape": "circle",
                "nodeShapeOptions": {
                    "radius": "20",
                    "strokeWidth": "2px",
                    "strokeColor": "#333333",
                    "fillColor": "#999999"
                }
            },
             "Satellite": {
                "bgImageUrl": "https://pngimg.com/uploads/moon/moon_PNG19.png",
                "nodeShape": "circle",
                "nodeShapeOptions": {
                    "radius": "20",
                    "strokeWidth": "2px",
                    "strokeColor": "#333333",
                    "fillColor": "#999999"
                }
            }
        }

     */

    if (typeof options === "undefined") {
        options = {};
    }

    nodes.forEach(function (node, index) {

        // check if options data has node.label meta data or set defaults.
        if (node.label in options) {
            node.meta = Object.assign({}, options[node.label]);
        }
        if (!node.meta) {
            node.meta = {"bgImageUrl": null, "nodeShape": "circle"};
        }
        if (!node.meta.nodeShapeOptions) {
            node.meta.nodeShapeOptions = {}
        }
        if (node.meta.bgImagePropertyKey) {
            node.meta.bgImageUrl = node.properties[node.meta.bgImagePropertyKey];
        }
        if (typeof node.meta.showLabel === "undefined") {
            node.meta.showLabel = showLabelDefaultChoice
        }

        if (!node.meta.nodeShapeOptions.radius) {
            node.meta.nodeShapeOptions.radius = nodeRadius
        }
        if (!node.meta.nodeShapeOptions.strokeWidth) {
            node.meta.nodeShapeOptions.strokeWidth = nodeStrokeWidth
        }
        if (!node.meta.nodeShapeOptions.strokeColor) {
            node.meta.nodeShapeOptions.strokeColor = nodeStrokeColor
        }
        if (!node.meta.nodeShapeOptions.fillColor) {
            node.meta.nodeShapeOptions.fillColor = nodeFillColor
        }
        if (!node.meta.nodeShapeOptions.textColor) {
            node.meta.nodeShapeOptions.textColor = nodeTxtColor
        }
        if (!node.meta.nodeShapeOptions.labelColor) {
            node.meta.nodeShapeOptions.labelColor = nodeLabelColor;
        }

        if (!node.meta.nodeShapeOptions.labelBgColor) {
            node.meta.nodeShapeOptions.labelBgColor = nodeLabelBgColor
        }


        if (node.meta.centerHTMLFn) {
            node.meta.centerHTML = node.meta.centerHTMLFn(node);
        }
        if (node.meta.labelTextFn) {
            node.meta.labelText = node.meta.labelTextFn(node);
        } else {
            node.meta.labelText = node.properties.name
        }
    });

    return nodes;
}
