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
        Dialogue.pushDialogue("intro", "费蓝德", "真没想到这件事就这么结束了。");
        Dialogue.pushDialogue("intro", "费蓝德", "真想赶紧回家。");
        Dialogue.pushDialogue("intro", "费蓝德", "？！");
        Dialogue.pushDialogue("scene1", "费蓝德", "该死！");
        Dialogue.pushDialogue("scene1", "费蓝德", "居然在这种时候……");
    };
    Dialogue.getDialogue = function (stream, next) {
        if (next === void 0) { next = false; }
        if (Dialogue.indices[stream] == null || Dialogue.dialogueMap[stream] == undefined) {
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