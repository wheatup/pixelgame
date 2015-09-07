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
         * @class egret.gui.TextBase
         * @classdesc
         * 文本基类,实现对文本的自动布局，样式属性设置。
         * @extends egret.gui.UIComponent
         * @implements egret.gui.IDisplayText
         */
        var TextBase = (function (_super) {
            __extends(TextBase, _super);
            /**
             * 构造函数
             * @method egret.gui.TextBase#constructor
             */
            function TextBase() {
                _super.call(this);
                /**
                 * 呈示此文本的内部 TextField
                 */
                this._textField = null;
                this.allStyleChanged = false;
                this.fontFamilyChanged = false;
                this._fontFamily = "SimSun";
                this._sizeChanged = false;
                this._size = 30;
                this._focusEnabled = true;
                this.boldChanged = false;
                this._bold = false;
                this.italicChanged = false;
                this._italic = false;
                this.textAlignChanged = false;
                this._textAlign = egret.HorizontalAlign.LEFT;
                this.verticalAlignChanged = false;
                this._verticalAlign = egret.VerticalAlign.TOP;
                this.lineSpacingChanged = false;
                this._lineSpacing = 0;
                this.textColorChanged = false;
                this._textColor = 0xFFFFFF;
                /**
                 * @member egret.gui.TextBase#_textChanged
                 */
                this._textChanged = false;
                this._text = "";
                this._textFlow = null;
                this._textFlowChanged = false;
                this._UIC_Props_._hasNoStyleChild = true;
            }
            var __egretProto__ = TextBase.prototype;
            /**
             * 检测对样式属性的更改
             * @param styleProp
             */
            __egretProto__.styleChanged = function (styleProp) {
                if (this.allStyleChanged) {
                    return;
                }
                if (styleProp) {
                    switch (styleProp) {
                        case "textColor":
                            this.textColorChanged = true;
                            break;
                        case "fontFamily":
                            this.fontFamilyChanged = true;
                            break;
                        case "size":
                            this._sizeChanged = true;
                            break;
                        case "bold":
                            this.boldChanged = true;
                            break;
                        case "italic":
                            this.italicChanged = true;
                            break;
                        case "textAlign":
                            this.textAlignChanged = true;
                            break;
                        case "verticalAlign":
                            this.verticalAlignChanged = true;
                            break;
                    }
                }
                else {
                    this.allStyleChanged = true;
                }
                this.invalidateProperties();
                this.invalidateSize();
                this.invalidateDisplayList();
            };
            Object.defineProperty(__egretProto__, "fontFamily", {
                /**
                 * 字体名称 。默认值：SimSun
                 * @member egret.gui.TextBase#fontFamily
                 */
                get: function () {
                    var chain = this._UIC_Props_._styleProtoChain;
                    if (chain && chain["fontFamily"] !== undefined) {
                        return chain["fontFamily"];
                    }
                    return this._fontFamily;
                },
                set: function (value) {
                    this.setStyle("fontFamily", value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "size", {
                /**
                 * 字号大小,默认值30 。
                 * @member egret.gui.TextBase#size
                 */
                get: function () {
                    var chain = this._UIC_Props_._styleProtoChain;
                    if (chain && chain["size"] !== undefined) {
                        return chain["size"];
                    }
                    return this._size;
                },
                set: function (value) {
                    if (value === undefined)
                        value = 0;
                    this.setStyle("size", value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "focusEnabled", {
                get: function () {
                    return this._focusEnabled;
                },
                set: function (value) {
                    this._focusEnabled = value;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 设置此组件的焦点
             * @inheritDoc
             */
            __egretProto__.setFocus = function () {
                if (this._focusEnabled == false)
                    return;
                if (this._textField)
                    this._textField.setFocus();
                //else
                //	super.setFocus();
            };
            Object.defineProperty(__egretProto__, "bold", {
                /**
                 * 是否显示为粗体，默认false。
                 * @member egret.gui.TextBase#bold
                 */
                get: function () {
                    var chain = this._UIC_Props_._styleProtoChain;
                    if (chain && chain["bold"] !== undefined) {
                        return chain["bold"];
                    }
                    return this._bold;
                },
                set: function (value) {
                    this.setStyle("bold", value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "italic", {
                /**
                 * 是否显示为斜体，默认false。
                 * @member egret.gui.TextBase#italic
                 */
                get: function () {
                    var chain = this._UIC_Props_._styleProtoChain;
                    if (chain && chain["italic"] !== undefined) {
                        return chain["italic"];
                    }
                    return this._italic;
                },
                set: function (value) {
                    this.setStyle("italic", value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "textAlign", {
                /**
                 * 文字的水平对齐方式 ,请使用HorizontalAlign中定义的常量。
                 * 默认值：HorizontalAlign.LEFT。
                 * @member egret.gui.TextBase#textAlign
                 */
                get: function () {
                    var chain = this._UIC_Props_._styleProtoChain;
                    if (chain && chain["textAlign"] !== undefined) {
                        return chain["textAlign"];
                    }
                    return this._textAlign;
                },
                set: function (value) {
                    this.setStyle("textAlign", value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "verticalAlign", {
                /**
                 * 文字的垂直对齐方式 ,请使用VerticalAlign中定义的常量。
                 * 默认值：VerticalAlign.TOP。
                 * @member egret.gui.TextBase#verticalAlign
                 */
                get: function () {
                    var chain = this._UIC_Props_._styleProtoChain;
                    if (chain && chain["verticalAlign"] !== undefined) {
                        return chain["verticalAlign"];
                    }
                    return this._verticalAlign;
                },
                set: function (value) {
                    this.setStyle("verticalAlign", value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "lineSpacing", {
                /**
                 * 行间距
                 * @member egret.gui.TextBase#lineSpacing
                 */
                get: function () {
                    return this._getLineSpacing();
                },
                set: function (value) {
                    this._setLineSpacing(value);
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__._getLineSpacing = function () {
                return this._lineSpacing;
            };
            __egretProto__._setLineSpacing = function (value) {
                if (this._lineSpacing == value)
                    return;
                this._lineSpacing = value;
                this.lineSpacingChanged = true;
                this.invalidateProperties();
                this.invalidateSize();
                this.invalidateDisplayList();
            };
            Object.defineProperty(__egretProto__, "textColor", {
                /**
                 * 文本颜色
                 * @member egret.gui.TextBase#textColor
                 */
                get: function () {
                    var chain = this._UIC_Props_._styleProtoChain;
                    if (chain && chain["textColor"] !== undefined) {
                        return chain["textColor"];
                    }
                    return this._textColor;
                },
                set: function (value) {
                    this.setStyle("textColor", value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "text", {
                /**
                 * 获得文体内容
                 * @member egret.gui.TextBase#text
                 */
                get: function () {
                    return this._text;
                },
                set: function (value) {
                    if (value == this._text)
                        return;
                    this._text = value || "";
                    this._textChanged = true;
                    this._textFlowChanged = false;
                    this._textFlow = [];
                    this.invalidateProperties();
                    this.invalidateSize();
                    this.invalidateDisplayList();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "textFlow", {
                get: function () {
                    return this._textFlow;
                },
                set: function (value) {
                    this._textFlow = value || [];
                    this._textFlowChanged = true;
                    this._textChanged = false;
                    this._text = "";
                    this.invalidateProperties();
                    this.invalidateSize();
                    this.invalidateDisplayList();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "textHeight", {
                /**
                 * 文本全部显示时的高度（无行间距）
                 */
                get: function () {
                    return this._textField == null ? 0 : this._textField.textHeight;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "textWidth", {
                /**
                 * 文本全部显示时宽
                 */
                get: function () {
                    return this._textField == null ? 0 : this._textField.textWidth;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 创建组件的子对象
             */
            __egretProto__.createChildren = function () {
                _super.prototype.createChildren.call(this);
                if (!this._textField) {
                    this.checkTextField();
                }
            };
            /**
             * 处理对组件设置的属性
             */
            __egretProto__.commitProperties = function () {
                _super.prototype.commitProperties.call(this);
                if (!this._textField) {
                    this.checkTextField();
                }
                if (this.allStyleChanged) {
                    this.allStyleChanged = false;
                    this.textColorChanged = true;
                    this.fontFamilyChanged = true;
                    this._sizeChanged = true;
                    this.boldChanged = true;
                    this.italicChanged = true;
                    this.textAlignChanged = true;
                    this.verticalAlignChanged = true;
                }
                if (this.fontFamilyChanged) {
                    this._textField.fontFamily = this.fontFamily;
                    this.fontFamilyChanged = false;
                }
                if (this._sizeChanged) {
                    this._textField.size = this.size;
                    this._sizeChanged = false;
                }
                if (this.boldChanged) {
                    this._textField.bold = this.bold;
                    this.boldChanged = false;
                }
                if (this.italic) {
                    this._textField.italic = this.italic;
                    this.italicChanged = false;
                }
                if (this.textAlignChanged) {
                    this._textField.textAlign = this.textAlign;
                    this.textAlignChanged = false;
                }
                if (this.verticalAlignChanged) {
                    this._textField.verticalAlign = this.verticalAlign;
                    this.verticalAlignChanged = false;
                }
                if (this.lineSpacingChanged) {
                    this._textField.lineSpacing = this._lineSpacing;
                    this.lineSpacingChanged = false;
                }
                if (this.textColorChanged) {
                    this._textField.textColor = this.textColor;
                    this.textColorChanged = false;
                }
                if (this._textChanged) {
                    this._textField.text = this._text;
                }
                if (this._textFlowChanged) {
                    this._textField.textFlow = this._textFlow;
                }
                if (this._textChanged || this._textFlowChanged) {
                    this._text = this._textField.text;
                    this._textFlow = this._textField.textFlow;
                    this._textChanged = false;
                    this._textFlowChanged = false;
                }
            };
            /**
             * 检查是否创建了textField对象，没有就创建一个。
             */
            __egretProto__.checkTextField = function () {
                if (!this._textField) {
                    this._createTextField();
                    if (this._textChanged) {
                        this._textField.text = this._text;
                    }
                    if (this._textFlowChanged) {
                        this._textField.textFlow = this._textFlow;
                    }
                    this.invalidateProperties();
                }
            };
            __egretProto__._createTextField = function () {
                this._textField = new egret.TextField;
                this._textField.fontFamily = this.fontFamily;
                this._textField.size = this.size;
                this._textField.textAlign = this.textAlign;
                this._textField.verticalAlign = this.verticalAlign;
                this._textField.lineSpacing = this._lineSpacing;
                this._textField.textColor = this.textColor;
                this._textField.multiline = true;
                this._addToDisplayList(this._textField);
            };
            __egretProto__._textFieldChanged = function () {
                this._text = this._textField.text;
                this._textFlow = this._textField.textFlow;
            };
            /**
             * 计算组件的默认大小和（可选）默认最小大小
             */
            __egretProto__.measure = function () {
                _super.prototype.measure.call(this);
                this.measuredWidth = TextBase.DEFAULT_MEASURED_WIDTH;
                this.measuredHeight = TextBase.DEFAULT_MEASURED_HEIGHT;
            };
            /**
             * 更新显示列表
             * @param unscaledWidth {number}
             * @param unscaledHeight {number}
             */
            __egretProto__.$updateDisplayList = function (unscaledWidth, unscaledHeight) {
                _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            };
            /**
             * @param unscaledWidth {number}
             * @param unscaledHeight {number}
             */
            __egretProto__.updateDisplayList = function (unscaledWidth, unscaledHeight) {
                _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
                this._textField.width = unscaledWidth;
                this._textField.height = unscaledHeight;
            };
            /**
             * 更新属性时调度 PropertyChangeEvent 的 Helper 方法
             * @param propertyName
             * @param oldValue
             * @param value
             */
            __egretProto__.dispatchPropertyChangeEvent = function (propertyName, oldValue, value) {
                if (this.hasEventListener("propertyChange"))
                    gui.PropertyChangeEvent.dispatchPropertyChangeEvent(this, gui.PropertyChangeEventKind.UPDATE, propertyName, oldValue, value, this);
            };
            /**
             * 默认的文本测量宽度
             * @constant egret.gui.TextBase.DEFAULT_MEASURED_WIDTH
             */
            TextBase.DEFAULT_MEASURED_WIDTH = 160;
            /**
             * 默认的文本测量高度
             * @constant egret.gui.TextBase.DEFAULT_MEASURED_HEIGHT
             */
            TextBase.DEFAULT_MEASURED_HEIGHT = 22;
            return TextBase;
        })(gui.UIComponent);
        gui.TextBase = TextBase;
        TextBase.prototype.__class__ = "egret.gui.TextBase";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
