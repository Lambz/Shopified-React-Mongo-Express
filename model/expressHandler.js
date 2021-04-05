// // Firebase App (the core Firebase SDK)
import firebase from "firebase/app";

// //Firebase services
import "firebase/auth";
import { generateID } from "../Utils.js";
// Fetch
import "isomorphic-fetch";
// // imports
import {
    User,
    Seller,
    Order,
    productConverter,
    userConverter,
    categoryConverter,
    sellerConverter,
    Product,
    Category,
} from "./models.js";
// import Order from "./models";

// global variables

var codes = Object.freeze({
    NULL_VALUE: -5,
    NULL_OBJECT: -10,
    INSERTION_SUCCESS: 3,
    INSERTION_FAILIURE: -3,
    UPDATE_SUCCESS: 1,
    UPDATE_FAILIURE: -1,
    NOT_FOUND: 404,
    FETCH_FAILURE: -300,
    FETCH_SUCCESS: 300,
    LOGIN_SUCCESS: 400,
    LOGIN_FAILIURE: -400,
    LOGOUT_SUCCESS: 102,
    LOGOUT_FAILIURE: -102,
    DELETION_FAILIURE: 100,
});

// config token for firebase access
var firebaseConfig = {
    apiKey: "AIzaSyBNBlPV5qBRTtnpz-5URhrHEMpjRxW1HnU",
    authDomain: "shopified-11a20.firebaseapp.com",
    databaseURL: "https://shopified-11a20-default-rtdb.firebaseio.com/",
    projectId: "shopified-11a20",
    storageBucket: "shopified-11a20.appspot.com",
    messagingSenderId: "490634575459",
    appId: "1:490634575459:web:0e4c2db29bdb6e075a4256",
    measurementId: "G-80PJX71W15",
};

var app = null;
var db = null;
let mCurrentUser = null;
let mUserUid = null;
const API_URL = "https://shopified.herokuapp.com/";

var obs = new observable(mCurrentUser);

function observable(v) {
    this.value = v;

    this.valueChangedCallback = null;

    this.setValue = function (v) {
        if (this.value != v) {
            this.value = v;
            mCurrentUser = v;
            this.raiseChangedEvent(v);
        }
    };

    this.getValue = function () {
        return this.value;
    };

    this.onChange = function (callback) {
        this.valueChangedCallback = callback;
    };

    this.raiseChangedEvent = function (v) {
        if (this.valueChangedCallback) {
            this.valueChangedCallback(v);
        }
    };
}

// Global initialization for firebase
function initializeDB() {
    if (!firebase.apps.length) {
        app = firebase.initializeApp(firebaseConfig);
    } else {
        app = firebase.app();
    }
    // db = firebase.firestore(app);
    console.log("DB initialized!");
}

//
// MARK: User Account Functions for User and Seller
//

// Signup function

function signupWithEmail(user, callback, uiCallback) {
    if (!user) {
        throw new Error(`Signup Error! Error code: ${codes.NULL_OBJECT}`);
        return;
    }
    // [START auth_signup_password]
    firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
            // Signed in
            mUserUid = userCredential.user.uid;
            // sessionStorage.setItem("uid", loggedUser);
            return callback(user, uiCallback);
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            throw new Error(
                `Firebase Signup Error! Error code: ${errorCode}\n Error Message: ${errorMessage}`
            );
        });
    // [END auth_signup_password]
}

// Sign-in Function

function signInWithEmail(email, password, callback) {
    if (!email || !password) {
        throw new Error(`Signin Error! Error code: ${codes.NULL_VALUE}`);
    }
    // [START auth_signin_password]
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            mUserUid = userCredential.user.uid;
            // sessionStorage.setItem("uid", loggedUser);
            // return callback(uiCallback);
            callback();
        });
    // .catch((error) => {
    //     throw new Error(
    //         `Firebase Signin Error! Error code: ${error.code}\nError Message: ${error.message}`
    //     );
    // });
    // [END auth_signin_password]
}

// Sign out function

function signOutUserFromFirebase(uiCallback) {
    // sessionStorage.setItem("uid", null);
    firebase
        .auth()
        .signOut()
        .then(() => {
            console.log("Logged out!");
            obs.setValue(null);
            mUserUid = null;
            uiCallback(codes.LOGOUT_SUCCESS);
            return codes.LOGOUT_SUCCESS;
        })
        .catch((error) => {
            return codes.LOGOUT_FAILIURE;
        });
}

// Password Reset Function

function sendPasswordReset(email) {
    firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
            showResetPasswordPromt();
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            throw new Error(
                `Error sending reset password email! Error Code: ${errorCode}\nErrorMessage: ${errorMessage}`
            );
        });
}

// User Data Insertion Functions

function createUserObjectInDB(user, uiCallback) {
    if (!user) {
        throw new Error(
            `User Insertion Error! Error code: ${codes.NULL_OBJECT}`
        );
    }
    let userData = User.convertToJSON(user);
    // additional paramter required
    userData[id] = getUIDFromFirebase();
    postData(`${API_URL}user/add`, userData)
        .then((data) => {
            console.log(data);
            uiCallback(codes.INSERTION_SUCCESS);
        })
        .catch((err) => {
            console.log(`Error: ${err}`);
            uiCallback(codes.INSERTION_FAILIURE);
        });
}

function createSellerObjectInDB(user, uiCallback) {
    if (!user) {
        throw new Error(
            `Seller Insertion Error! Error code: ${codes.NULL_OBJECT}`
        );
    }
    let sellerData = Seller.convertToJSON(user);
    sellerData[id] = getUIDFromFirebase();
    postData(`${API_URL}seller/add`, sellerData)
        .then((data) => uiCallback(codes.INSERTION_SUCCESS))
        .catch((err) => uiCallback(codes.INSERTION_FAILIURE));
}

// User Query functions

function getUserDetailsFromDB(uiCallback) {
    let uid = getUIDFromFirebase();
    if (uid) {
        fetch(`${API_URL}user/${uid}`)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                uiCallback(data);
            })
            .catch((err) => uiCallback(codes.FETCH_FAILURE));
    } else {
        uiCallback(codes.NOT_FOUND);
    }
}

function getSellerDetailsFromDB(uiCallback) {
    let uid = getUIDFromFirebase();
    if (uid) {
        fetch(`${API_URL}seller/${uid}`)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                uiCallback(data);
            })
            .catch((err) => uiCallback(codes.FETCH_FAILURE));
    } else {
        uiCallback(codes.NOT_FOUND);
    }
}

//  User details Update Functions

function updateDBPassword(password, callback) {
    let user = firebase.auth().currentUser;
    // console.log(user);
    user.updatePassword(password).then(function () {
        callback();
        return codes.UPDATE_SUCCESS;
    });
    // .catch(function(error) {
    //   throw new Error(`Password updation Error! Error code: ${error.errorCode}\nError Message: ${error.errorMessage}`);
    //   return codes.UPDATE_FAILIURE;
    // });
}

function updateDBEmail(email) {
    let user = firebase.auth().currentUser;

    user.updateEmail(email)
        .then(function () {
            return codes.UPDATE_SUCCESS;
        })
        .catch(function (error) {
            throw new Error(
                `Email updation failiure! Error code: ${error.errorCode}\nError Message: ${error.errorMessage}`
            );
            return codes.UPDATE_FAILIURE;
        });
}

//
// MARK: DB CRUD transactions functions
//

// Insertion functions

function insertProductInDB(product, seller, uiCallback) {
    if (!product) {
        throw new Error(
            `Product insertion error! Error code: ${codes.NULL_OBJECT}`
        );
    }
    let productData = Product.convertToJSON(product);
    postData(`${API_URL}products/add`, productData)
        .then((response) => {
            uiCallback(codes.INSERTION_SUCCESS);
        })
        .catch((err) => uiCallback(codes.INSERTION_FAILIURE));
}

// ADD FROM HERE
// FUNTIONS TO BE ADDED FROM HERE
// LOOK FOR POST DATA METHOD AT THE END FOR POST OPN
function insertCategoryOrSubcategoryInDB(category) {
    if (!category) {
        throw new Error(
            `Category Insertion Error! Error code: ${codes.NULL_OBJECT}`
        );
    }
    const categoryData = Category.convertToJSON(category);
    categoryData.subcategories.forEach((subcategory) => {});
}

function insertOrderInDB(order, uiCallback) {
    let reference = db.collection("orders").doc(order.id);
    reference.set(Object.assign({}, order)).then(() => {
        uiCallback();
    });
    // .catch((error) => {
    //     console.log(`Order insertion error! Error code: ${error.code}\nError Message: ${error.message}`);
    // });
}

// Update functions

function updateUserInDB(user, uiCallback) {
    if (!user) {
        throw new Error(
            `User Updation Error! Error code: ${codes.NULL_OBJECT}`
        );
    }
    db.collection("users")
        .doc(user.id)
        .withConverter(userConverter)
        .set(user)
        .then(() => {
            console.log("User Added!");
            uiCallback();
            return codes.INSERTION_SUCCESS;
        })
        .catch((error) => {
            console.log(
                `User insertion error! Error code: ${error.errorCode}\nError Messsage: ${error.errorMessage}`
            );
            uiCallback();
            return codes.INSERTION_FAILIURE;
        });
}

// Deletion functions

function deleteProductFromDB(productID, seller, uiCallback) {
    if (!productID) {
        throw new Error(
            `Product deletion error! Error code: ${codes.NULL_OBJECT}`
        );
    }
    db.collection("products")
        .doc(productID)
        .delete()
        .then(() => {
            seller.removeProduct(productID);
            createSellerObjectInDB(seller, uiCallback);
        });
    // .catch((error) => {
    //     console.log(`Product deletion error! Error code: ${error.errorCode}\nError Messsage: ${error.errorMessage}`);
    //     return codes.INSERTION_FAILIURE;
    // });
}

function deleteUserFromDB(uiCallback) {}

function deleteSellerFromDB() {
    db.collection("sellers")
        .doc(sessionStorage.getItem("uid"))
        .delete()
        .then(() => {
            signOutUserFromFirebase(uiCallback);
        })
        .catch((error) => {
            console.log(
                `Error while deleting account!Error code: ${error.code}\nError Message: ${error.message}`
            );
            uiCallback(codes.DELETION_FAILIURE);
        });
}

function deleteAllCategoriesFromDB(callback) {
    let reference = db.collection("categories");
    reference.get().then((result) => {
        result.forEach((element) => element.ref.delete());
        callback();
    });
}

// Fetch functions

// fetches all categories and subcategories
function fetchCategoriesAndSubcategoriesFromDB(uiCallback) {
    let reference = db.collection("categories");
    let resultArray = [];
    reference
        .withConverter(categoryConverter)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.exists) {
                    resultArray.push(doc.data());
                } else {
                    return codes.NOT_FOUND;
                }
            });
            uiCallback(resultArray);
        })
        .catch((error) => {
            console.log(
                `Category fetch error! Error code: ${error.errorCode}\nError Messsage: ${error.errorMessage}`
            );
            uiCallback(codes.FETCH_FAILURE);
            return codes.FETCH_FAILURE;
        });
}

// fetches the products by product id
function fetchProductByIdInDB(productID, uiCallback) {
    let reference = db.collection("products");
    let query = reference.where("id", "==", productID);
    let productsArray = [];
    query
        .withConverter(productConverter)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                productsArray.push(doc.data());
            });
            uiCallback(productsArray[0]);
        });
    // .catch((error) => {
    //     console.log(`Product fetch error! Error code: ${error.errorCode}\nError Messsage: ${error.errorMessage}`);
    //     return codes.FETCH_FAILURE;
    // })
}

// fetches all products
function fetchAllProductsInDB(uiCallback) {
    // console.log("uiCallback:", uiCallback);
    let reference = db.collection("products");
    let productsArray = [];
    reference
        .withConverter(productConverter)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                productsArray.push(doc.data());
            });
            uiCallback(productsArray);
        });
    // .catch((error) => {
    //     console.log(
    //         `Product fetch error! Error code: ${error.errorCode}\nError Messsage: ${error.errorMessage}`
    //     );
    //     return codes.FETCH_FAILURE;
    // });
}
// fetches all products for a category
function fetchProductsForCategoryInDB(category, uiCallback) {
    let reference = db.collection("products");
    let query = reference.where("category", "==", category);
    let productsArray = [];
    query
        .withConverter(productConverter)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                productsArray.push(doc.data());
            });
            uiCallback(productsArray);
        })
        .catch((error) => {
            console.log(
                `Product fetch error! Error code: ${error.errorCode}\nError Messsage: ${error.errorMessage}`
            );
            return codes.FETCH_FAILURE;
        });
}

// fetches all product for a subcategory
function fetchProductsForSubCategoryFromDB(subcategory, uiCallback) {
    let reference = db.collection("products");
    let query = reference.where("subcategory", "==", subcategory);
    let productsArray = [];
    query
        .withConverter(productConverter)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                productsArray.push(doc.data());
            });
            uiCallback(productsArray);
        })
        .catch((error) => {
            console.log(
                `Product fetch error! Error code: ${error.errorCode}\nError Messsage: ${error.errorMessage}`
            );
            return codes.FETCH_FAILURE;
        });
}
// fetches category object for category name
function fetchCategoryDataFromDB(category, callback) {
    let reference = db.collection("categories").doc(category);
    reference
        .withConverter(categoryConverter)
        .get()
        .then((doc) => {
            callback(doc.data());
            return codes.FETCH_SUCCESS;
        })
        .catch((error) => {
            console.log(
                `Category fetch error! Error code: ${error.code}\nError Message: ${error.message}`
            );
            return codes.FETCH_FAILURE;
        });
}

// fetch sold products for seller

function fetchOrdersFromDB(includeCancelled, callback) {
    let query = db.collection("orders").orderBy("orderDate", "desc");

    if (!includeCancelled) {
        query.where("status", "!=", 4);
    }

    query.get().then((querySnapshot) => {
        let orderArray = [];
        querySnapshot.forEach((doc) => {
            // console.log(typeof Order);
            // console.log("doc.data():", doc.data());
            orderArray.push(Order.convertToOrder(doc.data()));
        });
        callback(orderArray);
    });
}

function fetchAllProductsForSellerInDB(sellerID, uiCallback) {
    let reference = db.collection("products");
    let query = reference.where("seller_id", "==", sellerID);
    query
        .withConverter(productConverter)
        .get()
        .then((querySnapshot) => {
            let productsArray = [];
            querySnapshot.forEach((doc) => {
                productsArray.push(doc.data());
            });
            uiCallback(productsArray);
        });
}

function fetchUserByNameFromDB(name, callback) {
    let reference = db.collection("users");
    let query = reference.where("name", "==", name);
    query.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            callback(User.convertToUser(doc.data()));
        });
    });
}

// Storage functions

// insert image

function insertImageInDB(productID, index, fileData, callback) {
    // console.log("insertImageInDB");
    let storageRef = firebase
        .storage()
        .ref()
        .child(`${generateID(30)}.jpg`);
    storageRef.put(fileData).then((snapshot) => {
        // console.log(snapshot);
        snapshot.ref.getDownloadURL().then((url) => callback(url));
        // callback(snapshot.errorCode.);
    });
    // let storageRef = firebase.storage().ref().child(`asd.jpg`);
    // storageRef.put(fileData).then((snapshot) => {
    //     // console.log(snapshot);
    //     snapshot.ref.getDownloadURL().then((url) => callback(url));
    //     // callback(snapshot.errorCode.);
    // });
}

function fetchImageFromDB(productID, callback) {
    let storageRef = firebase.storage().ref().child(`${productID}.jpg`);
    storageRef.getDownloadURL().then((url) => {
        callback(url);
    });
}

function fetchSubcategoryImagesFromDB(subcategories, uiCallback) {
    let requests = [];
    let images = [];
    let ref = db.collection("products");
    subcategories.forEach((subcategory) => {
        requests.push(
            ref
                .where("subcategory", "==", subcategory)
                .limit(1)
                .withConverter(productConverter)
                .get()
        );
    });
    Promise.all(requests)
        .then((responses) => {
            responses.forEach((response) => {
                response.forEach((doc) => {
                    let productObj = doc.data();
                    // console.log("response", productObj.images[0]);
                    images.push(productObj.images[0]);
                });
            });
            uiCallback(images);
        })
        .catch((error) => {
            console.log("error while fetching images");
        });
}

function getUIDFromFirebase() {
    return firebase.auth().currentUser.uid;
}

async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export {
    codes,
    initializeDB,
    signupWithEmail,
    signInWithEmail,
    sendPasswordReset,
    createUserObjectInDB,
    createSellerObjectInDB,
    getUserDetailsFromDB,
    getSellerDetailsFromDB,
    updateDBPassword,
    updateDBEmail,
    insertProductInDB,
    insertCategoryOrSubcategoryInDB,
    fetchCategoriesAndSubcategoriesFromDB,
    fetchProductsForSubCategoryFromDB,
    insertOrderInDB,
    updateUserInDB,
    deleteProductFromDB,
    deleteUserFromDB,
    deleteSellerFromDB,
    deleteAllCategoriesFromDB,
    fetchProductByIdInDB,
    fetchAllProductsInDB,
    fetchProductsForCategoryInDB,
    fetchCategoryDataFromDB,
    fetchOrdersFromDB,
    fetchAllProductsForSellerInDB,
    fetchUserByNameFromDB,
    insertImageInDB,
    fetchImageFromDB,
    fetchSubcategoryImagesFromDB,
    obs,
    signOutUserFromFirebase,
    mUserUid,
    getUIDFromFirebase,
};
