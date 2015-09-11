/**
 *
 * @author wheatup
 * 声音控制
 *
 */
class Sound {
    public static muted: boolean = false;
    
    public static BGMVolume: number = 0.5;
    public static SFXVolume: number = 1;
    
    private static currentBGM: egret.Sound;
    private static currentSFX: egret.Sound;
    private static lastBGMVolume: number = 0;
    private static lastSFXVolume: number = 0;
    private static soundSet: Object;
        
    public static init(): void{
        Sound.soundSet = new Object();
    }

    //播放BGM
    public static playBGM(sound: string, loop:boolean = true, volume:number = 0): void{
        var thisSound: egret.Sound;
        if(Sound.soundSet[sound]){
            thisSound = Sound.soundSet[sound];
        }else{
            thisSound = RES.getRes(sound);
            Sound.soundSet[sound] = thisSound;
        }
        
        if(Sound.currentBGM) {
            Sound.currentBGM.stop();
        }
        
        Sound.currentBGM = thisSound;
        Sound.currentBGM.volume = (Sound.muted ? 0 : (volume == 0 ? Sound.BGMVolume : volume));
        Sound.currentBGM.play(loop);
        Sound.lastBGMVolume = (volume == 0 ? Sound.BGMVolume : volume);
    }
    
    //设置BGM音量
    public static setBGMVolume(volume: number): void{
        Sound.BGMVolume = volume;
        if(Sound.currentBGM) {
            Sound.currentBGM.volume = volume;
            Sound.lastBGMVolume = volume;
        }
    }
    
    //播放音效
    public static playSFX(sound: string, loop:boolean = false, volume:number = 0): void{
        var thisSound: egret.Sound;
        if(Sound.soundSet[sound]){
            thisSound = Sound.soundSet[sound];
        }else{
            thisSound = RES.getRes(sound);
            Sound.soundSet[sound] = thisSound;
        }
        Sound.currentSFX = thisSound;
        Sound.currentSFX.stop();
        Sound.currentSFX.volume = (Sound.muted ? 0 : (volume == 0 ? Sound.SFXVolume : volume));
        Sound.currentSFX.play(loop);
        Sound.lastBGMVolume = (volume == 0 ? Sound.SFXVolume : volume);
    }
    
    //设置单独音效音量
    public static setSFXVolume(sound: string, volume: number): void{
        if(Sound.soundSet[sound]){
            Sound.soundSet[sound].volume = volume;
            Sound.lastSFXVolume = volume;
        }
    }
    
    //设置全局音效音量
    public static setGlobalSFXVolume(volume: number): void{
        Sound.SFXVolume = volume;
        if(Sound.currentSFX){
            Sound.currentSFX.volume = (Sound.muted ? 0 : volume);
        }
    }
    
    //静音
    public static mute(): void{
        if(Sound.currentSFX){
            Sound.currentSFX.volume = 0;
        }
        
        if(Sound.currentBGM){
            Sound.currentBGM.volume = 0;
        }
        
        Sound.muted = true;
    }
    
    //取消静音
    public static unmute():void{
        if(Sound.currentSFX){
            Sound.currentSFX.volume = Sound.lastSFXVolume;
        }
                
        if(Sound.currentBGM){
            Sound.currentBGM.volume= Sound.lastBGMVolume;
        }
        
        Sound.muted = false;
    }
    
    //暂停某声音
    public static pause(sound: string): void{
        if(Sound.soundSet[sound]){
            Sound.soundSet[sound].pause();
        }
    }
    
    //停止某声音
    public static stop(sound: string): void{
        if(Sound.soundSet[sound]){
            Sound.soundSet[sound].stop();
        }
    }
    
    //恢复某声音
    public static resume(sound: string): void{
        if(Sound.soundSet[sound]){
            Sound.soundSet[sound].resume();
        }
    }
}
