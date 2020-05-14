const nodeRadius = 24;
const nodeFillColor = "#333333";
const nodeTxtColor = "#efefef";
const nodeStrokeColor = "#4385b8";
const nodeStrokeWidth = 5;

const linkDistance = 300;
const linkCurvature = .55;
const linkStrokeWidth = '2px';
const linkFillColor = "#727272";
const linkTextColor = "#727272";

let graphs = {
    "nodes": [
        {
            "id": 1,
            "type": "Vertex",
            "label": "Satellite",
            "properties": {
                "name": "Moon",
                "image": "https://pngimg.com/uploads/moon/moon_PNG19.png"
            },
            "meta": {
                "bgImageUrl": "https://pngimg.com/uploads/moon/moon_PNG19.png",
                "shape": "circle",
                "shapeOptions": {
                    "radius": "14px",
                    "strokeWidth": "2px",
                    "strokeColor": "#333333",
                    "fillColor": "#999999"
                }
            }
        },
        {
            "label": "Planet",
            "id": 2,
            "properties": {
                "name": "Earth",
                "image": "https://icons.iconarchive.com/icons/dtafalonso/modern-xp/512/ModernXP-73-Globe-icon.png"
            },
            "meta": {
                "bgImageUrl": "https://icons.iconarchive.com/icons/dtafalonso/modern-xp/512/ModernXP-73-Globe-icon.png"
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
            "source": 1,
            "target": 2,
            "label": "tidally_locked",
            "properties": {}
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
