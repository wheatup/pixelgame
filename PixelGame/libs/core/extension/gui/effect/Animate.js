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
         * @class egret.gui.Animate
         * @classdesc
         * Animate 效果可设置各个值之间的任意属性集的动画。通过设置 motionPaths 属性，指定要设置动画的属性和值。
         * @extends egret.gui.Effect
         */
        var Animate = (function (_super) {
            __extends(Animate, _super);
            /**
             * @method egret.gui.Animate#constructor
             */
            function Animate(target) {
                if (target === void 0) { target = null; }
                _super.call(this, target);
                this.numUpdateListeners = 0;
                this._interpolator = null;
                this._repeatBehavior = gui.RepeatBehavior.LOOP;
                this._disableLayout = false;
                this.instanceClass = gui.AnimateInstance;
            }
            var __egretProto__ = Animate.prototype;
            Object.defineProperty(__egretProto__, "motionPaths", {
                /**
                 * MotionPath 对象的 Array，其中的每个对象都带有正在设置动画的属性的名称以及该属性在动画过程中所采用的值。
                 * 此 Array 优先于 Animate 的子类中所声明的任何属性。
                 * 例如，如果此 Array 是直接在 Move 效果上设置的，则会忽略 Move 效果的任何属性（如 xFrom）。
                 * @member egret.gui.Animate#motionPaths
                 */
                get: function () {
                    return this._motionPaths;
                },
                set: function (value) {
                    this._motionPaths = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "easer", {
                /**
                 * 此效果的缓动行为，默认为Sine(.5)
                 * @member egret.gui.Animate#easer
                 */
                get: function () {
                    return this._easer;
                },
                set: function (value) {
                    this._easer = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "interpolator", {
                /**
                 * 此效果计算属性的起始值和结束值之间的值所用的插补器。
                 * 默认情况下，NumberInterpolator 类处理内插值.
                 * @member egret.gui.Animate#interpolator
                 */
                get: function () {
                    return this._interpolator;
                },
                set: function (value) {
                    this._interpolator = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "repeatBehavior", {
                /**
                 * 一种重复效果的行为。RepeatBehavior类中定义的常量。默认为RepeatBehavior.LOOP
                 * @member egret.gui.Animate#repeatBehavior
                 */
                get: function () {
                    return this._repeatBehavior;
                },
                set: function (value) {
                    this._repeatBehavior = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "disableLayout", {
                /**
                 * 如果为 true，则对目标对象禁用任何布局约束。效果完成时，将还原这些属性。
                 * @member egret.gui.Animate#disableLayout
                 */
                get: function () {
                    return this._disableLayout;
                },
                set: function (value) {
                    this._disableLayout = value;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @method egret.gui.Animate#_initInstance
             */
            __egretProto__._initInstance = function (instance) {
                _super.prototype._initInstance.call(this, instance);
                var animateInstance = instance;
                animateInstance.addEventListener(gui.EffectEvent.EFFECT_REPEAT, this.animationEventHandler, this);
                if (this.numUpdateListeners > 0)
                    animateInstance.addEventListener(gui.EffectEvent.EFFECT_UPDATE, this.animationEventHandler, this);
                animateInstance.easer = this.easer;
                if (this.interpolator)
                    animateInstance.interpolator = this.interpolator;
                if (isNaN(this.repeatCount))
                    animateInstance.repeatCount = this.repeatCount;
                animateInstance.repeatBehavior = this.repeatBehavior;
                animateInstance.disableLayout = this.disableLayout;
                if (this.motionPaths) {
                    animateInstance.motionPaths = new Array();
                    for (var i = 0; i < this.motionPaths.length; ++i)
                        animateInstance.motionPaths[i] = this.motionPaths[i].clone();
                }
            };
            __egretProto__.addEventListener = function (type, listener, thisObject, useCapture, priority) {
                if (useCapture === void 0) { useCapture = false; }
                if (priority === void 0) { priority = 0; }
                _super.prototype.addEventListener.call(this, type, listener, thisObject, useCapture, priority);
                if (type == gui.EffectEvent.EFFECT_UPDATE)
                    ++this.numUpdateListeners;
            };
            __egretProto__.removeEventListener = function (type, listener, useCapture) {
                if (useCapture === void 0) { useCapture = false; }
                _super.prototype.removeEventListener.call(this, type, listener, this, useCapture);
                if (type == gui.EffectEvent.EFFECT_UPDATE)
                    --this.numUpdateListeners;
            };
            /**
             * 派发动画事件
             */
            __egretProto__.animationEventHandler = function (event) {
                this.dispatchEvent(event);
            };
            return Animate;
        })(gui.Effect);
        gui.Animate = Animate;
        Animate.prototype.__class__ = "egret.gui.Animate";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
