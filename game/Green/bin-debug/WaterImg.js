/**
 *
 * @author
 *
 */
var WaterImg = (function (_super) {
    __extends(WaterImg, _super);
    function WaterImg() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=WaterImg,p=c.prototype;
    p.onAddToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.img = new eui.Image();
        this.img.texture = RES.getRes("water1_png");
        this.img.x = -189;
        this.img.y = -93;
        this.addChild(this.img);
        this.alpha = 1;
        this.touchEnabled = false;
        this.touchChildren = false;
        var me = this;
        setTimeout(function () {
            me.img.texture = RES.getRes("water2_png");
            me.img.x = -149;
            me.img.y = -83;
            egret.Tween.get(me).to({ alpha: 0 }, 500).call(me.onE, me);
        }, 100);
    };
    p.onE = function () {
        this.visible = false;
        this.parent.removeChild(this);
    };
    return WaterImg;
}(eui.Component));
egret.registerClass(WaterImg,'WaterImg');
