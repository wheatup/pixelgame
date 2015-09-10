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
    
    public constructor(scenario: Scenario, polygons: string, cellSize:number = 20) {
        this.scenario = scenario;
        this.cellSize = cellSize;
        this.grid = new Grid(800/cellSize,480/cellSize,cellSize);
        this.buildGrid(polygons);
    }
    
    public buildGrid(polygons: string): void{
        var p: Polygon = new Polygon(polygons);
        
        for(var y: number = 0; y < this.grid.numRows; y++){
            for(var x: number = 0; x < this.grid.numCols; x++){
                this.grid.setWalkable(x, y, p.isInside(x * this.cellSize + 0.5 * this.cellSize, y * this.cellSize + 0.5 * this.cellSize));
            }
        }
    }
}
