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
        this.seleted = false;
        this.lastFree = false;
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
        this.grp_choice = this.ui["grp_choice"];
        this.img_choice_bg = this.ui["img_choice_bg"];
        this.img_choice_bg.alpha = 0.5;
        Util.centerPivot(this.img_choice_bg);
        this.lbl_question = this.ui["lbl_question"];
        this.lbl_question.fontFamily = "font_pixel";
        this.lbl_question.y += 10;
        this.initQuesY = this.lbl_question.y;
        this.lbl_choice1 = this.ui["lbl_choice1"];
        this.lbl_choice1.fontFamily = "font_pixel";
        this.lbl_choice1.y -= 10;
        this.lbl_choice2 = this.ui["lbl_choice2"];
        this.lbl_choice2.fontFamily = "font_pixel";
        this.lbl_choice2.y -= 10;
        this.initAnsY = this.lbl_choice1.y;
        this.grp_choice.visible = false;
        WheatupEvent.bind(EventType.GET_ITEM, this.onGetItem, this);
        WheatupEvent.bind(EventType.LOST_ITEM, this.onLostItem, this);
    };
    __egretProto__.showChoice = function (key) {
        WheatupEvent.call(EventType.SHOW_CHOICE, Choice.getChoice(key));
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
        this.lbl_choice1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchChoice1, this);
        this.lbl_choice2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchChoice2, this);
        WheatupEvent.bind(EventType.SHOW_CHOICE, this.onShowChoice, this);
    };
    __egretProto__.unbindEvents = function () {
        this.img_message.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchMessage, this);
        this.lbl_choice1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchChoice1, this);
        this.lbl_choice2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchChoice2, this);
        WheatupEvent.unbind(EventType.SHOW_CHOICE, this.onShowChoice);
    };
    //出现选择分支
    __egretProto__.onShowChoice = function (choice) {
        if (choice == null)
            return;
        this.seleted = false;
        this.lastFree = Main.free;
        Main.free = false;
        egret.Tween.removeTweens(this.img_choice_bg);
        egret.Tween.removeTweens(this.lbl_question);
        egret.Tween.removeTweens(this.lbl_choice1);
        egret.Tween.removeTweens(this.lbl_choice2);
        this.img_choice_bg.alpha = 0;
        this.img_choice_bg.scaleY = 0;
        this.lbl_question.alpha = 0;
        this.lbl_choice1.alpha = 0;
        this.lbl_choice2.alpha = 0;
        this.currentChoice = choice;
        this.lbl_question.text = choice.question;
        this.lbl_choice1.text = choice.choices[0];
        this.lbl_choice2.text = choice.choices[1];
        this.grp_choice.visible = true;
        egret.Tween.get(this.img_choice_bg).to({ alpha: 0.8, scaleY: 1 }, 300, egret.Ease.quadOut);
        egret.Tween.get(this.lbl_question).to({ alpha: 1, y: this.initQuesY - 10 }, 300, egret.Ease.quadOut);
        egret.Tween.get(this.lbl_choice1).to({ alpha: 1, y: this.initAnsY + 10 }, 300, egret.Ease.quadOut);
        egret.Tween.get(this.lbl_choice2).to({ alpha: 1, y: this.initAnsY + 10 }, 300, egret.Ease.quadOut);
    };
    __egretProto__.onTouchChoice1 = function (event) {
        if (!this.seleted) {
            this.hideChoices();
            WheatupEvent.call(EventType.SELECT_CHOICE, { choice: this.currentChoice, select: 1 });
        }
        event.stopPropagation();
    };
    __egretProto__.onTouchChoice2 = function (event) {
        if (!this.seleted) {
            this.hideChoices();
            WheatupEvent.call(EventType.SELECT_CHOICE, { choice: this.currentChoice, select: 2 });
        }
        event.stopPropagation();
    };
    __egretProto__.hideChoices = function () {
        var _this = this;
        Main.free = this.lastFree;
        this.seleted = true;
        egret.Tween.removeTweens(this.img_choice_bg);
        egret.Tween.removeTweens(this.lbl_question);
        egret.Tween.removeTweens(this.lbl_choice1);
        egret.Tween.removeTweens(this.lbl_choice2);
        egret.Tween.get(this.lbl_question).to({ alpha: 0, y: this.initQuesY }, 300, egret.Ease.quadIn);
        egret.Tween.get(this.lbl_choice1).to({ alpha: 0, y: this.initAnsY }, 300, egret.Ease.quadIn);
        egret.Tween.get(this.lbl_choice2).to({ alpha: 0, y: this.initAnsY }, 300, egret.Ease.quadIn);
        egret.Tween.get(this.img_choice_bg).to({ alpha: 0, scaleY: 0 }, 300, egret.Ease.quadIn);
        Timer.addTimer(300, 1, function () {
            if (_this.seleted)
                _this.grp_choice.visible = false;
        }, this);
    };
    __egretProto__.onTouchMessage = function (event) {
        if (Main.free) {
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