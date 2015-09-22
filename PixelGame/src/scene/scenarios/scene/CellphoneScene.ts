/**
 *
 * @author wheatup
 * 手机界面
 *
 */
class CellphoneScene extends Scene{
    public isOpened: boolean = false;
    
    private hasOpened: boolean = false;
    private img_flash: egret.gui.UIAsset;
    private grp_entries: egret.gui.Group;
    private lbl_name: egret.gui.Label;
    private box_back: egret.gui.UIAsset;
    private box_input: egret.gui.UIAsset;
    private box_send: egret.gui.UIAsset;
    private lbl_input: egret.gui.Label;
    private messages: Array<MsgEntry> = [];
    private scrollView: egret.ScrollView;
    
    
    public constructor(){
        super("skins.scene.CellphoneSkin");
    }
    
    public init():void{
        this.grp_entries = this.ui["grp_entries"];
        this.lbl_name = this.ui["lbl_name"];
        this.lbl_name.text = Name.Wife;
        this.lbl_name.fontFamily = "font_pixel";
        this.lbl_name.bold = true;
        this.box_back = this.ui["box_back"];
        this.box_input = this.ui["box_input"];
        this.box_send = this.ui["box_send"];
        this.lbl_input = this.ui["lbl_input"];
        this.img_flash = this.ui["img_flash"];
        this.img_flash.alpha = 0;
        this.img_flash.visible = true;
        this.lbl_input.text = "";
        this.lbl_input.fontFamily = "font_pixel";
        this.lbl_input.bold = true;
        this.ui["bg0"].alpha = 0.8;
        
        this.scrollView=new egret.ScrollView(this.grp_entries);
        this.grp_entries.alpha = 0;
        egret.Tween.removeTweens(this.grp_entries);
        egret.Tween.get(this.grp_entries).to({alpha:1}, Main.TRANSTION_TIME / 2);
        this.scrollView.verticalScrollPolicy='auto';
        this.scrollView.x = 140;
        this.scrollView.y = 120;
        this.scrollView.width = this.grp_entries.width;
        this.scrollView.height = 203;
        Main.main.addChild(this.scrollView);
        this.bindEvents();
        this.scrollView.scrollTop = this.grp_entries.height - 203;
        
        this.rebuildMessages();
        this.hasOpened = true;
    }
    
    private showingFlash: boolean = false;
    private showFlash():void{
        if(!this.showingFlash) {
            egret.Tween.removeTweens(this.img_flash);
            this.img_flash.alpha = 0;
            egret.Tween.get(this.img_flash,{ loop: true }).to({ alpha: 1 },200).to({ alpha: 0 },200);
            this.showingFlash = true;
        }
    }
    
    private hideFlash():void{
        egret.Tween.removeTweens(this.img_flash);
        this.img_flash.alpha = 0;
        this.showingFlash = false;
    }
    
    public start():void{
        this.scrollView.visible = true;
        egret.Tween.get(this.grp_entries).to({alpha:1}, Main.TRANSTION_TIME / 2);
        this.bindEvents();
        this.isOpened = true;
        this.checkFlash();
    }
    
    public checkFlash():void{
        if(!this.isOpened) return;
        var canReply: string[] = ["wife_ask_2", "wife_ask_4"];
        if(!Data.getFlag(Flag.HasReplied) && canReply.indexOf(Data.getFlag(Flag.LastReceiveMessage)) >= 0){
            this.showFlash();
        }else{
            this.hideFlash();
        }
    }
    
    public bindEvents():void{
        this.box_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.leave, this);
        this.box_input.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchInput, this);
        this.box_send.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchSend, this);
    }
    
    public unbindEvents():void{
        this.box_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.leave, this);
        this.box_input.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchInput, this);
        this.box_send.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchSend, this);
    }
    
    private leave(event: egret.TouchEvent):void{
        if(Main.free) {
            Main.transit(500);
            Main.removeScene(this);
            this.isOpened = false;
        }
        event.stopPropagation();
    }
    
    private currentReplyIndex: number = 0;
    private currentReplyMessage: Message;
    private touchInput(event: egret.TouchEvent):void{
        if(Main.free && !Data.getFlag(Flag.HasReplied)) {
            switch(Data.getFlag(Flag.LastReceiveMessage)){
                case "wife_ask_2": 
                    this.switchReply("wife_rep_1");
                    break;
                case "wife_ask_4": 
                    this.switchReply("wife_rep_2");
                    break;
            }
        }
        event.stopPropagation();
    }
    
    private switchReply(key: string):void{
        var replies: Array<Message> = Message.getReplies(key);
        if(replies != null && replies.length > 0){
            this.currentReplyMessage = replies[this.currentReplyIndex = ((this.currentReplyIndex + 1) % replies.length)];
            this.lbl_input.text = this.currentReplyMessage.text;
        }
    }
    
    private touchSend(event: egret.TouchEvent):void{
        if(Main.free && !Data.getFlag(Flag.HasReplied) && this.currentReplyMessage != null) {
            this.lbl_input.text = "";
            this.addOneMessage(this.currentReplyMessage);
            this.currentReplyMessage = null;
        }
        event.stopPropagation();
    }
    
    public onRemove():void{
        egret.Tween.removeTweens(this.grp_entries);
        egret.Tween.get(this.grp_entries).to({alpha:0}, Main.TRANSTION_TIME / 2);
    }
    
    public onDestroy():void{
        this.unbindEvents();
        //Main.main.removeChild(this.scrollView);
        this.scrollView.visible = false;
        this.showingFlash = false;
    }
    
    private rebuildMessages():void{
        for(var j:number = 0;j < this.messages.length;j++) {
            var entry: MsgEntry = this.messages[j];
            var h: number = 0;
            for(var i: number = 0;i < this.messages.length;i++) {
                h += this.messages[i].entryHeight + 5;
            }
            entry.y = 10 + h;
            entry.addToMessage(this.grp_entries);

            this.grp_entries.height = 10 + h + entry.entryHeight;
            this.scrollView.scrollTop = this.grp_entries.height - 203;
            this.ui["img_msg_bg"].height = 10 + h + entry.entryHeight;
        }
    }
    
    public addOneMessage(message: Message):void{
        if(message == null) { 
            Debug.log("Unknow message.");
            return; 
        }
        
        if(message.isMe){
            WheatupEvent.call(EventType.SEND_MESSAGE,message.key);
        }else{
            WheatupEvent.call(EventType.RECEIVE_MESSAGE,message.key);
        }
        
        if(!message.isMe && !this.isOpened){
            Main.uiScene.addMessage();
        }
        
        var entry: MsgEntry = new MsgEntry(message);
        this.messages.push(entry);
        
        if(this.hasOpened){
            var h: number = 0;
            for(var i: number = 0;i < this.messages.length;i++) {
                h += this.messages[i].entryHeight + 5;
            }
            entry.y = 10 + h;
            entry.addToMessage(this.grp_entries);
            
            this.grp_entries.height = 10 + h + entry.entryHeight;
            this.scrollView.scrollTop = this.grp_entries.height - 203;
            this.ui["img_msg_bg"].height = 10 + h + entry.entryHeight;
            this.checkFlash();
        }
    }
}

class MsgEntry extends egret.gui.Group{
    public message: Message;
    public img_entry: egret.gui.UIAsset;
    public lbl_entry: egret.gui.Label;
    public entryHeight: number = 0;
    
    public constructor(message){
        super();
        this.message = message;
    }
    
    public addToMessage(group:egret.gui.Group): void{
        var textLength: number = this.message.text.length;
        
        this.lbl_entry = new egret.gui.Label();
        this.lbl_entry.alpha = 0;
        this.lbl_entry.fontFamily = "font_pixel";
        this.lbl_entry.size = 24;
        this.lbl_entry.bold = true;
        this.lbl_entry.textColor = this.message.isMe ? 0x446633 : 0x333333;
        this.lbl_entry.maxWidth = 270;
        this.lbl_entry.text = this.message.text;
        this.lbl_entry.measure();
        var width: number = this.lbl_entry.measuredWidth;
        var height: number = this.lbl_entry.measuredHeight;
        
        this.lbl_entry.x = this.message.isMe ? Math.max(470 - width, 17) : 17;
        this.lbl_entry.y = 12;
        
        
        this.img_entry = new egret.gui.UIAsset();
        this.img_entry.alpha = 0;
        this.img_entry.source = this.message.isMe ? "cellphone_msg_me" : "cellphone_msg_other";
        this.img_entry.height = height + 36;
        this.img_entry.scale9Grid = this.message.isMe ? new egret.Rectangle(20, 16, 16, 24) : new egret.Rectangle(32, 16, 16, 24);
        this.img_entry.width = 40 + width;
        this.img_entry.x = this.message.isMe ? Math.max(490 - this.img_entry.width) : 0;
        
        this.entryHeight = this.img_entry.height;
        
        this.addElement(this.img_entry);
        this.addElement(this.lbl_entry);
        group.addElement(this);
        
        this.img_entry.y += 50;
        this.lbl_entry.y += 50;
        egret.Tween.get(this.img_entry).to({y:this.img_entry.y-50}, 500, egret.Ease.quadOut);
        egret.Tween.get(this.img_entry).to({alpha:1}, 800);
        egret.Tween.get(this.lbl_entry).to({y:this.lbl_entry.y-50}, 500, egret.Ease.quadOut);
        egret.Tween.get(this.lbl_entry).to({alpha:1}, 800);
    }
}
