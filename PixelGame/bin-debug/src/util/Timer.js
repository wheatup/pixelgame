/**
 *
 * @author wheatup
 * 时间控制系统，用语循环、延时调用
 *
 */
var Timer = (function () {
    function Timer(container) {
        Timer.instance = this;
        this.arr = new Array();
        container.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    }
    var __egretProto__ = Timer.prototype;
    /**
     * 创建定时器
     * @params:
     * time:延时时间
     * count:调用次数，小于0则无限调用
     * backFun:调用函数
     * thisObject:调用对象
     * data:传参
     *
     */
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
    /**
     * 游戏循环调用的方法
     */
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
    /**
     * 移除一个定时器
     */
    Timer.removeTimer = function (vo) {
        if (Timer.instance.arr.indexOf(vo) >= 0)
            Timer.instance.arr.splice(Timer.instance.arr.indexOf(vo), 1);
    };
    return Timer;
})();
Timer.prototype.__class__ = "Timer";
/**
 * 定时器类
 */
var TimerVO = (function () {
    function TimerVO() {
        this.isRemoved = false;
    }
    var __egretProto__ = TimerVO.prototype;
    return TimerVO;
})();
TimerVO.prototype.__class__ = "TimerVO";
//# sourceMappingURL=Timer.js.map