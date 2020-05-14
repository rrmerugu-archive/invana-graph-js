const svg = d3.select('#mySVG')
const nodesG = svg.select("g.nodes")
const linksG = svg.select("g.links")


const nodeRadius = 24;
const nodeFillColor = "#999999";
const nodeBorderColor = "#506d4d";
const nodeStrokeWidth = 5;

const linkDistance = 300;
const linkCurvature = .55;
const linkStrokeWidth = '2px';
const linkFillColor = "#999999";
const linkTextColor = "#9j9j9j";

let graphs = {
    "nodes": [
        {
            "label": "Satellite",
            "id": 1,
            "properties": {
                "name": "Moon"
            }
        },
        {
            "label": "Planet",
            "id": 2,
            "properties": {
                "name": "Earth"
            }
        },
        {
            "label": "Planet",
            "id": 3,
            "properties": {
                "name": "Mars"
            }
        },
        {
            "label": "Planet",
            "id": 4,
            "properties": {
                "name": "Jupiter"
            }
        },
        {
            "label": "Satellite",
            "id": 5,
            "properties": {
                "name": "Europa"
            }
        },
        {
            "label": "Satellite",
            "id": 6,
            "properties": {
                "name": "Lo"
            }
        },
        {
            "label": "Satellite",
            "id": 7,
            "properties": {
                "name": "Dia"
            }
        }
    ],
    "links": [
        {
            "source": 2,
            "target": 1,
            "label": "has_satellite",
            "properties": {
                "distance": "xyz kilometers"
            }
        },
        {
            "source": 4,
            "target": 5,
            "label": "has_satellite",
            "properties": {
                "distance": "xyz kilometers"
            }
        },
        {
            "source": 4,
            "target": 6,
            "label": "has_satellite",
            "properties": {
                "distance": "xyz kilometers"
            }
        },
        {
            "source": 4,
            "target": 7,
            "label": "has_satellite",
            "properties": {
                "distance": "xyz kilometers"
            }
        }
    ]
}
