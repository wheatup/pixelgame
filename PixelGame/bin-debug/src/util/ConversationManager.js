/**
 *
 * 剧情对白数据管理器
 * @author Xhacker
 * 2015.9.11
 *
 */
var ConversationManager = (function () {
    function ConversationManager() {
        ConversationManager.instance = this;
    }
    var __egretProto__ = ConversationManager.prototype;
    __egretProto__.setData = function (data) {
        this.m_Data = data;
    };
    __egretProto__.getData = function () {
        return this.m_Data;
    };
    ConversationManager.Init = function () {
        //TODO: 把xml读进来形成数据结构，直接按Id取对话文件
        var loader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, ConversationManager.onLoadComplete, this);
        var url = "resource/assets/xmlData/example.xml";
        var request = new egret.URLRequest(url);
        //开始加载
        loader.load(request);
    };
    ConversationManager.onLoadComplete = function (event) {
        Debug.log("xml文件读取完毕");
        var loader = event.target;
        var text = loader.data;
        Debug.log(text);
        var theData = egret.XML.parse(text);
        ConversationManager.instance.setData(theData);
    };
    ConversationManager.getConverDatabyPlotId = function (id) {
        var JsonData = ConversationManager.instance.getData();
        var returnConv = [];
        for (var i = 0; i < JsonData.children.length; ++i) {
            var plotList = JsonData.children;
            var singlePlot = JsonData.children[i];
            if (singlePlot.$value == id) {
                returnConv = singlePlot.children;
            }
        }
        return returnConv;
    };
    return ConversationManager;
})();
ConversationManager.prototype.__class__ = "ConversationManager";
