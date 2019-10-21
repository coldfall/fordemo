/**
 *
 * @author
 *
 */
var CommonClass = (function () {
    function CommonClass() {
    }
    var d = __define,c=CommonClass,p=c.prototype;
    CommonClass.SetCenter = function (obj) {
        obj.anchorOffsetX = obj.width / 2;
        obj.anchorOffsetY = obj.height / 2;
        obj.x = obj.x + obj.width / 2;
        obj.y = obj.y + obj.height / 2;
    };
    CommonClass.GetRnd = function (n) {
        return Math.ceil(n * Math.random());
    };
    CommonClass.STATUSNORMAL = "normal";
    CommonClass.STATUSHURRY = "hurry";
    CommonClass.STATUSFLY = "fly";
    CommonClass.STATUSFINAL = "final";
    CommonClass.myscore = 0;
    CommonClass.singlescore = 100;
    CommonClass.runspeed = 8;
    CommonClass.flyspeed = 12;
    CommonClass.engame = false;
    CommonClass.guideplayed = false;
    return CommonClass;
}());
egret.registerClass(CommonClass,'CommonClass');
