/**
 *
 * @author
 *
 */
var TestScenario = (function (_super) {
    __extends(TestScenario, _super);
    function TestScenario() {
        _super.call(this, "skins.scenario.TestScenarioSkin");
        this.terrain = new Terrain(this, "73,239 26,392 207,468 363,389 325,294 427,181 590,256 456,389 483,453 759,449 729,152 496,22 205,124 205,354 144,260");
    }
    var __egretProto__ = TestScenario.prototype;
    __egretProto__.start = function () {
        this.drawGrid();
    };
    return TestScenario;
})(Scenario);
TestScenario.prototype.__class__ = "TestScenario";
//# sourceMappingURL=TestScenario.js.map