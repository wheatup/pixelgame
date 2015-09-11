/**
 *
 * @author 
 *
 */
class BGScene extends Scene{
    
    public bg: egret.gui.UIAsset;
    public constructor(){
        super("skins.scene.BGSkin");
    }
    
    public init():void{
        this.bg = this.ui["bg"];
        this.bg.touchChildren = false;
        this.touchChildren = false;
    }
    
    public transit(): void{
        egret.Tween.removeTweens(this.bg);
        egret.Tween.get(this.bg)
            .to({alpha:1}, Main.TRANSTION_TIME * 0.4)
            .to({}, Main.TRANSTION_TIME * 0.2)
            .to({alpha:0}, Main.TRANSTION_TIME * 0.4)
    }
}
