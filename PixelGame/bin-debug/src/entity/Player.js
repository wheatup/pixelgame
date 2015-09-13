/**
 *
 * @author
 *
 */
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(scenario) {
        _super.call(this, "me_anim_standf_0", 80, 120, scenario);
        this.animations = [];
        this.animIndex = 0;
        //添加动画
        this.animations[Mob.ANIM_STAND_FRONT] = new Animation("me_anim_standf", 1, this, 0);
        this.animations[Mob.ANIM_STAND_BACK] = new Animation("me_anim_standb", 1, this, 0);
        this.animations[Mob.ANIM_WALK_FRONT] = new Animation("me_anim_walkf", 4, this, 7);
        this.animations[Mob.ANIM_WALK_BACK] = new Animation("me_anim_walkb", 4, this, 7);
        this.currentAnimation = this.animations[Mob.ANIM_STAND_FRONT];
    }
    var __egretProto__ = Player.prototype;
    __egretProto__.update = function () {
        _super.prototype.update.call(this);
        this.currentAnimation.update();
    };
    __egretProto__.onActionChange = function () {
        this.scaleX = ((this.dir == Mob.DIR_UP_LEFT || this.dir == Mob.DIR_DOWN_LEFT) ? 1 : -1);
        var anim;
        switch (this.action) {
            case Mob.ACTION_WALK:
                if (this.dir == Mob.DIR_DOWN_RIGHT || this.dir == Mob.DIR_DOWN_LEFT) {
                    anim = this.animations[Mob.ANIM_WALK_FRONT];
                }
                else {
                    anim = this.animations[Mob.ANIM_WALK_BACK];
                }
                break;
            case Mob.ACTION_STAND:
                if (this.dir == Mob.DIR_DOWN_RIGHT || this.dir == Mob.DIR_DOWN_LEFT) {
                    anim = this.animations[Mob.ANIM_STAND_FRONT];
                }
                else {
                    anim = this.animations[Mob.ANIM_STAND_BACK];
                }
                break;
        }
        if (this.currentAnimation != anim) {
            this.currentAnimation = anim;
            this.currentAnimation.play();
        }
    };
    return Player;
})(Mob);
Player.prototype.__class__ = "Player";
//# sourceMappingURL=Player.js.map