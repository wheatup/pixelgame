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
         * @class egret.gui.ParallelInstance
         * @classdesc
         * ParallelInstance 类用于实现 Parallel 效果的实例类
         * @extends egret.gui.CompositeEffectInstance
         */
        var ParallelInstance = (function (_super) {
            __extends(ParallelInstance, _super);
            /**
             * @method egret.gui.ParallelInstance#constructor
             */
            function ParallelInstance(target) {
                _super.call(this, target);
                this.isReversed = false;
            }
            var __egretProto__ = ParallelInstance.prototype;
            Object.defineProperty(__egretProto__, "_durationWithoutRepeat", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    var _duration = 0;
                    var n = this._childSets.length;
                    for (var i = 0; i < n; i++) {
                        var instances = this._childSets[i];
                        _duration = Math.max(instances[0]._actualDuration, _duration);
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
                var compositeDur = (this.effect).compositeDuration;
                var firstCycleDur = compositeDur + this.startDelay + this.repeatDelay;
                var laterCycleDur = compositeDur + this.repeatDelay;
                var totalDur = firstCycleDur + laterCycleDur * (this.repeatCount - 1);
                var childPlayheadTime;
                if (value <= firstCycleDur) {
                    childPlayheadTime = Math.min(value - this.startDelay, compositeDur);
                    this._playCount = 1;
                }
                else {
                    if (value >= totalDur && this.repeatCount != 0) {
                        childPlayheadTime = compositeDur;
                        this._playCount = this.repeatCount;
                    }
                    else {
                        var valueAfterFirstCycle = value - firstCycleDur;
                        childPlayheadTime = valueAfterFirstCycle % laterCycleDur;
                        this._playCount = 1 + valueAfterFirstCycle / laterCycleDur;
                    }
                }
                for (var i = 0; i < this._childSets.length; i++) {
                    var instances = this._childSets[i];
                    var m = instances.length;
                    for (var j = 0; j < m; j++)
                        instances[j].playheadTime = this.playReversed ? Math.max(0, (childPlayheadTime - (this._durationWithoutRepeat - instances[j]._actualDuration))) : childPlayheadTime;
                }
                if (this.playReversed && this.replayEffectQueue != null && this.replayEffectQueue.length > 0) {
                    var position = this._durationWithoutRepeat - this.playheadTime;
                    var numDone = this.replayEffectQueue.length;
                    for (i = numDone - 1; i >= 0; i--) {
                        var childEffect = this.replayEffectQueue[i];
                        if (position <= childEffect._actualDuration) {
                            if (this._activeEffectQueue == null)
                                this._activeEffectQueue = [];
                            this._activeEffectQueue.push(childEffect);
                            this.replayEffectQueue.splice(i, 1);
                            childEffect.playReversed = this.playReversed;
                            childEffect.startEffect();
                        }
                    }
                }
            };
            /**
             * @inheritDoc
             */
            __egretProto__.play = function () {
                this.doneEffectQueue = [];
                this._activeEffectQueue = [];
                this.replayEffectQueue = [];
                _super.prototype.play.call(this);
                var n = 0;
                var i = 0;
                n = this._childSets.length;
                for (i = 0; i < n; i++) {
                    var instances = this._childSets[i];
                    var m = instances.length;
                    for (var j = 0; j < m && this._activeEffectQueue != null; j++) {
                        var childEffect = instances[j];
                        if (this.playReversed && childEffect._actualDuration < this._durationWithoutRepeat) {
                            this.replayEffectQueue.push(childEffect);
                            this.startTimer();
                        }
                        else {
                            childEffect.playReversed = this.playReversed;
                            this._activeEffectQueue.push(childEffect);
                        }
                    }
                }
                if (this._activeEffectQueue.length > 0) {
                    var queueCopy = this._activeEffectQueue.slice(0);
                    for (i = 0; i < queueCopy.length; i++) {
                        queueCopy[i].startEffect();
                    }
                }
            };
            /**
             * @inheritDoc
             */
            __egretProto__.pause = function () {
                _super.prototype.pause.call(this);
                if (this._activeEffectQueue) {
                    var n = this._activeEffectQueue.length;
                    for (var i = 0; i < n; i++) {
                        this._activeEffectQueue[i].pause();
                    }
                }
            };
            /**
             * @inheritDoc
             */
            __egretProto__.stop = function () {
                this.stopTimer();
                if (this._activeEffectQueue) {
                    var queueCopy = this._activeEffectQueue.concat();
                    this._activeEffectQueue = null;
                    var n = queueCopy.length;
                    for (var i = 0; i < n; i++) {
                        if (queueCopy[i])
                            queueCopy[i].stop();
                    }
                }
                _super.prototype.stop.call(this);
            };
            /**
             * @inheritDoc
             */
            __egretProto__.resume = function () {
                _super.prototype.resume.call(this);
                if (this._activeEffectQueue) {
                    var n = this._activeEffectQueue.length;
                    for (var i = 0; i < n; i++) {
                        this._activeEffectQueue[i].resume();
                    }
                }
            };
            /**
             * @inheritDoc
             */
            __egretProto__.reverse = function () {
                _super.prototype.reverse.call(this);
                var n = 0;
                var i = 0;
                if (this.isReversed) {
                    n = this._activeEffectQueue.length;
                    for (i = 0; i < n; i++) {
                        this._activeEffectQueue[i].reverse();
                    }
                    this.stopTimer();
                }
                else {
                    this.replayEffectQueue = this.doneEffectQueue.splice(0);
                    n = this._activeEffectQueue.length;
                    for (i = 0; i < n; i++) {
                        this._activeEffectQueue[i].reverse();
                    }
                    this.startTimer();
                }
                this.isReversed = !this.isReversed;
            };
            /**
             * @inheritDoc
             */
            __egretProto__.end = function () {
                this._endEffectCalled = true;
                this.stopTimer();
                if (this._activeEffectQueue) {
                    var queueCopy = this._activeEffectQueue.concat();
                    this._activeEffectQueue = null;
                    var n = queueCopy.length;
                    for (var i = 0; i < n; i++) {
                        if (queueCopy[i])
                            queueCopy[i].end();
                    }
                }
                _super.prototype.end.call(this);
            };
            /**
             * @inheritDoc
             */
            __egretProto__._onEffectEnd = function (childEffect) {
                if (this._endEffectCalled || this._activeEffectQueue == null)
                    return;
                var n = this._activeEffectQueue.length;
                for (var i = 0; i < n; i++) {
                    if (childEffect == this._activeEffectQueue[i]) {
                        this.doneEffectQueue.push(childEffect);
                        this._activeEffectQueue.splice(i, 1);
                        break;
                    }
                }
                if (n == 1) {
                    this.finishRepeat();
                }
            };
            __egretProto__.startTimer = function () {
                if (!this.timer) {
                    this.timer = new egret.Timer(10);
                    this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
                }
                this.timer.start();
            };
            __egretProto__.stopTimer = function () {
                if (this.timer)
                    this.timer.reset();
            };
            __egretProto__.timerHandler = function (event) {
                var position = this._durationWithoutRepeat - this.playheadTime;
                var numDone = this.replayEffectQueue.length;
                if (numDone == 0) {
                    this.stopTimer();
                    return;
                }
                for (var i = numDone - 1; i >= 0; i--) {
                    var childEffect = this.replayEffectQueue[i];
                    if (position <= childEffect._actualDuration) {
                        if (this._activeEffectQueue == null)
                            this._activeEffectQueue = [];
                        this._activeEffectQueue.push(childEffect);
                        this.replayEffectQueue.splice(i, 1);
                        childEffect.playReversed = this.playReversed;
                        childEffect.startEffect();
                    }
                }
            };
            return ParallelInstance;
        })(gui.CompositeEffectInstance);
        gui.ParallelInstance = ParallelInstance;
        ParallelInstance.prototype.__class__ = "egret.gui.ParallelInstance";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
