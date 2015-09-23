/**
 *
 * @author 
 *
 */
class Mob extends egret.gui.UIAsset{
    public static DIR_UP_LEFT:number = 0;
    public static DIR_UP_RIGHT:number = 1;
    public static DIR_DOWN_RIGHT:number = 2;
    public static DIR_DOWN_LEFT:number = 3;
    
    public static ANIM_STAND_FRONT: number = 0;
    public static ANIM_STAND_BACK: number = 1;
    public static ANIM_WALK_FRONT: number = 2;
    public static ANIM_WALK_BACK: number = 3;
    
    public static ACTION_STAND: number = 0;
    public static ACTION_WALK: number = 1;
    
    public animSpeed: number = 10;
    public pivotX: number;
    public pivotY: number;
    public moveSpeed: number = 7;
    
    public cover: egret.gui.UIAsset;
    public brightness: number = 1;
    public point: egret.Point;
    
    private _path: NodePoint[];
    private _index: number;
    private scenario: Scenario;
    private lastDir: number = 0;
    
    public size: number = 1;
    public dir: number;
    public action: number;
        
    public constructor(asset: string,width: number,height: number,scenario: Scenario,size: number = 1) {
        super(asset);
        this.size = size;
        this.width = width * this.size;
        this.height = height * this.size;
        this.anchorX = 0.5;
        this.anchorY = 0.9;
        this.scenario = scenario;
        Main.main.addEventListener(egret.Event.ENTER_FRAME,this.update,this);
        
        this.cover = new egret.gui.UIAsset();
        this.cover.width = width * this.size;
        this.cover.height = height * this.size;
        this.cover.anchorX = 0.5;
        this.cover.anchorY = 0.9;
        this.cover.source = asset + "a";
        this.point = new egret.Point();
        
        this.setBrightness(this.brightness);
    }
    
    public hide():void{
        this.visible = false;
        this.cover.visible = false;
    }
    
    public show():void{
        this.visible = true;
        this.cover.visible = true;
    }
    	
    public setPosition(x: number, y:number):void{
        this.point.x = x;
        this.point.y = y;
        this.pivotX = x;
        this.pivotY = y;
        this.x = x;
        this.y = y;
        
        this.cover.x = x;
        this.cover.y = y;
    }
    
    public setBrightness(brightness: number): void{
        this.brightness = brightness;
        this.cover.alpha = 1 - brightness;
    }
    	
    public getX():number{
        return this.pivotX;
    }
    	
    public getY():number{
        return this.pivotY;
    }
        
    public run(direction: number):void{
        this.action = Mob.ACTION_WALK;
        this.dir = direction;
        this.lastDir = direction;
        this.onActionChange();
    }
        
    public still(direction: number):void{
        this.action = Mob.ACTION_STAND;
        this.dir = direction;
        this.lastDir = direction;
        this.onActionChange();
    }
    
    public onActionChange():void{
        
    }
    
    /**
    * Handles the click event on the GridView. Finds the clicked on cell and toggles its walkable state.
    */
    public onGridClick(x:number, y:number,group:egret.gui.Group): void {
        Landmark.addLandMark(group,x,y);
        var xpos: number = Math.floor((x) / Settings.CELL_SIZE);
        var ypos: number = Math.floor((y) / Settings.CELL_SIZE);
        var endNp: NodePoint = this.scenario.terrain.grid.getNode(xpos,ypos);
        
        
        var xpos2: number = Math.floor(this.getX() / Settings.CELL_SIZE);
        var ypos2: number = Math.floor(this.getY() / Settings.CELL_SIZE);
        var startNp: NodePoint = this.scenario.terrain.grid.getNode(xpos2,ypos2);
        
        if(endNp.walkable == false) { 
            var replacer:NodePoint = this.scenario.terrain.grid.findReplacer(startNp, endNp);
            if( replacer ){
                xpos = replacer.x;
                ypos = replacer.y;
            }
        }
        
        this.scenario.terrain.grid.setStartNode(xpos2,ypos2);
        
        this.scenario.terrain.grid.setEndNode(xpos,ypos);
//        Debug.log("start:[" + xpos2 + "," + ypos2 + "]");
//        Debug.log("end:[" + xpos + "," + ypos + "]");
        
        this.findPath();
        
        //画红线
        //        this._lineShape.graphics.clear();
        //        this._lineShape.graphics.lineStyle(1,0xFF0000);
        //        this._lineShape.graphics.moveTo(xpos2 * Settings.CELL_SIZE + 10,ypos2 * Settings.CELL_SIZE + 10);
        //        this._lineShape.graphics.lineTo(xpos * Settings.CELL_SIZE + 10,ypos * Settings.CELL_SIZE + 10);
        //        this._lineShape.graphics.endFill();
    }
    
    private findPath(): void {
        var oldTime: number = egret.getTimer();
        var astar: AStar2 = new AStar2();
        if(astar.findPath(this.scenario.terrain.grid)) {
            astar.floyd();
            astar.floydPath.shift();
            this._path = astar.floydPath;
            this._index = 0;
            
//            if(this._path[this._index]) {
//                var targetX: number = (this._path[this._index].x - this.scenario.offsetX) * Settings.CELL_SIZE + Settings.CELL_SIZE / 2;
//                var targetY: number = (this._path[this._index].y- this.scenario.offsetY) * Settings.CELL_SIZE + Settings.CELL_SIZE / 2;
//            }
            this.calcAnimation();
        }
    }
        
    
    public update():void {
        this.calcMovement();
    }
    
    public calcMovement():void{
        if(this._path && this._path[this._index] && this._path.length != 0) {
            var targetX: number = (this._path[this._index].x) * Settings.CELL_SIZE + Settings.CELL_SIZE / 2;
            var targetY: number = (this._path[this._index].y) * Settings.CELL_SIZE + Settings.CELL_SIZE / 2;
            var dx: number = targetX - this.getX();
            var dy: number = targetY - this.getY();
            var dist: number = Math.sqrt(dx * dx + dy * dy);
            if(dist < 1) {
                this._index++;
                this.calcAnimation();
            } else {
                var x:number = this.getX() + (dx / dist) * this.moveSpeed;
                var y:number = this.getY() + (dy / dist) * this.moveSpeed;
                var dist2 = Math.sqrt(((dx / dist) * this.moveSpeed) * ((dx / dist) * this.moveSpeed) + ((dy / dist) * this.moveSpeed) * ((dy / dist) * this.moveSpeed));
                if(dist2 < dist) {
                    this.setPosition(x, y);
                }else{
                    this.setPosition(targetX, targetY);
                }
                
                var len: number = this.scenario.floaters.length;
                if(len > 0){
                    for(var i: number = 0;i < len; i++){
                        var floater: any = this.scenario.floaters[i];
                        
                        if(this.pivotY > floater.y){
                            if(this.scenario.floatGroup.getElementIndex(this) < this.scenario.floatGroup.getElementIndex(floater)){
                                this.scenario.floatGroup.swapElements(this, floater);
                            }
                        }else{
                            if(this.scenario.floatGroup.getElementIndex(this) > this.scenario.floatGroup.getElementIndex(floater)){
                                this.scenario.floatGroup.swapElements(this, floater);
                            }
                        }
                    }
                }
            }
        }
    }
    
    public calcAnimation():void{
        if(this._path && this._path[this._index]) {
            var targetX: number = this._path[this._index].x * Settings.CELL_SIZE + Settings.CELL_SIZE / 2;
            var targetY: number = this._path[this._index].y * Settings.CELL_SIZE + Settings.CELL_SIZE / 2;
            if(this.getX() < targetX) {
                if(this.getY() <= targetY) {
                    this.run(Mob.DIR_DOWN_RIGHT);
                } else {
                    this.run(Mob.DIR_UP_RIGHT);
                }
            } else {
                if(this.getY() <= targetY) {
                    this.run(Mob.DIR_DOWN_LEFT);
                } else {
                    this.run(Mob.DIR_UP_LEFT);
                }
            }
        }else{
            this.still(this.lastDir);
            WheatupEvent.call(EventType.ARRIVE, { x: this.getX(), y: this.getY() });
        }
    }
    
    public isInside(container: any): boolean{
        return this.pivotX >= container.x && this.pivotX <= container.x + container.width
            && this.pivotY >= container.y && this.pivotY <= container.y + container.height;
    }
}
