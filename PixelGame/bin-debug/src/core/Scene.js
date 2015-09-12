var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene(skinName) {
        _super.call(this);
        this.removed = false;
        this.added = false;
        this.currentTime = 0;
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
    __egretProto__.onDestroy = function () {
    };
    __egretProto__.start = function () {
    };
    __egretProto__.update = function () {
    };
    __egretProto__.init = function () {
    };
    __egretProto__.delay = function (value) {
        this.currentTime += value;
    };
    __egretProto__.addEvent = function (func, thisObject, data) {
        Timer.addTimer(this.currentTime, 1, func, thisObject, data);
    };
    return Scene;
})(egret.gui.Panel);
Scene.prototype.__class__ = "Scene";
