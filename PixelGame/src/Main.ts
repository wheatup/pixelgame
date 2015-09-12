class Main extends egret.DisplayObjectContainer {
    public static main: Main;
    public static LAYER_BOTTOM: number = 0;
    public static LAYER_GAME: number = 1;
    public static LAYER_GUI: number = 2;
    public static LAYER_TOP: number = 3;
    public static LAYER_MASK: number = 4;
    
    public static TRANSTION_TIME: number = 2000;
    
    public static layers: Array<egret.DisplayObjectContainer>;
    private loadingScene:LoadingScene;
    
    private curtain: BGScene;
    
    public constructor() {
        super();
        Main.main = this;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    
    private onAddToStage(event:egret.Event) {
        //初始化时间管理器
        new Timer(this);
        //初始化音频播放器
        Sound.init();
        //初始化素材解析器
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        //初始化所有显示层
        Main.layers = new Array<egret.DisplayObjectContainer>();
        Main.layers[Main.LAYER_BOTTOM] = new egret.DisplayObjectContainer();
        this.addChild(Main.layers[Main.LAYER_BOTTOM]);
        Main.layers[Main.LAYER_GAME] = new egret.DisplayObjectContainer();
        this.addChild(Main.layers[Main.LAYER_GAME]);
        Main.layers[Main.LAYER_GUI] = new egret.DisplayObjectContainer();
        this.addChild(Main.layers[Main.LAYER_GUI]);
        Main.layers[Main.LAYER_TOP] = new egret.DisplayObjectContainer();
        this.addChild(Main.layers[Main.LAYER_TOP]);
        Main.layers[Main.LAYER_MASK] = new egret.DisplayObjectContainer();
        this.addChild(Main.layers[Main.LAYER_MASK]);
        
        //加载载入界面资源
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
        Main.addScene(Main.LAYER_GUI, this.loadingScene, true);
        this.curtain = new BGScene();
        Main.layers[Main.LAYER_MASK].addChild(this.curtain);
        this.curtain.bg.alpha = 0;
        
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
            Main.removeScene(Main.main.loadingScene);
            this.start();
        }
    }
    
    /**
    * 在指定层添加场景
    */ 
    public static addScene(layer: number, scene: Scene, immediate: boolean = false):void{
        if(scene.added){
            return;
        }
        
        scene.added = true;
        if(immediate) {
            Main.layers[layer].addChild(scene);
            scene.start();
            Main.main.addEventListener(egret.Event.ENTER_FRAME,scene.update,scene);
        } else {
            Timer.addTimer(Main.TRANSTION_TIME * 0.5,1,() => {
                Main.layers[layer].addChild(scene);
                scene.start();
                Main.main.addEventListener(egret.Event.ENTER_FRAME,scene.update,scene);
            },this);
        }
    }
    
    public static transit():void{
        Main.main.curtain.transit();
    }
        
    /**
    * 移除场景
    */ 
    public static removeScene(scene: Scene): void{
        if(scene.removed)
            return;
        scene.removed = true;
        
        for(var i: number = 0;i < Main.layers.length; i++){
            if(Main.layers[i].contains(scene)){
                scene.onRemove();
                Timer.addTimer(Main.TRANSTION_TIME * 0.5,1,() => {
                    scene.onDestroy();
                    Main.layers[i].removeChild(scene);
                    Main.main.removeEventListener(egret.Event.ENTER_FRAME,scene.update,scene);
                },this);
                return;
            }
        }
        Debug.log("unable to remove the scene");
    }
    
    //游戏开始
    private start():void {
        //初始化对话
        Dialogue.init();
        
        if(egret.MainContext.deviceType != egret.MainContext.DEVICE_MOBILE) {
            Sound.playBGM("sound_dance");
        }
        //添加背景层
        Main.addScene(Main.LAYER_BOTTOM,new BGScene(),true);
        
        //添加警告层
        var warningScene: WarningScene = new WarningScene();
        Main.addScene(Main.LAYER_GAME, warningScene);
        //测试
        //Main.addScene(Main.LAYER_GAME, new ScenarioRoad());
        Main.transit();
        
        //添加对话层
        var dialogueScene: DialogueScene = new DialogueScene();
        Main.addScene(Main.LAYER_GUI, dialogueScene, true);
    }
}


