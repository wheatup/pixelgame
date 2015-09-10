/**
 *
 *
 * 节点二维数组 节点操作方法
 * @author
 *
 */
var Grid = (function () {
    /**
    * 构造函数
    * @numCols 列
    * @numRows 行
    */
    function Grid(numCols, numRows, cellSize) {
        this._numCols = numCols;
        this._numRows = numRows;
        this._cellSize = cellSize;
        this._nodes = new Array();
        for (var i = 0; i < this._numCols; i++) {
            this._nodes[i] = [];
            for (var j = 0; j < this._numRows; j++) {
                this._nodes[i][j] = new NodePoint(i, j);
            }
        }
    }
    var __egretProto__ = Grid.prototype;
    ////////////////////////////////////////
    // public methods
    ////////////////////////////////////////
    /**
    * 根据坐标获取节点
    * @param x 列
    * @param y 行
    */
    __egretProto__.getNode = function (x, y) {
        return this._nodes[x][y];
    };
    /**
    * 设置结束节点
    * @param x 列
    * @param y 行
    */
    __egretProto__.setEndNode = function (x, y) {
        this._endNode = this._nodes[x][y];
    };
    /**
    * 设置开始节点
    * @param x 列
    * @param y 行
    */
    __egretProto__.setStartNode = function (x, y) {
        this._startNode = this._nodes[x][y];
    };
    /**
    * 设置节点是否可以通行
    * @param x 列
    * @param y 行
    */
    __egretProto__.setWalkable = function (x, y, value) {
        this._nodes[x][y].walkable = value;
    };
    /**
    * 设置节点是否透明
    * @param x 列
    * @param y 行
    */
    __egretProto__.setAlphable = function (x, y, value) {
        this._nodes[x][y].alphable = value;
    };
    Object.defineProperty(__egretProto__, "startNode", {
        ////////////////////////////////////////
        // getters / setters
        ////////////////////////////////////////
        /**
        * 返回开始节点
        */
        get: function () {
            return this._startNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "endNode", {
        /**
        * 返回结束节点
        */
        get: function () {
            return this._endNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "numCols", {
        /**
        * 返回网格总列数
        */
        get: function () {
            return this._numCols;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "numRows", {
        /**
        * 返回网格总行数
        */
        get: function () {
            return this._numRows;
        },
        enumerable: true,
        configurable: true
    });
    /**
    * 判断两节点之间是否存在障碍物
    *
    */
    __egretProto__.hasBarrier = function (startX, startY, endX, endY) {
        //如果起点终点是同一个点那傻子都知道它们间是没有障碍物的
        if (startX == endX && startY == endY)
            return false;
        //两节点中心位置
        var point1 = new egret.Point(startX * this._cellSize + this._cellSize / 2, startY * this._cellSize + this._cellSize / 2);
        var point2 = new egret.Point(endX * this._cellSize + this._cellSize / 2, endY * this._cellSize + this._cellSize / 2);
        //根据起点终点间横纵向距离的大小来判断遍历方向
        var distX = Math.abs(endX - startX);
        var distY = Math.abs(endY - startY);
        /**遍历方向，为true则为横向遍历，否则为纵向遍历*/
        var loopDirection = distX > distY ? true : false;
        /**起始点与终点的连线方程*/
        var lineFuction;
        /** 循环递增量 */
        var i;
        /** 循环起始值 */
        var loopStart;
        /** 循环终结值 */
        var loopEnd;
        /** 起终点连线所经过的节点 */
        var passedNodeList;
        var passedNode;
        //为了运算方便，以下运算全部假设格子尺寸为1，格子坐标就等于它们的行、列号
        if (loopDirection) {
            lineFuction = MathUtil.getLineFunc(point1, point2, 0);
            loopStart = Math.min(startX, endX);
            loopEnd = Math.max(startX, endX);
            for (i = loopStart; i < loopEnd; i++) {
                //由于线段方程是根据终起点中心点连线算出的，所以对于起始点来说需要根据其中心点
                //位置来算，而对于其他点则根据左上角来算
                var xpos = i * this._cellSize + this._cellSize;
                //根据x得到直线上的y值
                var yPos = lineFuction(xpos);
                //检查经过的节点是否有障碍物，若有则返回true
                passedNodeList = this.getNodesUnderPoint(i + 1, yPos / this._cellSize);
                for (var idx in passedNodeList) {
                    /*passedNode = passedNodeList[idx];
                    var rect: egret.Shape = GameTest.instance._gridArr[passedNode.x][passedNode.y];
                    rect.graphics.lineStyle(0.1);
                    rect.graphics.beginFill(0xFF99FF,0.5);
                    rect.graphics.drawRect(0,0,this._cellSize,this._cellSize);
                    rect.graphics.endFill();*/
                    if (passedNodeList[idx].walkable == false)
                        return true;
                }
            }
        }
        else {
            lineFuction = MathUtil.getLineFunc(point1, point2, 1);
            loopStart = Math.min(startY, endY);
            loopEnd = Math.max(startY, endY);
            for (i = loopStart; i < loopEnd; i++) {
                var ypos = i * this._cellSize + this._cellSize;
                //根据y得到直线上的x值
                var xPos = lineFuction(ypos);
                passedNodeList = this.getNodesUnderPoint(xPos / this._cellSize, i + 1);
                for (var idx in passedNodeList) {
                    if (passedNodeList[idx].walkable == false)
                        return true;
                }
            }
        }
        return false;
    };
    /**
    * 得到一个点下的所有节点
    * @param xPos             点的横向位置
    * @param yPos             点的纵向位置
    * @param exception        例外格，若其值不为空，则在得到一个点下的所有节点后会排除这些例外格
    * @return                 共享此点的所有节点
    *
    */
    __egretProto__.getNodesUnderPoint = function (xPos, yPos, exception) {
        if (exception === void 0) { exception = null; }
        var result = [];
        var xIsInt = xPos % 1 == 0;
        var yIsInt = yPos % 1 == 0;
        //点由四节点共享情况
        if (xIsInt && yIsInt) {
            result[0] = this.getNode(xPos - 1, yPos - 1);
            result[1] = this.getNode(xPos, yPos - 1);
            result[2] = this.getNode(xPos - 1, yPos);
            result[3] = this.getNode(xPos, yPos);
        }
        else if (xIsInt && !yIsInt) {
            result[0] = this.getNode(xPos - 1, Math.floor(yPos));
            result[1] = this.getNode(xPos, Math.floor(yPos));
        }
        else if (!xIsInt && yIsInt) {
            result[0] = this.getNode(Math.floor(xPos), yPos - 1);
            result[1] = this.getNode(Math.floor(xPos), yPos);
        }
        else {
            result[0] = this.getNode(Math.floor(xPos), Math.floor(yPos));
        }
        //在返回结果前检查结果中是否包含例外点，若包含则排除掉
        if (exception && exception.length > 0) {
            for (var i = 0; i < result.length; i++) {
                //console.log(result[i].x + "  "+result[i].y);
                if (exception.indexOf(result[i]) != -1) {
                    result.splice(i, 1);
                    i--;
                }
            }
        }
        return result;
    };
    ////
    /**当终点不可移动时寻找一个离原终点最近的可移动点来替代之 */
    __egretProto__.findReplacer = function (fromNode, toNode) {
        var result;
        //若终点可移动则根本无需寻找替代点
        if (toNode.walkable) {
            result = toNode;
        }
        else {
            //根据节点的埋葬深度选择遍历的圈
            //若该节点是第一次遍历，则计算其埋葬深度
            if (toNode.buriedDepth == -1) {
                toNode.buriedDepth = this.getNodeBuriedDepth(toNode, Math.max(this._numCols, this._numRows));
            }
            var xFrom = toNode.x - toNode.buriedDepth < 0 ? 0 : toNode.x - toNode.buriedDepth;
            var xTo = toNode.x + toNode.buriedDepth > this.numCols - 1 ? this.numCols - 1 : toNode.x + toNode.buriedDepth;
            var yFrom = toNode.y - toNode.buriedDepth < 0 ? 0 : toNode.y - toNode.buriedDepth;
            var yTo = toNode.y + toNode.buriedDepth > this.numRows - 1 ? this.numRows - 1 : toNode.y + toNode.buriedDepth;
            var n; //当前遍历节点
            for (var i = xFrom; i <= xTo; i++) {
                for (var j = yFrom; j <= yTo; j++) {
                    if ((i > xFrom && i < xTo) && (j > yFrom && j < yTo)) {
                        continue;
                    }
                    n = this.getNode(i, j);
                    if (n.walkable) {
                        //计算此候选节点到起点的距离，记录离起点最近的候选点为替代点
                        n.getDistanceTo(fromNode);
                        if (!result) {
                            result = n;
                        }
                        else if (n.distance < result.distance) {
                            result = n;
                        }
                    }
                }
            }
        }
        return result;
    };
    /** 计算全部路径点的埋葬深度 */
    __egretProto__.calculateBuriedDepth = function () {
        var node;
        for (var i = 0; i < this._numCols; i++) {
            for (var j = 0; j < this._numRows; j++) {
                node = this._nodes[i][j];
                if (node.walkable) {
                    node.buriedDepth = 0;
                }
                else {
                    node.buriedDepth = this.getNodeBuriedDepth(node, Math.max(this._numCols, this._numRows));
                }
            }
        }
    };
    /** 计算一个节点的埋葬深度
    * @param node		欲计算深度的节点
    * @param loopCount	计算深度时遍历此节点外围圈数。默认值为10*/
    __egretProto__.getNodeBuriedDepth = function (node, loopCount) {
        if (loopCount === void 0) { loopCount = 10; }
        //如果检测节点本身是不可移动的则默认它的深度为1
        var result = node.walkable ? 0 : 1;
        var l = 1;
        while (l <= loopCount) {
            var startX = node.x - l < 0 ? 0 : node.x - l;
            var endX = node.x + l > this.numCols - 1 ? this.numCols - 1 : node.x + l;
            var startY = node.y - l < 0 ? 0 : node.y - l;
            var endY = node.y + l > this.numRows - 1 ? this.numRows - 1 : node.y + l;
            var n;
            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j <= endY; j++) {
                    n = this.getNode(i, j);
                    if (n != node && n.walkable) {
                        return result;
                    }
                }
            }
            //遍历完一圈，没发现一个可移动点，则埋葬深度加一。接着遍历下一圈
            result++;
            l++;
        }
        return result;
    };
    return Grid;
})();
Grid.prototype.__class__ = "Grid";
//# sourceMappingURL=Grid.js.map