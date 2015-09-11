/**
 *
 * @author wheatup
 * 主菜单界面
 *
 */
var MainMenuScene = (function (_super) {
    __extends(MainMenuScene, _super);
    function MainMenuScene() {
        _super.call(this, "skins.scene.MainMenuSkin");
        //标题闪烁
        this.offsetX = 0;
        this.offsetY = 0;
        MainMenuScene.instance = this;
    }
    var __egretProto__ = MainMenuScene.prototype;
    //初始化
    __egretProto__.init = function () {
        //初始化界面
        this.bg1 = this.ui["bg1"];
        this.bg2 = this.ui["bg2"];
        this.bg3 = this.ui["bg3"];
        this.grp = this.ui["grp"];
        this.grp_particle = this.ui["grp_particle"];
        this.img_title = this.ui["img_title"];
        this.lbl_start = this.ui["lbl_start"];
        //添加标题缓动
        var that = this;
        if (egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE) {
            if (window["DeviceOrientationEvent"]) {
                window.addEventListener("deviceorientation", this.onOrientation);
            }
        }
        else {
            document.getElementById("egretCanvas").addEventListener("mousemove", this.onMouseMove);
        }
        //添加标题闪烁
        this.blink();
        //添加粒子
        var texture = RES.getRes("par_title");
        var config = RES.getRes("par_title_json");
        this.particle = new particle.GravityParticleSystem(texture, config);
        this.particle.emitterX = -50;
        this.particle.emitterY = 240;
        this.grp_particle.blendMode = egret.BlendMode.ADD;
        this.grp_particle.addElement(this.particle);
        this.particle.start();
        //添加事件
        this.lbl_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickStart, this);
    };
    //鼠标移动的UI缓动事件
    __egretProto__.onMouseMove = function (evt) {
        MainMenuScene.instance.grp.x = (400 - evt.x + (window.innerWidth - 800) / 2) / 32;
        MainMenuScene.instance.grp.y = (240 - evt.y) / 32;
        MainMenuScene.instance.bg1.x = (400 - evt.x + (window.innerWidth - 800) / 2) / 200 - 20;
        MainMenuScene.instance.bg1.y = (240 - evt.y) / 200 - 20;
        MainMenuScene.instance.bg2.x = (400 - evt.x + (window.innerWidth - 800) / 2) / 60 - 20;
        MainMenuScene.instance.bg2.y = (240 - evt.y) / 60 - 20;
        MainMenuScene.instance.bg3.x = (400 - evt.x + (window.innerWidth - 800) / 2) / 20 - 20;
        MainMenuScene.instance.bg3.y = (240 - evt.y) / 20 - 20;
    };
    __egretProto__.onOrientation = function (e) {
        var x = parseFloat(e.gamma + "") / 90;
        var y = parseFloat(e.beta + "") / 90;
        if (isNaN(x) || isNaN(y))
            return;
        if (window.orientation == 180) {
            x = -x;
            y = -y;
        }
        else if (window.orientation == 90) {
            var temp = x;
            x = y;
            y = temp;
        }
        else if (window.orientation == -90) {
            var temp = x;
            x = -y;
            y = -temp;
        }
        MainMenuScene.instance.grp.x = x * 30;
        MainMenuScene.instance.grp.y = y * 30;
        MainMenuScene.instance.bg1.x = x * 7 - 20;
        MainMenuScene.instance.bg1.y = y * 8 - 20;
        MainMenuScene.instance.bg2.x = x * 16 - 20;
        MainMenuScene.instance.bg2.y = y * 20 - 20;
        MainMenuScene.instance.bg3.x = x * 35 - 20;
        MainMenuScene.instance.bg3.y = y * 40 - 20;
    };
    __egretProto__.blink = function () {
        var _this = this;
        if (this.removed)
            return;
        Timer.addTimer(100 + Math.floor(Math.random() * 10000), 1, this.blink, this);
        this.offsetX = Math.round(Math.random() * 20 - 10);
        this.offsetY = Math.round(Math.random() * 20 - 10);
        this.img_title.source = "title_title_2";
        this.img_title.x -= this.offsetX;
        this.img_title.y -= this.offsetY;
        Timer.addTimer(50, 1, function () {
            _this.img_title.source = "title_title_1";
            _this.img_title.x += _this.offsetX;
            _this.img_title.y += _this.offsetY;
        }, this);
    };
    //点击开始按钮
    __egretProto__.onClickStart = function () {
        Main.TRANSTION_TIME = 6000;
        Sound.stop("sound_dance");
        Sound.playSFX("sound_piano_break");
        Main.removeScene(this);
        Main.addScene(Main.LAYER_GAME, new TestScenario());
    };
    //移除事件，移除跟本页面相关的所有监听
    __egretProto__.onRemove = function () {
        this.lbl_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickStart, this);
        if (egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE) {
            if (window["DeviceOrientationEvent"]) {
                window.removeEventListener("deviceorientation", this.onOrientation);
            }
        }
        else {
            document.getElementById("egretCanvas").removeEventListener("mousemove", this.onMouseMove);
        }
    };
    return MainMenuScene;
})(Scene);
MainMenuScene.prototype.__class__ = "MainMenuScene";
//# sourceMappingURL=MainMenuScene.js.map