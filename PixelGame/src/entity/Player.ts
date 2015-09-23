/**
 *
 * @author 
 *
 */
class Player extends Mob{
    public animations: Array<Animation> = [];
    private animIndex: number = 0;
    private currentAnimation: Animation;
    
    public constructor(scenario: Scenario, size: number = 1) {
        super("me_anim_standf_0", 80, 120, scenario, size);
        
        //添加动画
        this.animations[Mob.ANIM_STAND_FRONT] = new Animation("me_anim_standf",1,this,0);
        this.animations[Mob.ANIM_STAND_BACK] = new Animation("me_anim_standb",1,this,0);
        this.animations[Mob.ANIM_WALK_FRONT] = new Animation("me_anim_walkf",4,this,7);
        this.animations[Mob.ANIM_WALK_BACK] = new Animation("me_anim_walkb",4,this,7);
        
        this.currentAnimation = this.animations[Mob.ANIM_STAND_FRONT];
	}
	
	public update():void{
        super.update();
        this.currentAnimation.update();
        this.cover.source = this.source + "a";
	}
	
    public onActionChange():void{
        this.scaleX = ((this.dir == Mob.DIR_UP_LEFT || this.dir == Mob.DIR_DOWN_LEFT) ? 1 : -1);
        this.cover.scaleX = this.scaleX;
        var anim: Animation;
        switch(this.action){
            case Mob.ACTION_WALK:
                if(this.dir == Mob.DIR_DOWN_RIGHT || this.dir == Mob.DIR_DOWN_LEFT) {
                    anim = this.animations[Mob.ANIM_WALK_FRONT];
                }else{
                    anim = this.animations[Mob.ANIM_WALK_BACK];
                }
                break;
            case Mob.ACTION_STAND:
                if(this.dir == Mob.DIR_DOWN_RIGHT || this.dir == Mob.DIR_DOWN_LEFT) {
                    anim = this.animations[Mob.ANIM_STAND_FRONT];
                }else{
                    anim = this.animations[Mob.ANIM_STAND_BACK];
                }
                break;
        }
        
        if(this.currentAnimation != anim){
            this.currentAnimation = anim;
            this.currentAnimation.play();
        }
    }
}
