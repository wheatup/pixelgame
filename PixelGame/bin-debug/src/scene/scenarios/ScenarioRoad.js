/**
 *
 * @author wheatup
 * 第一幕游戏场景
 * 道路
 *
 */
var ScenarioRoad = (function (_super) {
    __extends(ScenarioRoad, _super);
    function ScenarioRoad() {
        _super.call(this, "skins.scenario.ScenarioRoadSkin");
        this.tick = 0;
        this.forEngine = false;
        this.forTrunk = false;
        this.engineTouchCount = 0;
        this.terrain = new Terrain(this, "0,240 0,436 800,436 800,240", ["298,272 298,332 618,332 618,272"]);
    }
    var __egretProto__ = ScenarioRoad.prototype;
    __egretProto__.init = function () {
        this.ui["grp_game"].touchChildren = false;
        this.grp_touch = this.ui["grp_touch"];
        this.bindEvents();
        this.floatGroup = this.ui["grp_playground"];
        this.ui["img_car"].anchorX = 0.5;
        this.ui["img_car"].anchorY = 0.8;
        this.ui["img_car"].x += this.ui["img_car"].width * this.ui["img_car"].anchorX;
        this.ui["img_car"].y += this.ui["img_car"].height * this.ui["img_car"].anchorY;
        this.floaters.push(this.ui["img_car"]);
        //初始化判定区域
        this.box_scene = this.ui["box_scene"];
        this.box_engine = this.ui["box_engine"];
        this.box_trunk = this.ui["box_trunk"];
        //添加粒子
        this.grp_particle = this.ui["grp_particle"];
        this.grp_particle.anchorY = 5;
        this.grp_particle.y += this.grp_particle.height * 5;
        this.floaters.push(this.grp_particle);
        var texture = RES.getRes("par_steam");
        var config = RES.getRes("par_steam_json");
        this.particle = new particle.GravityParticleSystem(texture, config);
        //        this.particle.emitterX = -50;
        //        this.particle.emitterY = 240;
        this.grp_particle.blendMode = egret.BlendMode.ADD;
        this.grp_particle.addElement(this.particle);
        this.particle.start();
        //创建玩家
        this.createPlayer(450, 350, this.ui["grp_playground"]);
    };
    __egretProto__.clearForFlag = function () {
        this.forEngine = false;
        this.forTrunk = false;
    };
    __egretProto__.bindEvents = function () {
        this.box_scene.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchScene, this);
        this.box_engine.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEngine, this);
        this.box_trunk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTrunk, this);
        WheatupEvent.bind(EventType.DIALOGUE_END, this.onDialogueEnd, this);
        WheatupEvent.bind(EventType.ARRIVE, this.onArrive, this);
    };
    __egretProto__.unbindEvents = function () {
        this.box_scene.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchScene, this);
        this.box_engine.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEngine, this);
        this.box_trunk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTrunk, this);
        WheatupEvent.unbind(EventType.DIALOGUE_END, this.onDialogueEnd);
        WheatupEvent.unbind(EventType.ARRIVE, this.onArrive);
    };
    __egretProto__.start = function () {
        this.delay(2000);
        this.addEvent(function () {
            DialogueScene.showDialogue("scene1");
        }, this);
    };
    __egretProto__.touchScene = function (event) {
        if (DialogueScene.showing) {
            DialogueScene.interupt();
        }
        else if (this.free && !DialogueScene.showing) {
            this.clearForFlag();
            var x = event.stageX;
            var y = event.stageY;
            if (this.terrain.isInPolygon(x, y)) {
                this.player.onGridClick(x, y);
            }
        }
        event.stopPropagation();
    };
    __egretProto__.touchEngine = function (event) {
        if (DialogueScene.showing) {
            DialogueScene.interupt();
        }
        else if (this.free && !DialogueScene.showing) {
            this.forEngine = true;
            this.player.onGridClick(350, 350);
        }
        event.stopPropagation();
    };
    __egretProto__.touchTrunk = function (event) {
        if (DialogueScene.showing) {
            DialogueScene.interupt();
        }
        else if (this.free && !DialogueScene.showing) {
            this.clearForFlag();
            this.forTrunk = true;
            this.player.onGridClick(600, 300);
        }
        event.stopPropagation();
    };
    __egretProto__.onDialogueEnd = function (data) {
        if (data == "scene1") {
            this.free = true;
        }
    };
    __egretProto__.onArrive = function (data) {
        if (this.forEngine) {
            if (this.engineTouchCount == 0) {
                DialogueScene.showDialogue("engine1");
            }
            else {
                DialogueScene.showDialogue("engine2");
            }
            this.engineTouchCount++;
        }
        else if (this.forTrunk) {
            Main.transit(1000);
            Main.addScene(Main.LAYER_GAME, Main.trunkScene);
        }
    };
    __egretProto__.onRemove = function () {
        this.unbindEvents();
    };
    return ScenarioRoad;
})(Scenario);
ScenarioRoad.prototype.__class__ = "ScenarioRoad";
//# sourceMappingURL=ScenarioRoad.js.map