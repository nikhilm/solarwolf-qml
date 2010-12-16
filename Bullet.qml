import QtQuick 1.0

Item {
	id: bullet

	property int dx: 0
	property int dy: 0

	Image {
		id: bullet_img
		anchors.fill: parent
		source: "./data/fire-"+parseInt(Math.random()*8)+".png"
    }
}
