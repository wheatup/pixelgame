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
         * @class egret.gui.Scroller
         * @classdesc
         * 滚动条组件
         * @extends egret.gui.UIComponent
         * @implements egret.gui.IVisualElementContainer
            */
        var Scroller = (function (_super) {
            __extends(Scroller, _super);
            /**
             * 构造函数
             * @method egret.gui.Scroller#constructor
                */
            function Scroller() {
                _super.call(this);
                /**
                 * 开始滚动的阈值，当触摸点偏离初始触摸点的距离超过这个值时才会触发滚动
                 */
                this.scrollBeginThreshold = 10;
                /**
                 * 滚动速度，这个值为需要的速度与默认速度的比值。
                 * 取值范围为 scrollSpeed > 0 赋值为 2 时，速度是默认速度的 2 倍
                 */
                this.scrollSpeed = 1;
                /**
                     * [SkinPart]水平滚动条
                     */
                this.horizontalScrollBar = null;
                /**
                 * [SkinPart]垂直滚动条
                 */
                this.verticalScrollBar = null;
                egret.ScrollView.call(this);
                this._Scr_Props_ = new egret.gui.ScrollerProperties();
            }
            var __egretProto__ = Scroller.prototype;
            __egretProto__.setContent = function (content) {
                this._content = content;
                this._removeEvents();
                this._addEvents();
                this._ScrV_Props_._scrollLeft = content.horizontalScrollPosition;
                this._ScrV_Props_._scrollTop = content.verticalScrollPosition;
            };
            __egretProto__._updateContentPosition = function () {
                var content = this._content;
                content.horizontalScrollPosition = this._ScrV_Props_._scrollLeft;
                content.verticalScrollPosition = this._ScrV_Props_._scrollTop;
                content.setLayoutBoundsSize(this._UIC_Props_._width, this._UIC_Props_._height);
                this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
            };
            __egretProto__.getMaxScrollLeft = function () {
                var content = this._content;
                var max = content.contentWidth - content.width;
                var min = content.initialized ? 0 : (content.horizontalScrollPosition || 0);
                return Math.max(max, min);
            };
            __egretProto__.getMaxScrollTop = function () {
                var content = this._content;
                var max = content.contentHeight - content.height;
                var min = content.initialized ? 0 : (content.verticalScrollPosition || 0);
                return Math.max(max, min);
            };
            __egretProto__._getContentWidth = function () {
                return this._content.contentWidth;
            };
            __egretProto__._getContentHeight = function () {
                return this._content.contentHeight;
            };
            __egretProto__._onScrollStarted = function () {
                egret.ScrollView.prototype._onScrollStarted.call(this);
                gui.UIEvent.dispatchUIEvent(this, gui.UIEvent.CHANGE_START);
            };
            __egretProto__._onScrollFinished = function () {
                egret.ScrollView.prototype._onScrollFinished.call(this);
                gui.UIEvent.dispatchUIEvent(this, gui.UIEvent.CHANGE_END);
            };
            /**
             * 计算组件的默认大小和（可选）默认最小大小
             * @method egret.gui.Scroller#measure
             */
            __egretProto__.measure = function () {
                if (!this._Scr_Props_._viewport)
                    return;
                this.measuredWidth = this._Scr_Props_._viewport.preferredWidth;
                this.measuredHeight = this._Scr_Props_._viewport.preferredHeight;
            };
            /**
             * 绘制对象和/或设置其子项的大小和位置
             * @param unscaledWidth {number}
             * @param unscaledHeight {number}
             */
            __egretProto__.updateDisplayList = function (unscaledWidth, unscaledHeight) {
                this.viewport && this.viewport.setLayoutBoundsSize(unscaledWidth, unscaledHeight);
                this._checkScrollPolicy();
                if (this._ScrV_Props_._horizontalScrollPolicy != "off") {
                    var pos = this.viewport.horizontalScrollPosition;
                    var maxPos = this.getMaxScrollLeft();
                    var pos = Math.min(pos, maxPos);
                    this.setViewportHScrollPosition(pos);
                    var hbar = this.horizontalScrollBar;
                    if (hbar) {
                        hbar._setViewportMetric(unscaledWidth, this._Scr_Props_._viewport.contentWidth);
                        hbar._setWidth(unscaledWidth - (hbar.left || 0) - (hbar.right || 0));
                        hbar.x = hbar.left || 0;
                        hbar.y = unscaledHeight - this.horizontalScrollBar.layoutBoundsHeight;
                        hbar.visible = this._ScrV_Props_._horizontalScrollPolicy == gui.ScrollPolicy.ON || this._ScrV_Props_._hCanScroll;
                        if (this._Scr_Props_._autoHideScrollBars)
                            hbar.alpha = 0;
                    }
                }
                if (this._ScrV_Props_._verticalScrollPolicy != "off") {
                    var pos = this.viewport.verticalScrollPosition;
                    var maxPos = this.getMaxScrollTop();
                    pos = Math.min(pos, maxPos);
                    this.setViewportVScrollPosition(pos);
                    var vbar = this.verticalScrollBar;
                    if (vbar) {
                        vbar._setViewportMetric(unscaledHeight, this._Scr_Props_._viewport.contentHeight);
                        vbar._setHeight(unscaledHeight - (vbar.top || 0) - (vbar.bottom || 0));
                        vbar.y = vbar.top || 0;
                        vbar.x = unscaledWidth - this.verticalScrollBar.layoutBoundsWidth;
                        vbar.visible = this._ScrV_Props_._verticalScrollPolicy == gui.ScrollPolicy.ON || this._ScrV_Props_._vCanScroll;
                        if (this._Scr_Props_._autoHideScrollBars)
                            vbar.alpha = 0;
                    }
                }
            };
            Object.defineProperty(__egretProto__, "verticalScrollPolicy", {
                /**
                 * 垂直滚动条显示策略，参见ScrollPolicy类定义的常量。
                 * @member egret.gui.Scroller#verticalScrollPolicy
                 */
                get: function () {
                    return this._ScrV_Props_._verticalScrollPolicy;
                },
                set: function (value) {
                    if (value == this._ScrV_Props_._verticalScrollPolicy)
                        return;
                    this._ScrV_Props_._verticalScrollPolicy = value;
                    this._checkVbar();
                    this.verticalScrollPolicy = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "horizontalScrollPolicy", {
                /**
                 * 水平滚动条显示策略，参见ScrollPolicy类定义的常量。
                 * @member egret.gui.Scroller#horizontalScrollPolicy
                 */
                get: function () {
                    return this._ScrV_Props_._horizontalScrollPolicy;
                },
                set: function (value) {
                    if (value == this._ScrV_Props_._horizontalScrollPolicy)
                        return;
                    this._ScrV_Props_._horizontalScrollPolicy = value;
                    this._checkHbar();
                    this.horizontalScrollPolicy = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "viewport", {
                /**
                 * 要滚动的视域组件。
                 * @member egret.gui.Scroller#viewport
                 */
                get: function () {
                    return this._Scr_Props_._viewport;
                },
                set: function (value) {
                    if (value == this._Scr_Props_._viewport)
                        return;
                    this.uninstallViewport();
                    this._Scr_Props_._viewport = value;
                    this.installViewport();
                    this.dispatchEventWith("viewportChanged");
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 安装并初始化视域组件
             */
            __egretProto__.installViewport = function () {
                var viewport = this.viewport;
                this.addEventListener(egret.Event.CHANGE, this._scrollerChangedHandler, this);
                if (this._createChildrenCalled && viewport) {
                    viewport.clipAndEnableScrolling = true;
                    this.setContent(viewport);
                    this._addToDisplayListAt(viewport, 0);
                    viewport.addEventListener(egret.gui.PropertyChangeEvent.PROPERTY_CHANGE, this._viewportChangedHandler, this);
                }
            };
            /**
             * 卸载视域组件
             */
            __egretProto__.uninstallViewport = function () {
                if (this.viewport) {
                    this.viewport.clipAndEnableScrolling = false;
                    this.viewport.removeEventListener(egret.gui.PropertyChangeEvent.PROPERTY_CHANGE, this._viewportChangedHandler, this);
                    this._removeFromDisplayList(this.viewport);
                }
            };
            /**
             *
             * @param e
             * @private
             */
            __egretProto__._viewportChangedHandler = function (e) {
                if (e.property == "horizontalScrollPosition")
                    this.setViewportHScrollPosition(this.viewport.horizontalScrollPosition);
                if (e.property == "verticalScrollPosition")
                    this.setViewportVScrollPosition(this.viewport.verticalScrollPosition);
                if (e.property == "contentWidth" || e.property == "contentHeight") {
                    this.invalidateDisplayList();
                    this.invalidateSize();
                }
            };
            /**
             *
             * @param e
             * @private
             */
            __egretProto__._scrollerChangedHandler = function (e) {
                this.setViewportHScrollPosition(this.scrollLeft);
                this.setViewportVScrollPosition(this.scrollTop);
            };
            /**
             *
             * @param pos
             */
            __egretProto__.setViewportVScrollPosition = function (pos) {
                if (this.scrollTop != pos)
                    this.scrollTop = pos;
                if (this.verticalScrollBar && this.verticalScrollBar.value != pos) {
                    this.verticalScrollBar.setPosition(pos);
                    this.hideOrShow(true);
                    this.setAutoHideTimer();
                }
            };
            __egretProto__.setViewportHScrollPosition = function (pos) {
                if (this.scrollLeft != pos)
                    this.scrollLeft = pos;
                if (this.horizontalScrollBar && this.horizontalScrollBar.value != pos) {
                    this.horizontalScrollBar._setValue(pos);
                    this.hideOrShow(true);
                    this.setAutoHideTimer();
                }
            };
            /**
             * 缓动到水平滚动位置
             * @method egret.gui.Scroller#throwHorizontally
             * @param hspTo {number}
             * @param duration {number}
             */
            __egretProto__.throwHorizontally = function (hspTo, duration) {
                if (duration === void 0) { duration = 500; }
                this.setScrollLeft(hspTo, duration);
            };
            /**
             * 缓动到垂直滚动位置
             * @method egret.gui.Scroller#throwVertically
             * @param vspTo {number}
             * @param duration {number}
             */
            __egretProto__.throwVertically = function (vspTo, duration) {
                if (duration === void 0) { duration = 500; }
                this.setScrollTop(vspTo, duration);
            };
            Object.defineProperty(__egretProto__, "autoHideScrollBars", {
                /**
                 * 是否自动隐藏滚动条
                 * @member egret.gui.Scroller#autoHideScrollBars
                 */
                get: function () {
                    return this._Scr_Props_._autoHideScrollBars;
                },
                set: function (value) {
                    if (this._Scr_Props_._autoHideScrollBars == value)
                        return;
                    this._Scr_Props_._autoHideScrollBars = value;
                    if (value)
                        this.setAutoHideTimer();
                    else
                        this.hideOrShow(true);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "autoHideDelay", {
                /**
                 * 自动隐藏滚动条延时时间(毫秒)，当autoHideScrollBars为true时有效
                 * @member egret.gui.Scroller#autoHideDelay
                 */
                get: function () {
                    return this._Scr_Props_._autoHideDelay;
                },
                set: function (value) {
                    if (this._Scr_Props_._autoHideDelay == value)
                        return;
                    this._Scr_Props_._autoHideDelay = value;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.setAutoHideTimer = function () {
                if (!this._Scr_Props_._autoHideScrollBars || !this.initialized)
                    return;
                if (!this.horizontalScrollBar && !this.verticalScrollBar)
                    return;
                if (this._Scr_Props_._autoHideTimer != NaN) {
                    egret.clearTimeout(this._Scr_Props_._autoHideTimer);
                }
                this._Scr_Props_._autoHideTimer = egret.setTimeout(this.hideOrShow.bind(this, false), this, this._Scr_Props_._autoHideDelay);
            };
            __egretProto__.hideOrShow = function (show) {
                var _this = this;
                if (!this.initialized || (!this.horizontalScrollBar && !this.verticalScrollBar))
                    return;
                if (this._Scr_Props_._autoHideShowAnimat == null) {
                    this._Scr_Props_._autoHideShowAnimat = new gui.Animation(function (b) {
                        var a = b.currentValue["alpha"];
                        if (_this.horizontalScrollBar)
                            _this.horizontalScrollBar.alpha = a;
                        if (_this.verticalScrollBar)
                            _this.verticalScrollBar.alpha = a;
                    }, this);
                }
                else {
                    if (this._Scr_Props_._animatTargetIsShow == show)
                        return;
                    this._Scr_Props_._autoHideShowAnimat.isPlaying && this._Scr_Props_._autoHideShowAnimat.stop();
                }
                this._Scr_Props_._animatTargetIsShow = show;
                var animat = this._Scr_Props_._autoHideShowAnimat;
                animat.motionPaths = [
                    new gui.SimpleMotionPath("alpha", show ? 0 : 1, show ? 1 : 0)
                ];
                animat.duration = show ? 100 : 300;
                animat.play();
            };
            Object.defineProperty(__egretProto__, "numElements", {
                /**
                 * @member egret.gui.Scroller#numElements
                 */
                get: function () {
                    return this.viewport ? 1 : 0;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 抛出索引越界异常
             */
            __egretProto__.throwRangeError = function (index) {
                egret.$error(3011, index);
            };
            /**
             * 如果存在视域，且传入的索引为 0，则返回该视域
             * @param index {number}
             * @returns {IVisualElement}
             */
            __egretProto__.getElementAt = function (index) {
                if (this.viewport && index == 0)
                    return this.viewport;
                else
                    this.throwRangeError(index);
                return null;
            };
            /**
             * 如果传入的元素是视域，则返回 0
             * @param element {IVisualElement}
             * @returns {number}
             */
            __egretProto__.getElementIndex = function (element) {
                if (element != null && element == this.viewport)
                    return 0;
                else
                    return -1;
            };
            /**
             * 确定指定显示对象是 DisplayObjectContainer 实例的子项还是该实例本身
             * @param element {IVisualElement}
             * @returns {boolean}
             */
            __egretProto__.containsElement = function (element) {
                if (element != null && element == this.viewport)
                    return true;
                return false;
            };
            __egretProto__.throwNotSupportedError = function () {
                egret.$error(3012);
            };
            /**
             * Scroller 不支持该操作
             * @deprecated
             * @param element {IVisualElement}
             * @returns {IVisualElement}
             */
            __egretProto__.addElement = function (element) {
                this.throwNotSupportedError();
                return null;
            };
            /**
             * Scroller 不支持该操作
             * @deprecated
             * @param element {IVisualElement}
             * @param index {number}
             * @returns {IVisualElement}
             */
            __egretProto__.addElementAt = function (element, index) {
                this.throwNotSupportedError();
                return null;
            };
            /**
             * Scroller 不支持该操作
             * @deprecated
             * @param element {IVisualElement}
             * @returns {IVisualElement}
             */
            __egretProto__.removeElement = function (element) {
                this.throwNotSupportedError();
                return null;
            };
            /**
             * Scroller 不支持该操作
             * @deprecated
             * @param index {number}
             * @returns {IVisualElement}
             */
            __egretProto__.removeElementAt = function (index) {
                this.throwNotSupportedError();
                return null;
            };
            /**
             * Scroller 不支持该操作
             * @deprecated
             */
            __egretProto__.removeAllElements = function () {
                this.throwNotSupportedError();
            };
            /**
             * Scroller 不支持该操作
             * @deprecated
             * @param element {IVisualElement}
             * @param index {number}
             */
            __egretProto__.setElementIndex = function (element, index) {
                this.throwNotSupportedError();
            };
            /**
             * Scroller 不支持该操作
             * @deprecated
             * @param element1 {IVisualElement}
             * @param element2 {IVisualElement}
             */
            __egretProto__.swapElements = function (element1, element2) {
                this.throwNotSupportedError();
            };
            /**
             * Scroller 不支持该操作
             * @deprecated
             * @param index1 {number}
             * @param index2 {number}
             */
            __egretProto__.swapElementsAt = function (index1, index2) {
                this.throwNotSupportedError();
            };
            /**
             * Scroller 不支持该操作
             * @deprecated
             * @param child {DisplayObject}
             * @returns {DisplayObject}
             */
            __egretProto__.addChild = function (child) {
                this.throwNotSupportedError();
                return null;
            };
            /**
             * Scroller 不支持该操作
             * @deprecated
             * @param child {DisplayObject}
             * @param index {number}
             * @returns {DisplayObject}
             */
            __egretProto__.addChildAt = function (child, index) {
                this.throwNotSupportedError();
                return null;
            };
            /**
             * Scroller 不支持该操作
             * @deprecated
             * @param child {DisplayObject}
             * @returns {DisplayObject}
             */
            __egretProto__.removeChild = function (child) {
                this.throwNotSupportedError();
                return null;
            };
            /**
             * Scroller 不支持该操作
             * @deprecated
             * @param index {number}
             * @returns {DisplayObject}
             */
            __egretProto__.removeChildAt = function (index) {
                this.throwNotSupportedError();
                return null;
            };
            /**
             * Scroller 不支持该操作
             * @deprecated
             * @param child {DisplayObject}
             * @param index {number}
             */
            __egretProto__.setChildIndex = function (child, index) {
                this.throwNotSupportedError();
            };
            /**
             * Scroller 不支持该操作
             * @deprecated
             * @param child1 {DisplayObject}
             * @param child2 {DisplayObject}
             */
            __egretProto__.swapChildren = function (child1, child2) {
                this.throwNotSupportedError();
            };
            /**
             * Scroller 不支持该操作
             * @deprecated
             * @param index1 {number}
             * @param index2 {number}
             */
            __egretProto__.swapChildrenAt = function (index1, index2) {
                this.throwNotSupportedError();
            };
            /**
             *
             * @private
             */
            __egretProto__._checkHbar = function () {
                if (this._ScrV_Props_._horizontalScrollPolicy == "off") {
                    this._uninstallHorizontalScrollBar();
                    return;
                }
                if (!this.horizontalScrollBar)
                    return;
                var bar = this.horizontalScrollBar;
                bar.addEventListener(egret.Event.CHANGE, this.hBarChanged, this, false);
                bar._setViewportMetric(this._Scr_Props_._viewport.width, this._Scr_Props_._viewport.contentWidth);
                if (bar.owner && "removeElement" in bar.owner) {
                    bar.owner.removeElement(bar);
                }
                this._addToDisplayList(this.horizontalScrollBar);
            };
            /**
             *
             * @private
             */
            __egretProto__._checkVbar = function () {
                if (this._ScrV_Props_._verticalScrollPolicy == "off") {
                    this._uninstallVerticalScrollBar();
                    return;
                }
                if (!this.verticalScrollBar)
                    return;
                if (this.verticalScrollBar.owner == this)
                    return;
                var vbar = this.verticalScrollBar;
                vbar.addEventListener(egret.Event.CHANGE, this.vBarChanged, this, false);
                vbar._setViewportMetric(this._Scr_Props_._viewport.height, this._Scr_Props_._viewport.contentHeight);
                if (vbar.owner && "removeElement" in vbar.owner) {
                    vbar.owner.removeElement(vbar);
                }
                this._addToDisplayList(this.verticalScrollBar);
            };
            /**
             * 创建容器的子元素
             */
            __egretProto__.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.installViewport();
            };
            /**
             * 若皮肤是ISkin,则调用此方法附加皮肤中的公共部件
             * @param partName {string}
             * @param instance {any}
             */
            __egretProto__.partAdded = function (partName, instance) {
                _super.prototype.partAdded.call(this, partName, instance);
                if (instance == this.horizontalScrollBar) {
                    this._checkHbar();
                }
                if (instance == this.verticalScrollBar) {
                    this._checkVbar();
                }
            };
            /**
             * 若皮肤是ISkin，则调用此方法卸载皮肤之前注入的公共部件
             * @method egret.gui.Scroller#partRemoved
             * @param partName {string}
             * @param instance {any}
             */
            __egretProto__.partRemoved = function (partName, instance) {
                _super.prototype.partRemoved.call(this, partName, instance);
                if (this.horizontalScrollBar == instance) {
                    if (this.horizontalScrollBar.parent == this)
                        this._uninstallHorizontalScrollBar();
                    this.horizontalScrollBar = null;
                }
                if (this.verticalScrollBar == instance) {
                    if (this.verticalScrollBar.parent == this)
                        this._uninstallVerticalScrollBar();
                    this.verticalScrollBar = null;
                }
            };
            __egretProto__._uninstallHorizontalScrollBar = function () {
                if (this.horizontalScrollBar == null)
                    return;
                this._removeFromDisplayList(this.horizontalScrollBar);
                this.horizontalScrollBar.removeEventListener(egret.Event.CHANGE, this.hBarChanged, this, false);
            };
            __egretProto__._uninstallVerticalScrollBar = function () {
                if (this.verticalScrollBar == null)
                    return;
                this._removeFromDisplayList(this.verticalScrollBar);
                this.verticalScrollBar.removeEventListener(egret.Event.CHANGE, this.vBarChanged, this, false);
            };
            __egretProto__.hBarChanged = function (e) {
                this.setViewportHScrollPosition(this.horizontalScrollBar._getValue());
            };
            __egretProto__.vBarChanged = function (e) {
                this.setViewportVScrollPosition(this.verticalScrollBar.getPosition());
            };
            __egretProto__.hitTest = function (x, y, ignoreTouchEnabled) {
                if (ignoreTouchEnabled === void 0) { ignoreTouchEnabled = false; }
                var childTouched = _super.prototype.hitTest.call(this, x, y, ignoreTouchEnabled);
                if (childTouched)
                    return childTouched;
                if (!this._DO_Props_._visible || (!ignoreTouchEnabled && !this._DO_Props_._touchEnabled)) {
                    return null;
                }
                if (0 <= x && x < this.width && 0 <= y && y < this.height) {
                    return this;
                }
                return null;
            };
            return Scroller;
        })(gui.SkinnableComponent);
        gui.Scroller = Scroller;
        Scroller.prototype.__class__ = "egret.gui.Scroller";
        for (var p in egret.ScrollView.prototype) {
            //跳过Scroller，SkinnableComponent，UIComponent 重写的方法
            if (egret.ScrollView.prototype.hasOwnProperty(p) && !Scroller.prototype.hasOwnProperty(p) && !gui.SkinnableComponent.prototype.hasOwnProperty(p) && !gui.UIComponent.prototype.hasOwnProperty(p)) {
                var desc = Object.getOwnPropertyDescriptor(egret.ScrollView.prototype, p);
                if (desc && (desc.get || desc.set))
                    Object.defineProperty(Scroller.prototype, p, desc);
                else
                    Scroller.prototype[p] = egret.ScrollView.prototype[p];
            }
        }
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
