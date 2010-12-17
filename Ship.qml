import QtQuick 1.0

Item {
    id: ship

    property int dx: 0
    property int dy: 0
    property int step: 4

    z: 5

    Image {
        id: ship_img
        anchors.fill: parent
        source: "./data/ship-0.png"
    }

    states: [
        State {
            name: ""
            PropertyChanges { target: ship_img; rotation: 0}
            PropertyChanges { target: ship; dx: 0; dy: -step }
        },

        State {
            name: "right"
            PropertyChanges { target: ship_img; rotation: 90}
            PropertyChanges { target: ship; dx: step; dy: 0 }
        },

        State {
            name: "left"
            PropertyChanges { target: ship_img; rotation: -90}
            PropertyChanges { target: ship; dx: -step; dy: 0 }
        },

        State {
            name: "bottom"
            PropertyChanges { target: ship_img; rotation: 180}
            PropertyChanges { target: ship; dx: 0; dy: step }
        }
    ]

    focus: true
    Keys.onLeftPressed: state = "left";
    Keys.onRightPressed: state = "right";
    Keys.onDownPressed: state = "bottom";
    Keys.onUpPressed: state = "";
}
