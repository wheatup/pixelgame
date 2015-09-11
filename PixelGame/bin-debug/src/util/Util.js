/**
 *
 * @author wheatup
 * 工具函数
 *
 */
var Util = (function () {
    function Util() {
    }
    var __egretProto__ = Util.prototype;
    /**
     * 将日期转化为hh:mm:ss格式
     */
    Util.toTimeString = function (date) {
        var str = (date.getHours() < 10 ? "0" : "") + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes() + ":" + (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
        return str;
    };
    return Util;
})();
Util.prototype.__class__ = "Util";
//# sourceMappingURL=Util.js.map