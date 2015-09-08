var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        Main.main = this;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = Main.prototype;
    __egretProto__.onAddToStage = function (event) {
        new Timer(this);
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        this.layers = new Array();
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
        Main.addScene(Main.LAYER_GUI, this.loadingScene);
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
        var _this = this;
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadingResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onPreloadResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onPreloadResourceLoadProgress, this);
            Timer.addTimer(1000, 1, function () {
                Main.removeScene(Main.main.loadingScene);
                _this.createScene();
            }, this);
        }
    };
    /**
     * 在指定层添加场景
     */
    Main.addScene = function (layer, scene) {
        Main.main.layers[layer].addChild(scene);
        scene.start();
        Main.main.addEventListener(egret.Event.ENTER_FRAME, scene.update, scene);
    };
    /**
    * 移除场景
    */
    Main.removeScene = function (scene) {
        for (var i = 0; i < Main.main.layers.length; i++) {
            if (Main.main.layers[i].contains(scene)) {
                Main.main.layers[i].removeChild(scene);
                Main.main.removeEventListener(egret.Event.ENTER_FRAME, scene.update, scene);
                return;
            }
        }
        console.warn("unable to remove the scene");
    };
    __egretProto__.createScene = function () {
        Main.addScene(Main.LAYER_GAME, new MainMenuScene());
    };
    Main.LAYER_BOTTOM = 0;
    Main.LAYER_GAME = 1;
    Main.LAYER_GUI = 2;
    Main.LAYER_TOP = 3;
    return Main;
})(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
//# sourceMappingURL=Main.js.map