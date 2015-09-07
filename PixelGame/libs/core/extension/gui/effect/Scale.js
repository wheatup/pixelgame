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
         * @class egret.gui.Scale
         * @classdesc
         * Scale 效果围绕转换中心在 x 和 y 方向上缩放目标对象
         * @extends egret.gui.AnimateTransform
         */
        var Scale = (function (_super) {
            __extends(Scale, _super);
            /**
             * @method egret.gui.Scale#constructor
             */
            function Scale(target) {
                if (target === void 0) { target = null; }
                _super.call(this, target);
                this.instanceClass = gui.AnimateTransformInstance;
            }
            var __egretProto__ = Scale.prototype;
            __egretProto__.createInstance = function (target) {
                if (target === void 0) { target = null; }
                this.motionPaths = new Array();
                return _super.prototype.createInstance.call(this, target);
            };
            __egretProto__._initInstance = function (instance) {
                this._addMotionPath("scaleX", this.scaleXFrom, this.scaleXTo, this.scaleXBy);
                this._addMotionPath("scaleY", this.scaleYFrom, this.scaleYTo, this.scaleYBy);
                _super.prototype._initInstance.call(this, instance);
            };
            return Scale;
        })(gui.AnimateTransform);
        gui.Scale = Scale;
        Scale.prototype.__class__ = "egret.gui.Scale";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
