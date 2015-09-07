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
         * @class egret.gui.VSlider
         * @classdesc
         * 垂直滑块控件
         * @extends egret.gui.SliderBase
         */
        var VSlider = (function (_super) {
            __extends(VSlider, _super);
            /**
             * 构造函数
             * @method egret.gui.VSlider#constructor
             */
            function VSlider() {
                _super.call(this);
            }
            var __egretProto__ = VSlider.prototype;
            /**
             * 将相对于轨道的 x,y 像素位置转换为介于最小值和最大值（包括两者）之间的一个值
             * @param x {number}
             * @param y {number}
             * @returns {number}
             */
            __egretProto__.pointToValue = function (x, y) {
                if (!this.thumb || !this.track)
                    return 0;
                var range = this.maximum - this.minimum;
                var thumbRange = this.track.layoutBoundsHeight - this.thumb.layoutBoundsHeight;
                return this.minimum + ((thumbRange != 0) ? ((thumbRange - y) / thumbRange) * range : 0);
            };
            /**
             * 设置外观部件（通常为滑块）的边界，这些外观部件的几何图形不是完全由外观的布局指定的
             */
            __egretProto__.updateSkinDisplayList = function () {
                if (!this.thumb || !this.track)
                    return;
                var thumbHeight = this.thumb.layoutBoundsHeight;
                var thumbRange = this.track.layoutBoundsHeight - thumbHeight;
                var range = this.maximum - this.minimum;
                var thumbPosTrackY = (range > 0) ? thumbRange - (((this.pendingValue - this.minimum) / range) * thumbRange) : 0;
                var thumbPos = this.track.localToGlobal(0, thumbPosTrackY);
                var thumbPosX = thumbPos.x;
                var thumbPosY = thumbPos.y;
                var thumbPosParentY = this.thumb.parent.globalToLocal(thumbPosX, thumbPosY, egret.Point.identity).y;
                this.thumb.setLayoutBoundsPosition(this.thumb.layoutBoundsX, Math.round(thumbPosParentY));
                if (this.showTrackHighlight && this.trackHighlight && this.trackHighlight._DO_Props_._parent) {
                    var trackHighlightY = this.trackHighlight._DO_Props_._parent.globalToLocal(thumbPosX, thumbPosY, egret.Point.identity).y;
                    this.trackHighlight.y = Math.round(trackHighlightY + thumbHeight);
                    this.trackHighlight.height = Math.round(thumbRange - trackHighlightY);
                }
            };
            return VSlider;
        })(gui.SliderBase);
        gui.VSlider = VSlider;
        VSlider.prototype.__class__ = "egret.gui.VSlider";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
