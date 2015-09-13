/**
 *
 * @author wheatup
 * 动画类
 *
 */
var Animation = (function () {
    function Animation(name, imgCount, host, frame, loop, defaultPic) {
        if (loop === void 0) { loop = true; }
        if (defaultPic === void 0) { defaultPic = ""; }
        this.done = false;
        this.isStill = false;
        this.currentIndex = 0;
        this.name = name;
        this.imgs = [];
        for (var i = 0; i < imgCount; i++) {
            this.imgs[i] = name + "_" + i;
        }
        this.isStill = (imgCount == 1 || this.frame <= 1);
        this.loop = loop;
        this.host = host;
        this.frame = frame;
        this.defaultPic = defaultPic;
        this.length = imgCount;
    }
    var __egretProto__ = Animation.prototype;
    __egretProto__.play = function () {
        this.startTick = Main.tick;
        this.done = false;
        this.host.source = this.imgs[this.currentIndex];
    };
    __egretProto__.update = function () {
        if (this.isStill) {
            return;
        }
        else if ((Main.tick - this.startTick) % this.frame == 0) {
            this.host.source = this.getNextFrame();
        }
    };
    __egretProto__.getNextFrame = function () {
        if (this.done) {
            return this.defaultPic;
        }
        if (this.currentIndex == this.length - 1 && !this.loop) {
            this.done = true;
            WheatupEvent.call(EventType.ANIMATION_DONE, this.name);
        }
        var pic = this.imgs[this.currentIndex = (this.currentIndex + 1) % this.length];
        return pic;
    };
    return Animation;
})();
Animation.prototype.__class__ = "Animation";
//# sourceMappingURL=Animation.js.map