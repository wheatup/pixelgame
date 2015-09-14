/**
 * 
 * @author wheatup
 * 主菜单界面
 * 
 */
class MainMenuScene extends Scene{
	private particle: particle.GravityParticleSystem;
	private grp: egret.gui.Group;
    private grp_particle: egret.gui.Group;
    private img_title: egret.gui.UIAsset;
    private bg1: egret.gui.UIAsset;
    private bg2: egret.gui.UIAsset;
    private bg3: egret.gui.UIAsset;
    private img_start: egret.gui.UIAsset;
    private img_continue: egret.gui.UIAsset;
    private static instance: MainMenuScene;
    
    public titleOffsetY: number = 0;
    public menu1OffsetX: number = 0;
    public menu2OffsetX: number = 0;
	
	public constructor(){
		super("skins.scene.MainMenuSkin");
        MainMenuScene.instance = this;
	}
	
	//初始化
	public init():void{
    	//初始化界面
        this.bg1 = this.ui["bg1"];
        this.bg2 = this.ui["bg2"];
        this.bg3 = this.ui["bg3"];
        this.bg3.touchEnabled = false;
		this.grp = this.ui["grp"];
        this.grp_particle = this.ui["grp_particle"];
        this.img_title = this.ui["img_title"];
        this.img_start = this.ui["img_start"];
        this.img_continue = this.ui["img_continue"];
        Util.centerPivot(this.img_start);
        Util.centerPivot(this.img_continue);
        
        this.img_title.y -= 400;
        this.img_start.x += 300;
        this.img_continue.x += 300;
        
        //增加延迟出现
        this.delay(1500);
        this.addEvent(() => {
            egret.Tween.get(this.img_title)
            .to({y:this.img_title.y + 400}, 1200, egret.Ease.quadOut)
        },this);
        
        this.delay(1000);
        this.addEvent(() => {
            egret.Tween.get(this.img_start)
                .to({ x: this.img_start.x - 300 },1000,egret.Ease.quadOut);
        },this);
        
        this.delay(200);
        this.addEvent(() => {
            egret.Tween.get(this.img_continue)
                .to({ x: this.img_continue.x - 300 },1000,egret.Ease.quadOut);
        },this);
		
		//添加标题缓动
		var that = this;
        if(egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE) {
            if(window["DeviceOrientationEvent"]) {
                window.addEventListener("deviceorientation",this.onOrientation);
            }
        } else {
            document.getElementById("egretCanvas").addEventListener("mousemove",this.onMouseMove);
        }
        
		
		//添加标题闪烁
        this.blink();
		
		//添加粒子
        var texture = RES.getRes("par_title");
        var config = RES.getRes("par_title_json");
        this.particle = new particle.GravityParticleSystem(texture, config);
        this.particle.emitterX = -50;
        this.particle.emitterY = 240;
        this.grp_particle.blendMode = egret.BlendMode.ADD;
        this.grp_particle.addElement(<any>this.particle);
        this.particle.start();
        
        //添加事件
        this.img_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickStart,this);
	}
	
	//鼠标移动的UI缓动事件
	private onMouseMove(evt: MouseEvent):void{
        MainMenuScene.instance.grp.x = Util.clip((400 - evt.x + (window.innerWidth - 800) / 2), -20, 20) / 32;
        MainMenuScene.instance.grp.y = Util.clip((240 - evt.y), -20, 20) / 32;
        MainMenuScene.instance.bg1.x = Util.clip((400 - evt.x + (window.innerWidth - 800) / 2) / 200, -20, 20) - 20;
        MainMenuScene.instance.bg1.y = Util.clip((240 - evt.y) / 200, -20, 20) - 20;
        MainMenuScene.instance.bg2.x = Util.clip((400 - evt.x + (window.innerWidth - 800) / 2) / 60, -20, 20) - 20;
        MainMenuScene.instance.bg2.y = Util.clip((240 - evt.y) / 60, -20, 20) - 20;
        MainMenuScene.instance.bg3.x = Util.clip((400 - evt.x + (window.innerWidth - 800) / 2) / 20, -20, 20) - 20;
        MainMenuScene.instance.bg3.y = Util.clip((240 - evt.y) / 20, -20, 20) - 20;
	}
	
	private onOrientation(e):void{
        var x: number = parseFloat(e.gamma + "") / 90;
        var y: number = parseFloat(e.beta + "") / 90;
        if(isNaN(x) || isNaN(y)) return;
        
        if((<any>window).orientation==180){
            x = -x;
            y = -y;
        }else if((<any>window).orientation==90){
            var temp = x;
            x = y;
            y = temp;
        }else if((<any>window).orientation==-90){
            var temp = x;
            x = -y;
            y = -temp;
        }
        
        MainMenuScene.instance.grp.x = Util.clip(x, -20, 20) * 30;
        MainMenuScene.instance.grp.y = Util.clip(y, -20, 20) * 30;
        MainMenuScene.instance.bg1.x = Util.clip(x * 7, -20, 20) - 20;
        MainMenuScene.instance.bg1.y = Util.clip(y * 8, -20, 20) - 20;
        MainMenuScene.instance.bg2.x = Util.clip(x * 16, -20, 20) - 20;
        MainMenuScene.instance.bg2.y = Util.clip(y * 20, -20, 20) - 20;
        MainMenuScene.instance.bg3.x = Util.clip(x * 35, -20, 20) - 20;
        MainMenuScene.instance.bg3.y = Util.clip(y * 40, -20, 20) - 20;
	}
	
	//标题闪烁
    private offsetX: number = 0;
    private offsetY: number = 0;
	private blink():void{
        if(this.removed) return;
        Timer.addTimer(100 + Math.floor(Math.random() * 10000),1,this.blink,this);
        this.offsetX = Math.round(Math.random() * 20 - 10);
        this.offsetY = Math.round(Math.random() * 20 - 10);
        this.img_title.source = "title_title_2";
        this.img_title.x -= this.offsetX;
        this.img_title.y -= this.offsetY;
        Timer.addTimer(50,1,() => {
            this.img_title.source = "title_title_1";
            this.img_title.x += this.offsetX;
            this.img_title.y += this.offsetY;
        },this);
	}
	
	//点击开始按钮
	private onClickStart(): void{
        Main.TRANSTION_TIME = 6000;
        Sound.stop("sound_dance");
        Sound.playSFX("sound_piano_break");
        Main.removeScene(this);
        Main.addScene(Main.LAYER_GAME, Main.scenarioIntro);
        Main.transit();
        egret.Tween.get(this.img_start).to({ alpha: 0,scaleX: 2,scaleY: 2 },1000,egret.Ease.quadOut);
	}
	
	//移除事件，移除跟本页面相关的所有监听
	public onRemove(): void{
        this.img_start.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickStart,this);
        if(egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE) {
            if(window["DeviceOrientationEvent"]) {
                window.removeEventListener("deviceorientation",this.onOrientation);
            }
        }else{
            document.getElementById("egretCanvas").removeEventListener("mousemove",this.onMouseMove);
        }
	}
}
