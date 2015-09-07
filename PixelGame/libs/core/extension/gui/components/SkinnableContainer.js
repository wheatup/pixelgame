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
         * @class egret.gui.SkinnableContainer
         * @classdesc
         * 可设置外观的容器的基类
         * @extends egret.gui.SkinnableComponent
         * @implements egret.gui.IVisualElementContainer
         */
        var SkinnableContainer = (function (_super) {
            __extends(SkinnableContainer, _super);
            /**
             * @method egret.gui.SkinnableContainer#constructor
             */
            function SkinnableContainer() {
                _super.call(this);
                /**
                 * [SkinPart]实体容器
                 * @member egret.gui.SkinnableContainer#contentGroup
                 */
                this.contentGroup = null;
                /**
                 * 实体容器实例化之前缓存子对象的容器
                 */
                this._placeHolderGroup = null;
                /**
                 * contentGroup发生改变时传递的参数
                 */
                this.contentGroupProperties = {};
            }
            var __egretProto__ = SkinnableContainer.prototype;
            /**
             * 获取当前的实体容器
             */
            __egretProto__._getCurrentContentGroup = function () {
                if (this.contentGroup == null) {
                    if (this._placeHolderGroup == null) {
                        this._placeHolderGroup = new gui.Group();
                        this._placeHolderGroup.visible = false;
                        this._addToDisplayList(this._placeHolderGroup);
                    }
                    this._placeHolderGroup.addEventListener(gui.ElementExistenceEvent.ELEMENT_ADD, this._contentGroup_elementAddedHandler, this);
                    this._placeHolderGroup.addEventListener(gui.ElementExistenceEvent.ELEMENT_REMOVE, this._contentGroup_elementRemovedHandler, this);
                    return this._placeHolderGroup;
                }
                else {
                    return this.contentGroup;
                }
            };
            Object.defineProperty(__egretProto__, "elementsContent", {
                /**
                 * 设置容器子对象数组 。数组包含要添加到容器的子项列表，之前的已存在于容器中的子项列表被全部移除后添加列表里的每一项到容器。
                 * 设置该属性时会对您输入的数组进行一次浅复制操作，所以您之后对该数组的操作不会影响到添加到容器的子项列表数量。
                 */
                set: function (value) {
                    this._getCurrentContentGroup().elementsContent = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "numElements", {
                /**
                 */
                get: function () {
                    return this._getCurrentContentGroup().numElements;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 返回指定索引处的可视元素
             * @param index {number}
             * @returns {IVisualElement}
             */
            __egretProto__.getElementAt = function (index) {
                return this._getCurrentContentGroup().getElementAt(index);
            };
            /**
             * 将可视元素添加到此容器中
             * @param element {IVisualElement}
             * @returns {IVisualElement}
             */
            __egretProto__.addElement = function (element) {
                return this._getCurrentContentGroup().addElement(element);
            };
            /**
             * 将可视元素添加到此容器中
             * @param element {IVisualElement}
             * @param index {number}
             * @returns {IVisualElement}
             */
            __egretProto__.addElementAt = function (element, index) {
                return this._getCurrentContentGroup().addElementAt(element, index);
            };
            /**
             * 从此容器的子列表中删除指定的可视元素
             * @param element {IVisualElement}
             * @returns {IVisualElement}
             */
            __egretProto__.removeElement = function (element) {
                return this._getCurrentContentGroup().removeElement(element);
            };
            /**
             * 从容器中的指定索引位置删除可视元素
             * @param index {number}
             * @returns {IVisualElement}
             */
            __egretProto__.removeElementAt = function (index) {
                return this._getCurrentContentGroup().removeElementAt(index);
            };
            /**
             * 删除容器中的所有子元素
             */
            __egretProto__.removeAllElements = function () {
                this._getCurrentContentGroup().removeAllElements();
            };
            /**
             * 获取子元素对象在容器中的索引值
             * @param element {IVisualElement}
             * @returns {number}
             */
            __egretProto__.getElementIndex = function (element) {
                return this._getCurrentContentGroup().getElementIndex(element);
            };
            /**
             * 根据索引设置子元素的显示
             * @param element {IVisualElement}
             * @param index {number}
             */
            __egretProto__.setElementIndex = function (element, index) {
                this._getCurrentContentGroup().setElementIndex(element, index);
            };
            /**
             * 交换两个指定可视元素的索引
             * @param element1 {IVisualElement}
             * @param element2 {IVisualElement}
             */
            __egretProto__.swapElements = function (element1, element2) {
                this._getCurrentContentGroup().swapElements(element1, element2);
            };
            /**
             * 交换容器中位于两个指定索引位置的可视元素
             * @param index1 {number}
             * @param index2 {number}
             */
            __egretProto__.swapElementsAt = function (index1, index2) {
                this._getCurrentContentGroup().swapElementsAt(index1, index2);
            };
            Object.defineProperty(__egretProto__, "layout", {
                /**
                 * 此容器的布局对象
                 * @member egret.gui.SkinnableContainer#layout
                 */
                get: function () {
                    return this.contentGroup != null ? this.contentGroup.layout : this.contentGroupProperties.layout;
                },
                set: function (value) {
                    if (this.contentGroup != null) {
                        this.contentGroup.layout = value;
                    }
                    else {
                        this.contentGroupProperties.layout = value;
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
             * [覆盖] 添加外观部件时调用
             * @param partName {string}
             * @param instance {any}
             */
            __egretProto__.partAdded = function (partName, instance) {
                _super.prototype.partAdded.call(this, partName, instance);
                if (instance == this.contentGroup) {
                    if (this.contentGroupProperties.layout !== undefined) {
                        this.contentGroup.layout = this.contentGroupProperties.layout;
                        this.contentGroupProperties = {};
                    }
                    if (this._placeHolderGroup) {
                        this._placeHolderGroup.removeEventListener(gui.ElementExistenceEvent.ELEMENT_ADD, this._contentGroup_elementAddedHandler, this);
                        this._placeHolderGroup.removeEventListener(gui.ElementExistenceEvent.ELEMENT_REMOVE, this._contentGroup_elementRemovedHandler, this);
                        var sourceContent = this._placeHolderGroup._getElementsContent().concat();
                        for (var i = this._placeHolderGroup.numElements; i > 0; i--) {
                            var element = this._placeHolderGroup.removeElementAt(0);
                            element.ownerChanged(null);
                        }
                        this._removeFromDisplayList(this._placeHolderGroup);
                        this.contentGroup.elementsContent = sourceContent;
                        for (i = sourceContent.length - 1; i >= 0; i--) {
                            element = sourceContent[i];
                            element.ownerChanged(this);
                        }
                        this._placeHolderGroup = null;
                    }
                    this.contentGroup.addEventListener(gui.ElementExistenceEvent.ELEMENT_ADD, this._contentGroup_elementAddedHandler, this);
                    this.contentGroup.addEventListener(gui.ElementExistenceEvent.ELEMENT_REMOVE, this._contentGroup_elementRemovedHandler, this);
                }
            };
            /**
             * [覆盖] 正删除外观部件的实例时调用
             * @param partName {string}
             * @param instance {any}
             */
            __egretProto__.partRemoved = function (partName, instance) {
                _super.prototype.partRemoved.call(this, partName, instance);
                if (instance == this.contentGroup) {
                    this.contentGroup.removeEventListener(gui.ElementExistenceEvent.ELEMENT_ADD, this._contentGroup_elementAddedHandler, this);
                    this.contentGroup.removeEventListener(gui.ElementExistenceEvent.ELEMENT_REMOVE, this._contentGroup_elementRemovedHandler, this);
                    this.contentGroupProperties.layout = this.contentGroup.layout;
                    this.contentGroup.layout = null;
                    if (this.contentGroup.numElements > 0) {
                        this._placeHolderGroup = new gui.Group;
                        while (this.contentGroup.numElements > 0) {
                            this._placeHolderGroup.addElement(this.contentGroup.getElementAt(0));
                        }
                        this._placeHolderGroup.addEventListener(gui.ElementExistenceEvent.ELEMENT_ADD, this._contentGroup_elementAddedHandler, this);
                        this._placeHolderGroup.addEventListener(gui.ElementExistenceEvent.ELEMENT_REMOVE, this._contentGroup_elementRemovedHandler, this);
                    }
                }
            };
            /**
             * 容器添加元素事件
             */
            __egretProto__._contentGroup_elementAddedHandler = function (event) {
                event.element.ownerChanged(this);
                this.dispatchEvent(event);
            };
            /**
             * 容器移除元素事件
             */
            __egretProto__._contentGroup_elementRemovedHandler = function (event) {
                event.element.ownerChanged(null);
                this.dispatchEvent(event);
            };
            return SkinnableContainer;
        })(gui.SkinnableComponent);
        gui.SkinnableContainer = SkinnableContainer;
        SkinnableContainer.prototype.__class__ = "egret.gui.SkinnableContainer";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
