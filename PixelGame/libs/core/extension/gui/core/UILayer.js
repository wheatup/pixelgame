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
         * UIStage的虚拟子容器
         */
        var UILayer = (function () {
            /**
             * 构造函数
             * @param owner {IUIStage}
             * @param lowerBoundReference {string}
             * @param upperBoundReference {strin}
             */
            function UILayer(owner, lowerBoundReference, upperBoundReference) {
                /**
                 * 实体容器
                 */
                this.owner = null;
                /**
                 * 容器下边界属性
                 */
                this.lowerBoundReference = null;
                /**
                 * 容器上边界属性
                 */
                this.upperBoundReference = null;
                this.raw_getElementAt = "raw_getElementAt";
                this.raw_addElementAt = "raw_addElementAt";
                this.raw_getElementIndex = "raw_getElementIndex";
                this.raw_removeElement = "raw_removeElement";
                this.raw_removeElementAt = "raw_removeElementAt";
                this.raw_setElementIndex = "raw_setElementIndex";
                this.owner = owner;
                this.lowerBoundReference = lowerBoundReference;
                this.upperBoundReference = upperBoundReference;
            }
            var __egretProto__ = UILayer.prototype;
            Object.defineProperty(__egretProto__, "numElements", {
                get: function () {
                    return this.owner[this.upperBoundReference] - this.owner[this.lowerBoundReference];
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 返回指定索引处的可视元素
             * @param index
             * @returns {IVisualElement}
             */
            __egretProto__.getElementAt = function (index) {
                var retval = this.owner[this.raw_getElementAt](this.owner[this.lowerBoundReference] + index);
                return retval;
            };
            /**
             * 将可视元素添加到此容器中
             * @param element
             * @returns {IVisualElement}
             */
            __egretProto__.addElement = function (element) {
                var index = this.owner[this.upperBoundReference];
                if (element.parent === this.owner)
                    index--;
                this.owner[this.upperBoundReference]++;
                this.owner[this.raw_addElementAt](element, index);
                element.ownerChanged(this);
                return element;
            };
            /**
             * 将可视元素添加到此容器中
             * @param element
             * @param index
             * @returns {IVisualElement}
             */
            __egretProto__.addElementAt = function (element, index) {
                this.owner[this.upperBoundReference]++;
                this.owner[this.raw_addElementAt](element, this.owner[this.lowerBoundReference] + index);
                element.ownerChanged(this);
                return element;
            };
            /**
             * 从此容器的子列表中删除指定的可视元素
             * @param element
             * @returns {IVisualElement}
             */
            __egretProto__.removeElement = function (element) {
                var index = this.owner[this.raw_getElementIndex](element);
                if (this.owner[this.lowerBoundReference] <= index && index < this.owner[this.upperBoundReference]) {
                    this.owner[this.raw_removeElement](element);
                    this.owner[this.upperBoundReference]--;
                }
                element.ownerChanged(null);
                return element;
            };
            /**
             * 从容器中的指定索引位置删除可视元素
             * @param index
             * @returns {IVisualElement}
             */
            __egretProto__.removeElementAt = function (index) {
                index += this.owner[this.lowerBoundReference];
                var element;
                if (this.owner[this.lowerBoundReference] <= index && index < this.owner[this.upperBoundReference]) {
                    element = this.owner[this.raw_removeElementAt](index);
                    this.owner[this.upperBoundReference]--;
                }
                element.ownerChanged(null);
                return element;
            };
            /**
             * 返回可视元素的索引位置
             * @param element
             * @returns {number}
             */
            __egretProto__.getElementIndex = function (element) {
                var retval = this.owner[this.raw_getElementIndex](element);
                retval -= this.owner[this.lowerBoundReference];
                return retval;
            };
            /**
             * 在可视容器中更改现有可视元素的位置
             * @param element
             * @param index
             */
            __egretProto__.setElementIndex = function (element, index) {
                this.owner[this.raw_setElementIndex](element, this.owner[this.lowerBoundReference] + index);
            };
            return UILayer;
        })();
        gui.UILayer = UILayer;
        UILayer.prototype.__class__ = "egret.gui.UILayer";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
