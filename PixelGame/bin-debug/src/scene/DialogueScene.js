/**
 *
 * @author wheatup
 * 对话界面
 *
 */
var DialogueScene = (function (_super) {
    __extends(DialogueScene, _super);
    function DialogueScene() {
        _super.call(this, "skins.scene.DialogueSkin");
        this.normalPosY = 280;
        this.tickingText = false;
        this.showTime = 500;
        this.tickSpeed = 50;
        this.delayTime = 250;
        this.isDelaying = false;
        this.isAnimShowing = false;
        this.isDone = false;
        this.currentTextIndex = 0;
        this.currentText = "";
        DialogueScene.instance = this;
    }
    var __egretProto__ = DialogueScene.prototype;
    __egretProto__.init = function () {
        this.touchChildren = false;
        this.touchEnabled = false;
        this.grp = this.ui["grp"];
        this.grp.visible = false;
        this.grp.y = this.normalPosY + this.height;
        this.ui["lbl_text"].text = "";
        this.ui["lbl_name"].text = "";
        this.ui["lbl_text"].fontFamily = "font_pixel";
        this.ui["lbl_name"].fontFamily = "font_pixel";
        this.ui["lbl_arrow"].alpha = 0.8;
        egret.Tween.get(this.ui["lbl_arrow"], { loop: true }).to({ y: this.ui["lbl_arrow"].y + 10 }, 500, egret.Ease.quadIn).to({ y: this.ui["lbl_arrow"].y }, 500, egret.Ease.quadOut);
    };
    __egretProto__.show = function () {
        Main.free = false;
        egret.Tween.removeTweens(this.grp);
        egret.Tween.get(this.grp).to({ y: this.normalPosY }, this.showTime, egret.Ease.quadOut);
    };
    __egretProto__.hide = function () {
        Main.free = true;
        egret.Tween.removeTweens(this.grp);
        egret.Tween.get(this.grp).to({ y: this.normalPosY + this.height }, this.showTime, egret.Ease.quadIn);
    };
    __egretProto__.showText = function (text) {
        this.isAnimShowing = false;
        this.currentTextIndex = 0;
        this.currentText = text;
        this.tickingTimerVO = Timer.addTimer(this.tickSpeed, text.length, this.tickText, this);
    };
    __egretProto__.showArrow = function () {
        this.ui["lbl_arrow"].visible = true;
    };
    __egretProto__.hideArrow = function () {
        this.ui["lbl_arrow"].visible = false;
    };
    __egretProto__.tickText = function () {
        this.currentTextIndex++;
        this.ui["lbl_text"].text = this.currentText.substr(0, this.currentTextIndex);
        this.tickingText = (this.currentTextIndex < this.currentText.length);
        if (!this.tickingText) {
            this.completeDialogue();
        }
    };
    //点击后的反应
    __egretProto__.rush = function () {
        if (this.isDelaying || this.isAnimShowing)
            return;
        if (this.tickingText) {
            this.completeDialogue();
        }
        else if (this.isDone && DialogueScene.hasNext) {
            DialogueScene.showDialogue(DialogueScene.currentKey, false);
        }
        else if (this.isDone) {
            DialogueScene.hideDialogue();
            WheatupEvent.call(EventType.DIALOGUE_END, DialogueScene.currentKey);
        }
    };
    //显示对话
    DialogueScene.setDialogue = function (name, text) {
        var time = 100;
        DialogueScene.instance.hideArrow();
        DialogueScene.instance.grp.visible = true;
        if (name == null || name == "") {
            DialogueScene.instance.ui["img_name"].visible = false;
            DialogueScene.instance.ui["lbl_name"].visible = false;
        }
        else {
            DialogueScene.instance.ui["img_name"].visible = true;
            DialogueScene.instance.ui["lbl_name"].visible = true;
            DialogueScene.instance.ui["lbl_name"].text = name;
        }
        DialogueScene.instance.ui["lbl_text"].text = "";
        if (!DialogueScene.showing) {
            DialogueScene.instance.show();
            time = DialogueScene.instance.showTime;
        }
        DialogueScene.showing = true;
        DialogueScene.instance.isAnimShowing = true;
        Timer.addTimer(time, 1, DialogueScene.instance.showText, DialogueScene.instance, text);
    };
    //对话框受到交互
    DialogueScene.interupt = function () {
        DialogueScene.instance.rush();
    };
    //隐藏对话框
    DialogueScene.hideDialogue = function () {
        DialogueScene.instance.hide();
        DialogueScene.showing = false;
    };
    //获取对话并显示 
    DialogueScene.showDialogue = function (key, renew) {
        if (renew === void 0) { renew = true; }
        DialogueScene.instance.isDone = false;
        DialogueScene.currentKey = key;
        var dias = Dialogue.getDialogue(key, renew);
        DialogueScene.setDialogue(dias.name, dias.text);
        DialogueScene.hasNext = dias.stream;
    };
    __egretProto__.completeDialogue = function () {
        var _this = this;
        Timer.removeTimer(this.tickingTimerVO);
        this.tickingTimerVO = null;
        this.ui["lbl_text"].text = this.currentText;
        this.tickingText = false;
        this.isDelaying = true;
        Timer.addTimer(this.delayTime, 1, function () {
            _this.isDone = true;
            DialogueScene.instance.showArrow();
            _this.isDelaying = false;
        }, this);
    };
    DialogueScene.showing = false;
    DialogueScene.currentKey = "";
    DialogueScene.hasNext = false;
    return DialogueScene;
})(Scene);
DialogueScene.prototype.__class__ = "DialogueScene";
//# sourceMappingURL=DialogueScene.js.map