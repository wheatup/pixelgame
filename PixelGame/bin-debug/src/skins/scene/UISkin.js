var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var UISkin = (function (_super) {
            __extends(UISkin, _super);
            function UISkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [480, 800]);
                this.elementsContent = [this.grp_i(), this.grp_choice_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = UISkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return UISkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.grp_i = function () {
                var t = new egret.gui.Group();
                this.grp = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 800, 0, 0]);
                t.elementsContent = [this.img_message_i()];
                return t;
            };
            __egretProto__.img_choice_bg0_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_choice_bg0 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "blank", 800, 0, 0]);
                return t;
            };
            __egretProto__.img_choice_bg_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_choice_bg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [160, "black", 800, 0, 160]);
                return t;
            };
            __egretProto__.img_message_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_message = t;
                this.__s(t, ["height", "source", "visible", "width", "x", "y"], [96, "cellphone_new_0", false, 96, 704, 0]);
                return t;
            };
            __egretProto__.lbl_choice1_i = function () {
                var t = new egret.gui.Label();
                this.lbl_choice1 = t;
                this.__s(t, ["bold", "size", "text", "textAlign", "width", "x", "y"], [true, 24, "标签", "center", 400, 0, 260]);
                return t;
            };
            __egretProto__.lbl_choice2_i = function () {
                var t = new egret.gui.Label();
                this.lbl_choice2 = t;
                this.__s(t, ["bold", "size", "text", "textAlign", "width", "x", "y"], [true, 24, "标签", "center", 400, 400, 260]);
                return t;
            };
            __egretProto__.lbl_question_i = function () {
                var t = new egret.gui.Label();
                this.lbl_question = t;
                this.__s(t, ["bold", "size", "text", "textAlign", "width", "x", "y"], [true, 36, "标签", "center", 800, 0, 190]);
                return t;
            };
            __egretProto__.grp_choice_i = function () {
                var t = new egret.gui.Group();
                this.grp_choice = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 800, 0, 0]);
                t.elementsContent = [this.img_choice_bg0_i(), this.img_choice_bg_i(), this.lbl_question_i(), this.lbl_choice1_i(), this.lbl_choice2_i()];
                return t;
            };
            UISkin._skinParts = ["img_message", "grp", "img_choice_bg0", "img_choice_bg", "lbl_question", "lbl_choice1", "lbl_choice2", "grp_choice"];
            return UISkin;
        })(egret.gui.Skin);
        scene.UISkin = UISkin;
        UISkin.prototype.__class__ = "skins.scene.UISkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
//# sourceMappingURL=UISkin.js.map