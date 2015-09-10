/**
 *
 * @author wheatup
 * 游戏地图类
 *
 */
var Terrain = (function () {
    function Terrain(scenario, cellSize, grid) {
        if (cellSize === void 0) { cellSize = 20; }
        this.scenario = scenario;
        this.cellSize = cellSize;
        if (grid == null) {
            this.grid = new Grid(800 / cellSize, 480 / cellSize, cellSize);
        }
        else {
            this.grid = grid;
        }
    }
    var __egretProto__ = Terrain.prototype;
    return Terrain;
})();
Terrain.prototype.__class__ = "Terrain";
//# sourceMappingURL=Terrain.js.map