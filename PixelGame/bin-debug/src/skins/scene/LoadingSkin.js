var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var LoadingSkin = (function (_super) {
            __extends(LoadingSkin, _super);
            function LoadingSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [480, 800]);
                this.elementsContent = [this.bg_i(), this.bar_i(), this.frame_i(), this.lbl_prog_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = LoadingSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return LoadingSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.bg_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "black", 800, 0, 0]);
                return t;
            };
            __egretProto__.frame_i = function () {
                var t = new egret.gui.UIAsset();
                this.frame = t;
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [40, egret.gui.getScale9Grid("2,2,4,4"), "loading_frame", 400, 200, 220]);
                return t;
            };
            __egretProto__.lbl_prog_i = function () {
                var t = new egret.gui.Label();
                this.lbl_prog = t;
                this.__s(t, ["fontFamily", "height", "size", "text", "textAlign", "verticalAlign", "width", "x", "y"], ["Segoe UI", 40, 24, "0%", "center", "middle", 400, 200, 220]);
                return t;
            };
            __egretProto__.bar_i = function () {
                var t = new egret.gui.UIAsset();
                this.bar = t;
                this.__s(t, ["fillMode", "height", "scale9Grid", "source", "width", "x", "y"], ["repeat", 40, egret.gui.getScale9Grid("1,1,6,6"), "loading_bar", 400, 200, 220]);
                return t;
            };
            LoadingSkin._skinParts = ["bg", "bar", "frame", "lbl_prog"];
            return LoadingSkin;
        })(egret.gui.Skin);
        scene.LoadingSkin = LoadingSkin;
        LoadingSkin.prototype.__class__ = "skins.scene.LoadingSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
