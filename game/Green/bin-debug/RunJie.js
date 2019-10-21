/**
 *
 * @author
 *
 */
var RunJie = (function (_super) {
    __extends(RunJie, _super);
    function RunJie() {
        _super.call(this);
        this.status = "";
        this.isjumping = false;
        this.enablecheck = true;
        this.data = RES.getRes("acts_json");
        this.txtr = RES.getRes("acts_png");
        this.mcFactory = new egret.MovieClipDataFactory(this.data, this.txtr);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=RunJie,p=c.prototype;
    p.onAddToStage = function (e) {
        this.isjumping = false;
        this.enablecheck = true;
        this.mcrun = new egret.MovieClip(this.mcFactory.generateMovieClipData("run"));
        //this.mcrun.width=112;
        //this.mcrun.height=113;
        this.mcrun.anchorOffsetX = 0;
        this.mcrun.anchorOffsetY = 0;
        console.log(this.mcrun.width);
        this.mcrun.scaleX = this.mcrun.scaleY = 112 / this.mcrun.width;
        this.mcrun.x = -52;
        this.mcrun.y = -26;
        this.mcrun.visible = false;
        this.addChild(this.mcrun);
        this.mcfly = new egret.MovieClip(this.mcFactory.generateMovieClipData("fly"));
        this.mcfly.anchorOffsetX = 0;
        this.mcfly.anchorOffsetY = 0;
        this.mcfly.scaleX = this.mcfly.scaleY = 131 / this.mcfly.width;
        this.mcfly.x = -52;
        this.mcfly.y = -12;
        this.mcfly.visible = false;
        this.addChild(this.mcfly);
        this.mchurry = new egret.MovieClip(this.mcFactory.generateMovieClipData("hurry"));
        this.mchurry.anchorOffsetX = 0;
        this.mchurry.anchorOffsetY = 0;
        this.mchurry.scaleX = this.mchurry.scaleY = 130 / this.mchurry.width;
        this.mchurry.x = -46;
        this.mchurry.y = -50;
        this.mchurry.visible = false;
        this.addChild(this.mchurry);
        this.mcjump = new egret.MovieClip(this.mcFactory.generateMovieClipData("jump"));
        this.mcjump.anchorOffsetX = 0;
        this.mcjump.anchorOffsetY = 0;
        this.mcjump.scaleX = this.mcjump.scaleY = 112 / this.mcjump.width;
        this.mcjump.x = -52;
        this.mcjump.y = -52;
        this.mcjump.visible = false;
        this.addChild(this.mcjump);
        this.mcfall = new egret.MovieClip(this.mcFactory.generateMovieClipData("jump"));
        this.mcfall.anchorOffsetX = 0;
        this.mcfall.anchorOffsetY = 0;
        this.mcfall.scaleX = this.mcfall.scaleY = 112 / this.mcfall.width;
        this.mcfall.x = -52;
        this.mcfall.y = -72;
        this.mcfall.visible = false;
        this.addChild(this.mcfall);
        this.mybmp = new eui.Image();
        this.mybmp.source = RES.getRes("char_normal_png");
        this.addChild(this.mybmp);
        this.mybmp.alpha = 0;
        this.SetStatus(CommonClass.STATUSNORMAL);
    };
    p.SetStatus = function (status) {
        this.mcrun.stop();
        this.mcrun.visible = false;
        this.mcfly.stop();
        this.mcfly.visible = false;
        this.mchurry.stop();
        this.mchurry.visible = false;
        this.mcjump.stop();
        this.mcjump.visible = false;
        if (status == CommonClass.STATUSNORMAL) {
            this.mcrun.visible = true;
            this.mcrun.play(-1);
        }
        else if (status == CommonClass.STATUSHURRY) {
        }
        else if (status == CommonClass.STATUSFLY) {
            this.mcfly.visible = true;
            this.mcfly.play(-1);
        }
        else if (status == CommonClass.STATUSFINAL) {
            this.mcrun.visible = true;
            this.mcrun.play(-1);
        }
        this.status = status;
    };
    p.Jump = function () {
        if (this.mcfall.visible == false) {
            var me = this;
            this.mcrun.stop();
            this.mcrun.visible = false;
            this.mcfly.stop();
            this.mcfly.visible = false;
            this.mcfall.visible = false;
            this.mcfall.stop();
            this.mchurry.stop();
            this.mchurry.visible = false;
            this.mcjump.visible = true;
            this.mcjump.gotoAndPlay(0, 1);
            setTimeout(function () {
                me.mcjump.stop();
                me.mcjump.visible = false;
                if (me.status == CommonClass.STATUSNORMAL) {
                    me.mcrun.visible = true;
                    me.mcrun.play(-1);
                }
                else if (me.status == CommonClass.STATUSHURRY) {
                    me.mchurry.visible = true;
                    me.mchurry.play(-1);
                }
            }, 800);
        }
    };
    p.Fall = function () {
        if (this.mcjump.visible == false) {
            var me = this;
            this.mcrun.stop();
            this.mcrun.visible = false;
            this.mcfly.stop();
            this.mcfly.visible = false;
            this.mcjump.stop();
            this.mcjump.visible = false;
            this.mchurry.stop();
            this.mchurry.visible = false;
            this.mcfall.visible = true;
            this.mcfall.gotoAndPlay(0, 1);
            setTimeout(function () {
                me.mcfall.stop();
                me.mcfall.visible = false;
                if (me.status == CommonClass.STATUSNORMAL) {
                    me.mcrun.visible = true;
                    me.mcrun.play(-1);
                }
                else if (me.status == CommonClass.STATUSHURRY) {
                    me.mchurry.visible = true;
                    me.mchurry.play(-1);
                }
            }, 500);
        }
    };
    return RunJie;
}(eui.Group));
egret.registerClass(RunJie,'RunJie');
