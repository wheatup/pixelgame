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
         * @class egret.gui.EaseInOutBase
         * @classdesc
         * EaseInOutBase 类是提供缓动功能的基类。
         * @implements egret.gui.IEaser
         */
        var EaseInOutBase = (function () {
            /**
             * @param easeInFraction 缓入过程所占动画播放时间的百分比。剩余即为缓出的时间。
             * 默认值为 EasingFraction.IN_OUT，它会缓入前一半时间，并缓出剩余的一半时间。
             * @method egret.gui.EaseInOutBase#constructor
             */
            function EaseInOutBase(easeInFraction) {
                if (easeInFraction === void 0) { easeInFraction = 0.5; }
                this._easeInFraction = .5;
                this.easeInFraction = easeInFraction;
            }
            var __egretProto__ = EaseInOutBase.prototype;
            Object.defineProperty(__egretProto__, "easeInFraction", {
                /**
                 * 缓入过程所占动画播放时间的百分比。剩余即为缓出的时间。
                 * 有效值为 0.0 到 1.0。
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
            __egretProto__.ease = function (fraction) {
                var easeOutFraction = 1 - this._easeInFraction;
                if (fraction <= this._easeInFraction && this._easeInFraction > 0)
                    return this._easeInFraction * this._easeIn(fraction / this._easeInFraction);
                else
                    return this._easeInFraction + easeOutFraction * this._easeOut((fraction - this._easeInFraction) / easeOutFraction);
            };
            /**
             * 在动画的缓入阶段期间计算已经缓动部分要映射到的值。
             */
            __egretProto__._easeIn = function (fraction) {
                return fraction;
            };
            /**
             * 在动画的缓出阶段期间计算已经缓动部分要映射到的值。
             */
            __egretProto__._easeOut = function (fraction) {
                return fraction;
            };
            return EaseInOutBase;
        })();
        gui.EaseInOutBase = EaseInOutBase;
        EaseInOutBase.prototype.__class__ = "egret.gui.EaseInOutBase";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
