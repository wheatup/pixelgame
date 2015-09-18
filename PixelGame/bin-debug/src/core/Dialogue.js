/**
 *
 * @author wheatup
 * 对话管理类
 *
 */
var Dialogue = (function () {
    function Dialogue() {
    }
    var __egretProto__ = Dialogue.prototype;
    Dialogue.init = function () {
        Dialogue.dialogueMap = new Object();
        Dialogue.indices = new Object();
        if (Main.LANG == "CH") {
            //道具描述
            Dialogue.pushDialogue("shovel", "", "一把沾满泥土的铲子");
            //对话
            Dialogue.pushDialogue("intro", "费蓝德", "真没想到这件事就这么结束了。");
            Dialogue.pushDialogue("intro", "费蓝德", "真想赶紧回家。");
            Dialogue.pushDialogue("intro", "费蓝德", "？！");
            Dialogue.pushDialogue("scene1", "费蓝德", "该死！");
            Dialogue.pushDialogue("scene1", "费蓝德", "居然在这种时候……");
            Dialogue.pushDialogue("engine1", "", "引擎已经故障，在修好之前想移动这个大家伙似乎不大可能。");
            Dialogue.pushDialogue("engine1", "费蓝德", "妈的，屋漏偏逢连夜雨。");
            Dialogue.pushDialogue("engine2", "费蓝德", "希望能在天黑之前修好它。");
            Dialogue.pushDialogue("road_end1", "费蓝德", "路还很长，走回去估计得到明天才行。");
            Dialogue.pushDialogue("road_end1", "费蓝德", "我还是先把车修好再说吧。");
            Dialogue.pushDialogue("road_end2", "费蓝德", "来时的路，一望无际。");
            Dialogue.pushDialogue("road_end2", "费蓝德", "太阳都快落山了。");
            Dialogue.pushDialogue("closet", "", "一只大衣柜，足以容纳一个人。");
            Dialogue.pushDialogue("trapdoor", "", "一个活板门，上了锁。");
            //测试
            Dialogue.pushDialogue("test", "[作者]小白", "啊哦，游戏似乎只做到这里。");
            Dialogue.pushDialogue("test", "[作者]小白", "正在拼命赶工中，请继续保持关注:P");
        }
        else if (Main.LANG == "EN") {
            //道具描述
            Dialogue.pushDialogue("shovel", "", "A shovel with some dirt stick on it.");
            //对话
            Dialogue.pushDialogue("intro", "Phil", "Never thought it end with that.");
            Dialogue.pushDialogue("intro", "Phil", "Just let me be at home.");
            Dialogue.pushDialogue("intro", "Phil", "?!");
            Dialogue.pushDialogue("scene1", "Phil", "Goddamn it!");
            Dialogue.pushDialogue("scene1", "Phil", "Not now!");
            Dialogue.pushDialogue("engine1", "", "The engine has busted, it won't budge until it's fixed.");
            Dialogue.pushDialogue("engine1", "Phil", "Damn, what a bummer!");
            Dialogue.pushDialogue("engine2", "Phil", "Hope I can fix it before it's getting to late.");
            Dialogue.pushDialogue("road_end1", "Phil", "Still a long way, it might take forever if I walk home.");
            Dialogue.pushDialogue("road_end1", "Phil", "Let's fix the car first.");
            Dialogue.pushDialogue("road_end2", "Phil", "The road that I came from.");
            Dialogue.pushDialogue("road_end2", "Phil", "It's almost sunset.。");
            //测试
            Dialogue.pushDialogue("test", "wheatup", "Oops, you reached the end of this game.");
            Dialogue.pushDialogue("test", "wheatup", "Still work on it.");
        }
    };
    Dialogue.getDialogue = function (stream, renew) {
        if (renew === void 0) { renew = false; }
        if (renew || Dialogue.indices[stream] == null || Dialogue.dialogueMap[stream] == undefined) {
            Dialogue.indices[stream] = 0;
        }
        else {
            Dialogue.indices[stream] = Dialogue.indices[stream] + 1;
        }
        return Dialogue.dialogueMap[stream][Dialogue.indices[stream]];
    };
    Dialogue.pushDialogue = function (key, name, text) {
        var d = new DialogueVO(name, text);
        if (Dialogue.dialogueMap[key] == null || Dialogue.dialogueMap[key] == undefined) {
            Dialogue.dialogueMap[key] = new Array();
        }
        var dials = Dialogue.dialogueMap[key];
        if (dials.length > 0) {
            dials[dials.length - 1].stream = true;
        }
        dials.push(d);
    };
    Dialogue.index = 0;
    Dialogue.currentStream = "";
    return Dialogue;
})();
Dialogue.prototype.__class__ = "Dialogue";
var DialogueVO = (function () {
    function DialogueVO(name, text) {
        this.name = name;
        this.text = text;
    }
    var __egretProto__ = DialogueVO.prototype;
    return DialogueVO;
})();
DialogueVO.prototype.__class__ = "DialogueVO";
//# sourceMappingURL=Dialogue.js.map