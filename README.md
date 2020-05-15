# Graph Canvas 

Graph Canvas is [d3](https://d3js.org)v4 based Graph UI library built 
at [InvanaGraph](https://invana.io) for creating clean and beautiful 
graph data representations.

![screenshot](./screenshot.png)


Refer `examples/` folder for full implementation code. 
```html
<script src="/src/example-data.js"></script>
<script src="/src/canvas-utils.js"></script>
<script src="/src/canvas.js"></script>
<script>

    const links = Object.assign([], graphs.links);
    const nodes = Object.assign([], graphs.nodes);

    let canvasHTMLSelector = "#graphCanvas";

    function onNodeClick() {
        console.log("onNodeClick triggered")
    }

    function onNodeMouseOver() {
        console.log("onNodeMouseOver triggered")
    }

    function onNodeMouseOut() {
        console.log("onNodeMouseOut triggered")
    }


    function onLinkClick() {
        console.log("onLinkClick triggered")
    }

    function onLinkMouseOver() {
        console.log("onLinkMouseOver triggered")
    }

    function onLinkMouseOut() {
        console.log("onLinkMouseOut triggered")
    }


    const nodeOptions = {
        "Planet": {
            "bgImagePropertyKey": "image",
            // "bgImageUrl": "" - use this to set default backgroun image for this node or
            // bgImagePropertyKey to get data from the properties data
            "labelOptions": {
                "showLabel": true,
                "labelTextFn": (node) => "Planet " + node.properties.name,
            },
            "shapeOptions": {
                "radius": 24,
                "strokeWidth": "4px",
                "fillColor": "#ba4040",
                "inShapeHTML": "<i class=\"fas fa-globe\"></i>"
            },
            "tagOptions":{
                "tagHtml": "<i class=\"fas fa-tools\"></i>"
            }

        },
        "Satellite": {
            "bgImagePropertyKey": "image",
            "labelOptions": {
                "showLabel": true,
                "labelTextFn": (node) => node.properties.name,
            },
            "shapeOptions": {
                "radius": 24,
                "strokeWidth": "4px",
                "strokeColor": "#c4c4c4",
                "fillColor": "#519ad2",
                "inShapeHTMLFn": (node) => "<i class=\"fas fa-meteor\"></i>" //"<strong>" + node.properties.name.substring(0, 3) + "</strong>"
            },

        }
     }

    const nodesData = prepareNodesDataWithOptions(nodes, nodeOptions);
    const linksData = prepareLinksDataForCurves(links);


    console.log("nodesData", nodesData)
    canvas = new InvanaGraphUI(canvasHTMLSelector,
        nodesData,
        linksData,

        onNodeClick,
        onNodeMouseOver,
        onNodeMouseOut,

        onLinkClick,
        onLinkMouseOver,
        onLinkMouseOut,
    );
</script>
```

 

- [x] setNodeFillColor
- [x] setNodeRadius
- [x] setNodeStrokeColor
- [x] setNodeTagImage - one of the right bottom of node.
- [x] setNodeHtml
- [x] setNodeLabel
- [ ] setNodeShape [Not implementing during beta]

- [x] setLinkLength
- [x] setLinkStrokeColor
- [x] setLinkStrokeType
- [x] setLinkBorderColor
- [x] setLinkLabel
- [x] setLinkLabelColor
- [ ] setArrowHeadColor

- [ ] fixNodePosition
- [ ] releaseNodePosition
 
- [x] ZoomInCanvas
- [x] ZoomOutCanvas
- [x] pan

- [ ] CenterObjectsInCanvas
- [x] onDragStarted // control not given to user yet
- [x] onDragEnded // control not given to user yet






## Events

- [ ] onNodeMouseOver
- [ ] onNodeMouseOut
- [ ] onNodeClick
- [ ] onNodeDblClick
- [ ] onLinkMouseOver
- [ ] onLinkMouseOut
- [ ] onLinkClick
- [ ] onLinkDblClick
