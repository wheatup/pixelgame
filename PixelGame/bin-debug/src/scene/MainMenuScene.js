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
        this.img_title = this.ui["img_title"];
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
        Main.addParticleEmitter(this.particle, Main.LAYER_BOTTOM);
        this.particle.start();
    };
    //鼠标移动的UI缓动事件
    __egretProto__.onMouseMove = function (evt) {
        MainMenuScene.instance.grp.x = (400 - evt.x) / 32;
        MainMenuScene.instance.grp.y = (240 - evt.y) / 32;
    };
    __egretProto__.blink = function () {
        var _this = this;
        Debug.log("1");
        if (this.removed)
            return;
        Debug.log("2");
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
    //开始方法
    __egretProto__.start = function () {
    };
    //移除事件，移除跟本页面相关的所有监听
    __egretProto__.onRemove = function () {
        document.getElementById("egretCanvas").removeEventListener("mousemove", this.onMouseMove);
    };
    return MainMenuScene;
})(Scene);
MainMenuScene.prototype.__class__ = "MainMenuScene";
//# sourceMappingURL=MainMenuScene.js.map