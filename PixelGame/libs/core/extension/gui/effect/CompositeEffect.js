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
         * @class egret.gui.CompositeEffect
         * @classdesc
         * 复合效果的基类
         * @extends egret.gui.Effect
         */
        var CompositeEffect = (function (_super) {
            __extends(CompositeEffect, _super);
            /**
             * @method egret.gui.CompositeEffect#constructor
             */
            function CompositeEffect(target) {
                if (target === void 0) { target = null; }
                _super.call(this, target);
                this._children = [];
                this.instanceClass = gui.CompositeEffectInstance;
            }
            var __egretProto__ = CompositeEffect.prototype;
            Object.defineProperty(__egretProto__, "children", {
                /**
                 * 子效果的数组。
                 * @member egret.gui.CompositeEffect#children
                 */
                get: function () {
                    return this._children;
                },
                set: function (value) {
                    var i = 0;
                    if (this._children)
                        for (i = 0; i < this._children.length; ++i)
                            if (this._children[i])
                                this._children[i]._parentCompositeEffect = null;
                    this._children = value;
                    if (this._children)
                        for (i = 0; i < this._children.length; ++i)
                            if (this._children[i])
                                this._children[i]._parentCompositeEffect = this;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(__egretProto__, "compositeDuration", {
                /**
                 * 返回此效果的总持续时间。
                 * @member egret.gui.CompositeEffect#compositeDuration
                 */
                get: function () {
                    return this.duration;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.createInstance = function (target) {
                if (target === void 0) { target = null; }
                if (!this.childTargets)
                    this.childTargets = [target];
                var newInstance = _super.prototype.createInstance.call(this, target);
                this.childTargets = null;
                return newInstance;
            };
            __egretProto__.createInstances = function (targets) {
                if (targets === void 0) { targets = null; }
                if (!targets)
                    targets = this.targets;
                this.childTargets = targets;
                var newInstance = this.createInstance();
                this.childTargets = null;
                return newInstance ? [newInstance] : [];
            };
            __egretProto__._initInstance = function (instance) {
                _super.prototype._initInstance.call(this, instance);
                var compInst = instance;
                var targets = this.childTargets;
                if (!(targets instanceof Array))
                    targets = [targets];
                if (this.children) {
                    var n = this.children.length;
                    for (var i = 0; i < n; i++) {
                        var childEffect = this.children[i];
                        if (childEffect.targets.length == 0) {
                            compInst.addChildSet(this.children[i].createInstances(targets));
                        }
                        else {
                            compInst.addChildSet(this.children[i].createInstances(childEffect.targets));
                        }
                    }
                }
            };
            /**
             * 将新的子效果添加到此复合效果。
             * @method egret.gui.CompositeEffect#addChild
             */
            __egretProto__.addChild = function (childEffect) {
                this.children.push(childEffect);
                childEffect._parentCompositeEffect = this;
            };
            return CompositeEffect;
        })(gui.Effect);
        gui.CompositeEffect = CompositeEffect;
        CompositeEffect.prototype.__class__ = "egret.gui.CompositeEffect";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
