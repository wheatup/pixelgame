/**
 *
 * @author
 *
 */
var MainMenuScene = (function (_super) {
    __extends(MainMenuScene, _super);
    function MainMenuScene() {
        _super.call(this, "skins.scene.MainMenuSkin");
    }
    var __egretProto__ = MainMenuScene.prototype;
    __egretProto__.init = function () {
        this.ui["bg"].alpha = 0;
        this.grp = this.ui["grp"];
        var that = this;
        document.getElementById("egretCanvas").addEventListener("mousemove", function (evt) {
            that.mouseMove(evt.x, evt.y);
        });
    };
    __egretProto__.mouseMove = function (x, y) {
        this.grp.x = (400 - x) / 32;
        this.grp.y = (240 - y) / 32;
    };
    __egretProto__.start = function () {
        //Main.removeScene(this);
        //Main.addScene(Main.LAYER_GAME, new GameScene());
        var texture = RES.getRes("par_title");
        var config = RES.getRes("par_title_json");
        this.particle = new particle.GravityParticleSystem(texture, config);
        this.particle.emitterX = -50;
        this.particle.emitterY = 240;
        Main.addParticleEmitter(this.particle, Main.LAYER_BOTTOM);
        this.particle.start();
    };
    return MainMenuScene;
})(Scene);
MainMenuScene.prototype.__class__ = "MainMenuScene";
//# sourceMappingURL=MainMenuScene.js.map