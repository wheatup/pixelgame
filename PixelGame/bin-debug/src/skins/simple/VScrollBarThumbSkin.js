var skins;
(function (skins) {
    var simple;
    (function (simple) {
        var VScrollBarThumbSkin = (function (_super) {
            __extends(VScrollBarThumbSkin, _super);
            function VScrollBarThumbSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = VScrollBarThumbSkin.prototype;
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["fillMode", "percentHeight", "horizontalCenter", "source", "width"], ["scale", 100, 0, "vscrollbtn_png", 10]);
                return t;
            };
            return VScrollBarThumbSkin;
        })(egret.gui.Skin);
        simple.VScrollBarThumbSkin = VScrollBarThumbSkin;
        VScrollBarThumbSkin.prototype.__class__ = "skins.simple.VScrollBarThumbSkin";
    })(simple = skins.simple || (skins.simple = {}));
})(skins || (skins = {}));
//# sourceMappingURL=VScrollBarThumbSkin.js.map