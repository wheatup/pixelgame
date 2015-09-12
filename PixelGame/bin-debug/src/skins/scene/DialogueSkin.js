var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var DialogueSkin = (function (_super) {
            __extends(DialogueSkin, _super);
            function DialogueSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [480, 800]);
                this.elementsContent = [this.grp_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = DialogueSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return DialogueSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.img_name_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_name = t;
                this.__s(t, ["fillMode", "height", "scale9Grid", "source", "width", "x", "y"], ["scale", 62, egret.gui.getScale9Grid("12,12,56,56"), "dialogue_box", 171, 0, -2]);
                return t;
            };
            __egretProto__.img_text_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_text = t;
                this.__s(t, ["fillMode", "height", "scale9Grid", "source", "width", "x", "y"], ["scale", 140, egret.gui.getScale9Grid("12,12,56,56"), "dialogue_box", 800, 0, 60]);
                return t;
            };
            __egretProto__.lbl_arrow_i = function () {
                var t = new egret.gui.UIAsset();
                this.lbl_arrow = t;
                this.__s(t, ["fillMode", "height", "source", "width", "x", "y"], ["scale", 16, "ui_arrow_down", 24, 388, 164]);
                return t;
            };
            __egretProto__.lbl_name_i = function () {
                var t = new egret.gui.Label();
                this.lbl_name = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "width", "x", "y"], [true, "Arial", 24, "姓名", "center", 0x242424, "bottom", 142, 14, 16]);
                return t;
            };
            __egretProto__.lbl_text_i = function () {
                var t = new egret.gui.Label();
                this.lbl_text = t;
                this.__s(t, ["bold", "fontFamily", "height", "size", "text", "textAlign", "textColor", "verticalAlign", "width", "x", "y"], [true, "font_pixel", 103, 24, "对话对话对话对话对话对话对话对话对话对话对话对话对话对话对话对话对话对话对话对话对话对话对话对话对话对话对话对话对话对话对话对话", "left", 0x242424, "top", 764, 20, 77]);
                return t;
            };
            __egretProto__.grp_i = function () {
                var t = new egret.gui.Group();
                this.grp = t;
                this.__s(t, ["height", "visible", "width", "x", "y"], [200, false, 800, 0, 280]);
                t.elementsContent = [this.img_text_i(), this.img_name_i(), this.lbl_arrow_i(), this.lbl_name_i(), this.lbl_text_i()];
                return t;
            };
            DialogueSkin._skinParts = ["img_text", "img_name", "lbl_arrow", "lbl_name", "lbl_text", "grp"];
            return DialogueSkin;
        })(egret.gui.Skin);
        scene.DialogueSkin = DialogueSkin;
        DialogueSkin.prototype.__class__ = "skins.scene.DialogueSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
//# sourceMappingURL=DialogueSkin.js.map