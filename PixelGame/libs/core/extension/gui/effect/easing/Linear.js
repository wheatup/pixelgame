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
         * @class egret.gui.Power
         * @classdesc
         * Linear 类使用三个阶段定义缓动：加速、匀速运动和减速。
         * @implements egret.gui.IEaser
         */
        var Linear = (function () {
            /**
             * @param easeInFraction 在加速阶段中持续时间占总时间的百分比，在 0.0 和 1.0 之间。
             * @param easeOutFraction 在减速阶段中持续时间占总时间的百分比，在 0.0 和 1.0 之间。
             * @method egret.gui.Linear#constructor
             */
            function Linear(easeInFraction, easeOutFraction) {
                if (easeInFraction === void 0) { easeInFraction = 0; }
                if (easeOutFraction === void 0) { easeOutFraction = 0; }
                this._easeInFraction = 0;
                this._easeOutFraction = 0;
                this.easeInFraction = easeInFraction;
                this.easeOutFraction = easeOutFraction;
            }
            var __egretProto__ = Linear.prototype;
            Object.defineProperty(__egretProto__, "easeInFraction", {
                /**
                 * 在加速阶段中持续时间占总时间的百分比，在 0.0 和 1.0 之间。
                 */
                get: function () {
                    return this._easeInFraction;
                },
                set: function (value) {
                    this._easeInFraction = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "easeOutFraction", {
                /**
                 * 在减速阶段中持续时间占总时间的百分比，在 0.0 和 1.0 之间。
                 */
                get: function () {
                    return this._easeOutFraction;
                },
                set: function (value) {
                    this._easeOutFraction = value;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.ease = function (fraction) {
                if (this.easeInFraction == 0 && this.easeOutFraction == 0)
                    return fraction;
                var runRate = 1 / (1 - this.easeInFraction / 2 - this.easeOutFraction / 2);
                if (fraction < this.easeInFraction)
                    return fraction * runRate * (fraction / this.easeInFraction) / 2;
                if (fraction > (1 - this.easeOutFraction)) {
                    var decTime = fraction - (1 - this.easeOutFraction);
                    var decProportion = decTime / this.easeOutFraction;
                    return runRate * (1 - this.easeInFraction / 2 - this.easeOutFraction + decTime * (2 - decProportion) / 2);
                }
                return runRate * (fraction - this.easeInFraction / 2);
            };
            return Linear;
        })();
        gui.Linear = Linear;
        Linear.prototype.__class__ = "egret.gui.Linear";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
