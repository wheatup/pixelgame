/**
 *
 * @author wheatup
 * 游戏地图类
 *
 */
class Terrain {
    public grid: Grid;
    public scenario: Scenario;
    public cellSize: number;
    private polygon: Polygon;
    private holes: Polygon[];
    
    public constructor(scenario: Scenario, polygons: string, width:number, height:number, holes?:string[]) {
        this.scenario = scenario;
        this.cellSize = Settings.CELL_SIZE;
        this.grid = new Grid(width/Settings.CELL_SIZE,height/Settings.CELL_SIZE,Settings.CELL_SIZE);
        this.buildGrid(polygons,holes);
    }
    
    //通过多边形数据建立Grid
    public buildGrid(polygons: string, holes?:string[]): void{
        var p: Polygon = new Polygon(polygons);
        this.polygon = p;
        
        this.holes = new Array<Polygon>();
        
        if(holes){
            for(var i: number = 0;i < holes.length; i++){
                var h: Polygon = new Polygon(holes[i]);
                this.holes[i] = h;
            }
        }

        for(var y: number = 0; y < this.grid.numRows; y++){
            for(var x: number = 0; x < this.grid.numCols; x++){
                if(this.isInHoles(x * this.cellSize + 0.5 * this.cellSize, y * this.cellSize + 0.5 * this.cellSize)) {
                    this.grid.setWalkable(x, y, false);
                } else {
                    this.grid.setWalkable(x, y, p.isInside(x * this.cellSize + 0.5 * this.cellSize, y * this.cellSize + 0.5 * this.cellSize));
                }
            }
        }
    }
    
    public isInPolygon(x: number, y: number):boolean{
        return this.polygon.isInside(x, y);
    }
    
    public isInHoles(x: number, y:number):boolean{
        var flag: boolean = false;
        for(var i: number = 0;i < this.holes.length; i++){
            if(this.holes[i].isInside(x, y)){
                flag = true;
                break;
            }
        }
        return flag;
    }
}
