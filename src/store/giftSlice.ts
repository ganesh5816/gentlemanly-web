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
          "A timeless Louis Vuitton handbag, crafted from premium leather. The perfect luxury statement piece for her birthday.",
      },
      {
        id: 2,
        name: "Chanel Black Heels",
        price: "$3,850.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/f98abc388d6c2ba1b82b3cfbc3515a28.jpg",
        description:
          "Elegant Chanel black heels designed for sophistication and style—ideal for making her birthday celebration glamorous.",
      },
      {
        id: 3,
        name: "Tulip Bouquet",
        price: "$2,200.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/3522bd8b89cae736baefe8d6ba7ad121.jpg",
        description:
          "A fresh bouquet of tulips symbolizing love, joy, and new beginnings—an unforgettable birthday surprise.",
      },
      {
        id: 47,
        name: "Diamond Baguette Necklace",
        price: "$2,200.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/f7ed98f4aeec55b1c5d78ebaee58ae55.jpg",
        description:
          "An exquisite diamond baguette necklace that sparkles with elegance—perfect for a birthday gift she'll treasure forever.",
      },
      {
        id: 14,
        name: "Pink Dress",
        price: "$2,200.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/pinkdress.jpg",
        description:
          "A chic and elegant pink dress, crafted to make her feel radiant and special on her birthday.",
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
          "A luxurious arrangement of white roses symbolizing pure love—an anniversary gift that speaks from the heart.",
      },
      {
        id: 5,
        name: "Diamond Set",
        price: "$450.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/ee20f951c9f8c884e1ecb047970c2749.jpg",
        description:
          "A sparkling diamond jewelry set that represents eternal love—an anniversary gift to cherish forever.",
      },
      {
        id: 6,
        name: "Strathberry Bag",
        price: "$1,200.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/b9e087b293155a73fe0dd2e35e0917c7.jpg",
        description:
          "A modern yet timeless Strathberry handbag, handcrafted to perfection—an elegant anniversary surprise.",
      },
      {
        id: 70,
        name: "Pearl & Bow Heels",
        price: "$1,200.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/ca7c4a0a1a6049d66a27a3af7abe0d10.jpg",
        description:
          "Chic pearl-embellished heels with a delicate bow—graceful and romantic, perfect for an anniversary night out.",
      },
    ],
    mothersday: [
      {
        id: 7,
        name: "Rhode Skincare Kit",
        price: "$320.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/3ef124f6b3cf71f8488b4968c306e580.jpg",
        description:
          "A complete Rhode skincare kit for glowing, healthy skin—because mom deserves pampering every day.",
      },
      {
        id: 8,
        name: "Daniel Wellington Watch",
        price: "$680.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/beb342a2cce2901895c98b70f297956b.jpg",
        description:
          "A sleek and timeless Daniel Wellington watch—an elegant accessory that shows your appreciation on Mother’s Day.",
      },
      {
        id: 83,
        name: "VS Pajama Set",
        price: "$680.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/2817c3170be4a8f30a066c250b5b8fe2.jpg",
        description:
          "A soft and stylish Victoria’s Secret pajama set—perfect for mom to relax in comfort and style.",
      },
      {
        id: 28,
        name: "Mini Flower Basket",
        price: "$680.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/f851e9acdcc005350360fe728690f485.jpg",
        description:
          "A charming basket of fresh flowers—a sweet and thoughtful way to brighten mom’s Mother’s Day.",
      },
      {
        id: 228,
        name: "Chance Chanel Perfume",
        price: "$680.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/2692d472227a48127205354de013ff62.jpg",
        description:
          "The iconic Chance by Chanel fragrance—an unforgettable scent that’s as elegant and timeless as mom herself.",
      },
    ],
    apology: [
      {
        id: 9,
        name: "Pearl Set",
        price: "$150.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/pearlset.jpg",
        description:
          "A classic pearl jewelry set symbolizing sincerity and elegance—perfect for a heartfelt apology.",
      },
      {
        id: 10,
        name: "Black Chanel Bag",
        price: "$85.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/91043a2d6f77b0f18a9b23c54257558a.jpg",
        description:
          "A chic Chanel-inspired black handbag—an elegant peace offering to show you truly care.",
      },
      {
        id: 102,
        name: "White Coat",
        price: "$85.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/88a6c4cc5e01d7d520d926c780692a2e.jpg",
        description:
          "A stylish white coat that blends elegance with comfort—a thoughtful gift to mend hearts.",
      },
      {
        id: 103,
        name: "LV Black Heels",
        price: "$85.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/dcf95caed2209c87620cfb348e2e0f5e.jpg",
        description:
          "Elegant Louis Vuitton-inspired black heels—an unforgettable way to step back into her good graces.",
      },
      {
        id: 104,
        name: "Pink Flowers",
        price: "$85.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/797dcb2cb823bc1d8ee40eea8b2b440d.jpg",
        description:
          "A bright and beautiful pink flower bouquet—simple, heartfelt, and perfect for saying ‘I’m sorry.’",
      },
    ],
    datenight: [
      {
        id: 11,
        name: "LV Black Heels",
        price: "$250.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/blackshoe.jpg",
        description:
          "Sophisticated black Louis Vuitton heels—elevate her style for a romantic date night.",
      },
      {
        id: 12,
        name: "Red Dress",
        price: "$180.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/dressred.jpg",
        description:
          "A stunning red evening dress designed to turn heads—perfect for a passionate night out.",
      },
      {
        id: 122,
        name: "Birkin Kelly",
        price: "$180.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/0e6b825617352f18b8dac2443142025d.jpg",
        description:
          "An iconic Birkin Kelly handbag—a luxurious companion for an unforgettable date night.",
      },
      {
        id: 112,
        name: "Diamond Ring",
        price: "$180.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/anniring.jpg",
        description:
          "A dazzling diamond ring—romantic, timeless, and the ultimate symbol of love on date night.",
      },
      {
        id: 192,
        name: "Red Roses",
        price: "$180.00",
        image:
          "https://gentemanly-web.s3.us-east-1.amazonaws.com/assets/redrose.jpg",
        description:
          "A bouquet of classic red roses—the ultimate expression of romance for your evening together.",
      },
    ],
    justbecause: [
      {
        id: 13,
        name: "Surprise Gift Box",
        price: "$75.00",
        image: "secondshoes", // Replace with gift box image
        description:
          "A curated surprise gift box filled with delightful treasures—perfect for brightening her day, just because.",
      },
      {
        id: 14,
        name: "Personalized Photo Album",
        price: "$95.00",
        image: "dress", // Replace with album image
        description:
          "A personalized photo album filled with cherished memories—a sentimental gift to show love any day.",
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
