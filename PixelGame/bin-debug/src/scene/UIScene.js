/**
 *
 * @author wheatup
 * UI界面
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
        this.items = new Array();
        this.grp = this.ui["grp"];
        WheatupEvent.bind(EventType.GET_ITEM, this.onGetItem, this);
        WheatupEvent.bind(EventType.LOST_ITEM, this.onLostItem, this);
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
    __egretProto__.onGetItem = function (item) {
        var img = new egret.gui.UIAsset();
        img.width = 60;
        img.height = 60;
        img.anchorX = 0.5;
        img.anchorY = 0.5;
        img.x = 750;
        img.y = 130 + this.items.length * 70;
        img.source = item.asset;
        img.alpha = 0;
        img.scaleX = 2;
        img.scaleY = 2;
        this.grp.addElement(img);
        if (item == Item.shovel) {
            img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShovel, this);
        }
        egret.Tween.get(img).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 500, egret.Ease.quadOut);
    };
    __egretProto__.onLostItem = function (item) {
        var _this = this;
        var index = Inventory.items.indexOf(item);
        if (index < 0)
            return;
        for (var i = index + 1; i < this.items.length; i++) {
            egret.Tween.get(this.items[i]).to({ y: 130 + (i - 1) * 70 }, 1000, egret.Ease.quadOut);
        }
        egret.Tween.get(this.items[index]).to({ scaleX: 0, scaleY: 0, alpha: 0 }, 500);
        Timer.addTimer(500, 1, function () {
            _this.grp.removeElement(_this.items[index]);
            _this.items.splice(index, 1);
        }, this);
    };
    __egretProto__.onTouchShovel = function (event) {
        if (Main.free) {
            DialogueScene.showItemDesc(Item.shovel);
        }
        event.stopPropagation();
    };
    return UIScene;
})(Scene);
UIScene.prototype.__class__ = "UIScene";
//# sourceMappingURL=UIScene.js.map