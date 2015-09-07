/**
 *
 * @author 
 *
 */
class LoadingScene extends Scene{
    public constructor(){
        super("skins.scene.LoadingSkin");
    }
    
	public init(): void{
        
	}
	
	public setProgress(cur: number, tol: number): void{
        this.ui["bar"].width = 400 * (cur / tol);
        this.ui["lbl_prog"].text = Math.round(100 * (cur / tol)) + "%";
	}
}
