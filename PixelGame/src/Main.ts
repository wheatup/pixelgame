class Main extends egret.DisplayObjectContainer {
    private static main: Main;
    public static LAYER_BOTTOM: number = 0;
    public static LAYER_GAME: number = 1;
    public static LAYER_GUI: number = 2;
    public static LAYER_TOP: number = 3;
    
    private layers: Array<egret.DisplayObjectContainer>;
    private loadingScene:LoadingScene;
    
    public constructor() {
        super();
        Main.main = this;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        new Timer(this);
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        this.layers = new Array<egret.DisplayObjectContainer>();
        //游戏场景层，游戏场景相关内容可以放在这里面。
        //Game scene layer, the game content related to the scene can be placed inside this layer.
        this.layers[Main.LAYER_BOTTOM] = new egret.DisplayObjectContainer();
        this.addChild(this.layers[Main.LAYER_BOTTOM]);
        this.layers[Main.LAYER_GAME] = new egret.DisplayObjectContainer();
        this.addChild(this.layers[Main.LAYER_GAME]);
        this.layers[Main.LAYER_GUI] = new egret.DisplayObjectContainer();
        this.addChild(this.layers[Main.LAYER_GUI]);
        this.layers[Main.LAYER_TOP] = new egret.DisplayObjectContainer();
        this.addChild(this.layers[Main.LAYER_TOP]);
        
        
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
        this.loadingScene = new LoadingScene();
        Main.addScene(Main.LAYER_GUI, this.loadingScene);
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onPreloadConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onPreloadResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onPreloadResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onPreloadResourceLoadProgress, this);
        RES.loadGroup("preload");
    }

    private onPreloadResourceLoadProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingScene.setProgress(event.itemsLoaded, event.itemsTotal);
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
            Timer.addTimer(1000,1,() => {
                Main.removeScene(Main.main.loadingScene);
                this.createScene();
            }, this);
        }
    }
    
    /**
     * 在指定层添加场景
     */ 
    public static addScene(layer: number, scene: Scene):void{
        Main.main.layers[layer].addChild(scene);
        scene.start();
        Main.main.addEventListener(egret.Event.ENTER_FRAME, scene.update, scene);
    }
    
    /**
    * 移除场景
    */ 
    public static removeScene(scene: Scene): void{
        for(var i: number = 0;i < Main.main.layers.length; i++){
            if(Main.main.layers[i].contains(scene)){
                Main.main.layers[i].removeChild(scene);
                Main.main.removeEventListener(egret.Event.ENTER_FRAME, scene.update, scene);
                return;
            }
        }
        console.warn("unable to remove the scene");
    }

    private createScene():void {
        Main.addScene(Main.LAYER_GAME, new MainMenuScene());
    }
}


