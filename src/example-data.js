
let graphs = {
    "nodes": [
        {
            "id": 1,
            "label": "Satellite",
            "properties": {
                "name": "Moon",
                "image": "https://pngimg.com/uploads/moon/moon_PNG19.png"
            }
        },
        {
            "label": "Planet",
            "id": 2,
            "properties": {
                "name": "Earth",
                "image": "https://icons.iconarchive.com/icons/dtafalonso/modern-xp/512/ModernXP-73-Globe-icon.png"
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
