import QtQuick 1.0

Item {
	id: leveltransit
	z: 10
	property string nextState: ""
	property int levelNum: 0
	property int lives: 0

	MouseArea {
		anchors.fill: parent
		Rectangle {
            anchors.fill: parent
            border.color: "green";
            border.width: 5;
            color: "red"
        }

		Text {
			id: leveltransitcompletelabel
			text: "Level Complete!";
			color: "white";
			anchors.horizontalCenter: parent.horizontalCenter
			anchors.verticalCenter: parent.verticalCenter
			font.pointSize: 20
        }

        onClicked: nextState = "Level-" + levelNum
    }
}
