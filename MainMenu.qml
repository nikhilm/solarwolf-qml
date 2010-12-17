import QtQuick 1.0

import "solarwolf.js" as Solarwolf

Rectangle {
    id: mainmenu
    anchors.fill: parent
    property string nextState: ""
    z: 10
    color: "black"

    Column {
    	spacing: 30
    	anchors.horizontalCenter: parent.horizontalCenter
    	width: parent.width*0.75
    	height: parent.height

    	Image {
    		source: "./data/logo.png"
    		fillMode: Image.PreserveAspectFit
    		width: parent.width
    		height: parent.height/2
        }

        Button {
            id: newgamebtn
            text: "New Game"
            anchors.horizontalCenter: parent.horizontalCenter
            onClicked: nextState = "Level-0"
        }

        Button {
            id: aboutbtn
            text: "About"
            anchors.horizontalCenter: parent.horizontalCenter
            onClicked: nextState = "About"
        }

        Button {
            id: quitbtn
            text: "Quit"
            anchors.horizontalCenter: parent.horizontalCenter
            onClicked: Qt.quit()
        }
    }

    focus: true
    Keys.onEscapePressed: Qt.quit()
}
