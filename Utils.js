export const images = {
    productPlaceholder: require("./images/product_placeholder.gif"),
};
const months = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
};

export function formatDate(date) {
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
}

export function formatDateMonth(date) {
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate();

    month = months[month];
    if (day.length < 2) day = "0" + day;

    return [day, month].join(" ");
}

export function formatMonth(date) {
    var d = new Date(date),
        month = "" + (d.getMonth() + 1);
    month = months[month];
    return [month].join(" ");
}

export function getOrderStatus(val) {
    if (val == 0) {
        return "PENDING";
    } else if (val == 1) {
        return "Processing";
    } else if (val == 2) {
        return "On way";
    } else if (val == 3) {
        return "Delivered";
    } else {
        return "Cancelled";
    }
}

export function generateID(length) {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

export const uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            // return the blob
            resolve(xhr.response);
        };

        xhr.onerror = function () {
            // something went wrong
            reject(new Error("uriToBlob failed"));
        };
        // this helps us get a blob
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);

        xhr.send(null);
    });
};

export const analyzeSalesDataWeek = (orders) => {
    let map = new Map();
    let data = [];
    let date = new Date();
    let labels = [];
    date.setHours(0, 0, 0, 0);
    map.set(date.toString(), 0);
    for (let i = 1; i < 6; i++) {
        date.setDate(date.getDate() - 1);
        let x = map.set(date.toString(), 0);
    }
    orders.forEach((order) => {
        let d = new Date(order.createdAt);
        d.setHours(0, 0, 0, 0);
        if (map.has(d.toString())) {
            map.set(d.toString(), map.get(d.toString()) + 1);
        }
    });
    for (let key of map.keys()) {
        // data.push({ t: key, y: map.get(key) });
        labels.push(formatDateMonth(key));
        // console.log(key);
        // labels.push(Moment(key).format("d MMM"));
        data.push(map.get(key));
    }
    let x = {
        labels: labels.reverse(),
        datasets: [{ data: data.reverse() }],
    };
    return x;
};

export const analyzeSalesDataMonth = (orders) => {
    let map = new Map();
    let data = [];
    let labels = [];
    let currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);
    let lastYearMonth = new Date();
    lastYearMonth.setHours(0, 0, 0, 0);
    lastYearMonth.setYear(lastYearMonth.getYear() + 1900 - 1);
    lastYearMonth.setDate(1);
    let d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(1);
    map.set(d.toString(), 0);
    for (let i = 0; i < 12; i++) {
        d.setMonth(d.getMonth() - 1);
        d.setDate(1);
        map.set(d.toString(), 0);
    }
    orders.forEach((order) => {
        let date = new Date(order.createdAt);
        date.setHours(0, 0, 0, 0);
        date.setDate(1);
        if (date <= currentMonth && date >= lastYearMonth) {
            map.set(date.toString(), map.get(date.toString()) + 1);
        }
    });
    for (let key of map.keys()) {
        // data.push({ t: key, y: map.get(key) });
        labels.push(formatMonth(key));
        // console.log(key);
        // labels.push(Moment(key).format("d MMM"));
        data.push(map.get(key));
    }
    let x = {
        labels: labels.reverse(),
        datasets: [{ data: data.reverse() }],
    };
    return x;
};
export const analyzeSalesDataYear = (orders) => {
    let map = new Map();
    let data = [];
    let labels = [];
    let currentYear = new Date();
    currentYear.setMonth(11);
    currentYear.setDate(1);
    currentYear.setHours(0, 0, 0, 0);
    let lastYear = new Date();
    lastYear.setHours(0, 0, 0, 0);
    lastYear.setMonth(0);
    lastYear.setYear(lastYear.getYear() + 1900 - 10);
    lastYear.setDate(1);
    let d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setMonth(0);
    d.setDate(1);
    map.set(d.toString(), 0);
    for (let i = 0; i < 10; i++) {
        d.setYear(d.getYear() - 1 + 1900);
        d.setMonth(0);
        d.setDate(1);
        map.set(d.toString(), 0);
    }
    orders.forEach((order) => {
        let date = new Date(order.createdAt);
        date.setMonth(0);
        date.setHours(0, 0, 0, 0);
        date.setDate(1);
        if (date <= currentYear && date >= lastYear) {
            map.set(date.toString(), map.get(date.toString()) + 1);
        }
    });
    for (let key of map.keys()) {
        // data.push({ t: key, y: map.get(key) });
        labels.push(new Date(key).getFullYear());
        // console.log(key);
        // labels.push(Moment(key).format("d MMM"));
        data.push(map.get(key));
    }
    let x = {
        labels: labels.reverse(),
        datasets: [{ data: data.reverse() }],
    };
    return x;
};

export const analyzeProductDataWeek = (orders) => {
    let map = new Map();
    let data = [];
    let labels = [];
    let current = new Date();
    let lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    orders.forEach((order) => {
        let date = new Date(order.createdAt);
        if (date >= lastWeek && date <= current) {
            order.products.forEach((product) => {
                if (map.has(product.product.name)) {
                    map.set(
                        product.product.name,
                        map.get(product.product.name) + Number(product.quantity)
                    );
                } else {
                    map.set(product.product.name, Number(product.quantity));
                }
            });
        }
    });
    for (let key of map.keys()) {
        labels.push(key);
        data.push(map.get(key));
    }
    if (labels.length == 0) {
        labels = ["No Sales"];
        data = [0];
    }
    let x = {
        labels: labels.reverse(),
        datasets: [{ data: data.reverse() }],
    };
    return x;
};

export const analyzeProductDataMonth = (orders) => {
    let map = new Map();
    let data = [];
    let labels = [];
    let current = new Date();
    let lastYear = new Date();
    lastYear.setYear(lastYear.getYear() + 1900 - 1);
    orders.forEach((order) => {
        let date = new Date(order.createdAt);
        if (date >= lastYear && date <= current) {
            order.products.forEach((product) => {
                if (map.has(product.product.name)) {
                    map.set(
                        product.product.name,
                        map.get(product.product.name) + Number(product.quantity)
                    );
                } else {
                    map.set(product.product.name, Number(product.quantity));
                }
            });
        }
    });
    for (let key of map.keys()) {
        labels.push(key);
        data.push(map.get(key));
    }
    let x = {
        labels: labels.reverse(),
        datasets: [{ data: data.reverse() }],
    };
    return x;
};

export const analyzeProductDataYear = (orders) => {
    let map = new Map();
    let data = [];
    let labels = [];
    let current = new Date();
    let lastYear = new Date();
    lastYear.setYear(lastYear.getYear() + 1900 - 10);
    orders.forEach((order) => {
        let date = new Date(order.createdAt);
        if (date >= lastYear && date <= current) {
            order.products.forEach((product) => {
                if (map.has(product.product.name)) {
                    map.set(
                        product.product.name,
                        map.get(product.product.name) + Number(product.quantity)
                    );
                } else {
                    map.set(product.product.name, Number(product.quantity));
                }
            });
        }
    });
    for (let key of map.keys()) {
        labels.push(key);
        data.push(map.get(key));
    }
    let x = {
        labels: labels.reverse(),
        datasets: [{ data: data.reverse() }],
    };
    return x;
};

// By Category

export const analyzeCategoryDataWeek = (orders) => {
    let map = new Map();
    let data = [];
    let labels = [];
    let current = new Date();
    let lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    orders.forEach((order) => {
        let date = new Date(order.createdAt);
        if (date >= lastWeek && date <= current) {
            order.products.forEach((product) => {
                if (map.has(product.product.category.label)) {
                    map.set(
                        product.product.category.label,
                        map.get(product.product.category.label) +
                            Number(product.quantity)
                    );
                } else {
                    map.set(
                        product.product.category.label,
                        Number(product.quantity)
                    );
                }
            });
        }
    });
    for (let key of map.keys()) {
        labels.push(key);
        data.push(map.get(key));
    }
    if (labels.length == 0) {
        labels = ["No Sales"];
        data = [0];
    }
    let x = {
        labels: labels.reverse(),
        datasets: [{ data: data.reverse() }],
    };
    return x;
};

export const analyzeCategoryDataMonth = (orders) => {
    let map = new Map();
    let data = [];
    let labels = [];
    let current = new Date();
    let lastYear = new Date();
    lastYear.setYear(lastYear.getYear() + 1900 - 1);
    orders.forEach((order) => {
        let date = new Date(order.createdAt);
        if (date >= lastYear && date <= current) {
            order.products.forEach((product) => {
                if (map.has(product.product.category.label)) {
                    map.set(
                        product.product.category.label,
                        map.get(product.product.category.label) +
                            Number(product.quantity)
                    );
                } else {
                    map.set(
                        product.product.category.label,
                        Number(product.quantity)
                    );
                }
            });
        }
    });
    for (let key of map.keys()) {
        labels.push(key);
        data.push(map.get(key));
    }
    let x = {
        labels: labels.reverse(),
        datasets: [{ data: data.reverse() }],
    };
    return x;
};

export const analyzeCategoryDataYear = (orders) => {
    let map = new Map();
    let data = [];
    let labels = [];
    let current = new Date();
    let lastYear = new Date();
    lastYear.setYear(lastYear.getYear() + 1900 - 10);
    orders.forEach((order) => {
        let date = new Date(order.createdAt);
        if (date >= lastYear && date <= current) {
            order.products.forEach((product) => {
                if (map.has(product.product.category.label)) {
                    map.set(
                        product.product.category.label,
                        map.get(product.product.category.label) +
                            Number(product.quantity)
                    );
                } else {
                    map.set(
                        product.product.category.label,
                        Number(product.quantity)
                    );
                }
            });
        }
    });
    for (let key of map.keys()) {
        labels.push(key);
        data.push(map.get(key));
    }
    let x = {
        labels: labels.reverse(),
        datasets: [{ data: data.reverse() }],
    };
    return x;
};
