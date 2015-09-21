/**
*
* @author wheatup
* 自定义事件系统
*
*/
class WheatupEvent {
    public static debugMode: boolean = true;
    public static arr: Array<EventObject>;
    
    /**
    * 绑定事件到指定信号
    */
    public static bind(triggerName: string, target: Function, thisObject: any, replace: boolean = false): void {
        if (!WheatupEvent.arr) {
            WheatupEvent.arr = [];
        }
        
        if(replace){
            WheatupEvent.unbindAll(triggerName);
        }
        
        var eo = new EventObject(triggerName, target, thisObject);
        WheatupEvent.arr.push(eo);
    }
    
    /**
    * 解绑事件
    */
    public static unbind(triggerName: string, target:Function = null): void{
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
        } else {
            for (var i = 0; i < WheatupEvent.arr.length; i++) {
                if (WheatupEvent.arr[i].triggerName == triggerName) {
                    WheatupEvent.arr.splice(i, 1);
                    break;
                }
            }
        }
    }
    
    /**
    * 解绑信号所有事件
    */
    public static unbindAll(triggerName: string, target: Function = null): void{
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
        } else {
            for (var i = 0; i < WheatupEvent.arr.length; i++) {
                if (WheatupEvent.arr[i].triggerName == triggerName) {
                    WheatupEvent.arr.splice(i, 1);
                    i--;
                }
            }
        }
    }
    
    /**
    * 调用事件
    */
    public static call(triggerName: string, data:any = null) : void{
        if(WheatupEvent.debugMode)
            Debug.log("事件:" + triggerName + (data ? ":" + data : ""));
        
        for (var i = 0; i < WheatupEvent.arr.length; i++) {
            if (WheatupEvent.arr[i].triggerName == triggerName) {
                WheatupEvent.arr[i].target.call(WheatupEvent.arr[i].thisObject,data);
            }
        }
    }
}

/**
 * 事件对象
 */ 
class EventObject {
    public triggerName: string;
    public target: Function;
    public thisObject: any;
    
    constructor(triggerName: string, target: Function, thisObject: any) {
        this.triggerName = triggerName;
        this.target = target;
        this.thisObject = thisObject;
    }
}