var boxComponent;

var levels = [];
function init(levelmap) {
    levels = levelmap;
}

function createLevel(num) {
    var ret = {}
    ret.title = levels[num].title;
    ret.subtitle = levels[num].subtitle;
    ret.grid = [];

    var grid = levels[num].grid;
    for(var i = 0; i < 7; i++) {
        var col = [];
        if( !grid[i] )
            grid.push("         ");

        for(var j = 0; j < 9; j++) {
            if( !grid[i][j] )
                grid[i] += " ";

            if( grid[i][j] == 's' )
                ret.start = [i, j];
            else
                col.push(createBox(grid[i][j]));
        }
        ret.grid.push(col);
    }

    console.log(ret);
    return ret;
}

function createBox(type) {
    if( boxComponent == null )
        boxComponent = Qt.createComponent('box.qml');

    if( boxComponent.status == Component.Ready ) {
        var dynamic = boxComponent.createObject(screen);
        if( dynamic == null ) {
            console.log("error creating box");
            console.log(boxComponent.errorString());
            return false;
        }
        dynamic.x = dynamic.y = 0;
        dynamic.width = dynamic.height = 26;
        dynamic.state = Math.rand
    }
    else {
        console.log("error loading component box");
        console.log(boxComponent.errorString());
        return false;
    }
    return true;
}
