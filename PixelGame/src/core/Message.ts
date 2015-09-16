/**
 *
 * @author wheatup
 * 短信
 *
 */
class Message {
    public static receivedMessages: Array<string>;
    public static sendedMessages: Array<string>;
    
    public static messageMap: Object;
    public static replies: Object;
    public static init():void{
        Message.messageMap = new Object();
        Message.replies = new Object();
        
        Message.receivedMessages = new Array<string>();
        Message.sendedMessages = new Array<string>();
        
        if(Main.LANG == "CH") {
            Message.pushMessage("wife_ask_1","亲爱的，你什么时候回来？");
            Message.pushMessage("wife_ask_2","饭菜都快凉了哦:3");

            Message.pushReplies("wife_rep_1",["我今晚可能晚点回家。","我今晚不回家了。"])

            Message.pushMessage("wife_ask_3","好吧，我等你。");
            Message.pushMessage("wife_ask_4","为什么？加班吗？");

            Message.pushReplies("wife_rep_2",["对，加班，你一个人在家注意照顾自己。","不是，别的事，总之今晚不回来了。"])
            Message.pushMessage("wife_ask_5","好吧，不要太辛苦了。");
            Message.pushMessage("wife_ask_6","哦，呵呵。");
            Message.pushMessage("wife_ask_7","我知道了。");
        }else if(Main.LANG == "EN"){
            Message.pushMessage("wife_ask_1","Sweetie, when could you come home?");
            Message.pushMessage("wife_ask_2","The dishes is about to freeze :3");
            
            Message.pushReplies("wife_rep_1",["I might come home a bit later.","I will not comming home today."])
                
            Message.pushMessage("wife_ask_3","Alright, waiting for ya.");
            Message.pushMessage("wife_ask_4","Why? Overtime?");
            
            Message.pushReplies("wife_rep_2",["Yeah, overtime, you keep cool stay at home.","No, some other thing. Any way I won't come home today.'"])
            Message.pushMessage("wife_ask_5","Okay, take your time.");
            Message.pushMessage("wife_ask_6","Yeah, right.");
            Message.pushMessage("wife_ask_7","Sure.");
        }
        
        WheatupEvent.bind(EventType.RECEIVE_MESSAGE,Message.onRecieveMessage,Message);
        WheatupEvent.bind(EventType.SEND_MESSAGE,Message.onSendMessage,Message);
    }
    
    private static onRecieveMessage(data: any): void{
        Message.receivedMessages.push(data);
        Data.setFlag(Flag.HasReplied, false);
        Data.setFlag(Flag.LastReceiveMessage, data);
    }
        
    private static onSendMessage(data: any): void{
        Message.sendedMessages.push(data);
        Data.setFlag(Flag.HasReplied, true);
        Data.setFlag(Flag.LastSendMessage, data);
        
        switch(data){
            case "wife_rep_1_0":
                Timer.addTimer(10000,1,() => { Main.cellphoneScene.addOneMessage(Message.getMessage("wife_ask_3")); },this);
                break;
            case "wife_rep_1_1":
                Timer.addTimer(10000,1,() => { Main.cellphoneScene.addOneMessage(Message.getMessage("wife_ask_4")); },this);
                break;
            case "wife_rep_2_0":
                Timer.addTimer(10000,1,() => { Main.cellphoneScene.addOneMessage(Message.getMessage("wife_ask_5")); },this);
                break;
            case "wife_rep_2_1":
                Timer.addTimer(10000,1,() => { Main.cellphoneScene.addOneMessage(Message.getMessage("wife_ask_6")); },this);
                Timer.addTimer(15000,1,() => { Main.cellphoneScene.addOneMessage(Message.getMessage("wife_ask_7")); },this);
                break;
        }
    }
    
    private static pushMessage(key:string, text:string):void{
        Message.messageMap[key] = new Message(key, false, text);
    }
    
    private static pushReplies(key:string, text:string[]):void{
        Message.replies[key] = new Array<Message>();
        for(var i: number = 0;i < text.length; i++){
            Message.replies[key][i] = new Message(key + "_" +  i,true,text[i]);
        }
    }
    
    public static getMessage(key:string): Message{
        return Message.messageMap[key];
    }
    
    public static getReplies(key:string): Array<Message>{
        return Message.replies[key];
    }
    

    public constructor(public key: string, public isMe: boolean, public text: string){}
}
