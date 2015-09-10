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
        this.offsetX = 0;
        this.offsetY = 0;
        MainMenuScene.instance = this;
    }
    var __egretProto__ = MainMenuScene.prototype;
    //初始化
    __egretProto__.init = function () {
        //初始化界面
        this.ui["bg"].alpha = 0;
        this.grp = this.ui["grp"];
        this.grp_particle = this.ui["grp_particle"];
        this.img_title = this.ui["img_title"];
        this.lbl_start = this.ui["lbl_start"];
        //添加标题缓动
        var that = this;
        document.getElementById("egretCanvas").addEventListener("mousemove", this.onMouseMove);
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
        MainMenuScene.instance.grp.x = (400 - evt.x) / 32;
        MainMenuScene.instance.grp.y = (240 - evt.y) / 32;
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
        Main.removeScene(this);
        Main.addScene(Main.LAYER_GAME, new TestScenario());
    };
    //移除事件，移除跟本页面相关的所有监听
    __egretProto__.onRemove = function () {
        this.lbl_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickStart, this);
        document.getElementById("egretCanvas").removeEventListener("mousemove", this.onMouseMove);
    };
    return MainMenuScene;
})(Scene);
MainMenuScene.prototype.__class__ = "MainMenuScene";
//# sourceMappingURL=MainMenuScene.js.map