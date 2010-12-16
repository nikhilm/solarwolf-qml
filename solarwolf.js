var boxWidth = 26;
var maxColumn = 9;
var maxRow = 9;
var boxSpacing = 10;
var shipBoundaryLeft = boxWidth;
var shipBoundaryRight = boxWidth*2 + maxRow*boxWidth;
var shipBoundaryTop = shipBoundaryLeft;
var shipBoundaryBottom = shipBoundaryRight;

var boxComponent;
var shipComponent;
var enemyComponent;

var levels = [];

var enemies = {};

function init(levelmap) {
    levels = levelmap;
    createLevel(0);
}

function index(row, column) {
    return column + row*maxColumn;
}

function createLevel(num) {
    var ret = {}
    ret.title = levels[num].title;
    ret.subtitle = levels[num].subtitle;
    ret.blocks = new Array(maxRow*maxColumn);

    var grid = levels[num].grid;
    for(var i = 0; i < 7; i++) {
        if( !grid[i] )
            grid.push("         ");

        for(var j = 0; j < 9; j++) {
            if( !grid[i][j] )
                grid[i] += " ";

            if( grid[i][j] == 's' ) {
                the_ship.x = j*screen.baseDim+baseDim+3;
                the_ship.y = i*screen.baseDim+baseDim+3;
            }
            else if( grid[i][j] == ' ' )
                ;
            else
                ret.blocks.push(createBox(grid[i][j], j, i));
        }
    }

    //ret.enemies = [createEnemy('top'), createEnemy('bottom'), createEnemy('left'), createEnemy('right')];

    return ret;
}

function createBox(type, x, y) {
    if( boxComponent == null )
        boxComponent = Qt.createComponent('Box.qml');

    if( boxComponent.status == Component.Ready ) {
        var dynamic = boxComponent.createObject(screen);
        if( dynamic == null ) {
            console.log("error creating box");
            console.log(boxComponent.errorString());
            return false;
        }
        dynamic.x = boxWidth + x*(boxWidth+boxSpacing);
        dynamic.y = boxWidth + y*(boxWidth+boxSpacing);
        dynamic.width = dynamic.height = 26;
        if( type == '*' )
            dynamic.state = 'yellow';
        else
            dynamic.state = '';
    }
    else {
        console.log("error loading component box");
        console.log(boxComponent.errorString());
        return false;
    }
    return true;
}

function createEnemy(which) {
    if( enemyComponent == null )
        enemyComponent = Qt.createComponent('Enemy.qml');

    if( enemyComponent.status == Component.Ready ) {
        var dynamic = enemyComponent.createObject(screen);
        if( dynamic == null ) {
            console.log("error creating enemy");
            console.log(enemyComponent.errorString());
            return false;
        }

        var start = parseInt(Math.min(shipBoundaryLeft, Math.max(Math.random()*shipBoundaryRight, shipBoundaryRight)));
        if( which == 'top' ) {
            dynamic.x = start;
            dynamic.y = shipBoundaryTop-32;
        }
        else if( which == 'bottom' ) {
            dynamic.x = start;
            dynamic.y = shipBoundaryBottom;
            dynamic.children[0].rotation = 0;
        }
        else if( which == 'left' ) {
            dynamic.x = shipBoundaryLeft-32;
            dynamic.y = start;
            dynamic.dx = 0;
            dynamic.dy = -dynamic.step;
            dynamic.children[0].rotation = 90;
        }
        else if( which == 'right' ) {
            dynamic.x = shipBoundaryRight;
            dynamic.y = start;
            dynamic.dx = 0;
            dynamic.dy = -dynamic.step;
            dynamic.children[0].rotation = -90;
        }
        dynamic.width = dynamic.height = 32;
    }
    else {
        console.log("error loading component enemy");
        console.log(enemyComponent.errorString());
        return false;
    }
    return true;
}

function moveShip() {
    var prevX = the_ship.x;
    var prevY = the_ship.y;
    the_ship.x += the_ship.dx;
    the_ship.y += the_ship.dy;

    if( the_ship.x < shipBoundaryLeft || the_ship.x > shipBoundaryRight ) {
        the_ship.dx = 0;
        the_ship.x = prevX;
    }
    if( the_ship.y < shipBoundaryTop || the_ship.y > shipBoundaryBottom ) {
        the_ship.dy = 0;
        the_ship.y = prevY;
    }
}

function moveTopBottom(enemy) {
    var prevX = enemy.x;
    enemy.x += enemy.dx;

    if( enemy.x < screen.baseDim || enemy.x > screen.width-screen.baseDim ) {
        enemy.dx = -enemy.dx;
        enemy.x = prevX;
    }
}

function moveLeftRight(enemy) {
    var prevY = enemy.y;
    enemy.y += enemy.dy;

    if( enemy.y < screen.baseDim || enemy.y > screen.width-screen.baseDim ) {
        enemy.dy = -enemy.dy;
        enemy.y = prevY;
    }
}

function update() {
    moveShip();
    moveTopBottom(enemy_top);
    moveTopBottom(enemy_bottom);
    moveLeftRight(enemy_left);
    moveLeftRight(enemy_right);
}
