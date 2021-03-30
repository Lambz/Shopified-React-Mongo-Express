// Interface functions implemented for front-end scripts

import { Category } from "./models.js";

// // Firebase App (the core Firebase SDK)
import firebase from "firebase/app";

// //Firebase services
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { generateID } from "../Utils.js";


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
    db = firebase.firestore(app);
    console.log("DB initialized!");
}

initializeDB();

//
// MARK: Authentication Methods
//

// Signup functions for User and Seller
// Creates the user/ seller object in collection
// 1. args:
// - user: user object
// - isUser: boolean for checking if user or seller signing up
// - uiCallback: to call once user has signed up and Object created (or error), to update UI
// 2. returns:
// 3. throws:
// - No

function signUp(user, isUser, uiCallback) {
    let functionToCall;
    if (isUser) functionToCall = createUserObjectInDB;
    else functionToCall = createSellerObjectInDB;
    try {
        return signupWithEmail(user, functionToCall, uiCallback);
    } catch (error) {
        return codes.NULL_OBJECT;
    }
}

// Signin function for user and seller
// 1. args:
// - email: user email
// - password: user password
// - isUser: boolean for checking if user or seller signing in
// - uiCallback: to update UI once sign-in done and user details fetched (or error)
// 2. returns:
// 3. throws
// - No

function signIn(email, password, isUser, uiCallback) {
    signInWithEmail(email, password, () => {
        getUserDetails(isUser, uiCallback);
    });
}




// Function to update user data
// 1. args:
// - isUser: boolean, checks weather user or seller
// - user: user/seller object
// - uiCallback: callback function for updating UI
// 2. returns:
// 3. throws
// - No

function updateUser(isUser, user, uiCallback) {
    if (isUser) {
        createUserObjectInDB(user, uiCallback);
    } else {
        createSellerObjectInDB(user, uiCallback);
    }
}

// Function to update user or seller passoword

function updatePassword(isUser, user, newPassword, uiCallback) {
    let functionToCall;
    if (isUser) {
        functionToCall = createUserObjectInDB;
    } else {
        functionToCall = createSellerObjectInDB;
    }
    updateDBPassword(newPassword, () => {
        user.password = newPassword;
        functionToCall(user, uiCallback);
    });
}

// Signout function for users
// 1. args:
// - isUser: boolean, check weather the user or seller logging out
// - uiCallback: to update UI after logged out or error in logging out
// 2. returns
// - LOGIN_SUCCESS: for successful logout
// - LOGIN_FAILURE: for logout errors

function signOut(uiCallback) {
    return signOutUserFromFirebase(uiCallback);
}



// Firebase auth implementation functions
// DB handled by express

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


//
// MARK: CRUD operations for products and categories
//

// Query Functions

// Function to fetch all categories and subcategories from DB
// 1. args:
// - uiCallback: callback for updating UI after data has been fetched
// 2. throws:
// No
// Note: uiCallback is provided with an array if query is successfully executed
// FETCH_FAILURE if error

function fetchAllCategoriesAndSubcategories(uiCallback) {
    fetchCategoriesAndSubcategoriesFromDB(uiCallback);
}

// Function to fetch the product by product id
// 1. args

function fetchProductById(productID, uiCallback) {
    fetchProductByIdInDB(productID, uiCallback);
}

function fetchAllProductsForSubcategory(subcategoryID, uiCallback) {
    fetchProductsForSubCategoryFromDB(subcategoryID, uiCallback);
}

function fetchAllProductsForCategory(categoryID, uiCallback) {
    fetchProductsForCategoryInDB(categoryID, uiCallback);
}

function fetchAllProducts(uiCallback) {
    // console.log("fetchAllProducts:", uiCallback);
    fetchAllProductsInDB(uiCallback);
}

// Insertion Functions

// function to upload images
// 1. args:
// - product: product id for image
// - image: BLOB data for images
// - uiCallback: for updating ui, could be non-ui updating too

function insertImage(product, images, uiCallback) {
    //  insert images
    // console.log(images);
    var downloadedUrls = [];
    for (let i = 0; i < images.length; i++) {
        console.log(i);
        insertImageInDB(product, i, images[i], (url) => {
            downloadedUrls.push(url);
            console.log(url);
            if (downloadedUrls.length == images.length) {
                uiCallback(downloadedUrls);
            }
        });
    }
}

// Function to insert product
// inserts product to product and seller collection
// 1. args:
// - product: product object
// - seller: seller object (w/o the new product added)
// - updateCategory: Boolean, true if new category or subcategory added
// - uiCallback: callback function to update UI

function insertProduct(product, seller, updateCategory, uiCallback) {
    if (updateCategory) {
        getCategoryObjectAndUpdateCategory(
            product.category,
            product.subcategory
        );
    }
    try {
        return insertProductInDB(product, seller, uiCallback);
    } catch (error) {
        return codes.INSERTION_FAILIURE;
    }
}

// fetches current logged in user details
// 1. args:
// - isUser: boolean, specifies weather user or seller logged in
// - uiCallback: for ui updation after fetching details
//

function getUserDetails(isUser, uiCallback) {
    if (isUser) {
        return getUserDetailsFromDB(uiCallback);
    } else {
        return getSellerDetailsFromDB(uiCallback);
    }
}

// Helper function for insert product to update category if new category or subcategory added
// by user, Not called directly
function getCategoryObjectAndUpdateCategory(categoryName, subcategoryName) {
    return fetchCategoryDataFromDB(categoryName, (categoryObject) => {
        try {
            if (categoryObject) {
                console.log(categoryObject);
                categoryObject.subcategories.push(subcategoryName);
                insertCategoryOrSubcategoryInDB(categoryObject);
            } else {
                let category = new Category(categoryName, [subcategoryName]);
                insertCategoryOrSubcategoryInDB(category);
            }
        } catch (error) {
            console.log(codes.FETCH_FAILURE);
        }
    });
}

// Deletion Functions

// Function to delete a product

function deleteProduct(productID, seller, uiCallback) {
    deleteProductFromDB(productID, seller, uiCallback);
}

//
// Order Functions
//
function placeOrder(order, uiCallback) {
    insertOrderInDB(order, uiCallback);
}
// 1. args:
// - order: order object
//
function updateOrderStatus(order, newStatus, uiCallback) {
    // console.log(1);
    order.status = newStatus;
    // console.log("updated order", order);
    insertOrderInDB(order, uiCallback);
}

// Function to return all orders for a seller
// 1. args:
// - sellerID: sellerID of seller
// - includeCancelled: boolean, specify weather to include cancelled orders

function fetchOrdersForSeller(sellerID, includeCancelled, uiCallback) {
    fetchOrdersFromDB(includeCancelled, (orders) => {
        // console.log(orders);
        let orderArray = [];
        for (let i = 0; i < orders.length; i++) {
            let val = orders[i].products;
            for (let j = 0; j < val.length; j++) {
                if (val[j].seller_id == sellerID) {
                    orderArray.push(orders[i]);
                    break;
                }
            }
        }
        uiCallback(orderArray);
    });
}

// Function to delete user
// 1. args:
// - isUser: boolean, specifies if user or seller
// - uiCallback: function to updated UI once operation complete
// 2. throws
// - No
function deleteUser(isUser, uiCallback) {
    if (isUser) {
        deleteUserFromDB(uiCallback);
    } else {
        deleteSellerFromDB(uiCallback);
    }
}

// Function returns the products array in descending order of most sold products
function fetchMostSoldProducts(uiCallback) {
    fetchOrdersFromDB(true, (orderArray) => {
        // console.log("orderArray", orderArray);
        let products = [];
        let productsArray = orderArray.map((o) => o.products);

        for (let i = 0; i < productsArray.length; i++) {
            let val = productsArray[i];
            val.forEach((product) => {
                products.push(product);
            });
        }

        const result = Array.from(
            products.reduce(
                (map, item) => (map.get(item.id).count++, map),
                new Map(
                    products.map((o) => [
                        o.id,
                        Object.assign({}, o, { count: 0 }),
                    ])
                )
            ),
            ([k, o]) => o
        ).sort((a, b) => b.count - a.count);

        uiCallback(result);
    });
}

function fetchAllProductsForSeller(sellerID, uiCallback) {
    fetchAllProductsForSellerInDB(sellerID, uiCallback);
}

function getRandomProductFromDB(uiCallback) {
    fetchAllProductsInDB((orders) => {
        uiCallback(orders[Math.floor(Math.random() * orders.length)]);
    });
}

function fetchUserByName(orderID, orderStatus, userName, uiCallback) {
    fetchUserByNameFromDB(userName, (user) => {
        user.orders.forEach((order) => {
            if (order.id == orderID) {
                order.status = orderStatus;
            }
        });
        updateUserInDB(user, uiCallback);
    });
}

function updateCategories(categories, uiCallback) {
    deleteAllCategoriesFromDB(() => {
        console.log("categories deleted");
        let promises = [];
        categories.forEach((category) => {
            promises.push(insertCategoryOrSubcategoryInDB(category));
        });
        Promise.all(promises).then(uiCallback);
    });
}

function fetchSubcategoriesImage(subcategoryArray, uiCallback) {
    fetchSubcategoryImagesFromDB(subcategoryArray, uiCallback);
}

function getUID() {
    return getUIDFromFirebase();
}

export {
    signUp,
    signIn,
    updateUser,
    updatePassword,
    signOut,
    fetchAllCategoriesAndSubcategories,
    fetchProductById,
    fetchAllProductsForSubcategory,
    fetchAllProductsForCategory,
    fetchAllProducts,
    insertImage,
    insertProduct,
    getUserDetails,
    getCategoryObjectAndUpdateCategory,
    deleteProduct,
    placeOrder,
    updateOrderStatus,
    fetchOrdersForSeller,
    deleteUser,
    fetchMostSoldProducts,
    fetchAllProductsForSeller,
    getRandomProductFromDB,
    fetchUserByName,
    updateCategories,
    fetchSubcategoriesImage,
    getUID,
    codes
};
