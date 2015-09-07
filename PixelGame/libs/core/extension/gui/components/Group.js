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
         * @class egret.gui.Group
         * @classdesc
         * 自动布局容器
         * @extends egret.gui.GroupBase
         * @implements egret.gui.IVisualElementContainer
         */
        var Group = (function (_super) {
            __extends(Group, _super);
            /**
             * @method egret.gui.Group#constructor
             */
            function Group() {
                _super.call(this);
                /**
                 * createChildren()方法已经执行过的标志
                 */
                this.createChildrenCalled = false;
                /**
                 * elementsContent改变标志
                 */
                this.elementsContentChanged = false;
                this._elementsContent = [];
            }
            var __egretProto__ = Group.prototype;
            /**
             * 创建子对象
             * @method egret.gui.Group#createChildren
             */
            __egretProto__.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createChildrenCalled = true;
                if (this.elementsContentChanged) {
                    this.elementsContentChanged = false;
                    this.setElementsContent(this._elementsContent);
                }
            };
            /**
             * 返回子元素列表
             */
            __egretProto__._getElementsContent = function () {
                return this._elementsContent;
            };
            Object.defineProperty(__egretProto__, "elementsContent", {
                /**
                 * 设置容器子对象数组 。数组包含要添加到容器的子项列表，之前的已存在于容器中的子项列表被全部移除后添加列表里的每一项到容器。
                 * 设置该属性时会对您输入的数组进行一次浅复制操作，所以您之后对该数组的操作不会影响到添加到容器的子项列表数量。
                 */
                set: function (value) {
                    if (value == null)
                        value = [];
                    if (value == this._elementsContent)
                        return;
                    if (this.createChildrenCalled) {
                        this.setElementsContent(value);
                    }
                    else {
                        this.elementsContentChanged = true;
                        for (var i = this._elementsContent.length - 1; i >= 0; i--) {
                            this._elementRemoved(this._elementsContent[i], i);
                        }
                        this._elementsContent = value;
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 设置容器子对象列表
             */
            __egretProto__.setElementsContent = function (value) {
                var i;
                for (i = this._elementsContent.length - 1; i >= 0; i--) {
                    this._elementRemoved(this._elementsContent[i], i);
                }
                this._elementsContent = value.concat();
                var n = this._elementsContent.length;
                for (i = 0; i < n; i++) {
                    var elt = this._elementsContent[i];
                    if (elt.parent && "removeElement" in elt.parent)
                        (elt.parent).removeElement(elt);
                    else if (elt.owner && "removeElement" in elt.owner)
                        (elt.owner).removeElement(elt);
                    this._elementAdded(elt, i);
                }
            };
            Object.defineProperty(__egretProto__, "numElements", {
                /**
                 * 获得容器中的子对象数
                 * @member egret.gui.Group#numElements
                 */
                get: function () {
                    return this._elementsContent.length;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 返回指定索引处的可视元素
             * @method egret.gui.Group#getElementAt
             * @param index {number}
             * @returns {IVisualElement}
             */
            __egretProto__.getElementAt = function (index) {
                this.checkForRangeError(index);
                return this._elementsContent[index];
            };
            __egretProto__.checkForRangeError = function (index, addingElement) {
                if (addingElement === void 0) { addingElement = false; }
                var maxIndex = this._elementsContent.length - 1;
                if (addingElement)
                    maxIndex++;
                if (index < 0 || index > maxIndex)
                    egret.$error(3011, index);
            };
            /**
             * 将可视元素添加到此容器中
             * @method egret.gui.Group#addElement
             * @param element {IVisualElement}
             * @returns {IVisualElement}
             */
            __egretProto__.addElement = function (element) {
                var index = this.numElements;
                if (element.parent == this)
                    index = this.numElements - 1;
                return this.addElementAt(element, index);
            };
            /**
             * 将可视元素添加到此容器中
             * @method egret.gui.Group#addElementAt
             * @param element {IVisualElement}
             * @param index {number}
             * @returns {IVisualElement}
             */
            __egretProto__.addElementAt = function (element, index) {
                if (element == this)
                    return element;
                this.checkForRangeError(index, true);
                var host = element.owner;
                if (host == this || element.parent == this) {
                    this.setElementIndex(element, index);
                    return element;
                }
                else if (host && "removeElement" in host) {
                    (element.owner).removeElement(element);
                }
                this._elementsContent.splice(index, 0, element);
                if (!this.elementsContentChanged)
                    this._elementAdded(element, index);
                return element;
            };
            /**
             * 从此容器的子列表中删除指定的可视元素
             * @method egret.gui.Group#removeElement
             * @param element {IVisualElement}
             * @returns {IVisualElement}
             */
            __egretProto__.removeElement = function (element) {
                return this.removeElementAt(this.getElementIndex(element));
            };
            /**
             * 从容器中的指定索引位置删除可视元素
             * @method egret.gui.Group#removeElementAt
             * @param index {number}
             * @returns {IVisualElement}
             */
            __egretProto__.removeElementAt = function (index) {
                this.checkForRangeError(index);
                var element = this._elementsContent[index];
                if (!this.elementsContentChanged)
                    this._elementRemoved(element, index);
                this._elementsContent.splice(index, 1);
                return element;
            };
            /**
             * 删除容器中的所有子元素
             * @method egret.gui.Group#removeAllElements
             */
            __egretProto__.removeAllElements = function () {
                for (var i = this.numElements - 1; i >= 0; i--) {
                    this.removeElementAt(i);
                }
            };
            /**
             * 返回可视元素的索引位置
             * @method egret.gui.Group#getElementIndex
             * @param element {IVisualElement}
             * @returns {number}
             */
            __egretProto__.getElementIndex = function (element) {
                return this._elementsContent.indexOf(element);
            };
            /**
             * 在可视容器中更改现有可视元素的位置
             * @method egret.gui.Group#setElementIndex
             * @param element {IVisualElement}
             * @param index {number}
             */
            __egretProto__.setElementIndex = function (element, index) {
                this.checkForRangeError(index);
                var oldIndex = this.getElementIndex(element);
                if (oldIndex == -1 || oldIndex == index)
                    return;
                if (!this.elementsContentChanged)
                    this._elementRemoved(element, oldIndex, false);
                this._elementsContent.splice(oldIndex, 1);
                this._elementsContent.splice(index, 0, element);
                if (!this.elementsContentChanged)
                    this._elementAdded(element, index, false);
            };
            /**
             * 交换两个指定可视元素的索引
             * @method egret.gui.Group#swapElements
             * @param element1 {IVisualElement}
             * @param element2 {IVisualElement}
             */
            __egretProto__.swapElements = function (element1, element2) {
                this.swapElementsAt(this.getElementIndex(element1), this.getElementIndex(element2));
            };
            /**
             * 交换容器中位于两个指定索引位置的可视元素
             * @method egret.gui.Group#swapElementsAt
             * @param index1 {number}
             * @param index2 {number}
             */
            __egretProto__.swapElementsAt = function (index1, index2) {
                this.checkForRangeError(index1);
                this.checkForRangeError(index2);
                if (index1 > index2) {
                    var temp = index2;
                    index2 = index1;
                    index1 = temp;
                }
                else if (index1 == index2)
                    return;
                var elementsContent = this._elementsContent;
                var element1 = elementsContent[index1];
                var element2 = elementsContent[index2];
                if (!this.elementsContentChanged) {
                    this._elementRemoved(element1, index1, false);
                    this._elementRemoved(element2, index2, false);
                }
                elementsContent[index1] = element2;
                elementsContent[index2] = element1;
                if (!this.elementsContentChanged) {
                    this._elementAdded(element2, index1, false);
                    this._elementAdded(element1, index2, false);
                }
            };
            /**
             * 添加一个显示元素到容器
             * @param element {IVisualElement}
             * @param index {number}
             * @param notifyListeners {boolean}
             */
            __egretProto__._elementAdded = function (element, index, notifyListeners) {
                if (notifyListeners === void 0) { notifyListeners = true; }
                if (element instanceof egret.DisplayObject) {
                    var childDO = element;
                    this._addToDisplayListAt(childDO, index, notifyListeners);
                }
                if (notifyListeners) {
                    if (this.hasEventListener(gui.ElementExistenceEvent.ELEMENT_ADD))
                        gui.ElementExistenceEvent.dispatchElementExistenceEvent(this, gui.ElementExistenceEvent.ELEMENT_ADD, element, index);
                }
                this.invalidateSize();
                this.invalidateDisplayList();
            };
            /**
             * 从容器移除一个显示元素
             * @param element {IVisualElement}
             * @param index {number}
             * @param notifyListeners {boolean}
             */
            __egretProto__._elementRemoved = function (element, index, notifyListeners) {
                if (notifyListeners === void 0) { notifyListeners = true; }
                if (notifyListeners) {
                    if (this.hasEventListener(gui.ElementExistenceEvent.ELEMENT_REMOVE))
                        gui.ElementExistenceEvent.dispatchElementExistenceEvent(this, gui.ElementExistenceEvent.ELEMENT_REMOVE, element, index);
                }
                if (element instanceof egret.DisplayObject && element.parent == this) {
                    var childDO = element;
                    this._removeFromDisplayList(childDO, notifyListeners);
                }
                this.invalidateSize();
                this.invalidateDisplayList();
            };
            /**
             * 将可视元素添加到此容器中
             * @deprecated
             * @param child {DisplayObject}
             * @returns {DisplayObject}
             */
            __egretProto__.addChild = function (child) {
                egret.$error(3004, egret.getString(3003));
                return null;
            };
            /**
             * 将可视元素添加到此容器中
             * @deprecated
             * @param child {DisplayObject}
             * @param index {number}
             * @returns {DisplayObject}
             */
            __egretProto__.addChildAt = function (child, index) {
                egret.$error(3005, egret.getString(3003));
                return null;
            };
            /**从此容器的子列表中删除指定的可视元素
             * @deprecated
             * @param child {DisplayObject}
             * @returns {DisplayObject}
             */
            __egretProto__.removeChild = function (child) {
                egret.$error(3006, egret.getString(3003));
                return null;
            };
            /**
             * 从此容器的子列表中删除指定的可视元素
             * @method egret.gui.Group#removeChildAt
             * @deprecated
             * @param index {number}
             * @returns {DisplayObject}
             */
            __egretProto__.removeChildAt = function (index) {
                egret.$error(3007, egret.getString(3003));
                return null;
            };
            /**
             * 在可视容器中更改现有可视元素的位置
             * @deprecated
             * @param child {DisplayObject}
             * @param index {number}
             */
            __egretProto__.setChildIndex = function (child, index) {
                egret.$error(3008, egret.getString(3003));
            };
            /**
             * 交换两个指定可视元素的索引
             * @deprecated
             * @param child1 {DisplayObject}
             * @param child2 {DisplayObject}
             */
            __egretProto__.swapChildren = function (child1, child2) {
                egret.$error(3009, egret.getString(3003));
            };
            /**
             * 交换容器中位于两个指定索引位置的可视元素
             * @method egret.gui.Group#swapChildrenAt
             * @deprecated
             * @param index1 {number}
             * @param index2 {number}
             */
            __egretProto__.swapChildrenAt = function (index1, index2) {
                egret.$error(3010, egret.getString(3003));
            };
            return Group;
        })(gui.GroupBase);
        gui.Group = Group;
        Group.prototype.__class__ = "egret.gui.Group";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
