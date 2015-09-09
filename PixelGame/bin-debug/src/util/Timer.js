/**
 *
 * @author
 *
 */
var Timer = (function () {
    function Timer(container) {
        Timer.instance = this;
        this.arr = new Array();
        container.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    }
    var __egretProto__ = Timer.prototype;
    Timer.addTimer = function (time, count, backFun, thisObject, data) {
        var vo = new TimerVO();
        vo.nextTime = egret.getTimer() + time;
        vo.handler = backFun;
        vo.count = count;
        vo.thisObject = thisObject;
        vo.data = data;
        vo.interval = time;
        vo.isInfinite = count < 0;
        Timer.instance.arr.push(vo);
        return vo;
    };
    __egretProto__.update = function () {
        if (this.arr.length > 0) {
            var time = egret.getTimer();
            this.arr.forEach(function (value, index, thisobj) {
                if (value.nextTime <= time && !value.isRemoved) {
                    value.handler.call(value.thisObject, value.data);
                    value.nextTime = time + value.interval;
                    if (!value.isInfinite) {
                        value.count--;
                        if (value.count <= 0) {
                            value.isRemoved = true;
                            Timer.removeTimer(value);
                        }
                    }
                }
            }, this);
        }
    };
    Timer.removeTimer = function (vo) {
        if (Timer.instance.arr.indexOf(vo) >= 0)
            Timer.instance.arr.splice(Timer.instance.arr.indexOf(vo), 1);
    };
    return Timer;
})();
Timer.prototype.__class__ = "Timer";
var TimerVO = (function () {
    function TimerVO() {
        this.isRemoved = false;
    }
    var __egretProto__ = TimerVO.prototype;
    return TimerVO;
})();
TimerVO.prototype.__class__ = "TimerVO";
