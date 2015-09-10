/**
 *
 * @author wheatup
 * 测试游戏场景
 *
 */
class TestScenario extends Scenario{
	public constructor() {
        super("skins.scenario.TestScenarioSkin");
        this.terrain = new Terrain(this, "73,239 26,392 207,468 363,389 325,294 427,181 590,256 456,389 483,453 759,449 729,152 496,22 205,124 205,354 144,260");
	}
	
	public start(): void{
        this.drawGrid();
	}
}
