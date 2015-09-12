/**
 *
 * @author wheatup
 * 对话管理类
 *
 */
class Dialogue {
    private static dialogueMap: Object;
    private static indices: Object;
    private static index: number = 0;
    private static currentStream: string = "";
    
    public static init():void{
        Dialogue.dialogueMap = new Object();
        Dialogue.indices = new Object();
        
        Dialogue.pushDialogue("intro", "江蛤蛤", "真没想到这件事就这么结束了。");
        Dialogue.pushDialogue("intro", "江蛤蛤", "真想赶紧回家。");
        Dialogue.pushDialogue("intro", "江蛤蛤", "？！");
    }
    
    public static getDialogue(stream: string, next: boolean = false):DialogueVO{
        if(Dialogue.indices[stream] == null || Dialogue.dialogueMap[stream] == undefined){
            Dialogue.indices[stream] = 0;
        }else{
            Dialogue.indices[stream] = (<number>Dialogue.indices[stream]) + 1;
        }
        return Dialogue.dialogueMap[stream][Dialogue.indices[stream]];
    }
    
    private static pushDialogue(key:string, name:string, text:string):void{
        var d: DialogueVO = new DialogueVO(name, text);
        if(Dialogue.dialogueMap[key] == null || Dialogue.dialogueMap[key] == undefined){
            Dialogue.dialogueMap[key] = new Array<DialogueVO>();
        }
        var dials: Array<DialogueVO> = Dialogue.dialogueMap[key];
        if(dials.length > 0){
            dials[dials.length - 1].stream = true;
        }
        dials.push(d);
    }
    
}

class DialogueVO{
    public name: string;
    public text: string;
    public stream: boolean;
    public constructor(name:string, text: string){
        this.name = name;
        this.text = text;
    }
}