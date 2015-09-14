/**
 *
 * @author
 *
 */
var UIScene = (function (_super) {
    __extends(UIScene, _super);
    function UIScene() {
        _super.call(this, "skins.scene.UISkin");
        this.unreadMessages = 0;
    }
    var __egretProto__ = UIScene.prototype;
    __egretProto__.init = function () {
        this.img_message = this.ui["img_message"];
        this.img_message.anchorX = 0.5;
        this.img_message.anchorY = 0.5;
        this.img_message.x += Math.round(this.img_message.width / 2);
        this.img_message.y += Math.round(this.img_message.height / 2);
        this.img_message.source = "cellphone_new_0";
        this.img_message.visible = false;
    };
    __egretProto__.start = function () {
        this.bindEvents();
    };
    __egretProto__.onDestory = function () {
        this.unbindEvents();
    };
    __egretProto__.addMessage = function () {
        this.unreadMessages++;
        this.img_message.source = "cellphone_new_" + Math.min(this.unreadMessages, 4);
        this.img_message.y -= 100;
        this.img_message.alpha = 0;
        this.img_message.visible = true;
        egret.Tween.get(this.img_message).to({ y: this.img_message.y + 100, alpha: 1 }, 500, egret.Ease.quadOut);
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
            Main.transit(500);
            Main.addScene(Main.LAYER_GUI, Main.cellphoneScene);
            this.unreadMessages = 0;
            Main.cellphoneScene.isOpened = true;
            this.img_message.source = "cellphone_new_0";
        }
        event.stopPropagation();
    };
    return UIScene;
})(Scene);
UIScene.prototype.__class__ = "UIScene";
//# sourceMappingURL=UIScene.js.map