/**
 *
 * @author wheatup
 * 后备箱
 *
 */
var TrunkScene = (function (_super) {
    __extends(TrunkScene, _super);
    function TrunkScene() {
        _super.call(this, "skins.scene.TrunkSkin");
    }
    var __egretProto__ = TrunkScene.prototype;
    __egretProto__.init = function () {
        this.bg = this.ui["bg"];
        this.touchEnabled = false;
        if (Data.shovel == 0) {
            this.bg.source = "scene_trunk_1";
        }
        else {
            this.bg.source = "scene_trunk_0";
        }
        this.box_shovel = this.ui["box_shovel"];
        this.box_shovel.rotation = 15;
        this.box_back = this.ui["box_back"];
        egret.Tween.get(this.box_back, { loop: true }).to({ x: this.box_back.x + 20 }, 500, egret.Ease.quadOut).to({ x: this.box_back.x }, 500, egret.Ease.quadIn);
    };
    __egretProto__.start = function () {
        this.bindEvents();
    };
    __egretProto__.bindEvents = function () {
        this.box_shovel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickShovel, this);
        this.box_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBack, this);
    };
    __egretProto__.unbindEvents = function () {
        this.box_shovel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickShovel, this);
        this.box_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBack, this);
    };
    __egretProto__.onClickShovel = function () {
        this.takeShovel();
    };
    __egretProto__.onClickBack = function () {
        Main.removeScene(this);
        Main.transit();
    };
    __egretProto__.onRemove = function () {
        this.unbindEvents();
    };
    __egretProto__.takeShovel = function () {
        if (Data.shovel == 0) {
            Data.shovel = 1;
            this.bg.source = "scene_trunk_0";
            WheatupEvent.call(EventType.GET_ITEM, "shovel");
        }
    };
    return TrunkScene;
})(Scene);
TrunkScene.prototype.__class__ = "TrunkScene";
//# sourceMappingURL=TrunkScene.js.map