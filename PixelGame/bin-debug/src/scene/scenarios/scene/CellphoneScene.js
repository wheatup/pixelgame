/**
 *
 * @author wheatup
 * 手机界面
 *
 */
var CellphoneScene = (function (_super) {
    __extends(CellphoneScene, _super);
    function CellphoneScene() {
        _super.call(this, "skins.scene.CellphoneSkin");
        this.messages = [];
        this.tests = [
            "这个游戏还在测试中啦，你在大声什么啦",
            "暴力膜蛤不可取",
            "版权所有 蘑菇独立游戏开发工作室",
            "小白才是最帅的",
            "你一定没有女朋友",
            "诸君，求推荐一部电影。前一段时间玩wow吧生物钟搞得很奇怪，现在afk了想要早点睡吧生物钟调回来。直接睡又睡不着于是打算睡前看一部电影。求推荐。最好不要太冷门在主站就能找到的。",
            "逼事世嘉",
            "2333333333333333333(ゝ∀･)",
            "哈哈哈哈哈哈哈哈",
            "不知道 不明了 不想要 为什么",
            "蛤蛤",
            "BOG死妈",
            "You fucking idiot!",
        ];
    }
    var __egretProto__ = CellphoneScene.prototype;
    __egretProto__.init = function () {
        this.grp_entries = this.ui["grp_entries"];
        this.lbl_name = this.ui["lbl_name"];
        this.lbl_name.text = "老婆";
        this.lbl_name.fontFamily = "font_pixel";
        this.box_back = this.ui["box_back"];
        this.ui["bg0"].alpha = 0.8;
    };
    __egretProto__.start = function () {
        this.scrollView = new egret.ScrollView(this.grp_entries);
        this.scrollView.verticalScrollPolicy = 'auto';
        this.scrollView.x = 140;
        this.scrollView.y = 120;
        this.scrollView.width = this.grp_entries.width;
        this.scrollView.height = 203;
        Main.main.addChild(this.scrollView);
        this.bindEvents();
    };
    __egretProto__.bindEvents = function () {
        var _this = this;
        this.testVo = Timer.addTimer(3000, -1, function () {
            _this.addOneMessage(Math.random() > 0.5, _this.tests[Math.floor(Math.random() * _this.tests.length)]);
        }, this);
        this.box_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.leave, this);
    };
    __egretProto__.unbindEvents = function () {
        Timer.removeTimer(this.testVo);
        this.box_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.leave, this);
    };
    __egretProto__.leave = function () {
        Main.transit(1000);
        Main.removeScene(this);
    };
    __egretProto__.onRemove = function () {
        this.unbindEvents();
        Main.main.removeChild(this.scrollView);
    };
    __egretProto__.addOneMessage = function (isMe, message) {
        var entry = new MsgEntry();
        var h = 0;
        for (var i = 0; i < this.messages.length; i++) {
            h += this.messages[i].entryHeight + 5;
        }
        entry.y = 10 + h;
        entry.addToMessage(this.grp_entries, isMe, message);
        this.messages.push(entry);
        this.grp_entries.height = 10 + h + entry.entryHeight;
        this.scrollView.scrollTop = this.grp_entries.height - 203;
        this.ui["img_msg_bg"].height = 10 + h + entry.entryHeight;
    };
    return CellphoneScene;
})(Scene);
CellphoneScene.prototype.__class__ = "CellphoneScene";
var MsgEntry = (function (_super) {
    __extends(MsgEntry, _super);
    function MsgEntry() {
        _super.call(this);
        this.entryHeight = 0;
    }
    var __egretProto__ = MsgEntry.prototype;
    __egretProto__.addToMessage = function (group, isMe, text) {
        var textLength = text.length;
        this.lbl_entry = new egret.gui.Label();
        this.lbl_entry.alpha = 0;
        this.lbl_entry.fontFamily = "font_pixel";
        this.lbl_entry.size = 24;
        this.lbl_entry.bold = true;
        this.lbl_entry.textColor = isMe ? 0x446633 : 0x333333;
        this.lbl_entry.maxWidth = 270;
        this.lbl_entry.text = text;
        this.lbl_entry.measure();
        var width = this.lbl_entry.measuredWidth;
        var height = this.lbl_entry.measuredHeight;
        this.lbl_entry.x = isMe ? Math.max(470 - width, 17) : 17;
        this.lbl_entry.y = 12;
        this.img_entry = new egret.gui.UIAsset();
        this.img_entry.alpha = 0;
        this.img_entry.source = isMe ? "cellphone_msg_me" : "cellphone_msg_other";
        this.img_entry.height = height + 36;
        this.img_entry.scale9Grid = isMe ? new egret.Rectangle(20, 16, 16, 24) : new egret.Rectangle(32, 16, 16, 24);
        this.img_entry.width = 40 + width;
        this.img_entry.x = isMe ? Math.max(490 - this.img_entry.width) : 0;
        this.entryHeight = this.img_entry.height;
        this.addElement(this.img_entry);
        this.addElement(this.lbl_entry);
        group.addElement(this);
        this.img_entry.y += 50;
        this.lbl_entry.y += 50;
        egret.Tween.get(this.img_entry).to({ y: this.img_entry.y - 50 }, 500, egret.Ease.quadOut);
        egret.Tween.get(this.img_entry).to({ alpha: 1 }, 800);
        egret.Tween.get(this.lbl_entry).to({ y: this.lbl_entry.y - 50 }, 500, egret.Ease.quadOut);
        egret.Tween.get(this.lbl_entry).to({ alpha: 1 }, 800);
    };
    return MsgEntry;
})(egret.gui.Group);
MsgEntry.prototype.__class__ = "MsgEntry";
//# sourceMappingURL=CellphoneScene.js.map