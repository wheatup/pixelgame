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
         * @class egret.gui.GroupBase
         * @classdesc
         * 自动布局容器基类
         * @extends egret.gui.UIComponent
         * @implements egret.gui.IViewport
         */
        var GroupBase = (function (_super) {
            __extends(GroupBase, _super);
            /**
             * 构造函数
             * @method egret.gui.GroupBase#constructor
             */
            function GroupBase() {
                _super.call(this);
                this._contentWidth = 0;
                this._contentHeight = 0;
                this._layout = null;
                this._clipAndEnableScrolling = false;
                this._horizontalScrollPosition = 0;
                this._verticalScrollPosition = 0;
                /**
                 * 在更新显示列表时是否需要更新布局标志
                 */
                this._layoutInvalidateDisplayListFlag = false;
                /**
                 * 在测量尺寸时是否需要测量布局的标志
                 */
                this._layoutInvalidateSizeFlag = false;
                this.touchEnabled = false;
            }
            var __egretProto__ = GroupBase.prototype;
            /**
             * 如果尚未设置布局对象，则 createChildren() 会为该容器指定默认布局对象 BasicLayout
             * @method egret.gui.GroupBase#createChildren
             */
            __egretProto__.createChildren = function () {
                _super.prototype.createChildren.call(this);
                if (!this._layout) {
                    this.layout = new gui.BasicLayout;
                }
            };
            Object.defineProperty(__egretProto__, "contentWidth", {
                /**
                 * 视域的内容的宽度
                 * @member egret.gui.GroupBase#contentWidth
                 */
                get: function () {
                    return this._contentWidth;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 设置setContentWidth
             * @param value
             */
            __egretProto__.setContentWidth = function (value) {
                if (value == this._contentWidth)
                    return;
                var oldValue = this._contentWidth;
                this._contentWidth = value;
                if (this.hasEventListener("propertyChange"))
                    gui.PropertyChangeEvent.dispatchPropertyChangeEvent(this, gui.PropertyChangeEventKind.UPDATE, "contentWidth", oldValue, value, this);
            };
            Object.defineProperty(__egretProto__, "contentHeight", {
                /**
                 * 视域的内容的高度
                 * @member egret.gui.GroupBase#contentHeight
                 */
                get: function () {
                    return this._contentHeight;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 设置ContentHeight
             * @param value
             */
            __egretProto__.setContentHeight = function (value) {
                if (value == this._contentHeight)
                    return;
                var oldValue = this._contentHeight;
                this._contentHeight = value;
                if (this.hasEventListener("propertyChange"))
                    gui.PropertyChangeEvent.dispatchPropertyChangeEvent(this, gui.PropertyChangeEventKind.UPDATE, "contentHeight", oldValue, value, this);
            };
            /**
             * 设置 contentWidth 和 contentHeight 属性，此方法由Layout类调用
             * @method egret.gui.GroupBase#setContentSize
             * @private
             *
             * @param width {number}
             * @param height {number}
             */
            __egretProto__.setContentSize = function (width, height) {
                if ((width == this._contentWidth) && (height == this._contentHeight))
                    return;
                this.setContentWidth(width);
                this.setContentHeight(height);
            };
            Object.defineProperty(__egretProto__, "layout", {
                /**
                 * 此容器的布局对象
                 * @member egret.gui.GroupBase#layout
                 */
                get: function () {
                    return this._layout;
                },
                set: function (value) {
                    this._setLayout(value);
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__._setLayout = function (value) {
                if (this._layout == value)
                    return;
                if (this._layout) {
                    this._layout.target = null;
                }
                this._layout = value;
                if (this._layout) {
                    this._layout.target = this;
                }
                this.invalidateSize();
                this.invalidateDisplayList();
                this.dispatchEventWith("layoutChanged");
            };
            Object.defineProperty(__egretProto__, "clipAndEnableScrolling", {
                /**
                 * 如果为 true，指定将子代剪切到视区的边界。如果为 false，则容器子代会从容器边界扩展过去，而不管组件的大小规范。默认false
                 * @member egret.gui.GroupBase#clipAndEnableScrolling
                 */
                get: function () {
                    return this._clipAndEnableScrolling;
                },
                set: function (value) {
                    if (value == this._clipAndEnableScrolling)
                        return;
                    this._clipAndEnableScrolling = value;
                    if (this._clipAndEnableScrolling) {
                        this.scrollRect = new egret.Rectangle(this._horizontalScrollPosition, this._verticalScrollPosition, this.width, this.height);
                    }
                    else {
                        this.scrollRect = null;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "horizontalScrollPosition", {
                /**
                 * 可视区域水平方向起始点
                 * @member egret.gui.GroupBase#horizontalScrollPosition
                 */
                get: function () {
                    return this._horizontalScrollPosition;
                },
                set: function (value) {
                    if (value == this._horizontalScrollPosition)
                        return;
                    var oldValue = this._horizontalScrollPosition;
                    this._horizontalScrollPosition = value;
                    this.scrollPositionChanged();
                    gui.PropertyChangeEvent.dispatchPropertyChangeEvent(this, gui.PropertyChangeEventKind.UPDATE, "horizontalScrollPosition", oldValue, value, this);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "verticalScrollPosition", {
                /**
                 * 可视区域竖直方向起始点
                 * @member egret.gui.GroupBase#verticalScrollPosition
                 */
                get: function () {
                    return this._verticalScrollPosition;
                },
                set: function (value) {
                    if (value == this._verticalScrollPosition)
                        return;
                    var oldValue = this._verticalScrollPosition;
                    this._verticalScrollPosition = value;
                    this.scrollPositionChanged();
                    gui.PropertyChangeEvent.dispatchPropertyChangeEvent(this, gui.PropertyChangeEventKind.UPDATE, "verticalScrollPosition", oldValue, value, this);
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 滚动条位置改变
             */
            __egretProto__.scrollPositionChanged = function () {
                if (!this._clipAndEnableScrolling) {
                    return;
                }
                this.updateScrollRect(this.width, this.height);
                this._invalidateDisplayListExceptLayout();
                if (this._layout) {
                    this._layout.scrollPositionChanged();
                }
            };
            /**
             * 更新可视区域
             * @param w {number}
             * @param h {number}
             */
            __egretProto__.updateScrollRect = function (w, h) {
                var rect = this._DO_Props_._scrollRect;
                if (this._clipAndEnableScrolling) {
                    if (rect) {
                        rect.x = this._horizontalScrollPosition;
                        rect.y = this._verticalScrollPosition;
                        rect.width = w;
                        rect.height = h;
                    }
                    else {
                        this._DO_Props_._scrollRect = new egret.Rectangle(this._horizontalScrollPosition, this._verticalScrollPosition, w, h);
                    }
                }
                else if (rect) {
                    this._DO_Props_._scrollRect = null;
                }
            };
            /**
             * 计算组件的默认大小和（可选）默认最小大小
             * @method egret.gui.GroupBase#measure
             */
            __egretProto__.measure = function () {
                if (!this._layout || !this._layoutInvalidateSizeFlag)
                    return;
                _super.prototype.measure.call(this);
                this._layout.measure();
            };
            /**
             * 标记需要更新显示列表但不需要更新布局
             */
            __egretProto__._invalidateDisplayListExceptLayout = function () {
                _super.prototype.invalidateDisplayList.call(this);
            };
            /**
             * 标记组件，以便在稍后屏幕更新期间调用该组件的 updateDisplayList() 方法
             * @method egret.gui.GroupBase#invalidateDisplayList
             */
            __egretProto__.invalidateDisplayList = function () {
                _super.prototype.invalidateDisplayList.call(this);
                this._layoutInvalidateDisplayListFlag = true;
            };
            __egretProto__._childXYChanged = function () {
                this.invalidateSize();
                this.invalidateDisplayList();
            };
            /**
             * 标记需要更新显示列表但不需要更新布局
             */
            __egretProto__._invalidateSizeExceptLayout = function () {
                _super.prototype.invalidateSize.call(this);
            };
            /**
             * 标记组件，以便在稍后屏幕更新期间调用该组件的 measure() 方法
             * @method egret.gui.GroupBase#invalidateSize
             */
            __egretProto__.invalidateSize = function () {
                _super.prototype.invalidateSize.call(this);
                this._layoutInvalidateSizeFlag = true;
            };
            /**
             * 绘制对象和/或设置其子项的大小和位置
             * @param unscaledWidth
             * @param unscaledHeight
             */
            __egretProto__.updateDisplayList = function (unscaledWidth, unscaledHeight) {
                _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
                if (this._layoutInvalidateDisplayListFlag && this._layout) {
                    this._layoutInvalidateDisplayListFlag = false;
                    this._layout.updateDisplayList(unscaledWidth, unscaledHeight);
                    this.updateScrollRect(unscaledWidth, unscaledHeight);
                }
            };
            Object.defineProperty(__egretProto__, "numElements", {
                /**
                 * 此容器中的可视元素的数量。
                 * @member egret.gui.GroupBase#numElements
                 */
                get: function () {
                    return -1;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 返回指定索引处的可视元素。
             * @method egret.gui.GroupBase#getElementAt
             * @param index {number} 要检索的元素的索引。
             * @throws RangeError 如果在子列表中不存在该索引位置。
             * @returns {IVisualElement}
             */
            __egretProto__.getElementAt = function (index) {
                return null;
            };
            /**
             * 返回可视元素的索引位置。若不存在，则返回-1。
             * @method egret.gui.GroupBase#getElementIndex
             * @param element {IVisualElement} 可视元素。
             * @returns {number}
             */
            __egretProto__.getElementIndex = function (element) {
                return -1;
            };
            /**
             * 返回在容器可视区域内的布局元素索引列表,此方法忽略不是布局元素的普通的显示对象
             * @method egret.gui.GroupBase#getElementIndicesInView
             * @returns {number}
             */
            __egretProto__.getElementIndicesInView = function () {
                var visibleIndices = [];
                var index;
                if (!this.scrollRect) {
                    for (index = 0; index < this.numChildren; index++) {
                        visibleIndices.push(index);
                    }
                }
                else {
                    for (index = 0; index < this.numChildren; index++) {
                        var layoutElement = (this.getChildAt(index));
                        if (!layoutElement)
                            continue;
                        var eltR = new egret.Rectangle();
                        eltR.x = layoutElement.layoutBoundsX;
                        eltR.y = layoutElement.layoutBoundsY;
                        eltR.width = layoutElement.layoutBoundsWidth;
                        eltR.height = layoutElement.layoutBoundsHeight;
                        if (this.scrollRect.intersects(eltR))
                            visibleIndices.push(index);
                    }
                }
                return visibleIndices;
            };
            /**
             * 在支持虚拟布局的容器中，设置容器内可见的子元素索引范围。此方法在不支持虚拟布局的容器中无效。
             * 通常在即将连续调用getVirtualElementAt()之前需要显式设置一次，以便容器提前释放已经不可见的子元素。
             * @method egret.gui.GroupBase#setVirtualElementIndicesInView
             * @param startIndex {number} 可视元素起始索引
             * @param endIndex {number} 可视元素结束索引
             */
            __egretProto__.setVirtualElementIndicesInView = function (startIndex, endIndex) {
            };
            /**
             * 支持useVirtualLayout属性的布局类在updateDisplayList()中使用此方法来获取“处于视图中”的布局元素
             * @method egret.gui.GroupBase#getVirtualElementAt
             * @param index {number} 要检索的元素的索引。
             * @returns {IVisualElement}
             */
            __egretProto__.getVirtualElementAt = function (index) {
                return this.getElementAt(index);
            };
            return GroupBase;
        })(gui.UIComponent);
        gui.GroupBase = GroupBase;
        GroupBase.prototype.__class__ = "egret.gui.GroupBase";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
