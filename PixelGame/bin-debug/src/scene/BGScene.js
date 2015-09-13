/**
 *
 * @author
 *
 */
var BGScene = (function (_super) {
    __extends(BGScene, _super);
    function BGScene() {
        _super.call(this, "skins.scene.BGSkin");
    }
    var __egretProto__ = BGScene.prototype;
    __egretProto__.init = function () {
        this.bg = this.ui["bg"];
        //        this.bg.touchChildren = false;
        //        this.touchChildren = false;
    };
    __egretProto__.transit = function () {
        var _this = this;
        this.bg.visible = true;
        egret.Tween.removeTweens(this.bg);
        egret.Tween.get(this.bg).to({ alpha: 1 }, Main.TRANSTION_TIME * 0.4).to({}, Main.TRANSTION_TIME * 0.2).to({ alpha: 0 }, Main.TRANSTION_TIME * 0.4);
        Timer.addTimer(Main.TRANSTION_TIME, 1, function () {
            _this.bg.visible = false;
        }, this);
    };
    return BGScene;
})(Scene);
BGScene.prototype.__class__ = "BGScene";
//# sourceMappingURL=BGScene.js.map