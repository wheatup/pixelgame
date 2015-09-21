/**
 *
 * @author 
 *
 */
class Landmark extends egret.gui.UIAsset{
    private static lastContainer: egret.gui.Group;
    private static lastMark: Landmark;
    
	public constructor(x: number, y:number) {
        super();
        this.source = "landmark";
        this.width = 80;
        this.height = 36;
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.x = x;
        this.y = y;
        this.visible = false;
	}
	
	public static init(): void{
        WheatupEvent.bind(EventType.ARRIVE,Landmark.onArrive,Landmark);
	}
	
	public static onArrive(data:any): void{
	    if(Landmark.lastMark != null){
            Landmark.lastMark.destroy(Landmark.lastContainer);
            Landmark.lastMark = null;
            Landmark.lastContainer = null;
	    }
	}
	
	public static addLandMark(group: egret.gui.Group, x: number, y:number): void{
    	  if(Landmark.lastContainer != null){
            Landmark.lastMark.destroy(group);
    	  }
        var mark: Landmark = new Landmark(x, y);
        Landmark.lastContainer = group;
        Landmark.lastMark = mark;
        group.addElement(mark);
        mark.playAnimation();
	}
	
	private playAnimation():void{
        this.scaleX = 2;
        this.scaleY = 2;
        this.alpha = 0;
        this.visible = true;
        egret.Tween.get(this).to({scaleX:1, scaleY:1, alpha:0.5}, 250, egret.Ease.quadOut);
	}
	
	private destroy(group: egret.gui.Group):void{
        egret.Tween.get(this).to({scaleX:1.2, scaleY:1.2, alpha:0}, 250, egret.Ease.quadOut);
        Timer.addTimer(250,1,() => { group.removeElement(this);}, this);
	}
}
