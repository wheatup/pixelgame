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
    Flag[Flag["GotShovel"] = 2] = "GotShovel";
    Flag[Flag["LastSendMessage"] = 3] = "LastSendMessage";
    Flag[Flag["LastReceiveMessage"] = 4] = "LastReceiveMessage";
    Flag[Flag["HasReplied"] = 5] = "HasReplied"; //是否已回复过短信
})(Flag || (Flag = {}));
//# sourceMappingURL=Data.js.map