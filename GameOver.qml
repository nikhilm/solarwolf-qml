import QtQuick 1.0

import "solarwolf.js" as Solarwolf

Item {
    id: gameover
    z: 10
    property string nextState: ""

    MouseArea {
        anchors.fill: parent
        Rectangle {
            anchors.fill: parent
            border.color: "green";
            border.width: 5;
            color: "maroon"
        }

        Text {
            text: "Game Over";
            color: "white";
            anchors.horizontalCenter: parent.horizontalCenter
            anchors.verticalCenter: parent.verticalCenter
            font.pointSize: 20
        }

        onClicked: nextState = "MainMenu"
    }
}
