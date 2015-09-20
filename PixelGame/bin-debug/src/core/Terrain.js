/**
 *
 * @author wheatup
 * 游戏地图类
 *
 */
var Terrain = (function () {
    function Terrain(scenario, polygons, width, height, holes, offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        this.scenario = scenario;
        this.cellSize = Settings.CELL_SIZE;
        this.grid = new Grid(width / Settings.CELL_SIZE, height / Settings.CELL_SIZE, Settings.CELL_SIZE);
        this.buildGrid(polygons, holes, offsetX, offsetY);
    }
    var __egretProto__ = Terrain.prototype;
    //通过多边形数据建立Grid
    __egretProto__.buildGrid = function (polygons, holes, offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var p = new Polygon(polygons, offsetX, offsetY);
        this.polygon = p;
        this.holes = new Array();
        if (holes) {
            for (var i = 0; i < holes.length; i++) {
                var h = new Polygon(holes[i]);
                this.holes[i] = h;
            }
        }
        for (var y = 0; y < this.grid.numRows; y++) {
            for (var x = 0; x < this.grid.numCols; x++) {
                if (this.isInHoles(x * this.cellSize + 0.5 * this.cellSize, y * this.cellSize + 0.5 * this.cellSize)) {
                    this.grid.setWalkable(x, y, false);
                }
                else {
                    this.grid.setWalkable(x, y, p.isInside(x * this.cellSize + 0.5 * this.cellSize, y * this.cellSize + 0.5 * this.cellSize));
                }
            }
        }
    };
    __egretProto__.isInPolygon = function (x, y) {
        return this.polygon.isInside(x, y);
    };
    __egretProto__.isInHoles = function (x, y) {
        var flag = false;
        for (var i = 0; i < this.holes.length; i++) {
            if (this.holes[i].isInside(x, y)) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    return Terrain;
})();
Terrain.prototype.__class__ = "Terrain";
//# sourceMappingURL=Terrain.js.map