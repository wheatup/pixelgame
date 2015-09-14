/**
 *
 * @author wheatup
 * 道具
 *
 */
class Inventory{
    public static items: Array<Item> = [];
    
    public static getItem(item: Item):void{
        this.items.push(item);
        WheatupEvent.call(EventType.GET_ITEM,item);
    }
    
    public static loseItem(item: Item): void{
        if(this.items.indexOf(item) >= 0) {
            WheatupEvent.call(EventType.LOST_ITEM,item);
            this.items.splice(this.items.indexOf(item), 1);
        }
    }
}


class Item {
    public static shovel: Item = new Item(1, ["铲子", "shovel"],"item_shovel");
    public static flashlight: Item = new Item(1, ["手电筒", "flashlight"], "item_flashlight");
    
    
    public id: number;
    public names: string[];
    public asset: string;
    
	public constructor(id:number, names:string[], asset:string) {
        this.id = id;
        this.names = names;
        this.asset = asset;
	}
}
