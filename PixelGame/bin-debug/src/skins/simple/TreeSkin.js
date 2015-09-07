var skins;
(function (skins) {
    var simple;
    (function (simple) {
        var TreeSkin = (function (_super) {
            __extends(TreeSkin, _super);
            function TreeSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = TreeSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return TreeSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Scroller();
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.viewport = this.dataGroup_i();
                return t;
            };
            __egretProto__.dataGroup_i = function () {
                var t = new egret.gui.DataGroup();
                this.dataGroup = t;
                t.itemRendererSkinName = skins.simple.TreeItemRendererSkin;
                t.layout = this.__3_i();
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [2, "justify"]);
                return t;
            };
            TreeSkin._skinParts = ["dataGroup"];
            return TreeSkin;
        })(egret.gui.Skin);
        simple.TreeSkin = TreeSkin;
        TreeSkin.prototype.__class__ = "skins.simple.TreeSkin";
    })(simple = skins.simple || (skins.simple = {}));
})(skins || (skins = {}));
//# sourceMappingURL=TreeSkin.js.map