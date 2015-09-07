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
         * @private
         */
        var UIComponentProperties = (function () {
            function UIComponentProperties() {
                this._id = null;
                this._isPopUp = false;
                this._owner = null;
                this._updateCompletePendingFlag = false;
                this._initialized = false;
                this._nestLevel = 0;
                this._enabled = true;
                this._width = 0;
                this._height = 0;
                this._minWidth = 0;
                this._maxWidth = 10000;
                this._minHeight = 0;
                this._maxHeight = 10000;
                this._measuredWidth = 0;
                this._measuredHeight = 0;
                this._left = NaN;
                this._right = NaN;
                this._top = NaN;
                this._bottom = NaN;
                this._horizontalCenter = NaN;
                this._verticalCenter = NaN;
                this._percentWidth = NaN;
                this._percentHeight = NaN;
                this._includeInLayout = true;
                /**
                 * 属性提交前组件旧的宽度
                 */
                this._oldWidth = NaN;
                /**
                 * 属性提交前组件旧的高度
                 */
                this._oldHeight = NaN;
                /**
                 * 属性提交前组件旧的X
                 * @member egret.gui.UIComponent#oldX
                 */
                this._oldX = NaN;
                /**
                 * 属性提交前组件旧的Y
                 * @member egret.gui.UIComponent#oldY
                 */
                this._oldY = NaN;
                /**
                 * @member egret.gui.UIComponent#_invalidatePropertiesFlag
                 */
                this._invalidatePropertiesFlag = false;
                /**
                 * @member egret.gui.UIComponent#_invalidateSizeFlag
                 */
                this._invalidateSizeFlag = false;
                /**
                 * 上一次测量的首选宽度
                 * @member egret.gui.UIComponent#_oldPreferWidth
                 */
                this._oldPreferWidth = NaN;
                /**
                 * 上一次测量的首选高度
                 * @member egret.gui.UIComponent#_oldPreferHeight
                 */
                this._oldPreferHeight = NaN;
                this._invalidateDisplayListFlag = false;
                this._validateNowFlag = false;
                /**
                 * _initialize()方法被调用过的标志。
                 */
                this._initializeCalled = false;
                /**
                 * 是否已经创建了自身的样式原型链
                 */
                this._hasOwnStyleChain = false;
                /**
                 * 样式原型链引用
                 */
                this._styleProtoChain = null;
                /**
                 * 一个性能优化的标志变量。某些子类可以设置为true显式表明自己不含有可设置样式的子项。
                 */
                this._hasNoStyleChild = false;
                /**
                 * 父级布局管理器设置了组件的宽度标志，尺寸设置优先级：自动布局>显式设置>自动测量
                 * @member egret.gui.UIComponent#_layoutWidthExplicitlySet
                 */
                this._layoutWidthExplicitlySet = false;
                /**
                 * 父级布局管理器设置了组件的高度标志，尺寸设置优先级：自动布局>显式设置>自动测量
                 * @member egret.gui.UIComponent#_layoutHeightExplicitlySet
                 */
                this._layoutHeightExplicitlySet = false;
            }
            var __egretProto__ = UIComponentProperties.prototype;
            return UIComponentProperties;
        })();
        gui.UIComponentProperties = UIComponentProperties;
        UIComponentProperties.prototype.__class__ = "egret.gui.UIComponentProperties";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
