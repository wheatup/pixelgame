/**
 *
 * 节点类
 * @author
 *
 */
var NodePoint = (function () {
    function NodePoint(x, y) {
        this.walkable = true;
        this.alphable = false;
        this.costMultiplier = 1.0;
        /** 埋葬深度 */
        this.buriedDepth = -1;
        this.x = x;
        this.y = y;
    }
    var __egretProto__ = NodePoint.prototype;
    /** 得到此节点到另一节点的网格距离 */
    __egretProto__.getDistanceTo = function (targetNode) {
        var disX = targetNode.x - this.x;
        var disY = targetNode.y - this.y;
        this.distance = Math.sqrt(disX * disX + disY * disY);
        return this.distance;
    };
    return NodePoint;
})();
NodePoint.prototype.__class__ = "NodePoint";
//# sourceMappingURL=NodePoint.js.map