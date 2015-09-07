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
         * @class egret.gui.BitmapLabel
         * @classdesc
         * 一行或多行不可编辑的位图文本控件
         * @extends egret.gui.UIComponent
         */
        var BitmapLabel = (function (_super) {
            __extends(BitmapLabel, _super);
            /**
             * @method egret.gui.Label#constructor
             */
            function BitmapLabel() {
                _super.call(this);
                this._bitmapText = null;
                this._textChanged = false;
                this._text = "";
                this.fontChanged = false;
                this._isLetterSpacingChanged = false;
                this._letterSpacing = 0;
                this._isLineSpacingChanged = false;
                this._lineSpacing = 0;
                this.createChildrenCalled = false;
                /**
                 * 上一次测量的宽度
                 */
                this.lastUnscaledWidth = NaN;
                this._padding = 0;
                this._paddingLeft = NaN;
                /**
                 *
                 * @type {number}
                 * @private
                 */
                this._paddingRight = NaN;
                /**
                 *
                 * @type {number}
                 * @private
                 */
                this._paddingTop = NaN;
                /**
                 *
                 * @type {number}
                 * @private
                 */
                this._paddingBottom = NaN;
                this.addEventListener(gui.UIEvent.UPDATE_COMPLETE, this.updateCompleteHandler, this);
            }
            var __egretProto__ = BitmapLabel.prototype;
            /**
             * 一个验证阶段完成
             */
            __egretProto__.updateCompleteHandler = function (event) {
                this.lastUnscaledWidth = NaN;
            };
            Object.defineProperty(__egretProto__, "text", {
                get: function () {
                    return this._text;
                },
                /**
                 * @member egret.gui.BitmapLabel#text
                 * 设置或获取显示文本
                 */
                set: function (value) {
                    if (this._text == value)
                        return;
                    this._text = value;
                    this._textChanged = true;
                    this.invalidateProperties();
                    this.invalidateSize();
                    this.invalidateDisplayList();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "font", {
                /**
                 * 位图字体标识符，可以是BitmapFont对象或者在资源表中的key。
                 * @member egret.gui.BitmapLabel#font
                 */
                get: function () {
                    return this._font;
                },
                set: function (value) {
                    if (this._font == value)
                        return;
                    this._font = value;
                    if (this.createChildrenCalled) {
                        this.parseFont();
                    }
                    else {
                        this.fontChanged = true;
                    }
                    this.invalidateProperties();
                    this.invalidateSize();
                    this.invalidateDisplayList();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "letterSpacing", {
                get: function () {
                    return this._letterSpacing;
                },
                /**
                 * 字符之间的距离
                 * @default 0
                 * @version 1.7.2
                 * @param value
                 */
                set: function (value) {
                    this._setLetterSpacing(value);
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__._setLetterSpacing = function (value) {
                this._letterSpacing = value;
                this._isLetterSpacingChanged = true;
                this.invalidateProperties();
                this.invalidateSize();
                this.invalidateDisplayList();
            };
            Object.defineProperty(__egretProto__, "lineSpacing", {
                get: function () {
                    return this._lineSpacing;
                },
                /**
                 * 行与行之间的距离
                 * @default 0
                 * @version 1.7.2
                 * @param value
                 */
                set: function (value) {
                    this._setLineSpacing(value);
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__._setLineSpacing = function (value) {
                this._lineSpacing = value;
                this._isLineSpacingChanged = true;
                this.invalidateProperties();
                this.invalidateSize();
                this.invalidateDisplayList();
            };
            /**
             * 创建子对象
             */
            __egretProto__.createChildren = function () {
                _super.prototype.createChildren.call(this);
                if (!this._bitmapText) {
                    this.checkBitmapText();
                }
                if (this.fontChanged) {
                    this.parseFont();
                }
                this.createChildrenCalled = true;
            };
            /**
             * 解析source
             */
            __egretProto__.parseFont = function () {
                this.fontChanged = false;
                var adapter = BitmapLabel.assetAdapter;
                if (!adapter) {
                    adapter = this.getAdapter();
                }
                if (!this._font) {
                    this.onFontChanged(null, null);
                }
                else {
                    adapter.getAsset(this._font, this.onFontChanged, this, null);
                }
            };
            /**
             * 获取资源适配器
             */
            __egretProto__.getAdapter = function () {
                var adapter;
                try {
                    adapter = egret.Injector.getInstance("egret.gui.IAssetAdapter");
                }
                catch (e) {
                    adapter = new gui.DefaultAssetAdapter();
                }
                BitmapLabel.assetAdapter = adapter;
                return adapter;
            };
            /**
             * 皮肤发生改变
             */
            __egretProto__.onFontChanged = function (bitmapFont, font) {
                if (font !== this._font)
                    return;
                this._bitmapText.font = bitmapFont;
                this.invalidateSize();
                this.invalidateDisplayList();
            };
            Object.defineProperty(__egretProto__, "padding", {
                /**
                 * 四个边缘的共同内边距。若单独设置了任一边缘的内边距，则该边缘的内边距以单独设置的值为准。
                 * 此属性主要用于快速设置多个边缘的相同内边距。默认值：0。
                 * @member egret.gui.BitmapLabel#padding
                 */
                get: function () {
                    return this._padding;
                },
                set: function (value) {
                    if (this._padding == value)
                        return;
                    this._padding = value;
                    this.invalidateSize();
                    this.invalidateDisplayList();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "paddingLeft", {
                /**
                 * 文字距离左边缘的空白像素,若为NaN将使用padding的值，默认值：NaN。
                 * @member egret.gui.BitmapLabel#paddingLeft
                 */
                get: function () {
                    return this._paddingLeft;
                },
                set: function (value) {
                    if (this._paddingLeft == value)
                        return;
                    this._paddingLeft = value;
                    this.invalidateSize();
                    this.invalidateDisplayList();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "paddingRight", {
                /**
                 * 文字距离右边缘的空白像素,若为NaN将使用padding的值，默认值：NaN。
                 * @member egret.gui.BitmapLabel#paddingRight
                 */
                get: function () {
                    return this._paddingRight;
                },
                set: function (value) {
                    if (this._paddingRight == value)
                        return;
                    this._paddingRight = value;
                    this.invalidateSize();
                    this.invalidateDisplayList();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "paddingTop", {
                /**
                 * 文字距离顶部边缘的空白像素,若为NaN将使用padding的值，默认值：NaN。
                 * @member egret.gui.BitmapLabel#paddingTop
                 */
                get: function () {
                    return this._paddingTop;
                },
                set: function (value) {
                    if (this._paddingTop == value)
                        return;
                    this._paddingTop = value;
                    this.invalidateSize();
                    this.invalidateDisplayList();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "paddingBottom", {
                /**
                 * 文字距离底部边缘的空白像素,若为NaN将使用padding的值，默认值：NaN。
                 * @member egret.gui.BitmapLabel#paddingBottom
                 */
                get: function () {
                    return this._paddingBottom;
                },
                set: function (value) {
                    if (this._paddingBottom == value)
                        return;
                    this._paddingBottom = value;
                    this.invalidateSize();
                    this.invalidateDisplayList();
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 计算  容器默认大小的最小值和最大值
             * @method egret.gui.BitmapLabel#measure
             */
            __egretProto__.measure = function () {
                //先提交属性，防止样式发生改变导致的测量不准确问题。
                if (this._UIC_Props_._invalidatePropertiesFlag)
                    this.validateProperties();
                if (this.isSpecialCase()) {
                    if (isNaN(this.lastUnscaledWidth)) {
                        this._UIC_Props_._oldPreferWidth = NaN;
                        this._UIC_Props_._oldPreferHeight = NaN;
                    }
                    else {
                        this.measureUsingWidth(this.lastUnscaledWidth);
                        return;
                    }
                }
                var availableWidth;
                if (!isNaN(this.explicitWidth))
                    availableWidth = this.explicitWidth;
                else if (this.maxWidth != 10000)
                    availableWidth = this.maxWidth;
                this.measureUsingWidth(availableWidth);
            };
            /**
             * 特殊情况，组件尺寸由父级决定，要等到父级UpdateDisplayList的阶段才能测量
             */
            __egretProto__.isSpecialCase = function () {
                return (!isNaN(this.percentWidth) || (!isNaN(this.left) && !isNaN(this.right))) && isNaN(this.explicitHeight) && isNaN(this.percentHeight);
            };
            /**
             * 使用指定的宽度进行测量
             */
            __egretProto__.measureUsingWidth = function (w) {
                if (this._textChanged) {
                    this._bitmapText.text = this._text;
                }
                if (this._isLetterSpacingChanged) {
                    this._bitmapText.letterSpacing = this._letterSpacing;
                }
                if (this._isLineSpacingChanged) {
                    this._bitmapText.lineSpacing = this._lineSpacing;
                }
                var padding = isNaN(this._padding) ? 0 : this._padding;
                var paddingL = isNaN(this._paddingLeft) ? padding : this._paddingLeft;
                var paddingR = isNaN(this._paddingRight) ? padding : this._paddingRight;
                var paddingT = isNaN(this._paddingTop) ? padding : this._paddingTop;
                var paddingB = isNaN(this._paddingBottom) ? padding : this._paddingBottom;
                this._bitmapText.width = NaN;
                this._bitmapText.height = NaN;
                if (!isNaN(w)) {
                    this._bitmapText.width = w - paddingL - paddingR;
                    this.measuredWidth = Math.ceil(this._bitmapText.measuredWidth);
                    this.measuredHeight = Math.ceil(this._bitmapText.measuredHeight);
                }
                else {
                    this.measuredWidth = Math.ceil(this._bitmapText.measuredWidth);
                    this.measuredHeight = Math.ceil(this._bitmapText.measuredHeight);
                }
                this.measuredWidth += paddingL + paddingR;
                this.measuredHeight += paddingT + paddingB;
            };
            /**
             * 通过设置此容器子项的位置和大小来响应大小更改
             * @method egret.gui.BitmapLabel#updateDisplayList
             * @param unscaledWidth {number}
             * @param unscaledHeight {number}
             */
            __egretProto__.updateDisplayList = function (unscaledWidth, unscaledHeight) {
                _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
                if (!this._bitmapText)
                    return;
                var padding = isNaN(this._padding) ? 0 : this._padding;
                var paddingL = isNaN(this._paddingLeft) ? padding : this._paddingLeft;
                var paddingR = isNaN(this._paddingRight) ? padding : this._paddingRight;
                var paddingT = isNaN(this._paddingTop) ? padding : this._paddingTop;
                var paddingB = isNaN(this._paddingBottom) ? padding : this._paddingBottom;
                this._bitmapText.x = paddingL;
                this._bitmapText.y = paddingT;
                if (this.isSpecialCase()) {
                    var firstTime = isNaN(this.lastUnscaledWidth) || this.lastUnscaledWidth != unscaledWidth;
                    this.lastUnscaledWidth = unscaledWidth;
                    if (firstTime) {
                        this._UIC_Props_._oldPreferWidth = NaN;
                        this._UIC_Props_._oldPreferHeight = NaN;
                        this.invalidateSize();
                        return;
                    }
                }
                //防止在父级validateDisplayList()阶段改变的text属性值，
                //接下来直接调用自身的updateDisplayList()而没有经过measure(),使用的测量尺寸是上一次的错误值。
                if (this._UIC_Props_._invalidateSizeFlag)
                    this.validateSize();
                if (!this._bitmapText.visible)
                    this._bitmapText.visible = true;
                this._bitmapText.width = unscaledWidth - paddingL - paddingR;
                var unscaledTextHeight = unscaledHeight - paddingT - paddingB;
                this._bitmapText.height = unscaledTextHeight;
            };
            __egretProto__.checkBitmapText = function () {
                if (this._bitmapText)
                    return;
                this._bitmapText = new egret.BitmapText();
                this._bitmapText.text = this._text;
                this._bitmapText.letterSpacing = this._letterSpacing;
                this._bitmapText.lineSpacing = this._lineSpacing;
                this._textChanged = false;
                this._isLetterSpacingChanged = false;
                this._isLineSpacingChanged = false;
                this._addToDisplayList(this._bitmapText);
            };
            /**
             * 处理对组件设置的属性
             */
            __egretProto__.commitProperties = function () {
                _super.prototype.commitProperties.call(this);
                if (!this._bitmapText) {
                    this.checkBitmapText();
                }
                if (this._textChanged) {
                    this._bitmapText.text = this._text;
                    this._textChanged = false;
                }
                if (this._isLetterSpacingChanged) {
                    this._bitmapText.letterSpacing = this._letterSpacing;
                    this._isLetterSpacingChanged = false;
                }
                if (this._isLineSpacingChanged) {
                    this._bitmapText.lineSpacing = this._lineSpacing;
                    this._isLineSpacingChanged = false;
                }
            };
            return BitmapLabel;
        })(gui.UIComponent);
        gui.BitmapLabel = BitmapLabel;
        BitmapLabel.prototype.__class__ = "egret.gui.BitmapLabel";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
