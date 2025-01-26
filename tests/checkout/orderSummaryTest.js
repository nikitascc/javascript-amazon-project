import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe("test suite: renderOrderSummary", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  // const deliveryOptionId1 = "1";
  // const deliveryOptionId2 = "2";
  // const deliveryOptionId3 = "3";

  beforeEach(() => {
    spyOn(localStorage, "setItem");

    document.querySelector(".js-test-container").innerHTML = `
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>
    <div class="js-checkout-header"></div>`;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });
    loadFromStorage();

    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("displays the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 2");

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 1");
  });
  it("removes a product", () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });
  it("displays a product name correctly", () => {
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toContain("Black and Gray Athletic Cotton Socks - 6 Pairs");
  });
  it("displays a product price correctly", () => {
    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toContain("$10.90");
  });

  it("updates the delivery option correctly", () => {
    document
      .querySelector(
        `.js-delivery-product-id-${productId1}-delivery-option-id-3`
      )
      .click();
    expect(
      document.querySelector(
        `.js-delivery-input-product-id-${productId1}-delivery-option-id-3`
      ).checked
    ).toEqual(true);
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryOptionId).toEqual("3");
    expect(document.querySelector(`.js-shipping-price`).innerText).toContain(
      "$14.98"
    );
    expect(document.querySelector(`.js-total-price`).innerText).toContain(
      "$63.50"
    );
  });
});