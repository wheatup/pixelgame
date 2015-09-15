/**
 *
 * @author wheatup
 * 开场游戏场景
 *
 */
var ScenarioIntro = (function (_super) {
    __extends(ScenarioIntro, _super);
    function ScenarioIntro() {
        _super.call(this, "skins.scenario.ScenarioIntroSkin");
        this.tick = 0;
        this.nextBumpTick = 0;
        this.terrain = new Terrain(this, "", 0, 0);
    }
    var __egretProto__ = ScenarioIntro.prototype;
    __egretProto__.init = function () {
        this.ui["grp_game"].touchChildren = false;
        this.grp_particle = this.ui["grp_particle"];
        this.grp_touch = this.ui["grp_touch"];
        //添加粒子
        this.grp_particle = this.ui["grp_particle"];
        var texture = RES.getRes("par_dust");
        var config = RES.getRes("par_dust_json");
        this.particle = new particle.GravityParticleSystem(texture, config);
        this.grp_particle.blendMode = egret.BlendMode.ADD;
        this.grp_particle.addElement(this.particle);
        this.particle.start();
        this.bindEvents();
    };
    __egretProto__.bindEvents = function () {
        this.grp_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        WheatupEvent.bind(EventType.DIALOGUE_END, this.onDialogueEnd, this);
    };
    __egretProto__.unbindEvents = function () {
        this.grp_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        WheatupEvent.unbind(EventType.DIALOGUE_END, this.onDialogueEnd);
    };
    __egretProto__.onDialogueEnd = function (data) {
        var _this = this;
        if (data == "intro") {
            Timer.addTimer(1000, 1, function () {
                egret.Tween.get(_this.ui["img_car"]).to({ x: _this.ui["img_car"].x + 500 }, 4000, egret.Ease.quadIn);
                egret.Tween.get(_this.grp_particle).to({ x: _this.grp_particle.x + 500 }, 4000, egret.Ease.quadIn);
                Timer.addTimer(4000, 1, _this.nextScene, _this);
            }, this);
        }
    };
    __egretProto__.nextScene = function () {
        Main.transit(3000);
        Main.removeScene(this);
        Main.addScene(Main.LAYER_GAME, Main.scenarioRoad);
    };
    __egretProto__.start = function () {
        var _this = this;
        //this.drawGrid();
        //车震时间点
        this.nextBumpTick = Math.round(Math.random() * 100 + 1);
        this.delay(3000);
        //隐藏遮罩
        this.addEvent(function () {
            egret.Tween.get(_this.ui["img_mask"]).to({ alpha: 0 }, 2000);
        }, this);
        this.delay(3000);
        //隐藏LOGO
        this.addEvent(function () {
            egret.Tween.get(_this.ui["img_logo"]).to({ alpha: 0 }, 2000);
        }, this);
        this.delay(3000);
        //出现对话
        this.addEvent(function () {
            DialogueScene.showDialogue("intro");
        }, this);
    };
    __egretProto__.update = function () {
        var _this = this;
        this.tick++;
        this.cameraPosition.x++;
        this.ui["grp_bg1"].x = Math.round(this.cameraPosition.x / 2) % 800;
        this.ui["grp_bg2"].x = Math.round(this.cameraPosition.x * 8) % 800;
        this.ui["grp_bg3"].x = Math.round(this.cameraPosition.x * 24) % 800;
        if (this.tick >= this.nextBumpTick) {
            this.ui["img_car"].y -= 2;
            Timer.addTimer(100, 1, function () {
                _this.ui["img_car"].y += 2;
            }, this);
            this.nextBumpTick += Math.round(Math.random() * 20 + 10);
        }
    };
    __egretProto__.touch = function (event) {
        if (DialogueScene.showing) {
            DialogueScene.interupt();
        }
    };
    __egretProto__.onDestroy = function () {
        this.unbindEvents();
        this.grp_particle.removeElement(this.particle);
    };
    return ScenarioIntro;
})(Scenario);
ScenarioIntro.prototype.__class__ = "ScenarioIntro";
//# sourceMappingURL=ScenarioIntro.js.map