/**
 *
 * @author wheatup
 * 测试游戏场景
 *
 */
var ScenarioIntro = (function (_super) {
    __extends(ScenarioIntro, _super);
    function ScenarioIntro() {
        _super.call(this, "skins.scenario.ScenarioIntroSkin");
        this.tick = 0;
        this.nextBumpTick = 0;
        this.terrain = new Terrain(this, "73,239 26,392 207,468 363,389 325,294 427,181 590,256 456,389 483,453 759,449 729,152 496,22 205,124 205,354 144,260");
    }
    var __egretProto__ = ScenarioIntro.prototype;
    __egretProto__.init = function () {
        this.ui["grp_game"].touchChildren = false;
        this.grp_touch = this.ui["grp_touch"];
        this.grp_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
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
            DialogueScene.getDialogue("intro");
        }, this);
    };
    __egretProto__.update = function () {
        var _this = this;
        this.tick++;
        this.cameraPosition.x++;
        this.ui["grp_bg1"].x = Math.round(this.cameraPosition.x / 2) % 800;
        this.ui["grp_bg2"].x = Math.round(this.cameraPosition.x * 8) % 800;
        this.ui["grp_bg3"].x = Math.round(this.cameraPosition.x * 24) % 800;
        if (this.tick == this.nextBumpTick) {
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
    return ScenarioIntro;
})(Scenario);
ScenarioIntro.prototype.__class__ = "ScenarioIntro";
//# sourceMappingURL=ScenarioIntro.js.map