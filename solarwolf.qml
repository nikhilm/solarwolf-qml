import QtQuick 1.0
import "solarwolf.js" as Solarwolf
import "levels.js" as Levels

Rectangle {
    id: screen
    property int baseDim: 32

    width: baseDim*11; height: baseDim*9

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
    }

    Enemy {
        id: enemy_top
        x: parseInt(Math.max(baseDim, Math.random()*screen.width))
        width: baseDim
        height: baseDim
    }

    Enemy {
        id: enemy_right
        anchors.right: screen.right
        y: parseInt(Math.max(baseDim, Math.random()*screen.height))
        width: baseDim
        height: baseDim
        rotation: 90
    }

    Enemy {
        id: enemy_bottom
        anchors.bottom: screen.bottom
        x: parseInt(Math.max(baseDim, Math.random()*screen.width))
        width: baseDim
        height: baseDim
        rotation: 180
    }

    Enemy {
        id: enemy_left
        anchors.left: screen.left
        y: parseInt(Math.max(baseDim, Math.random()*screen.height))
        width: baseDim
        height: baseDim
        rotation: -90
    }

    Ship {
        id: the_ship
        width: baseDim - 6
        height: baseDim - 6
    }
}
