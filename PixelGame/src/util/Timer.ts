/**
 *
 * @author wheatup
 * 时间控制系统，用语循环、延时调用
 *
 */
class Timer {
    private static instance: Timer;
    private arr: Array<TimerVO>;
    public constructor(container: egret.DisplayObjectContainer){
        Timer.instance = this;
        this.arr = new Array<TimerVO>();
        container.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    }
    
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
    public static addTimer(time: number, count: number, backFun: Function, thisObject: any, data?:any): TimerVO {
        var vo: TimerVO = new TimerVO();
        vo.nextTime = egret.getTimer() + time;
        vo.handler = backFun;
        vo.count = count;
        vo.thisObject = thisObject;
        vo.data = data;
        vo.interval = time;
        vo.isInfinite = count < 0;
        Timer.instance.arr.push(vo);
        return vo;
    }
	
    /**
     * 游戏循环调用的方法
     */ 
	private update(): void{
        if(this.arr.length > 0) {
            var time: number = egret.getTimer();
            this.arr.forEach((value: TimerVO,index: number,thisobj: any) => {
                if(value.nextTime <= time && !value.isRemoved) {
                    value.handler.call(value.thisObject,value.data);
                    value.nextTime = time + value.interval;
                    if(!value.isInfinite) {
                        value.count--;
                        if(value.count <= 0) {
                            value.isRemoved = true;
                            Timer.removeTimer(value);
                        }
                    }
                }
            },this);
        }
	}
	
    /**
     * 移除一个定时器
     */ 
    public static removeTimer(vo: TimerVO): void {
        if(Timer.instance.arr.indexOf(vo) >= 0)
            Timer.instance.arr.splice(Timer.instance.arr.indexOf(vo),1);
    }
}

/**
 * 定时器类
 */ 
class TimerVO {
    public interval: number;
    public nextTime: number;
    public handler: Function;
    public count: number;
    public thisObject: any;
    public data: any;
    public isInfinite: boolean;
    public isRemoved: boolean = false;
}