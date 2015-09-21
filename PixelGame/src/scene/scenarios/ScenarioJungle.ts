/**
 *
 * @author wheatup
 * 第三幕游戏场景
 * 丛林
 *
 */
class ScenarioJungle extends Scenario{
    private grp_game: egret.gui.Group;
    private grp_touch: egret.gui.Group;
    private grp_particle: egret.gui.Group;
    
    private box_scene: egret.gui.UIAsset;
    private box_end1: egret.gui.UIAsset;
    private box_end2: egret.gui.UIAsset;
    private trig_deer: egret.gui.UIAsset;
    private img_deer: egret.gui.UIAsset;
    
    private forEnd1: boolean = false;
    private forEnd2: boolean = false;
    
	public constructor() {
        super("skins.scenario.ScenarioJungleSkin");
        this.terrain = new Terrain(this,"0,358 0,482 1288,484 1654,292 2141,356 2342,485 2394,485 2366,398 2261,316 2231,250 2113,244 2102,257 2078,254 2058,233 2032,238 2015,214 2001,216 1989,205 1953,245 1870,243 1856,258 1789,247 1750,236 1674,262 1616,227 1568,248 1426,280 1289,397 1121,430 820,439 710,347 641,377 498,368 377,322 365,293 317,320 257,316 233,301 192,315 125,353",2400
            ,480);
        
        //设置摄影机
        this.cameraLimit.width = 1600;
        this.cameraPosition.x = 0;
	}
	
	public init():void{
        this.grp_game = this.ui["grp_game"];
        this.grp_game.touchChildren = false;
        this.grp_touch = this.ui["grp_touch"];
        this.floatGroup = this.ui["grp_playground"];
        this.trig_deer = this.ui["trig_deer"];
        this.img_deer = this.ui["img_deer"];
        
        //初始化判定区域
        this.box_scene = this.ui["box_scene"];
        this.box_end1 = this.ui["box_end1"];
        this.box_end2 = this.ui["box_end2"];
        
        //创建玩家
        this.createPlayer(16, 376, this.ui["grp_playground"]);
        this.player.setBrightness(0.2);
	}
	
	
	private clearForFlag():void{
        this.forEnd1 = false;
        this.forEnd2 = false;
	}
	
    private bindEvents():void{
        this.box_scene.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchScene, this);
        this.box_end1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEnd1, this);
        this.box_end2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEnd2, this);
        WheatupEvent.bind(EventType.DIALOGUE_END, this.onDialogueEnd, this);
        WheatupEvent.bind(EventType.ARRIVE, this.onArrive, this);
    }
        
    private unbindEvents():void{
        this.box_scene.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchScene, this);
        this.box_end1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEnd1, this);
        this.box_end2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEnd2, this);
        WheatupEvent.unbind(EventType.DIALOGUE_END, this.onDialogueEnd);
        WheatupEvent.unbind(EventType.ARRIVE, this.onArrive);
    }
	
	public start(): void{
        Data.setFlag(Flag.HasArrivedJungle);
        Main.free = true;
        this.bindEvents();
        this.delay(2000);
        
//        this.addEvent(() => {
//            DialogueScene.showDialogue("scene1");
//        }, this);
	}
	
    private lastY: number;
	public update():void{
        this.calcCamera();
        this.detectDeer();
	}
	
    private touchedDeer: boolean = false;
	private detectDeer():void{
	    if(!this.touchedDeer){
            if(this.player.isInside(this.trig_deer)){
                this.touchedDeer = true;
                this.deerJump();
            }
	    }
	}
	
	private deerJump():void{
        egret.Tween.get(this.img_deer).to({x:this.img_deer.x - 1600}, 500);
        egret.Tween.get(this.img_deer).to({ y: this.img_deer.y - 100 },500,egret.Ease.quadIn);
        Timer.addTimer(500,1,() => { this.img_deer.visible = false; },this);
	}
	
	private calcCamera():void{
        var targetX: number = Util.clip(this.player.getX() - 400, 0, this.cameraLimit.width);
        var targetY: number = Util.clip(this.player.getY() - 240, 0, this.cameraLimit.height);
    	  
        this.cameraPosition.x = this.cameraPosition.x + Math.round((targetX - this.cameraPosition.x) * 0.1);
        this.cameraPosition.y = this.cameraPosition.y + Math.round((targetY - this.cameraPosition.y) * 0.1);
        this.ui["grp_bg3"].x = -(Math.round(this.cameraPosition.x * 1.5));
        this.ui["grp_bg3"].y = -(Math.round(this.cameraPosition.y * 1.5));
        this.ui["grp_bg2"].x = -this.cameraPosition.x;
        this.ui["grp_bg2"].y = -this.cameraPosition.y;
        this.ui["grp_playground"].x = -this.cameraPosition.x;
        this.ui["grp_playground"].y = -this.cameraPosition.y;
        
        this.grp_touch.x = -this.cameraPosition.x;
        this.grp_touch.y = -this.cameraPosition.y;
	}
	
    private touchScene(event: egret.TouchEvent):void{
        if(Main.free){
            this.clearForFlag();
            var x = event.localX;
            var y = event.localY;
                        
            if(this.terrain.isInPolygon(x, y)) {
                this.player.onGridClick(x, y, this.ui["grp_bg2"]);
            }
        }
        event.stopPropagation();
    }
    
    public touchEnd1(event: egret.TouchEvent): void{
        if(Main.free){
            this.clearForFlag();
            this.forEnd1 = true;
            this.player.onGridClick(event.localX + this.box_end1.x, event.localY + this.box_end1.y, this.ui["grp_bg2"]);
        }
        event.stopPropagation();
    }
    
    public touchEnd2(event: egret.TouchEvent): void{
        if(Main.free){
            this.clearForFlag();
            this.forEnd2 = true;
            this.player.onGridClick(event.localX + this.box_end2.x, event.localY + this.box_end2.y, this.ui["grp_bg2"]);
        }
        event.stopPropagation();
    }
    
    private onDialogueEnd(data: any): void{
        if(data == "scene1"){
            
        }
    }
    
    private onArrive(data: any):void{
        if(this.forEnd1){
            Main.transit(500);
            Main.removeScene(this);
            Main.addScene(Main.LAYER_GAME, Main.scenarioBush);
            Main.scenarioBush.setPlayerPosition(876, 264);
        }else if(this.forEnd2){
            Main.transit(500);
            Main.removeScene(this);
            Main.addScene(Main.LAYER_GAME, Main.scenarioCabin);
            Main.scenarioCabin.setPlayerPosition(22, 235);
        }
    }
    
    public onRemove(): void{
        this.unbindEvents();
    }
}
