/**
 *
 * @author
 *
 */
var Util = (function () {
    function Util() {
    }
    var __egretProto__ = Util.prototype;
    Util.toTimeString = function (date) {
        var str = (date.getHours() < 10 ? "0" : "") + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes() + ":" + (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
        return str;
    };
    return Util;
})();
Util.prototype.__class__ = "Util";
//# sourceMappingURL=Util.js.map