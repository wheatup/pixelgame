/**
 *
 * @author 
 *
 */
class UIScene extends Scene{
    
    public img_message: egret.gui.UIAsset;
    public constructor(){
        super("skins.scene.UISkin");
    }
    
    public init():void{
        this.img_message = this.ui["img_message"];
    }
    
    public start():void{
        this.bindEvents();
    }
    
    public onDestory():void{
        this.unbindEvents();
    }
    
    
    private bindEvents():void{
        this.img_message.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchMessage, this);
    }
    
    private unbindEvents():void{
        this.img_message.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchMessage, this);
    }
    
    private onTouchMessage(event: egret.TouchEvent):void{
        if(DialogueScene.showing) {
            DialogueScene.interupt();
        }else if(Main.free){
            Main.transit(1000);
            Main.addScene(Main.LAYER_GUI, Main.cellphoneScene);
        }
        event.stopPropagation();
    }
}
