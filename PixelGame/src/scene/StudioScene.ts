/**
 *
 * @author wheatup
 * 工作室场景
 * 
 */
class StudioScene extends Scene{
	public constructor(){
		super("skins.scene.StudioSkin");
	}
	
	//初始化UI
	public init():void{
        Timer.addTimer(4000,1,() => {
            Main.removeScene(this);
            Main.addScene(Main.LAYER_GAME, new TestScenario());
        },this);
	}
}
