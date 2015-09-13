var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var UISkin = (function (_super) {
            __extends(UISkin, _super);
            function UISkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [480, 800]);
                this.elementsContent = [this.grp_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = UISkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return UISkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.img_message_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_message = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [96, "cellphone_new_1", 96, 704, 0]);
                return t;
            };
            __egretProto__.grp_i = function () {
                var t = new egret.gui.Group();
                this.grp = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 800, 0, 0]);
                t.elementsContent = [this.img_message_i()];
                return t;
            };
            UISkin._skinParts = ["img_message", "grp"];
            return UISkin;
        })(egret.gui.Skin);
        scene.UISkin = UISkin;
        UISkin.prototype.__class__ = "skins.scene.UISkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
//# sourceMappingURL=UISkin.js.map