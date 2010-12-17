import QtQuick 1.0

Item {
    id: box
    property int touchable: 0

    Image {
        id: box_img
        anchors.fill: parent
        source: "./data/boxes-0.png"
    }

    states: [
        State {
            name: ""
            PropertyChanges { target: box_img; source: "./data/boxes-0.png" }
        },

        State {
            name: "yellow"
            PropertyChanges { target: box_img; source: "./data/boxesy-0.png" }
        },

        State {
            name: "red"
            PropertyChanges { target: box_img; source: "./data/boxesr-0.png" }
        }
    ]
}
