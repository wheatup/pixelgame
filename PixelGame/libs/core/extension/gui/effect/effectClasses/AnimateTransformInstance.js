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
         * @class egret.gui.AnimateTransformInstance
         * @classdesc
         * AnimateTransformInstance 类用于实现 AnimateTransform 效果的实例类
         * @extends egret.gui.AnimateInstance
         */
        var AnimateTransformInstance = (function (_super) {
            __extends(AnimateTransformInstance, _super);
            /**
             * @method egret.gui.AnimateTransformInstance#constructor
             */
            function AnimateTransformInstance(target) {
                _super.call(this, target);
                /**
                 * 变换效果开始的标志
                 */
                this.started = false;
                this.instanceStartTime = 0;
                /**
                 * 储存当前的属性值
                 */
                this.currentValues = {
                    rotation: NaN,
                    scaleX: NaN,
                    scaleY: NaN,
                    translationX: NaN,
                    translationY: NaN
                };
                /**
                 * 如果为 true，则已经初始化与该转换相关的效果的此单一实例。
                 * 此属性供 AnimateTransform 使用，以防止在将多个转换效果集成到此单一实例中时重复初始化该实例。
                 */
                this.initialized = false;
            }
            var __egretProto__ = AnimateTransformInstance.prototype;
            __egretProto__.startEffect = function () {
                if (!this.started) {
                    this.started = true;
                    _super.prototype.startEffect.call(this);
                }
            };
            __egretProto__.insertKeyframe = function (keyframes, newKF, startDelay, first) {
                if (startDelay === void 0) { startDelay = 0; }
                if (first === void 0) { first = false; }
                newKF.time += startDelay;
                for (var i = 0; i < keyframes.length; i++) {
                    if (keyframes[i].time >= newKF.time) {
                        if (keyframes[i].time == newKF.time) {
                            if (first) {
                                newKF.time += .01;
                                keyframes.splice(i + 1, 0, newKF);
                            }
                            else {
                                newKF.time -= .01;
                                keyframes.splice(i, 0, newKF);
                            }
                        }
                        else {
                            keyframes.splice(i, 0, newKF);
                        }
                        return;
                    }
                }
                keyframes.push(newKF);
            };
            /**
             * 使用相对于最外侧的 parent 效果的开始时间，将一个 MotionPath 对象添加到此实例中的 MotionPath 对象集中。
             * 对于在与新的 MotionPath 对象相同的属性上起作用的此效果实例，
             * 如果已经存在一个 MotionPath 对象，则只会将新 MotionPath 的关键帧添加到现有 MotionPath 中。
             * @member egret.gui.AnimateTransformInstance#addMotionPath
             */
            __egretProto__.addMotionPath = function (newMotionPath, newEffectStartTime) {
                if (newEffectStartTime === void 0) { newEffectStartTime = 0; }
                var added = false;
                if (this.motionPaths) {
                    var i = 0;
                    var j = 0;
                    var mp;
                    var n = this.motionPaths.length;
                    if (newEffectStartTime < this.instanceStartTime) {
                        var deltaStartTime = this.instanceStartTime - newEffectStartTime;
                        for (i = 0; i < n; i++) {
                            mp = (this.motionPaths[i]);
                            for (j = 0; j < mp.keyframes.length; j++)
                                mp.keyframes[j].time += deltaStartTime;
                        }
                        this.instanceStartTime = newEffectStartTime;
                    }
                    for (i = 0; i < n; i++) {
                        mp = (this.motionPaths[i]);
                        if (mp.property == newMotionPath.property) {
                            for (j = 0; j < newMotionPath.keyframes.length; j++) {
                                this.insertKeyframe(mp.keyframes, newMotionPath.keyframes[j], (newEffectStartTime - this.instanceStartTime), (j == 0));
                            }
                            added = true;
                            break;
                        }
                    }
                }
                else {
                    this.motionPaths = new Array();
                    this.instanceStartTime = newEffectStartTime;
                }
                if (!added) {
                    if (newEffectStartTime > this.instanceStartTime) {
                        for (j = 0; j < newMotionPath.keyframes.length; j++)
                            newMotionPath.keyframes[j].time += (newEffectStartTime - this.instanceStartTime);
                    }
                    this.motionPaths.push(newMotionPath);
                }
                n = this.motionPaths.length;
                for (i = 0; i < n; i++) {
                    mp = (this.motionPaths[i]);
                    var kf = mp.keyframes[mp.keyframes.length - 1];
                    if (!isNaN(kf.time))
                        this.duration = Math.max(this.duration, kf.time);
                }
            };
            __egretProto__.play = function () {
                if (this.motionPaths) {
                    var i = 0;
                    var j = 0;
                    this.updateTransformCenter();
                    var adjustXY = (this.transformCenter.x != 0 || this.transformCenter.y != 0);
                    for (i = 0; i < this.motionPaths.length; ++i) {
                        var animProp = this.motionPaths[i];
                        if (adjustXY && (animProp.property == "translationX" || animProp.property == "translationY")) {
                            for (j = 0; j < animProp.keyframes.length; ++j) {
                                var kf = animProp.keyframes[j];
                                if (this._isValidValue(kf.value)) {
                                    if (animProp.property == "translationX") {
                                        kf.value += this.transformCenter.x;
                                    }
                                    else {
                                        kf.value += this.transformCenter.y;
                                    }
                                }
                            }
                        }
                    }
                }
                _super.prototype.play.call(this);
            };
            __egretProto__.animationEnd = function (animation) {
                this.started = false;
                _super.prototype.animationEnd.call(this, animation);
            };
            /**
             * 更新转换中心
             */
            __egretProto__.updateTransformCenter = function () {
                if (!this.transformCenter)
                    this.transformCenter = new egret.Point(0, 0);
                if (this.autoCenterTransform) {
                    this.transformCenter.x = this.target.width / 2;
                    this.transformCenter.y = this.target.height / 2;
                }
            };
            __egretProto__.getCurrentValue = function (property) {
                switch (property) {
                    case "translationX":
                    case "translationY": {
                        this.updateTransformCenter();
                        var position = gui.TransformUtil.transformPointToParent((this.target), this.transformCenter);
                        if (property == "translationX")
                            return position.x;
                        if (property == "translationY")
                            return position.y;
                        break;
                    }
                    default:
                        return _super.prototype.getCurrentValue.call(this, property);
                }
            };
            __egretProto__.applyValues = function (anim) {
                var tmpScaleX;
                var tmpScaleY;
                var tmpPosition;
                var tmpRotation;
                for (var i = 0; i < this.motionPaths.length; ++i) {
                    if (this.currentValues[this.motionPaths[i].property] !== undefined)
                        this.currentValues[this.motionPaths[i].property] = anim.currentValue[this.motionPaths[i].property];
                    else
                        this.setValue(this.motionPaths[i].property, anim.currentValue[this.motionPaths[i].property]);
                }
                tmpRotation = !isNaN(this.currentValues.rotation) ? this.currentValues.rotation : this.getCurrentValue("rotation");
                tmpScaleX = !isNaN(this.currentValues.scaleX) ? this.currentValues.scaleX : this.getCurrentValue("scaleX");
                tmpScaleY = !isNaN(this.currentValues.scaleY) ? this.currentValues.scaleY : this.getCurrentValue("scaleY");
                AnimateTransformInstance.position.x = !isNaN(this.currentValues.translationX) ? this.currentValues.translationX : this.getCurrentValue("translationX");
                AnimateTransformInstance.position.y = !isNaN(this.currentValues.translationY) ? this.currentValues.translationY : this.getCurrentValue("translationY");
                if (!this.lastTranslationPoint)
                    this.lastTranslationPoint = AnimateTransformInstance.position.clone();
                if (isNaN(this.currentValues.translationX) && Math.abs(AnimateTransformInstance.position.x - this.lastTranslationPoint.x) < 0.1)
                    AnimateTransformInstance.position.x = this.lastTranslationPoint.x;
                if (isNaN(this.currentValues.translationY) && Math.abs(AnimateTransformInstance.position.y - this.lastTranslationPoint.y) < 0.1)
                    AnimateTransformInstance.position.y = this.lastTranslationPoint.y;
                this.lastTranslationPoint.x = AnimateTransformInstance.position.x;
                this.lastTranslationPoint.y = AnimateTransformInstance.position.y;
                tmpPosition = AnimateTransformInstance.position;
                gui.TransformUtil.transformAround((this.target), this.transformCenter, tmpPosition, tmpScaleX, tmpScaleY, tmpRotation);
            };
            AnimateTransformInstance.position = new egret.Point();
            return AnimateTransformInstance;
        })(gui.AnimateInstance);
        gui.AnimateTransformInstance = AnimateTransformInstance;
        AnimateTransformInstance.prototype.__class__ = "egret.gui.AnimateTransformInstance";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
