import QtQuick 1.0
import "solarwolf.js" as Solarwolf
import "levels.js" as Levels

Rectangle {
    id: screen
    property int baseDim: 32

    width: baseDim*15; height: baseDim*13

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

    Timer {
        id: pause_timer
        interval: 2000
        onTriggered: Solarwolf.unpause();
    }

    Text {
        id: notification
        state: "hidden"
        anchors.right: parent.right
        font.pointSize: 24
        color: Qt.rgba(57, 146, 155, 1.0)
        Timer {
            id: notification_timer
            interval: 2000
            onTriggered: Solarwolf.hideNotification()
        }

        states: [
            State {
                name: "hidden"
                PropertyChanges { target: notification; visible: false; opacity: 0 }
            },
            State {
                name: "visible"
                PropertyChanges { target: notification; visible: true; opacity: 1 }
            }
        ]

        transitions: Transition {
            NumberAnimation { properties: "opacity"; duration: 500 }
        }
    }
}
