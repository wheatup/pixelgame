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
        this.interupted = false;
    }
    var __egretProto__ = WarningScene.prototype;
    //初始化UI
    __egretProto__.init = function () {
        this.img_loading = this.ui["img_loading"];
        this.grp = this.ui["grp"];
        //只在手机浏览器中显示声音提示
        if (egret.MainContext.deviceType != egret.MainContext.DEVICE_MOBILE) {
            this.ui["lbl_title_cn4"].visible = false;
            this.ui["lbl_title_en4"].visible = false;
        }
        this.ui["lbl_title_cn1"].fontFamily = "font_pixel";
        this.ui["lbl_title_cn2"].fontFamily = "font_pixel";
        this.ui["lbl_title_cn3"].fontFamily = "font_pixel";
        this.ui["lbl_title_cn4"].fontFamily = "font_pixel";
        this.ui["lbl_title_en1"].fontFamily = "font_pixel";
        this.ui["lbl_title_en2"].fontFamily = "font_pixel";
        this.ui["lbl_title_en3"].fontFamily = "font_pixel";
        this.ui["lbl_title_en4"].fontFamily = "font_pixel";
    };
    //启动警告界面
    __egretProto__.start = function () {
        var _this = this;
        this.spinSimbol();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rush, this);
        this.title1x = this.ui["lbl_title_cn1"].x;
        this.title1y = this.ui["lbl_title_cn1"].y;
        this.title2x = this.ui["lbl_title_en1"].x;
        this.title2y = this.ui["lbl_title_en1"].y;
        this.viberateTimerVO = Timer.addTimer(50, -1, this.viberate, this);
        if (egret.MainContext.deviceType != egret.MainContext.DEVICE_MOBILE) {
            this.autoTimerVO = Timer.addTimer(20000, 1, function () {
                if (!_this.interupted) {
                    _this.stepToNext();
                }
            }, this);
        }
    };
    //旋转存档图标
    __egretProto__.spinSimbol = function () {
        this.img_loading.anchorX = 0.5;
        this.img_loading.anchorY = 0.5;
        this.img_loading.x += this.img_loading.width / 2;
        this.img_loading.y += this.img_loading.width / 2;
        egret.Tween.get(this.img_loading, { loop: true }).to({ rotation: -360 }, 2000);
    };
    //强制切换场景
    __egretProto__.rush = function () {
        this.interupted = true;
        Timer.removeTimer(this.autoTimerVO);
        this.stepToNext();
    };
    //添加震动效果
    __egretProto__.viberate = function () {
        egret.Tween.get(this.ui["lbl_title_cn1"]).to({ x: this.title1x + Math.floor(Math.random() * 3), y: this.title1y + Math.floor(Math.random() * 3) }, 40);
        egret.Tween.get(this.ui["lbl_title_en1"]).to({ x: this.title2x + Math.floor(Math.random() * 3), y: this.title2y + Math.floor(Math.random() * 3) }, 40);
    };
    //切换至下一个场景
    __egretProto__.stepToNext = function () {
        if (egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE) {
            Sound.playBGM("sound_dance");
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rush, this);
        Main.addScene(Main.LAYER_GAME, Main.mainMenuScene);
        Main.removeScene(this);
        Main.transit();
    };
    //移除场景事件
    __egretProto__.onDestroy = function () {
        Timer.removeTimer(this.viberateTimerVO);
        if (!this.interupted) {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rush, this);
        }
    };
    return WarningScene;
})(Scene);
WarningScene.prototype.__class__ = "WarningScene";
//# sourceMappingURL=WarningScene.js.map