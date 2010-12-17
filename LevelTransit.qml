import QtQuick 1.0

Item {
    id: leveltransit
    z: 10
    property string nextState: ""
    property int levelNum: 0
    property string levelName: ""
    property int lives: 0

    MouseArea {
        anchors.fill: parent
        Rectangle {
            anchors.fill: parent
            border.color: "green";
            border.width: 5;
            color: "#000045"
        }

        Column {
            anchors.horizontalCenter: parent.horizontalCenter
            anchors.verticalCenter: parent.verticalCenter
            spacing: 5
            Text {
                id: leveltransitcompletelabel
                text: "Next Level";
                color: "white";
                anchors.horizontalCenter: parent.horizontalCenter
                font.pointSize: 20
            }

            Text {
                id: leveltransitname
                color: "white"
                anchors.horizontalCenter: parent.horizontalCenter
                font.pointSize: 14
            }
        }

        onClicked: nextState = "Level-" + levelNum
    }
}
