/**
 * @author wheatup
 * 主菜单界面
 */
var MainMenuScene = (function (_super) {
    __extends(MainMenuScene, _super);
    function MainMenuScene() {
        _super.call(this, "skins.scene.MainMenuSkin");
        MainMenuScene.instance = this;
    }
    var __egretProto__ = MainMenuScene.prototype;
    //初始化
    __egretProto__.init = function () {
        //初始化界面
        this.ui["bg"].alpha = 0;
        this.grp = this.ui["grp"];
        //添加标题缓动
        var that = this;
        document.getElementById("egretCanvas").addEventListener("mousemove", this.onMouseMove);
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
    //开始方法
    __egretProto__.start = function () {
        //Main.removeScene(this);
        //Main.addScene(Main.LAYER_GAME, new GameScene());
    };
    //移除事件，移除跟本页面相关的所有监听
    __egretProto__.onRemove = function () {
        document.getElementById("egretCanvas").removeEventListener("mousemove", this.onMouseMove);
    };
    return MainMenuScene;
})(Scene);
MainMenuScene.prototype.__class__ = "MainMenuScene";
