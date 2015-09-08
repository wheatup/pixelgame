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
        return setTimeout(handler, time, data);
    };
    Timer.addInterval = function (time, handler, data) {
        return setInterval(handler, time, data);
    };
    Timer.removeTimer = function (timer) {
        clearTimeout(timer);
    };
    Timer.removeInterval = function (timer) {
        clearInterval(timer);
    };
    return Timer;
})();
Timer.prototype.__class__ = "Timer";
//# sourceMappingURL=Timer.js.map