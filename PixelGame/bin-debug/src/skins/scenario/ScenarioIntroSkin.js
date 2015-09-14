var skins;
(function (skins) {
    var scenario;
    (function (scenario) {
        var ScenarioIntroSkin = (function (_super) {
            __extends(ScenarioIntroSkin, _super);
            function ScenarioIntroSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [480, 800]);
                this.elementsContent = [this.grp_game_i(), this.grp_touch_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ScenarioIntroSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ScenarioIntroSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.bg1_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg1 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "scene1_bg_1", 800, 0, 0]);
                return t;
            };
            __egretProto__.bg2_1_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg2_1 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "scene1_bg_2", 800, -800, 0]);
                return t;
            };
            __egretProto__.bg2_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg2 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "scene1_bg_2", 800, 0, 0]);
                return t;
            };
            __egretProto__.bg3_1_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg3_1 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "scene1_bg_3", 800, -800, 0]);
                return t;
            };
            __egretProto__.bg3_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg3 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "scene1_bg_3", 800, 0, 0]);
                return t;
            };
            __egretProto__.grp_bg1_i = function () {
                var t = new egret.gui.Group();
                this.grp_bg1 = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 800, 0, 0]);
                t.elementsContent = [this.bg1_i(), this.bg1_1_i()];
                return t;
            };
            __egretProto__.grp_bg2_i = function () {
                var t = new egret.gui.Group();
                this.grp_bg2 = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 800, 0, 0]);
                t.elementsContent = [this.bg2_i(), this.bg2_1_i()];
                return t;
            };
            __egretProto__.grp_bg3_i = function () {
                var t = new egret.gui.Group();
                this.grp_bg3 = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 800, 0, 0]);
                t.elementsContent = [this.bg3_i(), this.bg3_1_i()];
                return t;
            };
            __egretProto__.grp_game_i = function () {
                var t = new egret.gui.Group();
                this.grp_game = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 800, 0, 0]);
                t.elementsContent = [this.grp_bg1_i(), this.grp_bg2_i(), this.grp_playground_i(), this.grp_bg3_i(), this.img_mask_i(), this.img_logo_i()];
                return t;
            };
            __egretProto__.grp_particle_i = function () {
                var t = new egret.gui.Group();
                this.grp_particle = t;
                this.__s(t, ["height", "width", "x", "y"], [20, 20, 460, 320]);
                return t;
            };
            __egretProto__.grp_playground_i = function () {
                var t = new egret.gui.Group();
                this.grp_playground = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 800, 0, 0]);
                t.elementsContent = [this.img_car_i(), this.grp_particle_i()];
                return t;
            };
            __egretProto__.grp_touch_i = function () {
                var t = new egret.gui.Group();
                this.grp_touch = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 800, 0, 0]);
                t.elementsContent = [this.img_play_i()];
                return t;
            };
            __egretProto__.img_car_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_car = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [160, "game_car", 320, 300, 200]);
                return t;
            };
            __egretProto__.img_logo_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_logo = t;
                this.__s(t, ["height", "horizontalCenter", "source", "verticalCenter", "width", "x", "y"], [240, 0, "shroomgames", 0, 580, 20, 20]);
                return t;
            };
            __egretProto__.img_mask_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_mask = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "black", 800, 0, 0]);
                return t;
            };
            __egretProto__.img_play_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_play = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "blank", 800, 0, 0]);
                return t;
            };
            __egretProto__.bg1_1_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg1_1 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "scene1_bg_1", 800, -800, 0]);
                return t;
            };
            ScenarioIntroSkin._skinParts = ["bg1", "bg1_1", "grp_bg1", "bg2", "bg2_1", "grp_bg2", "img_car", "grp_particle", "grp_playground", "bg3", "bg3_1", "grp_bg3", "img_mask", "img_logo", "grp_game", "img_play", "grp_touch"];
            return ScenarioIntroSkin;
        })(egret.gui.Skin);
        scenario.ScenarioIntroSkin = ScenarioIntroSkin;
        ScenarioIntroSkin.prototype.__class__ = "skins.scenario.ScenarioIntroSkin";
    })(scenario = skins.scenario || (skins.scenario = {}));
})(skins || (skins = {}));
//# sourceMappingURL=ScenarioIntroSkin.js.map