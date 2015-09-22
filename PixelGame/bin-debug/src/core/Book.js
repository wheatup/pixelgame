/**
 *
 * @author wheatup
 * 书本类
 *
 */
var Book = (function () {
    function Book() {
        this.init();
    }
    var __egretProto__ = Book.prototype;
    __egretProto__.init = function () {
        this.pages = new Array();
        this.addPage("");
        this.addPage(this.getDate(-15) + "\n\n" + Name.GuyWife + " : 正常\n" + Name.GuyDaughter + " : 正常\n" + Name.GuySon + " : 正常\n\n" + Name.GuySon + "哭闹得有点厉害，不过很快就安静了下来，也许是累了，事情进行得很顺利。");
        this.addPage(this.getDate(-13) + "\n\n" + Name.GuyWife + " : 正常\n" + Name.GuyDaughter + " : 正常\n" + Name.GuySon + " : 暴躁\n\n" + "今天" + Name.GuySon + "，变得更加疯狂，药效似乎已经生效，牢房的门已经变形了，不得不加以控制。");
        this.addPage(this.getDate(-10) + "\n\n" + Name.GuyWife + " : 虚弱\n" + Name.GuyDaughter + " : 正常\n" + Name.GuySon + " : 正常\n\n" + Name.GuySon + "已经平静下来，但是不肯吃东西。" + Name.GuyWife + "情况似乎有点不太妙，她不肯听我说话。");
        this.addPage(this.getDate(-7) + "\n\n" + Name.GuyWife + " : 虚弱\n" + Name.GuyDaughter + " : 正常\n" + Name.GuySon + " : 虚弱\n\n" + "我觉得" + Name.GuyWife + "快撑不下去了，如果继续这样下去不得不采取措施了。" + Name.GuyDaughter + "表现一直良好。");
        this.addPage(this.getDate(-5) + "\n\n" + Name.GuyDaughter + " : 虚弱\n" + Name.GuySon + " : 虚弱\n\n" + "在" + Name.GuyWife + "腐败之前我不得不将她搬出牢房。" + Name.GuySon + "出现跟他妈妈一样的状况。");
        this.addPage(this.getDate(-3) + "\n\n" + Name.GuyDaughter + " : 虚弱\n\n" + "今天发现" + Name.GuySon + "的牢门出现了很大的缺口，而" + Name.GuySon + "没有了踪影，也许是逃出去了，不过依照他的状况应该撑不了多久。");
        this.addPage(this.getDate(-1) + "\n\n" + Name.GuyDaughter + " : 狂躁\n\n" + Name.GuyDaughter + "今天表现正如PX-24一样，不过样本数还太少，不能妄下结论。");
    };
    __egretProto__.hasPrev = function (page) {
        return page > 0;
    };
    __egretProto__.hasNext = function (page) {
        return page < this.pages.length - 1;
    };
    __egretProto__.getText = function (page) {
        if (page >= 0 && page < this.pages.length) {
            return this.pages[page];
        }
        else {
            return "";
        }
    };
    __egretProto__.addPage = function (text) {
        this.pages.push(text);
    };
    __egretProto__.getDate = function (shift) {
        var today = new Date();
        var target = new Date(today.getTime() + (shift * 24 * 60 * 60 * 1000));
        if (Main.LANG == "CH") {
            return target.getFullYear() + "年" + (target.getMonth() + 1) + "月" + target.getDate() + "日";
        }
        else {
            return target.toDateString();
        }
    };
    return Book;
})();
Book.prototype.__class__ = "Book";
//# sourceMappingURL=Book.js.map