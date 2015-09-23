/**
 *
 * @author
 *
 */
var Mob = (function (_super) {
    __extends(Mob, _super);
    function Mob(asset, width, height, scenario, size) {
        if (size === void 0) { size = 1; }
        _super.call(this, asset);
        this.animSpeed = 10;
        this.moveSpeed = 7;
        this.brightness = 1;
        this.lastDir = 0;
        this.size = 1;
        this.size = size;
        this.width = width * this.size;
        this.height = height * this.size;
        this.anchorX = 0.5;
        this.anchorY = 0.9;
        this.scenario = scenario;
        Main.main.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.cover = new egret.gui.UIAsset();
        this.cover.width = width * this.size;
        this.cover.height = height * this.size;
        this.cover.anchorX = 0.5;
        this.cover.anchorY = 0.9;
        this.cover.source = asset + "a";
        this.point = new egret.Point();
        this.setBrightness(this.brightness);
    }
    var __egretProto__ = Mob.prototype;
    __egretProto__.hide = function () {
        this.visible = false;
        this.cover.visible = false;
    };
    __egretProto__.show = function () {
        this.visible = true;
        this.cover.visible = true;
    };
    __egretProto__.setPosition = function (x, y) {
        this.point.x = x;
        this.point.y = y;
        this.pivotX = x;
        this.pivotY = y;
        this.x = x;
        this.y = y;
        this.cover.x = x;
        this.cover.y = y;
    };
    __egretProto__.setBrightness = function (brightness) {
        this.brightness = brightness;
        this.cover.alpha = 1 - brightness;
    };
    __egretProto__.getX = function () {
        return this.pivotX;
    };
    __egretProto__.getY = function () {
        return this.pivotY;
    };
    __egretProto__.run = function (direction) {
        this.action = Mob.ACTION_WALK;
        this.dir = direction;
        this.lastDir = direction;
        this.onActionChange();
    };
    __egretProto__.still = function (direction) {
        this.action = Mob.ACTION_STAND;
        this.dir = direction;
        this.lastDir = direction;
        this.onActionChange();
    };
    __egretProto__.onActionChange = function () {
    };
    /**
    * Handles the click event on the GridView. Finds the clicked on cell and toggles its walkable state.
    */
    __egretProto__.onGridClick = function (x, y, group) {
        Landmark.addLandMark(group, x, y);
        var xpos = Math.floor((x) / Settings.CELL_SIZE);
        var ypos = Math.floor((y) / Settings.CELL_SIZE);
        var endNp = this.scenario.terrain.grid.getNode(xpos, ypos);
        var xpos2 = Math.floor(this.getX() / Settings.CELL_SIZE);
        var ypos2 = Math.floor(this.getY() / Settings.CELL_SIZE);
        var startNp = this.scenario.terrain.grid.getNode(xpos2, ypos2);
        if (endNp.walkable == false) {
            var replacer = this.scenario.terrain.grid.findReplacer(startNp, endNp);
            if (replacer) {
                xpos = replacer.x;
                ypos = replacer.y;
            }
        }
        this.scenario.terrain.grid.setStartNode(xpos2, ypos2);
        this.scenario.terrain.grid.setEndNode(xpos, ypos);
        //        Debug.log("start:[" + xpos2 + "," + ypos2 + "]");
        //        Debug.log("end:[" + xpos + "," + ypos + "]");
        this.findPath();
        //画红线
        //        this._lineShape.graphics.clear();
        //        this._lineShape.graphics.lineStyle(1,0xFF0000);
        //        this._lineShape.graphics.moveTo(xpos2 * Settings.CELL_SIZE + 10,ypos2 * Settings.CELL_SIZE + 10);
        //        this._lineShape.graphics.lineTo(xpos * Settings.CELL_SIZE + 10,ypos * Settings.CELL_SIZE + 10);
        //        this._lineShape.graphics.endFill();
    };
    __egretProto__.findPath = function () {
        var oldTime = egret.getTimer();
        var astar = new AStar2();
        if (astar.findPath(this.scenario.terrain.grid)) {
            astar.floyd();
            astar.floydPath.shift();
            this._path = astar.floydPath;
            this._index = 0;
            //            if(this._path[this._index]) {
            //                var targetX: number = (this._path[this._index].x - this.scenario.offsetX) * Settings.CELL_SIZE + Settings.CELL_SIZE / 2;
            //                var targetY: number = (this._path[this._index].y- this.scenario.offsetY) * Settings.CELL_SIZE + Settings.CELL_SIZE / 2;
            //            }
            this.calcAnimation();
        }
    };
    __egretProto__.update = function () {
        this.calcMovement();
    };
    __egretProto__.calcMovement = function () {
        if (this._path && this._path[this._index] && this._path.length != 0) {
            var targetX = (this._path[this._index].x) * Settings.CELL_SIZE + Settings.CELL_SIZE / 2;
            var targetY = (this._path[this._index].y) * Settings.CELL_SIZE + Settings.CELL_SIZE / 2;
            var dx = targetX - this.getX();
            var dy = targetY - this.getY();
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 1) {
                this._index++;
                this.calcAnimation();
            }
            else {
                var x = this.getX() + (dx / dist) * this.moveSpeed;
                var y = this.getY() + (dy / dist) * this.moveSpeed;
                var dist2 = Math.sqrt(((dx / dist) * this.moveSpeed) * ((dx / dist) * this.moveSpeed) + ((dy / dist) * this.moveSpeed) * ((dy / dist) * this.moveSpeed));
                if (dist2 < dist) {
                    this.setPosition(x, y);
                }
                else {
                    this.setPosition(targetX, targetY);
                }
                var len = this.scenario.floaters.length;
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        var floater = this.scenario.floaters[i];
                        if (this.pivotY > floater.y) {
                            if (this.scenario.floatGroup.getElementIndex(this) < this.scenario.floatGroup.getElementIndex(floater)) {
                                this.scenario.floatGroup.swapElements(this, floater);
                            }
                        }
                        else {
                            if (this.scenario.floatGroup.getElementIndex(this) > this.scenario.floatGroup.getElementIndex(floater)) {
                                this.scenario.floatGroup.swapElements(this, floater);
                            }
                        }
                    }
                }
            }
        }
    };
    __egretProto__.calcAnimation = function () {
        if (this._path && this._path[this._index]) {
            var targetX = this._path[this._index].x * Settings.CELL_SIZE + Settings.CELL_SIZE / 2;
            var targetY = this._path[this._index].y * Settings.CELL_SIZE + Settings.CELL_SIZE / 2;
            if (this.getX() < targetX) {
                if (this.getY() <= targetY) {
                    this.run(Mob.DIR_DOWN_RIGHT);
                }
                else {
                    this.run(Mob.DIR_UP_RIGHT);
                }
            }
            else {
                if (this.getY() <= targetY) {
                    this.run(Mob.DIR_DOWN_LEFT);
                }
                else {
                    this.run(Mob.DIR_UP_LEFT);
                }
            }
        }
        else {
            this.still(this.lastDir);
            WheatupEvent.call(EventType.ARRIVE, { x: this.getX(), y: this.getY() });
        }
    };
    __egretProto__.isInside = function (container) {
        return this.pivotX >= container.x && this.pivotX <= container.x + container.width && this.pivotY >= container.y && this.pivotY <= container.y + container.height;
    };
    Mob.DIR_UP_LEFT = 0;
    Mob.DIR_UP_RIGHT = 1;
    Mob.DIR_DOWN_RIGHT = 2;
    Mob.DIR_DOWN_LEFT = 3;
    Mob.ANIM_STAND_FRONT = 0;
    Mob.ANIM_STAND_BACK = 1;
    Mob.ANIM_WALK_FRONT = 2;
    Mob.ANIM_WALK_BACK = 3;
    Mob.ACTION_STAND = 0;
    Mob.ACTION_WALK = 1;
    return Mob;
})(egret.gui.UIAsset);
Mob.prototype.__class__ = "Mob";
//# sourceMappingURL=Mob.js.map