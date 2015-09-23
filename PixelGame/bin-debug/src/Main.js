var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        Main.main = this;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        Main.bgScene = new BGScene();
        Main.dialogueScene = new DialogueScene();
        Main.warningScene = new WarningScene();
        Main.mainMenuScene = new MainMenuScene();
        Main.scenarioIntro = new ScenarioIntro();
        Main.scenarioRoad = new ScenarioRoad();
        Main.scenarioBush = new ScenarioBush();
        Main.scenarioJungle = new ScenarioJungle();
        Main.scenarioRoom = new ScenarioRoom();
        Main.scenarioCabin = new ScenarioCabin();
        Main.trunkScene = new TrunkScene();
        Main.cellphoneScene = new CellphoneScene();
        Main.uiScene = new UIScene();
        Main.bookScene = new BookScene();
    }
    var __egretProto__ = Main.prototype;
    __egretProto__.onAddToStage = function (event) {
        //初始化时间管理器
        new Timer(this);
        //初始化音频播放器
        Sound.init();
        //初始化对话
        Dialogue.init();
        //初始化信息
        Message.init();
        //初始化地标
        Landmark.init();
        //初始化选择分支
        Choice.init();
        //初始化素材解析器
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        //初始化所有显示层
        Main.layers = new Array();
        Main.layers[Main.LAYER_BOTTOM] = new egret.DisplayObjectContainer();
        this.addChild(Main.layers[Main.LAYER_BOTTOM]);
        Main.layers[Main.LAYER_GAME] = new egret.DisplayObjectContainer();
        this.addChild(Main.layers[Main.LAYER_GAME]);
        Main.layers[Main.LAYER_GUI] = new egret.DisplayObjectContainer();
        this.addChild(Main.layers[Main.LAYER_GUI]);
        Main.layers[Main.LAYER_DIALOGUE] = new egret.DisplayObjectContainer();
        this.addChild(Main.layers[Main.LAYER_DIALOGUE]);
        Main.layers[Main.LAYER_TOP] = new egret.DisplayObjectContainer();
        this.addChild(Main.layers[Main.LAYER_TOP]);
        Main.layers[Main.LAYER_MASK] = new egret.DisplayObjectContainer();
        this.addChild(Main.layers[Main.LAYER_MASK]);
        Main.main.addEventListener(egret.Event.ENTER_FRAME, function () {
            Main.tick++;
        }, this);
        //加载载入界面资源
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
    };
    __egretProto__.onPreloadResourceLoadProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingScene.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    __egretProto__.onPreloadResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onPreloadResourceLoadComplete(event);
    };
    __egretProto__.onPreloadResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadingResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onPreloadResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onPreloadResourceLoadProgress, this);
            Main.removeScene(Main.main.loadingScene);
            this.start();
        }
    };
    /**
    * 在指定层添加场景
    */
    Main.addScene = function (layer, scene, immediate) {
        if (immediate === void 0) { immediate = false; }
        if (scene.added) {
            return;
        }
        scene.removed = false;
        scene.added = true;
        scene.visible = false;
        Main.layers[layer].addChild(scene);
        Main.main.addEventListener(egret.Event.ENTER_FRAME, scene.update, scene);
        if (immediate) {
            scene.visible = true;
            scene.start();
        }
        else {
            Timer.addTimer(Main.TRANSTION_TIME * 0.5, 1, function () {
                scene.visible = true;
                scene.start();
            }, this);
        }
    };
    Main.transit = function (delay) {
        if (delay) {
            Main.TRANSTION_TIME = delay;
        }
        Main.main.curtain.transit();
    };
    /**
    * 移除场景
    */
    Main.removeScene = function (scene) {
        if (scene.removed)
            return;
        scene.added = false;
        scene.removed = true;
        for (var i = 0; i < Main.layers.length; i++) {
            if (Main.layers[i].contains(scene)) {
                scene.onRemove();
                Timer.addTimer(Main.TRANSTION_TIME * 0.5, 1, function () {
                    scene.onDestroy();
                    Main.layers[i].removeChild(scene);
                    Main.main.removeEventListener(egret.Event.ENTER_FRAME, scene.update, scene);
                }, this);
                return;
            }
        }
        Debug.log("unable to remove the scene");
    };
    //游戏开始
    __egretProto__.start = function () {
        if (egret.MainContext.deviceType != egret.MainContext.DEVICE_MOBILE) {
            Sound.playBGM("sound_dance");
        }
        //添加背景层
        Main.addScene(Main.LAYER_BOTTOM, Main.bgScene, true);
        //进入游戏
        if (Main.debugMode) {
            Main.free = true;
            Main.addScene(Main.LAYER_GAME, Main.scenarioRoom);
        }
        else {
            Main.addScene(Main.LAYER_GAME, Main.warningScene);
        }
        Main.transit();
        //创建GUI
        Main.addScene(Main.LAYER_GUI, Main.uiScene);
        //添加对话层
        Main.addScene(Main.LAYER_DIALOGUE, Main.dialogueScene, true);
    };
    Main.LANG = "CH";
    Main.debugMode = false;
    Main.LAYER_BOTTOM = 0;
    Main.LAYER_GAME = 1;
    Main.LAYER_GUI = 2;
    Main.LAYER_DIALOGUE = 3;
    Main.LAYER_TOP = 4;
    Main.LAYER_MASK = 5;
    Main.tick = 0;
    Main.free = false;
    Main.TRANSTION_TIME = 2000;
    return Main;
})(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
//# sourceMappingURL=Main.js.map