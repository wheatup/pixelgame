/**
*
* @author wheatup
* 自定义事件系统
*
*/
var WheatupEvent = (function () {
    function WheatupEvent() {
    }
    var __egretProto__ = WheatupEvent.prototype;
    /**
    * 绑定事件到指定信号
    */
    WheatupEvent.bind = function (triggerName, target, thisObject, replace) {
        if (replace === void 0) { replace = false; }
        if (!WheatupEvent.arr) {
            WheatupEvent.arr = [];
        }
        if (replace) {
            WheatupEvent.unbindAll(triggerName);
        }
        var eo = new EventObject(triggerName, target, thisObject);
        WheatupEvent.arr.push(eo);
    };
    /**
    * 解绑事件
    */
    WheatupEvent.unbind = function (triggerName, target) {
        if (target === void 0) { target = null; }
        if (!WheatupEvent.arr) {
            return;
        }
        if (target) {
            for (var i = 0; i < WheatupEvent.arr.length; i++) {
                if (WheatupEvent.arr[i].triggerName == triggerName && WheatupEvent.arr[i].target == target) {
                    WheatupEvent.arr.splice(i, 1);
                    break;
                }
            }
        }
        else {
            for (var i = 0; i < WheatupEvent.arr.length; i++) {
                if (WheatupEvent.arr[i].triggerName == triggerName) {
                    WheatupEvent.arr.splice(i, 1);
                    break;
                }
            }
        }
    };
    /**
    * 解绑信号所有事件
    */
    WheatupEvent.unbindAll = function (triggerName, target) {
        if (target === void 0) { target = null; }
        if (!WheatupEvent.arr) {
            return;
        }
        if (target) {
            for (var i = 0; i < WheatupEvent.arr.length; i++) {
                if (WheatupEvent.arr[i].triggerName == triggerName && WheatupEvent.arr[i].target == target) {
                    WheatupEvent.arr.splice(i, 1);
                    i--;
                }
            }
        }
        else {
            for (var i = 0; i < WheatupEvent.arr.length; i++) {
                if (WheatupEvent.arr[i].triggerName == triggerName) {
                    WheatupEvent.arr.splice(i, 1);
                    i--;
                }
            }
        }
    };
    /**
    * 调用事件
    */
    WheatupEvent.call = function (triggerName, data) {
        if (data === void 0) { data = null; }
        if (WheatupEvent.debugMode)
            Debug.log("事件:" + triggerName + (data ? ":" + data : ""));
        for (var i = 0; i < WheatupEvent.arr.length; i++) {
            if (WheatupEvent.arr[i].triggerName == triggerName) {
                WheatupEvent.arr[i].target.call(WheatupEvent.arr[i].thisObject, data);
            }
        }
    };
    WheatupEvent.debugMode = true;
    return WheatupEvent;
})();
WheatupEvent.prototype.__class__ = "WheatupEvent";
/**
 * 事件对象
 */
var EventObject = (function () {
    function EventObject(triggerName, target, thisObject) {
        this.triggerName = triggerName;
        this.target = target;
        this.thisObject = thisObject;
    }
    var __egretProto__ = EventObject.prototype;
    return EventObject;
})();
EventObject.prototype.__class__ = "EventObject";
//# sourceMappingURL=WheatupEvent.js.map