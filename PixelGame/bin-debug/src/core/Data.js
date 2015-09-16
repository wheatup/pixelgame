/**
 *
 * @author wheatup
 * 数据与标识
 *
 */
var Data = (function () {
    function Data() {
    }
    var __egretProto__ = Data.prototype;
    Data.setFlag = function (key, value) {
        if (value === void 0) { value = true; }
        if (Data.flags.indexOf(key) < 0) {
            Data.flags.push(key);
        }
        Data.flagData[key] = value;
    };
    Data.getFlag = function (key) {
        return Data.flagData[key];
    };
    Data.save = function () {
    };
    Data.flags = [];
    Data.flagData = {};
    return Data;
})();
Data.prototype.__class__ = "Data";
var Flag;
(function (Flag) {
    Flag[Flag["HasCarBusted"] = 0] = "HasCarBusted";
    Flag[Flag["HasArrivedJungle"] = 1] = "HasArrivedJungle";
    Flag[Flag["GotShovel"] = 2] = "GotShovel"; //是否获得过铲子，这将控制车厢内是否有铲子
})(Flag || (Flag = {}));
//class Flag{
//    public static IsCarJustBusted = "IsCarJustBusted";        //车是否刚坏，这将控制是否出现道路的对话剧情
//    public static HasArrivedJungle = "HasArrivedJungle";      //是否到达过丛林，这将控制是否天色已晚
//    public static GotShovel = "GotShovel";                    //是否获得过铲子，这将控制车厢内是否有铲子
//} 
//# sourceMappingURL=Data.js.map