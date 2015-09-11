/**
 *
 * @author wheatup
 * 声音控制
 *
 */
var Sound = (function () {
    function Sound() {
    }
    var __egretProto__ = Sound.prototype;
    Sound.init = function () {
        Sound.soundSet = new Object();
    };
    //播放BGM
    Sound.playBGM = function (sound, loop, volume) {
        if (loop === void 0) { loop = true; }
        if (volume === void 0) { volume = 0; }
        var thisSound;
        if (Sound.soundSet[sound]) {
            thisSound = Sound.soundSet[sound];
        }
        else {
            thisSound = RES.getRes(sound);
            Sound.soundSet[sound] = thisSound;
        }
        if (Sound.currentBGM) {
            Sound.currentBGM.stop();
        }
        Sound.currentBGM = thisSound;
        Sound.currentBGM.volume = (Sound.muted ? 0 : (volume == 0 ? Sound.BGMVolume : volume));
        Sound.currentBGM.play(loop);
        Sound.lastBGMVolume = (volume == 0 ? Sound.BGMVolume : volume);
    };
    //设置BGM音量
    Sound.setBGMVolume = function (volume) {
        Sound.BGMVolume = volume;
        if (Sound.currentBGM) {
            Sound.currentBGM.volume = volume;
            Sound.lastBGMVolume = volume;
        }
    };
    //播放音效
    Sound.playSFX = function (sound, loop, volume) {
        if (loop === void 0) { loop = false; }
        if (volume === void 0) { volume = 0; }
        var thisSound;
        if (Sound.soundSet[sound]) {
            thisSound = Sound.soundSet[sound];
        }
        else {
            thisSound = RES.getRes(sound);
            Sound.soundSet[sound] = thisSound;
        }
        Sound.currentSFX = thisSound;
        Sound.currentSFX.stop();
        Sound.currentSFX.volume = (Sound.muted ? 0 : (volume == 0 ? Sound.SFXVolume : volume));
        Sound.currentSFX.play(loop);
        Sound.lastBGMVolume = (volume == 0 ? Sound.SFXVolume : volume);
    };
    //设置单独音效音量
    Sound.setSFXVolume = function (sound, volume) {
        if (Sound.soundSet[sound]) {
            Sound.soundSet[sound].volume = volume;
            Sound.lastSFXVolume = volume;
        }
    };
    //设置全局音效音量
    Sound.setGlobalSFXVolume = function (volume) {
        Sound.SFXVolume = volume;
        if (Sound.currentSFX) {
            Sound.currentSFX.volume = (Sound.muted ? 0 : volume);
        }
    };
    //静音
    Sound.mute = function () {
        if (Sound.currentSFX) {
            Sound.currentSFX.volume = 0;
        }
        if (Sound.currentBGM) {
            Sound.currentBGM.volume = 0;
        }
        Sound.muted = true;
    };
    //取消静音
    Sound.unmute = function () {
        if (Sound.currentSFX) {
            Sound.currentSFX.volume = Sound.lastSFXVolume;
        }
        if (Sound.currentBGM) {
            Sound.currentBGM.volume = Sound.lastBGMVolume;
        }
        Sound.muted = false;
    };
    //暂停某声音
    Sound.pause = function (sound) {
        if (Sound.soundSet[sound]) {
            Sound.soundSet[sound].pause();
        }
    };
    //停止某声音
    Sound.stop = function (sound) {
        if (Sound.soundSet[sound]) {
            Sound.soundSet[sound].stop();
        }
    };
    //恢复某声音
    Sound.resume = function (sound) {
        if (Sound.soundSet[sound]) {
            Sound.soundSet[sound].resume();
        }
    };
    Sound.muted = false;
    Sound.BGMVolume = 0.5;
    Sound.SFXVolume = 1;
    Sound.lastBGMVolume = 0;
    Sound.lastSFXVolume = 0;
    return Sound;
})();
Sound.prototype.__class__ = "Sound";
//# sourceMappingURL=Sound.js.map