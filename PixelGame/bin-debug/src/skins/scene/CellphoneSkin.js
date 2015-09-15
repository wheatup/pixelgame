var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var CellphoneSkin = (function (_super) {
            __extends(CellphoneSkin, _super);
            function CellphoneSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [480, 800]);
                this.elementsContent = [this.bg0_i(), this.bg_i(), this.grp_lock_i(), this.grp_app_i(), this.grp_msg_i(), this.box_back_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = CellphoneSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return CellphoneSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.bg_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "cellphone_main", 800, 0, 0]);
                return t;
            };
            __egretProto__.box_back_i = function () {
                var t = new egret.gui.UIAsset();
                this.box_back = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [118, "blank", 118, 658, 178]);
                return t;
            };
            __egretProto__.box_input_i = function () {
                var t = new egret.gui.UIAsset();
                this.box_input = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [69, "blank", 363, 148, 339]);
                return t;
            };
            __egretProto__.box_send_i = function () {
                var t = new egret.gui.UIAsset();
                this.box_send = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [69, "blank", 103, 532, 339]);
                return t;
            };
            __egretProto__.grp_app_i = function () {
                var t = new egret.gui.Group();
                this.grp_app = t;
                this.__s(t, ["height", "visible", "width", "x", "y"], [480, false, 800, 0, 0]);
                t.elementsContent = [this.img_lockbg0_i(), this.img_bar0_i(), this.img_slider1_i(), this.lbl_Time1_i()];
                return t;
            };
            __egretProto__.grp_entries_i = function () {
                var t = new egret.gui.Group();
                this.grp_entries = t;
                this.__s(t, ["height", "width", "x", "y"], [203, 503, 0, 0]);
                t.elementsContent = [this.img_msg_bg_i()];
                return t;
            };
            __egretProto__.grp_lock_i = function () {
                var t = new egret.gui.Group();
                this.grp_lock = t;
                this.__s(t, ["height", "visible", "width", "x", "y"], [480, false, 800, 0, 0]);
                t.elementsContent = [this.img_lockbg_i(), this.img_bar_i(), this.img_slider_i(), this.lbl_Time_i()];
                return t;
            };
            __egretProto__.grp_msg_i = function () {
                var t = new egret.gui.Group();
                this.grp_msg = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 800, 0, 0]);
                t.elementsContent = [this.img_msgbg_i(), this.img_flash_i(), this.lbl_name_i(), this.lbl_input_i(), this.grp_entries_i(), this.box_input_i(), this.box_send_i()];
                return t;
            };
            __egretProto__.img_bar0_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_bar0 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [84, "cellphone_lock_bar", 388, 206, 320]);
                return t;
            };
            __egretProto__.img_bar_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_bar = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [84, "cellphone_lock_bar", 388, 206, 320]);
                return t;
            };
            __egretProto__.img_flash_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_flash = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [68, "cellphone_msg_flash", 364, 148, 340]);
                return t;
            };
            __egretProto__.img_lockbg0_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_lockbg0 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "cellphone_panel_lock", 800, 0, 0]);
                return t;
            };
            __egretProto__.img_lockbg_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_lockbg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "cellphone_panel_lock", 800, 0, 0]);
                return t;
            };
            __egretProto__.img_msg_bg_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_msg_bg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [203, "blank", 503, 0, 0]);
                return t;
            };
            __egretProto__.img_msgbg_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_msgbg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "cellphone_panel_msg", 800, 0, 0]);
                return t;
            };
            __egretProto__.img_slider1_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_slider1 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [60, "cellphone_lock_slider", 76, 218, 332]);
                return t;
            };
            __egretProto__.img_slider_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_slider = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [60, "cellphone_lock_slider", 76, 218, 332]);
                return t;
            };
            __egretProto__.lbl_Time1_i = function () {
                var t = new egret.gui.Label();
                this.lbl_Time1 = t;
                this.__s(t, ["bold", "size", "text", "textAlign", "width", "x", "y"], [true, 48, "12:34", "center", 362, 219, 101]);
                return t;
            };
            __egretProto__.lbl_Time_i = function () {
                var t = new egret.gui.Label();
                this.lbl_Time = t;
                this.__s(t, ["bold", "size", "text", "textAlign", "width", "x", "y"], [true, 48, "12:34", "center", 362, 219, 101]);
                return t;
            };
            __egretProto__.lbl_input_i = function () {
                var t = new egret.gui.Label();
                this.lbl_input = t;
                this.__s(t, ["bold", "height", "size", "textAlign", "textColor", "verticalAlign", "width", "x", "y"], [true, 52, 24, "left", 0x383838, "middle", 349, 155, 347]);
                return t;
            };
            __egretProto__.lbl_name_i = function () {
                var t = new egret.gui.Label();
                this.lbl_name = t;
                this.__s(t, ["bold", "size", "text", "textAlign", "textColor", "verticalAlign", "width", "x", "y"], [true, 24, "标签", "center", 0x383838, "middle", 494, 145, 76]);
                return t;
            };
            __egretProto__.bg0_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg0 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "black", 800, 0, 0]);
                return t;
            };
            CellphoneSkin._skinParts = ["bg0", "bg", "img_lockbg", "img_bar", "img_slider", "lbl_Time", "grp_lock", "img_lockbg0", "img_bar0", "img_slider1", "lbl_Time1", "grp_app", "img_msgbg", "img_flash", "lbl_name", "lbl_input", "img_msg_bg", "grp_entries", "box_input", "box_send", "grp_msg", "box_back"];
            return CellphoneSkin;
        })(egret.gui.Skin);
        scene.CellphoneSkin = CellphoneSkin;
        CellphoneSkin.prototype.__class__ = "skins.scene.CellphoneSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
//# sourceMappingURL=CellphoneSkin.js.map