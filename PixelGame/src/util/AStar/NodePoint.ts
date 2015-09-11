/**
 *
 * 节点类
 * @author 
 *
 */
class NodePoint {
    public x:number;
    public y:number;
    public f:number;
    public g:number;
    public h:number;
    public walkable:boolean = true;
    public alphable:boolean = false;
    public parent:NodePoint;
    public costMultiplier:number = 1.0;
    /** 埋葬深度 */
    public buriedDepth:number = -1;
    /** 距离 */
    public distance:number;
    
    public constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
    
    /** 得到此节点到另一节点的网格距离 */
    public getDistanceTo( targetNode:NodePoint ):number{
        var disX:number = targetNode.x - this.x;
        var disY:number = targetNode.y - this.y;
        this.distance = Math.sqrt( disX * disX + disY * disY );
        return this.distance;
    }
}
