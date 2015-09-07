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
        var TextArea = (function (_super) {
            __extends(TextArea, _super);
            /**
             * 构造函数
             */
            function TextArea() {
                _super.call(this);
                /**
                 * 水平滚动条策略改变标志
                 */
                this.horizontalScrollPolicyChanged = false;
                this._horizontalScrollPolicy = null;
                /**
                 * 垂直滚动条策略改变标志
                 */
                this.verticalScrollPolicyChanged = false;
                this._verticalScrollPolicy = null;
                /**
                 * [SkinPart]实体滚动条组件
                 */
                this.scroller = null;
            }
            var __egretProto__ = TextArea.prototype;
            Object.defineProperty(__egretProto__, "widthInChars", {
                /**
                 * 控件的默认宽度（使用字号：size为单位测量）。 若同时设置了maxChars属性，将会根据两者测量结果的最小值作为测量宽度。
                 */
                get: function () {
                    return this._getWidthInChars();
                },
                set: function (value) {
                    this._setWidthInChars(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "heightInLines", {
                /**
                 * 控件的默认高度（以行为单位测量）。
                 */
                get: function () {
                    return this._getHeightInLines();
                },
                set: function (value) {
                    this._setHeightInLines(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "horizontalScrollPolicy", {
                /**
                 * 水平滚动条显示策略，参见ScrollPolicy类定义的常量。
                 */
                get: function () {
                    return this._horizontalScrollPolicy;
                },
                set: function (value) {
                    if (this._horizontalScrollPolicy == value)
                        return;
                    this._horizontalScrollPolicy = value;
                    this.horizontalScrollPolicyChanged = true;
                    this.invalidateProperties();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "verticalScrollPolicy", {
                /**
                 * 垂直滚动条显示策略，参见ScrollPolicy类定义的常量。
                 */
                get: function () {
                    return this._verticalScrollPolicy;
                },
                set: function (value) {
                    if (this._verticalScrollPolicy == value)
                        return;
                    this._verticalScrollPolicy = value;
                    this.verticalScrollPolicyChanged = true;
                    this.invalidateProperties();
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__._setText = function (value) {
                _super.prototype._setText.call(this, value);
                this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
            };
            /**
             * 处理对组件设置的属性
             * @inheritDoc
             */
            __egretProto__.commitProperties = function () {
                _super.prototype.commitProperties.call(this);
                if (this.horizontalScrollPolicyChanged) {
                    if (this.scroller)
                        this.scroller.horizontalScrollPolicy = this.horizontalScrollPolicy;
                    this.horizontalScrollPolicyChanged = false;
                }
                if (this.verticalScrollPolicyChanged) {
                    if (this.scroller)
                        this.scroller.verticalScrollPolicy = this.verticalScrollPolicy;
                    this.verticalScrollPolicyChanged = false;
                }
            };
            /**
             * 添加外观部件时调用
             * @inheritDoc
             */
            __egretProto__.partAdded = function (partName, instance) {
                _super.prototype.partAdded.call(this, partName, instance);
                if (instance == this.textDisplay) {
                    this.textDisplay.multiline = true;
                }
                else if (instance == this.scroller) {
                }
            };
            /**
             * 创建外观部件的引用
             * @inheritDoc
             */
            __egretProto__.createSkinParts = function () {
                this.textDisplay = new gui.EditableText();
                this.textDisplay.widthInChars = 15;
                this.textDisplay.heightInLines = 10;
                this._addToDisplayList((this.textDisplay));
                this.partAdded("textDisplay", this.textDisplay);
            };
            return TextArea;
        })(gui.SkinnableTextBase);
        gui.TextArea = TextArea;
        TextArea.prototype.__class__ = "egret.gui.TextArea";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
