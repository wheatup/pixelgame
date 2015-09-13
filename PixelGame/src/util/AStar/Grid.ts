/**
 *
 * 
 * 节点二维数组 节点操作方法
 * @author 
 *
 */
class Grid {
	
    private _startNode:NodePoint;
    private _endNode:NodePoint;
    private _nodes:NodePoint[][];
    private _numCols:number;
    private _numRows:number;
    private _cellSize: number;
    
    /**
    * 构造函数
    * @numCols 列
    * @numRows 行
    */
    public constructor(numCols:number, numRows:number, cellSize:number) {
        this._numCols = numCols;
        this._numRows = numRows;
        this._cellSize = cellSize;
        this._nodes = new Array();
        
        ////以列数作为X坐标循环
        for(var x:number = 0; x < this._numCols; x++){
            this._nodes[x] = [];
            for(var y:number = 0; y < this._numRows; y++){
                this._nodes[x][y] = new NodePoint(x, y);
            }
        }
    }
    
    ////////////////////////////////////////
    // public methods
    ////////////////////////////////////////
    
    /**
    * 根据坐标获取节点
    * @param x 列
    * @param y 行
    */
    public getNode(x:number, y:number):NodePoint{
        return this._nodes[x][y];
    }
    
    /**
    * 设置结束节点
    * @param x 列
    * @param y 行
    */
    public setEndNode(x:number, y:number):void{
        this._endNode = this._nodes[x][y];
    }
    
    /**
    * 设置开始节点
    * @param x 列
    * @param y 行
    */
    public setStartNode(x:number, y:number):void{
        this._startNode = this._nodes[x][y];
    }
    
    /**
    * 设置节点是否可以通行
    * @param x 列
    * @param y 行
    */
    public setWalkable(x:number, y:number, value:boolean):void{
        this._nodes[x][y].walkable = value;
    }
    
    /**
    * 设置节点是否透明
    * @param x 列
    * @param y 行
    */
    public setAlphable(x:number, y:number, value:boolean):void{
        this._nodes[x][y].alphable = value;
    }
    
    ////////////////////////////////////////
    // getters / setters
    ////////////////////////////////////////
    
    /**
    * 返回开始节点
    */
    public get startNode():NodePoint{
        return this._startNode;
    }
    
    /**
    * 返回结束节点
    */
    public get endNode():NodePoint{
        return this._endNode;
    }
    
    /**
    * 返回网格总列数
    */
    public get numCols():number{
        return this._numCols;
    }
    
    /**
    * 返回网格总行数
    */
    public get numRows():number{
        return this._numRows;
    }
    
    /**
    * 判断两节点之间是否存在障碍物 
    * 
    */
    public hasBarrier(startX: number,startY: number,endX: number,endY: number): boolean {
        //如果起点终点是同一个点那傻子都知道它们间是没有障碍物的
        if(startX == endX && startY == endY) return false;
                                                
        //两节点中心位置
        var point1: egret.Point = new egret.Point(startX * this._cellSize + this._cellSize/2,startY * this._cellSize + this._cellSize/2);
        var point2: egret.Point = new egret.Point(endX * this._cellSize + this._cellSize/2,endY * this._cellSize + this._cellSize/2);
                                                
        //根据起点终点间横纵向距离的大小来判断遍历方向
        var distX: number = Math.abs(endX - startX);
        var distY: number = Math.abs(endY - startY);
        /**遍历方向，为true则为横向遍历，否则为纵向遍历*/
        var loopDirection: boolean = distX > distY ? true : false;
                                                
        /**起始点与终点的连线方程*/
        var lineFuction: Function;
                                                
        /** 循环递增量 */
        var i: number;
                                                
        /** 循环起始值 */
        var loopStart: number;
                                                
        /** 循环终结值 */
        var loopEnd: number;
                                                
        /** 起终点连线所经过的节点 */
        var passedNodeList: NodePoint[];
        var passedNode: NodePoint;
                                                
        //为了运算方便，以下运算全部假设格子尺寸为1，格子坐标就等于它们的行、列号
        if(loopDirection) {
            lineFuction = MathUtil.getLineFunc(point1,point2,0);
            
            loopStart = Math.min(startX,endX);
            loopEnd = Math.max(startX,endX);
                                                                    
            //开始横向遍历起点与终点间的节点看是否存在障碍(不可移动点) 
            for(i = loopStart;i < loopEnd;i++) {
                //由于线段方程是根据终起点中心点连线算出的，所以对于起始点来说需要根据其中心点
                //位置来算，而对于其他点则根据左上角来算
                var xpos: number = i * this._cellSize + this._cellSize;
                //根据x得到直线上的y值
                var yPos: number = lineFuction(xpos);
                //检查经过的节点是否有障碍物，若有则返回true
                passedNodeList = this.getNodesUnderPoint( i+1, yPos/this._cellSize );
                for(var idx in passedNodeList) {
                    /*passedNode = passedNodeList[idx];
                    var rect: egret.Shape = GameTest.instance._gridArr[passedNode.x][passedNode.y];
                    rect.graphics.lineStyle(0.1);
                    rect.graphics.beginFill(0xFF99FF,0.5);
                    rect.graphics.drawRect(0,0,this._cellSize,this._cellSize);
                    rect.graphics.endFill();*/
                    if(passedNodeList[idx].walkable == false) return true;
                }
            }
        }else{
            lineFuction = MathUtil.getLineFunc(point1,point2,1);
            
            loopStart = Math.min(startY,endY);
            loopEnd = Math.max(startY,endY);
                                                                    
            //开始纵向遍历起点与终点间的节点看是否存在障碍(不可移动点)
            for(i = loopStart;i < loopEnd;i++) {
                var ypos:number = i * this._cellSize + this._cellSize;
                //根据y得到直线上的x值
                var xPos: number = lineFuction(ypos);
                passedNodeList = this.getNodesUnderPoint( xPos/this._cellSize, i+1 );
                for(var idx in passedNodeList) {
                    if(passedNodeList[idx].walkable == false) return true;
                }
            }
        }
        return false;
    }
        
    /**
    * 得到一个点下的所有节点 
    * @param xPos             点的横向位置
    * @param yPos             点的纵向位置
    * @param exception        例外格，若其值不为空，则在得到一个点下的所有节点后会排除这些例外格
    * @return                 共享此点的所有节点
    * 
    */           
    public getNodesUnderPoint( xPos:number, yPos:number, exception:NodePoint[]=null ):NodePoint[]
    {
        var result:NodePoint[] = [];
        var xIsInt:boolean = xPos % 1 == 0;
        var yIsInt:boolean = yPos % 1 == 0;
        //点由四节点共享情况
        if( xIsInt && yIsInt )
        {
            result[0] = this.getNode( xPos - 1, yPos - 1);
            result[1] = this.getNode( xPos, yPos - 1);
            result[2] = this.getNode( xPos - 1, yPos);
            result[3] = this.getNode( xPos, yPos);
        }
        //点由2节点共享情况
        //点落在两节点左右临边上
        else if( xIsInt && !yIsInt )
        {
            result[0] = this.getNode( xPos - 1, Math.floor(yPos) );
            result[1] = this.getNode( xPos, Math.floor(yPos) );
        }
        //点落在两节点上下临边上
        else if( !xIsInt && yIsInt )
        {
            result[0] = this.getNode( Math.floor(xPos), yPos - 1 );
            result[1] = this.getNode( Math.floor(xPos), yPos );
        }
        //点由一节点独享情况
        else
        {
            result[0] = this.getNode( Math.floor(xPos), Math.floor(yPos) );
        }
                                        
        //在返回结果前检查结果中是否包含例外点，若包含则排除掉
        if( exception && exception.length > 0 )
        {
            for( var i:number=0; i<result.length; i++ )
            {
                //console.log(result[i].x + "  "+result[i].y);
                if( exception.indexOf(result[i]) != -1 )
                {
                    result.splice(i, 1);
                    i--;
                }
            }
        }
        return result;
    }
    
    
    
    ////
    
    /**当终点不可移动时寻找一个离原终点最近的可移动点来替代之 */
    public findReplacer( fromNode:NodePoint, toNode:NodePoint ):NodePoint
    {
        var result:NodePoint;
        //若终点可移动则根本无需寻找替代点
        if( toNode.walkable ){
            result = toNode;
        }
        //否则遍历终点周围节点以寻找离起始点最近一个可移动点作为替代点
        else
        {
            //根据节点的埋葬深度选择遍历的圈
            //若该节点是第一次遍历，则计算其埋葬深度
            if( toNode.buriedDepth == -1 ){
                toNode.buriedDepth = this.getNodeBuriedDepth( toNode, Math.max(this._numCols, this._numRows) );
            }
            var xFrom:number = toNode.x - toNode.buriedDepth < 0 ? 0 : toNode.x - toNode.buriedDepth;
            var xTo:number = toNode.x + toNode.buriedDepth > this.numCols - 1 ? this.numCols - 1 : toNode.x + toNode.buriedDepth;
            var yFrom:number = toNode.y - toNode.buriedDepth < 0 ? 0 : toNode.y - toNode.buriedDepth;
            var yTo:number = toNode.y + toNode.buriedDepth > this.numRows - 1 ? this.numRows - 1 : toNode.y + toNode.buriedDepth;		
            
            var n:NodePoint;//当前遍历节点
            
            for( var i:number=xFrom; i<=xTo; i++ ){
                for( var j:number=yFrom; j<=yTo; j++ ){
                    if( (i>xFrom && i<xTo) && (j>yFrom && j<yTo) ){
                        continue;
                    }
                    n = this.getNode(i, j);
                    if( n.walkable ){
                        //计算此候选节点到起点的距离，记录离起点最近的候选点为替代点
                        n.getDistanceTo( fromNode );
                        
                        if( !result ){
                            result = n;
                        }else if( n.distance < result.distance ){							
                            result = n;
                        }
                    }
                }
            }
            
        }
        return result;
    }
    
    
    /** 计算全部路径点的埋葬深度 */
    public calculateBuriedDepth():void
    {
        var node:NodePoint;
        for(var i:number = 0; i < this._numCols; i++)
        {
            for(var j:number = 0; j < this._numRows; j++)
            {
                node = this._nodes[i][j];
                if( node.walkable )
                    {
                    node.buriedDepth = 0;
                }
                else
                {
                    node.buriedDepth = this.getNodeBuriedDepth( node, Math.max(this._numCols, this._numRows) );
                }
            }
        }
    }
    
    
    /** 计算一个节点的埋葬深度 
    * @param node		欲计算深度的节点
    * @param loopCount	计算深度时遍历此节点外围圈数。默认值为10*/
    private getNodeBuriedDepth( node:NodePoint, loopCount:number=10 ):number
    {
        //如果检测节点本身是不可移动的则默认它的深度为1
        var result:number = node.walkable ? 0 : 1;
        var l:number = 1;
        
        while( l <= loopCount ){
            var startX:number = node.x - l < 0 ? 0 : node.x - l;
            var endX:number = node.x + l > this.numCols - 1 ? this.numCols - 1 : node.x + l;
            var startY:number = node.y - l < 0 ? 0 : node.y - l;
            var endY:number = node.y + l > this.numRows - 1 ? this.numRows - 1 : node.y + l;		
            
            var n:NodePoint;
            //遍历一个节点周围一圈看是否周围一圈全部是不可移动点，若是，则深度加一，
            //否则返回当前累积的深度值
            for(var i:number = startX; i <= endX; i++)
            {
                for(var j:number = startY; j <= endY; j++)
                {
                    n = this.getNode(i, j);
                    if( n != node && n.walkable ){
                        return result;
                    }
                }
            }
            
            //遍历完一圈，没发现一个可移动点，则埋葬深度加一。接着遍历下一圈
            result++;
            l++;
        }
        return result;
    }
}
