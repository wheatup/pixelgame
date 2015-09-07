var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = Main.prototype;
    __egretProto__.onAddToStage = function (event) {
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        //egret.gui.Theme.load("resource/theme.thm");
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onLoadingConfigComplete, this);
        RES.loadConfig("resource/loading.json", "resource/");
    };
    __egretProto__.onLoadingConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onLoadingConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadingResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onLoadingResourceLoadError, this);
        RES.loadGroup("loading");
    };
    __egretProto__.onLoadingResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onLoadingResourceLoadComplete(event);
    };
    __egretProto__.onLoadingResourceLoadComplete = function (event) {
        if (event.groupName == "loading") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadingResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onLoadingResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onPreloadConfigComplete, this);
            RES.loadConfig("resource/resource.json", "resource/");
        }
    };
    __egretProto__.onPreloadConfigComplete = function (event) {
        this.loadingView = new LoadingScene();
        this.stage.addChild(this.loadingView);
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onPreloadConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onPreloadResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onPreloadResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onPreloadResourceLoadProgress, this);
        RES.loadGroup("preload");
    };
    __egretProto__.onPreloadResourceLoadProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    __egretProto__.onPreloadResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onPreloadResourceLoadComplete(event);
    };
    __egretProto__.onPreloadResourceLoadComplete = function (event) {
        var _this = this;
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadingResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onPreloadResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onPreloadResourceLoadProgress, this);
            Timer.addTimer(2000, function (data) {
                alert(data);
                _this.stage.removeChild(_this.loadingView);
                _this.createScene();
            }, "998");
        }
    };
    __egretProto__.createScene = function () {
        //游戏场景层，游戏场景相关内容可以放在这里面。
        //Game scene layer, the game content related to the scene can be placed inside this layer.
        this.bottomLayer = new egret.DisplayObjectContainer();
        this.addChild(this.bottomLayer);
        this.gameLayer = new egret.DisplayObjectContainer();
        this.addChild(this.gameLayer);
        this.guiLayer = new egret.DisplayObjectContainer();
        this.addChild(this.guiLayer);
        this.topLayer = new egret.DisplayObjectContainer();
        this.addChild(this.topLayer);
        var mainMenu = new MainMenuScene();
        this.gameLayer.addChild(mainMenu);
    };
    return Main;
})(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
