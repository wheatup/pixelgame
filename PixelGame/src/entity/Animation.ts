/**
 *
 * @author wheatup
 * 动画类
 *
 */
class Animation {
    public name: string;
    private imgs: string[];
    private loop: boolean;
    private host: egret.gui.UIAsset;
    private frame: number;
    private length: number;
    private startTick: number;
    private defaultPic: string;
    private done: boolean = false;
    private isStill: boolean = false;
    
    public currentIndex: number = 0;
    public constructor(name:string, imgCount: number, host: egret.gui.UIAsset, frame: number, loop: boolean = true, defaultPic: string = "") {
        this.name = name;
        this.imgs = [];
        for(var i = 0;i < imgCount; i++){
            this.imgs[i] = name + "_" + i;
        }
        this.isStill = (imgCount == 1 || this.frame <= 1);
        this.loop = loop;
        this.host = host;
        this.frame = frame;
        this.defaultPic = defaultPic;
        this.length = imgCount;
	}
	
	public play():void{
        this.startTick = Main.tick;
        this.done = false;
        this.host.source = this.imgs[this.currentIndex];
	}
	
	public update():void{
    	  if(this.isStill){
            return;
    	  }else if((Main.tick - this.startTick) % this.frame == 0){
            this.host.source = this.getNextFrame();
	    }
	}
	
	private getNextFrame(): string{
        if(this.done) {
            return this.defaultPic;
        }

        if(this.currentIndex == this.length - 1 && !this.loop) {
            this.done = true;
            WheatupEvent.call(EventType.ANIMATION_DONE, this.name);
        }

        var pic: string = this.imgs[this.currentIndex = (this.currentIndex + 1) % this.length];
        return pic;
	}
}
