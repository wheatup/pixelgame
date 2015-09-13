/**
 *
 * @author wheatup
 * 开场游戏场景
 *
 */
class ScenarioIntro extends Scenario{
    private tick: number = 0;
    
    private grp_touch: egret.gui.Group;
    
	public constructor() {
        super("skins.scenario.ScenarioIntroSkin");
        this.terrain = new Terrain(this, "",0,0);
	}
	
	public init():void{
        (<egret.gui.Group>this.ui["grp_game"]).touchChildren = false;
        this.grp_touch = this.ui["grp_touch"];
        this.bindEvents();
	}
	
    private bindEvents():void{
        this.grp_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        WheatupEvent.bind(EventType.DIALOGUE_END, this.onDialogueEnd, this);
    }
        
    private unbindEvents():void{
        this.grp_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        WheatupEvent.unbind(EventType.DIALOGUE_END, this.onDialogueEnd);
    }
    
    private onDialogueEnd(data: any): void{
        if(data == "intro"){
            Timer.addTimer(1000, 1, () => {
                egret.Tween.get(this.ui["img_car"]).to({ x: 900 }, 4000, egret.Ease.quadIn);
                Timer.addTimer(4000, 1, this.nextScene, this);
            }, this);
        }
    }
    
    public nextScene():void{
        Main.transit(3000);
        Main.removeScene(this);
        Main.addScene(Main.LAYER_GAME, Main.scenarioRoad);
    }
	
	public start(): void{
        //this.drawGrid();
    	  //车震时间点
        this.nextBumpTick = Math.round(Math.random() * 100 + 1);
        
        this.delay(3000);
        
        //隐藏遮罩
        this.addEvent(() => {
            egret.Tween.get(this.ui["img_mask"]).to({ alpha: 0 }, 2000);
        }, this);
        
        this.delay(3000);
        
        //隐藏LOGO
        this.addEvent(() => {egret.Tween.get(this.ui["img_logo"]).to({ alpha: 0 }, 2000);}, this);
        
        this.delay(3000);
        
        //出现对话
        this.addEvent(() => {
            DialogueScene.showDialogue("intro");
        }, this);
	}
	
	
    private nextBumpTick: number = 0;
	public update(): void{
        this.tick++;
        this.cameraPosition.x++;
        this.ui["grp_bg1"].x = Math.round(this.cameraPosition.x / 2) % 800;
        this.ui["grp_bg2"].x = Math.round(this.cameraPosition.x * 8) % 800;
        this.ui["grp_bg3"].x = Math.round(this.cameraPosition.x * 24) % 800;
        
        if(this.tick == this.nextBumpTick){
            this.ui["img_car"].y-=2;
            Timer.addTimer(100, 1, () => { this.ui["img_car"].y+=2; }, this);
            this.nextBumpTick += Math.round(Math.random() * 20 + 10);
        }
	}
	
    private touch(event: egret.TouchEvent):void{
        if(DialogueScene.showing){
            DialogueScene.interupt();
        }
    }
    
    public onRemove(): void{
        this.unbindEvents();
    }
}
