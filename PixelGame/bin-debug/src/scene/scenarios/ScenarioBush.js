/**
 *
 * @author wheatup
 * 第二幕游戏场景
 * 丛林
 *
 */
var ScenarioBush = (function (_super) {
    __extends(ScenarioBush, _super);
    function ScenarioBush() {
        _super.call(this, "skins.scenario.ScenarioBushSkin");
        this.forEnd1 = false;
        this.forEnd2 = false;
        this.terrain = new Terrain(this, "1,399 70,413 174,369 199,357 357,352 473,348 538,328 589,324 707,279 758,239 825,212 880,187 880,480 1,480", 880, 480);
        //设置摄影机
        this.cameraLimit.width = 80;
        this.cameraPosition.x = 0;
    }
    var __egretProto__ = ScenarioBush.prototype;
    __egretProto__.init = function () {
        this.grp_game = this.ui["grp_game"];
        this.grp_game.touchChildren = false;
        this.grp_touch = this.ui["grp_touch"];
        this.floatGroup = this.ui["grp_playground"];
        //初始化判定区域
        this.box_scene = this.ui["box_scene"];
        this.box_end1 = this.ui["box_end1"];
        this.box_end2 = this.ui["box_end2"];
        //设置shade
        this.ui["img_night"].alpha = 0;
        this.ui["img_night"].visible = true;
        this.ui["grp_shade"].visible = true;
        //创建玩家
        this.createPlayer(30, 448, this.ui["grp_playground"]);
        this.player.setBrightness(0.3);
    };
    __egretProto__.setNight = function (value) {
        this.ui["img_night"].alpha = value;
    };
    __egretProto__.clearForFlag = function () {
        this.forEnd1 = false;
        this.forEnd2 = false;
    };
    __egretProto__.bindEvents = function () {
        this.box_scene.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchScene, this);
        this.box_end1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEnd1, this);
        this.box_end2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEnd2, this);
        WheatupEvent.bind(EventType.DIALOGUE_END, this.onDialogueEnd, this);
        WheatupEvent.bind(EventType.ARRIVE, this.onArrive, this);
    };
    __egretProto__.unbindEvents = function () {
        this.box_scene.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchScene, this);
        this.box_end1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEnd1, this);
        this.box_end2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEnd2, this);
        WheatupEvent.unbind(EventType.DIALOGUE_END, this.onDialogueEnd);
        WheatupEvent.unbind(EventType.ARRIVE, this.onArrive);
    };
    __egretProto__.start = function () {
        this.getConditions();
        Main.free = true;
        this.bindEvents();
        this.delay(2000);
        //        this.addEvent(() => {
        //            DialogueScene.showDialogue("scene1");
        //        }, this);
    };
    __egretProto__.getConditions = function () {
        if (Data.getFlag(1 /* HasArrivedJungle */)) {
            this.setNight(0.5);
        }
    };
    __egretProto__.update = function () {
        this.calcCamera();
    };
    __egretProto__.calcCamera = function () {
        var targetX = Util.clip(this.player.getX() - 400, 0, this.cameraLimit.width);
        var targetY = Util.clip(this.player.getY() - 240, 0, this.cameraLimit.height);
        this.cameraPosition.x = this.cameraPosition.x + Math.round((targetX - this.cameraPosition.x) * 0.1);
        this.cameraPosition.y = this.cameraPosition.y + Math.round((targetY - this.cameraPosition.y) * 0.1);
        this.ui["grp_bg3"].x = -(Math.round(this.cameraPosition.x * 2));
        this.ui["grp_bg3"].y = -(Math.round(this.cameraPosition.y * 2));
        this.ui["grp_bg2"].x = -this.cameraPosition.x;
        this.ui["grp_bg2"].y = -this.cameraPosition.y;
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
                this.player.onGridClick(x, y, this.ui["grp_bg2"]);
            }
        }
        event.stopPropagation();
    };
    __egretProto__.touchEnd1 = function (event) {
        if (Main.free) {
            this.clearForFlag();
            this.forEnd1 = true;
            this.player.onGridClick(event.localX + this.box_end1.x, event.localY + this.box_end1.y, this.ui["grp_bg2"]);
        }
        event.stopPropagation();
    };
    __egretProto__.touchEnd2 = function (event) {
        if (Main.free) {
            this.clearForFlag();
            this.forEnd2 = true;
            this.player.onGridClick(event.localX + this.box_end2.x, event.localY + this.box_end2.y, this.ui["grp_bg2"]);
        }
        event.stopPropagation();
    };
    __egretProto__.onDialogueEnd = function (data) {
        if (data == "scene1") {
        }
    };
    __egretProto__.onArrive = function (data) {
        if (this.forEnd1) {
            Main.transit(500);
            Main.removeScene(this);
            Main.addScene(Main.LAYER_GAME, Main.scenarioRoad);
            Main.scenarioRoad.setPlayerPosition(470, 240);
        }
        else if (this.forEnd2) {
            Main.transit(500);
            Main.removeScene(this);
            Main.addScene(Main.LAYER_GAME, Main.scenarioJungle);
            Main.scenarioRoad.setPlayerPosition(16, 376);
        }
    };
    __egretProto__.onRemove = function () {
        this.unbindEvents();
    };
    return ScenarioBush;
})(Scenario);
ScenarioBush.prototype.__class__ = "ScenarioBush";
//# sourceMappingURL=ScenarioBush.js.map