var boxWidth = 26;
var maxColumn = 9;
var maxRow = 9;
var boxSpacing = 10;
var shipBoundaryLeft = boxWidth;
var shipBoundaryRight = boxWidth*2 + maxRow*boxWidth;
var shipBoundaryTop = shipBoundaryLeft;
var shipBoundaryBottom = shipBoundaryRight;
var bulletStep = 3;

var boxComponent;
var bulletComponent;

var levels = [];
var currentLevel = null;
var nextLevel = null;
var enemies = {};

function init(levelmap) {
    levels = levelmap;
    nextLevel = createLevel(6);
    nextLevel.lives = 3;
}

function index(row, column) {
    return column + row*maxColumn;
}

function createLevel(num) {
    var ret = new Level();
    ret.title = levels[num].title;
    ret.subtitle = levels[num].subtitle;
    ret.boxes = new Array(maxRow*maxColumn);
    ret.bullets = [];
    ret.number = num;

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
                ret.boxes.push(createBox(grid[i][j], j, i));
        }
    }

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
        dynamic.x = enemy_left.x + enemy_left.width*2 + x*(screen.baseDim + 15);
        dynamic.y = enemy_top.y + enemy_top.height*2 + y*(screen.baseDim + 15);
        dynamic.width = dynamic.height = 26;
        if( type == '*' )
            dynamic.state = 'yellow';
        else
            dynamic.state = '';
        return dynamic;
    }
    else {
        console.log("error loading component box");
        console.log(boxComponent.errorString());
        return false;
    }
}

function createBullet(x, y, dx, dy) {
    if( bulletComponent == null )
        bulletComponent = Qt.createComponent('Bullet.qml');

    if( bulletComponent.status == Component.Ready ) {
        var dynamic = bulletComponent.createObject(screen);
        if( dynamic == null ) {
            console.log("error creating bullet");
            console.log(bulletComponent.errorString());
            return false;
        }
        dynamic.x = x;
        dynamic.y = y;
        dynamic.width = dynamic.height = 24;
        dynamic.dx = dx;
        dynamic.dy = dy;

        return dynamic;
    }
    else {
        console.log("error loading component bullet");
        console.log(bulletComponent.errorString());
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

    if( the_ship.x < enemy_left.x + baseDim || the_ship.x > enemy_right.x - baseDim ) {
        the_ship.dx = 0;
        the_ship.x = prevX;
    }
    if( the_ship.y < enemy_top.y + baseDim || the_ship.y > enemy_bottom.y - baseDim ) {
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

function moveBullet(bullet) {
    bullet.x += bullet.dx;
    bullet.y += bullet.dy;
    if( bullet.x > screen.width
        || bullet.x < -baseDim
        || bullet.y > screen.height
        || bullet.y < -baseDim ) {
        return true;
    }
    return false;
}

function fire() {
    [enemy_top, enemy_right, enemy_bottom, enemy_left].forEach(function(elt) {
        var shouldWeFire = Math.random() < 0.05;
        if(shouldWeFire) {
            var dx = 0, dy = 0;
            switch(elt) {
                case enemy_top: dy = +bulletStep; break;
                case enemy_right: dx = -bulletStep; break;
                case enemy_bottom: dy = -bulletStep; break;
                case enemy_left: dx = +bulletStep; break;
            }
            currentLevel.bullets.push(createBullet(elt.x, elt.y, dx, dy));
        }
    });
}

function intersectsShip(a) {
    var b = {x: the_ship.x+5, y: the_ship.y+5, width: the_ship.width-5, height: the_ship.height-5}
    return !(a.x > b.x+b.width || a.x+a.width < b.x ||
                    a.y > b.y+b.height || a.y+a.height < b.y);
}

function dead() {
    for(var i = 0; i < screen.children.length; i++ ) {
        var c = screen.children[i];
        if(typeof(c.dx) != 'undefined')
            c.dx = c.dy = 0;
    }
    if( currentLevel.lives < 0 )
        nextLevel = new gameOver;
    else {
        pause();
        currentLevel.lives--;
        for(var i = 0; i < currentLevel.bullets.length; i++) {
            currentLevel.bullets[i].visible = false;
            delete currentLevel.bullets[i];
        }
        currentLevel.bullets = [];
    }
}

var Level = function() {this.paused = false;}
Level.prototype.update = function() {
    if(this.paused) return;
    moveShip();
    moveTopBottom(enemy_top);
    moveTopBottom(enemy_bottom);
    moveLeftRight(enemy_left);
    moveLeftRight(enemy_right);
    var bulletsToRemove = [];
    currentLevel.bullets.forEach(function(bullet) {
        if( moveBullet(bullet) )
            bulletsToRemove.push(bullet);
    });
    bulletsToRemove.forEach(function(b) {
        currentLevel.bullets.splice(currentLevel.bullets.indexOf(b), 1);
    });
    fire();

    // check collisions
    currentLevel.bullets.forEach(function(bullet) {
        if( intersectsShip(bullet) )
            dead();
    });

    var boxesToRemove = [];
    currentLevel.boxes.forEach(function(box) {
        if( intersectsShip(box) ) {
            if( !box.state ) {
                boxesToRemove.push(box);
            }
            else {
                box.state = "";
            }
        }
    });
    boxesToRemove.forEach(function(b) {
        b.visible = false;
        currentLevel.boxes.splice(currentLevel.boxes.indexOf(b), 1);
    });
}

var gameOver = function() {}
gameOver.prototype.update = function() {
}

function update() {
    if( nextLevel && nextLevel != currentLevel ) {
        delete currentLevel;
        currentLevel = nextLevel;
    }

    currentLevel.update();
}

function pause() {
    currentLevel.paused = true;
    pause_timer.start();
}

function unpause() {
    currentLevel.paused = false;
}
