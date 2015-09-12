/**
 *
 * @author
 *
 */
var GameTest = (function (_super) {
    __extends(GameTest, _super);
    function GameTest() {
        _super.call(this);
        this._cellSize = 40;
        GameTest.instance = this;
        this.makeGrid();
        this.makePlayer();
    }
    var __egretProto__ = GameTest.prototype;
    /**
    * Creates the player sprite. Just a circle here.
    */
    __egretProto__.makePlayer = function () {
        this._player = new egret.Sprite();
        //this._player.touchChildren = false;
        this._player.touchEnabled = true; //当为true时 点击事件会穿过该对象到达侦听对象
        this._player.graphics.beginFill(0xff0000);
        this._player.graphics.drawCircle(0, 0, 5);
        this._player.graphics.endFill();
        this._player.x = 50;
        this._player.y = 60;
        this.addChild(this._player);
        this._lineShape = new egret.Shape();
        this.addChild(this._lineShape);
    };
    /**
    * Creates a grid with a bunch of random unwalkable nodes.
    */
    __egretProto__.makeGrid = function () {
        this._gridContent = new egret.DisplayObjectContainer();
        this._gridContent.touchEnabled = true;
        this._gridContent.touchChildren = false;
        this._gridContent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGridClick, this);
        this.addChild(this._gridContent);
        this._grid = new Grid(10, 10, 40);
        for (var i = 0; i < 20; i++) {
            this._grid.setWalkable(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), false);
        }
        this.drawGrid();
    };
    /**
    * Draws the given grid, coloring each cell according to its state.
    */
    __egretProto__.drawGrid = function () {
        this._gridArr = new Array();
        for (var i = 0; i < this._grid.numCols; i++) {
            this._gridArr[i] = [];
            for (var j = 0; j < this._grid.numRows; j++) {
                var node = this._grid.getNode(i, j);
                var rect = new egret.Shape();
                rect.graphics.lineStyle(0.1);
                rect.graphics.beginFill(this.getColor(node));
                rect.graphics.drawRect(0, 0, this._cellSize, this._cellSize);
                rect.graphics.endFill();
                rect.x = i * this._cellSize;
                rect.y = j * this._cellSize;
                this._gridContent.addChild(rect);
                this._gridArr[i][j] = rect;
            }
        }
    };
    /**
    * Determines the color of a given node based on its state.
    */
    __egretProto__.getColor = function (node) {
        if (!node.walkable)
            return 0x000000;
        if (node == this._grid.startNode)
            return 0x999900;
        if (node == this._grid.endNode)
            return 0x0000ff;
        return 0xcccccc;
    };
    /**
    * Handles the click event on the GridView. Finds the clicked on cell and toggles its walkable state.
    */
    __egretProto__.onGridClick = function (event) {
        var xpos = Math.floor(event.stageX / this._cellSize);
        var ypos = Math.floor(event.stageY / this._cellSize);
        var endNp = this._grid.getNode(xpos, ypos);
        var xpos2 = Math.floor(this._player.x / this._cellSize);
        var ypos2 = Math.floor(this._player.y / this._cellSize);
        var startNp = this._grid.getNode(xpos2, ypos2);
        if (endNp.walkable == false) {
            var replacer = this._grid.findReplacer(startNp, endNp);
            if (replacer) {
                xpos = replacer.x;
                ypos = replacer.y;
            }
        }
        this._grid.setStartNode(xpos2, ypos2);
        this._grid.setEndNode(xpos, ypos);
        this.findPath();
        ////画红线
        /*
        this._lineShape.graphics.clear();
        this._lineShape.graphics.lineStyle(1,0xFF0000);
        this._lineShape.graphics.moveTo(xpos2 * this._cellSize + 10,ypos2 * this._cellSize + 10);
        this._lineShape.graphics.lineTo(xpos * this._cellSize + 10,ypos * this._cellSize + 10);
        this._lineShape.graphics.endFill();
        */
    };
    /**
    * Creates an instance of AStar and uses it to find a path.
    */
    __egretProto__.findPath = function () {
        var oldTime = egret.getTimer();
        var astar = new AStar2();
        if (astar.findPath(this._grid)) {
            //得到平滑路径
            astar.floyd();
            //在路径中去掉起点节点，避免玩家对象走回头路
            astar.floydPath.shift();
            this._path = astar.floydPath;
            //this._path = astar.path;
            this._index = 0;
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        }
    };
    /**
    * 走动
    */
    __egretProto__.onEnterFrame = function (evt) {
        if (this._path.length == 0) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            return;
        }
        var targetX = this._path[this._index].x * this._cellSize + this._cellSize / 2;
        var targetY = this._path[this._index].y * this._cellSize + this._cellSize / 2;
        var dx = targetX - this._player.x;
        var dy = targetY - this._player.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1) {
            this._index++;
            if (this._index >= this._path.length) {
                this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            }
        }
        else {
            this._player.x += dx * .5;
            this._player.y += dy * .5;
        }
    };
    return GameTest;
})(egret.DisplayObjectContainer);
GameTest.prototype.__class__ = "GameTest";
//# sourceMappingURL=GameTest.js.map