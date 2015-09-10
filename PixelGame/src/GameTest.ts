/**
 *
 * @author 
 *
 */
class GameTest extends egret.DisplayObjectContainer {

    private _cellSize: number = 40;
    private _grid: Grid;
    private _player: egret.Sprite;
    private _index: number;
    private _path: NodePoint[];

    private _lineShape: egret.Shape;
    private _gridContent: egret.DisplayObjectContainer;
    public _gridArr: egret.Shape[][];
    public static instance: GameTest;

    public constructor() {
        super();
        GameTest.instance = this;
        this.makeGrid();
        this.makePlayer();
    }
	
    /**
    * Creates the player sprite. Just a circle here.
    */
    private makePlayer(): void {
        this._player = new egret.Sprite();
        //this._player.touchChildren = false;
        this._player.touchEnabled = true;//当为true时 点击事件会穿过该对象到达侦听对象
        this._player.graphics.beginFill(0xff0000);
        this._player.graphics.drawCircle(0,0,5);
        this._player.graphics.endFill();
        this._player.x = 50;
        this._player.y = 60;
        this.addChild(this._player);

        this._lineShape = new egret.Shape();
        this.addChild(this._lineShape);
    }
            
    /**
    * Creates a grid with a bunch of random unwalkable nodes.
    */
    private makeGrid(): void {
        this._gridContent = new egret.DisplayObjectContainer();
        this._gridContent.touchEnabled = true;
        this._gridContent.touchChildren = false;
        this._gridContent.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGridClick,this);
        this.addChild(this._gridContent);
        this._grid = new Grid(10,10,40);
        //随机障碍物
        for(var i: number = 0;i < 20;i++) {
            this._grid.setWalkable(Math.floor(Math.random() * 10),Math.floor(Math.random() * 10),false);
        }
        this.drawGrid();
    }
    
    /**
    * Draws the given grid, coloring each cell according to its state.
    */
    private drawGrid(): void {
        this._gridArr = new Array();
        for(var i: number = 0;i < this._grid.numCols;i++) {
            this._gridArr[i] = [];
            for(var j: number = 0;j < this._grid.numRows;j++) {
                var node: NodePoint = this._grid.getNode(i,j);
                var rect: egret.Shape = new egret.Shape();
                rect.graphics.lineStyle(0.1);
                rect.graphics.beginFill(this.getColor(node));
                rect.graphics.drawRect(0,0,this._cellSize,this._cellSize);
                rect.graphics.endFill();
                rect.x = i * this._cellSize;
                rect.y = j * this._cellSize;
                this._gridContent.addChild(rect);
                this._gridArr[i][j] = rect;
            }
        }
    }
        
    /**
    * Determines the color of a given node based on its state.
    */
    private getColor(node: NodePoint): number {
        if(!node.walkable) return 0x000000;
        if(node == this._grid.startNode) return 0x999900;
        if(node == this._grid.endNode) return 0x0000ff;
        return 0xcccccc;
    }
    
    /**
    * Handles the click event on the GridView. Finds the clicked on cell and toggles its walkable state.
    */
    private onGridClick(event: egret.TouchEvent): void {
        
        var xpos: number = Math.floor(event.stageX / this._cellSize);
        var ypos: number = Math.floor(event.stageY / this._cellSize);
        var endNp: NodePoint = this._grid.getNode(xpos,ypos);
        

        var xpos2: number = Math.floor(this._player.x / this._cellSize);
        var ypos2: number = Math.floor(this._player.y / this._cellSize);
        var startNp: NodePoint = this._grid.getNode(xpos2,ypos2);
        
        if(endNp.walkable == false) { 
            var replacer:NodePoint = this._grid.findReplacer(startNp, endNp);
            if( replacer ){
                xpos = replacer.x;
                ypos = replacer.y;
            }
        }
        
        this._grid.setStartNode(xpos2,ypos2);
        this._grid.setEndNode(xpos,ypos);
        

        this.findPath();
        
        ////画红线
        /*
        this._lineShape.graphics.clear();
        this._lineShape.graphics.lineStyle(1,0xFF0000);
        this._lineShape.graphics.moveTo(xpos2 * this._cellSize + 10,ypos2 * this._cellSize + 10);
        this._lineShape.graphics.lineTo(xpos * this._cellSize + 10,ypos * this._cellSize + 10);
        this._lineShape.graphics.endFill();
        */
    }
    
    /**
    * Creates an instance of AStar and uses it to find a path.
    */
    private findPath(): void {
        var oldTime: number = egret.getTimer();
        
        var astar: AStar2 = new AStar2();
        if(astar.findPath(this._grid)) {
            //得到平滑路径
            astar.floyd();
            //在路径中去掉起点节点，避免玩家对象走回头路
            astar.floydPath.shift();
            this._path = astar.floydPath;
            //this._path = astar.path;
            this._index = 0;
            this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
            
            //console.log("寻路时间：" + String(egret.getTimer() - oldTime) + " 毫秒");
        }
    }
    
    /**
    * 走动
    */
    private onEnterFrame(evt: egret.Event) {
        if(this._path.length == 0) { 
            this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
            return;
        }
        var targetX: number = this._path[this._index].x * this._cellSize + this._cellSize / 2;
        var targetY: number = this._path[this._index].y * this._cellSize + this._cellSize / 2;
        var dx: number = targetX - this._player.x;
        var dy: number = targetY - this._player.y;
        var dist: number = Math.sqrt(dx * dx + dy * dy);
        if(dist < 1) {
            this._index++;
            if(this._index >= this._path.length) {
                this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
            }
        }
        else {
            this._player.x += dx * .5;
            this._player.y += dy * .5;
        }
    }
    
    
    
        
}