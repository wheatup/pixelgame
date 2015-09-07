var skins;
(function (skins) {
    var simple;
    (function (simple) {
        var TabBarSkin = (function (_super) {
            __extends(TabBarSkin, _super);
            function TabBarSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["minHeight", "minWidth"], [20, 60]);
                this.elementsContent = [this.dataGroup_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = TabBarSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return TabBarSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.dataGroup_i = function () {
                var t = new egret.gui.DataGroup();
                this.dataGroup = t;
                this.__s(t, ["percentHeight", "itemRenderer", "itemRendererSkinName", "percentWidth"], [100, new egret.gui.ClassFactory(egret.gui.TabBarButton), skins.simple.TabBarButtonSkin, 100]);
                t.layout = this.__3_i();
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [-1, "justify", "contentJustify"]);
                return t;
            };
            TabBarSkin._skinParts = ["dataGroup"];
            return TabBarSkin;
        })(egret.gui.Skin);
        simple.TabBarSkin = TabBarSkin;
        TabBarSkin.prototype.__class__ = "skins.simple.TabBarSkin";
    })(simple = skins.simple || (skins.simple = {}));
})(skins || (skins = {}));
//# sourceMappingURL=TabBarSkin.js.map