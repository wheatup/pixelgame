var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var BookSkin = (function (_super) {
            __extends(BookSkin, _super);
            function BookSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [480, 800]);
                this.elementsContent = [this.bg_i(), this.lbl_text2_i(), this.lbl_text1_i(), this.img_light_i(), this.box_back_i(), this.img_prev_i(), this.img_next_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = BookSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return BookSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.box_back_i = function () {
                var t = new egret.gui.UIAsset();
                this.box_back = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [100, "back", 72, 364, 370]);
                return t;
            };
            __egretProto__.img_light_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_light = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [400, "scene_5_candlelight", 400, -200, -200]);
                return t;
            };
            __egretProto__.img_next_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_next = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [68, "scene5_book_arrow", 40, 704, 370]);
                return t;
            };
            __egretProto__.img_prev_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_prev = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [68, "scene5_book_arrow", 40, 44, 370]);
                return t;
            };
            __egretProto__.lbl_text1_i = function () {
                var t = new egret.gui.Label();
                this.lbl_text1 = t;
                this.__s(t, ["size", "text", "textAlign", "textColor", "width", "x", "y"], [24, "标签", "left", 0x000000, 280, 112, 57]);
                return t;
            };
            __egretProto__.lbl_text2_i = function () {
                var t = new egret.gui.Label();
                this.lbl_text2 = t;
                this.__s(t, ["size", "text", "textAlign", "textColor", "width", "x", "y"], [24, "标签", "left", 0x000000, 280, 452, 57]);
                return t;
            };
            __egretProto__.bg_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "scene5_book", 800, 0, 0]);
                return t;
            };
            BookSkin._skinParts = ["bg", "lbl_text2", "lbl_text1", "img_light", "box_back", "img_prev", "img_next"];
            return BookSkin;
        })(egret.gui.Skin);
        scene.BookSkin = BookSkin;
        BookSkin.prototype.__class__ = "skins.scene.BookSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
//# sourceMappingURL=BookSkin.js.map