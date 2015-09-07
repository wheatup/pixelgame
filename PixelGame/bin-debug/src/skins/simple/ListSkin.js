var skins;
(function (skins) {
    var simple;
    (function (simple) {
        var ListSkin = (function (_super) {
            __extends(ListSkin, _super);
            function ListSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ListSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ListSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Scroller();
                this.__s(t, ["percentHeight", "horizontalScrollPolicy", "percentWidth"], [100, "off", 100]);
                t.viewport = this.dataGroup_i();
                return t;
            };
            __egretProto__.dataGroup_i = function () {
                var t = new egret.gui.DataGroup();
                this.dataGroup = t;
                t.layout = this.__3_i();
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [0, "contentJustify"]);
                return t;
            };
            ListSkin._skinParts = ["dataGroup"];
            return ListSkin;
        })(egret.gui.Skin);
        simple.ListSkin = ListSkin;
        ListSkin.prototype.__class__ = "skins.simple.ListSkin";
    })(simple = skins.simple || (skins.simple = {}));
})(skins || (skins = {}));
//# sourceMappingURL=ListSkin.js.map