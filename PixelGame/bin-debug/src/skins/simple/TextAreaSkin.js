var skins;
(function (skins) {
    var simple;
    (function (simple) {
        var TextAreaSkin = (function (_super) {
            __extends(TextAreaSkin, _super);
            function TextAreaSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["minHeight", "minWidth"], [30, 100]);
                this.elementsContent = [this.__3_i(), this.textDisplay_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [
                        new egret.gui.SetProperty("textDisplay", "textColor", 0xAAAAAA)
                    ])
                ];
            }
            var __egretProto__ = TextAreaSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return TextAreaSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["percentHeight", "source", "percentWidth"], [100, "textbox_png", 100]);
                return t;
            };
            __egretProto__.textDisplay_i = function () {
                var t = new egret.gui.EditableText();
                this.textDisplay = t;
                this.__s(t, ["bottom", "percentHeight", "left", "right", "size", "textColor", "top", "percentWidth"], [8, 100, 10, 10, 20, 0x000000, 8, 100]);
                return t;
            };
            TextAreaSkin._skinParts = ["textDisplay"];
            return TextAreaSkin;
        })(egret.gui.Skin);
        simple.TextAreaSkin = TextAreaSkin;
        TextAreaSkin.prototype.__class__ = "skins.simple.TextAreaSkin";
    })(simple = skins.simple || (skins.simple = {}));
})(skins || (skins = {}));
//# sourceMappingURL=TextAreaSkin.js.map