/**
 * 场景类
 */
class Scene extends egret.gui.Panel{
    //所有UI对象
    public ui: Object;
    
	public constructor(skinName: string){
        super();
        this.skinName = skinName;
        this.ui = new Object();
	}
	
    public partAdded(partName:string, instance:any):void {
        super.partAdded(partName, instance);
        this.ui[partName] = instance;
    }
    
    public childrenCreated():void {
        this.init();
    }
    
    public init(): void{}
}
