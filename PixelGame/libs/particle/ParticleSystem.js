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
var particle;
(function (_particle) {
    var ParticleSystem = (function (_super) {
        __extends(ParticleSystem, _super);
        function ParticleSystem(texture, emissionRate) {
            _super.call(this);
            this._pool = [];
            this.frameTime = 0;
            this.particles = [];
            /**
             * 表示粒子出现总时间，单位毫秒，取值范围(0,Number.MAX_VALUE]，-1表示无限时间
             * @member {number} particle.ParticleSystem#emissionTime
             * @default -1
             */
            this.emissionTime = -1;
            /**
             * 表示粒子出现点X坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
             * @member {number} particle.ParticleSystem#emitterX
             * @default 0
             */
            this.emitterX = 0;
            /**
             * 表示粒子出现点Y坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
             * @member {number} particle.ParticleSystem#emitterY
             * @default 0
             */
            this.emitterY = 0;
            /**
             * 表示粒子系统最大粒子数，超过该数量将不会继续创建粒子，取值范围[1,Number.MAX_VALUE]
             * @member {number} particle.ParticleSystem#maxParticles
             * @default 200
             */
            this.maxParticles = 200;
            /**
             * 当前粒子数
             * @member {number} particle.ParticleSystem#numParticles
             */
            this.numParticles = 0;
            /**
             * 表示粒子类，如果设置创建粒子时将创建该类
             * @member {number} particle.ParticleSystem#particleClass
             */
            this.particleClass = null;
            this.transformForRender = new egret.Matrix();
            this._texture_to_render = texture;
            this.emissionRate = emissionRate;
            this.texture = texture;
        }
        var __egretProto__ = ParticleSystem.prototype;
        __egretProto__.getParticle = function () {
            var result;
            if (this._pool.length) {
                result = this._pool.pop();
            }
            else if (this.particleClass) {
                result = new this.particleClass();
            }
            else {
                result = new _particle.Particle();
            }
            return result;
        };
        __egretProto__.removeParticle = function (particle) {
            var index = this.particles.indexOf(particle);
            if (index != -1) {
                particle.reset();
                this.particles.splice(index, 1);
                this._pool.push(particle);
                this.numParticles--;
                return true;
            }
            else {
                return false;
            }
        };
        __egretProto__.initParticle = function (particle) {
            particle.x = this.emitterX;
            particle.y = this.emitterY;
            particle.currentTime = 0;
            particle.totalTime = 1000;
        };
        /**
         * 开始创建粒子
         * @param duration {number} 粒子出现总时间
         */
        __egretProto__.start = function (duration) {
            if (duration === void 0) { duration = -1; }
            if (this.emissionRate != 0) {
                this.emissionTime = duration;
                egret.Ticker.getInstance().register(this.update, this);
            }
        };
        /**
         * 停止创建粒子
         * @param clear {boolean} 是否清除掉现有粒子
         */
        __egretProto__.stop = function (clear) {
            if (clear === void 0) { clear = false; }
            this.emissionTime = 0;
            egret.Ticker.getInstance().unregister(this.update, this);
            if (clear) {
                this.clear();
            }
        };
        __egretProto__.update = function (dt) {
            //粒子数很少的时候可能会错过添加粒子的时机
            if (this.emissionTime == -1 || this.emissionTime > 0) {
                this.frameTime += dt;
                while (this.frameTime > 0) {
                    if (this.numParticles < this.maxParticles) {
                        this.addOneParticle();
                    }
                    this.frameTime -= this.emissionRate;
                }
                if (this.emissionTime != -1) {
                    this.emissionTime -= dt;
                    if (this.emissionTime < 0) {
                        this.emissionTime = 0;
                    }
                }
            }
            var particle;
            var particleIndex = 0;
            while (particleIndex < this.numParticles) {
                particle = this.particles[particleIndex];
                if (particle.currentTime < particle.totalTime) {
                    this.advanceParticle(particle, dt);
                    particle.currentTime += dt;
                    particleIndex++;
                }
                else {
                    this.removeParticle(particle);
                }
            }
            if (this.numParticles == 0 && this.emissionTime == 0) {
                this.stop();
                this.dispatchEventWith(egret.Event.COMPLETE);
            }
        };
        __egretProto__.setCurrentParticles = function (num) {
            for (var i = this.numParticles; i < num && this.numParticles < this.maxParticles; i++) {
                this.addOneParticle();
            }
        };
        /**
         * 更换粒子纹理
         * @param texture {egret.Texture} 新的纹理
         */
        __egretProto__.changeTexture = function (texture) {
            if (this.texture != texture) {
                this.texture = texture;
                this._texture_to_render = texture;
            }
        };
        __egretProto__.clear = function () {
            while (this.particles.length) {
                this.removeParticle(this.particles[0]);
            }
            this.numParticles = 0;
        };
        __egretProto__.addOneParticle = function () {
            //todo 这里可能需要返回成功与否
            var particle = this.getParticle();
            this.initParticle(particle);
            if (particle.totalTime > 0) {
                this.particles.push(particle);
                this.numParticles++;
            }
        };
        __egretProto__.advanceParticle = function (particle, dt) {
            particle.y -= dt / 6;
        };
        __egretProto__._render = function (renderContext) {
            if (this.numParticles > 0) {
                var renderFilter = egret.RenderFilter.getInstance();
                //todo 考虑不同粒子使用不同的texture，或者使用egret.SpriteSheet
                var texture = this.texture;
                var textureW = texture._textureWidth;
                var textureH = texture._textureHeight;
                var offsetX = texture._offsetX;
                var offsetY = texture._offsetY;
                var bitmapX = texture._bitmapX;
                var bitmapY = texture._bitmapY;
                var bitmapWidth = texture._bitmapWidth;
                var bitmapHeight = texture._bitmapHeight;
                var particle;
                for (var i = 0; i < this.numParticles; i++) {
                    particle = this.particles[i];
                    this.transformForRender.identityMatrix(this._worldTransform);
                    this.transformForRender.appendTransform(particle.x, particle.y, particle.scale, particle.scale, particle.rotation, 0, 0, textureW / 2, textureH / 2);
                    renderContext.setTransform(this.transformForRender);
                    renderContext.setAlpha(particle.alpha, egret.BlendMode.NORMAL);
                    renderFilter.drawImage(renderContext, this, bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureW, textureH);
                }
            }
        };
        return ParticleSystem;
    })(egret.DisplayObject);
    _particle.ParticleSystem = ParticleSystem;
    ParticleSystem.prototype.__class__ = "particle.ParticleSystem";
})(particle || (particle = {}));
