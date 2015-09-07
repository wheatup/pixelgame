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
         * @class egret.gui.SequenceInstance
         * @classdesc
         * SequenceInstance 类用于实现 Sequence 效果的实例类
         * @extends egret.gui.CompositeEffectInstance
         */
        var SequenceInstance = (function (_super) {
            __extends(SequenceInstance, _super);
            /**
             * @method egret.gui.SequenceInstance#constructor
             */
            function SequenceInstance(target) {
                _super.call(this, target);
                /**
                 * 已播放效果的持续时间
                 */
                this.currentInstanceDuration = 0;
                this.currentSetIndex = -1;
                this.isPaused = false;
            }
            var __egretProto__ = SequenceInstance.prototype;
            Object.defineProperty(__egretProto__, "_durationWithoutRepeat", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    var _duration = 0;
                    var n = this._childSets.length;
                    for (var i = 0; i < n; i++) {
                        var instances = this._childSets[i];
                        _duration += instances[0]._actualDuration;
                    }
                    return _duration;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @inheritDoc
             */
            __egretProto__._setPlayheadTime = function (value) {
                this._setPlayheadTime(value);
                var i, j, k, l = 0;
                var compositeDur = (this.effect).compositeDuration;
                var firstCycleDur = compositeDur + this.startDelay + this.repeatDelay;
                var laterCycleDur = compositeDur + this.repeatDelay;
                var totalDur = firstCycleDur + laterCycleDur * (this.repeatCount - 1);
                var iterationPlayheadTime;
                if (value <= firstCycleDur) {
                    iterationPlayheadTime = Math.min(value - this.startDelay, compositeDur);
                    this._playCount = 1;
                }
                else {
                    if (value >= totalDur && this.repeatCount != 0) {
                        iterationPlayheadTime = compositeDur;
                        this._playCount = this.repeatCount;
                    }
                    else {
                        var valueAfterFirstCycle = value - firstCycleDur;
                        iterationPlayheadTime = valueAfterFirstCycle % laterCycleDur;
                        iterationPlayheadTime = Math.min(iterationPlayheadTime, compositeDur);
                        this._playCount = 1 + valueAfterFirstCycle / laterCycleDur;
                    }
                }
                if (this._activeEffectQueue && this._activeEffectQueue.length > 0) {
                    var cumulativeDuration = 0;
                    var activeLength = this._activeEffectQueue.length;
                    for (i = 0; i < activeLength; ++i) {
                        var setToCompare = this.playReversed ? (activeLength - 1 - i) : i;
                        var childEffectInstances;
                        var startTime = cumulativeDuration;
                        var endTime = cumulativeDuration + this._childSets[setToCompare][0]._actualDuration;
                        cumulativeDuration = endTime;
                        if (startTime <= iterationPlayheadTime && iterationPlayheadTime <= endTime) {
                            this._endEffectCalled = true;
                            if (this.currentSetIndex == setToCompare) {
                                for (j = 0; j < this.currentSet.length; j++)
                                    this.currentSet[j].playheadTime = (iterationPlayheadTime - startTime);
                            }
                            else if (setToCompare < this.currentSetIndex) {
                                if (this.playReversed) {
                                    for (j = 0; j < this.currentSet.length; j++)
                                        this.currentSet[j].end();
                                    for (j = this.currentSetIndex - 1; j > setToCompare; --j) {
                                        childEffectInstances = this._activeEffectQueue[j];
                                        for (k = 0; k < childEffectInstances.length; k++) {
                                            if (this.playReversed)
                                                childEffectInstances[k].playReversed = true;
                                            childEffectInstances[k].play();
                                            childEffectInstances[k].end();
                                        }
                                    }
                                }
                                else {
                                    for (j = 0; j < this.currentSet.length; j++) {
                                        this.currentSet[j].playheadTime = 0;
                                        this.currentSet[j].stop();
                                    }
                                    for (j = this.currentSetIndex - 1; j > setToCompare; --j) {
                                        childEffectInstances = this._activeEffectQueue[j];
                                        for (k = 0; k < childEffectInstances.length; k++) {
                                            childEffectInstances[k].play();
                                            childEffectInstances[k].stop();
                                        }
                                    }
                                }
                                this.currentSetIndex = setToCompare;
                                this.playCurrentChildSet();
                                for (k = 0; k < this.currentSet.length; k++) {
                                    this.currentSet[k].playheadTime = (iterationPlayheadTime - startTime);
                                    if (this.isPaused)
                                        this.currentSet[k].pause();
                                }
                            }
                            else {
                                if (this.playReversed) {
                                    for (j = 0; j < this.currentSet.length; j++) {
                                        this.currentSet[j].playheadTime = 0;
                                        this.currentSet[j].stop();
                                    }
                                    for (k = this.currentSetIndex + 1; k < setToCompare; k++) {
                                        childEffectInstances = this._activeEffectQueue[k];
                                        for (l = 0; l < childEffectInstances.length; l++) {
                                            childEffectInstances[l].playheadTime = 0;
                                            childEffectInstances[l].stop();
                                        }
                                    }
                                }
                                else {
                                    var currentEffectInstances = this.currentSet.concat();
                                    for (j = 0; j < currentEffectInstances.length; j++)
                                        currentEffectInstances[j].end();
                                    for (k = this.currentSetIndex + 1; k < setToCompare; k++) {
                                        childEffectInstances = this._activeEffectQueue[k];
                                        for (l = 0; l < childEffectInstances.length; l++) {
                                            childEffectInstances[l].play();
                                            childEffectInstances[l].end();
                                        }
                                    }
                                }
                                this.currentSetIndex = setToCompare;
                                this.playCurrentChildSet();
                                for (k = 0; k < this.currentSet.length; k++) {
                                    this.currentSet[k].playheadTime = (iterationPlayheadTime - startTime);
                                    if (this.isPaused)
                                        this.currentSet[k].pause();
                                }
                            }
                            this._endEffectCalled = false;
                            break;
                        }
                    }
                }
            };
            /**
             * @inheritDoc
             */
            __egretProto__.play = function () {
                this.isPaused = false;
                this._activeEffectQueue = [];
                this.currentSetIndex = this.playReversed ? this._childSets.length : -1;
                var n = 0;
                var i = 0;
                n = this._childSets.length;
                for (i = 0; i < n; i++) {
                    var instances = this._childSets[i];
                    this._activeEffectQueue.push(instances);
                }
                _super.prototype.play.call(this);
                if (this._activeEffectQueue.length == 0) {
                    this.finishRepeat();
                    return;
                }
                this.playNextChildSet();
            };
            /**
             * @inheritDoc
             */
            __egretProto__.pause = function () {
                _super.prototype.pause.call(this);
                this.isPaused = true;
                if (this.currentSet && this.currentSet.length > 0) {
                    var n = this.currentSet.length;
                    for (var i = 0; i < n; i++) {
                        this.currentSet[i].pause();
                    }
                }
            };
            /**
             * @inheritDoc
             */
            __egretProto__.stop = function () {
                this.isPaused = false;
                if (this._activeEffectQueue && this._activeEffectQueue.length > 0) {
                    var queueCopy = this._activeEffectQueue.concat();
                    this._activeEffectQueue = null;
                    var currentInstances = queueCopy[this.currentSetIndex];
                    if (currentInstances) {
                        var currentCount = currentInstances.length;
                        for (var i = 0; i < currentCount; i++)
                            currentInstances[i].stop();
                    }
                    var n = queueCopy.length;
                    for (var j = this.currentSetIndex + 1; j < n; j++) {
                        var waitingInstances = queueCopy[j];
                        var m = waitingInstances.length;
                        for (var k = 0; k < m; k++) {
                            var instance = waitingInstances[k];
                            instance.effect.deleteInstance(instance);
                        }
                    }
                }
                _super.prototype.stop.call(this);
            };
            /**
             * @inheritDoc
             */
            __egretProto__.resume = function () {
                _super.prototype.resume.call(this);
                this.isPaused = false;
                if (this.currentSet && this.currentSet.length > 0) {
                    var n = this.currentSet.length;
                    for (var i = 0; i < n; i++) {
                        this.currentSet[i].resume();
                    }
                }
            };
            /**
             * @inheritDoc
             */
            __egretProto__.reverse = function () {
                _super.prototype.reverse.call(this);
                if (this.currentSet && this.currentSet.length > 0) {
                    var n = this.currentSet.length;
                    for (var i = 0; i < n; i++) {
                        this.currentSet[i].reverse();
                    }
                }
            };
            /**
             * 中断当前正在播放的所有效果，跳过尚未开始播放的所有效果，并立即跳至最终的复合效果。
             * @method egret.gui.SequenceInstance#end
             */
            __egretProto__.end = function () {
                this._endEffectCalled = true;
                if (this._activeEffectQueue && this._activeEffectQueue.length > 0) {
                    var queueCopy = this._activeEffectQueue.concat();
                    this._activeEffectQueue = null;
                    var currentInstances = queueCopy[this.currentSetIndex];
                    if (currentInstances) {
                        var currentCount = currentInstances.length;
                        for (var i = 0; i < currentCount; i++) {
                            currentInstances[i].end();
                        }
                    }
                    var n = queueCopy.length;
                    for (var j = this.currentSetIndex + 1; j < n; j++) {
                        var waitingInstances = queueCopy[j];
                        var m = waitingInstances.length;
                        for (var k = 0; k < m; k++) {
                            (waitingInstances[k])._playWithNoDuration();
                        }
                    }
                }
                this.isPaused = false;
                _super.prototype.end.call(this);
            };
            /**
             * @inheritDoc
             */
            __egretProto__._onEffectEnd = function (childEffect) {
                for (var i = 0; i < this.currentSet.length; i++) {
                    if (childEffect == this.currentSet[i]) {
                        this.currentSet.splice(i, 1);
                        break;
                    }
                }
                if (this._endEffectCalled)
                    return;
                if (this.currentSet.length == 0) {
                    if (false == this.playNextChildSet())
                        this.finishRepeat();
                }
            };
            __egretProto__.playCurrentChildSet = function () {
                var childEffect;
                var instances = this._activeEffectQueue[this.currentSetIndex];
                this.currentSet = [];
                for (var i = 0; i < instances.length; i++) {
                    childEffect = instances[i];
                    this.currentSet.push(childEffect);
                    childEffect.playReversed = this.playReversed;
                    childEffect.startEffect();
                }
                this.currentInstanceDuration += childEffect._actualDuration;
            };
            __egretProto__.playNextChildSet = function (offset) {
                if (offset === void 0) { offset = 0; }
                if (!this.playReversed) {
                    if (!this._activeEffectQueue || this.currentSetIndex++ >= this._activeEffectQueue.length - 1) {
                        return false;
                    }
                }
                else {
                    if (this.currentSetIndex-- <= 0)
                        return false;
                }
                this.playCurrentChildSet();
                return true;
            };
            return SequenceInstance;
        })(gui.CompositeEffectInstance);
        gui.SequenceInstance = SequenceInstance;
        SequenceInstance.prototype.__class__ = "egret.gui.SequenceInstance";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
