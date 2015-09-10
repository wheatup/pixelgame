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
        //初始化素材解析器
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        //初始化所有显示层
        this.layers = new Array();
        this.layers[Main.LAYER_BOTTOM] = new egret.DisplayObjectContainer();
        this.addChild(this.layers[Main.LAYER_BOTTOM]);
        this.layers[Main.LAYER_GAME] = new egret.DisplayObjectContainer();
        this.addChild(this.layers[Main.LAYER_GAME]);
        this.layers[Main.LAYER_GUI] = new egret.DisplayObjectContainer();
        this.addChild(this.layers[Main.LAYER_GUI]);
        this.layers[Main.LAYER_TOP] = new egret.DisplayObjectContainer();
        this.addChild(this.layers[Main.LAYER_TOP]);
        this.layers[Main.LAYER_MASK] = new egret.DisplayObjectContainer();
        this.addChild(this.layers[Main.LAYER_MASK]);
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
        Main.main.layers[Main.LAYER_MASK].addChild(this.curtain);
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
        if (immediate) {
            Main.main.layers[layer].addChild(scene);
            scene.start();
            Main.main.addEventListener(egret.Event.ENTER_FRAME, scene.update, scene);
        }
        else {
            Main.main.curtain.transit();
            Timer.addTimer(Main.TRANSTION_TIME * 0.5, 1, function () {
                Main.main.layers[layer].addChild(scene);
                scene.start();
                Main.main.addEventListener(egret.Event.ENTER_FRAME, scene.update, scene);
            }, this);
        }
    };
    /**
    * 移除场景
    */
    Main.removeScene = function (scene) {
        for (var i = 0; i < Main.main.layers.length; i++) {
            if (Main.main.layers[i].contains(scene)) {
                Timer.addTimer(Main.TRANSTION_TIME * 0.5, 1, function () {
                    scene.removed = true;
                    Main.main.layers[i].removeChild(scene);
                    scene.onRemove();
                    Main.main.removeEventListener(egret.Event.ENTER_FRAME, scene.update, scene);
                }, this);
                return;
            }
        }
        Debug.log("unable to remove the scene");
    };
    /**
    * 添加粒子发射器
    */
    Main.addParticleEmitter = function (particle, layer) {
        Main.main.layers[layer].addChild(particle);
    };
    /**
    * 移除粒子发射器
    */
    Main.removeParticleEmitter = function (particle) {
        for (var i = 0; i < Main.main.layers.length; i++) {
            if (Main.main.layers[i].contains(particle)) {
                Main.main.layers[i].removeChild(particle);
                return;
            }
        }
    };
    //游戏开始
    __egretProto__.start = function () {
        //添加背景层
        Main.addScene(Main.LAYER_BOTTOM, new BGScene(), true);
        //添加警告层
        var warningScene = new WarningScene();
        Main.addScene(Main.LAYER_GAME, warningScene);
    };
    Main.LAYER_BOTTOM = 0;
    Main.LAYER_GAME = 1;
    Main.LAYER_GUI = 2;
    Main.LAYER_TOP = 3;
    Main.LAYER_MASK = 4;
    Main.TRANSTION_TIME = 2000;
    return Main;
})(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
//# sourceMappingURL=Main.js.map