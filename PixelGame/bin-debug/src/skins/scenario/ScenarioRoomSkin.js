var skins;
(function (skins) {
    var scenario;
    (function (scenario) {
        var ScenarioRoomSkin = (function (_super) {
            __extends(ScenarioRoomSkin, _super);
            function ScenarioRoomSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [480, 800]);
                this.elementsContent = [this.grp_game_i(), this.grp_touch_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ScenarioRoomSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ScenarioRoomSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.box_closet_i = function () {
                var t = new egret.gui.UIAsset();
                this.box_closet = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [300, "blank", 218, 370, 38]);
                return t;
            };
            __egretProto__.box_door_i = function () {
                var t = new egret.gui.UIAsset();
                this.box_door = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [341, "blank", 74, 0, 96]);
                return t;
            };
            __egretProto__.box_scene_i = function () {
                var t = new egret.gui.UIAsset();
                this.box_scene = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "blank", 800, 0, 0]);
                return t;
            };
            __egretProto__.box_trapdoor_i = function () {
                var t = new egret.gui.UIAsset();
                this.box_trapdoor = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [104, "blank", 148, 609, 294]);
                return t;
            };
            __egretProto__.grp_bg1_i = function () {
                var t = new egret.gui.Group();
                this.grp_bg1 = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 800, 0, 0]);
                t.elementsContent = [this.img_bg_i(), this.grp_particle_i(), this.img_candlelight_i()];
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
                this.__s(t, ["height", "width", "x", "y"], [10, 10, 220, 180]);
                return t;
            };
            __egretProto__.grp_playground_i = function () {
                var t = new egret.gui.Group();
                this.grp_playground = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 2400, 0, 0]);
                return t;
            };
            __egretProto__.grp_touch_i = function () {
                var t = new egret.gui.Group();
                this.grp_touch = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 800, 0, 0]);
                t.elementsContent = [this.box_scene_i(), this.box_door_i(), this.box_closet_i(), this.box_trapdoor_i(), this.box_book_i()];
                return t;
            };
            __egretProto__.img_bg_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_bg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "scene5", 800, 0, 0]);
                return t;
            };
            __egretProto__.img_candlelight_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_candlelight = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [400, "scene_5_candlelight", 400, 10, -20]);
                return t;
            };
            __egretProto__.box_book_i = function () {
                var t = new egret.gui.UIAsset();
                this.box_book = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [31, "blank", 75, 239, 218]);
                return t;
            };
            ScenarioRoomSkin._skinParts = ["img_bg", "grp_particle", "img_candlelight", "grp_bg1", "grp_playground", "grp_game", "box_scene", "box_door", "box_closet", "box_trapdoor", "box_book", "grp_touch"];
            return ScenarioRoomSkin;
        })(egret.gui.Skin);
        scenario.ScenarioRoomSkin = ScenarioRoomSkin;
        ScenarioRoomSkin.prototype.__class__ = "skins.scenario.ScenarioRoomSkin";
    })(scenario = skins.scenario || (skins.scenario = {}));
})(skins || (skins = {}));
//# sourceMappingURL=ScenarioRoomSkin.js.map