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
         *  @classdesc
         * HScrollBar（水平 ScrollBar）控件可以在因数据太多而不能在显示区域中以水平方向完全显示时控制显示的数据部分。
         尽管可以使用 HScrollBar 控件作为独立控件，但通常将其结合作为另一组组件的一部分来提供滚动功能
         */
        var HScrollBar = (function (_super) {
            __extends(HScrollBar, _super);
            function HScrollBar() {
                _super.apply(this, arguments);
                this._thumbLengthRatio = 1;
            }
            var __egretProto__ = HScrollBar.prototype;
            /**
             *
             * @param width
             * @param contentWidth
             * @private
             */
            __egretProto__._setViewportMetric = function (width, contentWidth) {
                var max = Math.max(0, contentWidth - width);
                this._setMaximun(max);
                this._setMinimun(0);
                this._thumbLengthRatio = (contentWidth > width) ? width / contentWidth : 1;
            };
            Object.defineProperty(__egretProto__, "trackAlpha", {
                get: function () {
                    return 1;
                },
                /**
                 * @deprecated
                 */
                set: function (value) {
                    egret.$warn(1016, "HScrollBar.trackAlpha");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "thumbAlpha", {
                get: function () {
                    return 1;
                },
                /**
                 * @deprecated
                 */
                set: function (value) {
                    egret.$warn(1016, "HScrollBar.thumbAlpha");
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.setPosition = function (value) {
                this._setValue(value);
            };
            __egretProto__.getPosition = function () {
                return this._getValue();
            };
            /**
             *
             * @param value
             * @private
             */
            __egretProto__._setValue = function (value) {
                value = Math.max(0, value);
                _super.prototype._setValue.call(this, value);
            };
            /**
             * [覆盖] 更新 value 属性，并且如果 viewport 为非 null，则将其 horizontalScrollPosition 设置为 value
             * @param value
             */
            __egretProto__.setValue = function (value) {
                _super.prototype.setValue.call(this, value);
            };
            /**
             *
             * @param animation
             * @private
             */
            __egretProto__._animationUpdateHandler = function (animation) {
                this.pendingValue = animation.currentValue["value"];
                this.value = animation.currentValue["value"];
                this.dispatchEventWith(egret.Event.CHANGE);
            };
            /**
             * 设置外观部件的边界，这些外观部件的几何图形不是完全由外观的布局指定的
             */
            __egretProto__.updateSkinDisplayList = function () {
                if (!this.thumb || !this.track)
                    return;
                var thumbWidth = this.track.layoutBoundsWidth * this._thumbLengthRatio;
                var oldThumbWidth = this.thumb.layoutBoundsWidth;
                var thumbRange = this.track.layoutBoundsWidth - this.thumb.layoutBoundsWidth;
                var range = this.maximum - this.minimum;
                var thumbPosTrackX = (range > 0) ? ((this.pendingValue - this.minimum) / range) * thumbRange : 0;
                var thumbPos = this.track.localToGlobal(thumbPosTrackX, 0);
                var thumbPosX = thumbPos.x;
                var thumbPosY = thumbPos.y;
                var thumbPosParentX = this.thumb.parent.globalToLocal(thumbPosX, thumbPosY, egret.Point.identity).x;
                this.thumb.setLayoutBoundsPosition(Math.round(thumbPosParentX), this.thumb.layoutBoundsY);
                if (thumbWidth != oldThumbWidth)
                    this.thumb.setLayoutBoundsSize(thumbWidth, this.thumb.layoutBoundsHeight);
            };
            return HScrollBar;
        })(gui.HSlider);
        gui.HScrollBar = HScrollBar;
        HScrollBar.prototype.__class__ = "egret.gui.HScrollBar";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
