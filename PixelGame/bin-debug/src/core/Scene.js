var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene(skinName) {
        _super.call(this);
        this.skinName = skinName;
        this.ui = new Object();
    }
    var __egretProto__ = Scene.prototype;
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        this.ui[partName] = instance;
    };
    __egretProto__.childrenCreated = function () {
        this.init();
    };
    __egretProto__.onRemove = function () {
    };
    __egretProto__.start = function () {
    };
    __egretProto__.update = function () {
    };
    __egretProto__.init = function () {
    };
    return Scene;
})(egret.gui.Panel);
Scene.prototype.__class__ = "Scene";
