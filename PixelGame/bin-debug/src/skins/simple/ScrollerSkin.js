var skins;
(function (skins) {
    var simple;
    (function (simple) {
        var ScrollerSkin = (function (_super) {
            __extends(ScrollerSkin, _super);
            function ScrollerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["maxWidth", "minHeight", "minWidth"], [710, 230, 370]);
                this.elementsContent = [this.horizontalScrollBar_i(), this.verticalScrollBar_i()];
            }
            var __egretProto__ = ScrollerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ScrollerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.horizontalScrollBar_i = function () {
                var t = new egret.gui.HScrollBar();
                this.horizontalScrollBar = t;
                t.skinName = skins.simple.HScrollBarSkin;
                return t;
            };
            __egretProto__.verticalScrollBar_i = function () {
                var t = new egret.gui.VScrollBar();
                this.verticalScrollBar = t;
                t.skinName = skins.simple.VScrollBarSkin;
                return t;
            };
            ScrollerSkin._skinParts = ["horizontalScrollBar", "verticalScrollBar"];
            return ScrollerSkin;
        })(egret.gui.Skin);
        simple.ScrollerSkin = ScrollerSkin;
        ScrollerSkin.prototype.__class__ = "skins.simple.ScrollerSkin";
    })(simple = skins.simple || (skins.simple = {}));
})(skins || (skins = {}));
//# sourceMappingURL=ScrollerSkin.js.map