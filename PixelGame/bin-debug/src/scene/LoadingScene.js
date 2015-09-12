/**
 *
 * @author wheatup
 * 加载资源界面场景
 *
 */
var LoadingScene = (function (_super) {
    __extends(LoadingScene, _super);
    function LoadingScene() {
        _super.call(this, "skins.scene.LoadingSkin");
    }
    var __egretProto__ = LoadingScene.prototype;
    //更新加载资源数
    __egretProto__.setProgress = function (cur, tol) {
        this.ui["bar"].width = 400 * (cur / tol);
        this.ui["lbl_prog"].fontFamily = "font_pixel";
        this.ui["lbl_title"].fontFamily = "font_pixel";
        this.ui["lbl_prog"].text = Math.round(100 * (cur / tol)) + "%";
    };
    return LoadingScene;
})(Scene);
LoadingScene.prototype.__class__ = "LoadingScene";
//# sourceMappingURL=LoadingScene.js.map