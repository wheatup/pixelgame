/**
 *
 * @author wheatup
 * 第一幕游戏场景
 * 道路
 *
 */
class ScenarioRoad extends Scenario{
    private tick: number = 0;
    
    private grp_touch: egret.gui.Group;
    
	public constructor() {
        super("skins.scenario.ScenarioRoadSkin");
        this.terrain = new Terrain(this, "0,230 0,436 800,436 800,230", ["298,272 298,332 618,332 618,272"]);
	}
	
	public init():void{
        (<egret.gui.Group>this.ui["grp_game"]).touchChildren = false;
        this.grp_touch = this.ui["grp_touch"];
        this.bindEvents();
        this.floatGroup = this.ui["grp_playground"];
        this.ui["img_car"].anchorX = 0.5;
        this.ui["img_car"].anchorY = 0.8;
        this.ui["img_car"].x += this.ui["img_car"].width * this.ui["img_car"].anchorX;
        this.ui["img_car"].y += this.ui["img_car"].height * this.ui["img_car"].anchorY;
        this.floaters.push(this.ui["img_car"]);
	}
	
    private bindEvents():void{
        this.grp_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        //WheatupEvent.bind(EventType.DIALOGUE_END, this.onDialogueEnd, this);
    }
        
    private unbindEvents():void{
        this.grp_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        //WheatupEvent.unbind(EventType.DIALOGUE_END, this.onDialogueEnd);
    }
	
	public start(): void{
        this.createPlayer(400, 400, this.ui["grp_playground"]);
	}
	
	
    private touch(event: egret.TouchEvent):void{
        if(DialogueScene.showing){
            DialogueScene.interupt();
        }else{
            var x = event.stageX;
            var y = event.stageY;
            
            if(this.terrain.isInPolygon(x, y)){
                this.player.onGridClick(x, y);
            }else{
                
            }
        }
    }
    
    public onRemove(): void{
        this.unbindEvents();
    }
}
