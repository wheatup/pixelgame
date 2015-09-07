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
         * @class egret.gui.DropDownController
         * @classdesc
         * 用于处理因用户交互而打开和关闭下拉列表的操作的控制器
         * @extends egret.EventDispatcher
         */
        var DropDownController = (function (_super) {
            __extends(DropDownController, _super);
            /**
             * 构造函数
             * @method egret.gui.DropDownController#constructor
             */
            function DropDownController() {
                _super.call(this);
                /**
                 * 鼠标按下标志
                 */
                this.mouseIsDown = false;
                this._openButton = null;
                this._dropDown = null;
                this._isOpen = false;
                this._closeOnResize = true;
                this._rollOverOpenDelay = NaN;
                this.rollOverOpenDelayTimer = null;
            }
            var __egretProto__ = DropDownController.prototype;
            Object.defineProperty(__egretProto__, "openButton", {
                /**
                 * 下拉按钮实例
                 * @member egret.gui.DropDownController#openButton
                 */
                get: function () {
                    return this._openButton;
                },
                set: function (value) {
                    if (this._openButton === value)
                        return;
                    this.removeOpenTriggers();
                    this._openButton = value;
                    this.addOpenTriggers();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "dropDown", {
                /**
                 * 下拉区域显示对象
                 * @member egret.gui.DropDownController#dropDown
                 */
                get: function () {
                    return this._dropDown;
                },
                set: function (value) {
                    if (this._dropDown === value)
                        return;
                    this._dropDown = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "isOpen", {
                /**
                 * 下拉列表已经打开的标志
                 * @member egret.gui.DropDownController#isOpen
                 */
                get: function () {
                    return this._isOpen;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "closeOnResize", {
                /**
                 * 如果为 true，则在调整舞台大小时会关闭下拉列表。
                 * @member egret.gui.DropDownController#closeOnResize
                 */
                get: function () {
                    return this._closeOnResize;
                },
                set: function (value) {
                    if (this._closeOnResize == value)
                        return;
                    if (this.isOpen)
                        this.removeCloseOnResizeTrigger();
                    this._closeOnResize = value;
                    this.addCloseOnResizeTrigger();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "rollOverOpenDelay", {
                /**
                 * 指定滑过锚点按钮时打开下拉列表要等待的延迟（以毫秒为单位）。
                 * 如果设置为 NaN，则下拉列表会在单击时打开，而不是在滑过时打开。默认值NaN
                 * @member egret.gui.DropDownController#rollOverOpenDelay
                 */
                get: function () {
                    return this._rollOverOpenDelay;
                },
                set: function (value) {
                    if (this._rollOverOpenDelay == value)
                        return;
                    this.removeOpenTriggers();
                    this._rollOverOpenDelay = value;
                    this.addOpenTriggers();
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 添加触发下拉列表打开的事件监听
             */
            __egretProto__.addOpenTriggers = function () {
                if (this.openButton) {
                    if (isNaN(this.rollOverOpenDelay))
                        this.openButton.addEventListener(gui.UIEvent.BUTTON_DOWN, this._openButton_buttonDownHandler, this);
                    else
                        this.openButton.addEventListener(egret.TouchEvent.TOUCH_ROLL_OVER, this._openButton_rollOverHandler, this);
                }
            };
            /**
             * 移除触发下拉列表打开的事件监听
             */
            __egretProto__.removeOpenTriggers = function () {
                if (this.openButton) {
                    if (isNaN(this.rollOverOpenDelay))
                        this.openButton.removeEventListener(gui.UIEvent.BUTTON_DOWN, this._openButton_buttonDownHandler, this);
                    else
                        this.openButton.removeEventListener(egret.TouchEvent.TOUCH_ROLL_OVER, this._openButton_rollOverHandler, this);
                }
            };
            /**
             * 添加触发下拉列表关闭的事件监听
             */
            __egretProto__.addCloseTriggers = function () {
                if (gui.UIGlobals.stage) {
                    if (isNaN(this.rollOverOpenDelay)) {
                        gui.UIGlobals.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stage_mouseDownHandler, this);
                        gui.UIGlobals.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stage_mouseUpHandler_noRollOverOpenDelay, this);
                    }
                    else {
                        gui.UIGlobals.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.stage_mouseMoveHandler, this);
                    }
                    this.addCloseOnResizeTrigger();
                }
            };
            /**
             * 移除触发下拉列表关闭的事件监听
             */
            __egretProto__.removeCloseTriggers = function () {
                if (gui.UIGlobals.stage) {
                    if (isNaN(this.rollOverOpenDelay)) {
                        gui.UIGlobals.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stage_mouseDownHandler, this);
                        gui.UIGlobals.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stage_mouseUpHandler_noRollOverOpenDelay, this);
                    }
                    else {
                        gui.UIGlobals.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.stage_mouseMoveHandler, this);
                        gui.UIGlobals.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
                        gui.UIGlobals.stage.removeEventListener(egret.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this);
                    }
                    this.removeCloseOnResizeTrigger();
                }
            };
            /**
             * 添加舞台尺寸改变的事件监听
             */
            __egretProto__.addCloseOnResizeTrigger = function () {
                if (this.closeOnResize)
                    gui.UIGlobals.stage.addEventListener(egret.Event.RESIZE, this.stage_resizeHandler, this);
            };
            /**
             * 移除舞台尺寸改变的事件监听
             */
            __egretProto__.removeCloseOnResizeTrigger = function () {
                if (this.closeOnResize)
                    gui.UIGlobals.stage.removeEventListener(egret.Event.RESIZE, this.stage_resizeHandler, this);
            };
            /**
             * 检查鼠标是否在DropDown或者openButton区域内。
             */
            __egretProto__.isTargetOverDropDownOrOpenButton = function (target) {
                if (target) {
                    if (this.openButton && this.openButton.contains(target))
                        return true;
                    if (this.hitAreaAdditions != null) {
                        for (var i = 0; i < this.hitAreaAdditions.length; i++) {
                            if (this.hitAreaAdditions[i] == target || ((this.hitAreaAdditions[i] instanceof egret.DisplayObjectContainer) && (this.hitAreaAdditions[i]).contains(target)))
                                return true;
                        }
                    }
                    if (this.dropDown instanceof egret.DisplayObjectContainer) {
                        if ((this.dropDown).contains(target))
                            return true;
                    }
                    else {
                        if (target == this.dropDown)
                            return true;
                    }
                }
                return false;
            };
            /**
             * 打开下拉列表
             * @method egret.gui.DropDownController#openDropDown
             */
            __egretProto__.openDropDown = function () {
                this.openDropDownHelper();
            };
            /**
             * 执行打开下拉列表
             */
            __egretProto__.openDropDownHelper = function () {
                if (!this.isOpen) {
                    this.addCloseTriggers();
                    this._isOpen = true;
                    if (this.openButton)
                        this.openButton._setKeepDown(true);
                    gui.UIEvent.dispatchUIEvent(this, gui.UIEvent.OPEN);
                }
            };
            /**
             * 关闭下拉列表
             * @method egret.gui.DropDownController#closeDropDown
             * @param commit {boolean}
             */
            __egretProto__.closeDropDown = function (commit) {
                if (this.isOpen) {
                    this._isOpen = false;
                    if (this.openButton)
                        this.openButton._setKeepDown(false);
                    var dde = new gui.UIEvent(gui.UIEvent.CLOSE, false, true);
                    if (!commit)
                        dde.preventDefault();
                    this.dispatchEvent(dde);
                    this.removeCloseTriggers();
                }
            };
            /**
             * openButton上按下鼠标事件
             * @method egret.gui.DropDownController#_openButton_buttonDownHandler
             * @param event {Event}
             */
            __egretProto__._openButton_buttonDownHandler = function (event) {
                if (this.isOpen)
                    this.closeDropDown(true);
                else {
                    this.mouseIsDown = true;
                    this.openDropDownHelper();
                }
            };
            /**
             * openButton上鼠标经过事件
             * @method egret.gui.DropDownController#_openButton_rollOverHandler
             * @param event {TouchEvent}
             */
            __egretProto__._openButton_rollOverHandler = function (event) {
                if (this.rollOverOpenDelay == 0)
                    this.openDropDownHelper();
                else {
                    this.openButton.addEventListener(egret.TouchEvent.TOUCH_ROLL_OUT, this.openButton_rollOutHandler, this);
                    this.rollOverOpenDelayTimer = new egret.Timer(this.rollOverOpenDelay, 1);
                    this.rollOverOpenDelayTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.rollOverDelay_timerCompleteHandler, this);
                    this.rollOverOpenDelayTimer.start();
                }
            };
            /**
             * openButton上鼠标移出事件
             */
            __egretProto__.openButton_rollOutHandler = function (event) {
                if (this.rollOverOpenDelayTimer && this.rollOverOpenDelayTimer.running) {
                    this.rollOverOpenDelayTimer.stop();
                    this.rollOverOpenDelayTimer = null;
                }
                this.openButton.removeEventListener(egret.TouchEvent.TOUCH_ROLL_OUT, this.openButton_rollOutHandler, this);
            };
            /**
             * 到达鼠标移入等待延迟打开的时间。
             */
            __egretProto__.rollOverDelay_timerCompleteHandler = function (event) {
                this.openButton.removeEventListener(egret.TouchEvent.TOUCH_ROLL_OUT, this.openButton_rollOutHandler, this);
                this.rollOverOpenDelayTimer = null;
                this.openDropDownHelper();
            };
            /**
             * 舞台上鼠标按下事件
             * @method egret.gui.DropDownController#stage_mouseDownHandler
             * @param event {Event}
             */
            __egretProto__.stage_mouseDownHandler = function (event) {
                if (this.mouseIsDown) {
                    this.mouseIsDown = false;
                    return;
                }
                if (!this.dropDown || (this.dropDown && (event.target == this.dropDown || (this.dropDown instanceof egret.DisplayObjectContainer && !(this.dropDown).contains((event.target)))))) {
                    var target = (event.target);
                    if (this.openButton && target && this.openButton.contains(target))
                        return;
                    if (this.hitAreaAdditions != null) {
                        for (var i = 0; i < this.hitAreaAdditions.length; i++) {
                            if (this.hitAreaAdditions[i] == event.target || ((this.hitAreaAdditions[i] instanceof egret.DisplayObjectContainer) && (this.hitAreaAdditions[i]).contains((event.target))))
                                return;
                        }
                    }
                    this.closeDropDown(true);
                }
            };
            /**
             * 舞台上鼠标移动事件
             * @method egret.gui.DropDownController#stage_mouseMoveHandler
             * @param event {Event}
             */
            __egretProto__.stage_mouseMoveHandler = function (event) {
                var target = (event.target);
                var containedTarget = this.isTargetOverDropDownOrOpenButton(target);
                if (containedTarget)
                    return;
                if (event instanceof egret.TouchEvent && event.touchDown) {
                    gui.UIGlobals.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
                    gui.UIGlobals.stage.addEventListener(egret.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this);
                    return;
                }
                this.closeDropDown(true);
            };
            /**
             * 舞台上鼠标弹起事件
             * @method egret.gui.DropDownController#stage_mouseUpHandler_noRollOverOpenDelay
             * @param event {Event}
             */
            __egretProto__.stage_mouseUpHandler_noRollOverOpenDelay = function (event) {
                if (this.mouseIsDown) {
                    this.mouseIsDown = false;
                    return;
                }
            };
            /**
             * 舞台上鼠标弹起事件
             * @method egret.gui.DropDownController#stage_mouseUpHandler
             * @param event {Event}
             */
            __egretProto__.stage_mouseUpHandler = function (event) {
                var target = (event.target);
                var containedTarget = this.isTargetOverDropDownOrOpenButton(target);
                if (containedTarget) {
                    gui.UIGlobals.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
                    gui.UIGlobals.stage.removeEventListener(egret.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this);
                    return;
                }
                this.closeDropDown(true);
            };
            /**
             * 舞台尺寸改变事件
             * @method egret.gui.DropDownController#stage_resizeHandler
             * @param event {Event}
             */
            __egretProto__.stage_resizeHandler = function (event) {
                this.closeDropDown(true);
            };
            /**
             * 舞台上鼠标滚轮事件
             */
            __egretProto__.stage_mouseWheelHandler = function (event) {
                if (this.dropDown && !((this.dropDown).contains((event.target)) && event.isDefaultPrevented()))
                    this.closeDropDown(false);
            };
            return DropDownController;
        })(egret.EventDispatcher);
        gui.DropDownController = DropDownController;
        DropDownController.prototype.__class__ = "egret.gui.DropDownController";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
