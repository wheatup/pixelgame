/**
 *
 * @author 
 *
 */
class Util {
    public static toTimeString(date:Date): string{
        var str = (date.getHours() < 10 ? "0" : "") + date.getHours() + ":" + 
            (date.getMinutes() < 10 ? "0" : "") + date.getMinutes() + ":" + 
        (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
        
        return str;
    }
}
