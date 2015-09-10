class Scene extends egret.gui.Panel{
    public ui: Object;
    public removed: boolean = false;
    public added: boolean = false;
    
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
    
    public onRemove():void{}
    public onDestroy():void{}
    public start(): void{}
    public update(): void{}
    public init(): void{}
}
