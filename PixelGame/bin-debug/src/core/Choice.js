/**
 *
 * @author wheatup
 * 分支选项
 *
 */
var Choice = (function () {
    function Choice(key, quesion, choices, timeLimit) {
        if (timeLimit === void 0) { timeLimit = 0; }
        this.key = key;
        this.question = quesion;
        this.choices = choices;
        this.timeLimit = timeLimit;
    }
    var __egretProto__ = Choice.prototype;
    Choice.init = function () {
        Choice.choices = new Object();
        Choice.addChoice("HideInCloset", "躲进衣柜？", ["是", "否"], 0);
        Choice.addChoice("ComeOutOfCloset", "取消躲藏？", ["是", "否"], 0);
    };
    Choice.getChoice = function (key) {
        return Choice.choices[key];
    };
    Choice.addChoice = function (key, question, choices, timeLimit) {
        if (timeLimit === void 0) { timeLimit = 0; }
        var choice = new Choice(key, question, choices, timeLimit);
        Choice.choices[key] = choice;
    };
    return Choice;
})();
Choice.prototype.__class__ = "Choice";
//# sourceMappingURL=Choice.js.map