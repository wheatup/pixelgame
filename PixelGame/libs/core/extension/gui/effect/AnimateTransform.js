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
         * @class egret.gui.AnimateTransform
         * @classdesc
         * AnimateTransform 效果控制目标对象上所有与转换相关的动画。
         * @extends egret.gui.Animate
         */
        var AnimateTransform = (function (_super) {
            __extends(AnimateTransform, _super);
            /**
             * @method egret.gui.AnimateTransform#constructor
             */
            function AnimateTransform(target) {
                if (target === void 0) { target = null; }
                _super.call(this, target);
                /**
                 * 指定在转换效果开始播放时，该效果是否围绕目标的中心发生。
                 * 如果未设置该标志，转换中心将由此效果中的 transformX, transformY属性决定。
                 * @member egret.gui.AnimateTransform#autoCenterTransform
                 */
                this.autoCenterTransform = false;
                this.instanceClass = gui.AnimateTransformInstance;
            }
            var __egretProto__ = AnimateTransform.prototype;
            /**
             * 获取效果所属的复合效果
             */
            __egretProto__.getOwningParallelEffect = function () {
                var prevParent = null;
                var parent = this._parentCompositeEffect;
                while (parent) {
                    if (parent instanceof gui.Sequence)
                        break;
                    prevParent = parent;
                    parent = parent._parentCompositeEffect;
                }
                return prevParent;
            };
            __egretProto__.createInstance = function (target) {
                if (target === void 0) { target = null; }
                if (!target)
                    target = this.target;
                var sharedInstance = null;
                var topmostParallel = this.getOwningParallelEffect();
                if (topmostParallel != null)
                    sharedInstance = (AnimateTransform.getSharedInstance(topmostParallel, target));
                if (!sharedInstance) {
                    var newInstance = _super.prototype.createInstance.call(this, target);
                    if (topmostParallel)
                        AnimateTransform.storeSharedInstance(topmostParallel, target, newInstance);
                    return newInstance;
                }
                else {
                    this._initInstance(sharedInstance);
                    return null;
                }
            };
            __egretProto__._effectStartHandler = function (event) {
                _super.prototype._effectStartHandler.call(this, event);
                var topmostParallel = this.getOwningParallelEffect();
                if (topmostParallel != null)
                    AnimateTransform.removeSharedInstance(topmostParallel, event.effectInstance.target);
            };
            /**
             * 计算目标的转换中心
             */
            __egretProto__.computeTransformCenterForTarget = function (target, valueMap) {
                if (valueMap === void 0) { valueMap = null; }
                var computedTransformCenter;
                if (this.autoCenterTransform) {
                    var w = (valueMap != null && valueMap["width"] !== undefined) ? valueMap["width"] : target.width;
                    var h = (valueMap != null && valueMap["height"] !== undefined) ? valueMap["height"] : target.height;
                    computedTransformCenter = new egret.Point(w / 2, h / 2);
                }
                else {
                    computedTransformCenter = new egret.Point(0, 0);
                    if (!isNaN(this.transformX))
                        computedTransformCenter.x = this.transformX;
                    if (!isNaN(this.transformY))
                        computedTransformCenter.y = this.transformY;
                }
                return computedTransformCenter;
            };
            /**
             * 插入关键帧
             */
            __egretProto__.insertKeyframe = function (keyframes, newKF) {
                for (var i = 0; i < keyframes.length; i++) {
                    if (keyframes[i].time > newKF.time) {
                        keyframes.splice(i, 0, newKF);
                        return;
                    }
                }
                keyframes.push(newKF);
            };
            /**
             * 添加一个运动路径
             * @param property
             * @param valueFrom
             * @param valueTo
             * @param valueBy
             * @private
             */
            __egretProto__._addMotionPath = function (property, valueFrom, valueTo, valueBy) {
                if (valueFrom === void 0) { valueFrom = NaN; }
                if (valueTo === void 0) { valueTo = NaN; }
                if (valueBy === void 0) { valueBy = NaN; }
                if (isNaN(valueFrom)) {
                    if (!isNaN(valueTo) && !isNaN(valueBy))
                        valueFrom = valueTo - valueBy;
                }
                var mp = new gui.MotionPath(property);
                mp.keyframes = [new gui.Keyframe(0, valueFrom), new gui.Keyframe(this.duration, valueTo, valueBy)];
                mp.keyframes[1].easer = this.easer;
                if (this.motionPaths) {
                    var n = this.motionPaths.length;
                    for (var i = 0; i < n; i++) {
                        var prop = (this.motionPaths[i]);
                        if (prop.property == mp.property) {
                            for (var j = 0; j < mp.keyframes.length; j++) {
                                this.insertKeyframe(prop.keyframes, mp.keyframes[j]);
                            }
                            return;
                        }
                    }
                }
                else {
                    this.motionPaths = new Array();
                }
                this.motionPaths.push(mp);
            };
            __egretProto__._initInstance = function (instance) {
                var i = 0;
                var adjustedDuration = this.duration;
                var transformInstance = instance;
                if (this.motionPaths) {
                    var instanceAnimProps = [];
                    for (i = 0; i < this.motionPaths.length; ++i) {
                        instanceAnimProps[i] = this.motionPaths[i].clone();
                        var mp = (instanceAnimProps[i]);
                        if (mp.keyframes) {
                            for (var j = 0; j < mp.keyframes.length; ++j) {
                                var kf = (mp.keyframes[j]);
                                if (isNaN(kf.time))
                                    kf.time = this.duration;
                                if (this.startDelay != 0)
                                    kf.time += this.startDelay;
                            }
                            adjustedDuration = Math.max(adjustedDuration, mp.keyframes[mp.keyframes.length - 1].time);
                        }
                    }
                    var globalStartTime = this.getGlobalStartTime();
                    for (i = 0; i < instanceAnimProps.length; ++i)
                        transformInstance.addMotionPath(instanceAnimProps[i], globalStartTime);
                }
                if (transformInstance.initialized)
                    return;
                transformInstance.initialized = true;
                if (!this.autoCenterTransform)
                    transformInstance.transformCenter = this.computeTransformCenterForTarget(instance.target);
                transformInstance.autoCenterTransform = this.autoCenterTransform;
                var tmpStartDelay = this.startDelay;
                this.startDelay = 0;
                var tmpAnimProps = this.motionPaths;
                this.motionPaths = null;
                _super.prototype._initInstance.call(this, instance);
                this.startDelay = tmpStartDelay;
                this.motionPaths = tmpAnimProps;
                transformInstance.duration = Math.max(this.duration, adjustedDuration);
                if (egret.getQualifiedClassName(this) != egret.getQualifiedClassName(AnimateTransform))
                    transformInstance.easer = AnimateTransform.linearEaser;
            };
            __egretProto__.getGlobalStartTime = function () {
                var globalStartTime = 0;
                var parent = this._parentCompositeEffect;
                while (parent) {
                    globalStartTime += parent.startDelay;
                    if (parent instanceof gui.Sequence) {
                        var sequence = parent;
                        for (var i = 0; i < sequence.children.length; ++i) {
                            var child = sequence.children[i];
                            if (child == this)
                                break;
                            if (child instanceof gui.CompositeEffect)
                                globalStartTime += child.compositeDuration;
                            else
                                globalStartTime += child.startDelay + (child.duration * child.repeatCount) + (child.repeatDelay + (child.repeatCount - 1));
                        }
                    }
                    parent = parent._parentCompositeEffect;
                }
                return globalStartTime;
            };
            /**
             * 获取共享的实例
             */
            AnimateTransform.getSharedInstance = function (topmostParallel, target) {
                if (topmostParallel != null) {
                    var sharedObjectMap = AnimateTransform.sharedObjectMaps[topmostParallel.hashCode];
                    if (sharedObjectMap != null)
                        return sharedObjectMap[target.hashCode];
                }
                return null;
            };
            AnimateTransform.removeSharedInstance = function (topmostParallel, target) {
                if (topmostParallel != null) {
                    var sharedObjectMap = AnimateTransform.sharedObjectMaps[topmostParallel.hashCode];
                    if (!sharedObjectMap)
                        return;
                    if (sharedObjectMap[target.hashCode]) {
                        delete sharedObjectMap[target.hashCode];
                        AnimateTransform.sharedObjectRefcounts[topmostParallel.hashCode] -= 1;
                        if (AnimateTransform.sharedObjectRefcounts[topmostParallel.hashCode] <= 0) {
                            delete AnimateTransform.sharedObjectMaps[topmostParallel.hashCode];
                            delete AnimateTransform.sharedObjectRefcounts[topmostParallel.hashCode];
                        }
                    }
                }
            };
            AnimateTransform.storeSharedInstance = function (topmostParallel, target, effectInstance) {
                if (topmostParallel != null) {
                    var sharedObjectMap = AnimateTransform.sharedObjectMaps[topmostParallel.hashCode];
                    if (!sharedObjectMap) {
                        sharedObjectMap = {};
                        AnimateTransform.sharedObjectMaps[topmostParallel.hashCode] = sharedObjectMap;
                    }
                    if (!sharedObjectMap[target.hashCode]) {
                        if (!AnimateTransform.sharedObjectRefcounts[topmostParallel.hashCode])
                            AnimateTransform.sharedObjectRefcounts[topmostParallel.hashCode] = 1;
                        else
                            AnimateTransform.sharedObjectRefcounts[topmostParallel.hashCode] += 1;
                    }
                    sharedObjectMap[target.hashCode] = effectInstance;
                }
            };
            /**子效果默认的缓动函数*/
            AnimateTransform.linearEaser = new gui.Linear();
            //储存作用于同一个目标的转换效果共享的实例，
            AnimateTransform.sharedObjectMaps = {};
            AnimateTransform.sharedObjectRefcounts = {};
            return AnimateTransform;
        })(gui.Animate);
        gui.AnimateTransform = AnimateTransform;
        AnimateTransform.prototype.__class__ = "egret.gui.AnimateTransform";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
