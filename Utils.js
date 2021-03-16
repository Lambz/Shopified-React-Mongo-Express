export const images = {
    productPlaceholder: require("./images/product_placeholder.gif"),
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

export function getOrderStatus(val) {
    console.log(val);
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
// export const uriToBlob = async (uri) => {
//     const response = await fetch(uri);
//     const blob = await response.blob();
//     console.log(typeof blob);
//     return blob;
// };
