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
        Timer.addTimer(2000,1,() => {
            Main.addScene(Main.LAYER_GAME, new ScenarioIntro());
            Timer.addTimer(2000,1,() => {
                Main.removeScene(this);
            },this);
        },this);
        
        
	}
}
