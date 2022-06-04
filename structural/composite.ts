abstract class DeliveryItem {
  public items: DeliveryItem[] = [];

  public addItem(item: DeliveryItem) {
    this.items.push(item);
  }

  protected getItemPrices(): number {
    return this.items.reduce((acc: number, curr: DeliveryItem) => acc += curr.getPrice(), 0);
  }

  public abstract getPrice(): number;
}

class DeliveryShop extends DeliveryItem {
  constructor(private deliveryFee: number) {
    super();
  }
  
  public getPrice(): number {
    return this.getItemPrices() + this.deliveryFee;
  }
}

class Package extends DeliveryItem {
  public getPrice(): number {
    return this.getItemPrices();
  }
}

class Product extends DeliveryItem {
  constructor(private price: number) {
    super();
  }

  public getPrice(): number {
    return this.price;
  }
}

const shop = new DeliveryShop(100);
shop.addItem(new Product(1000));

const pack1 = new Package();
pack1.addItem(new Product(200));
pack1.addItem(new Product(300));
shop.addItem(pack1);

const pack2 = new Package();
pack2.addItem(new Product(150));
shop.addItem(pack2);

console.log(shop.getPrice());


