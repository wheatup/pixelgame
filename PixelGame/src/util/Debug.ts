/**
 *
 * @author 
 *
 */
class Debug {
    public static debugMode: boolean = true;
    
	public static log(data?:any):void{
        if(!Debug.debugMode) return;
    	
	    if(data != null){
            console.log("[" + Util.toTimeString(new Date()) + "]" + data);
	    }else{
            console.log("[" + Util.toTimeString(new Date()) + "]");
	    }
	}
	
    public static alert(data?:any):void{
        if(!Debug.debugMode) return;
        
        if(data != null){
            alert("[" + Util.toTimeString(new Date()) + "]" + data);
        }else{
            alert("[" + Util.toTimeString(new Date()) + "]");
        }
    }
}
