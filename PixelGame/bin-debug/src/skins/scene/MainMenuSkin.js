var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var MainMenuSkin = (function (_super) {
            __extends(MainMenuSkin, _super);
            function MainMenuSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [480, 800]);
                this.elementsContent = [this.bg_i(), this.frame_i(), this.bar_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = MainMenuSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return MainMenuSkin._skinParts;
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
            __egretProto__.frame_i = function () {
                var t = new egret.gui.UIAsset();
                this.frame = t;
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [40, egret.gui.getScale9Grid("4,4,24,24"), "loading_frame", 400, 200, 220]);
                return t;
            };
            __egretProto__.bar_i = function () {
                var t = new egret.gui.UIAsset();
                this.bar = t;
                this.__s(t, ["fillMode", "height", "scale9Grid", "source", "width", "x", "y"], ["scale", 40, egret.gui.getScale9Grid("4,4,24,24"), "loading_bar", 400, 200, 220]);
                return t;
            };
            MainMenuSkin._skinParts = ["bg", "frame", "bar"];
            return MainMenuSkin;
        })(egret.gui.Skin);
        scene.MainMenuSkin = MainMenuSkin;
        MainMenuSkin.prototype.__class__ = "skins.scene.MainMenuSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
