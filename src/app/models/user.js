module.exports = class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    getId = () => this.id;
    getName = () => this.name;
    getEmail = () => this.email;

    getInfo = () => this.getId() + '-' + this.getName() + '-' + this.getEmail();
}