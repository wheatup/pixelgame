var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var TrunkSkin = (function (_super) {
            __extends(TrunkSkin, _super);
            function TrunkSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [480, 800]);
                this.elementsContent = [this.bg_i(), this.box_shovel_i(), this.box_back_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = TrunkSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return TrunkSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.box_back_i = function () {
                var t = new egret.gui.UIAsset();
                this.box_back = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [100, "back", 72, 13, 190]);
                return t;
            };
            __egretProto__.box_shovel_i = function () {
                var t = new egret.gui.UIAsset();
                this.box_shovel = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [84, "blank", 393, 203, 237]);
                return t;
            };
            __egretProto__.bg_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "scene_trunk_1", 800, 0, 0]);
                return t;
            };
            TrunkSkin._skinParts = ["bg", "box_shovel", "box_back"];
            return TrunkSkin;
        })(egret.gui.Skin);
        scene.TrunkSkin = TrunkSkin;
        TrunkSkin.prototype.__class__ = "skins.scene.TrunkSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
//# sourceMappingURL=TrunkSkin.js.map