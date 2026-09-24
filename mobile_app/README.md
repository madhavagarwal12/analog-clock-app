# Bakingo Mobile Application 🎂📱

A mobile app built for **Bakingo Artisanal Confectionery System** (Jaipur). It captures the "Warm Minimalism" luxury aesthetic and delivers a native-grade mobile experience with PWA capabilities.

---

## ✨ Features & Architecture

### 1. 📱 Native Mobile Shell & Simulator
- **Responsive Viewport**: Runs in full native mobile mode on phones/tablets, and includes an interactive desktop frame simulator (iPhone 16 Pro, Google Pixel, Fullscreen) for testing on desktop browsers.
- **Dynamic Island & Status Bar**: Hardware styling with real-time clock and battery/network icons.
- **Bottom Navigation Bar**: 5 key tabs (*Home*, *Explore*, *Cake Studio*, *Gifts*, *Bag*) with tactile active indicators and live badge counters.
- **PWA Ready**: Offline support with `sw.js` and installable `manifest.json`.

---

### 2. 🎂 Custom Cake Studio (Interactive Builder)
- **Visual Cake Generator**: Real-time updating cake preview with stand, sponge layers, frosting finishes, and piped cursive messages.
- **Customization Options**:
  - Base flavors: *Belgian Dark Chocolate, Saffron Rasmalai Cloud, Ruby Red Velvet, Fresh Alphonso Mango, Sicilian Pistachio Praline, Lotus Biscoff*.
  - Size & Tiers: *0.5 Kg, 1.0 Kg, 2.0 Kg (2-Tier Grand Celebration)*.
  - Message piped in cursive script with live preview.
  - Celebration toppers: *🎂 Happy Birthday, ❤️ Happy Anniversary, 🎉 Congratulations, 👑 Best Mom, ✨ 24K Golden Crown*.
  - 1-Tap "Add Custom Cake to Bag".

---

### 3. 🛍️ Smart Bag, Slots & Express Checkout
- **Delivery Slots**:
  - ⚡ *Express 2-Hour Delivery* (C-Scheme, Vaishali Nagar, Malviya Nagar)
  - 🚚 *Standard Slot* (Free on ₹999+)
  - 🌙 *Midnight Surprise* (11:00 PM - 12:00 AM)
  - 🌅 *Early Morning* (7:00 AM - 9:00 AM)
- **Promo Code Engine**: Supports `FIRSTBITE` (20% off), `JAIPUR100` (₹100 off), and `ROYALTREAT` (15% off).
- **Celebration Add-ons**: Sparkler fountains, red rose stems, musical knives, handwritten cards.
- **Interactive Multi-Step Checkout**: UPI (GPay/PhonePe), Cards, COD with celebratory confetti burst.

---

### 4. 🛵 Live Order Tracking & Jaipur GPS Map
- **Simulated Real-Time Timeline**:
  - *Order Placed* ➔ *Artisanal Baking by Chef Vikram* ➔ *Cold Packaging Sealed* ➔ *Out for Delivery with Rider Rahul* ➔ *Delivered*.
- **Interactive Road Map**: Simulated live delivery route across Jaipur with radar pulses.

---

### 5. 🔊 Audio Feedback Engine (Web Audio API)
- Pure synthesized micro-interactions:
  - Tactile tap clicks
  - Ascending chime on adding to bag
  - Celebratory 4-tone fanfare upon placing an order

---

## 🚀 How to Run

1. Open [`mobile_app/index.html`](file:///d:/delete%20me/practice%20projects/bakingo/mobile_app/index.html) in any browser (Chrome, Safari, Edge, Firefox).
2. On mobile devices, tap **"Add to Home Screen"** to install as a standalone native app.
3. Or open the root launcher [`index.html`](file:///d:/delete%20me/practice%20projects/bakingo/index.html).
