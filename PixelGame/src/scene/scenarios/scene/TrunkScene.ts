/**
 *
 * @author wheatup
 * 后备箱
 *
 */
class TrunkScene extends Scene{
    
    public bg: egret.gui.UIAsset;
    private box_shovel: egret.gui.UIAsset;
    private box_back: egret.gui.UIAsset;
    public constructor(){
        super("skins.scene.TrunkSkin");
    }
    
    public init():void{
        this.bg = this.ui["bg"];
        this.touchEnabled = false;
        if(!Data.getFlag(Flag.GotShovel)){
            this.bg.source = "scene_trunk_1";
        }else{
            this.bg.source = "scene_trunk_0";
        }
        this.box_shovel = this.ui["box_shovel"];
        this.box_shovel.rotation = 15;
        this.box_back = this.ui["box_back"];
        egret.Tween.get(this.box_back, {loop:true}).to({x: this.box_back.x + 20}, 500, egret.Ease.quadOut).to({x: this.box_back.x}, 500, egret.Ease.quadIn);
    }
    
    public start():void{
        this.bindEvents();
    }
    
    public bindEvents():void{
        this.box_shovel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickShovel, this);
        this.box_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBack, this);
    }
    
    public unbindEvents():void{
        this.box_shovel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickShovel, this);
        this.box_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBack, this);
    }
    
    public onClickShovel():void{
        this.takeShovel();
    }
    
    public onClickBack():void{
        Main.removeScene(this);
        Main.transit();
    }
    
    public onRemove():void{
        this.unbindEvents();
    }
    
    public takeShovel():void{
        if(!Data.getFlag(Flag.GotShovel)) {
            Data.setFlag(Flag.GotShovel);
            this.bg.source = "scene_trunk_0";
            Inventory.getItem(Item.shovel);
        }
    }
}
