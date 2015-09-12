/**
 *
 * @author wheatup
 * 工作室场景
 *
 */
var StudioScene = (function (_super) {
    __extends(StudioScene, _super);
    function StudioScene() {
        _super.call(this, "skins.scene.StudioSkin");
    }
    var __egretProto__ = StudioScene.prototype;
    //初始化UI
    __egretProto__.init = function () {
        var _this = this;
        Timer.addTimer(2000, 1, function () {
            Main.addScene(Main.LAYER_GAME, new ScenarioIntro());
            Timer.addTimer(2000, 1, function () {
                Main.removeScene(_this);
            }, _this);
        }, this);
    };
    return StudioScene;
})(Scene);
StudioScene.prototype.__class__ = "StudioScene";
//# sourceMappingURL=StudioScene.js.map