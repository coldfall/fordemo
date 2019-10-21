/**
 *
 * @author
 *
 */
var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Monster,p=c.prototype;
    p.onAddToStage = function (e) {
        this.source = RES.getRes("monster_png");
        console.log("addmonster");
    };
    return Monster;
}(eui.Image));
egret.registerClass(Monster,'Monster');
