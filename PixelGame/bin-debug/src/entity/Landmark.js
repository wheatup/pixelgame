/**
 *
 * @author
 *
 */
var Landmark = (function (_super) {
    __extends(Landmark, _super);
    function Landmark(x, y) {
        _super.call(this);
        this.source = "landmark";
        this.width = 80;
        this.height = 36;
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.x = x;
        this.y = y;
        this.visible = false;
    }
    var __egretProto__ = Landmark.prototype;
    Landmark.init = function () {
        WheatupEvent.bind(EventType.ARRIVE, Landmark.onArrive, Landmark);
    };
    Landmark.onArrive = function (data) {
        if (Landmark.lastMark != null) {
            Landmark.lastMark.destroy(Landmark.lastContainer);
            Landmark.lastMark = null;
            Landmark.lastContainer = null;
        }
    };
    Landmark.addLandMark = function (group, x, y) {
        if (Landmark.lastContainer != null) {
            Landmark.lastMark.destroy(group);
        }
        var mark = new Landmark(x, y);
        Landmark.lastContainer = group;
        Landmark.lastMark = mark;
        group.addElement(mark);
        mark.playAnimation();
    };
    __egretProto__.playAnimation = function () {
        this.scaleX = 2;
        this.scaleY = 2;
        this.alpha = 0;
        this.visible = true;
        egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, alpha: 0.5 }, 250, egret.Ease.quadOut);
    };
    __egretProto__.destroy = function (group) {
        var _this = this;
        egret.Tween.get(this).to({ scaleX: 1.2, scaleY: 1.2, alpha: 0 }, 250, egret.Ease.quadOut);
        Timer.addTimer(250, 1, function () {
            group.removeElement(_this);
        }, this);
    };
    return Landmark;
})(egret.gui.UIAsset);
Landmark.prototype.__class__ = "Landmark";
//# sourceMappingURL=Landmark.js.map