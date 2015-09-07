/**
 *
 * @author 
 *
 */
class Timer {
	public static addTimer(time: number, handler: Function, data?:any):void{
        setTimeout(handler,time,data);
	}
}
