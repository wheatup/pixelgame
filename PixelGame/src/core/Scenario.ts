/**
 *
 * @author wheatup
 * 游戏场景
 * 
 */
class Scenario extends Scene{
    public cameraPosition: Point;
    public terrain: Terrain;
    public player: Player;
    public floatGroup: egret.gui.Group;
    public floaters: Array<any>;
    
    public constructor(skinName: string){
        super(skinName);
        this.cameraPosition = new Point(0,0);
        this.floaters = new Array<any>();
    }
    
    public createPlayer(x: number, y:number, grp:egret.gui.Group):void{
        this.player = new Player(this);
        grp.addElement(this.player);
        this.player.setPosition(x, y);
    }
    
    //绘制A星Grid(Debug用)
    public drawGrid(): void {
        var _gridArr = new Array();
        for(var i: number = 0;i < this.terrain.grid.numCols;i++) {
            _gridArr[i] = [];
            for(var j: number = 0;j < this.terrain.grid.numRows;j++) {
                var node: NodePoint = this.terrain.grid.getNode(i,j);
                if(!node.walkable) continue;
                
                var rect: egret.Shape = new egret.Shape();
                rect.graphics.lineStyle(0.1);
                rect.graphics.beginFill(this.getColor(node));
                rect.graphics.drawRect(0,0,this.terrain.cellSize,this.terrain.cellSize);
                rect.graphics.endFill();
                rect.x = i * this.terrain.cellSize;
                rect.y = j * this.terrain.cellSize;
                Main.layers[Main.LAYER_GUI].addChild(rect);
            }
        }
    }
    
    //获取grid颜色
    private getColor(node: NodePoint): number {
        if(!node.walkable) return 0x000000;
        if(node == this.terrain.grid.startNode) return 0x999900;
        if(node == this.terrain.grid.endNode) return 0x0000ff;
        return 0xcccccc;
    }
}
