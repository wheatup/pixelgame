var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var ShowcaseSkin = (function (_super) {
            __extends(ShowcaseSkin, _super);
            function ShowcaseSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [800, 480]);
                this.elementsContent = [this.btnShowMessage_i(), this.list_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ShowcaseSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ShowcaseSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.list_i = function () {
                var t = new egret.gui.List();
                this.list = t;
                this.__s(t, ["horizontalCenter", "itemRendererSkinName", "skinName", "y"], [0, skins.simple.ItemRendererSkin, skins.simple.ListSkin, 150]);
                return t;
            };
            __egretProto__.btnShowMessage_i = function () {
                var t = new egret.gui.Button();
                this.btnShowMessage = t;
                this.__s(t, ["horizontalCenter", "label", "y"], [0, "click", 50]);
                return t;
            };
            ShowcaseSkin._skinParts = ["btnShowMessage", "list"];
            return ShowcaseSkin;
        })(egret.gui.Skin);
        scene.ShowcaseSkin = ShowcaseSkin;
        ShowcaseSkin.prototype.__class__ = "skins.scene.ShowcaseSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
//# sourceMappingURL=ShowcaseSkin.js.map