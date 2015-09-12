var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var StudioSkin = (function (_super) {
            __extends(StudioSkin, _super);
            function StudioSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [480, 800]);
                this.elementsContent = [this.grp_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = StudioSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return StudioSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.img_i = function () {
                var t = new egret.gui.UIAsset();
                this.img = t;
                this.__s(t, ["height", "horizontalCenter", "source", "verticalCenter", "width"], [240, 0, "shroomgames", 0, 580]);
                return t;
            };
            __egretProto__.grp_i = function () {
                var t = new egret.gui.Group();
                this.grp = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 800, 0, 0]);
                t.elementsContent = [this.img_i()];
                return t;
            };
            StudioSkin._skinParts = ["img", "grp"];
            return StudioSkin;
        })(egret.gui.Skin);
        scene.StudioSkin = StudioSkin;
        StudioSkin.prototype.__class__ = "skins.scene.StudioSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
//# sourceMappingURL=StudioSkin.js.map