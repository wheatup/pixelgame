/**
 *
 * @author wheatup
 * 短信
 *
 */
var Message = (function () {
    function Message(key, isMe, text) {
        this.key = key;
        this.isMe = isMe;
        this.text = text;
    }
    var __egretProto__ = Message.prototype;
    Message.init = function () {
        Message.messageMap = new Object();
        Message.replies = new Object();
        Message.receivedMessages = new Array();
        Message.sendedMessages = new Array();
        Message.pushMessage("wife_ask_1", "亲爱的，你什么时候回来？");
        Message.pushMessage("wife_ask_2", "饭菜都快凉了哦:3");
        Message.pushReplies("wife_rep_1", ["我今晚可能晚点回家。", "我今晚不回家了。"]);
        Message.pushMessage("wife_ask_3", "好吧，我等你。");
        Message.pushMessage("wife_ask_4", "怎么啦？加班吗？");
        Message.pushReplies("wife_rep_2", ["对，加班，你一个人在家注意照顾自己。", "不是，别的事，总之今晚不回来了。"]);
        Message.pushMessage("wife_ask_5", "好吧，不要太辛苦了。");
        Message.pushMessage("wife_ask_6", "哦。");
        Message.pushMessage("wife_ask_7", "我知道了。");
        WheatupEvent.bind(EventType.RECEIVE_MESSAGE, Message.onRecieveMessage, Message);
        WheatupEvent.bind(EventType.SEND_MESSAGE, Message.onSendMessage, Message);
    };
    Message.onRecieveMessage = function (data) {
        Message.receivedMessages.push(data);
        Data.setFlag(5 /* HasReplied */, false);
        Data.setFlag(4 /* LastReceiveMessage */, data);
    };
    Message.onSendMessage = function (data) {
        Message.sendedMessages.push(data);
        Data.setFlag(5 /* HasReplied */, true);
        Data.setFlag(3 /* LastSendMessage */, data);
        switch (data) {
            case "wife_rep_1_0":
                Timer.addTimer(10000, 1, function () {
                    Main.cellphoneScene.addOneMessage(Message.getMessage("wife_ask_3"));
                }, this);
                break;
            case "wife_rep_1_1":
                Timer.addTimer(10000, 1, function () {
                    Main.cellphoneScene.addOneMessage(Message.getMessage("wife_ask_4"));
                }, this);
                break;
            case "wife_rep_2_0":
                Timer.addTimer(10000, 1, function () {
                    Main.cellphoneScene.addOneMessage(Message.getMessage("wife_ask_5"));
                }, this);
                break;
            case "wife_rep_2_1":
                Timer.addTimer(10000, 1, function () {
                    Main.cellphoneScene.addOneMessage(Message.getMessage("wife_ask_6"));
                }, this);
                Timer.addTimer(15000, 1, function () {
                    Main.cellphoneScene.addOneMessage(Message.getMessage("wife_ask_7"));
                }, this);
                break;
        }
    };
    Message.pushMessage = function (key, text) {
        Message.messageMap[key] = new Message(key, false, text);
    };
    Message.pushReplies = function (key, text) {
        Message.replies[key] = new Array();
        for (var i = 0; i < text.length; i++) {
            Message.replies[key][i] = new Message(key + "_" + i, true, text[i]);
        }
    };
    Message.getMessage = function (key) {
        return Message.messageMap[key];
    };
    Message.getReplies = function (key) {
        return Message.replies[key];
    };
    return Message;
})();
Message.prototype.__class__ = "Message";
//# sourceMappingURL=Message.js.map