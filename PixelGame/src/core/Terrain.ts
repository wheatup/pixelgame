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
    public constructor(scenario: Scenario, cellSize:number = 20, grid?:Grid) {
        this.scenario = scenario;
        this.cellSize = cellSize;
        if(grid == null) {
            this.grid = new Grid(800/cellSize,480/cellSize,cellSize);
        }else{
            this.grid = grid;
        }
    }
}
