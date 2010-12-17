import QtQuick 1.0

Item {
	id: win
	z: 10
	property string nextState: ""

	MouseArea {
		anchors.fill: parent
		Rectangle {
            anchors.fill: parent
            border.color: "green";
            border.width: 5;
            color: "red"
        }

		Text {
			text: "Congratulations! You've won.";
			color: "white";
			anchors.horizontalCenter: parent.horizontalCenter
			anchors.verticalCenter: parent.verticalCenter
			font.pointSize: 20
        }

        onClicked: nextState = "MainMenu"
    }
}
