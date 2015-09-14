/**
 *
 * @author 
 *
 */
class UIScene extends Scene{
    private unreadMessages: number = 0;
    
    public img_message: egret.gui.UIAsset;
    public constructor(){
        super("skins.scene.UISkin");
    }
    
    public init():void{
        this.img_message = this.ui["img_message"];
        this.img_message.anchorX = 0.5;
        this.img_message.anchorY = 0.5;
        this.img_message.x += Math.round(this.img_message.width / 2);
        this.img_message.y += Math.round(this.img_message.height / 2);
        this.img_message.source = "cellphone_new_0";
        this.img_message.visible = false;
    }
    
    public start():void{
        this.bindEvents();
    }
    
    public onDestory():void{
        this.unbindEvents();
    }
    
    public addMessage():void{
        this.unreadMessages++;
        this.img_message.source = "cellphone_new_" + Math.min(this.unreadMessages, 4);
        this.img_message.y -= 100;
        this.img_message.alpha = 0;
        this.img_message.visible = true;
        egret.Tween.get(this.img_message).to({y:this.img_message.y + 100, alpha:1}, 500, egret.Ease.quadOut);
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
            Main.transit(500);
            Main.addScene(Main.LAYER_GUI, Main.cellphoneScene);
            this.unreadMessages = 0;
            Main.cellphoneScene.isOpened = true;
            this.img_message.source = "cellphone_new_0";
        }
        event.stopPropagation();
    }
}
