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
         * @class egret.gui.SkinnableComponent
         * @classdesc
         * 复杂可设置外观组件的基类，接受ISkin类或任何显示对象作为皮肤。
         * 当皮肤为ISkin时，将自动匹配两个实例内同名的公开属性(显示对象)，
         * 并将皮肤的属性引用赋值到此类定义的同名属性(必须没有默认值)上,
         * 如果要对公共属性添加事件监听或其他操作，
         * 请覆盖partAdded()和partRemoved()方法
         * @extends egret.gui.UIComponent
         */
        var SkinnableComponent = (function (_super) {
            __extends(SkinnableComponent, _super);
            /**
             * 构造函数
             * @method egret.gui.SkinnableComponent#constructor
             */
            function SkinnableComponent() {
                _super.call(this);
                /**
                 * 主机组件标识符。用于唯一确定一个组件的名称。
                 * 用户自定义的组件若不对此属性赋值，将会继承父级的标识符定义。
                 * @member {string} egret.gui.SkinnableComponent#hostComponentKey
                 */
                this.hostComponentKey = null;
                /**
                 * 外部显式设置了皮肤名
                 */
                this._skinNameExplicitlySet = false;
                this._skinName = null;
                this._createChildrenCalled = false;
                this._skin = null;
                this.skinLayoutEnabled = false;
                //========================皮肤视图状态=====================start=======================
                this.stateIsDirty = false;
                this._autoMouseEnabled = true;
                /**
                 * 外部显式设置的mouseChildren属性值
                 */
                this.explicitMouseChildren = true;
                /**
                 * 外部显式设置的mouseEnabled属性值
                 */
                this.explicitMouseEnabled = true;
            }
            var __egretProto__ = SkinnableComponent.prototype;
            Object.defineProperty(__egretProto__, "skinName", {
                /**
                 * 皮肤标识符。可以为Class,String,或DisplayObject实例等任意类型，具体规则由项目注入的素材适配器决定，
                 * 适配器根据此属性值解析获取对应的显示对象，并赋值给skin属性。
                 * @member {string} egret.gui.SkinnableComponent#skinName
                 */
                get: function () {
                    return this._skinName;
                },
                set: function (value) {
                    if (this._skinName == value)
                        return;
                    this._skinName = value;
                    this._skinNameExplicitlySet = true;
                    if (this._createChildrenCalled) {
                        this.parseSkinName();
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 创建该容器的子元素对象
             * @method egret.gui.SkinnableComponent#createChildren
             */
            __egretProto__.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.parseSkinName();
                this._createChildrenCalled = true;
            };
            /**
             * 解析skinName
             */
            __egretProto__.parseSkinName = function () {
                var adapter = SkinnableComponent.skinAdapter;
                if (!adapter) {
                    adapter = this.getSkinAdapter();
                }
                var key = this.hostComponentKey || egret.getQualifiedClassName(this);
                var skin = adapter.getSkin(this._skinName, key);
                if (!skin) {
                    var theme = SkinnableComponent._defaultTheme;
                    if (theme) {
                        skin = theme.getDefaultSkin(this);
                    }
                }
                this._setSkin(skin);
            };
            /**
             * 获取皮肤适配器
             */
            __egretProto__.getSkinAdapter = function () {
                var adapter;
                try {
                    adapter = egret.Injector.getInstance("egret.gui.ISkinAdapter");
                }
                catch (e) {
                    adapter = new gui.DefaultSkinAdapter();
                }
                SkinnableComponent.skinAdapter = adapter;
                return adapter;
            };
            Object.defineProperty(__egretProto__, "skin", {
                /**
                 * 皮肤对象实例。
                 * @member egret.gui.SkinnableComponent#skin
                 */
                get: function () {
                    return this._skin;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 设置皮肤
             */
            __egretProto__._setSkin = function (skin) {
                var oldSkin = this._skin;
                this.detachSkin(oldSkin);
                if (oldSkin instanceof egret.DisplayObject) {
                    this._removeFromDisplayList(oldSkin);
                }
                this._skin = skin;
                if (skin instanceof egret.DisplayObject) {
                    this._addToDisplayListAt(this._skin, 0);
                }
                this.attachSkin(skin);
                this.invalidateSkinState();
                this.invalidateSize();
                this.invalidateDisplayList();
                if (this.hasEventListener(gui.UIEvent.SKIN_CHANGED)) {
                    gui.UIEvent.dispatchUIEvent(this, gui.UIEvent.SKIN_CHANGED);
                }
            };
            /**
             * 附加皮肤
             * @method egret.gui.SkinnableComponent#attachSkin
             * @param skin {any}
             */
            __egretProto__.attachSkin = function (skin) {
                if (skin && !(skin instanceof egret.DisplayObject))
                    this.skinLayoutEnabled = true;
                else
                    this.skinLayoutEnabled = false;
                if (skin && "hostComponent" in skin) {
                    var newSkin = skin;
                    newSkin.hostComponent = this;
                    this.findSkinParts();
                }
            };
            /**
             * 匹配皮肤和主机组件的公共变量，并完成实例的注入。此方法在附加皮肤时会自动执行一次。
             * 若皮肤中含有延迟实例化的子部件，在子部件实例化完成时需要从外部再次调用此方法,完成注入。
             * @method egret.gui.SkinnableComponent#findSkinParts
             */
            __egretProto__.findSkinParts = function () {
                var skin = this._skin;
                if (skin && "skinParts" in skin) {
                    var skinParts = skin.skinParts;
                    var length = skinParts.length;
                    for (var i = 0; i < length; i++) {
                        var partName = skinParts[i];
                        if ((partName in skin)) {
                            try {
                                this[partName] = skin[partName];
                                this.partAdded(partName, skin[partName]);
                            }
                            catch (e) {
                            }
                        }
                    }
                }
            };
            /**
             * 卸载皮肤
             * @method egret.gui.SkinnableComponent#detachSkin
             * @param skin {any}
             */
            __egretProto__.detachSkin = function (skin) {
                if (skin) {
                    if ("skinParts" in skin) {
                        var skinParts = skin.skinParts;
                        var length = skinParts.length;
                        for (var i = 0; i < length; i++) {
                            var partName = skinParts[i];
                            if (!(partName in this))
                                continue;
                            if (this[partName] != null) {
                                this.partRemoved(partName, this[partName]);
                            }
                            this[partName] = null;
                        }
                    }
                    skin.hostComponent = null;
                }
            };
            /**
             * 若皮肤是ISkin,则调用此方法附加皮肤中的公共部件
             * @method egret.gui.SkinnableComponent#partAdded
             * @param partName {string}
             * @param instance {any}
             */
            __egretProto__.partAdded = function (partName, instance) {
                gui.SkinPartEvent.dispatchSkinPartEvent(this, gui.SkinPartEvent.PART_ADDED, partName, instance);
            };
            /**
             * 若皮肤是ISkin，则调用此方法卸载皮肤之前注入的公共部件
             * @method egret.gui.SkinnableComponent#partRemoved
             * @param partName {string}
             * @param instance {any}
             */
            __egretProto__.partRemoved = function (partName, instance) {
                gui.SkinPartEvent.dispatchSkinPartEvent(this, gui.SkinPartEvent.PART_REMOVED, partName, instance);
            };
            /**
             * 标记当前需要重新验证皮肤状态
             * @method egret.gui.SkinnableComponent#invalidateSkinState
             */
            __egretProto__.invalidateSkinState = function () {
                if (this.stateIsDirty)
                    return;
                this.stateIsDirty = true;
                this.invalidateProperties();
            };
            /**
             * 子类覆盖此方法,应用当前的皮肤状态
             * @method egret.gui.SkinnableComponent#validateSkinState
             */
            __egretProto__.validateSkinState = function () {
                var curState = this.getCurrentSkinState();
                var skin = this._skin;
                if (skin && "currentState" in skin) {
                    skin.currentState = curState;
                }
                if (this.hasEventListener("stateChanged"))
                    this.dispatchEventWith("stateChanged");
            };
            Object.defineProperty(__egretProto__, "autoTouchEnabled", {
                /**
                 * 在enabled属性发生改变时是否自动开启或禁用鼠标事件的响应。默认值为true。
                 * @member egret.gui.SkinnableComponent#autoTouchEnabled
                 */
                get: function () {
                    return this._autoMouseEnabled;
                },
                set: function (value) {
                    if (this._autoMouseEnabled == value)
                        return;
                    this._autoMouseEnabled = value;
                    if (this._autoMouseEnabled) {
                        this._touchChildren = this.enabled ? this.explicitMouseChildren : false;
                        this._DO_Props_._touchEnabled = this.enabled ? this.explicitMouseEnabled : false;
                    }
                    else {
                        this._touchChildren = this.explicitMouseChildren;
                        this._DO_Props_._touchEnabled = this.explicitMouseEnabled;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "touchChildren", {
                /**
                 * @member egret.gui.SkinnableComponent#touchChildren
                 */
                get: function () {
                    return this._touchChildren;
                },
                /**
                 * @inheritDoc
                 */
                set: function (value) {
                    if (this.enabled)
                        this._touchChildren = value;
                    this.explicitMouseChildren = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "touchEnabled", {
                /**
                 * @member egret.gui.SkinnableComponent#touchEnabled
                 */
                get: function () {
                    return this._DO_Props_._touchEnabled;
                },
                /**
                 * @inheritDoc
                 */
                set: function (value) {
                    if (this.enabled)
                        this._DO_Props_._touchEnabled = value;
                    this.explicitMouseEnabled = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "enabled", {
                /**
                 * @member egret.gui.SkinnableComponent#enabled
                 */
                get: function () {
                    return this._UIC_Props_._enabled;
                },
                /**
                 * @inheritDoc
                 */
                set: function (value) {
                    this._setEnabled(value);
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__._setEnabled = function (value) {
                if (this._UIC_Props_._enabled == value)
                    return;
                this._UIC_Props_._enabled = value;
                if (this._autoMouseEnabled) {
                    this._touchChildren = value ? this.explicitMouseChildren : false;
                    this._DO_Props_._touchEnabled = value ? this.explicitMouseEnabled : false;
                }
                this.invalidateSkinState();
            };
            /**
             * 返回组件当前的皮肤状态名称,子类覆盖此方法定义各种状态名
             * @method egret.gui.SkinnableComponent#getCurrentSkinState
             * @returns {string}
             */
            __egretProto__.getCurrentSkinState = function () {
                return this.enabled ? "normal" : "disabled";
            };
            //========================皮肤视图状态===================end========================
            /**
             * 处理对组件设置的属性
             * @method egret.gui.SkinnableComponent#commitProperties
             */
            __egretProto__.commitProperties = function () {
                _super.prototype.commitProperties.call(this);
                if (this.stateIsDirty) {
                    this.stateIsDirty = false;
                    this.validateSkinState();
                }
            };
            /**
             *
             * @private
             */
            __egretProto__._childXYChanged = function () {
                if (this.skinLayoutEnabled) {
                    this.invalidateSize();
                    this.invalidateDisplayList();
                }
            };
            /**
             * 计算组件的默认大小和（可选）默认最小大小
             */
            __egretProto__.measure = function () {
                _super.prototype.measure.call(this);
                var skin = this._skin;
                if (!skin)
                    return;
                if (this.skinLayoutEnabled) {
                    skin.measure();
                    this.measuredWidth = skin.preferredWidth;
                    this.measuredHeight = skin.preferredHeight;
                }
                else {
                    if ("preferredWidth" in skin) {
                        this.measuredWidth = skin.preferredWidth;
                        this.measuredHeight = skin.preferredHeight;
                    }
                    else {
                        this.measuredWidth = skin.width;
                        this.measuredHeight = skin.height;
                    }
                }
            };
            /**
             * 绘制对象和/或设置其子项的大小和位置
             * @method egret.gui.SkinnableComponent#updateDisplayList
             * @param unscaledWidth {number}
             * @param unscaledHeight {number}
             */
            __egretProto__.updateDisplayList = function (unscaledWidth, unscaledHeight) {
                _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
                var skin = this._skin;
                if (skin) {
                    if (this.skinLayoutEnabled) {
                        skin.updateDisplayList(unscaledWidth, unscaledHeight);
                    }
                    else if ("setLayoutBoundsSize" in skin) {
                        (skin).setLayoutBoundsSize(unscaledWidth, unscaledHeight);
                    }
                    else if (skin instanceof egret.DisplayObject) {
                        skin.scaleX = skin.width == 0 ? 1 : unscaledWidth / skin.width;
                        skin.scaleY = skin.height == 0 ? 1 : unscaledHeight / skin.height;
                    }
                }
            };
            /**
             * 不支持此方法
             * @method egret.gui.SkinnableComponent#addChild
             * @deprecated
             * @param child {DisplayObject}
             * @returns {DisplayObject}
             */
            __egretProto__.addChild = function (child) {
                throw (new Error(egret.getString(3004, egret.getString(3003))));
            };
            /**
             *  不支持此方法
             * @method egret.gui.SkinnableComponent#addChildAt
             * @deprecated
             * @param child {DisplayObject}
             * @param index {number}
             * @returns {DisplayObject}
             */
            __egretProto__.addChildAt = function (child, index) {
                throw (new Error(egret.getString(3005, egret.getString(3003))));
            };
            /**
             *  不支持此方法
             * @method egret.gui.SkinnableComponent#removeChild
             * @deprecated
             * @param child {DisplayObject}
             * @returns {DisplayObject}
             */
            __egretProto__.removeChild = function (child) {
                throw (new Error(egret.getString(3006, egret.getString(3003))));
            };
            /**
             *  不支持此方法
             * @method egret.gui.SkinnableComponent#removeChildAt
             * @deprecated
             * @param index {number}
             * @returns {DisplayObject}
             */
            __egretProto__.removeChildAt = function (index) {
                throw (new Error(egret.getString(3007, egret.getString(3003))));
            };
            /**
             *  不支持此方法
             * @method egret.gui.SkinnableComponent#setChildIndex
             * @deprecated
             * @param child {DisplayObject}
             * @param index {number}
             */
            __egretProto__.setChildIndex = function (child, index) {
                throw (new Error(egret.getString(3008, egret.getString(3003))));
            };
            /**
             *  不支持此方法
             * @method egret.gui.SkinnableComponent#swapChildren
             * @deprecated
             * @param child1 {DisplayObject}
             * @param child2 {DisplayObject}
             */
            __egretProto__.swapChildren = function (child1, child2) {
                throw (new Error(egret.getString(3009, egret.getString(3003))));
            };
            /**
             *  不支持此方法
             * @method egret.gui.SkinnableComponent#swapChildrenAt
             * @deprecated
             * @param index1 {number}
             * @param index2 {number}
             */
            __egretProto__.swapChildrenAt = function (index1, index2) {
                throw (new Error(egret.getString(3010, egret.getString(3003))));
            };
            /**
             * 皮肤解析适配器
             */
            SkinnableComponent.skinAdapter = null;
            /**
             * 默认皮肤主题解析器
             */
            SkinnableComponent._defaultTheme = null;
            return SkinnableComponent;
        })(gui.UIComponent);
        gui.SkinnableComponent = SkinnableComponent;
        SkinnableComponent.prototype.__class__ = "egret.gui.SkinnableComponent";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
