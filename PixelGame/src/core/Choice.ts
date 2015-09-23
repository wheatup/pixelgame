/**
 *
 * @author wheatup
 * 分支选项
 *
 */
class Choice {
    public static choices: Object;
    public static init():void{
        Choice.choices = new Object();
        Choice.addChoice("HideInCloset", "躲进衣柜？", ["是", "否"], 0);
        Choice.addChoice("ComeOutOfCloset", "取消躲藏？", ["是", "否"], 0);
    }
    
    public static getChoice(key:string): Choice{
        return Choice.choices[key];
    }
    
    private static addChoice(key: string, question: string, choices: Array<string>, timeLimit:number = 0):void{
        var choice: Choice = new Choice(key,question,choices,timeLimit);
        Choice.choices[key] = choice;
    }
    
    public key: string;
    public question: string;
    public choices: Array<string>;
    public timeLimit: number;
    public constructor(key: string, quesion: string, choices: Array<string>, timeLimit:number = 0) {
        this.key = key;
        this.question = quesion;
        this.choices = choices;
        this.timeLimit = timeLimit;
	}
}