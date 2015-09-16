var skins;
(function (skins) {
    var scenario;
    (function (scenario) {
        var ScenarioBushSkin = (function (_super) {
            __extends(ScenarioBushSkin, _super);
            function ScenarioBushSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [480, 800]);
                this.elementsContent = [this.grp_game_i(), this.grp_shade_i(), this.grp_touch_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ScenarioBushSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ScenarioBushSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.bg2_1_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg2_1 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "scene2_bg_2", 880, 0, 0]);
                return t;
            };
            __egretProto__.bg3_1_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg3_1 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "scene2_bg_3", 960, 0, 0]);
                return t;
            };
            __egretProto__.box_end1_i = function () {
                var t = new egret.gui.UIAsset();
                this.box_end1 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [107, "blank", 50, 0, 373]);
                return t;
            };
            __egretProto__.box_end2_i = function () {
                var t = new egret.gui.UIAsset();
                this.box_end2 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [169, "blank", 50, 830, 173]);
                return t;
            };
            __egretProto__.box_scene_i = function () {
                var t = new egret.gui.UIAsset();
                this.box_scene = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "blank", 800, 0, 0]);
                return t;
            };
            __egretProto__.grp_bg1_i = function () {
                var t = new egret.gui.Group();
                this.grp_bg1 = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 1600, 0, 0]);
                t.elementsContent = [this.bg1_i()];
                return t;
            };
            __egretProto__.grp_bg2_i = function () {
                var t = new egret.gui.Group();
                this.grp_bg2 = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 1600, 0, 0]);
                t.elementsContent = [this.bg2_1_i()];
                return t;
            };
            __egretProto__.grp_bg3_i = function () {
                var t = new egret.gui.Group();
                this.grp_bg3 = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 1600, 0, 0]);
                t.elementsContent = [this.bg3_1_i()];
                return t;
            };
            __egretProto__.grp_game_i = function () {
                var t = new egret.gui.Group();
                this.grp_game = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 1600, 0, 0]);
                t.elementsContent = [this.grp_bg1_i(), this.grp_bg2_i(), this.grp_playground_i(), this.grp_bg3_i()];
                return t;
            };
            __egretProto__.grp_particle_i = function () {
                var t = new egret.gui.Group();
                this.grp_particle = t;
                this.__s(t, ["height", "width", "x", "y"], [10, 10, 1160, 250]);
                return t;
            };
            __egretProto__.grp_playground_i = function () {
                var t = new egret.gui.Group();
                this.grp_playground = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 1600, 0, 0]);
                t.elementsContent = [this.grp_particle_i()];
                return t;
            };
            __egretProto__.grp_shade_i = function () {
                var t = new egret.gui.Group();
                this.grp_shade = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 800, 0, 0]);
                t.elementsContent = [this.img_night_i()];
                return t;
            };
            __egretProto__.grp_touch_i = function () {
                var t = new egret.gui.Group();
                this.grp_touch = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 800, 0, 0]);
                t.elementsContent = [this.box_scene_i(), this.box_end1_i(), this.box_end2_i()];
                return t;
            };
            __egretProto__.img_night_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_night = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "nightshade", 800, 0, 0]);
                return t;
            };
            __egretProto__.bg1_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg1 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "scene2_bg_1", 800, 0, 0]);
                return t;
            };
            ScenarioBushSkin._skinParts = ["bg1", "grp_bg1", "bg2_1", "grp_bg2", "grp_particle", "grp_playground", "bg3_1", "grp_bg3", "grp_game", "img_night", "grp_shade", "box_scene", "box_end1", "box_end2", "grp_touch"];
            return ScenarioBushSkin;
        })(egret.gui.Skin);
        scenario.ScenarioBushSkin = ScenarioBushSkin;
        ScenarioBushSkin.prototype.__class__ = "skins.scenario.ScenarioBushSkin";
    })(scenario = skins.scenario || (skins.scenario = {}));
})(skins || (skins = {}));
//# sourceMappingURL=ScenarioBushSkin.js.map