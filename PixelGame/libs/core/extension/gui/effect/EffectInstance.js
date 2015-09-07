//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var egret;
(function (egret) {
    var gui;
    (function (gui) {
        /**
         * @class egret.gui.EffectInstance
         * @classdesc
         * 定义所有效果实例的基类
         * @extends egret.EventDispatcher
         */
        var EffectInstance = (function (_super) {
            __extends(EffectInstance, _super);
            /**
             * @method egret.gui.EffectInstance#constructor
             */
            function EffectInstance(target) {
                _super.call(this);
                /**
                 * delayTimer开始的时间
                 */
                this.delayStartTime = 0;
                /**
                 * 暂停时delayTimer经过的时间
                 */
                this.delayElapsedTime = 0;
                /**
                 * 是否显式设置了持续时间
                 */
                this.durationExplicitlySet = false;
                /**
                 * 已播放实例的次数。
                 */
                this._playCount = 0;
                /**
                 * 调用end()方法结束时，防止效果重复的的标志
                 */
                this._stopRepeat = false;
                this._duration = 500;
                this._repeatCount = 0;
                this._repeatDelay = 0;
                this._startDelay = 0;
                this.target = target;
            }
            var __egretProto__ = EffectInstance.prototype;
            Object.defineProperty(__egretProto__, "_actualDuration", {
                /**
                 * 实际的持续时间包含startDelay，repeatDelay，repeatCount这些值
                 */
                get: function () {
                    var value = NaN;
                    if (this.repeatCount > 0) {
                        value = this.duration * this.repeatCount + (this.repeatDelay * (this.repeatCount - 1)) + this.startDelay;
                    }
                    return value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "duration", {
                /**
                 * 效果的持续时间（以毫秒为单位）。
                 * @member egret.gui.EffectInstance#duration
                 */
                get: function () {
                    if (!this.durationExplicitlySet && this.parentCompositeEffectInstance) {
                        return this.parentCompositeEffectInstance.duration;
                    }
                    else {
                        return this._duration;
                    }
                },
                set: function (value) {
                    this.durationExplicitlySet = true;
                    this._duration = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "effect", {
                /**
                 * 创建此 IEffectInstance 对象的 IEffect 对象。
                 * @member egret.gui.EffectInstance#effect
                 */
                get: function () {
                    return this._effect;
                },
                set: function (value) {
                    this._effect = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "playheadTime", {
                /**
                 * 效果的当前时间位置。
                 * 此属性的值介于 0 和总持续时间（包括该效果的 startDelay、repeatCount 和 repeatDelay）之间。
                 * @member egret.gui.EffectInstance#playheadTime
                 */
                get: function () {
                    return Math.max(this._playCount - 1, 0) * (this.duration + this.repeatDelay) + (this.playReversed ? 0 : this.startDelay);
                },
                set: function (value) {
                    this._setPlayheadTime(value);
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__._setPlayheadTime = function (value) {
                if (this._delayTimer && this._delayTimer.running) {
                    this._delayTimer.reset();
                    if (value < this.startDelay) {
                        this._delayTimer = new egret.Timer(this.startDelay - value, 1);
                        this.delayStartTime = egret.getTimer();
                        this._delayTimer.addEventListener(egret.TimerEvent.TIMER, this.delayTimerHandler, this);
                        this._delayTimer.start();
                    }
                    else {
                        this._playCount = 0;
                        this.play();
                    }
                }
            };
            Object.defineProperty(__egretProto__, "playReversed", {
                /**
                 * 指定效果是否在反向播放，在播放之前设置此属性
                 * @member egret.gui.EffectInstance#playReversed
                 */
                get: function () {
                    return this._playReversed;
                },
                set: function (value) {
                    this._setPlayReversed(value);
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__._setPlayReversed = function (value) {
                this._playReversed = value;
            };
            Object.defineProperty(__egretProto__, "repeatCount", {
                /**
                 * 效果的重复次数。可能的值为任何大于等于 0 的整数。
                 * @member egret.gui.EffectInstance#repeatCount
                 */
                get: function () {
                    return this._repeatCount;
                },
                set: function (value) {
                    this._repeatCount = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "repeatDelay", {
                /**
                 * 重复播放效果前需要等待的时间（以毫秒为单位）。
                 * @member egret.gui.EffectInstance#repeatDelay
                 */
                get: function () {
                    return this._repeatDelay;
                },
                set: function (value) {
                    this._repeatDelay = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "startDelay", {
                /**
                 * 开始播放效果前需要等待的时间（以毫秒为单位）。
                 * 此值可以是任何大于或等于 0 的整数。
                 * 如果使用 repeatCount 属性重复播放效果，则只在首次播放该效果时应用 startDelay 属性。
                 * @member egret.gui.EffectInstance#startDelay
                 */
                get: function () {
                    return this._startDelay;
                },
                set: function (value) {
                    this._startDelay = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "target", {
                /**
                 * 要应用此效果的对象。
                 * @member egret.gui.EffectInstance#target
                 */
                get: function () {
                    return this._target;
                },
                set: function (value) {
                    this._target = value;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 经过 startDelay 所占用的这段时间后，在目标上播放效果实例。
             * 由 Effect 类调用。在启动 EffectInstance 时，请使用此函数，而非 play() 方法。
             * @method egret.gui.EffectInstance#startEffect
             */
            __egretProto__.startEffect = function () {
                if (this.startDelay > 0 && !this.playReversed) {
                    this._delayTimer = new egret.Timer(this.startDelay, 1);
                    this.delayStartTime = egret.getTimer();
                    this._delayTimer.addEventListener(egret.TimerEvent.TIMER, this.delayTimerHandler, this);
                    this._delayTimer.start();
                }
                else {
                    this.play();
                }
            };
            /**
             * 在目标上播放效果实例。改为调用 startEffect() 方法，以在 EffectInstance 上开始播放效果。
             * <p>在 EffectInstance 的子类中，必须覆盖此方法。
             * 此覆盖必须调用 super.play() 方法，以便从目标中分派 effectStart 事件。</p>
             * @method egret.gui.EffectInstance#play
             */
            __egretProto__.play = function () {
                this._playCount++;
                this.dispatchEvent(new gui.EffectEvent(gui.EffectEvent.EFFECT_START, false, false, this));
                if (this.target && "dispatchEvent" in this.target) {
                    this.target.dispatchEvent(new gui.EffectEvent(gui.EffectEvent.EFFECT_START, false, false, this));
                }
            };
            /**
             * 暂停效果，直到调用 resume() 方法。
             * @method egret.gui.EffectInstance#pause
             */
            __egretProto__.pause = function () {
                if (this._delayTimer && this._delayTimer.running && !isNaN(this.delayStartTime)) {
                    this._delayTimer.stop();
                    this.delayElapsedTime = egret.getTimer() - this.delayStartTime;
                }
            };
            /**
             * 停止播放效果，使目标保持当前状态。
             * 您需要通过调用 Effect.stop() 方法来调用此方法。在实现过程中，它会调用 finishEffect() 方法。
             * <p>如果调用此方法来结束播放效果，效果实例将分派 effectEnd 事件。</p>
             * @method egret.gui.EffectInstance#stop
             */
            __egretProto__.stop = function () {
                if (this._delayTimer)
                    this._delayTimer.reset();
                this._stopRepeat = true;
                this.dispatchEvent(new gui.EffectEvent(gui.EffectEvent.EFFECT_STOP, false, false, this));
                if (this.target && ("dispatchEvent" in this.target))
                    this.target.dispatchEvent(new gui.EffectEvent(gui.EffectEvent.EFFECT_STOP, false, false, this));
                this.finishEffect();
            };
            /**
             * 在效果由 pause() 方法暂停后继续播放效果。
             * @method egret.gui.EffectInstance#resume
             */
            __egretProto__.resume = function () {
                if (this._delayTimer && !this._delayTimer.running && !isNaN(this.delayElapsedTime)) {
                    this._delayTimer.delay = !this.playReversed ? this._delayTimer.delay - this.delayElapsedTime : this.delayElapsedTime;
                    this.delayStartTime = egret.getTimer();
                    this._delayTimer.start();
                }
            };
            /**
             * 从效果的当前位置开始反向播放效果。
             * @method egret.gui.EffectInstance#reverse
             */
            __egretProto__.reverse = function () {
                if (this.repeatCount > 0)
                    this._playCount = this.repeatCount - this._playCount + 1;
            };
            /**
             * 中断当前播放的效果实例，立即跳转到效果的结束位置。
             * 通过调用 Effect.end() 方法可调用此方法。在实现过程中，它会调用 finishEffect() 方法。
             * <p>如果调用此方法来结束播放效果，效果实例将分派 effectEnd 事件。</p>
             * @method egret.gui.EffectInstance#end
             */
            __egretProto__.end = function () {
                if (this._delayTimer)
                    this._delayTimer.reset();
                this._stopRepeat = true;
                this.finishEffect();
            };
            /**
             * 在完成效果播放时由 end() 方法调用。此函数将为效果目标分派 endEffect 事件。
             * @method egret.gui.EffectInstance#finishEffect
             */
            __egretProto__.finishEffect = function () {
                this._playCount = 0;
                this.dispatchEvent(new gui.EffectEvent(gui.EffectEvent.EFFECT_END, false, false, this));
                if (this.target && ("dispatchEvent" in this.target)) {
                    this.target.dispatchEvent(new gui.EffectEvent(gui.EffectEvent.EFFECT_END, false, false, this));
                }
            };
            /**
             * 每次完成重复效果的迭代播放后调用。
             * @method egret.gui.EffectInstance#finishRepeat
             */
            __egretProto__.finishRepeat = function () {
                if (!this._stopRepeat && this._playCount != 0 && (this._playCount < this.repeatCount || this.repeatCount == 0)) {
                    if (this.repeatDelay > 0) {
                        this._delayTimer = new egret.Timer(this.repeatDelay, 1);
                        this.delayStartTime = egret.getTimer();
                        this._delayTimer.addEventListener(egret.TimerEvent.TIMER, this.delayTimerHandler, this);
                        this._delayTimer.start();
                    }
                    else {
                        this.play();
                    }
                }
                else {
                    this.finishEffect();
                }
            };
            __egretProto__._playWithNoDuration = function () {
                this.duration = 0;
                this.repeatCount = 1;
                this.repeatDelay = 0;
                this.startDelay = 0;
                this.startEffect();
            };
            __egretProto__.delayTimerHandler = function (event) {
                this._delayTimer.reset();
                this.delayStartTime = NaN;
                this.delayElapsedTime = NaN;
                this.play();
            };
            return EffectInstance;
        })(egret.EventDispatcher);
        gui.EffectInstance = EffectInstance;
        EffectInstance.prototype.__class__ = "egret.gui.EffectInstance";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
