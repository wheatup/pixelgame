/**
 *
 * @author wheatup
 * 第五幕游戏场景
 * 房间
 *
 */
var ScenarioRoom = (function (_super) {
    __extends(ScenarioRoom, _super);
    function ScenarioRoom() {
        _super.call(this, "skins.scenario.ScenarioRoomSkin");
        this.tick = 0;
        this.forDoor = false;
        this.forCloset = false;
        this.forTrapdoor = false;
        this.forBook = false;
        this.touchedCloset = false;
        this.hided = false;
        this.terrain = new Terrain(this, "2,437 81,379 106,361 303,365 337,336 604,336 623,400 802,399 802,479 2,479", 800, 480);
    }
    var __egretProto__ = ScenarioRoom.prototype;
    __egretProto__.init = function () {
        this.grp_game = this.ui["grp_game"];
        this.grp_game.touchChildren = false;
        this.grp_touch = this.ui["grp_touch"];
        //初始化判定区域
        this.box_scene = this.ui["box_scene"];
        this.box_door = this.ui["box_door"];
        this.box_closet = this.ui["box_closet"];
        this.box_trapdoor = this.ui["box_trapdoor"];
        this.box_book = this.ui["box_book"];
        //添加粒子
        this.grp_particle = this.ui["grp_particle"];
        var texture = RES.getRes("par_fire");
        var config = RES.getRes("par_fire_json");
        this.particle = new particle.GravityParticleSystem(texture, config);
        this.grp_particle.blendMode = egret.BlendMode.ADD;
        this.grp_particle.addElement(this.particle);
        this.particle.start();
        this.ui["img_candlelight"].alpha = 0.5;
        this.ui["img_candlelight"].anchorX = 0.5;
        this.ui["img_candlelight"].anchorY = 0.5;
        this.ui["img_candlelight"].x += this.ui["img_candlelight"].width / 2;
        this.ui["img_candlelight"].y += this.ui["img_candlelight"].height / 2;
        this.ui["img_candlelight"].scaleX = 1.5;
        this.ui["img_candlelight"].scaleY = 1.5;
        this.ui["img_candlelight"].blendMode = egret.BlendMode.ADD;
        egret.Tween.get(this.ui["img_candlelight"], { loop: true }).to({ alpha: 0.3, scaleX: 1, scaleY: 1 }, 1000).to({ alpha: 0.5, scaleX: 1.5, scaleY: 1.5 }, 1000);
        //创建玩家
        this.createPlayer(61, 417, this.ui["grp_playground"], 2);
        //this.drawGrid();
    };
    __egretProto__.clearForFlag = function () {
        this.forDoor = false;
        this.forCloset = false;
        this.forTrapdoor = false;
        this.forBook = false;
    };
    __egretProto__.bindEvents = function () {
        this.box_scene.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchScene, this);
        this.box_door.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDoor, this);
        this.box_closet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchCloset, this);
        this.box_trapdoor.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTrapdoor, this);
        this.box_book.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBook, this);
        WheatupEvent.bind(EventType.DIALOGUE_END, this.onDialogueEnd, this);
        WheatupEvent.bind(EventType.ARRIVE, this.onArrive, this);
        WheatupEvent.bind(EventType.SELECT_CHOICE, this.onSelectChoice, this);
    };
    __egretProto__.unbindEvents = function () {
        this.box_scene.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchScene, this);
        this.box_door.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDoor, this);
        this.box_closet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchCloset, this);
        this.box_trapdoor.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTrapdoor, this);
        this.box_book.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBook, this);
        WheatupEvent.unbind(EventType.DIALOGUE_END, this.onDialogueEnd);
        WheatupEvent.unbind(EventType.ARRIVE, this.onArrive);
        WheatupEvent.unbind(EventType.SELECT_CHOICE, this.onSelectChoice);
    };
    __egretProto__.onRemove = function () {
        this.unbindEvents();
    };
    __egretProto__.start = function () {
        this.getConditions();
        this.bindEvents();
    };
    __egretProto__.getConditions = function () {
    };
    __egretProto__.update = function () {
        var distX = this.grp_particle.x - this.player.getX();
        var distY = this.grp_particle.y - (this.player.getY() - this.player.width / 2);
        var dist = Math.sqrt(distX * distX + distY * distY);
        this.player.setBrightness(0.2 + 1 / (dist / 60));
    };
    __egretProto__.touchScene = function (event) {
        if (Main.free) {
            this.clearForFlag();
            var x = event.localX;
            var y = event.localY;
            if (this.terrain.isInPolygon(x, y)) {
                this.player.onGridClick(x, y, this.ui["grp_bg1"]);
            }
        }
        event.stopPropagation();
    };
    __egretProto__.touchDoor = function (event) {
        if (Main.free) {
            this.clearForFlag();
            this.forDoor = true;
            this.player.onGridClick(61, 417, this.ui["grp_bg1"]);
        }
        event.stopPropagation();
    };
    __egretProto__.touchCloset = function (event) {
        if (Main.free) {
            this.clearForFlag();
            this.forCloset = true;
            this.player.onGridClick(480, 346, this.ui["grp_bg1"]);
        }
        else if (this.hided) {
            Main.uiScene.showChoice("ComeOutOfCloset");
        }
        event.stopPropagation();
    };
    __egretProto__.touchTrapdoor = function (event) {
        if (Main.free) {
            this.clearForFlag();
            this.forTrapdoor = true;
            this.player.onGridClick(602, 364, this.ui["grp_bg1"]);
        }
        event.stopPropagation();
    };
    __egretProto__.touchBook = function (event) {
        if (Main.free) {
            this.clearForFlag();
            this.forBook = true;
            this.player.onGridClick(327, 355, this.ui["grp_bg1"]);
        }
        event.stopPropagation();
    };
    __egretProto__.onDialogueEnd = function (data) {
        if (data == "closet" && !this.touchedCloset) {
            this.touchedCloset = true;
            Main.uiScene.showChoice("HideInCloset");
        }
    };
    __egretProto__.onSelectChoice = function (data) {
        if (data.choice == null)
            return;
        if (data.choice.key == "HideInCloset") {
            if (data.select == 1) {
                this.hideInCloset();
            }
        }
        else if (data.choice.key == "ComeOutOfCloset") {
            if (data.select == 1) {
                this.comeOutOfCloset();
            }
        }
    };
    __egretProto__.hideInCloset = function () {
        if (!this.hided) {
            this.hided = true;
            this.player.hide();
            Main.free = false;
        }
    };
    __egretProto__.comeOutOfCloset = function () {
        if (this.hided) {
            this.hided = false;
            this.player.show();
            Main.free = true;
        }
    };
    __egretProto__.onArrive = function (data) {
        if (this.forDoor) {
            Main.transit(500);
            Main.removeScene(this);
            Main.addScene(Main.LAYER_GAME, Main.scenarioCabin);
            Main.scenarioJungle.setPlayerPosition(1803, 342);
        }
        else if (this.forCloset) {
            if (!this.touchedCloset) {
                DialogueScene.showDialogue("closet");
            }
            else if (!this.hided) {
                Main.uiScene.showChoice("HideInCloset");
            }
        }
        else if (this.forTrapdoor) {
            DialogueScene.showDialogue("trapdoor");
        }
        else if (this.forBook) {
            Main.transit(500);
            Main.addScene(Main.LAYER_GAME, Main.bookScene);
        }
    };
    return ScenarioRoom;
})(Scenario);
ScenarioRoom.prototype.__class__ = "ScenarioRoom";
//# sourceMappingURL=ScenarioRoom.js.map