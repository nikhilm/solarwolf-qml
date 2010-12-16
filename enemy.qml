import QtQuick 1.0

import "solarwolf.js" as Solarwolf

Item {
	id: enemy_top

	property int step: 2
	property int dx: -step
	property int dy: 0

	Timer {
		interval: 30; running: true; repeat: true;
		onTriggered: Solarwolf.moveEnemies();
    }

	Image {
		id: enemy_img
		anchors.fill: parent
		source: "./data/enemy.png"
		rotation: 180
    }

    states: [
        State {
        	name: "right"
        	PropertyChanges { target: enemy_top; dx: step; dy: 0 }
        }
    ]
}
