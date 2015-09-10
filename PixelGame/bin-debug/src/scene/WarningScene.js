/**
 *
 * @author wheatup
 * 游戏场景
 *
 */
var WarningScene = (function (_super) {
    __extends(WarningScene, _super);
    function WarningScene() {
        _super.call(this, "skins.scene.WarningSkin");
        this.interuptted = false;
    }
    var __egretProto__ = WarningScene.prototype;
    __egretProto__.init = function () {
        this.img_loading = this.ui["img_loading"];
        this.grp = this.ui["grp"];
    };
    __egretProto__.start = function () {
        var _this = this;
        this.spinSimbol();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rush, this);
        this.title1x = this.ui["lbl_title_cn1"].x;
        this.title1y = this.ui["lbl_title_cn1"].y;
        this.title2x = this.ui["lbl_title_en1"].x;
        this.title2y = this.ui["lbl_title_en1"].y;
        this.viberateTimerVO = Timer.addTimer(50, -1, this.viberate, this);
        this.autoTimerVO = Timer.addTimer(20000, 1, function () {
            if (!_this.interuptted) {
                _this.stepToNext();
            }
        }, this);
    };
    __egretProto__.spinSimbol = function () {
        this.img_loading.anchorX = 0.5;
        this.img_loading.anchorY = 0.5;
        this.img_loading.x += this.img_loading.width / 2;
        this.img_loading.y += this.img_loading.width / 2;
        egret.Tween.get(this.img_loading, { loop: true }).to({ rotation: -360 }, 2000);
    };
    __egretProto__.rush = function () {
        this.interuptted = true;
        Timer.removeTimer(this.autoTimerVO);
        this.stepToNext();
    };
    __egretProto__.viberate = function () {
        egret.Tween.get(this.ui["lbl_title_cn1"]).to({ x: this.title1x + Math.floor(Math.random() * 3), y: this.title1y + Math.floor(Math.random() * 3) }, 40);
        egret.Tween.get(this.ui["lbl_title_en1"]).to({ x: this.title2x + Math.floor(Math.random() * 3), y: this.title2y + Math.floor(Math.random() * 3) }, 40);
    };
    __egretProto__.stepToNext = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rush, this);
        //添加主菜单层
        Main.addScene(Main.LAYER_GAME, new MainMenuScene());
        Main.removeScene(this);
    };
    __egretProto__.onRemove = function () {
        Timer.removeTimer(this.viberateTimerVO);
        if (!this.interuptted) {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rush, this);
        }
    };
    return WarningScene;
})(Scene);
WarningScene.prototype.__class__ = "WarningScene";
//# sourceMappingURL=WarningScene.js.map