import QtQuick 1.0

Rectangle {
	id: about
	anchors.fill: parent
	z: 10
	color: "black"
	property string nextState: ""

	MouseArea {
		anchors.fill: parent
		onClicked: nextState = "MainMenu";
    }

    Column {
    	spacing: 10
    	anchors.fill: parent
        Text {
            text: "Created by"
            color: "white"
            anchors.horizontalCenter: parent.horizontalCenter
            font.pointSize: 12
        }

        Text {
            id: myname
            anchors.horizontalCenter: parent.horizontalCenter
            text: "Nikhil Marathe"
            color: "white"
            font.pointSize: 20
        }

        Text {
        	text: "Based on Solarwolf by Pete Shinners"
            color: "white"
            font.pointSize: 12
            anchors.horizontalCenter: parent.horizontalCenter
        }

        Text {
        }

        Text {
        	text: "nsm.nikhil@gmail.com"
        	color: "white"
        	font.pointSize: 12
            anchors.horizontalCenter: parent.horizontalCenter
        }
    }
}
