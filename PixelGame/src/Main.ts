class Main extends egret.DisplayObjectContainer {
    private bottomLayer:egret.DisplayObjectContainer;
    private gameLayer:egret.DisplayObjectContainer;
    private guiLayer:egret.DisplayObjectContainer;
    private topLayer:egret.DisplayObjectContainer;
    
    private loadingView:LoadingScene;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        //egret.gui.Theme.load("resource/theme.thm");
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onLoadingConfigComplete, this);
        RES.loadConfig("resource/loading.json", "resource/");
    }

    private onLoadingConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onLoadingConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadingResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onLoadingResourceLoadError, this);
        RES.loadGroup("loading");
    }
    
    private onLoadingResourceLoadError(event:RES.ResourceEvent):void {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onLoadingResourceLoadComplete(event);
    }

    private onLoadingResourceLoadComplete(event: RES.ResourceEvent): void {
        if(event.groupName == "loading") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadingResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onLoadingResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onPreloadConfigComplete, this);
            RES.loadConfig("resource/resource.json", "resource/");
        }
    }
    
    private onPreloadConfigComplete(event:RES.ResourceEvent):void {
        this.loadingView = new LoadingScene();
        this.stage.addChild(this.loadingView);
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onPreloadConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onPreloadResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onPreloadResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onPreloadResourceLoadProgress, this);
        RES.loadGroup("preload");
    }

    private onPreloadResourceLoadProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    
    private onPreloadResourceLoadError(event:RES.ResourceEvent):void {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onPreloadResourceLoadComplete(event);
    }
    private onPreloadResourceLoadComplete(event: RES.ResourceEvent): void {
        if(event.groupName == "preload"){
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadingResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onPreloadResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onPreloadResourceLoadProgress, this);
            Timer.addTimer(2000,(data:any) => {
                alert(data);
                this.stage.removeChild(this.loadingView);
                this.createScene();
            },"998");
            
        }
    }

    private createScene():void {

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

        var mainMenu: MainMenuScene = new MainMenuScene();
        this.gameLayer.addChild(mainMenu);
    }


}


