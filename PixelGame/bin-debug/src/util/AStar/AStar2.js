/**
 *
 * @author
 *
 */
var AStar2 = (function () {
    function AStar2() {
        /** 是否结束寻路 */
        this.isEnd = false;
        /**启发函数方法*/
        //private _heuristic:Function = manhattan;
        //private _heuristic:Function = euclidian;
        this._heuristic = this.diagonal;
        /**直线代价权值*/
        this._straightCost = 1.0;
        /**对角线代价权值*/
        this._diagCost = Math.SQRT2;
    }
    var __egretProto__ = AStar2.prototype;
    /**在网格中是否找到路径*/
    __egretProto__.findPath = function (grid) {
        this._grid = grid;
        this._open = [];
        this._closed = [];
        this._startNode = this._grid.startNode;
        this._endNode = this._grid.endNode;
        this._startNode.g = 0;
        this._startNode.h = this._heuristic(this._startNode);
        this._startNode.f = this._startNode.g + this._startNode.h;
        ////将开始节点加入开放列表
        this._open[0] = this._startNode;
        //this._open[0].inOpenList = true;
        return this.search();
    };
    /**寻路*/
    __egretProto__.search = function () {
        ////九宫格中心节点
        var node;
        while (!this.isEnd) {
            // 当前节点在开放列表中的索引位置
            var currentNum;
            ////在开放列表中查找具有最小 F 值的节点，并把查找到的节点作为下一个要九宫格中心节点
            var ilen = this._open.length;
            node = this._open[0];
            currentNum = 0;
            for (i = 0; i < ilen; i++) {
                if (this._open[i].f < node.f) {
                    node = this._open[i];
                    currentNum = i;
                }
            }
            ////把当前节点从开放列表删除, 加入到封闭列表
            //node.inOpenList = false;
            //如果开放列表中最后一个节点是最小 F 节点 相当于直接openList.pop()  否则相当于交换位置来保存未比较的节点
            this._open[currentNum] = this._open[this._open.length - 1];
            this._open.pop();
            this._closed.push(node);
            ////九宫格循环 确保了检查的节点永远在网格里面
            var startX = 0 > node.x - 1 ? 0 : node.x - 1;
            var endX = this._grid.numCols - 1 < node.x + 1 ? this._grid.numCols - 1 : node.x + 1;
            var startY = 0 > node.y - 1 ? 0 : node.y - 1;
            var endY = this._grid.numRows - 1 < node.y + 1 ? this._grid.numRows - 1 : node.y + 1;
            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j <= endY; j++) {
                    ////当前要被探查的节点
                    var test = this._grid.getNode(i, j);
                    ////若当前节点等于起始节点 或 不可通过 或 当前节点位于斜方向时其相邻的拐角节点不可通过
                    if (test == node || !test.walkable || !this._grid.getNode(node.x, test.y).walkable || !this._grid.getNode(test.x, node.y).walkable) {
                        continue;
                    }
                    ////代价计算 横竖为1 斜方向为 Math.SQRT2
                    var cost = this._straightCost;
                    if (!((node.x == test.x) || (node.y == test.y))) {
                        //cost = this._diagCost;
                        cost = 1.4;
                    }
                    var g = node.g + cost * test.costMultiplier;
                    var h = this._heuristic(test);
                    var f = g + h;
                    ////在开启列表或关闭列表中找到 表示已经被探测过的节点
                    if (this._open.indexOf(test) != -1 || this._closed.indexOf(test) != -1) {
                        ////如果该相邻节点在开放列表中, 则判断若经由当前节点到达该相邻节点的G值是否小于原来保存的G值,若小于,则将该相邻节点的父节点设为当前节点,并重新设置该相邻节点的G和F值
                        if (f < test.f) {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                        }
                    }
                    else {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        test.parent = node;
                        this._open.push(test);
                    }
                    ////循环结束条件：当结束节点被加入到开放列表作为待检验节点时，表示路径被找到，此时应终止循环
                    if (test == this._endNode) {
                        //console.log(test);
                        this.isEnd = true;
                    }
                }
            }
            ////未找到路径
            if (this._open.length == 0) {
                console.log("no path found");
                this.isEnd = true;
                return false;
            }
        }
        this.buildPath();
        return true;
    };
    /**弗洛伊德路径平滑处理*/
    __egretProto__.floyd = function () {
        if (this.path == null)
            return;
        this._floydPath = this.path.concat();
        var len = this._floydPath.length;
        if (len > 2) {
            var vector = new NodePoint(0, 0);
            var tempVector = new NodePoint(0, 0);
            //遍历路径数组中全部路径节点，合并在同一直线上的路径节点
            //假设有1,2,3,三点，若2与1的横、纵坐标差值分别与3与2的横、纵坐标差值相等则
            //判断此三点共线，此时可以删除中间点2
            this.floydVector(vector, this._floydPath[len - 1], this._floydPath[len - 2]);
            for (var i = this._floydPath.length - 3; i >= 0; i--) {
                this.floydVector(tempVector, this._floydPath[i + 1], this._floydPath[i]);
                if (vector.x == tempVector.x && vector.y == tempVector.y) {
                    this._floydPath.splice(i + 1, 1);
                }
                else {
                    vector.x = tempVector.x;
                    vector.y = tempVector.y;
                }
            }
        }
        //合并共线节点后进行第二步，消除拐点操作。算法流程如下：
        //如果一个路径由1-10十个节点组成，那么由节点10从1开始检查
        //节点间是否存在障碍物，若它们之间不存在障碍物，则直接合并
        //此两路径节点间所有节点。
        len = this._floydPath.length;
        for (i = len - 1; i >= 0; i--) {
            for (var j = 0; j <= i - 2; j++) {
                if (this._grid.hasBarrier(this._floydPath[i].x, this._floydPath[i].y, this._floydPath[j].x, this._floydPath[j].y) == false) {
                    for (var k = i - 1; k > j; k--) {
                        this._floydPath.splice(k, 1);
                    }
                    i = j;
                    len = this._floydPath.length;
                    break;
                }
            }
        }
    };
    ////判断3点是否在一直线上
    __egretProto__.floydVector = function (target, n1, n2) {
        target.x = n1.x - n2.x;
        target.y = n1.y - n2.y;
    };
    __egretProto__.buildPath = function () {
        this._path = new Array();
        var node = this._endNode;
        this._path.push(node);
        while (node != this._startNode) {
            node = node.parent;
            this._path.unshift(node);
        }
    };
    Object.defineProperty(__egretProto__, "path", {
        get: function () {
            return this._path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "floydPath", {
        get: function () {
            return this._floydPath;
        },
        enumerable: true,
        configurable: true
    });
    __egretProto__.manhattan = function (node) {
        return Math.abs(node.x - this._endNode.x) * this._straightCost + Math.abs(node.y + this._endNode.y) * this._straightCost;
    };
    __egretProto__.euclidian = function (node) {
        var dx = node.x - this._endNode.x;
        var dy = node.y - this._endNode.y;
        return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
    };
    __egretProto__.diagonal = function (node) {
        var dx = node.x - this._endNode.x < 0 ? this._endNode.x - node.x : node.x - this._endNode.x;
        var dy = node.y - this._endNode.y < 0 ? this._endNode.y - node.y : node.y - this._endNode.y;
        var diag = dx < dy ? dx : dy;
        var straight = dx + dy;
        //return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
        return 1.4 * diag + this._straightCost * (straight - 2 * diag);
    };
    Object.defineProperty(__egretProto__, "visited", {
        get: function () {
            //return this._closed.concat(this._open);
            return this._open;
        },
        enumerable: true,
        configurable: true
    });
    return AStar2;
})();
AStar2.prototype.__class__ = "AStar2";
//# sourceMappingURL=AStar2.js.map