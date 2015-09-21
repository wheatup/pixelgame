/**
 *
 * @author wheatup
 * 第四幕游戏场景
 * 小屋前
 *
 */
var ScenarioCabin = (function (_super) {
    __extends(ScenarioCabin, _super);
    function ScenarioCabin() {
        _super.call(this, "skins.scenario.ScenarioCabinSkin");
        this.tick = 0;
        this.forEnd = false;
        this.forDoor = false;
        this.terrain = new Terrain(this, "0,0 -1,267 249,267 288,223 453,207 963,203 1233,221 1388,215 1405,201 1672,188 1779,189 1795,177 1848,177 2028,180 2025,167 1866,139 1857,118 1706,113 1672,98 1663,70 1562,62 1472,42 1292,36 1171,4 1057,37 936,33 827,5 746,20 738,64 555,47 500,34", 2400, 480, null, 1, 213);
    }
    var __egretProto__ = ScenarioCabin.prototype;
    __egretProto__.init = function () {
        this.grp_game = this.ui["grp_game"];
        this.grp_game.touchChildren = false;
        this.grp_touch = this.ui["grp_touch"];
        //初始化判定区域
        this.box_scene = this.ui["box_scene"];
        this.box_door = this.ui["box_door"];
        this.box_end = this.ui["box_end"];
        //创建玩家
        this.createPlayer(22, 235, this.ui["grp_playground"], 0.75);
        this.player.moveSpeed = 5;
        //设置摄影机
        this.cameraLimit.width = 1600;
        this.cameraPosition.x = 0;
        this.player.setBrightness(0.3);
        //this.drawGrid();
    };
    __egretProto__.clearForFlag = function () {
        this.forDoor = false;
        this.forEnd = false;
    };
    __egretProto__.bindEvents = function () {
        this.box_scene.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchScene, this);
        this.box_door.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDoor, this);
        this.box_end.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEnd, this);
        WheatupEvent.bind(EventType.DIALOGUE_END, this.onDialogueEnd, this);
        WheatupEvent.bind(EventType.ARRIVE, this.onArrive, this);
    };
    __egretProto__.unbindEvents = function () {
        this.box_scene.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchScene, this);
        this.box_door.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDoor, this);
        this.box_end.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEnd, this);
        WheatupEvent.unbind(EventType.DIALOGUE_END, this.onDialogueEnd);
        WheatupEvent.unbind(EventType.ARRIVE, this.onArrive);
    };
    __egretProto__.onRemove = function () {
        this.unbindEvents();
    };
    __egretProto__.start = function () {
        this.getConditions();
        this.bindEvents();
    };
    __egretProto__.getConditions = function () {
    };
    __egretProto__.update = function () {
        this.calcCamera();
    };
    __egretProto__.calcCamera = function () {
        var targetX = Util.clip(this.player.getX() - 400, 0, this.cameraLimit.width);
        var targetY = Util.clip(this.player.getY() - 240, 0, this.cameraLimit.height);
        this.cameraPosition.x = this.cameraPosition.x + Math.round((targetX - this.cameraPosition.x) * 0.1);
        this.cameraPosition.y = this.cameraPosition.y + Math.round((targetY - this.cameraPosition.y) * 0.1);
        this.ui["grp_bg1"].x = -this.cameraPosition.x;
        this.ui["grp_bg1"].y = -this.cameraPosition.y;
        this.ui["grp_playground"].x = -this.cameraPosition.x;
        this.ui["grp_playground"].y = -this.cameraPosition.y;
        this.grp_touch.x = -this.cameraPosition.x;
        this.grp_touch.y = -this.cameraPosition.y;
    };
    __egretProto__.touchScene = function (event) {
        if (Main.free) {
            this.clearForFlag();
            var x = event.localX;
            var y = event.localY;
            if (this.terrain.isInPolygon(x, y)) {
                this.player.onGridClick(x, y, this.ui["grp_bg1"]);
            }
        }
        event.stopPropagation();
    };
    __egretProto__.touchDoor = function (event) {
        if (Main.free) {
            this.clearForFlag();
            this.forDoor = true;
            this.player.onGridClick(1803, 342, this.ui["grp_bg1"]);
        }
        event.stopPropagation();
    };
    __egretProto__.touchEnd = function (event) {
        if (Main.free) {
            this.clearForFlag();
            this.forEnd = true;
            this.player.onGridClick(22, 235, this.ui["grp_bg1"]);
        }
        event.stopPropagation();
    };
    __egretProto__.onDialogueEnd = function (data) {
    };
    __egretProto__.onArrive = function (data) {
        if (this.forDoor) {
            Main.transit(500);
            Main.removeScene(this);
            Main.addScene(Main.LAYER_GAME, Main.scenarioRoom);
            Main.scenarioRoom.setPlayerPosition(61, 417);
        }
        else if (this.forEnd) {
            Main.transit(500);
            Main.removeScene(this);
            Main.addScene(Main.LAYER_GAME, Main.scenarioJungle);
            Main.scenarioJungle.setPlayerPosition(2339, 459);
        }
    };
    return ScenarioCabin;
})(Scenario);
ScenarioCabin.prototype.__class__ = "ScenarioCabin";
//# sourceMappingURL=ScenarioCabin.js.map