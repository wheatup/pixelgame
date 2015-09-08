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
            console.log("[" + new Date().toLocaleString() + "]" + data);
        }
        else {
            console.log("[" + new Date().toLocaleString() + "]");
        }
    };
    Debug.alert = function (data) {
        if (!Debug.debugMode)
            return;
        if (data != null) {
            alert("[" + new Date().toLocaleString() + "]" + data);
        }
        else {
            alert("[" + new Date().toLocaleString() + "]");
        }
    };
    Debug.debugMode = true;
    return Debug;
})();
Debug.prototype.__class__ = "Debug";
//# sourceMappingURL=Debug.js.map