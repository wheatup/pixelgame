var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var WarningSkin = (function (_super) {
            __extends(WarningSkin, _super);
            function WarningSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [480, 800]);
                this.elementsContent = [this.bg_i(), this.grp_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = WarningSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return WarningSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.grp_i = function () {
                var t = new egret.gui.Group();
                this.grp = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 800, 0, 0]);
                t.elementsContent = [this.lbl_title_cn1_i(), this.lbl_title_en1_i(), this.lbl_title_en2_i(), this.lbl_title_cn2_i(), this.lbl_title_en4_i(), this.lbl_title_cn4_i(), this.lbl_title_en3_i(), this.lbl_title_cn3_i(), this.img_loading_i()];
                return t;
            };
            __egretProto__.img_loading_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_loading = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [32, "ui_loading", 32, 408, 364]);
                return t;
            };
            __egretProto__.lbl_title_cn1_i = function () {
                var t = new egret.gui.Label();
                this.lbl_title_cn1 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "width", "x", "y"], [true, "微软雅黑", 30, "警告", "center", 0xFF3838, "middle", 400, 200, 80]);
                return t;
            };
            __egretProto__.lbl_title_cn2_i = function () {
                var t = new egret.gui.Label();
                this.lbl_title_cn2 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "width", "x", "y"], [true, "微软雅黑", 20, "本游戏可能包含血腥、恐怖要素", "center", 0xFFFFFF, "middle", 698, 51, 158]);
                return t;
            };
            __egretProto__.lbl_title_cn3_i = function () {
                var t = new egret.gui.Label();
                this.lbl_title_cn3 = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "textColor", "verticalAlign", "width", "y"], [true, "微软雅黑", 0, 16, "本游戏采用自动存档机制，当出现         符号时请勿关闭您的浏览器", "center", 0xFFFFFF, "top", 698, 370]);
                return t;
            };
            __egretProto__.lbl_title_cn4_i = function () {
                var t = new egret.gui.Label();
                this.lbl_title_cn4 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "width", "x", "y"], [true, "微软雅黑", 18, "安卓系统对web声音支持较差，为了更好的体验，请尽可能使用iOS或者桌面浏览器", "center", 0xFFFFFF, "middle", 698, 51, 268]);
                return t;
            };
            __egretProto__.lbl_title_en1_i = function () {
                var t = new egret.gui.Label();
                this.lbl_title_en1 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "width", "x", "y"], [true, "微软雅黑", 24, "WARNING", "center", 0xFF3838, "middle", 400, 200, 119]);
                return t;
            };
            __egretProto__.lbl_title_en2_i = function () {
                var t = new egret.gui.Label();
                this.lbl_title_en2 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "width", "x", "y"], [true, "微软雅黑", 18, "Some parts of this game are disturbing or cruel.\nMay contains violent situations and jump scares.", "center", 0xFFFFFF, "middle", 698, 51, 190]);
                return t;
            };
            __egretProto__.lbl_title_en3_i = function () {
                var t = new egret.gui.Label();
                this.lbl_title_en3 = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "textColor", "verticalAlign", "width", "y"], [true, "微软雅黑", 0, 14, "This game will save automatically. Do NOT close your browser when the simbol above appears.", "center", 0xFFFFFF, "top", 698, 396]);
                return t;
            };
            __egretProto__.lbl_title_en4_i = function () {
                var t = new egret.gui.Label();
                this.lbl_title_en4 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "width", "x", "y"], [true, "微软雅黑", 16, "Android OS has a poor web audio support.\nfor better experience, please use iOS or PC browser.", "center", 0xFFFFFF, "middle", 698, 51, 300]);
                return t;
            };
            __egretProto__.bg_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "black", 800, 0, 0]);
                return t;
            };
            WarningSkin._skinParts = ["bg", "lbl_title_cn1", "lbl_title_en1", "lbl_title_en2", "lbl_title_cn2", "lbl_title_en4", "lbl_title_cn4", "lbl_title_en3", "lbl_title_cn3", "img_loading", "grp"];
            return WarningSkin;
        })(egret.gui.Skin);
        scene.WarningSkin = WarningSkin;
        WarningSkin.prototype.__class__ = "skins.scene.WarningSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
