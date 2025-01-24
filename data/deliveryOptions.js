import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs(); // Get today's date
  let totalDays = 0; // Counter for total days (including weekends)
  let workDays = 0; // Counter for weekdays only

  // Loop until we've counted enough weekdays
  while (workDays < deliveryOption.deliveryDays) {
    const currentDay = today.add(totalDays, 'day').format('dddd'); // Get the day of the week

    // Check if the current day is a weekday (not Saturday or Sunday)
    if (currentDay !== 'Saturday' && currentDay !== 'Sunday') {
      workDays++; // Increment weekday counter
    }

    totalDays++; // Always increment the total days counter
  }

  // Calculate the delivery date by adding totalDays to today's date
  let deliveryDate = today.add(totalDays, 'day');

  // Adjust for weekends in the final delivery date
  while (deliveryDate.format('dddd') === 'Saturday' || deliveryDate.format('dddd') === 'Sunday') {
    deliveryDate = deliveryDate.add(1, 'day'); // Skip weekends
  }

  const dateString = deliveryDate.format('dddd, MMMM D'); // Format the date
  return dateString;
}