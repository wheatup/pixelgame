/**
 *
 * @author
 *
 */
var UIScene = (function (_super) {
    __extends(UIScene, _super);
    function UIScene() {
        _super.call(this, "skins.scene.UISkin");
    }
    var __egretProto__ = UIScene.prototype;
    __egretProto__.init = function () {
        this.img_message = this.ui["img_message"];
    };
    __egretProto__.start = function () {
        this.bindEvents();
    };
    __egretProto__.onDestory = function () {
        this.unbindEvents();
    };
    __egretProto__.bindEvents = function () {
        this.img_message.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchMessage, this);
    };
    __egretProto__.unbindEvents = function () {
        this.img_message.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchMessage, this);
    };
    __egretProto__.onTouchMessage = function (event) {
        if (DialogueScene.showing) {
            DialogueScene.interupt();
        }
        else if (Main.free) {
            Main.transit(1000);
            Main.addScene(Main.LAYER_GUI, Main.cellphoneScene);
        }
        event.stopPropagation();
    };
    return UIScene;
})(Scene);
UIScene.prototype.__class__ = "UIScene";
//# sourceMappingURL=UIScene.js.map