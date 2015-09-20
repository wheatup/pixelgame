/**
 * 简单多边形类
 * @author wheatup
 *
 */
class Polygon {
    public points: Point[];
    
//	public constructor(points: Point[]) {
//        this.points = points;
//	}
    
    //传入类似于"0,0 0,28 46,135 238,169 785,153 791,-7 664,-61 338,-75 199,-56"这样的参数
    public constructor(points: string, offsetX: number = 0, offsetY:number = 0){
        this.points = new Array<Point>();
        var pointsRaw: string[] = points.split(" ");
        for(var i: number = 0;i < pointsRaw.length; i++){
            var pointRaw: string[] = pointsRaw[i].split(",");
            var x: number = parseInt(pointRaw[0]) + offsetX;
            var y: number = parseInt(pointRaw[1]) + offsetY;
            this.points[i] = new Point(x, y);
        }
	}
	
	//判断顶点是否在多边形内
	public isInside(x:number, y:number): boolean{
        var isIn: boolean = false;
        var i: number = 0;
        for(var j: number = this.points.length - 1;i < this.points.length; j = i++){
            if (((this.points[i].y>y) != (this.points[j].y>y)) &&
                (x < (this.points[j].x-this.points[i].x) * (y-this.points[i].y) / (this.points[j].y-this.points[i].y) + this.points[i].x))
                isIn = !isIn;
        }
        return isIn;
	}
}

class Point{
    public x: number;
    public y: number;
    
    public constructor(x: number, y:number){
        this.x = x;
        this.y = y;
    }
}