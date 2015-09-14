/**
 *
 * @author wheatup
 * 工具函数
 *
 */
class Util {
    /**
     * 将日期转化为hh:mm:ss格式
     */ 
    public static toTimeString(date:Date): string{
        var str = (date.getHours() < 10 ? "0" : "") + date.getHours() + ":"
            + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes() + ":"
            + (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
        return str;
    }
    
    /**
     * 取最大和最小值之间
     */ 
    public static clip(value: number, min:number, max:number): number{
        return value < min ? min : (value > max ? max : value);
    }
    
    public static centerPivot(element: any): void{
        element.anchorX = 0.5;
        element.anchorY = 0.5;
        element.x += Math.round(element.width / 2);
        element.y += Math.round(element.height / 2);
    }
}

interface DeviceOrientationEvent extends Event {
    webkitCompassHeading:number;
    webkitCompassAccuracy:number;
}