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
    /**
     * 取最大和最小值之间
     */
    Util.clip = function (value, min, max) {
        return value < min ? min : (value > max ? max : value);
    };
    Util.centerPivot = function (element) {
        element.anchorX = 0.5;
        element.anchorY = 0.5;
        element.x += Math.round(element.width / 2);
        element.y += Math.round(element.height / 2);
    };
    return Util;
})();
Util.prototype.__class__ = "Util";
//# sourceMappingURL=Util.js.map