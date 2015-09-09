/**
 *
 * @author wheatup
 * 加载资源界面场景
 * 
 */
class LoadingScene extends Scene{
    public constructor(){
        super("skins.scene.LoadingSkin");
    }

	//更新加载资源数
	public setProgress(cur: number, tol: number): void{
        this.ui["bar"].width = 400 * (cur / tol);
        this.ui["lbl_prog"].text = Math.round(100 * (cur / tol)) + "%";
	}
}
