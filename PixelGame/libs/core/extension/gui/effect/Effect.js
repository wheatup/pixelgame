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
         * @class egret.gui.Effect
         * @classdesc
         * 定义所有效果的基类
         * @extends egret.EventDispatcher
         */
        var Effect = (function (_super) {
            __extends(Effect, _super);
            /**
             * @method egret.gui.Effect#constructor
             */
            function Effect(target) {
                if (target === void 0) { target = null; }
                _super.call(this);
                this._instances = [];
                this._isPaused = false;
                this._duration = 500;
                this.durationExplicitlySet = false;
                this._perElementOffset = 0;
                /**
                 * 效果的重复次数。可能的值为任何大于等于 0 的整数。
                 * 值为 1 表示播放一次效果。值为 0 表示无限制地循环播放效果，直到通过调用 end() 方法停止播放。
                 * @member egret.gui.Effect#repeatCount
                 */
                this.repeatCount = 1;
                /**
                 * 重复播放效果前需要等待的时间（以毫秒为单位）。可能的值为任何大于等于 0 的整数。
                 * @member egret.gui.Effect#repeatDelay
                 */
                this.repeatDelay = 0;
                /**
                 * 开始播放效果前需要等待的时间（以毫秒为单位）。
                 * 此值可以是任何大于或等于 0 的整数。
                 * 如果使用 repeatCount 属性重复播放效果，则只在首次播放效果时应用 startDelay。
                 * @member egret.gui.Effect#startDelay
                 */
                this.startDelay = 0;
                this._targets = [];
                this._playheadTime = 0;
                this.target = target;
            }
            var __egretProto__ = Effect.prototype;
            Object.defineProperty(__egretProto__, "duration", {
                /**
                 * 效果的持续时间（以毫秒为单位）。
                 * @member egret.gui.Effect#duration
                 */
                get: function () {
                    if (!this.durationExplicitlySet && this._parentCompositeEffect) {
                        return this._parentCompositeEffect.duration;
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
            Object.defineProperty(__egretProto__, "isPlaying", {
                /**
                 * 如果当前正在播放效果的任一实例，则为 true；否则，则为 false。
                 * @member egret.gui.Effect#isPlaying
                 */
                get: function () {
                    return this._instances && this._instances.length > 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "isPaused", {
                /**
                 * 是否处于暂停状态，当调用了paused()方法后此属性为true
                 * @member egret.gui.Effect#isPaused
                 */
                get: function () {
                    if (this.isPlaying)
                        return this._isPaused;
                    else
                        return false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "perElementOffset", {
                /**
                 * 在效果的第一个目标之后，其他效果目标的附加延迟（以毫秒为单位）。
                 * 此值将添加到 startDelay 属性的值中。
                 * @member egret.gui.Effect#perElementOffset
                 */
                get: function () {
                    return this._perElementOffset;
                },
                set: function (value) {
                    this._perElementOffset = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "target", {
                /**
                 * 要应用此效果的对象。当效果触发器触发某个效果时，会自动将 target 属性设置为触发该效果的对象。
                 * @member egret.gui.Effect#target
                 */
                get: function () {
                    if (this._targets.length > 0)
                        return this._targets[0];
                    else
                        return null;
                },
                set: function (value) {
                    this._targets.splice(0);
                    if (value)
                        this._targets[0] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "targets", {
                /**
                 * 一个对象 Array，这些对象都是效果的目标。播放效果时，会对各个目标并行执行效果。
                 * 设置 target 属性将替换此 Array 中的所有对象。
                 * 设置 targets 属性后，target 属性将返回此 Array 中的第一个项目。
                 * @member egret.gui.Effect#targets
                 */
                get: function () {
                    return this._targets;
                },
                set: function (value) {
                    var n = value.length;
                    for (var i = n - 1; i >= 0; i--) {
                        if (value[i] == null)
                            value.splice(i, 1);
                    }
                    this._targets = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "playheadTime", {
                /**
                 * 效果的当前时间位置。此属性的值介于 0 和总持续时间（包括该效果的 startDelay、repeatCount 和 repeatDelay）之间。
                 * @member egret.gui.Effect#playheadTime
                 */
                get: function () {
                    for (var i = 0; i < this._instances.length; i++) {
                        if (this._instances[i])
                            return (this._instances[i]).playheadTime;
                    }
                    return this._playheadTime;
                },
                set: function (value) {
                    var started = false;
                    if (this._instances.length == 0) {
                        this.play();
                        started = true;
                    }
                    for (var i = 0; i < this._instances.length; i++) {
                        if (this._instances[i])
                            (this._instances[i]).playheadTime = value;
                    }
                    if (started)
                        this.pause();
                    this._playheadTime = value;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 获取一个目标对象 Array，并对每个目标调用 createInstance() 方法。
             * @method egret.gui.Effect#createInstances
             * @param targets 要使用此效果设置动画的对象的数组。
             * @return 效果的效果实例对象的数组，一个目标一个数组。
             */
            __egretProto__.createInstances = function (targets) {
                if (targets === void 0) { targets = null; }
                if (!targets)
                    targets = this.targets;
                var newInstances = [];
                var offsetDelay = 0;
                var length = targets.length;
                for (var i = 0; i < length; i++) {
                    var target = targets[i];
                    var newInstance = this.createInstance(target);
                    if (newInstance) {
                        newInstance.startDelay += offsetDelay;
                        offsetDelay += this.perElementOffset;
                        newInstances.push(newInstance);
                    }
                }
                return newInstances;
            };
            /**
             * 创建一个效果实例并对其进行初始化。在播放效果实例前，使用此方法（而非 play() 方法）处理效果实例属性。
             *  <p>所创建的效果实例的类型由 instanceClass 属性指定。然后，使用 _initInstance() 方法初始化此实例。
             * 如果该实例是 EffectManager 在效果触发器触发此效果时创建的，
             * 则还需要调用 EffectInstance.initEffect() 方法进一步初始化此效果。</p>
             *  <p>调用 createInstance() 方法不会播放效果。对返回的效果实例调用 startEffect() 方法。</p>
             *  <p>Effect.play() 方法将自动调用此函数。 </p>
             * @method egret.gui.Effect#createInstance
             * @param target 要使用此效果为其设置动画的对象。
             * @return 效果的效果实例对象。
             */
            __egretProto__.createInstance = function (target) {
                if (target === void 0) { target = null; }
                if (!target)
                    target = this.target;
                var newInstance = (new this.instanceClass(target));
                this._initInstance(newInstance);
                newInstance.addEventListener(gui.EffectEvent.EFFECT_START, this._effectStartHandler, this);
                newInstance.addEventListener(gui.EffectEvent.EFFECT_STOP, this._effectStopHandler, this);
                newInstance.addEventListener(gui.EffectEvent.EFFECT_END, this._effectEndHandler, this);
                this._instances.push(newInstance);
                return newInstance;
            };
            /**
             *  将效果的属性复制到效果实例。
             *  <p>创建自定义效果时覆盖此方法，将属性从 Effect 类复制到效果实例类。
             * 进行覆盖时，请调用 super.initInstance()。 </p>
             * @param EffectInstance 要初始化的效果实例。
             */
            __egretProto__._initInstance = function (instance) {
                instance.duration = this.duration;
                instance.durationExplicitlySet = this.durationExplicitlySet;
                instance.effect = this;
                instance.repeatCount = this.repeatCount;
                instance.repeatDelay = this.repeatDelay;
                instance.startDelay = this.startDelay;
            };
            /**
             * 删除实例中的事件侦听器，然后从实例列表中删除该实例。
             * @method egret.gui.Effect#deleteInstance
             */
            __egretProto__.deleteInstance = function (instance) {
                instance.removeEventListener(gui.EffectEvent.EFFECT_START, this._effectStartHandler, this);
                instance.removeEventListener(gui.EffectEvent.EFFECT_STOP, this._effectStopHandler, this);
                instance.removeEventListener(gui.EffectEvent.EFFECT_END, this._effectEndHandler, this);
                var n = this._instances.length;
                for (var i = 0; i < n; i++) {
                    if (this._instances[i] === instance)
                        this._instances.splice(i, 1);
                }
            };
            /**
             * 开始播放效果。通常在调用 play() 方法之前先调用 end() 方法，以确保在开始播放新效果前已结束先前效果的所有实例。
             * @method egret.gui.Effect#play
             * @param targets 播放此效果的目标对象的数组。如果已指定此参数，则不会使用效果的 targets 属性。
             * @param playReversedFromEnd 如果为 true，则向后播放效果。
             * @return 效果的 EffectInstance 对象的数组，一个目标一个数组。
             */
            __egretProto__.play = function (targets, playReversedFromEnd) {
                if (targets === void 0) { targets = null; }
                if (playReversedFromEnd === void 0) { playReversedFromEnd = false; }
                this.effectStopped = false;
                this._isPaused = false;
                this.playReversed = playReversedFromEnd;
                var newInstances = this.createInstances(targets);
                var n = newInstances.length;
                for (var i = 0; i < n; i++) {
                    var newInstance = (newInstances[i]);
                    newInstance.playReversed = playReversedFromEnd;
                    newInstance.startEffect();
                }
                return newInstances;
            };
            /**
             * 暂停效果，直到调用 resume() 方法。
             * @method egret.gui.Effect#pause
             */
            __egretProto__.pause = function () {
                if (this.isPlaying && !this._isPaused) {
                    this._isPaused = true;
                    var n = this._instances.length;
                    for (var i = 0; i < n; i++) {
                        (this._instances[i]).pause();
                    }
                }
            };
            /**
             * 停止播放效果，使效果目标保持当前状态。
             * 与调用 pause() 方法不同，无法先调用 stop() 方法再调用 resume() 方法。
             * 不过，您可以调用 play() 方法重新播放效果。
             * @method egret.gui.Effect#stop
             */
            __egretProto__.stop = function () {
                var n = this._instances.length - 1;
                for (var i = n; i >= 0; i--) {
                    var instance = (this._instances[i]);
                    if (instance)
                        instance.stop();
                }
            };
            /**
             * 在效果由 pause() 方法暂停后继续播放效果。
             * @method egret.gui.Effect#resume
             */
            __egretProto__.resume = function () {
                if (this.isPlaying && this._isPaused) {
                    this._isPaused = false;
                    var n = this._instances.length;
                    for (var i = 0; i < n; i++) {
                        (this._instances[i]).resume();
                    }
                }
            };
            /**
             * 逆序播放效果；如果当前正在播放效果，则从该效果的当前位置开始逆序播放。
             * @method egret.gui.Effect#reverse
             */
            __egretProto__.reverse = function () {
                if (this.isPlaying) {
                    var n = this._instances.length;
                    for (var i = 0; i < n; i++) {
                        (this._instances[i]).reverse();
                    }
                }
            };
            /**
             * 中断当前正在播放的效果，立即跳转到该效果的末尾。调用此方法将调用 EffectInstance.end() 方法。
             * <p>如果调用此方法来结束播放效果，效果实例将分派 effectEnd 事件。</p>
             * <p>如果将效果实例作为参数传递，则会中断此实例。
             * 如果没有传入参数，则该效果当前生成的所有效果实例都将中断。</p>
             * @method egret.gui.Effect#end
             */
            __egretProto__.end = function (effectInstance) {
                if (effectInstance === void 0) { effectInstance = null; }
                if (effectInstance) {
                    effectInstance.end();
                }
                else {
                    var n = this._instances.length;
                    for (var i = n - 1; i >= 0; i--) {
                        var instance = (this._instances[i]);
                        if (instance)
                            instance.end();
                    }
                }
            };
            /**
             * 当效果实例开始播放时调用此方法。
             */
            __egretProto__._effectStartHandler = function (event) {
                this.dispatchEvent(event);
            };
            /**
             * 当效果实例已被 stop() 方法调用停止时调用。
             */
            __egretProto__._effectStopHandler = function (event) {
                this.dispatchEvent(event);
                this.effectStopped = true;
            };
            /**
             * 当效果实例完成播放时调用。
             */
            __egretProto__._effectEndHandler = function (event) {
                var instance = (event.effectInstance);
                this.deleteInstance(instance);
                this.dispatchEvent(event);
            };
            return Effect;
        })(egret.EventDispatcher);
        gui.Effect = Effect;
        Effect.prototype.__class__ = "egret.gui.Effect";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
