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
    
    private grp_choice: egret.gui.Group;
    private img_choice_bg: egret.gui.UIAsset;
    private lbl_question: egret.gui.Label;
    private lbl_choice1: egret.gui.Label;
    private lbl_choice2: egret.gui.Label;
    private seleted: boolean = false;
    private initQuesY: number;
    private initAnsY: number;
    
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
        this.grp_choice = this.ui["grp_choice"];
        this.img_choice_bg = this.ui["img_choice_bg"];
        this.img_choice_bg.alpha = 0.5;
        Util.centerPivot(this.img_choice_bg);
        this.lbl_question = this.ui["lbl_question"];
        this.lbl_question.fontFamily = "font_pixel";
        this.lbl_question.y += 10;
        this.initQuesY = this.lbl_question.y;
        this.lbl_choice1 = this.ui["lbl_choice1"];
        this.lbl_choice1.fontFamily = "font_pixel";
        this.lbl_choice1.y -= 10;
        this.lbl_choice2 = this.ui["lbl_choice2"];
        this.lbl_choice2.fontFamily = "font_pixel";
        this.lbl_choice2.y -= 10;
        this.initAnsY = this.lbl_choice1.y;
        this.grp_choice.visible = false;
        WheatupEvent.bind(EventType.GET_ITEM,this.onGetItem,this);
        WheatupEvent.bind(EventType.LOST_ITEM,this.onLostItem,this);
    }
    
    public showChoice(key: string): void{
        WheatupEvent.call(EventType.SHOW_CHOICE, Choice.getChoice(key));
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
        this.lbl_choice1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchChoice1, this);
        this.lbl_choice2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchChoice2, this);
        WheatupEvent.bind(EventType.SHOW_CHOICE, this.onShowChoice, this);
    }
    
    private unbindEvents():void{
        this.img_message.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchMessage, this);
        this.lbl_choice1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchChoice1, this);
        this.lbl_choice2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchChoice2, this);
        WheatupEvent.unbind(EventType.SHOW_CHOICE, this.onShowChoice);
    }
    
    private currentChoice: Choice;
    private lastFree: boolean = false;
    //出现选择分支
    private onShowChoice(choice: Choice):void{
        if(choice == null) return;
        this.seleted = false;
        this.lastFree = Main.free;
        Main.free = false;
        
        egret.Tween.removeTweens(this.img_choice_bg);
        egret.Tween.removeTweens(this.lbl_question);
        egret.Tween.removeTweens(this.lbl_choice1);
        egret.Tween.removeTweens(this.lbl_choice2);
        
        this.img_choice_bg.alpha = 0;
        this.img_choice_bg.scaleY = 0;
        this.lbl_question.alpha = 0;
        this.lbl_choice1.alpha = 0;
        this.lbl_choice2.alpha = 0;
        
        this.currentChoice = choice;
        this.lbl_question.text = choice.question;
        this.lbl_choice1.text = choice.choices[0];
        this.lbl_choice2.text = choice.choices[1];
        this.grp_choice.visible = true;
        
        egret.Tween.get(this.img_choice_bg).to({alpha: 0.8, scaleY: 1}, 300, egret.Ease.quadOut);
        egret.Tween.get(this.lbl_question).to({ alpha: 1, y:this.initQuesY - 10}, 300, egret.Ease.quadOut);
        egret.Tween.get(this.lbl_choice1).to({ alpha: 1, y:this.initAnsY + 10}, 300, egret.Ease.quadOut);
        egret.Tween.get(this.lbl_choice2).to({ alpha: 1, y:this.initAnsY + 10}, 300, egret.Ease.quadOut);
    }
    
    private onTouchChoice1(event: egret.TouchEvent): void{
        if(!this.seleted){
            this.hideChoices();
            WheatupEvent.call(EventType.SELECT_CHOICE, { choice: this.currentChoice, select: 1 });
        }
        event.stopPropagation();
    }
    
    private onTouchChoice2(event: egret.TouchEvent): void{
        if(!this.seleted){
            this.hideChoices();
            WheatupEvent.call(EventType.SELECT_CHOICE, { choice: this.currentChoice, select: 2 });
        }
        event.stopPropagation();
    }
    
    private hideChoices():void{
        Main.free = this.lastFree;
        this.seleted = true;
        egret.Tween.removeTweens(this.img_choice_bg);
        egret.Tween.removeTweens(this.lbl_question);
        egret.Tween.removeTweens(this.lbl_choice1);
        egret.Tween.removeTweens(this.lbl_choice2);
        
        egret.Tween.get(this.lbl_question).to({ alpha: 0, y:this.initQuesY}, 300, egret.Ease.quadIn);
        egret.Tween.get(this.lbl_choice1).to({ alpha: 0, y:this.initAnsY}, 300, egret.Ease.quadIn);
        egret.Tween.get(this.lbl_choice2).to({ alpha: 0, y:this.initAnsY}, 300, egret.Ease.quadIn);
        
        egret.Tween.get(this.img_choice_bg).to({alpha: 0, scaleY: 0}, 300, egret.Ease.quadIn);
        Timer.addTimer(300, 1, () => {if(this.seleted) this.grp_choice.visible = false; }, this);
    }
    
    private onTouchMessage(event: egret.TouchEvent):void{
        if(Main.free){
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
