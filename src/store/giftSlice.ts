// store/giftSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventGifts: {
    birthday: [
      {
        id: 1,
        name: "Louis Vuitton: Capucines MM",
        price: "$5,250.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/blackbag.jpg",
        description:
          "Luxurious designer heeled sandals perfect for elegant evening occasions. Crafted with premium materials for ultimate sophistication.",
      },
      {
        id: 2,
        name: "Chanel Black Heels",
        price: "$3,850.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/f98abc388d6c2ba1b82b3cfbc3515a28.jpg",
        description:
          "Stunning diamond tennis necklace that sparkles with every movement. Perfect for making her birthday unforgettable.",
      },
      {
        id: 3,
        name: "Tulip Bouquet",
        price: "$2,200.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/3522bd8b89cae736baefe8d6ba7ad121.jpg",
        description:
          "Elegant evening dress crafted from the finest materials. Perfect for celebrating her special day in style.",
      },
      {
        id: 47,
        name: "Diamond Baguette Necklace",
        price: "$2,200.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/f7ed98f4aeec55b1c5d78ebaee58ae55.jpg",
        description:
          "Elegant evening dress crafted from the finest materials. Perfect for celebrating her special day in style.",
      },
      {
        id: 14,
        name: "Pink Dress",
        price: "$2,200.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/pinkdress.jpg",
        description:
          "Elegant evening dress crafted from the finest materials. Perfect for celebrating her special day in style.",
      },
    ],
    anniversary: [
      {
        id: 4,
        name: "White Roses",
        price: "$8,500.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/roses.jpg",
        description:
          "Timeless Swiss-made watch symbolizing your eternal love. A perfect anniversary gift that will last forever.",
      },
      {
        id: 5,
        name: "Diamond Set",
        price: "$450.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/ee20f951c9f8c884e1ecb047970c2749.jpg",
        description:
          "Exquisite fragrance collection with romantic notes. Perfect for commemorating your special anniversary.",
      },
      {
        id: 6,
        name: "Strathberry Bag",
        price: "$1,200.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/b9e087b293155a73fe0dd2e35e0917c7.jpg", // Replace with actual earring image
        description:
          "Elegant pearl drop earrings that complement any anniversary celebration outfit.",
      },
      {
        id: 70,
        name: "Pearl & Bow Heels",
        price: "$1,200.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/ca7c4a0a1a6049d66a27a3af7abe0d10.jpg", // Replace with actual earring image
        description:
          "Elegant pearl drop earrings that complement any anniversary celebration outfit.",
      },
    ],
    mothersday: [
      {
        id: 7,
        name: " Rhode Skincare Kit",
        price: "$320.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/3ef124f6b3cf71f8488b4968c306e580.jpg", // Replace with spa set image
        description:
          "Complete spa experience at home. Perfect for showing mom how much you care about her wellbeing.",
      },
      {
        id: 8,
        name: "Daniel Wellington Watch",
        price: "$680.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/beb342a2cce2901895c98b70f297956b.jpg", // Replace with scarf image
        description:
          "Ultra-soft cashmere scarf in her favorite color. A warm embrace she can wear anywhere.",
      },
      {
        id: 83,
        name: "VS Pajama Set",
        price: "$680.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/2817c3170be4a8f30a066c250b5b8fe2.jpg", // Replace with scarf image
        description:
          "Ultra-soft cashmere scarf in her favorite color. A warm embrace she can wear anywhere.",
      },
      {
        id: 28,
        name: "Mini Flower Basket",
        price: "$680.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/f851e9acdcc005350360fe728690f485.jpg", // Replace with scarf image
        description:
          "Ultra-soft cashmere scarf in her favorite color. A warm embrace she can wear anywhere.",
      },
      {
        id: 228,
        name: "Chance Chanel Perfumet",
        price: "$680.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/2692d472227a48127205354de013ff62.jpg", // Replace with scarf image
        description:
          "Ultra-soft cashmere scarf in her favorite color. A warm embrace she can wear anywhere.",
      },
    ],
    apology: [
      {
        id: 9,
        name: "Pearl Set",
        price: "$150.00",
        image: "perfume", // Replace with flower image
        description:
          "Beautiful arrangement of her favorite flowers with a heartfelt apology note.",
      },
      {
        id: 10,
        name: "Black Chanel Bag",
        price: "$85.00",
        image: "dress", // Replace with chocolate image
        description:
          "Premium chocolate collection to sweeten your apology and show you care.",
      },
      {
        id: 102,
        name: "White Coat",
        price: "$85.00",
        image: "dress", // Replace with chocolate image
        description:
          "Premium chocolate collection to sweeten your apology and show you care.",
      },
      {
        id: 10,
        name: "LV Black Heels",
        price: "$85.00",
        image: "dress", // Replace with chocolate image
        description:
          "Premium chocolate collection to sweeten your apology and show you care.",
      },
      {
        id: 10,
        name: "Pink Flowers",
        price: "$85.00",
        image: "dress", // Replace with chocolate image
        description:
          "Premium chocolate collection to sweeten your apology and show you care.",
      },
    ],
    datenight: [
      {
        id: 11,
        name: "LV Black Heels",
        price: "$250.00",
        image: "watch", // Replace with wine image
        description:
          "Romantic dinner package with wine pairing for an unforgettable date night experience.",
      },
      {
        id: 12,
        name: "Red Dress",
        price: "$180.00",
        image: "necklace", // Replace with ticket image
        description:
          "Premium tickets to the hottest show in town for a magical date night together.",
      },
      {
        id: 122,
        name: "Theatre Tickets",
        price: "$180.00",
        image: "necklace", // Replace with ticket image
        description:
          "Premium tickets to the hottest show in town for a magical date night together.",
      },
      {
        id: 112,
        name: "Diamond Ring",
        price: "$180.00",
        image: "necklace", // Replace with ticket image
        description:
          "Premium tickets to the hottest show in town for a magical date night together.",
      },
      {
        id: 192,
        name: "Red Roses",
        price: "$180.00",
        image: "necklace", // Replace with ticket image
        description:
          "Premium tickets to the hottest show in town for a magical date night together.",
      },
    ],
    justbecause: [
      {
        id: 13,
        name: "Surprise Gift Box",
        price: "$75.00",
        image: "secondshoes", // Replace with gift box image
        description:
          "Curated surprise box filled with little things that remind you of her smile.",
      },
      {
        id: 14,
        name: "Personalized Photo Album",
        price: "$95.00",
        image: "dress", // Replace with album image
        description:
          "Beautiful photo album filled with your favorite memories together.",
      },
    ],
  },
  selectedEvent: null,
  selectedGifts: [],
};

const giftSlice = createSlice({
  name: "gifts",
  initialState,
  reducers: {
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
  },
});

export const { setSelectedEvent } = giftSlice.actions;

export default giftSlice.reducer;

// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import giftReducer from "./giftSlice";

export const store = configureStore({
  reducer: {
    gifts: giftReducer,
    // Add other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
