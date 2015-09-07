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
         * @class egret.gui.ItemRenderer
         * @classdesc
         * 项呈示器基类
         * @extends egret.gui.ButtonBase
         * @implements egret.gui.IItemRenderer
         */
        var ItemRenderer = (function (_super) {
            __extends(ItemRenderer, _super);
            /**
             * 构造函数
             * @method egret.gui.ItemRenderer#constructor
             */
            function ItemRenderer() {
                _super.call(this);
                this.dataChangedFlag = false;
                this._data = null;
                this._selected = false;
                this._itemIndex = -1;
                this.touchChildren = true;
            }
            var __egretProto__ = ItemRenderer.prototype;
            Object.defineProperty(__egretProto__, "data", {
                /**
                 * @member egret.gui.ItemRenderer#data
                 */
                get: function () {
                    return this._data;
                },
                set: function (value) {
                    //这里不能加if(_data==value)return;的判断，会导致数据源无法刷新的问题
                    this._data = value;
                    if (this.initialized || this.parent) {
                        this.dataChangedFlag = false;
                        this.dataChanged();
                    }
                    else {
                        this.dataChangedFlag = true;
                        this.invalidateProperties();
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 子类复写此方法以在data数据源发生改变时跟新显示列表。
             * 与直接复写_data的setter方法不同，它会确保在皮肤已经附加完成后再被调用。
             * @method egret.gui.ItemRenderer#dataChanged
             */
            __egretProto__.dataChanged = function () {
            };
            Object.defineProperty(__egretProto__, "selected", {
                /**
                 * @member egret.gui.ItemRenderer#selected
                 */
                get: function () {
                    return this._selected;
                },
                set: function (value) {
                    if (this._selected == value)
                        return;
                    this._selected = value;
                    this.invalidateSkinState();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "itemIndex", {
                /**
                 * @member egret.gui.ItemRenderer#itemIndex
                 */
                get: function () {
                    return this._itemIndex;
                },
                set: function (value) {
                    this._itemIndex = value;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 处理对组件设置的属性
             * @method egret.gui.ItemRenderer#commitProperties
             */
            __egretProto__.commitProperties = function () {
                _super.prototype.commitProperties.call(this);
                if (this.dataChangedFlag) {
                    this.dataChangedFlag = false;
                    this.dataChanged();
                }
            };
            /**
             * 返回要应用到呈示器的状态的名称
             * @method egret.gui.ItemRenderer#getCurrentSkinState
             * @returns {string}
             */
            __egretProto__.getCurrentSkinState = function () {
                if (this._selected)
                    return "down";
                return _super.prototype.getCurrentSkinState.call(this);
            };
            return ItemRenderer;
        })(gui.ButtonBase);
        gui.ItemRenderer = ItemRenderer;
        ItemRenderer.prototype.__class__ = "egret.gui.ItemRenderer";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
