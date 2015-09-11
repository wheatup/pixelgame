var skins;
(function (skins) {
    var scenario;
    (function (scenario) {
        var TestScenarioSkin = (function (_super) {
            __extends(TestScenarioSkin, _super);
            function TestScenarioSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [480, 800]);
                this.elementsContent = [this.bg_i(), this.grp_world_i(), this.lbl_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = TestScenarioSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return TestScenarioSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.grp_world_i = function () {
                var t = new egret.gui.Group();
                this.grp_world = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 800, 0, 0]);
                return t;
            };
            __egretProto__.lbl_i = function () {
                var t = new egret.gui.Label();
                this.lbl = t;
                this.__s(t, ["text", "x", "y"], ["Test Scenario", 306, 46]);
                return t;
            };
            __egretProto__.bg_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [480, "black", 800, 0, 0]);
                return t;
            };
            TestScenarioSkin._skinParts = ["bg", "grp_world", "lbl"];
            return TestScenarioSkin;
        })(egret.gui.Skin);
        scenario.TestScenarioSkin = TestScenarioSkin;
        TestScenarioSkin.prototype.__class__ = "skins.scenario.TestScenarioSkin";
    })(scenario = skins.scenario || (skins.scenario = {}));
})(skins || (skins = {}));
//# sourceMappingURL=TestScenarioSkin.js.map