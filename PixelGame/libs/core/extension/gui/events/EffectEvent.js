var egret;
(function (egret) {
    var gui;
    (function (gui) {
        var EffectEvent = (function (_super) {
            __extends(EffectEvent, _super);
            /**
             * 构造函数
             */
            function EffectEvent(eventType, bubbles, cancelable, effectInstance) {
                if (bubbles === void 0) { bubbles = false; }
                if (cancelable === void 0) { cancelable = false; }
                if (effectInstance === void 0) { effectInstance = null; }
                _super.call(this, eventType, bubbles, cancelable);
                this.effectInstance = effectInstance;
            }
            var __egretProto__ = EffectEvent.prototype;
            /**
             * 动画播放结束
             */
            EffectEvent.EFFECT_END = "effectEnd";
            /**
             * 动画播放被停止
             */
            EffectEvent.EFFECT_STOP = "effectStop";
            /**
             * 动画播放开始
             */
            EffectEvent.EFFECT_START = "effectStart";
            /**
             * 动画开始重复播放
             */
            EffectEvent.EFFECT_REPEAT = "effectRepeat";
            /**
             * 动画播放更新
             */
            EffectEvent.EFFECT_UPDATE = "effectUpdate";
            return EffectEvent;
        })(egret.Event);
        gui.EffectEvent = EffectEvent;
        EffectEvent.prototype.__class__ = "egret.gui.EffectEvent";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
