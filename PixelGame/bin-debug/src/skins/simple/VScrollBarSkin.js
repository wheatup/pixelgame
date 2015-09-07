var skins;
(function (skins) {
    var simple;
    (function (simple) {
        var VScrollBarSkin = (function (_super) {
            __extends(VScrollBarSkin, _super);
            function VScrollBarSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["minHeight", "minWidth"], [10, 10]);
                this.elementsContent = [this.track_i(), this.thumb_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = VScrollBarSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return VScrollBarSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.thumb_i = function () {
                var t = new egret.gui.Button();
                this.thumb = t;
                this.__s(t, ["height", "horizontalCenter", "skinName", "width"], [20, 0, skins.simple.VScrollBarThumbSkin, 10]);
                return t;
            };
            __egretProto__.track_i = function () {
                var t = new egret.gui.UIAsset();
                this.track = t;
                this.__s(t, ["bottom", "percentHeight", "horizontalCenter", "source", "top", "width"], [10, 100, 0, "vscrolltrack_png", 10, 10]);
                return t;
            };
            VScrollBarSkin._skinParts = ["track", "thumb"];
            return VScrollBarSkin;
        })(egret.gui.Skin);
        simple.VScrollBarSkin = VScrollBarSkin;
        VScrollBarSkin.prototype.__class__ = "skins.simple.VScrollBarSkin";
    })(simple = skins.simple || (skins.simple = {}));
})(skins || (skins = {}));
//# sourceMappingURL=VScrollBarSkin.js.map