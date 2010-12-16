import QtQuick 1.0
import "solarwolf.js" as Solarwolf
import "levels.js" as Levels

Rectangle {
    id: screen

    width: 490; height: 720

    SystemPalette { id: activePalette }

    color: "black"

    Component.onCompleted: Solarwolf.init(Levels.levels)

	Timer {
		interval: 30; running: true; repeat: true;
		onTriggered: Solarwolf.update();
    }

    MouseArea {
        width: parent.width; height: parent.height
        anchors { top: parent.top; bottom: parent.bottom }
        onClicked: Solarwolf.createLevel(0)
    }
}
