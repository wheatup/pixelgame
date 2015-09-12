class Scene extends egret.gui.Panel{
    public ui: Object;
    public removed: boolean = false;
    public added: boolean = false;
    public currentTime: number = 0;
    
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
    
    public delay(value: number): void{
        this.currentTime += value;
    }
    
    public addEvent(func: Function, thisObject: any, data?:any):void{
        Timer.addTimer(this.currentTime, 1, func, thisObject, data);
    }
}
