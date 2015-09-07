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
         * @class egret.gui.Parallel
         * @classdesc
         * Parallel 效果同时播放多个子效果。
         * @extends egret.gui.CompositeEffect
         */
        var Parallel = (function (_super) {
            __extends(Parallel, _super);
            /**
             * @method egret.gui.Parallel#constructor
             */
            function Parallel(target) {
                if (target === void 0) { target = null; }
                _super.call(this, target);
                this.instanceClass = gui.ParallelInstance;
            }
            var __egretProto__ = Parallel.prototype;
            Object.defineProperty(__egretProto__, "compositeDuration", {
                get: function () {
                    var parallelDuration = 0;
                    for (var i = 0; i < this.children.length; ++i) {
                        var childDuration;
                        var child = (this.children[i]);
                        if (child instanceof gui.CompositeEffect)
                            childDuration = child.compositeDuration;
                        else
                            childDuration = child.duration;
                        childDuration = childDuration * child.repeatCount + (child.repeatDelay * (child.repeatCount - 1)) + child.startDelay;
                        parallelDuration = Math.max(parallelDuration, childDuration);
                    }
                    return parallelDuration;
                },
                enumerable: true,
                configurable: true
            });
            return Parallel;
        })(gui.CompositeEffect);
        gui.Parallel = Parallel;
        Parallel.prototype.__class__ = "egret.gui.Parallel";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
