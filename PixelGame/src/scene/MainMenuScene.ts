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
    private lbl_start: egret.gui.Label;
    private static instance: MainMenuScene;
	
	public constructor(){
		super("skins.scene.MainMenuSkin");
        MainMenuScene.instance = this;
	}
	
	//初始化
	public init():void{
    	//初始化界面
		this.ui["bg"].alpha = 0;
		this.grp = this.ui["grp"];
        this.grp_particle = this.ui["grp_particle"];
        this.img_title = this.ui["img_title"];
        this.lbl_start = this.ui["lbl_start"];
		
		//添加标题缓动
		var that = this;
		document.getElementById("egretCanvas").addEventListener("mousemove", this.onMouseMove);
		
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
        this.lbl_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickStart,this);
	}
	
	//鼠标移动的UI缓动事件
	private onMouseMove(evt: MouseEvent):void{
        MainMenuScene.instance.grp.x = (400 - evt.x) / 32;
        MainMenuScene.instance.grp.y = (240 - evt.y) / 32;
	}
	
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
        Main.removeScene(this);
        Main.addScene(Main.LAYER_GAME, new TestScenario());
	}
	
	//移除事件，移除跟本页面相关的所有监听
	public onRemove(): void{
        this.lbl_start.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickStart,this);
        document.getElementById("egretCanvas").removeEventListener("mousemove", this.onMouseMove);
	}
}
