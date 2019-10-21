/**
 *
 * @author
 *
 */
var HitObjects = (function (_super) {
    __extends(HitObjects, _super);
    function HitObjects(type) {
        _super.call(this);
        this.mytype = type;
        if (type == "drop") {
            this.source = RES.getRes("drop_png");
        }
        else if (type == "block1") {
            this.source = RES.getRes("block1_png");
        }
        else if (type == "block2") {
            this.source = RES.getRes("block2_png");
        }
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=HitObjects,p=c.prototype;
    p.onAddToStage = function (e) {
        this.enablehit = true;
    };
    return HitObjects;
}(eui.Image));
egret.registerClass(HitObjects,'HitObjects');
