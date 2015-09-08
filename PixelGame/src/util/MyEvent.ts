class MyEvent {
    
    public static arr: Array<EventObject>;
    
    /**
    * 绑定事件到指定信号
    */
    public static bind(triggerName: string, target: Function, thisObject: any, replace: boolean = false): void {
        if (!MyEvent.arr) {
            MyEvent.arr = [];
        }
        
        if(replace){
            MyEvent.unbindAll(triggerName);
        }
        
        var eo = new EventObject(triggerName, target, thisObject);
        MyEvent.arr.push(eo);
    }
    
    /**
    * 解绑事件
    */
    public static unbind(triggerName: string, target:Function = null): void{
        if (!MyEvent.arr) {
            return;
        }
        if (target) {
            for (var i = 0; i < MyEvent.arr.length; i++) {
                if (MyEvent.arr[i].triggerName == triggerName && MyEvent.arr[i].target == target) {
                    MyEvent.arr.splice(i, 1);
                    break;
                }
            }
        } else {
            for (var i = 0; i < MyEvent.arr.length; i++) {
                if (MyEvent.arr[i].triggerName == triggerName) {
                    MyEvent.arr.splice(i, 1);
                    break;
                }
            }
        }
    }
    
    /**
    * 解绑信号所有事件
    */
    public static unbindAll(triggerName: string, target: Function = null): void{
        if (!MyEvent.arr) {
            return;
        }
        
        if (target) {
            for (var i = 0; i < MyEvent.arr.length; i++) {
                if (MyEvent.arr[i].triggerName == triggerName && MyEvent.arr[i].target == target) {
                    MyEvent.arr.splice(i, 1);
                    i--;
                }
            }
        } else {
            for (var i = 0; i < MyEvent.arr.length; i++) {
                if (MyEvent.arr[i].triggerName == triggerName) {
                    MyEvent.arr.splice(i, 1);
                    i--;
                }
            }
        }
    }
    
    /**
    * 调用事件
    */
    public static call(triggerName: string, data:any = null) : void{
        for (var i = 0; i < MyEvent.arr.length; i++) {
            if (MyEvent.arr[i].triggerName == triggerName) {
                MyEvent.arr[i].target.call(MyEvent.arr[i].thisObject,data);
            }
        }
    }
}

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