var skins;
(function (skins) {
    var scenario;
    (function (scenario) {
        var ScenarioJungleSkin = (function (_super) {
            __extends(ScenarioJungleSkin, _super);
            function ScenarioJungleSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [480, 800]);
                this.elementsContent = [this.grp_game_i(), this.grp_touch_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ScenarioJungleSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ScenarioJungleSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.bg2_1_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg2_1 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "scene3_bg_2", 2400, 0, 0]);
                return t;
            };
            __egretProto__.bg3_1_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg3_1 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "scene3_bg_3", 3200, 0, 0]);
                return t;
            };
            __egretProto__.box_end1_i = function () {
                var t = new egret.gui.UIAsset();
                this.box_end1 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [123, "blank", 50, 0, 321]);
                return t;
            };
            __egretProto__.box_end2_i = function () {
                var t = new egret.gui.UIAsset();
                this.box_end2 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [116, "blank", 74, 2326, 364]);
                return t;
            };
            __egretProto__.box_scene_i = function () {
                var t = new egret.gui.UIAsset();
                this.box_scene = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "blank", 2400, 0, 0]);
                return t;
            };
            __egretProto__.grp_bg1_i = function () {
                var t = new egret.gui.Group();
                this.grp_bg1 = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 1200, 0, 0]);
                t.elementsContent = [this.bg1_1_i()];
                return t;
            };
            __egretProto__.grp_bg2_i = function () {
                var t = new egret.gui.Group();
                this.grp_bg2 = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 2400, 0, 0]);
                t.elementsContent = [this.bg2_1_i()];
                return t;
            };
            __egretProto__.grp_bg3_i = function () {
                var t = new egret.gui.Group();
                this.grp_bg3 = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 3200, 0, 0]);
                t.elementsContent = [this.img_deer_i(), this.bg3_1_i()];
                return t;
            };
            __egretProto__.grp_game_i = function () {
                var t = new egret.gui.Group();
                this.grp_game = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 2400, 0, 0]);
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
                this.__s(t, ["height", "width", "x", "y"], [480, 2400, 0, 0]);
                t.elementsContent = [this.grp_particle_i(), this.trig_deer_i()];
                return t;
            };
            __egretProto__.grp_touch_i = function () {
                var t = new egret.gui.Group();
                this.grp_touch = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 800, 0, 0]);
                t.elementsContent = [this.box_scene_i(), this.box_end1_i(), this.box_end2_i()];
                return t;
            };
            __egretProto__.img_deer_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_deer = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "scene3_deer", 800, 3200, 100]);
                return t;
            };
            __egretProto__.bg1_1_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg1_1 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "scene3_bg_1", 1200, 0, 0]);
                return t;
            };
            __egretProto__.trig_deer_i = function () {
                var t = new egret.gui.UIAsset();
                this.trig_deer = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "blank", 50, 2000, 0]);
                return t;
            };
            ScenarioJungleSkin._skinParts = ["bg1_1", "grp_bg1", "bg2_1", "grp_bg2", "grp_particle", "trig_deer", "grp_playground", "img_deer", "bg3_1", "grp_bg3", "grp_game", "box_scene", "box_end1", "box_end2", "grp_touch"];
            return ScenarioJungleSkin;
        })(egret.gui.Skin);
        scenario.ScenarioJungleSkin = ScenarioJungleSkin;
        ScenarioJungleSkin.prototype.__class__ = "skins.scenario.ScenarioJungleSkin";
    })(scenario = skins.scenario || (skins.scenario = {}));
})(skins || (skins = {}));
//# sourceMappingURL=ScenarioJungleSkin.js.map