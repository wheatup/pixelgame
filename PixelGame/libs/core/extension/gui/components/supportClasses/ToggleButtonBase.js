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
         * @class egret.gui.ToggleButtonBase
         * @classdesc
         * 切换按钮组件基类
         * @extends egret.gui.ButtonBase
         */
        var ToggleButtonBase = (function (_super) {
            __extends(ToggleButtonBase, _super);
            /**
             * 构造函数
             * @method egret.gui.ToggleButtonBase#constructor
             */
            function ToggleButtonBase() {
                _super.call(this);
                /**
                 *
                 * @type {boolean}
                 * @private
                 */
                this._selected = false;
                /**
                 * 是否根据鼠标事件自动变换选中状态,默认true。仅框架内使用。
                 * @private
                 */
                this._autoSelected = true;
            }
            var __egretProto__ = ToggleButtonBase.prototype;
            Object.defineProperty(__egretProto__, "selected", {
                /**
                 * 按钮处于按下状态时为 true，而按钮处于弹起状态时为 false。
                 * @member egret.gui.ToggleButtonBase#selected
                 */
                get: function () {
                    return this._selected;
                },
                set: function (value) {
                    this._setSelected(value);
                },
                enumerable: true,
                configurable: true
            });
            /**
             *
             * @param value
             * @private
             */
            __egretProto__._setSelected = function (value) {
                if (value == this._selected)
                    return;
                this._selected = value;
                gui.UIEvent.dispatchUIEvent(this, gui.UIEvent.VALUE_COMMIT);
                ;
                this.invalidateSkinState();
            };
            /**
             * 返回要应用到外观的状态的名称
             * @method egret.gui.ToggleButtonBase#getCurrentSkinState
             * @returns {string}
             */
            __egretProto__.getCurrentSkinState = function () {
                var state = _super.prototype.getCurrentSkinState.call(this);
                if (!this.selected) {
                    return state;
                }
                else {
                    var selectedState = state + "AndSelected";
                    var skin = this.skin;
                    if (skin && skin.hasState(selectedState)) {
                        return selectedState;
                    }
                    return state == "disabled" ? "disabled" : "down";
                }
            };
            /**
             * 当在用户单击按钮之后处理 MouseEvent.MOUSE_UP 事件时，将调用此方法
             */
            __egretProto__.buttonReleased = function () {
                _super.prototype.buttonReleased.call(this);
                if (!this._autoSelected || !this.enabled)
                    return;
                this.selected = !this.selected;
                this.dispatchEventWith(egret.Event.CHANGE);
            };
            return ToggleButtonBase;
        })(gui.ButtonBase);
        gui.ToggleButtonBase = ToggleButtonBase;
        ToggleButtonBase.prototype.__class__ = "egret.gui.ToggleButtonBase";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
