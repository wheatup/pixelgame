var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        Main.main = this;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = Main.prototype;
    __egretProto__.onAddToStage = function (event) {
        //初始化时间管理器
        new Timer(this);
        //初始化音频播放器
        Sound.init();
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
        scene.added = true;
        if (immediate) {
            Main.layers[layer].addChild(scene);
            scene.start();
            Main.main.addEventListener(egret.Event.ENTER_FRAME, scene.update, scene);
        }
        else {
            Timer.addTimer(Main.TRANSTION_TIME * 0.5, 1, function () {
                Main.layers[layer].addChild(scene);
                scene.start();
                Main.main.addEventListener(egret.Event.ENTER_FRAME, scene.update, scene);
            }, this);
        }
    };
    Main.transit = function () {
        Main.main.curtain.transit();
    };
    /**
    * 移除场景
    */
    Main.removeScene = function (scene) {
        if (scene.removed)
            return;
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
        //初始化对话
        Dialogue.init();
        if (egret.MainContext.deviceType != egret.MainContext.DEVICE_MOBILE) {
            Sound.playBGM("sound_dance");
        }
        //添加背景层
        Main.addScene(Main.LAYER_BOTTOM, new BGScene(), true);
        //添加警告层
        var warningScene = new WarningScene();
        Main.addScene(Main.LAYER_GAME, warningScene);
        //测试
        //        Main.addScene(Main.LAYER_GAME, new ScenarioRoad());
        Main.transit();
        //添加对话层
        var dialogueScene = new DialogueScene();
        Main.addScene(Main.LAYER_GUI, dialogueScene, true);
    };
    Main.LAYER_BOTTOM = 0;
    Main.LAYER_GAME = 1;
    Main.LAYER_GUI = 2;
    Main.LAYER_TOP = 3;
    Main.LAYER_MASK = 4;
    Main.tick = 0;
    Main.TRANSTION_TIME = 2000;
    return Main;
})(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
//# sourceMappingURL=Main.js.map