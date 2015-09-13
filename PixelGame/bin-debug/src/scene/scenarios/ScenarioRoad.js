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
        this.terrain = new Terrain(this, "0,230 0,436 800,436 800,230", ["298,272 298,332 618,332 618,272"]);
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
    __egretProto__.bindEvents = function () {
        this.grp_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        WheatupEvent.bind(EventType.DIALOGUE_END, this.onDialogueEnd, this);
    };
    __egretProto__.unbindEvents = function () {
        this.grp_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        WheatupEvent.unbind(EventType.DIALOGUE_END, this.onDialogueEnd);
    };
    __egretProto__.start = function () {
        this.delay(2000);
        this.addEvent(function () {
            DialogueScene.getDialogue("scene1");
        }, this);
    };
    __egretProto__.touch = function (event) {
        if (DialogueScene.showing) {
            DialogueScene.interupt();
            return;
        }
        if (this.free) {
            var x = event.stageX;
            var y = event.stageY;
            if (this.terrain.isInPolygon(x, y)) {
                this.player.onGridClick(x, y);
            }
            else {
            }
        }
    };
    __egretProto__.onDialogueEnd = function (data) {
        if (data == "scene1") {
            this.free = true;
        }
    };
    __egretProto__.onRemove = function () {
        this.unbindEvents();
    };
    return ScenarioRoad;
})(Scenario);
ScenarioRoad.prototype.__class__ = "ScenarioRoad";
//# sourceMappingURL=ScenarioRoad.js.map