/**
 *
 * @author wheatup
 * 手机界面
 *
 */
class CellphoneScene extends Scene{
    public isOpened: boolean = false;
    
    private hasOpened: boolean = false;
    private grp_entries: egret.gui.Group;
    private lbl_name: egret.gui.Label;
    private box_back: egret.gui.UIAsset;
    private messages: Array<MsgEntry> = [];
    private scrollView: egret.ScrollView;
    
    public constructor(){
        super("skins.scene.CellphoneSkin");
    }
    
    public init():void{
        this.grp_entries = this.ui["grp_entries"];
        this.lbl_name = this.ui["lbl_name"];
        this.lbl_name.text = "老婆";
        this.lbl_name.fontFamily = "font_pixel";
        this.box_back = this.ui["box_back"];
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
    
    public start():void{
//        this.scrollView=new egret.ScrollView(this.grp_entries);
//        this.grp_entries.alpha = 0;
//        egret.Tween.removeTweens(this.grp_entries);
//        egret.Tween.get(this.grp_entries).to({alpha:1}, Main.TRANSTION_TIME / 2);
//        this.scrollView.verticalScrollPolicy='auto';
//        this.scrollView.x = 140;
//        this.scrollView.y = 120;
//        this.scrollView.width = this.grp_entries.width;
//        this.scrollView.height = 203;
//        Main.main.addChild(this.scrollView);
//        
//        this.scrollView.scrollTop = this.grp_entries.height - 203;
        
        this.scrollView.visible = true;
        egret.Tween.get(this.grp_entries).to({alpha:1}, Main.TRANSTION_TIME / 2);
        this.bindEvents();
        this.isOpened = true;
    }
    
    public bindEvents():void{
        this.box_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.leave, this);
        
    }
    
    public unbindEvents():void{
        this.box_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.leave, this);
    }
    
    private leave():void{
        Main.transit(500);
        Main.removeScene(this);
        this.isOpened = false;
    }
    
    public onRemove():void{
        egret.Tween.removeTweens(this.grp_entries);
        egret.Tween.get(this.grp_entries).to({alpha:0}, Main.TRANSTION_TIME / 2);
    }
    
    public onDestroy():void{
        this.unbindEvents();
        //Main.main.removeChild(this.scrollView);
        this.scrollView.visible = false;
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
    
    public addOneMessage(isMe:boolean, message:string):void{
        if(!isMe && !this.isOpened){
            Main.uiScene.addMessage();
        }
        
        var entry: MsgEntry = new MsgEntry(isMe, message);
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
        }
    }
}

class MsgEntry extends egret.gui.Group{
    public isMe: boolean = false;
    public text: string = "";
    public img_entry: egret.gui.UIAsset;
    public lbl_entry: egret.gui.Label;
    public entryHeight: number = 0;
    
    public constructor(isMe: boolean, text:string){
        super();
        this.isMe = isMe;
        this.text = text;
    }
    
    public addToMessage(group:egret.gui.Group): void{
        var textLength: number = this.text.length;
        
        this.lbl_entry = new egret.gui.Label();
        this.lbl_entry.alpha = 0;
        this.lbl_entry.fontFamily = "font_pixel";
        this.lbl_entry.size = 24;
        this.lbl_entry.bold = true;
        this.lbl_entry.textColor = this.isMe ? 0x446633 : 0x333333;
        this.lbl_entry.maxWidth = 270;
        this.lbl_entry.text = this.text;
        this.lbl_entry.measure();
        var width: number = this.lbl_entry.measuredWidth;
        var height: number = this.lbl_entry.measuredHeight;
        
        this.lbl_entry.x = this.isMe ? Math.max(470 - width, 17) : 17;
        this.lbl_entry.y = 12;
        
        
        this.img_entry = new egret.gui.UIAsset();
        this.img_entry.alpha = 0;
        this.img_entry.source = this.isMe ? "cellphone_msg_me" : "cellphone_msg_other";
        this.img_entry.height = height + 36;
        this.img_entry.scale9Grid = this.isMe ? new egret.Rectangle(20, 16, 16, 24) : new egret.Rectangle(32, 16, 16, 24);
        this.img_entry.width = 40 + width;
        this.img_entry.x = this.isMe ? Math.max(490 - this.img_entry.width) : 0;
        
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
