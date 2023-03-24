module.exports = class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    getId = () => this.id;
    getName = () => this.name;
    getPrice = () => this.price;

    getInfo = () => this.getId() + '-' + this.getName() + '-' + this.getPrice();
}