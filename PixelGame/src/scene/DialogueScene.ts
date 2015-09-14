/**
 *
 * @author wheatup
 * 对话界面
 * 
 */
class DialogueScene extends Scene{
    private normalPosY: number = 280;
    private bg: egret.gui.UIAsset;
    private grp: egret.gui.Group;
    public static showing: boolean = false;
    private tickingText: boolean = false;
    private showTime: number = 500;
    private tickSpeed: number = 50;
    private delayTime: number = 250;
    private isDelaying: boolean = false;
    private isAnimShowing: boolean = false;
    private isDone: boolean = false;
    
    private static currentKey: string = "";
    private static hasNext: boolean = false;
    
    private static instance: DialogueScene;
    
    public constructor(){
        super("skins.scene.DialogueSkin");
        DialogueScene.instance = this;
    }
    
    public init():void{
        this.grp = this.ui["grp"];
        this.grp.visible = false;
        this.grp.y = this.normalPosY + this.height;
        this.bg = this.ui["img_bg"];
        this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchMe,this);
        this.bg.visible = false;
        this.ui["lbl_text"].text = "";
        this.ui["lbl_name"].text = "";
        (<egret.gui.Label>this.ui["lbl_text"]).fontFamily = "font_pixel";
        (<egret.gui.Label>this.ui["lbl_name"]).fontFamily = "font_pixel";
        this.ui["lbl_arrow"].alpha = 0.8;
        
        
        egret.Tween.get(this.ui["lbl_arrow"], { loop: true })
            .to({ y: this.ui["lbl_arrow"].y + 10 }, 500, egret.Ease.quadIn)
            .to({ y: this.ui["lbl_arrow"].y}, 500, egret.Ease.quadOut);
    }
    
    private touchMe(event: egret.TouchEvent): void{
        DialogueScene.interupt();
    }
    
    private show():void{
        this.bg.visible = true;
        egret.Tween.removeTweens(this.grp);
        egret.Tween.get(this.grp).to({y: this.normalPosY}, this.showTime, egret.Ease.quadOut);
    }
    
    private hide(): void{
        this.bg.visible = false;
        egret.Tween.removeTweens(this.grp);
        egret.Tween.get(this.grp).to({y: this.normalPosY + this.height}, this.showTime, egret.Ease.quadIn);
    }
    
    private currentTextIndex: number = 0;
    private currentText: string = "";
    private tickingTimerVO: TimerVO;
    private showText(text: string): void{
        this.isAnimShowing = false;
        this.currentTextIndex = 0;
        this.currentText = text;
        this.tickingTimerVO = Timer.addTimer(this.tickSpeed, text.length, this.tickText, this);
    }
    
    private showArrow():void{
        this.ui["lbl_arrow"].visible = true;
    }
    
    private hideArrow():void{
        this.ui["lbl_arrow"].visible = false;
    }
    
    private tickText():void{
        this.currentTextIndex++;
        this.ui["lbl_text"].text = this.currentText.substr(0, this.currentTextIndex);
        this.tickingText = (this.currentTextIndex < this.currentText.length);
        if(!this.tickingText){
            this.completeDialogue();
        }
    }
    
    //点击后的反应
    private rush():void{
        if(this.isDelaying || this.isAnimShowing)
            return;
        
        if(this.tickingText){
            this.completeDialogue();
        }else if(this.isDone && DialogueScene.hasNext){
            DialogueScene.showDialogue(DialogueScene.currentKey, false);
        }else if(this.isDone){
            DialogueScene.hideDialogue();
            WheatupEvent.call(EventType.DIALOGUE_END, DialogueScene.currentKey);
        }
        
    }
    
    //显示对话
    private static setDialogue(name: string, text: string):void{
        var time: number = 100;
        DialogueScene.instance.hideArrow();
        DialogueScene.instance.grp.visible = true;
        if(name == null || name == ""){
            DialogueScene.instance.ui["img_name"].visible = false;
            DialogueScene.instance.ui["lbl_name"].visible = false;
        }else{
            DialogueScene.instance.ui["img_name"].visible = true;
            DialogueScene.instance.ui["lbl_name"].visible = true;
            DialogueScene.instance.ui["lbl_name"].text = name;
        }
        
        DialogueScene.instance.ui["lbl_text"].text = "";
        
        if(!DialogueScene.showing){
            DialogueScene.instance.show();
            time = DialogueScene.instance.showTime;
        }
        DialogueScene.showing = true;
        DialogueScene.instance.isAnimShowing = true;
        Timer.addTimer(time, 1, DialogueScene.instance.showText, DialogueScene.instance, text);
    }
    
    //对话框受到交互
    public static interupt():void{
        DialogueScene.instance.rush();
    }
    
    //隐藏对话框
    private static hideDialogue():void{
        DialogueScene.instance.hide();
        DialogueScene.showing = false;
    }
    
    //获取对话并显示 
    public static showDialogue(key: string, renew:boolean = true): void{
        DialogueScene.instance.isDone = false;
        DialogueScene.currentKey = key;
        var dias: DialogueVO = Dialogue.getDialogue(key, renew);
        DialogueScene.setDialogue(dias.name, dias.text);
        DialogueScene.hasNext = dias.stream;
    }
    
    //获取道具描述
    public static showItemDesc(item: Item): void{
        DialogueScene.instance.isDone = false;
        DialogueScene.currentKey = item.names[1];
        var dias: DialogueVO = Dialogue.getDialogue(item.names[1], true);
        DialogueScene.setDialogue(dias.name, dias.text);
        DialogueScene.hasNext = dias.stream;
    }
    
    public completeDialogue():void{
        Timer.removeTimer(this.tickingTimerVO);
        this.tickingTimerVO = null;
        this.ui["lbl_text"].text = this.currentText;
        this.tickingText = false;
        this.isDelaying = true;
        Timer.addTimer(this.delayTime, 1, () => {
            this.isDone = true;
            DialogueScene.instance.showArrow();
            this.isDelaying = false;
        }, this);
    }
}
