// Model classes for objects

// global vars
import { generateID } from "../Utils";

const OrderStatus = Object.freeze({
    PENDING: 0,
    PROCESSING: 1,
    ON_WAY: 2,
    DELIVERED: 3,
    CANCELLED: 4,
});

// classes and converters

class User {
    constructor(
        name,
        address,
        phoneNo,
        email,
        password,
        cart = [],
        orders = []
    ) {
        this.name = name;
        this.address = address;
        this.email = email;
        this.password = password;
        this.phoneNo = phoneNo;
        this.cart = cart;
        this.orders = orders;
    }

    addOrder(order) {
        let saveOrder = Object.assign({}, order);
        this.orders.push(saveOrder);
    }

    addProduct(product) {
        let saveProduct = Object.assign({}, product);
        if (this.cart.length > 0) {
            let index = 0;
            let foundProduct = false;
            for (let i = 0; i < this.cart.length; i++) {
                console.log(saveProduct.id, this.cart[i].id);
                if (saveProduct.id == this.cart[i].id) {
                    index = i;
                    foundProduct = true;
                }
            }
            if (foundProduct) {
                this.cart.splice(index, 1);
            }
        }
        this.cart.push(Object.assign({}, saveProduct));
    }

    removeProduct(productID) {
        if (this.cart.length > 0) {
            let index = 0;
            let foundProduct = false;
            for (let i = 0; i < this.cart.length; i++) {
                if (productID == this.cart[i].id) {
                    index = i;
                    foundProduct = true;
                    break;
                }
            }
            if (foundProduct) {
                this.cart.splice(index, 1);
            }
        }
    }

    static convertToJSON(user) {
        return {
            name: user.name,
            address: user.address,
            email: user.email,
            password: user.password,
            orders: user.orders,
            cart: user.cart,
            phoneNo: user.phoneNo,
        };
    }

    static convertToUser(json) {
        let orders = [];
        let ordersJSON = json.orders;
        ordersJSON.forEach((order) => {
            orders.push(Object.assign({}, order));
        });

        let cart = [];
        let cartJSON = json.cart;
        cartJSON.forEach((product) => {
            cart.push(Object.assign({}, product));
        });
        // console.log(cart);
        return new User(
            json.name,
            json.address,
            json.phoneNo,
            json.email,
            json.password,
            cart,
            orders
        );
    }
}

class Seller {
    constructor(name, company, email, password, products = []) {
        this.name = name;
        this.company = company;
        this.email = email;
        this.password = password;
        this.products = products;
    }

    addProduct(product) {
        let saveProduct = Object.assign({}, product);
        if (this.products.length > 0) {
            let index = 0;
            let foundProduct = false;
            for (let i = 0; i < this.products.length; i++) {
                console.log(saveProduct.id, this.products[i].id);
                if (saveProduct.id == this.products[i].id) {
                    index = i;
                    foundProduct = true;
                }
            }
            if (foundProduct) {
                this.products.splice(index, 1);
            }
        }
        this.products.push(saveProduct);
    }

    removeProduct(productID) {
        if (this.products.length > 0) {
            let index = 0;
            let foundProduct = false;
            for (let i = 0; i < this.products.length; i++) {
                if (productID == this.products[i].id) {
                    index = i;
                    foundProduct = true;
                    break;
                }
            }
            if (foundProduct) {
                this.products.splice(index, 1);
            }
        }
    }

    static convertToJSON(seller) {
        return {
            name: user.name,
            company: user.company,
            email: user.email,
            password: user.password,
            products: user.products,
        };
    }

    static convertToSeller(json) {
        let products = [];
        let productsJSON = json.products;
        productsJSON.forEach((product) => {
            products.push(Object.assign({}, product));
        });
        return new Seller(
            json.name,
            json.company,
            json.email,
            json.password,
            products
        );
    }
}

class Product {
    constructor(
        name,
        id,
        category,
        subcategory,
        price,
        seller,
        seller_id,
        estimatedTime,
        images,
        quantity,
        description
    ) {
        this.name = name;
        this.id = id;
        this.category = category;
        this.subcategory = subcategory;
        this.price = price;
        this.seller = seller;
        this.seller_id = seller_id;
        this.estimatedTime = estimatedTime;
        this.images = images;
        this.quantity = quantity;
        this.description = description;
    }

    static convertToProduct(json) {
        return new Product(
            json.name,
            json.id,
            json.category,
            json.subcategory,
            json.price,
            json.seller,
            json.seller_id,
            json.estimatedTime,
            json.images,
            json.quantity,
            json.description
        );
    }
}

var productConverter = {
    toFirestore: function (product) {
        return {
            name: product.name,
            id: product.id,
            category: product.category,
            subcategory: product.subcategory,
            price: product.price,
            seller: product.seller,
            seller_id: product.seller_id,
            estimatedTime: product.estimatedTime,
            images: product.images,
            quantity: product.quantity,
            description: product.description,
        };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new Product(
            data.name,
            data.id,
            data.category,
            data.subcategory,
            data.price,
            data.seller,
            data.seller_id,
            data.estimatedTime,
            data.images,
            data.quantity,
            data.description
        );
    },
};

class Category {
    constructor(name, subcategories) {
        this.name = name;
        this.subcategories = subcategories;
    }
}

var categoryConverter = {
    toFirestore: function (category) {
        return {
            name: category.name,
            subcategories: category.subcategories,
        };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new Category(data.name, data.subcategories);
    },
};

class Order {
    constructor(
        products,
        customerName,
        customerNo,
        customerAddress,
        id = generateID(10),
        status = OrderStatus.PENDING,
        orderDate = Date()
    ) {
        this.id = id;
        this.customerName = customerName;
        this.customerNo = customerNo;
        this.customerAddress = customerAddress;
        this.products = products;
        this.status = status;
        this.orderDate = orderDate;
    }

    addProduct(product) {
        let saveProduct = Object.assign({}, product);
        if (this.products.length > 0) {
            let index = 0;
            let foundProduct = false;
            for (let i = 0; i < this.products.length; i++) {
                console.log(saveProduct.id, this.products[i].id);
                if (saveProduct.id == this.products[i].id) {
                    index = i;
                    foundProduct = true;
                }
            }
            if (foundProduct) {
                this.products.splice(index, 1);
            }
        }
        this.products.push(saveProduct);
    }

    static convertToOrder(json) {
        let products = [];
        let productsJSON = json.products;
        productsJSON.forEach((product) => {
            products.push(Object.assign({}, product));
        });
        return new Order(
            products,
            json.customerName,
            json.customerNo,
            json.customerAddress,
            json.id,
            json.status,
            json.orderDate
        );
    }
}

export {
    User,
    Seller,
    Product,
    Category,
    OrderStatus,
    Order,
    productConverter,
    userConverter,
    categoryConverter,
    sellerConverter,
};
