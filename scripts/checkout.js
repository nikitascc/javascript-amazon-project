import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js';
import { loadCart } from "../data/cart.js";

async function loadPage() {
  try {

    // throw 'error1'

    await loadProductsFetch();

    const value = await new Promise((resolve, reject) => {
      // throw 'error2'
      loadCart(() => {
        // reject('error3');
        resolve('value3');
      });
    });
  } catch(error) {
    console.log('Ooopsie! Got an error! Try again later. (c)')
  }

  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve("Value2");
//     });
//   }),
// ]).then((values) => {
//   console.log(values);
//   renderOrderSummary();
//   renderPaymentSummary();
// });

// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve("value1");
//   });
// })
//   .then((value) => {
//     console.log(value);
//     return new Promise((resolve) => {
//       loadCart(() => {
//         resolve();
//       });
//     });
//   })
//   .then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//   });

// loadProducts(() => {
//   loadCart(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//   });
// });
