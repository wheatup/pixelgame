/**
 *
 * @author wheatup
 * UI界面
 *
 */
class UIScene extends Scene{
    private unreadMessages: number = 0;
    
    public img_message: egret.gui.UIAsset;
    private items: Array<egret.gui.UIAsset>;
    private grp: egret.gui.Group;
    
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
        this.items = new Array<egret.gui.UIAsset>();
        this.grp = this.ui["grp"];
        WheatupEvent.bind(EventType.GET_ITEM,this.onGetItem,this);
        WheatupEvent.bind(EventType.LOST_ITEM,this.onLostItem,this);
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
    
    private onGetItem(item: Item): void{
        var img: egret.gui.UIAsset = new egret.gui.UIAsset();
        img.width = 60;
        img.height = 60;
        img.anchorX = 0.5;
        img.anchorY = 0.5;
        img.x = 750;
        img.y = 130 + this.items.length * 70;
        img.source = item.asset;
        img.alpha = 0;
        img.scaleX = 2;
        img.scaleY = 2;
        this.grp.addElement(img);
        if(item == Item.shovel) {
            img.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchShovel,this);
        }
        egret.Tween.get(img).to({ alpha: 1,scaleX: 1,scaleY: 1 },500, egret.Ease.quadOut);
    }
    
    private onLostItem(item: Item): void{
        var index: number = Inventory.items.indexOf(item);
        if(index < 0) return;
        
        for(var i: number = index + 1;i < this.items.length;i++){
            egret.Tween.get(this.items[i]).to({ y: 130 + (i - 1) * 70 }, 1000, egret.Ease.quadOut);
        }
        
        egret.Tween.get(this.items[index]).to({ scaleX: 0,scaleY: 0,alpha: 0 },500);
        Timer.addTimer(500,1,() => {
            this.grp.removeElement(this.items[index]);
            this.items.splice(index,1);
        },this);
    }
    
    private onTouchShovel(event: egret.TouchEvent): void{
        if(Main.free){
            DialogueScene.showItemDesc(Item.shovel);
        }
        event.stopPropagation();
    }
}
