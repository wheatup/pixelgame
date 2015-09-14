/**
 *
 * @author wheatup
 * 道具
 *
 */
var Inventory = (function () {
    function Inventory() {
    }
    var __egretProto__ = Inventory.prototype;
    Inventory.getItem = function (item) {
        this.items.push(item);
        WheatupEvent.call(EventType.GET_ITEM, item);
    };
    Inventory.loseItem = function (item) {
        if (this.items.indexOf(item) >= 0) {
            WheatupEvent.call(EventType.LOST_ITEM, item);
            this.items.splice(this.items.indexOf(item), 1);
        }
    };
    Inventory.items = [];
    return Inventory;
})();
Inventory.prototype.__class__ = "Inventory";
var Item = (function () {
    function Item(id, names, asset) {
        this.id = id;
        this.names = names;
        this.asset = asset;
    }
    var __egretProto__ = Item.prototype;
    Item.shovel = new Item(1, ["铲子", "shovel"], "item_shovel");
    Item.flashlight = new Item(1, ["手电筒", "flashlight"], "item_flashlight");
    return Item;
})();
Item.prototype.__class__ = "Item";
//# sourceMappingURL=Item.js.map