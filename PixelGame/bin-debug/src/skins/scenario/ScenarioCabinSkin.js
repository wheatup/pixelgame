var skins;
(function (skins) {
    var scenario;
    (function (scenario) {
        var ScenarioCabinSkin = (function (_super) {
            __extends(ScenarioCabinSkin, _super);
            function ScenarioCabinSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [480, 800]);
                this.elementsContent = [this.grp_game_i(), this.grp_touch_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ScenarioCabinSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ScenarioCabinSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.box_door_i = function () {
                var t = new egret.gui.UIAsset();
                this.box_door = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [92, "blank", 32, 1793, 246]);
                return t;
            };
            __egretProto__.box_end_i = function () {
                var t = new egret.gui.UIAsset();
                this.box_end = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [80, "blank", 38, 0, 155]);
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
                this.__s(t, ["height", "width", "x", "y"], [480, 2400, 0, 0]);
                t.elementsContent = [this.bg1_1_i()];
                return t;
            };
            __egretProto__.grp_game_i = function () {
                var t = new egret.gui.Group();
                this.grp_game = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 2400, 0, 0]);
                t.elementsContent = [this.grp_bg1_i(), this.grp_playground_i()];
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
                t.elementsContent = [this.grp_particle_i()];
                return t;
            };
            __egretProto__.grp_touch_i = function () {
                var t = new egret.gui.Group();
                this.grp_touch = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 2400, 0, 0]);
                t.elementsContent = [this.box_scene_i(), this.box_end_i(), this.box_door_i()];
                return t;
            };
            __egretProto__.bg1_1_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg1_1 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "scene4", 2400, 0, 0]);
                return t;
            };
            ScenarioCabinSkin._skinParts = ["bg1_1", "grp_bg1", "grp_particle", "grp_playground", "grp_game", "box_scene", "box_end", "box_door", "grp_touch"];
            return ScenarioCabinSkin;
        })(egret.gui.Skin);
        scenario.ScenarioCabinSkin = ScenarioCabinSkin;
        ScenarioCabinSkin.prototype.__class__ = "skins.scenario.ScenarioCabinSkin";
    })(scenario = skins.scenario || (skins.scenario = {}));
})(skins || (skins = {}));
//# sourceMappingURL=ScenarioCabinSkin.js.map