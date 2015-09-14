/**
 *
 * @author wheatup
 * 游戏场景
 *
 */
var Scenario = (function (_super) {
    __extends(Scenario, _super);
    function Scenario(skinName) {
        _super.call(this, skinName);
        this.cameraLimit = new egret.Rectangle(0, 0, 0, 0);
        this.hasPresetPosition = false;
        this.presetPositionX = 0;
        this.presetPositionY = 0;
        this.cameraPosition = new Point(0, 0);
        this.floaters = new Array();
    }
    var __egretProto__ = Scenario.prototype;
    __egretProto__.createPlayer = function (x, y, grp) {
        this.player = new Player(this);
        grp.addElement(this.player);
        grp.addElement(this.player.cover);
        if (this.hasPresetPosition) {
            this.player.setPosition(this.presetPositionX, this.presetPositionY);
            this.hasPresetPosition = false;
        }
        else {
            this.player.setPosition(x, y);
        }
    };
    //绘制A星Grid(Debug用)
    __egretProto__.drawGrid = function () {
        var _gridArr = new Array();
        for (var i = 0; i < this.terrain.grid.numCols; i++) {
            _gridArr[i] = [];
            for (var j = 0; j < this.terrain.grid.numRows; j++) {
                var node = this.terrain.grid.getNode(i, j);
                if (!node.walkable)
                    continue;
                var rect = new egret.Shape();
                rect.graphics.lineStyle(0.1);
                rect.graphics.beginFill(this.getColor(node));
                rect.graphics.drawRect(0, 0, this.terrain.cellSize, this.terrain.cellSize);
                rect.graphics.endFill();
                rect.x = i * this.terrain.cellSize;
                rect.y = j * this.terrain.cellSize;
                Main.layers[Main.LAYER_GUI].addChild(rect);
            }
        }
    };
    //获取grid颜色
    __egretProto__.getColor = function (node) {
        if (!node.walkable)
            return 0x000000;
        if (node == this.terrain.grid.startNode)
            return 0x999900;
        if (node == this.terrain.grid.endNode)
            return 0x0000ff;
        return 0xcccccc;
    };
    __egretProto__.setPlayerPosition = function (x, y) {
        if (this.player) {
            this.player.setPosition(x, y);
        }
        else {
            this.hasPresetPosition = true;
            this.presetPositionX = x;
            this.presetPositionY = y;
        }
    };
    return Scenario;
})(Scene);
Scenario.prototype.__class__ = "Scenario";
//# sourceMappingURL=Scenario.js.map