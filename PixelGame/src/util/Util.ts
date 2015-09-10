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
}

interface DeviceOrientationEvent extends Event {
    webkitCompassHeading:number;
    webkitCompassAccuracy:number;
}