/**
 *
 * @author
 *
 */
var Timer = (function () {
    function Timer() {
    }
    var __egretProto__ = Timer.prototype;
    Timer.addTimer = function (time, handler, data) {
        setTimeout(handler, time, data);
    };
    return Timer;
})();
Timer.prototype.__class__ = "Timer";
//# sourceMappingURL=Timer.js.map