/**
 *
 * @author wheatup
 * 游戏地图类
 *
 */
var Terrain = (function () {
    function Terrain(scenario, polygons, cellSize) {
        if (cellSize === void 0) { cellSize = 20; }
        this.scenario = scenario;
        this.cellSize = cellSize;
        this.grid = new Grid(800 / cellSize, 480 / cellSize, cellSize);
        this.buildGrid(polygons);
    }
    var __egretProto__ = Terrain.prototype;
    __egretProto__.buildGrid = function (polygons) {
        var p = new Polygon(polygons);
        for (var y = 0; y < this.grid.numRows; y++) {
            for (var x = 0; x < this.grid.numCols; x++) {
                this.grid.setWalkable(x, y, p.isInside(x * this.cellSize + 0.5 * this.cellSize, y * this.cellSize + 0.5 * this.cellSize));
            }
        }
    };
    return Terrain;
})();
Terrain.prototype.__class__ = "Terrain";
//# sourceMappingURL=Terrain.js.map