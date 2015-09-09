var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var BGSkin = (function (_super) {
            __extends(BGSkin, _super);
            function BGSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [480, 800]);
                this.elementsContent = [this.bg_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = BGSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return BGSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.bg_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "black", 800, 0, 0]);
                return t;
            };
            BGSkin._skinParts = ["bg"];
            return BGSkin;
        })(egret.gui.Skin);
        scene.BGSkin = BGSkin;
        BGSkin.prototype.__class__ = "skins.scene.BGSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
