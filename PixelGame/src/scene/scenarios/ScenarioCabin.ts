/**
 *
 * @author wheatup
 * 第四幕游戏场景
 * 小屋前
 *
 */
class ScenarioCabin extends Scenario{
    private tick: number = 0;
    private particle: particle.GravityParticleSystem;
    private grp_game: egret.gui.Group;
    private grp_touch: egret.gui.Group;
    private grp_particle: egret.gui.Group;
    
    private box_scene: egret.gui.UIAsset;
    private box_end: egret.gui.UIAsset;
    private box_door: egret.gui.UIAsset;
    
    private forEnd: boolean = false;
    private forDoor: boolean = false;
    
	public constructor() {
        super("skins.scenario.ScenarioCabinSkin");
        this.terrain = new Terrain(this,"0,0 -1,267 249,267 288,223 453,207 963,203 1233,221 1388,215 1405,201 1672,188 1779,189 1795,177 1848,177 2028,180 2025,167 1866,139 1857,118 1706,113 1672,98 1663,70 1562,62 1472,42 1292,36 1171,4 1057,37 936,33 827,5 746,20 738,64 555,47 500,34",2400,480,null,1,213);
	}
	
	public init():void{
        this.grp_game = this.ui["grp_game"];
        this.grp_game.touchChildren = false;
        this.grp_touch = this.ui["grp_touch"];
        
        //初始化判定区域
        this.box_scene = this.ui["box_scene"];
        this.box_door = this.ui["box_door"];
        this.box_end = this.ui["box_end"];
        
        //创建玩家
        this.createPlayer(22, 235, this.ui["grp_playground"], 0.75);
        this.player.moveSpeed = 5;
        
        //设置摄影机
        this.cameraLimit.width = 1600;
        this.cameraPosition.x = 0;
        
        this.player.setBrightness(0.3);
        //this.drawGrid();
	}
	
	private clearForFlag():void{
        this.forDoor = false;
        this.forEnd = false;
	}
	
    private bindEvents():void{
        this.box_scene.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchScene, this);
        this.box_door.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDoor, this);
        this.box_end.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEnd, this);
        WheatupEvent.bind(EventType.DIALOGUE_END, this.onDialogueEnd, this);
        WheatupEvent.bind(EventType.ARRIVE, this.onArrive, this);
    }
    
    private unbindEvents():void{
        this.box_scene.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchScene, this);
        this.box_door.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDoor, this);
        this.box_end.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEnd, this);
        WheatupEvent.unbind(EventType.DIALOGUE_END, this.onDialogueEnd);
        WheatupEvent.unbind(EventType.ARRIVE, this.onArrive);
    }
    
    public onRemove(): void{
        this.unbindEvents();
    }
	
	public start(): void{
        this.getConditions();
        this.bindEvents();
	}
	
    private getConditions(): void {
        
    }
    
	
	public update():void{
        this.calcCamera();
	}
	
    private calcCamera():void{
        var targetX: number = Util.clip(this.player.getX() - 400, 0, this.cameraLimit.width);
        var targetY: number = Util.clip(this.player.getY() - 240, 0, this.cameraLimit.height);
        
        this.cameraPosition.x = this.cameraPosition.x + Math.round((targetX - this.cameraPosition.x) * 0.1);
        this.cameraPosition.y = this.cameraPosition.y + Math.round((targetY - this.cameraPosition.y) * 0.1);
        this.ui["grp_bg1"].x = -this.cameraPosition.x;
        this.ui["grp_bg1"].y = -this.cameraPosition.y;
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
                this.player.onGridClick(x, y, this.ui["grp_bg1"]);
            }
        }
        event.stopPropagation();
    }
    
    private touchDoor(event: egret.TouchEvent):void{
        if(Main.free){
            this.clearForFlag();
            this.forDoor = true;
            this.player.onGridClick(1803, 342, this.ui["grp_bg1"]);
        }
        event.stopPropagation();
    }
    
    private touchEnd(event: egret.TouchEvent):void{
        if(Main.free){
            this.clearForFlag();
            this.forEnd = true;
            this.player.onGridClick(22, 235, this.ui["grp_bg1"]);
        }
        event.stopPropagation();
    }
    
    private onDialogueEnd(data: any): void{
        
    }
    
    private onArrive(data: any):void{
        if(this.forDoor){
            Main.transit(500);
            Main.removeScene(this);
            Main.addScene(Main.LAYER_GAME, Main.scenarioRoom);
            Main.scenarioRoom.setPlayerPosition(61, 417);
        }else if(this.forEnd){
            Main.transit(500);
            Main.removeScene(this);
            Main.addScene(Main.LAYER_GAME, Main.scenarioJungle);
            Main.scenarioJungle.setPlayerPosition(2339, 459);
        }
    }
}
