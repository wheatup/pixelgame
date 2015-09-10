/**
 * 简单多边形类
 * @author wheatup
 *
 */
var Polygon = (function () {
    //	public constructor(points: Point[]) {
    //        this.points = points;
    //	}
    //传入类似于"0,0 0,28 46,135 238,169 785,153 791,-7 664,-61 338,-75 199,-56"这样的参数
    function Polygon(points) {
        this.points = new Array();
        Debug.log(points);
        var pointsRaw = points.split(" ");
        Debug.log(pointsRaw);
        for (var i = 0; i < pointsRaw.length; i++) {
            var pointRaw = pointsRaw[i].split(",");
            var x = parseInt(pointRaw[0]);
            var y = parseInt(pointRaw[1]);
            this.points[i] = new Point(x, y);
        }
    }
    var __egretProto__ = Polygon.prototype;
    //判断顶点是否在多边形内
    __egretProto__.isInside = function (x, y) {
        var isIn = false;
        var i = 0;
        for (var j = this.points.length - 1; i < this.points.length; j = i++) {
            if (((this.points[i].y > y) != (this.points[j].y > y)) && (x < (this.points[j].x - this.points[i].x) * (y - this.points[i].y) / (this.points[j].y - this.points[i].y) + this.points[i].x))
                isIn = !isIn;
        }
        return isIn;
    };
    return Polygon;
})();
Polygon.prototype.__class__ = "Polygon";
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    var __egretProto__ = Point.prototype;
    return Point;
})();
Point.prototype.__class__ = "Point";
//# sourceMappingURL=Polygon.js.map