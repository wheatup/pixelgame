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
         * @class egret.gui.UIComponent
         * @classdesc
         * 显示对象基类
         * @extends egret.DisplayObjectContainer
         * @implements egret.gui.IUIComponent
         * @implements egret.gui.ILayoutManagerClient
         * @implements egret.gui.ILayoutElement
         * @implements egret.gui.IInvalidating
         * @implements egret.gui.IVisualElement
         */
        var UIComponent = (function (_super) {
            __extends(UIComponent, _super);
            /**
             * 构造函数
             * @method egret.gui.UIComponent#constructor
             */
            function UIComponent() {
                _super.call(this);
                this._UIC_Props_ = new egret.gui.UIComponentProperties();
                this.touchEnabled = true;
                this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
                this.addEventListener(egret.Event.ADDED_TO_STAGE, this.checkInvalidateFlag, this);
                if (UIComponent.prototypeCanSet === undefined) {
                    var chain = {};
                    UIComponent.prototypeCanSet = (chain.__proto__ !== undefined);
                }
            }
            var __egretProto__ = UIComponent.prototype;
            /**
             * 添加到舞台
             */
            __egretProto__.onAddedToStage = function (e) {
                this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
                this._initialize();
                gui.UIGlobals._initlize(this.stage);
                if (this._UIC_Props_._nestLevel > 0)
                    this.checkInvalidateFlag();
            };
            Object.defineProperty(__egretProto__, "id", {
                /**
                 * 组件 ID。此值将作为对象的实例名称，因此不应包含任何空格或特殊字符。应用程序中的每个组件都应具有唯一的 ID。
                 * @constant egret.gui.UIComponent#id
                 */
                get: function () {
                    return this._UIC_Props_._id;
                },
                set: function (value) {
                    this._UIC_Props_._id = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "isPopUp", {
                /**
                 * @member egret.gui.UIComponent#isPopUp
                 */
                get: function () {
                    return this._UIC_Props_._isPopUp;
                },
                set: function (value) {
                    this._UIC_Props_._isPopUp = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "owner", {
                /**
                 * @member egret.gui.UIComponent#owner
                 */
                get: function () {
                    return this._UIC_Props_._owner ? this._UIC_Props_._owner : this.parent;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @method egret.gui.UIComponent#ownerChanged
             * @param value {any}
             */
            __egretProto__.ownerChanged = function (value) {
                this._UIC_Props_._owner = value;
            };
            Object.defineProperty(__egretProto__, "updateCompletePendingFlag", {
                /**
                 * @member egret.gui.UIComponent#updateCompletePendingFlag
                 */
                get: function () {
                    return this._UIC_Props_._updateCompletePendingFlag;
                },
                set: function (value) {
                    this._UIC_Props_._updateCompletePendingFlag = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "initialized", {
                /**
                 * @member egret.gui.UIComponent#initialized
                 */
                get: function () {
                    return this._UIC_Props_._initialized;
                },
                set: function (value) {
                    if (this._UIC_Props_._initialized == value)
                        return;
                    this._UIC_Props_._initialized = value;
                    if (value) {
                        this.childrenCreated();
                        gui.UIEvent.dispatchUIEvent(this, gui.UIEvent.CREATION_COMPLETE);
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 初始化组件
             * @method egret.gui.UIComponent#_initialize
             */
            __egretProto__._initialize = function () {
                if (this._UIC_Props_._initializeCalled)
                    return;
                if (gui.UIGlobals.stage) {
                    this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
                }
                this._UIC_Props_._initializeCalled = true;
                gui.UIEvent.dispatchUIEvent(this, gui.UIEvent.INITIALIZE);
                this.createChildren();
                this.invalidateProperties();
                this.invalidateSize();
                this.invalidateDisplayList();
            };
            /**
             * 创建子项,子类覆盖此方法以完成组件子项的初始化操作，
             * 请务必调用super.createChildren()以完成父类组件的初始化
             * @method egret.gui.UIComponent#createChildren
             */
            __egretProto__.createChildren = function () {
            };
            /**
             * 子项创建完成
             * @method egret.gui.UIComponent#childrenCreated
             */
            __egretProto__.childrenCreated = function () {
            };
            Object.defineProperty(__egretProto__, "nestLevel", {
                /**
                 * @member egret.gui.UIComponent#nestLevel
                 */
                get: function () {
                    return this._UIC_Props_._nestLevel;
                },
                set: function (value) {
                    if (this._UIC_Props_._nestLevel == value)
                        return;
                    this._UIC_Props_._nestLevel = value;
                    if (this._UIC_Props_._nestLevel == 0)
                        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.checkInvalidateFlag, this);
                    else
                        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.checkInvalidateFlag, this);
                    this._updateChildrenNestLevel();
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 更新子项的nestLevel属性
             */
            __egretProto__._updateChildrenNestLevel = function () {
                for (var i = this.numChildren - 1; i >= 0; i--) {
                    var child = (this.getChildAt(i));
                    if (child && "nestLevel" in child) {
                        child.nestLevel = this._UIC_Props_._nestLevel + 1;
                    }
                }
            };
            /**
             * 获取指定的名称的样式属性值
             */
            __egretProto__.getStyle = function (styleProp) {
                var chain = this._UIC_Props_._styleProtoChain;
                if (!chain) {
                    return undefined;
                }
                return chain[styleProp];
            };
            /**
             * 对此组件实例设置样式属性。在此组件上设置的样式会覆盖父级容器的同名样式。推荐在子项较少的组件上使用，尽量避免在全局调用此方法，有可能造成性能问题。
             */
            __egretProto__.setStyle = function (styleProp, newValue) {
                var chain = this._UIC_Props_._styleProtoChain;
                if (!this._UIC_Props_._hasOwnStyleChain) {
                    chain = this._createOwnStyleProtoChain(chain);
                }
                chain[styleProp] = newValue;
                this.styleChanged(styleProp);
                this.notifyStyleChangeInChildren(styleProp);
            };
            __egretProto__.styleChanged = function (styleProp) {
            };
            /**
             * 通知子项列表样式发生改变
             */
            __egretProto__.notifyStyleChangeInChildren = function (styleProp) {
                if (this._UIC_Props_._hasNoStyleChild) {
                    return;
                }
                for (var i = this.numChildren - 1; i >= 0; i--) {
                    var child = (this.getChildAt(i));
                    if (!child) {
                        continue;
                    }
                    if ("styleChanged" in child) {
                        child.styleChanged(styleProp);
                        child.notifyStyleChangeInChildren(styleProp);
                    }
                }
            };
            __egretProto__._createOwnStyleProtoChain = function (chain) {
                this._UIC_Props_._hasOwnStyleChain = true;
                if (UIComponent.prototypeCanSet) {
                    this._UIC_Props_._styleProtoChain = {};
                    this._UIC_Props_._styleProtoChain.__proto__ = chain ? chain : UIComponent.emptyStyleChain;
                }
                else {
                    this._UIC_Props_._styleProtoChain = this.createProtoChain(chain);
                }
                chain = this._UIC_Props_._styleProtoChain;
                if (!this._UIC_Props_._hasNoStyleChild) {
                    for (var i = this.numChildren - 1; i >= 0; i--) {
                        var child = (this.getChildAt(i));
                        if (child && "regenerateStyleCache" in child) {
                            child["regenerateStyleCache"](chain);
                        }
                    }
                }
                return chain;
            };
            /**
             * 创建一个原型链节点
             */
            __egretProto__.createProtoChain = function (parentChain) {
                function factory() {
                }
                ;
                factory.prototype = parentChain;
                var childChain = new factory();
                factory.prototype = null;
                return childChain;
            };
            /**
             * 清除在此组件实例上设置过的指定样式名。
             */
            __egretProto__.clearStyle = function (styleProp) {
                if (!this._UIC_Props_._hasOwnStyleChain) {
                    return;
                }
                var chain = this._UIC_Props_._styleProtoChain;
                delete chain[styleProp];
                this.styleChanged(styleProp);
                this.notifyStyleChangeInChildren(styleProp);
            };
            /**
             * 重新生成自身以及所有子项的原型链
             */
            __egretProto__.regenerateStyleCache = function (parentChain) {
                if (!UIComponent.prototypeCanSet) {
                    this.regenerateStyleCacheForIE(parentChain);
                    return;
                }
                if (this._UIC_Props_._hasOwnStyleChain) {
                    this._UIC_Props_._styleProtoChain.__proto__ = parentChain ? parentChain : UIComponent.emptyStyleChain;
                }
                else if (this._UIC_Props_._styleProtoChain != parentChain) {
                    this._UIC_Props_._styleProtoChain = parentChain;
                    for (var i = this.numChildren - 1; i >= 0; i--) {
                        var child = (this.getChildAt(i));
                        if (child && "regenerateStyleCache" in child) {
                            child.regenerateStyleCache(parentChain);
                        }
                    }
                }
            };
            /**
             * 兼容IE9，10的写法。
             */
            __egretProto__.regenerateStyleCacheForIE = function (parentChain) {
                if (this._UIC_Props_._hasOwnStyleChain) {
                    var chain = this._UIC_Props_._styleProtoChain;
                    var childChain = this.createProtoChain(parentChain);
                    for (var key in chain) {
                        if (chain.hasOwnProperty(key)) {
                            childChain[key] = chain[key];
                        }
                    }
                    this._UIC_Props_._styleProtoChain = childChain;
                    parentChain = childChain;
                }
                else {
                    this._UIC_Props_._styleProtoChain = parentChain;
                }
                if (!this._UIC_Props_._hasNoStyleChild) {
                    for (var i = this.numChildren - 1; i >= 0; i--) {
                        var child = this.getChildAt(i);
                        if (child && "regenerateStyleCacheForIE" in child) {
                            child["regenerateStyleCacheForIE"](parentChain);
                        }
                    }
                }
            };
            /**
             * 添加对象到显示列表,此接口仅预留给框架内部使用
             * 如果需要管理子项，若有，请使用容器的addElement()方法，非法使用有可能造成无法自动布局。
             */
            __egretProto__._addToDisplayList = function (child, notifyListeners) {
                if (notifyListeners === void 0) { notifyListeners = true; }
                var index = this.numChildren;
                if (child.parent == this)
                    index--;
                this._addingChild(child);
                this._doAddChild(child, index, notifyListeners);
                this._childAdded(child);
                return child;
            };
            /**
             * 添加对象到显示列表,此接口仅预留给框架内部使用
             * 如果需要管理子项，若有，请使用容器的addElementAt()方法，非法使用有可能造成无法自动布局。
             */
            __egretProto__._addToDisplayListAt = function (child, index, notifyListeners) {
                if (notifyListeners === void 0) { notifyListeners = true; }
                this._addingChild(child);
                this._doAddChild(child, index, notifyListeners);
                this._childAdded(child);
                return child;
            };
            /**
             * 添加对象到显示列表,此接口仅预留给框架内部使用
             * 如果需要管理子项，若有，请使用容器的removeElement()方法,非法使用有可能造成无法自动布局。
             */
            __egretProto__._removeFromDisplayList = function (child, notifyListeners) {
                if (notifyListeners === void 0) { notifyListeners = true; }
                var index = this._children.indexOf(child);
                if (index >= 0) {
                    this._doRemoveChild(index, notifyListeners);
                    this._childRemoved(child);
                    return child;
                }
                else {
                    egret.$error(1008);
                    return null;
                }
            };
            /**
             * 从显示列表移除指定索引的子项,此接口仅预留给框架内部使用
             * 如果需要管理子项，若有，请使用容器的removeElementAt()方法,非法使用有可能造成无法自动布局。
             */
            __egretProto__._removeFromDisplayListAt = function (index, notifyListeners) {
                if (notifyListeners === void 0) { notifyListeners = true; }
                if (index >= 0 && index < this._children.length) {
                    var child = this._doRemoveChild(index, notifyListeners);
                    this._childRemoved(child);
                    return child;
                }
                else {
                    egret.$error(1007);
                    return null;
                }
            };
            /**
             * GUI范围内，请不要调用任何addChild方法，若是容器，请用addElement,若需要包装普通显示对象，请把显示对象赋值给UIAsset.source。
             * @deprecated
             * @method egret.gui.UIComponent#addChild
             * @param child {DisplayObject}
             * @returns {DisplayObject}
             */
            __egretProto__.addChild = function (child) {
                this._addingChild(child);
                _super.prototype.addChild.call(this, child);
                this._childAdded(child);
                return child;
            };
            /**
             * GUI范围内，请不要调用任何addChildAt方法，若是容器，请用addElementAt,若需要包装普通显示对象，请把显示对象赋值给UIAsset.source。
             * @deprecated
             * @method egret.gui.UIComponent#addChildAt
             * @param child {DisplayObject}
             * @param index {number}
             * @returns {DisplayObject}
             */
            __egretProto__.addChildAt = function (child, index) {
                this._addingChild(child);
                _super.prototype.addChildAt.call(this, child, index);
                this._childAdded(child);
                return child;
            };
            /**
             * 即将添加一个子项
             */
            __egretProto__._addingChild = function (child) {
                if (!child) {
                    return;
                }
                if ("nestLevel" in child) {
                    child.nestLevel = this._UIC_Props_._nestLevel + 1;
                }
                if ("styleChanged" in child) {
                    var chain = this._UIC_Props_._styleProtoChain;
                    if (chain || (child._UIC_Props_ && child._UIC_Props_._styleProtoChain)) {
                        child["regenerateStyleCache"](chain);
                        child["styleChanged"](null);
                        child["notifyStyleChangeInChildren"](null);
                    }
                }
            };
            /**
             * 已经添加一个子项
             */
            __egretProto__._childAdded = function (child) {
                if (child instanceof UIComponent) {
                    child._initialize();
                    child.checkInvalidateFlag();
                }
            };
            /**
             * GUI范围内，请不要调用任何removeChild方法，若是容器，请用removeElement
             * @deprecated
             * @method egret.gui.UIComponent#removeChild
             * @param child {DisplayObject}
             * @returns {DisplayObject}
             */
            __egretProto__.removeChild = function (child) {
                _super.prototype.removeChild.call(this, child);
                this._childRemoved(child);
                return child;
            };
            /**
             * GUI范围内，请不要调用任何removeChildAt方法，若是容器，请用removeElementAt
             * @deprecated
             * @method egret.gui.UIComponent#removeChildAt
             * @param index {number}
             * @returns {DisplayObject}
             */
            __egretProto__.removeChildAt = function (index) {
                var child = _super.prototype.removeChildAt.call(this, index);
                this._childRemoved(child);
                return child;
            };
            /**
             * 已经移除一个子项
             */
            __egretProto__._childRemoved = function (child) {
                if (!child) {
                    return;
                }
                if ("nestLevel" in child) {
                    child.nestLevel = 0;
                }
            };
            /**
             * 检查属性失效标记并应用
             */
            __egretProto__.checkInvalidateFlag = function (event) {
                if (event === void 0) { event = null; }
                if (!gui.UIGlobals._layoutManager)
                    return;
                if (this._UIC_Props_._invalidatePropertiesFlag) {
                    gui.UIGlobals._layoutManager.invalidateProperties(this);
                }
                if (this._UIC_Props_._invalidateSizeFlag) {
                    gui.UIGlobals._layoutManager.invalidateSize(this);
                }
                if (this._UIC_Props_._invalidateDisplayListFlag) {
                    gui.UIGlobals._layoutManager.invalidateDisplayList(this);
                }
                if (this._UIC_Props_._validateNowFlag) {
                    gui.UIGlobals._layoutManager.validateClient(this);
                    this._UIC_Props_._validateNowFlag = false;
                }
            };
            Object.defineProperty(__egretProto__, "enabled", {
                /**
                 * @member egret.gui.UIComponent#enabled
                 */
                get: function () {
                    return this._UIC_Props_._enabled;
                },
                set: function (value) {
                    this._UIC_Props_._enabled = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "width", {
                /**
                 * @member egret.gui.UIComponent#width
                 */
                get: function () {
                    return this._UIC_Props_._width;
                },
                /**
                 * 组件宽度,默认值为NaN,设置为NaN将使用组件的measure()方法自动计算尺寸
                 */
                set: function (value) {
                    this._setWidth(value);
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__._setWidth = function (value) {
                if (this._UIC_Props_._width == value && this._DO_Props_._explicitWidth == value)
                    return;
                _super.prototype._setWidth.call(this, value);
                if (isNaN(value))
                    this.invalidateSize();
                else
                    this._UIC_Props_._width = value;
                this.invalidateProperties();
                this.invalidateDisplayList();
                this.invalidateParentSizeAndDisplayList();
            };
            Object.defineProperty(__egretProto__, "height", {
                /**
                 * @member egret.gui.UIComponent#height
                 */
                get: function () {
                    return this._UIC_Props_._height;
                },
                /**
                 * 组件高度,默认值为NaN,设置为NaN将使用组件的measure()方法自动计算尺寸
                 */
                set: function (value) {
                    this._setHeight(value);
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__._setHeight = function (value) {
                if (this._UIC_Props_._height == value && this._DO_Props_._explicitHeight == value)
                    return;
                _super.prototype._setHeight.call(this, value);
                if (isNaN(value))
                    this.invalidateSize();
                else
                    this._UIC_Props_._height = value;
                this.invalidateProperties();
                this.invalidateDisplayList();
                this.invalidateParentSizeAndDisplayList();
            };
            Object.defineProperty(__egretProto__, "scaleX", {
                /**
                 * @member egret.gui.UIComponent#scaleX
                 */
                get: function () {
                    return this._DO_Props_._scaleX;
                },
                /**
                 * @inheritDoc
                 */
                set: function (value) {
                    this._setScaleX(value);
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__._setScaleX = function (value) {
                if (this._DO_Props_._scaleX == value)
                    return;
                this._DO_Props_._scaleX = value;
                this.invalidateParentSizeAndDisplayList();
            };
            Object.defineProperty(__egretProto__, "scaleY", {
                /**
                 * @member egret.gui.UIComponent#scaleY
                 */
                get: function () {
                    return this._DO_Props_._scaleY;
                },
                /**
                 * @inheritDoc
                 */
                set: function (value) {
                    this._setScaleY(value);
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__._setScaleY = function (value) {
                if (this._DO_Props_._scaleY == value)
                    return;
                this._DO_Props_._scaleY = value;
                this.invalidateParentSizeAndDisplayList();
            };
            Object.defineProperty(__egretProto__, "minWidth", {
                /**
                 * @member egret.gui.UIComponent#minWidth
                 */
                get: function () {
                    return this._UIC_Props_._minWidth;
                },
                set: function (value) {
                    if (this._UIC_Props_._minWidth == value)
                        return;
                    this._UIC_Props_._minWidth = value;
                    this.invalidateSize();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "maxWidth", {
                /**
                 * @member egret.gui.UIComponent#maxWidth
                 */
                get: function () {
                    return this._UIC_Props_._maxWidth;
                },
                set: function (value) {
                    if (this._UIC_Props_._maxWidth == value)
                        return;
                    this._UIC_Props_._maxWidth = value;
                    this.invalidateSize();
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__._getMaxWidth = function () {
                return this._UIC_Props_._maxWidth;
            };
            Object.defineProperty(__egretProto__, "minHeight", {
                /**
                 * @member egret.gui.UIComponent#minHeight
                 */
                get: function () {
                    return this._UIC_Props_._minHeight;
                },
                set: function (value) {
                    if (this._UIC_Props_._minHeight == value)
                        return;
                    this._UIC_Props_._minHeight = value;
                    this.invalidateSize();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "maxHeight", {
                /**
                 * @member egret.gui.UIComponent#maxHeight
                 */
                get: function () {
                    return this._UIC_Props_._maxHeight;
                },
                set: function (value) {
                    if (this._UIC_Props_._maxHeight == value)
                        return;
                    this._UIC_Props_._maxHeight = value;
                    this.invalidateSize();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "measuredWidth", {
                /**
                 * 组件的默认宽度（以像素为单位）。此值由 measure() 方法设置。
                 * @member egret.gui.UIComponent#measuredWidth
                 */
                get: function () {
                    return this._UIC_Props_._measuredWidth;
                },
                set: function (value) {
                    this._UIC_Props_._measuredWidth = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "measuredHeight", {
                /**
                 * 组件的默认高度（以像素为单位）。此值由 measure() 方法设置。
                 * @member egret.gui.UIComponent#measuredHeight
                 */
                get: function () {
                    return this._UIC_Props_._measuredHeight;
                },
                set: function (value) {
                    this._UIC_Props_._measuredHeight = value;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @method egret.gui.UIComponent#setActualSize
             * @param w {number}
             * @param h {number}
             */
            __egretProto__.setActualSize = function (w, h) {
                var change = false;
                if (this._UIC_Props_._width != w) {
                    this._UIC_Props_._width = w;
                    change = true;
                }
                if (this._UIC_Props_._height != h) {
                    this._UIC_Props_._height = h;
                    change = true;
                }
                if (change) {
                    this.invalidateDisplayList();
                    this.dispatchResizeEvent();
                }
            };
            Object.defineProperty(__egretProto__, "x", {
                /**
                 * @constant egret.gui.UIComponent#x
                 */
                get: function () {
                    return this._DO_Props_._x;
                },
                /**
                 * @inheritDoc
                 */
                set: function (value) {
                    if (this._DO_Props_._x == value)
                        return;
                    this._setX(value);
                    this.invalidateProperties();
                    if (this._UIC_Props_._includeInLayout && this.parent && this.parent instanceof UIComponent)
                        (this.parent)._childXYChanged();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "y", {
                /**
                 * @constant egret.gui.UIComponent#y
                 */
                get: function () {
                    return this._DO_Props_._y;
                },
                /**
                 * @inheritDoc
                 */
                set: function (value) {
                    if (this._DO_Props_._y == value)
                        return;
                    this._setY(value);
                    this.invalidateProperties();
                    if (this._UIC_Props_._includeInLayout && this.parent && this.parent instanceof UIComponent)
                        (this.parent)._childXYChanged();
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @method egret.gui.UIComponent#invalidateProperties
             */
            __egretProto__.invalidateProperties = function () {
                if (!this._UIC_Props_._invalidatePropertiesFlag) {
                    this._UIC_Props_._invalidatePropertiesFlag = true;
                    if (this.parent && gui.UIGlobals._layoutManager)
                        gui.UIGlobals._layoutManager.invalidateProperties(this);
                }
            };
            /**
             * @method egret.gui.UIComponent#validateProperties
             */
            __egretProto__.validateProperties = function () {
                if (this._UIC_Props_._invalidatePropertiesFlag) {
                    this.commitProperties();
                    this._UIC_Props_._invalidatePropertiesFlag = false;
                }
            };
            /**
             * @method egret.gui.UIComponent#invalidateSize
             */
            __egretProto__.invalidateSize = function () {
                if (!this._UIC_Props_._invalidateSizeFlag) {
                    this._UIC_Props_._invalidateSizeFlag = true;
                    if (this.parent && gui.UIGlobals._layoutManager)
                        gui.UIGlobals._layoutManager.invalidateSize(this);
                }
            };
            /**
             * @method egret.gui.UIComponent#validateSize
             * @param recursive {boolean}
             */
            __egretProto__.validateSize = function (recursive) {
                if (recursive === void 0) { recursive = false; }
                if (recursive) {
                    for (var i = 0; i < this.numChildren; i++) {
                        var child = this.getChildAt(i);
                        if ("validateSize" in child)
                            child.validateSize(true);
                    }
                }
                if (this._UIC_Props_._invalidateSizeFlag) {
                    var changed = this.measureSizes();
                    if (changed) {
                        this.invalidateDisplayList();
                        this.invalidateParentSizeAndDisplayList();
                    }
                    this._UIC_Props_._invalidateSizeFlag = false;
                }
            };
            /**
             * 测量组件尺寸，返回尺寸是否发生变化
             */
            __egretProto__.measureSizes = function () {
                var changed = false;
                if (!this._UIC_Props_._invalidateSizeFlag)
                    return changed;
                if (!this.canSkipMeasurement()) {
                    this.measure();
                    if (this.measuredWidth < this.minWidth) {
                        this.measuredWidth = this.minWidth;
                    }
                    if (this.measuredWidth > this.maxWidth) {
                        this.measuredWidth = this.maxWidth;
                    }
                    if (this.measuredHeight < this.minHeight) {
                        this.measuredHeight = this.minHeight;
                    }
                    if (this.measuredHeight > this.maxHeight) {
                        this.measuredHeight = this.maxHeight;
                    }
                }
                if (isNaN(this._UIC_Props_._oldPreferWidth)) {
                    this._UIC_Props_._oldPreferWidth = this.preferredWidth;
                    this._UIC_Props_._oldPreferHeight = this.preferredHeight;
                    changed = true;
                }
                else {
                    if (this.preferredWidth != this._UIC_Props_._oldPreferWidth || this.preferredHeight != this._UIC_Props_._oldPreferHeight)
                        changed = true;
                    this._UIC_Props_._oldPreferWidth = this.preferredWidth;
                    this._UIC_Props_._oldPreferHeight = this.preferredHeight;
                }
                return changed;
            };
            /**
             * @method egret.gui.UIComponent#invalidateDisplayList
             */
            __egretProto__.invalidateDisplayList = function () {
                if (!this._UIC_Props_._invalidateDisplayListFlag) {
                    this._UIC_Props_._invalidateDisplayListFlag = true;
                    if (this.parent && gui.UIGlobals._layoutManager)
                        gui.UIGlobals._layoutManager.invalidateDisplayList(this);
                    this._setSizeDirty();
                }
            };
            /**
             * @method egret.gui.UIComponent#validateDisplayList
             */
            __egretProto__.validateDisplayList = function () {
                if (this._UIC_Props_._invalidateDisplayListFlag) {
                    var unscaledWidth = 0;
                    var unscaledHeight = 0;
                    if (this._UIC_Props_._layoutWidthExplicitlySet) {
                        unscaledWidth = this._UIC_Props_._width;
                    }
                    else if (!isNaN(this.explicitWidth)) {
                        unscaledWidth = this._DO_Props_._explicitWidth;
                    }
                    else {
                        unscaledWidth = this.measuredWidth;
                    }
                    if (this._UIC_Props_._layoutHeightExplicitlySet) {
                        unscaledHeight = this._UIC_Props_._height;
                    }
                    else if (!isNaN(this.explicitHeight)) {
                        unscaledHeight = this._DO_Props_._explicitHeight;
                    }
                    else {
                        unscaledHeight = this.measuredHeight;
                    }
                    if (isNaN(unscaledWidth))
                        unscaledWidth = 0;
                    if (isNaN(unscaledHeight))
                        unscaledHeight = 0;
                    this.setActualSize(unscaledWidth, unscaledHeight);
                    this.updateDisplayList(unscaledWidth, unscaledHeight);
                    this._UIC_Props_._invalidateDisplayListFlag = false;
                }
            };
            /**
             * @method egret.gui.UIComponent#validateNow
             * @param skipDisplayList {boolean}
             */
            __egretProto__.validateNow = function (skipDisplayList) {
                if (skipDisplayList === void 0) { skipDisplayList = false; }
                if (!this._UIC_Props_._validateNowFlag && gui.UIGlobals._layoutManager != null)
                    gui.UIGlobals._layoutManager.validateClient(this, skipDisplayList);
                else
                    this._UIC_Props_._validateNowFlag = true;
            };
            /**
             * 标记父级容器的尺寸和显示列表为失效
             * @method egret.gui.UIComponent#invalidateParentSizeAndDisplayList
             */
            __egretProto__.invalidateParentSizeAndDisplayList = function () {
                if (!this.parent || !this._UIC_Props_._includeInLayout || !("invalidateSize" in this.parent))
                    return;
                var p = (this.parent);
                p.invalidateSize();
                p.invalidateDisplayList();
            };
            /**
             * 更新显示列表
             * @method egret.gui.UIComponent#updateDisplayList
             * @param unscaledWidth {number}
             * @param unscaledHeight {number}
             */
            __egretProto__.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            };
            /**
             * 是否可以跳过测量尺寸阶段,返回true则不执行measure()方法
             */
            __egretProto__.canSkipMeasurement = function () {
                return !isNaN(this._DO_Props_._explicitWidth) && !isNaN(this._DO_Props_._explicitHeight);
            };
            /**
             * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
             */
            __egretProto__.commitProperties = function () {
                if (this._UIC_Props_._oldWidth != this._UIC_Props_._width || this._UIC_Props_._oldHeight != this._UIC_Props_._height) {
                    this.dispatchResizeEvent();
                }
                if (this._UIC_Props_._oldX != this.x || this._UIC_Props_._oldY != this.y) {
                    this.dispatchMoveEvent();
                }
            };
            /**
             * 测量组件尺寸
             * @method egret.gui.UIComponent#measure
             */
            __egretProto__.measure = function () {
                this._UIC_Props_._measuredHeight = 0;
                this._UIC_Props_._measuredWidth = 0;
            };
            /**
             *  抛出移动事件
             */
            __egretProto__.dispatchMoveEvent = function () {
                if (this.hasEventListener(gui.MoveEvent.MOVE)) {
                    gui.MoveEvent.dispatchMoveEvent(this, this._UIC_Props_._oldX, this._UIC_Props_._oldY);
                }
                this._UIC_Props_._oldX = this.x;
                this._UIC_Props_._oldY = this.y;
            };
            /**
             * 子项的xy位置发生改变
             */
            __egretProto__._childXYChanged = function () {
            };
            /**
             *  抛出尺寸改变事件
             */
            __egretProto__.dispatchResizeEvent = function () {
                if (this.hasEventListener(gui.ResizeEvent.RESIZE)) {
                    gui.ResizeEvent.dispatchResizeEvent(this, this._UIC_Props_._oldWidth, this._UIC_Props_._oldHeight);
                }
                this._UIC_Props_._oldWidth = this._UIC_Props_._width;
                this._UIC_Props_._oldHeight = this._UIC_Props_._height;
            };
            Object.defineProperty(__egretProto__, "includeInLayout", {
                /**
                 * @member egret.gui.UIComponent#includeInLayout
                 */
                get: function () {
                    return this._UIC_Props_._includeInLayout;
                },
                set: function (value) {
                    if (this._UIC_Props_._includeInLayout == value)
                        return;
                    this._UIC_Props_._includeInLayout = true;
                    this.invalidateParentSizeAndDisplayList();
                    this._UIC_Props_._includeInLayout = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "left", {
                /**
                 * @member egret.gui.UIComponent#left
                 */
                get: function () {
                    return this._UIC_Props_._left;
                },
                set: function (value) {
                    if (this._UIC_Props_._left == value)
                        return;
                    this._UIC_Props_._left = value;
                    this.invalidateParentSizeAndDisplayList();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "right", {
                /**
                 * @member egret.gui.UIComponent#right
                 */
                get: function () {
                    return this._UIC_Props_._right;
                },
                set: function (value) {
                    if (this._UIC_Props_._right == value)
                        return;
                    this._UIC_Props_._right = value;
                    this.invalidateParentSizeAndDisplayList();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "top", {
                /**
                 * @member egret.gui.UIComponent#top
                 */
                get: function () {
                    return this._UIC_Props_._top;
                },
                set: function (value) {
                    if (this._UIC_Props_._top == value)
                        return;
                    this._UIC_Props_._top = value;
                    this.invalidateParentSizeAndDisplayList();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "bottom", {
                /**
                 * @member egret.gui.UIComponent#bottom
                 */
                get: function () {
                    return this._UIC_Props_._bottom;
                },
                set: function (value) {
                    if (this._UIC_Props_._bottom == value)
                        return;
                    this._UIC_Props_._bottom = value;
                    this.invalidateParentSizeAndDisplayList();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "horizontalCenter", {
                /**
                 * @member egret.gui.UIComponent#horizontalCenter
                 */
                get: function () {
                    return this._UIC_Props_._horizontalCenter;
                },
                set: function (value) {
                    if (this._UIC_Props_._horizontalCenter == value)
                        return;
                    this._UIC_Props_._horizontalCenter = value;
                    this.invalidateParentSizeAndDisplayList();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "verticalCenter", {
                /**
                 * @member egret.gui.UIComponent#verticalCenter
                 */
                get: function () {
                    return this._UIC_Props_._verticalCenter;
                },
                set: function (value) {
                    if (this._UIC_Props_._verticalCenter == value)
                        return;
                    this._UIC_Props_._verticalCenter = value;
                    this.invalidateParentSizeAndDisplayList();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "percentWidth", {
                /**
                 * @member egret.gui.UIComponent#percentWidth
                 */
                get: function () {
                    return this._UIC_Props_._percentWidth;
                },
                set: function (value) {
                    if (this._UIC_Props_._percentWidth == value)
                        return;
                    this._UIC_Props_._percentWidth = value;
                    this.invalidateParentSizeAndDisplayList();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "percentHeight", {
                /**
                 * @member egret.gui.UIComponent#percentHeight
                 */
                get: function () {
                    return this._UIC_Props_._percentHeight;
                },
                set: function (value) {
                    if (this._UIC_Props_._percentHeight == value)
                        return;
                    this._UIC_Props_._percentHeight = value;
                    this.invalidateParentSizeAndDisplayList();
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @method egret.gui.UIComponent#setLayoutBoundsSize
             * @param layoutWidth {number}
             * @param layoutHeight {number}
             */
            __egretProto__.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
                if (isNaN(layoutWidth)) {
                    this._UIC_Props_._layoutWidthExplicitlySet = false;
                    layoutWidth = this.preferredWidth;
                }
                else {
                    this._UIC_Props_._layoutWidthExplicitlySet = true;
                }
                if (isNaN(layoutHeight)) {
                    this._UIC_Props_._layoutHeightExplicitlySet = false;
                    layoutHeight = this.preferredHeight;
                }
                else {
                    this._UIC_Props_._layoutHeightExplicitlySet = true;
                }
                this.setActualSize(layoutWidth / this._DO_Props_._scaleX, layoutHeight / this._DO_Props_._scaleY);
            };
            /**
             * @method egret.gui.UIComponent#setLayoutBoundsPosition
             * @param x {number}
             * @param y {number}
             */
            __egretProto__.setLayoutBoundsPosition = function (x, y) {
                if (this._DO_Props_._scaleX < 0) {
                    x += this.layoutBoundsWidth;
                }
                if (this._DO_Props_._scaleY < 0) {
                    y += this.layoutBoundsHeight;
                }
                var changed = false;
                if (this._DO_Props_._x != x) {
                    this._setX(x);
                    changed = true;
                }
                if (this._DO_Props_._y != y) {
                    this._setY(y);
                    changed = true;
                }
                if (changed) {
                    this.dispatchMoveEvent();
                }
            };
            Object.defineProperty(__egretProto__, "preferredWidth", {
                /**
                 * @member egret.gui.UIComponent#preferredWidth
                 */
                get: function () {
                    var w = this._DO_Props_._hasWidthSet ? this._DO_Props_._explicitWidth : this._UIC_Props_._measuredWidth;
                    var scaleX = this._DO_Props_._scaleX;
                    if (scaleX < 0) {
                        scaleX = -scaleX;
                    }
                    return w * scaleX;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "preferredHeight", {
                /**
                 * @member egret.gui.UIComponent#preferredHeight
                 */
                get: function () {
                    var h = this._DO_Props_._hasHeightSet ? this._DO_Props_._explicitHeight : this._UIC_Props_._measuredHeight;
                    var scaleY = this._DO_Props_._scaleY;
                    if (scaleY < 0) {
                        scaleY = -scaleY;
                    }
                    return h * scaleY;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "preferredX", {
                /**
                 * @member egret.gui.UIComponent#preferredX
                 */
                get: function () {
                    if (this._DO_Props_._scaleX >= 0) {
                        return this._DO_Props_._x;
                    }
                    var w = this.preferredWidth;
                    return this._DO_Props_._x - w;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "preferredY", {
                /**
                 * @member egret.gui.UIComponent#preferredY
                 */
                get: function () {
                    if (this._DO_Props_._scaleY >= 0) {
                        return this._DO_Props_._y;
                    }
                    var h = this.preferredHeight;
                    return this._DO_Props_._y - h;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "layoutBoundsX", {
                /**
                 * @member egret.gui.UIComponent#layoutBoundsX
                 */
                get: function () {
                    if (this._DO_Props_._scaleX >= 0) {
                        return this._DO_Props_._x;
                    }
                    var w = this.layoutBoundsWidth;
                    return this._DO_Props_._x - w;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "layoutBoundsY", {
                /**
                 * @member egret.gui.UIComponent#layoutBoundsY
                 */
                get: function () {
                    if (this._DO_Props_._scaleY >= 0) {
                        return this._DO_Props_._y;
                    }
                    var h = this.layoutBoundsHeight;
                    return this._DO_Props_._y - h;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "layoutBoundsWidth", {
                /**
                 * @member egret.gui.UIComponent#layoutBoundsWidth
                 */
                get: function () {
                    var w = 0;
                    if (this._UIC_Props_._layoutWidthExplicitlySet) {
                        w = this._UIC_Props_._width;
                    }
                    else if (this._DO_Props_._hasWidthSet) {
                        w = this._DO_Props_._explicitWidth;
                    }
                    else {
                        w = this._UIC_Props_._measuredWidth;
                    }
                    var scaleX = this._DO_Props_._scaleX;
                    if (scaleX < 0) {
                        scaleX = -scaleX;
                    }
                    return w * scaleX;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "layoutBoundsHeight", {
                /**
                 * 组件的布局高度,常用于父级的updateDisplayList()方法中
                 * 按照：布局高度>外部显式设置高度>测量高度 的优先级顺序返回高度
                 * @member egret.gui.UIComponent#layoutBoundsHeight
                 */
                get: function () {
                    var h = 0;
                    if (this._UIC_Props_._layoutHeightExplicitlySet) {
                        h = this._UIC_Props_._height;
                    }
                    else if (this._DO_Props_._hasHeightSet) {
                        h = this._DO_Props_._explicitHeight;
                    }
                    else {
                        h = this._UIC_Props_._measuredHeight;
                    }
                    var scaleY = this.scaleY;
                    if (scaleY < 0) {
                        scaleY = -scaleY;
                    }
                    return h * scaleY;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * __proto__属性是否可以设置的标志，兼容IE9，IE10。
             */
            UIComponent.prototypeCanSet = undefined;
            UIComponent.emptyStyleChain = {};
            return UIComponent;
        })(egret.DisplayObjectContainer);
        gui.UIComponent = UIComponent;
        UIComponent.prototype.__class__ = "egret.gui.UIComponent";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
