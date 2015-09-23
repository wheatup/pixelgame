/**
 *
 * @author wheatup
 * 后备箱
 *
 */
var BookScene = (function (_super) {
    __extends(BookScene, _super);
    function BookScene() {
        _super.call(this, "skins.scene.BookSkin");
        this.currentPage = 0;
    }
    var __egretProto__ = BookScene.prototype;
    __egretProto__.init = function () {
        this.book = new Book();
        this.bg = this.ui["bg"];
        this.touchEnabled = false;
        this.box_back = this.ui["box_back"];
        Util.centerPivot(this.box_back);
        this.box_back.rotation = 270;
        this.img_light = this.ui["img_light"];
        Util.centerPivot(this.img_light);
        this.img_prev = this.ui["img_prev"];
        Util.centerPivot(this.img_prev);
        this.img_prev.rotation = 180;
        this.img_next = this.ui["img_next"];
        Util.centerPivot(this.img_next);
        egret.Tween.get(this.img_prev, { loop: true }).to({ x: this.img_prev.x - 5 }, 500, egret.Ease.quadIn).to({ x: this.img_prev.x }, 500, egret.Ease.quadOut);
        egret.Tween.get(this.img_next, { loop: true }).to({ x: this.img_next.x + 5 }, 500, egret.Ease.quadIn).to({ x: this.img_next.x }, 500, egret.Ease.quadOut);
        this.img_light.scaleX = 4;
        this.img_light.scaleY = 4;
        this.img_light.alpha = 0.2;
        this.img_light.blendMode = egret.BlendMode.ADD;
        egret.Tween.get(this.box_back, { loop: true }).to({ y: this.box_back.y + 20 }, 500, egret.Ease.quadIn).to({ y: this.box_back.y }, 500, egret.Ease.quadOut);
        egret.Tween.get(this.img_light, { loop: true }).to({ alpha: 0.5, scaleX: 6, scaleY: 6 }, 2000).to({ alpha: 0.2, scaleX: 4, scaleY: 4 }, 2000);
        this.lbl_text1 = this.ui["lbl_text1"];
        this.lbl_text1.fontFamily = "font_pixel";
        this.lbl_text1.bold = true;
        this.lbl_text1.skewX = 5;
        this.lbl_text2 = this.ui["lbl_text2"];
        this.lbl_text2.fontFamily = "font_pixel";
        this.lbl_text2.bold = true;
        this.lbl_text2.skewX = 5;
        this.lbl_text1.text = "";
        this.lbl_text2.text = "";
        this.turnPage(0);
    };
    __egretProto__.turnPage = function (page) {
        this.currentPage = page;
        this.lbl_text1.text = this.book.getText(page);
        this.lbl_text2.text = this.book.getText(page + 1);
        this.img_prev.visible = this.book.hasPrev(this.currentPage);
        this.img_next.visible = this.book.hasNext(this.currentPage + 1);
    };
    __egretProto__.start = function () {
        this.bindEvents();
    };
    __egretProto__.bindEvents = function () {
        this.box_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBack, this);
        this.img_prev.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickPrev, this);
        this.img_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickNext, this);
    };
    __egretProto__.unbindEvents = function () {
        this.box_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBack, this);
        this.img_prev.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickPrev, this);
        this.img_next.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickNext, this);
    };
    __egretProto__.onClickPrev = function () {
        this.currentPage -= 2;
        this.turnPage(this.currentPage);
    };
    __egretProto__.onClickNext = function () {
        this.currentPage += 2;
        this.turnPage(this.currentPage);
    };
    __egretProto__.onClickBack = function () {
        Main.removeScene(this);
        Main.transit();
    };
    __egretProto__.onRemove = function () {
        this.unbindEvents();
    };
    return BookScene;
})(Scene);
BookScene.prototype.__class__ = "BookScene";
//# sourceMappingURL=BookScene.js.map