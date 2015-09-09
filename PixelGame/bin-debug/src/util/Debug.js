/**
 *
 * @author
 *
 */
var Debug = (function () {
    function Debug() {
    }
    var __egretProto__ = Debug.prototype;
    Debug.log = function (data) {
        if (!Debug.debugMode)
            return;
        if (data != null) {
            console.log("[" + Util.toTimeString(new Date()) + "]" + data);
        }
        else {
            console.log("[" + Util.toTimeString(new Date()) + "]");
        }
    };
    Debug.alert = function (data) {
        if (!Debug.debugMode)
            return;
        if (data != null) {
            alert("[" + Util.toTimeString(new Date()) + "]" + data);
        }
        else {
            alert("[" + Util.toTimeString(new Date()) + "]");
        }
    };
    Debug.debugMode = true;
    return Debug;
})();
Debug.prototype.__class__ = "Debug";
