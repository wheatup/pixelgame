/**
 *
 * @author 
 *
 */

class MainMenuScene extends Scene{
    private particle: particle.GravityParticleSystem;
    
    private grp: egret.gui.Group;
    
    public constructor(){
        super("skins.scene.MainMenuSkin");
    }
    
    public init():void{
        this.ui["bg"].alpha = 0;
        this.grp = this.ui["grp"];
        var that = this;
        document.getElementById("egretCanvas").addEventListener("mousemove", function (evt: MouseEvent) {
            that.mouseMove(evt.x, evt.y);
        });
    }
    
    private mouseMove(x: number, y:number): void{
        this.grp.x = (400 - x) / 32;
        this.grp.y = (240 - y) / 32;
    }
	
    public start(): void{
        //Main.removeScene(this);
        //Main.addScene(Main.LAYER_GAME, new GameScene());
        var texture = RES.getRes("par_title");
        var config = RES.getRes("par_title_json");
        this.particle = new particle.GravityParticleSystem(texture, config);
        this.particle.emitterX = -50;
        this.particle.emitterY = 240;
        Main.addParticleEmitter(this.particle, Main.LAYER_BOTTOM);
        this.particle.start();
    }
}
