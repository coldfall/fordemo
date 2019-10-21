class GameEvent extends egret.Event {


    public static SHOWRULE: string = "showrule";

    public static SHOWGAME: string = "showgame";

    
    public static SHOWFINISHFAIL: string = "showfinishfail";
    public static SHOWFINISHRESULT: string = "showfinishresult";
    
    public static SHOWRESULT: string = "showresult";
    public static SHOWFAIL: string = "showfail";

    public static GAMEAGAIN: string = "gameagain";

    public static ADDSCORE: string = "addscore";
    public static NEXTSTAGE: string = "nextstage";
    

    public arg: any;

    public constructor(type: string,bubbles: boolean = false,cancelable: boolean = false) {
        super(type,bubbles,cancelable);
    }
}