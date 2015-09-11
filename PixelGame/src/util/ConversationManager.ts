/**
 *
 * 剧情对白数据管理器
 * @author Xhacker
 * 2015.9.11
 *
 */
class ConversationManager {
       
    private static instance: ConversationManager;  
    private m_Data: any;
    
	public constructor() {
    	           
        ConversationManager.instance = this;
    	
	}
	
	public setData(data){
        this.m_Data = data;
	}
	
	public getData(){
        return this.m_Data;
	}

    public static Init(){

         //TODO: 把xml读进来形成数据结构，直接按Id取对话文件
        
        var loader: egret.URLLoader = new egret.URLLoader();   
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE,ConversationManager.onLoadComplete,this);
        var url: string = "resource/assets/xmlData/example.xml";
        var request: egret.URLRequest = new egret.URLRequest(url);
        //开始加载
        loader.load(request);
    }
	
	public static onLoadComplete(event:egret.Event):void{
    	
       
        Debug.log("xml文件读取完毕");
        var loader:egret.URLLoader = <egret.URLLoader>event.target;
        var text: string = loader.data;
        Debug.log(text);
        
        var theData = egret.XML.parse(text);
        

        ConversationManager.instance.setData(theData);
       
        
	}
	
	public static getConverDatabyPlotId(id:string){
    
    	
        var JsonData = ConversationManager.instance.getData();
    
        var returnConv = [];
        for(var i: number = 0;i < JsonData.children.length; ++i){
                
            var plotList = JsonData.children;   
            var singlePlot = JsonData.children[i];

            if(singlePlot.$value == id)
            {
               returnConv = singlePlot.children;
            }
            
        }

        return returnConv;
        
	}
	

}
