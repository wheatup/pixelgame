var skins;
(function (skins) {
    var simple;
    (function (simple) {
        var CheckBoxSkin = (function (_super) {
            __extends(CheckBoxSkin, _super);
            function CheckBoxSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.elementsContent = [this.__9_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", [
                        new egret.gui.SetProperty("__8", "source", "checkbox_select_over_png")
                    ]),
                    new egret.gui.State("disabled", [
                        new egret.gui.SetProperty("__8", "source", "checkbox_unselect_disabled_png")
                    ]),
                    new egret.gui.State("upAndSelected", [
                        new egret.gui.SetProperty("__8", "source", "checkbox_select_normal_png")
                    ]),
                    new egret.gui.State("downAndSelected", [
                        new egret.gui.SetProperty("__8", "source", "checkbox_unselect_over_png")
                    ]),
                    new egret.gui.State("disabledAndSelected", [
                        new egret.gui.SetProperty("__8", "source", "checkbox_select_disabled_png")
                    ])
                ];
            }
            var __egretProto__ = CheckBoxSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return CheckBoxSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__8 = t;
                this.__s(t, ["fillMode", "height", "source", "verticalCenter", "width"], ["scale", 24, "checkbox_unselect_normal_png", 1, 24]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.layout = this.__7_i();
                t.elementsContent = [this.__8_i(), this.labelDisplay_i()];
                return t;
            };
            __egretProto__.labelDisplay_i = function () {
                var t = new egret.gui.Label();
                this.labelDisplay = t;
                this.__s(t, ["fontFamily", "maxDisplayedLines", "size", "textAlign", "textColor", "verticalAlign"], ["Tahoma", 1, 20, "center", 0x707070, "middle"]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.HorizontalLayout();
                t.verticalAlign = "middle";
                return t;
            };
            CheckBoxSkin._skinParts = ["labelDisplay"];
            return CheckBoxSkin;
        })(egret.gui.Skin);
        simple.CheckBoxSkin = CheckBoxSkin;
        CheckBoxSkin.prototype.__class__ = "skins.simple.CheckBoxSkin";
    })(simple = skins.simple || (skins.simple = {}));
})(skins || (skins = {}));
//# sourceMappingURL=CheckBoxSkin.js.map