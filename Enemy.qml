import QtQuick 1.0

Item {
	id: enemy_top

	property int step: 2
	property int dx: -step
	property int dy: -step

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
