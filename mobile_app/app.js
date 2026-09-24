/**
 * Bakingo Mobile Application Logic & State Engine
 * High-performance, reactive mobile app for Artisanal Confectionery
 */

// ==========================================
// 1. DATA STORE: Artisanal Catalog
// ==========================================
const BAKINGO_DATA = {
  categories: [
    { id: 'all', name: 'All Confections', icon: 'auto_awesome' },
    { id: 'cakes', name: 'Artisanal Cakes', icon: 'cake' },
    { id: 'desserts', name: 'Pastries & Tarts', icon: 'cookie' },
    { id: 'jars', name: 'Jar Desserts', icon: 'inventory_2' },
    { id: 'cupcakes', name: 'Cupcakes', icon: 'bakery_dining' },
    { id: 'hampers', name: 'Gift Hampers', icon: 'card_giftcard' },
  ],

  occasions: [
    { id: 'birthday', name: 'Birthdays', subtitle: 'Candles & Confetti', icon: 'cake', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbRAOZBKpUFzjAQos9Fgg-QjSNCLRTkaM7LFglSMHYyo4X6f0e9Z0mgENlTIWI_FoTDkdqgwbqLlJU_FEbYmypeN_CSOA6WCgdk24Lmvp5vDvpsMbwdB1fj30l2f_0ecXUiRIxSQ7gti19h6AZJXKq9O81tl1mbxRUKpow6UyIjbHu5jf5zb_JLlXaMtf_GouwHa2rmW9fsHltGzye8mJfW2-vyQRuRP5dv0OrrPougLFEv04qy3TFjxrfFdxgnSw35jyZnpM078vE' },
    { id: 'anniversary', name: 'Anniversaries', subtitle: 'Love & Roses', icon: 'favorite', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwHpgYfT2jsGO2_H-WstDhA6aXqGr3Iz2tHR2ajLYa39CNeuwdScQUPmeanApsJ85oVaKZSKbt0wnEDlMltloYxErmYVJi9NVHlEXUPO8MrhLAgU2gl1L9SZ4kDPkJ7lGoJRMEvJOiB44XVo3bqD6dlOlpVearBNPeqKcqOiZ4TC62w61DrjTMexMmyJQ4VoG8dl8_I9a5LCsDRlNrm9NtIzmyKrWCQ9glhd3qbDs5cgG9vyOEJYkUfVD9QIwWSPpyEVdx-abs1Ef8' },
    { id: 'wedding', name: 'Weddings', subtitle: 'Grand Celebrations', icon: 'celebration', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD403AANW5s3DdH4f29m3wmeAh0ve6Dzu1Tvsv1gP81dslp2nIpbzEoqFL7SkhfJyfaGE2XK8RLExeJ7LPDFA-aJUALUvKvUgIXI5Wr1OUgSu1atlM-DLqrjKlBLwaEbr2mdvi6FSKmdhNFY-uehlxXskTrTMhbfkcVLSj0vhJlyEvGBwj6DCVvEErxbBd1Zj9h5Ns8chZ2_lO0eSPzKD2odkguuVI_JGEnMGhVK1tCdinoniRl4NCzpjXlMenmeTDY8pVZwEysi9C-') },
    { id: 'midnight', name: 'Midnight Surprise', subtitle: '12:00 AM Delivery', icon: 'dark_mode', image: 'https://lh3.googleusercontent.com/aida/AP1WRLt85k5etOLbJ0ZAkA8eWfbzyuK7sbFBiuPjOBR4hYHiH1zVNo6vmFDdT2ZJ2XNNyUQkE-pth34fAVqja9Xkup1fPxwXDjot98ryf4PRGWxHxbLhCvOs7OeU0lCW0DVMl0_uyc3hkgfIxn1ZcHc0pnsjCQMuptXWog1WDU8QNOC8h8R5Iyih1SE_SynzwuV3sk_o10uxsMZLrEuaVY73tQCcYQSoGuyydx-Ma_EF5F729ikJqLd_MCDx-_jl' }
  ],

  stories: [
    { id: 's1', title: 'Chef Special', img: 'https://lh3.googleusercontent.com/aida/AP1WRLtmOzCtq5cCTlgoOEGU0cRPS8r3xsN_tABwYZpbcTLmG-FQlow_0PxghgAgFX-Z3rFDrmt5UTmU7sc1w_541aw8AnVMhYfGAojMFCyQvBR38hBVXR2J_EvRmjEU8z5vFmYZwIKvfqvCo3aOSTABMp36u0b5dr-MA2Ytvkpi5V1AC99PFF9JaYRGH6bPzBh7orh1nP-rDQG3zrblui2lWbUpuGn9zrSily4DM50uSeuTyJe7gocCaktPs-Ol', label: 'Belgian Truffle' },
    { id: 's2', title: 'Jaipur Love', img: 'https://lh3.googleusercontent.com/aida/AP1WRLu5vcUEIL1FpkUZrnzTY9i2HIyNzqy2zfIdMqeROb_gqR1qUk9_xMPZYFQCn5h_-LRtjDkcsgm8uYcKIj3vIguSbentJ2Zcp4P88KPvqjNxKznKVTruW5A051QHk_n7gkwgTsoWhNb2JInmbZF6XY0banjRb0qSCPFGS3hQ--Rie7fiHA8sEYOSYhPKVQ7zrpcmDRIPCCIourem3ONHSnHciYnDG7spSJb7hSX-c42UOMxadePrcPREB-mU', label: 'Rasmalai Cloud' },
    { id: 's3', title: '2-Hr Express', img: 'https://lh3.googleusercontent.com/aida/AP1WRLtIqKx3JlRPeWs4iz9IROYJK0gjKhNxIyi_yYQbbSbUpCL2gAlfqQGzxYXA8LyGZMm6smR1Fs5jrzj1nI6iFW85TpDvepeHX4Q6NgVeObCmKQQtUBeJr7xwu8kPx8m80YM_CQtCE0cIoL05SVrvpzUw4Ab2TCzAwgKXEp8niLfSNdo2eJxcTDfx0FgrPU7QbXZyadVdHnB9zktHNhDuvGuye8I3GtvlaciMRBuyIrLTJ8-vYu2eZ1G4iuQ', label: 'Black Forest' },
    { id: 's4', title: 'Gift Studio', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_jHPpzR8Sl3oskW8P8dgZTuDeWzK6EosauDHsqZNAS3vpqoviEp2hXEZ9OxU2vdY2_cqWdW1uvFXEux-kQ3ghb3hjm65vcuq33XFnB3gKqRcjBjXLyUhXzDx6zXfJeMVeC4omfJmUG6viT0SrAVPUSa972V0MWgfd9LvQn1FzOALp1IqZm-p5FubwB5Jw6EFUl5F7yYYVRCPqFFof_sjwyMugtTRGErsblyGER5lGyX-NKMjZzWC_R9WrY7IEqaGQ3Q5HF4JGCkj', label: 'Gratitude Box' },
    { id: 's5', title: '100% Eggless', img: 'https://lh3.googleusercontent.com/aida/AP1WRLsbahNmUGJ5q-lYYveag2Zxtdp-gUbZJmGgpV6UKxy0LVCsWCvfzRxTHiV-KhbBe-dUxBeWwGMCCgJd9f6HA7enYdaZOkDQTYjR7xzDoUPfnaJt_AeB6zzmr_Gu1r7ButHIcMOJbX-wr39ND_BsnaGO0mUnd2V39qdakAeHno1K7ken-or72UV1L1woqf64hsk-o1zI7EvTTOv7jF36DQhyPRLkExYjoy8Nu4ZLIV6Ek59wVPowYUkSkbZH', label: 'Mango Cake' }
  ],

  products: [
    {
      id: 'rosy-romance-black-forest',
      name: 'Rosy Romance Black Forest Cake',
      category: 'cakes',
      price: 659,
      rating: 4.9,
      reviewsCount: 342,
      deliveryTime: '2 hrs',
      isBestSeller: true,
      isEggless: true,
      description: 'A luxurious chocolate sponge cake layered with Chantilly cream, tart black cherries, and capped with delicate dark chocolate shavings and red rose garnishes.',
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLtIqKx3JlRPeWs4iz9IROYJK0gjKhNxIyi_yYQbbSbUpCL2gAlfqQGzxYXA8LyGZMm6smR1Fs5jrzj1nI6iFW85TpDvepeHX4Q6NgVeObCmKQQtUBeJr7xwu8kPx8m80YM_CQtCE0cIoL05SVrvpzUw4Ab2TCzAwgKXEp8niLfSNdo2eJxcTDfx0FgrPU7QbXZyadVdHnB9zktHNhDuvGuye8I3GtvlaciMRBuyIrLTJ8-vYu2eZ1G4iuQ',
      weights: [{ label: '0.5 Kg', price: 659 }, { label: '1.0 Kg', price: 1199 }, { label: '2.0 Kg', price: 2199 }],
      flavour: 'Black Forest & Cherry'
    },
    {
      id: 'delicious-rasmalai-cake',
      name: 'Delicious Rasmalai Cloud Cake',
      category: 'cakes',
      price: 819,
      rating: 5.0,
      reviewsCount: 512,
      deliveryTime: '2 hrs',
      isBestSeller: true,
      isEggless: true,
      description: 'Saffron and cardamom infused milk sponge soaked in rich rabri cream, topped with authentic Jaipur rasmalai discs and toasted pistachios.',
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLu5vcUEIL1FpkUZrnzTY9i2HIyNzqy2zfIdMqeROb_gqR1qUk9_xMPZYFQCn5h_-LRtjDkcsgm8uYcKIj3vIguSbentJ2Zcp4P88KPvqjNxKznKVTruW5A051QHk_n7gkwgTsoWhNb2JInmbZF6XY0banjRb0qSCPFGS3hQ--Rie7fiHA8sEYOSYhPKVQ7zrpcmDRIPCCIourem3ONHSnHciYnDG7spSJb7hSX-c42UOMxadePrcPREB-mU',
      weights: [{ label: '0.5 Kg', price: 819 }, { label: '1.0 Kg', price: 1499 }, { label: '2.0 Kg', price: 2799 }],
      flavour: 'Royal Rasmalai & Pistachio'
    },
    {
      id: 'marble-crunch-cake',
      name: 'Artisanal Marble Crunch Cake',
      category: 'cakes',
      price: 629,
      rating: 4.8,
      reviewsCount: 189,
      deliveryTime: '2 hrs',
      isBestSeller: false,
      isEggless: true,
      description: 'Decadent chocolate swirl sponge coated in crispy hazelnut praline flakes and silky dark chocolate ganache.',
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLse5zJzbdqfMs05UMOQ49U9bk5R3ZdKOgZwA7eROnljLHWjRQW5t3MA9GFVUB_V3PGsCSYxkrHd8ovWyaEnZ2djHXdrAyWPsEOeK2HzLkleYoaU5tZO0rxydX2aw1NN0ljSlFxwoyg5cKqI-aCqc3Vx7GhgoA23m4rMOlhoSBpRxyJsL9UJFtlo77Y1J-4LwNzkqLNXE4wR6WHd6jw0ZUiHXsZX7X5EVyy7VS6-PSI2lKFC65tU78qAo7rW',
      weights: [{ label: '0.5 Kg', price: 629 }, { label: '1.0 Kg', price: 1149 }, { label: '1.5 Kg', price: 1699 }],
      flavour: 'Chocolate Hazelnut'
    },
    {
      id: 'butterscotch-flavorsome-cake',
      name: 'Butterscotch Crunch Celebration',
      category: 'cakes',
      price: 569,
      rating: 4.7,
      reviewsCount: 220,
      deliveryTime: '2 hrs',
      isBestSeller: false,
      isEggless: true,
      description: 'Golden caramel drip cake with crunchy butterscotch nougat nuggets and smooth vanilla whipped cream.',
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLtJscpN80zW49V8hgdcMO1QDfoOEW54aAZet1Tm1Luj2cZbSr7EVqE-rrNi2NjQc94cTqtJkkzzq_qsA09DZZCtgGuqYBVlqur64MToCp0utxHwFZG0PFxOvivQzcDv5cVkkpwOiqmF3a67eb-cHP1XVF2AeZqxJghEX3VQPDZ22iGvbP1KbrjAUZwkZ_MQUcQFE0gtbUwmaQ6JObox8R3sA2eXS3v6anR1BM1cMZ9nSiyFZ_Kj6FEnqtE',
      weights: [{ label: '0.5 Kg', price: 569 }, { label: '1.0 Kg', price: 1049 }],
      flavour: 'Butterscotch Caramel'
    },
    {
      id: 'classic-chocolate-truffle',
      name: 'Classic Belgian Chocolate Truffle',
      category: 'cakes',
      price: 529,
      rating: 4.9,
      reviewsCount: 680,
      deliveryTime: '2 hrs',
      isBestSeller: true,
      isEggless: true,
      description: 'Deep, rich 55% dark Belgian chocolate ganache layered on moist chocolate sponge for true chocoholics.',
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLuFKsgFN8EQgwwVHAuuSul_nzAFbeuNQOUEZ_tpm-SaplGV1d48dzu9bW7TDrc15mS5VmnXnr-bsEFjfdU52nYPsL43QCTHuPtk1_kMFlbM0RCMEryXvWFyO5IdM1dyOIT4YiqxCNBExVymGAebyZ9wIC-WLKzxQ1_5jGXMQzWZ9k5sNsQBt-a4snqfd2C7rfiAYLKOu-F7LfsAxr_OJkuOLmc9v9HOcuiVUJEoIL-64lDEWLv5AB8MzrDl',
      weights: [{ label: '0.5 Kg', price: 529 }, { label: '1.0 Kg', price: 999 }, { label: '2.0 Kg', price: 1899 }],
      flavour: 'Pure Belgian Truffle'
    },
    {
      id: 'heavenly-mango-cake',
      name: 'Heavenly Alphonso Mango Cake',
      category: 'cakes',
      price: 699,
      rating: 4.8,
      reviewsCount: 145,
      deliveryTime: '2 hrs',
      isBestSeller: false,
      isEggless: true,
      description: 'Fresh Ratnagiri Alphonso mango compote layered with light airy sponge and mango glazed mirror frosting.',
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLsbahNmUGJ5q-lYYveag2Zxtdp-gUbZJmGgpV6UKxy0LVCsWCvfzRxTHiV-KhbBe-dUxBeWwGMCCgJd9f6HA7enYdaZOkDQTYjR7xzDoUPfnaJt_AeB6zzmr_Gu1r7ButHIcMOJbX-wr39ND_BsnaGO0mUnd2V39qdakAeHno1K7ken-or72UV1L1woqf64hsk-o1zI7EvTTOv7jF36DQhyPRLkExYjoy8Nu4ZLIV6Ek59wVPowYUkSkbZH',
      weights: [{ label: '0.5 Kg', price: 699 }, { label: '1.0 Kg', price: 1299 }],
      flavour: 'Alphonso Mango'
    },
    {
      id: 'royal-chocolate-truffle',
      name: 'Royal Chocolate Truffle Grand',
      category: 'cakes',
      price: 1749,
      rating: 5.0,
      reviewsCount: 98,
      deliveryTime: '4 hrs',
      isBestSeller: true,
      isEggless: true,
      description: 'Signature tier cake with 24K edible gold flakes, French macaron crowns, and triple-origin dark chocolate layers.',
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLtmOzCtq5cCTlgoOEGU0cRPS8r3xsN_tABwYZpbcTLmG-FQlow_0PxghgAgFX-Z3rFDrmt5UTmU7sc1w_541aw8AnVMhYfGAojMFCyQvBR38hBVXR2J_EvRmjEU8z5vFmYZwIKvfqvCo3aOSTABMp36u0b5dr-MA2Ytvkpi5V1AC99PFF9JaYRGH6bPzBh7orh1nP-rDQG3zrblui2lWbUpuGn9zrSily4DM50uSeuTyJe7gocCaktPs-Ol',
      weights: [{ label: '1.5 Kg', price: 1749 }, { label: '2.5 Kg', price: 2899 }],
      flavour: 'Triple Dark Chocolate'
    },
    {
      id: 'dark-velvet-glaze',
      name: 'Dark Velvet Mirror Pastry',
      category: 'desserts',
      price: 249,
      rating: 4.8,
      reviewsCount: 88,
      deliveryTime: '60 mins',
      isBestSeller: false,
      isEggless: true,
      description: 'Single-serve gourmet mirror glaze pastry filled with raspberry core and 70% dark chocolate mousse.',
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLsxeBZ959UvwF8uTDTvc39LRAFk4qkUPOv5HkFRlCIKlttP5kZvoCbwYqmsY_TDi7EOaborpEtSv7VaMf52kiiWqIvYUbsnQtDW1t9hkqHvKQPsrdzCFF1k6mQbQIUOP4Uy3ca-wiHiFTBDmZVMOyr_U2r_12557oYvz2OpNP-HfJQnRxooP48qd7bqp67O7HKlinoZUbIiomgMPryBo2jX5vyQVDLO9T8S6aP_OBgyl1k7WTqMjS-BaiEE',
      weights: [{ label: '1 Piece', price: 249 }, { label: 'Box of 2', price: 479 }],
      flavour: 'Dark Choco Raspberry'
    },
    {
      id: 'sicilian-pistachio-trio',
      name: 'Sicilian Pistachio Cupcakes Trio',
      category: 'cupcakes',
      price: 399,
      rating: 4.9,
      reviewsCount: 114,
      deliveryTime: '60 mins',
      isBestSeller: true,
      isEggless: true,
      description: 'Set of 3 artisanal cupcakes filled with pistachio cream and topped with white chocolate ganache.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDURphBSUOmfdu8eB5_G8Eq0swbUOiUg3RRUxgiW-sHG3HsEvl1yKfv8rEJr0209wBrpeA4mo7Dlt_1Vo31-Hr_Y3YhlxOnEhHWkAyC5xKHcmlKXZc8B1Yh5fswEkhUnSnlh2XYyXiHgfT9hkzSrcg6Or3g0199DgwEiYD-bsCppm8pLzNVQjz-zgY3Fc-nDmUJEGZferWQnxTmKIQcv1OHZ_12Yp-SZ7_dPeixC33ZfC4fMvbh9a36zCiaKqi6Y1oadpb5xFo5LemA',
      weights: [{ label: 'Set of 3', price: 399 }, { label: 'Set of 6', price: 749 }],
      flavour: 'Pistachio White Chocolate'
    },
    {
      id: 'wild-strawberry-jar',
      name: 'Wild Strawberry Mascarpone Jar',
      category: 'jars',
      price: 249,
      rating: 4.9,
      reviewsCount: 204,
      deliveryTime: '45 mins',
      isBestSeller: true,
      isEggless: true,
      description: 'Layered fresh strawberry compote, almond dacquoise, and light Italian mascarpone cream in an artisanal glass jar.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPVYQyd59nuvUiOl03UtQxUeLEKIpcN55mpsKbTybdb5s7DK9NXdD90r0UFsF9LCuidZboh27KutptmpzWp_7_itZDfiSb7LFTn3d8S-Xv2ML_CUmAkUT4aSANzdme8zauJGRpstSsiZ5z-ikCle3ZOhhALfm-Dq0fv1v7S2dItuXvdd0Y1VrpaOB8BnLQdnvpifkyHEHW54xpYc98fZbhCWhpfp6uWSXgVKB01S57OKjpg7Udplh280GJNlaJWbfpaX6cv9KnEHIO',
      weights: [{ label: '200ml Jar', price: 249 }, { label: 'Duo Pack', price: 469 }],
      flavour: 'Strawberry Mascarpone'
    },
    {
      id: 'espresso-tiramisu-jar',
      name: 'Signature Espresso Tiramisu Jar',
      category: 'jars',
      price: 279,
      rating: 4.9,
      reviewsCount: 310,
      deliveryTime: '45 mins',
      isBestSeller: true,
      isEggless: true,
      description: 'Freshly brewed Arabica espresso soaked ladyfinger sponge topped with French cocoa and velvety mascarpone sabayon.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVRhG32n5U74pHXok0Yuklop95a-54s7qEQxSJmdPnrPyES6A0dMkg5lPK123-yTRtKejKEqj5Yaclvsk-rsPQfRlJ1dPMMoqkL0UKTnAQmZtNujDgm0KFmxcmh4TlF-_DH3YQSlPqg-ap5oMYAsKZOZ9NDPeDdffvzc0TE415FUOQaiecFJ_ChrHOd9pVLWXH9Z-1-oM2zWDwaBmOUc_8d3FELxWbTmdTIEZ5BwJinmH-dZOzMHvsZaH4uYdqIYYQqRv0_NOcDCR8',
      weights: [{ label: '200ml Jar', price: 279 }, { label: 'Duo Pack', price: 519 }],
      flavour: 'Italian Espresso Tiramisu'
    },
    {
      id: 'zesty-lemon-meringue',
      name: 'Zesty Lemon Meringue Tart',
      category: 'desserts',
      price: 299,
      rating: 4.7,
      reviewsCount: 65,
      deliveryTime: '60 mins',
      isBestSeller: false,
      isEggless: false,
      description: 'Crisp buttery tart shell filled with tangy Meyer lemon curd and crowned with toasted Swiss meringue peaks.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaiJyi5M7T3Lsmgk3dKaJgYxaOwUxyPU9YcVH5vMKlqFDtoDJIzidxK6RiINdi5ALXFwIOX5RR5f6FGWvjKjdFrbHbuC97-bPRBNLIkc5LkzXC-cbIJWXoX1b-N9ykc7aWaDrCVLfxLFd1O3enha-Q4_WIyESvOyKsCr7GHsaZw4SKK6fF1znQPhrbjdUt25wmk7EXhR6psgLrIuztkUvpd2aUoLUFuY5OV2trjuYFl0VVZR6etqmNFK5-rrDdy0_iqjFx9Ira_RY3',
      weights: [{ label: '1 Tart', price: 299 }, { label: 'Set of 2', price: 549 }],
      flavour: 'Meyer Lemon Curd'
    },
    {
      id: 'midnight-romance-bundle',
      name: 'Midnight Romance Gift Bundle',
      category: 'hampers',
      price: 3499,
      rating: 5.0,
      reviewsCount: 84,
      deliveryTime: '2 hrs',
      isBestSeller: true,
      isEggless: true,
      description: 'Handcrafted Dutch rose bouquet (12 stems), 1 Kg Belgian Chocolate Truffle Cake, scented aroma candle, and custom wax-sealed note.',
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLt85k5etOLbJ0ZAkA8eWfbzyuK7sbFBiuPjOBR4hYHiH1zVNo6vmFDdT2ZJ2XNNyUQkE-pth34fAVqja9Xkup1fPxwXDjot98ryf4PRGWxHxbLhCvOs7OeU0lCW0DVMl0_uyc3hkgfIxn1ZcHc0pnsjCQMuptXWog1WDU8QNOC8h8R5Iyih1SE_SynzwuV3sk_o10uxsMZLrEuaVY73tQCcYQSoGuyydx-Ma_EF5F729ikJqLd_MCDx-_jl',
      weights: [{ label: 'Luxury Box', price: 3499 }],
      flavour: 'Cake + Rose Hamper'
    },
    {
      id: 'ultimate-birthday-box',
      name: 'The Ultimate Birthday Celebration Box',
      category: 'hampers',
      price: 4999,
      rating: 5.0,
      reviewsCount: 62,
      deliveryTime: '3 hrs',
      isBestSeller: true,
      isEggless: true,
      description: 'Complete celebration kit with 1.5 Kg designer cake, sparkling fountain candles, luxury party poppers, birthday banner, and 4 dessert jars.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbRAOZBKpUFzjAQos9Fgg-QjSNCLRTkaM7LFglSMHYyo4X6f0e9Z0mgENlTIWI_FoTDkdqgwbqLlJU_FEbYmypeN_CSOA6WCgdk24Lmvp5vDvpsMbwdB1fj30l2f_0ecXUiRIxSQ7gti19h6AZJXKq9O81tl1mbxRUKpow6UyIjbHu5jf5zb_JLlXaMtf_GouwHa2rmW9fsHltGzye8mJfW2-vyQRuRP5dv0OrrPougLFEv04qy3TFjxrfFdxgnSw35jyZnpM078vE',
      weights: [{ label: 'Grand Hamper', price: 4999 }],
      flavour: 'Complete Birthday Fiesta'
    },
    {
      id: 'gratitude-basket',
      name: 'The Artisanal Gratitude Hamper',
      category: 'hampers',
      price: 2999,
      rating: 4.9,
      reviewsCount: 47,
      deliveryTime: '2 hrs',
      isBestSeller: false,
      isEggless: true,
      description: 'Curated wooden keepsake crate with gourmet macaron box, single origin tea tin, almond biscotti, and 2 artisanal dessert jars.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_jHPpzR8Sl3oskW8P8dgZTuDeWzK6EosauDHsqZNAS3vpqoviEp2hXEZ9OxU2vdY2_cqWdW1uvFXEux-kQ3ghb3hjm65vcuq33XFnB3gKqRcjBjXLyUhXzDx6zXfJeMVeC4omfJmUG6viT0SrAVPUSa972V0MWgfd9LvQn1FzOALp1IqZm-p5FubwB5Jw6EFUl5F7yYYVRCPqFFof_sjwyMugtTRGErsblyGER5lGyX-NKMjZzWC_R9WrY7IEqaGQ3Q5HF4JGCkj',
      weights: [{ label: 'Keepsake Crate', price: 2999 }],
      flavour: 'Gourmet Treats Basket'
    }
  ],

  addOns: [
    { id: 'sparkler-candle', name: 'Sparkler Candle Fountain', price: 79, icon: 'flare', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=200&auto=format&fit=crop&q=80' },
    { id: 'red-rose-stem', name: 'Dutch Red Rose Stem', price: 99, icon: 'local_florist', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=80' },
    { id: 'musical-knife', name: 'Musical Birthday Knife', price: 149, icon: 'music_note', img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200&auto=format&fit=crop&q=80' },
    { id: 'greeting-card', name: 'Handcrafted Greeting Card', price: 49, icon: 'mail', img: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=200&auto=format&fit=crop&q=80' }
  ],

  deliverySlots: [
    { id: 'express', name: '⚡ Express 2-Hour Delivery', time: 'Arriving within 120 mins', fee: 99, tag: 'Fastest' },
    { id: 'standard', name: '🚚 Standard Today (Free on ₹999+)', time: '4:00 PM - 6:00 PM', fee: 0, tag: 'Popular' },
    { id: 'midnight', name: '🌙 Midnight Surprise Delivery', time: '11:00 PM - 12:00 AM', fee: 149, tag: 'Romantic' },
    { id: 'morning', name: '🌅 Early Morning Fresh Delivery', time: '7:00 AM - 9:00 AM', fee: 99, tag: 'Morning' }
  ],

  coupons: [
    { code: 'FIRSTBITE', discount: 0.20, minOrder: 499, title: '20% OFF on your first artisanal order' },
    { code: 'JAIPUR100', flat: 100, minOrder: 599, title: 'Flat ₹100 OFF for Pink City deliveries' },
    { code: 'ROYALTREAT', discount: 0.15, minOrder: 999, title: '15% OFF on orders above ₹999' }
  ],

  jaipurAreas: [
    'C-Scheme, Jaipur',
    'Vaishali Nagar, Jaipur',
    'Malviya Nagar, Jaipur',
    'Mansarovar, Jaipur',
    'Raja Park, Jaipur',
    'Civil Lines, Jaipur',
    'Bani Park, Jaipur',
    'Tonk Road, Jaipur',
    'Jagatpura, Jaipur'
  ]
};

// ==========================================
// 2. AUDIO FEEDBACK ENGINE (Web Audio API)
// ==========================================
const SoundEffects = {
  ctx: null,
  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },
  playTap() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  },
  playAdd() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {}
  },
  playCelebrate() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const now = this.ctx.currentTime + idx * 0.09;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      });
    } catch (e) {}
  }
};

// ==========================================
// 3. APPLICATION STATE
// ==========================================
const AppState = {
  currentTab: 'home',
  activeCategory: 'all',
  searchQuery: '',
  selectedArea: 'C-Scheme, Jaipur',
  cart: [],
  wishlist: new Set(),
  appliedCoupon: null,
  selectedSlot: 'standard',
  deliveryTip: 30,
  activeOrder: null,
  selectedProductForModal: null,

  // Custom Cake Studio State
  cakeStudio: {
    flavorId: 'chocolate',
    flavorName: 'Belgian Dark Chocolate',
    flavorColor: '#2c1810',
    tier: 'single',
    weight: '1.0 Kg',
    price: 1099,
    message: 'Happy Birthday!',
    topper: '🎂 Happy Birthday',
    frostingStyle: 'velvety',
    eggless: true
  },

  // Custom Hamper Builder State
  hamperStudio: {
    boxType: 'velvet',
    boxName: 'Luxury Velvet Burgundy Box',
    boxPrice: 599,
    treat: 'macarons',
    treatName: 'French Macarons Box of 4',
    treatPrice: 399,
    flowers: 'roses',
    flowersName: '10 Handpicked Red Dutch Roses',
    flowersPrice: 499,
    note: 'With love & sweetest wishes!'
  },

  init() {
    // Load persisted state
    try {
      const savedCart = localStorage.getItem('bakingo_mobile_cart_v2');
      if (savedCart) this.cart = JSON.parse(savedCart);
      const savedWishlist = localStorage.getItem('bakingo_mobile_wishlist_v2');
      if (savedWishlist) this.wishlist = new Set(JSON.parse(savedWishlist));
      const savedOrder = localStorage.getItem('bakingo_mobile_active_order_v2');
      if (savedOrder) this.activeOrder = JSON.parse(savedOrder);
      const savedArea = localStorage.getItem('bakingo_mobile_area_v2');
      if (savedArea) this.selectedArea = savedArea;
    } catch (e) {
      console.warn('Storage read error:', e);
    }
  },

  save() {
    try {
      localStorage.setItem('bakingo_mobile_cart_v2', JSON.stringify(this.cart));
      localStorage.setItem('bakingo_mobile_wishlist_v2', JSON.stringify(Array.from(this.wishlist)));
      localStorage.setItem('bakingo_mobile_area_v2', this.selectedArea);
      if (this.activeOrder) {
        localStorage.setItem('bakingo_mobile_active_order_v2', JSON.stringify(this.activeOrder));
      } else {
        localStorage.removeItem('bakingo_mobile_active_order_v2');
      }
    } catch (e) {}
  }
};

// ==========================================
// 4. MAIN CONTROLLER & ROUTER
// ==========================================
const App = {
  init() {
    AppState.init();
    this.updateClock();
    setInterval(() => this.updateClock(), 10000);
    this.renderCurrentTab();
    this.updateCartBadge();
    this.bindEvents();
    this.initPWA();
  },

  updateClock() {
    const clockEl = document.getElementById('status-clock');
    if (!clockEl) return;
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    clockEl.textContent = `${hours}:${minutes}`;
  },

  switchTab(tabId) {
    SoundEffects.playTap();
    AppState.currentTab = tabId;

    // Update bottom nav active state
    document.querySelectorAll('.nav-item-btn').forEach(btn => {
      const isMatch = btn.getAttribute('data-tab') === tabId;
      btn.classList.toggle('active', isMatch);
    });

    this.renderCurrentTab();

    // Scroll viewport to top
    const viewport = document.getElementById('mobile-viewport');
    if (viewport) viewport.scrollTop = 0;
  },

  renderCurrentTab() {
    const container = document.getElementById('mobile-screen-content');
    if (!container) return;

    switch (AppState.currentTab) {
      case 'home':
        container.innerHTML = this.views.home();
        break;
      case 'menu':
        container.innerHTML = this.views.menu();
        break;
      case 'studio':
        container.innerHTML = this.views.studio();
        this.updateCakeStudioPreview();
        break;
      case 'gifts':
        container.innerHTML = this.views.gifts();
        break;
      case 'cart':
        container.innerHTML = this.views.cart();
        break;
      case 'orders':
        container.innerHTML = this.views.orders();
        break;
      default:
        container.innerHTML = this.views.home();
    }
  },

  // ==========================================
  // 5. VIEW TEMPLATES
  // ==========================================
  views: {
    home() {
      const bestSellers = BAKINGO_DATA.products.filter(p => p.isBestSeller).slice(0, 4);
      const trending = BAKINGO_DATA.products.slice(0, 6);

      return `
        <!-- Top App Bar -->
        <header class="sticky top-0 z-40 bg-surface/90 backdrop-blur-md px-4 pt-2 pb-3 border-b border-[#f0ecea]">
          <div class="flex items-center justify-between gap-3">
            <button onclick="App.openLocationModal()" class="flex items-center gap-1.5 text-left active:opacity-75 transition-opacity">
              <span class="material-symbols-outlined text-primary text-xl">location_on</span>
              <div>
                <div class="flex items-center gap-1">
                  <span class="text-xs font-bold text-on-surface uppercase tracking-wider">Delivering To</span>
                  <span class="material-symbols-outlined text-sm text-secondary">expand_more</span>
                </div>
                <div class="text-[13px] font-semibold text-on-surface truncate max-w-[180px]">${AppState.selectedArea}</div>
              </div>
            </button>
            <div class="flex items-center gap-2">
              <button onclick="App.openWishlistModal()" class="w-9 h-9 rounded-full bg-surface-white border border-[#eae5e4] flex items-center justify-center text-on-surface active:scale-95 transition-transform relative">
                <span class="material-symbols-outlined text-lg">favorite</span>
                ${AppState.wishlist.size > 0 ? `<span class="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">${AppState.wishlist.size}</span>` : ''}
              </button>
              <button onclick="App.openProfileModal()" class="w-9 h-9 rounded-full bg-surface-white border border-[#eae5e4] flex items-center justify-center text-on-surface active:scale-95 transition-transform">
                <span class="material-symbols-outlined text-lg">person</span>
              </button>
            </div>
          </div>

          <!-- Search Bar -->
          <div class="mt-3 relative">
            <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary text-lg">search</span>
            <input
              type="text"
              placeholder="Search artisanal cakes, pastries, jars..."
              onfocus="App.switchTab('menu')"
              class="w-full h-11 pl-10 pr-10 bg-surface-white rounded-full border border-[#eae5e4] text-xs font-medium focus:outline-none focus:border-primary placeholder:text-secondary/70 shadow-sm"
            />
            <button onclick="App.switchTab('menu')" class="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary">
              <span class="material-symbols-outlined text-base">tune</span>
            </button>
          </div>
        </header>

        <div class="p-4 space-y-6">
          <!-- Story Highlights Bar -->
          <div class="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
            ${BAKINGO_DATA.stories.map(s => `
              <div onclick="App.openStoryModal('${s.id}')" class="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer active:scale-95 transition-transform">
                <div class="story-avatar-ring w-[60px] h-[60px]">
                  <img src="${s.img}" class="w-full h-full rounded-full object-cover border-2 border-surface-white" alt="${s.title}" />
                </div>
                <span class="text-[11px] font-medium text-on-surface text-center w-16 truncate">${s.label}</span>
              </div>
            `).join('')}
          </div>

          <!-- Hero Promo Banner Carousel -->
          <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#ad0d18] to-[#6b060d] text-white p-5 shadow-lg">
            <div class="relative z-10 max-w-[210px]">
              <span class="inline-block px-2.5 py-0.75 bg-white/20 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">Artisanal Patisserie</span>
              <h2 class="font-display-lg text-xl font-bold leading-tight mb-1">Couture Cakes in Jaipur</h2>
              <p class="text-xs text-white/80 mb-3.5">Baked fresh with 100% Belgian chocolate & pure butter.</p>
              <button onclick="App.switchTab('studio')" class="px-4 py-2 bg-white text-primary text-xs font-bold rounded-xl active:scale-95 transition-transform shadow-md flex items-center gap-1">
                <span>Custom Cake Studio</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            <img src="https://lh3.googleusercontent.com/aida/AP1WRLuGcpxm5tuyUQFYU53WTRCYi2h5SUhhLCyrn2BKo9HPEYCdtEn1KHwIPRSobtBdjHhQoGcoPkHMSMm7foY3zKsfqUNyH2MuoqZwHSpIb5waCJ0QPkao352miUUzazWf3zEcrreyF3FiriZ0BjGQXF58BlMR77gofDCKmJ-1SVfBSpS8ffKlWp_VlC83KAPaBLx-PLaxSUk4h8v-yHUI33WN-JxTRJpXaXiunFbWogjLzg3LGT-siMoxDWpc" 
                 class="absolute -right-6 -bottom-6 w-44 h-44 object-cover rounded-full shadow-2xl opacity-90" alt="Special Cake" />
          </div>

          <!-- Quick Category Grid -->
          <div class="grid grid-cols-3 gap-2.5">
            ${BAKINGO_DATA.categories.filter(c => c.id !== 'all').map(c => `
              <button onclick="App.selectCategory('${c.id}')" class="p-3 bg-surface-white rounded-xl border border-[#f0ecea] flex flex-col items-center gap-1.5 shadow-sm active:scale-95 transition-all">
                <div class="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <span class="material-symbols-outlined text-xl">${c.icon}</span>
                </div>
                <span class="text-[11px] font-semibold text-on-surface text-center leading-tight">${c.name}</span>
              </button>
            `).join('')}
          </div>

          <!-- Occasions Carousel -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <div>
                <h3 class="font-bold text-sm text-on-surface">Celebrate Every Occasion</h3>
                <p class="text-[11px] text-secondary">Tailored confections for special days</p>
              </div>
              <button onclick="App.switchTab('menu')" class="text-xs font-bold text-primary">View All</button>
            </div>
            <div class="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
              ${BAKINGO_DATA.occasions.map(o => `
                <div onclick="App.switchTab('menu')" class="relative w-40 h-52 rounded-2xl overflow-hidden shrink-0 shadow-md cursor-pointer active:scale-95 transition-transform group">
                  <img src="${o.image}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="${o.name}" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div class="absolute bottom-3 left-3 right-3 text-white">
                    <span class="text-[10px] font-medium text-white/80 block uppercase tracking-wider">${o.subtitle}</span>
                    <h4 class="font-bold text-sm leading-tight">${o.name}</h4>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Trending Artisanal Picks -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <div>
                <h3 class="font-bold text-sm text-on-surface">Trending in Jaipur</h3>
                <p class="text-[11px] text-secondary">Most ordered artisanal treats this week</p>
              </div>
              <button onclick="App.switchTab('menu')" class="text-xs font-bold text-primary">See All</button>
            </div>
            <div class="grid grid-cols-2 gap-3">
              ${trending.map(p => App.templates.productCard(p)).join('')}
            </div>
          </div>

          <!-- Express Delivery Banner -->
          <div class="p-4 rounded-2xl bg-[#fff7ed] border border-[#ffedd5] flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-[#f97316]/15 text-[#ea580c] flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-2xl">bolt</span>
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-xs text-[#9a3412]">Express 2-Hour Delivery in Jaipur</h4>
              <p class="text-[11px] text-[#c2410c] mt-0.5">Need a cake right now? Get it delivered fresh from our C-Scheme kitchen.</p>
            </div>
          </div>
        </div>
      `;
    },

    menu() {
      const activeCat = AppState.activeCategory;
      let filtered = BAKINGO_DATA.products;

      if (activeCat !== 'all') {
        filtered = filtered.filter(p => p.category === activeCat);
      }

      if (AppState.searchQuery.trim()) {
        const q = AppState.searchQuery.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.flavour.toLowerCase().includes(q));
      }

      return `
        <!-- Sticky Header with Filter Pills -->
        <header class="sticky top-0 z-40 bg-surface/90 backdrop-blur-md px-4 pt-2 pb-3 border-b border-[#f0ecea]">
          <div class="flex items-center justify-between gap-3 mb-2.5">
            <h1 class="font-bold text-base text-on-surface">Artisanal Catalog</h1>
            <span class="text-xs text-secondary font-medium">${filtered.length} confections</span>
          </div>

          <!-- Instant Search Input -->
          <div class="relative mb-3">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-base">search</span>
            <input
              type="text"
              id="menu-search-input"
              value="${AppState.searchQuery}"
              oninput="App.handleSearch(this.value)"
              placeholder="Filter by name, chocolate, rasmalai..."
              class="w-full h-10 pl-9 pr-8 bg-surface-white rounded-full border border-[#eae5e4] text-xs font-medium focus:outline-none focus:border-primary shadow-sm"
            />
            ${AppState.searchQuery ? `
              <button onclick="App.clearSearch()" class="absolute right-3 top-1/2 -translate-y-1/2 text-secondary">
                <span class="material-symbols-outlined text-sm">close</span>
              </button>
            ` : ''}
          </div>

          <!-- Category Pills Filter Bar -->
          <div class="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
            ${BAKINGO_DATA.categories.map(c => `
              <button 
                onclick="App.selectCategory('${c.id}')"
                class="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${activeCat === c.id ? 'bg-primary text-white shadow-sm' : 'bg-surface-white text-secondary border border-[#eae5e4]'}"
              >
                <span class="material-symbols-outlined text-sm">${c.icon}</span>
                <span>${c.name}</span>
              </button>
            `).join('')}
          </div>
        </header>

        <div class="p-4">
          ${filtered.length === 0 ? `
            <div class="text-center py-16">
              <span class="material-symbols-outlined text-5xl text-secondary/50 mb-2">sentiment_dissatisfied</span>
              <h3 class="font-bold text-sm text-on-surface">No confections found</h3>
              <p class="text-xs text-secondary mt-1 mb-4">Try searching for chocolate, mango, or rasmalai.</p>
              <button onclick="App.clearSearch()" class="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg">Reset Filters</button>
            </div>
          ` : `
            <div class="grid grid-cols-2 gap-3">
              ${filtered.map(p => App.templates.productCard(p)).join('')}
            </div>
          `}
        </div>
      `;
    },

    studio() {
      const studio = AppState.cakeStudio;
      return `
        <div class="p-4 space-y-5">
          <!-- Studio Header -->
          <div class="text-center">
            <span class="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider mb-1">Custom Cake Studio</span>
            <h1 class="font-display-lg text-lg font-bold text-on-surface">Build Your Dream Cake</h1>
            <p class="text-xs text-secondary">Customized flavours, tiers & piped messages in real-time</p>
          </div>

          <!-- Visual Real-time Interactive Cake Preview -->
          <div class="bg-gradient-to-b from-[#fdfbf9] to-[#f3ece9] p-6 rounded-3xl border border-[#eae2de] shadow-inner text-center relative overflow-hidden">
            <div class="cake-builder-preview" id="cake-preview-canvas">
              <div class="cake-stand-base"></div>
              <div class="cake-layer-bottom" id="cake-layer-1" style="background-color: ${studio.flavorColor};">
                <span class="cake-piped-message">${studio.message || 'Happy Moments'}</span>
              </div>
              ${studio.tier === 'double' ? `
                <div class="cake-layer-top" id="cake-layer-2" style="background-color: ${studio.flavorColor}; filter: brightness(1.15);"></div>
              ` : ''}
              ${studio.topper !== 'None' ? `
                <div class="cake-topper-icon text-2xl font-bold">${studio.topper.split(' ')[0]}</div>
              ` : ''}
            </div>
            <div class="mt-3 flex items-center justify-center gap-2">
              <span class="px-2.5 py-1 bg-white/80 rounded-full text-[11px] font-bold text-on-surface shadow-sm">
                ${studio.flavorName} • ${studio.weight}
              </span>
              <span class="px-2.5 py-1 bg-primary text-white rounded-full text-[11px] font-bold shadow-sm">
                ₹ ${studio.price}
              </span>
            </div>
          </div>

          <!-- Step 1: Base Flavour -->
          <div class="space-y-2">
            <label class="font-bold text-xs text-on-surface flex items-center gap-1.5">
              <span class="w-4 h-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">1</span>
              <span>Choose Artisanal Flavour</span>
            </label>
            <div class="grid grid-cols-2 gap-2">
              ${[
                { id: 'chocolate', name: 'Belgian Dark Chocolate', color: '#2c1810', basePrice: 1099 },
                { id: 'rasmalai', name: 'Saffron Rasmalai Cloud', color: '#eab308', basePrice: 1299 },
                { id: 'redvelvet', name: 'Ruby Red Velvet', color: '#ad0d18', basePrice: 1199 },
                { id: 'mango', name: 'Fresh Alphonso Mango', color: '#f97316', basePrice: 1149 },
                { id: 'pistachio', name: 'Sicilian Pistachio Praline', color: '#65a30d', basePrice: 1399 },
                { id: 'biscoff', name: 'Lotus Biscoff Crunch', color: '#b45309', basePrice: 1249 }
              ].map(f => `
                <button 
                  onclick="App.updateCakeStudioFlavor('${f.id}', '${f.name}', '${f.color}', ${f.basePrice})"
                  class="p-2.5 rounded-xl border flex items-center gap-2 text-left transition-all ${studio.flavorId === f.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-[#e8e4e3] bg-surface-white'}"
                >
                  <span class="w-5 h-5 rounded-full shrink-0 shadow-sm" style="background-color: ${f.color};"></span>
                  <div class="truncate">
                    <div class="text-[11px] font-bold text-on-surface truncate">${f.name}</div>
                    <div class="text-[10px] text-primary font-semibold">₹ ${f.basePrice}</div>
                  </div>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Step 2: Tier & Size -->
          <div class="space-y-2">
            <label class="font-bold text-xs text-on-surface flex items-center gap-1.5">
              <span class="w-4 h-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">2</span>
              <span>Select Tiers & Size</span>
            </label>
            <div class="grid grid-cols-3 gap-2">
              ${[
                { tier: 'single', weight: '0.5 Kg', mult: 0.65 },
                { tier: 'single', weight: '1.0 Kg', mult: 1.0 },
                { tier: 'double', weight: '2.0 Kg (2-Tier)', mult: 1.95 }
              ].map(t => `
                <button 
                  onclick="App.updateCakeStudioSize('${t.tier}', '${t.weight}', ${t.mult})"
                  class="p-2.5 rounded-xl border text-center transition-all ${studio.weight === t.weight ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-[#e8e4e3] bg-surface-white'}"
                >
                  <div class="text-xs font-bold text-on-surface">${t.weight}</div>
                  <div class="text-[10px] text-secondary mt-0.5">${t.tier === 'double' ? 'Grand 2-Tier' : 'Standard'}</div>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Step 3: Message on Cake -->
          <div class="space-y-2">
            <label class="font-bold text-xs text-on-surface flex items-center gap-1.5">
              <span class="w-4 h-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">3</span>
              <span>Message Piped on Cake (Free)</span>
            </label>
            <input 
              type="text" 
              maxlength="30"
              value="${studio.message}"
              oninput="App.updateCakeStudioMessage(this.value)"
              placeholder="e.g. Happy Birthday Sarah!" 
              class="w-full h-11 px-3.5 bg-surface-white rounded-xl border border-[#eae5e4] text-xs font-medium focus:outline-none focus:border-primary shadow-sm"
            />
          </div>

          <!-- Step 4: Celebration Topper -->
          <div class="space-y-2">
            <label class="font-bold text-xs text-on-surface flex items-center gap-1.5">
              <span class="w-4 h-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">4</span>
              <span>Celebration Topper</span>
            </label>
            <div class="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              ${['🎂 Happy Birthday', '❤️ Happy Anniversary', '🎉 Congratulations', '👑 Best Mom', '✨ 24K Golden Crown', 'None'].map(top => `
                <button 
                  onclick="App.updateCakeStudioTopper('${top}')"
                  class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${studio.topper === top ? 'bg-on-surface text-white' : 'bg-surface-white text-secondary border border-[#eae5e4]'}"
                >
                  ${top}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Add to Bag CTA Button -->
          <div class="pt-2">
            <button 
              onclick="App.addCustomCakeToCart()" 
              class="w-full py-3.5 bg-primary text-white font-bold text-xs rounded-2xl shadow-lg flex items-center justify-center gap-2 active:scale-98 transition-transform"
            >
              <span class="material-symbols-outlined text-lg">shopping_bag</span>
              <span>Add Custom Cake to Bag • ₹ ${studio.price}</span>
            </button>
          </div>
        </div>
      `;
    },

    gifts() {
      const hampers = BAKINGO_DATA.products.filter(p => p.category === 'hampers');
      return `
        <div class="p-4 space-y-6">
          <div class="text-center">
            <span class="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider mb-1">Artisanal Gift Shop</span>
            <h1 class="font-display-lg text-lg font-bold text-on-surface">Curated Gift Bundles</h1>
            <p class="text-xs text-secondary">Luxury patisserie paired with fresh Dutch florals</p>
          </div>

          <!-- Featured Hampers Grid -->
          <div class="space-y-4">
            ${hampers.map(h => `
              <div class="bg-surface-white rounded-2xl border border-[#eae5e4] overflow-hidden shadow-sm flex flex-col group">
                <div class="h-44 relative overflow-hidden">
                  <img src="${h.image}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="${h.name}" />
                  <span class="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Luxury Bundle</span>
                  <button onclick="App.toggleWishlist('${h.id}')" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-on-surface">
                    <span class="material-symbols-outlined text-base ${AppState.wishlist.has(h.id) ? 'text-primary fill-1' : ''}">favorite</span>
                  </button>
                </div>
                <div class="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <div class="flex items-center justify-between mb-1">
                      <h3 class="font-bold text-sm text-on-surface">${h.name}</h3>
                      <span class="font-bold text-sm text-primary">₹ ${h.price}</span>
                    </div>
                    <p class="text-xs text-secondary mb-3">${h.description}</p>
                  </div>
                  <button 
                    onclick="App.addToCart('${h.id}', '${h.name}', ${h.price}, '${h.image}', 'Gift Hamper')"
                    class="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span class="material-symbols-outlined text-sm">add_shopping_cart</span>
                    <span>Add Hamper to Bag</span>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Build-A-Hamper Banner -->
          <div class="p-5 rounded-3xl bg-gradient-to-r from-[#201d1d] to-[#3a3535] text-white relative overflow-hidden shadow-lg">
            <div class="relative z-10 max-w-[200px]">
              <span class="text-[10px] font-bold uppercase tracking-widest text-[#facc15] block mb-1">Custom Gifting</span>
              <h3 class="font-bold text-base mb-1">Build Your Own Luxury Box</h3>
              <p class="text-xs text-white/80 mb-3">Choose box, artisanal bakes, fresh flowers and handwritten card.</p>
              <button onclick="App.openCustomHamperModal()" class="px-4 py-2 bg-white text-on-surface font-bold text-xs rounded-xl active:scale-95 transition-transform">
                Start Custom Box
              </button>
            </div>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQWBcirQAB6iA9Mxp5owl-OA5av0I2N6ZStlllCjWfYKFRh0J5KDd3TMHyQ47c6CTMNUaVhSz21iXh7lI-vuTQ24MSZrbQFRAWnvH5rrvjEZ4g8QiR7NwjktngPNUmd5_mnHy1ox_v14skxbjMcKLkatUBfU9Vr4sjHwPMhSKDofRAn150yh311tPgM_GeAyFN2PLR2O7ztdzinVNA4-ogvygxAJ-7aiTAGgn-03EsAhGRs3EmGIqAcc10pzfnsFrh9FG_ve16fyi3" 
                 class="absolute -right-6 -bottom-6 w-40 h-40 object-cover rounded-2xl opacity-80" alt="Hamper" />
          </div>
        </div>
      `;
    },

    cart() {
      const cart = AppState.cart;
      if (cart.length === 0) {
        return `
          <div class="p-8 text-center py-20">
            <div class="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <span class="material-symbols-outlined text-4xl">shopping_bag</span>
            </div>
            <h2 class="font-display-lg text-lg font-bold text-on-surface">Your Bag is Empty</h2>
            <p class="text-xs text-secondary mt-1 mb-6 max-w-xs mx-auto">Explore our curated patisseries and artisanal confections in Jaipur.</p>
            <button onclick="App.switchTab('menu')" class="px-6 py-3 bg-primary text-white font-bold text-xs rounded-xl shadow-md active:scale-95 transition-transform">
              Browse Desserts
            </button>
          </div>
        `;
      }

      const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      const slotObj = BAKINGO_DATA.deliverySlots.find(s => s.id === AppState.selectedSlot) || BAKINGO_DATA.deliverySlots[1];
      const deliveryFee = subtotal >= 999 && AppState.selectedSlot === 'standard' ? 0 : slotObj.fee;
      
      let discount = 0;
      if (AppState.appliedCoupon) {
        if (AppState.appliedCoupon.discount) {
          discount = Math.round(subtotal * AppState.appliedCoupon.discount);
        } else if (AppState.appliedCoupon.flat) {
          discount = AppState.appliedCoupon.flat;
        }
      }

      const gst = Math.round((subtotal - discount) * 0.05);
      const grandTotal = Math.max(0, subtotal - discount + deliveryFee + gst + AppState.deliveryTip);

      return `
        <div class="p-4 space-y-4">
          <!-- Header -->
          <div class="flex items-center justify-between pb-2 border-b border-[#eae5e4]">
            <h1 class="font-bold text-base text-on-surface">Shopping Bag (${cart.reduce((s, i) => s + i.qty, 0)} items)</h1>
            <button onclick="App.clearCart()" class="text-xs text-secondary hover:text-primary font-medium">Clear All</button>
          </div>

          <!-- Cart Items List -->
          <div class="space-y-3">
            ${cart.map(item => `
              <div class="p-3 bg-surface-white rounded-2xl border border-[#eae5e4] shadow-sm flex gap-3">
                <img src="${item.image}" class="w-16 h-16 rounded-xl object-cover shrink-0" alt="${item.name}" />
                <div class="flex-1 flex flex-col justify-between">
                  <div class="flex justify-between items-start">
                    <div>
                      <h4 class="font-bold text-xs text-on-surface leading-tight">${item.name}</h4>
                      <p class="text-[10px] text-secondary mt-0.5">${item.meta || '1.0 Kg'}</p>
                    </div>
                    <span class="font-bold text-xs text-primary">₹ ${item.price * item.qty}</span>
                  </div>
                  <div class="flex justify-between items-center mt-2">
                    <div class="flex items-center border border-[#e8e4e3] rounded-lg overflow-hidden bg-surface">
                      <button onclick="App.updateCartQty('${item.id}', -1)" class="w-7 h-6 flex items-center justify-center text-on-surface hover:bg-surface-white text-xs font-bold">-</button>
                      <span class="w-7 text-center text-xs font-bold">${item.qty}</span>
                      <button onclick="App.updateCartQty('${item.id}', 1)" class="w-7 h-6 flex items-center justify-center text-on-surface hover:bg-surface-white text-xs font-bold">+</button>
                    </div>
                    <button onclick="App.removeFromCart('${item.id}')" class="text-[11px] text-secondary hover:text-primary flex items-center gap-0.5">
                      <span class="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Add-ons Impulse Carousel -->
          <div>
            <h3 class="font-bold text-xs text-on-surface mb-2">Complete the Celebration</h3>
            <div class="flex gap-2.5 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
              ${BAKINGO_DATA.addOns.map(add => `
                <div class="w-32 bg-surface-white rounded-xl border border-[#eae5e4] p-2.5 shrink-0 flex flex-col justify-between">
                  <div>
                    <span class="material-symbols-outlined text-primary text-xl mb-1">${add.icon}</span>
                    <h5 class="font-bold text-[11px] text-on-surface leading-tight line-clamp-1">${add.name}</h5>
                    <p class="text-[10px] font-semibold text-primary mt-0.5">₹ ${add.price}</p>
                  </div>
                  <button 
                    onclick="App.addToCart('${add.id}', '${add.name}', ${add.price}, '${add.img}', 'Add-on')"
                    class="mt-2 w-full py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-lg hover:bg-primary hover:text-white transition-colors"
                  >
                    + Add
                  </button>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Delivery Slot Selector -->
          <div class="p-3.5 bg-surface-white rounded-2xl border border-[#eae5e4] space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-bold text-xs text-on-surface flex items-center gap-1">
                <span class="material-symbols-outlined text-primary text-base">schedule</span>
                <span>Choose Delivery Slot</span>
              </span>
              <span class="text-[10px] font-semibold text-primary">${slotObj.name}</span>
            </div>
            <div class="space-y-1.5 pt-1">
              ${BAKINGO_DATA.deliverySlots.map(s => `
                <label 
                  onclick="App.selectSlot('${s.id}')"
                  class="p-2 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${AppState.selectedSlot === s.id ? 'border-primary bg-primary/5' : 'border-[#eae5e4]'}"
                >
                  <div class="flex items-center gap-2">
                    <input type="radio" name="slot" ${AppState.selectedSlot === s.id ? 'checked' : ''} class="text-primary focus:ring-0" />
                    <div>
                      <div class="text-[11px] font-bold text-on-surface">${s.name}</div>
                      <div class="text-[10px] text-secondary">${s.time}</div>
                    </div>
                  </div>
                  <span class="text-[11px] font-bold ${s.fee === 0 ? 'text-green-600' : 'text-primary'}">${s.fee === 0 ? 'FREE' : '₹ ' + s.fee}</span>
                </label>
              `).join('')}
            </div>
          </div>

          <!-- Coupon Code Box -->
          <div class="p-3 bg-surface-white rounded-2xl border border-[#eae5e4] flex items-center gap-2">
            <span class="material-symbols-outlined text-secondary text-base">local_offer</span>
            <input 
              type="text" 
              id="coupon-input"
              value="${AppState.appliedCoupon ? AppState.appliedCoupon.code : ''}"
              placeholder="Enter Promo (FIRSTBITE / JAIPUR100)" 
              class="flex-1 text-xs font-semibold uppercase bg-transparent border-none focus:outline-none placeholder:normal-case placeholder:font-normal"
            />
            ${AppState.appliedCoupon ? `
              <button onclick="App.removeCoupon()" class="text-xs font-bold text-secondary">Remove</button>
            ` : `
              <button onclick="App.applyCoupon(document.getElementById('coupon-input').value)" class="text-xs font-bold text-primary">Apply</button>
            `}
          </div>

          <!-- Bill Details -->
          <div class="p-4 bg-surface-white rounded-2xl border border-[#eae5e4] space-y-2 text-xs">
            <h4 class="font-bold text-on-surface mb-1">Bill Summary</h4>
            <div class="flex justify-between text-secondary">
              <span>Item Total</span>
              <span>₹ ${subtotal}</span>
            </div>
            ${discount > 0 ? `
              <div class="flex justify-between text-green-600 font-semibold">
                <span>Promo Discount (${AppState.appliedCoupon.code})</span>
                <span>- ₹ ${discount}</span>
              </div>
            ` : ''}
            <div class="flex justify-between text-secondary">
              <span>Delivery Partner Fee</span>
              <span>${deliveryFee === 0 ? '<span class="text-green-600 font-semibold">FREE</span>' : '₹ ' + deliveryFee}</span>
            </div>
            <div class="flex justify-between text-secondary">
              <span>Taxes & GST (5%)</span>
              <span>₹ ${gst}</span>
            </div>
            <div class="flex justify-between text-secondary">
              <span>Baker Tip</span>
              <span>₹ ${AppState.deliveryTip}</span>
            </div>
            <div class="pt-2 border-t border-[#eae5e4] flex justify-between font-bold text-sm text-on-surface">
              <span>Grand Total</span>
              <span class="text-primary">₹ ${grandTotal}</span>
            </div>
          </div>

          <!-- Checkout CTA -->
          <div class="pt-2 pb-6">
            <button 
              onclick="App.openCheckoutModal(${grandTotal})"
              class="w-full py-4 bg-primary text-white font-bold text-xs rounded-2xl shadow-xl flex items-center justify-between px-5 active:scale-98 transition-transform"
            >
              <div class="text-left">
                <div class="text-[10px] text-white/80 uppercase tracking-wider">Total Payable</div>
                <div class="text-sm font-extrabold">₹ ${grandTotal}</div>
              </div>
              <div class="flex items-center gap-1">
                <span>Proceed to Checkout</span>
                <span class="material-symbols-outlined text-base">arrow_forward</span>
              </div>
            </button>
          </div>
        </div>
      `;
    },

    orders() {
      const order = AppState.activeOrder;
      return `
        <div class="p-4 space-y-4">
          <div class="flex items-center justify-between pb-2 border-b border-[#eae5e4]">
            <h1 class="font-bold text-base text-on-surface">Live Orders & Activity</h1>
            <span class="text-xs text-secondary font-medium">Bakingo Club</span>
          </div>

          ${order ? `
            <!-- Live Active Order Card -->
            <div class="bg-surface-white rounded-3xl border border-[#eae5e4] p-4 shadow-md space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <span class="px-2.5 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded-full uppercase tracking-wider">Live Tracking</span>
                  <h3 class="font-bold text-sm text-on-surface mt-1">Order #${order.id}</h3>
                  <p class="text-[11px] text-secondary">Estimated Arrival: <b class="text-primary">${order.eta || '22 mins'}</b></p>
                </div>
                <button onclick="App.openLiveMapModal()" class="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center active:scale-95 transition-transform">
                  <span class="material-symbols-outlined text-xl">map</span>
                </button>
              </div>

              <!-- Live Stepper -->
              <div class="space-y-3 py-2 border-y border-[#f0ecea]">
                ${[
                  { title: 'Order Confirmed', sub: 'Kitchen accepted', done: true },
                  { title: 'Artisanal Baking & Frosting', sub: 'Chef Vikram at C-Scheme kitchen', done: true },
                  { title: 'Temperature Controlled Packaging', sub: 'Gold seal placed', done: order.step >= 3 },
                  { title: 'Out for Delivery', sub: 'Rider Rahul is on electric scooter', done: order.step >= 4 },
                  { title: 'Delivered Fresh', sub: 'Enjoy your confections', done: order.step >= 5 }
                ].map((step, idx) => `
                  <div class="flex items-start gap-3">
                    <div class="w-5 h-5 rounded-full ${step.done ? 'bg-primary text-white' : 'bg-surface border border-[#dfdcda] text-secondary'} flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      ${step.done ? '✓' : idx + 1}
                    </div>
                    <div class="flex-1">
                      <div class="text-xs font-bold ${step.done ? 'text-on-surface' : 'text-secondary'}">${step.title}</div>
                      <div class="text-[10px] text-secondary">${step.sub}</div>
                    </div>
                  </div>
                `).join('')}
              </div>

              <!-- Order Items Summary -->
              <div class="space-y-1.5 text-xs">
                <div class="font-bold text-[11px] text-secondary uppercase tracking-wider">Items in Order</div>
                ${order.items.map(i => `
                  <div class="flex justify-between text-on-surface">
                    <span>${i.qty}x ${i.name}</span>
                    <span class="font-semibold">₹ ${i.price * i.qty}</span>
                  </div>
                `).join('')}
              </div>

              <button onclick="App.openLiveMapModal()" class="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform">
                <span class="material-symbols-outlined text-sm">navigation</span>
                <span>Track Rider on Jaipur Map</span>
              </button>
            </div>
          ` : `
            <div class="p-8 text-center py-12 bg-surface-white rounded-3xl border border-[#eae5e4]">
              <span class="material-symbols-outlined text-4xl text-secondary/40 mb-2">moped</span>
              <h3 class="font-bold text-sm text-on-surface">No Active Deliveries</h3>
              <p class="text-xs text-secondary mt-1 mb-4">When you place an artisanal cake order, track its live baking & delivery here.</p>
              <button onclick="App.switchTab('menu')" class="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl">Order Now</button>
            </div>
          `}

          <!-- Past Order History -->
          <div class="pt-2">
            <h3 class="font-bold text-xs text-on-surface mb-2.5">Previous Celebrations</h3>
            <div class="space-y-2.5">
              <div class="p-3 bg-surface-white rounded-2xl border border-[#eae5e4] flex items-center justify-between">
                <div>
                  <h4 class="font-bold text-xs text-on-surface">Delicious Rasmalai Cloud Cake</h4>
                  <p class="text-[10px] text-secondary">Delivered to C-Scheme • 14 Sep</p>
                  <span class="text-xs font-bold text-primary">₹ 819</span>
                </div>
                <button onclick="App.reorderItem('delicious-rasmalai-cake')" class="px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-xl active:scale-95">Reorder</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  },

  // ==========================================
  // 6. COMPONENT TEMPLATES
  // ==========================================
  templates: {
    productCard(p) {
      const isWishlisted = AppState.wishlist.has(p.id);
      return `
        <div class="product-card flex flex-col justify-between cursor-pointer" onclick="App.openProductModal('${p.id}')">
          <div class="relative aspect-square overflow-hidden bg-surface-dim">
            <img src="${p.image}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="${p.name}" loading="lazy" />
            ${p.isBestSeller ? `
              <span class="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider text-primary shadow-sm">Best Seller</span>
            ` : ''}
            <button 
              onclick="event.stopPropagation(); App.toggleWishlist('${p.id}')"
              class="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-on-surface active:scale-90 transition-transform"
            >
              <span class="material-symbols-outlined text-sm ${isWishlisted ? 'text-primary fill-1' : 'text-secondary'}">favorite</span>
            </button>
          </div>
          <div class="p-3 flex flex-col justify-between flex-1">
            <div>
              <div class="flex items-center gap-1 mb-1">
                <span class="material-symbols-outlined text-amber-500 text-xs fill-1">star</span>
                <span class="text-[10px] font-bold text-on-surface">${p.rating}</span>
                <span class="text-[10px] text-secondary">(${p.reviewsCount})</span>
              </div>
              <h4 class="font-bold text-xs text-on-surface line-clamp-2 leading-snug">${p.name}</h4>
              <p class="text-[10px] text-secondary line-clamp-1 mt-0.5">${p.flavour}</p>
            </div>
            <div class="flex items-center justify-between mt-2.5 pt-2 border-t border-[#f5f1f0]">
              <span class="font-bold text-xs text-primary">₹ ${p.price}</span>
              <button 
                onclick="event.stopPropagation(); App.quickAddToCart('${p.id}')"
                class="px-3 py-1 bg-primary text-white text-[11px] font-bold rounded-lg active:scale-90 transition-transform shadow-sm hover:bg-primary-container"
              >
                + Add
              </button>
            </div>
          </div>
        </div>
      `;
    }
  },

  // ==========================================
  // 7. USER ACTIONS & HANDLERS
  // ==========================================
  selectCategory(catId) {
    SoundEffects.playTap();
    AppState.activeCategory = catId;
    if (AppState.currentTab !== 'menu') {
      AppState.currentTab = 'menu';
      document.querySelectorAll('.nav-item-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === 'menu');
      });
    }
    this.renderCurrentTab();
  },

  handleSearch(query) {
    AppState.searchQuery = query;
    this.renderCurrentTab();
    // Maintain input focus
    setTimeout(() => {
      const input = document.getElementById('menu-search-input');
      if (input) {
        input.focus();
        input.setSelectionRange(query.length, query.length);
      }
    }, 10);
  },

  clearSearch() {
    AppState.searchQuery = '';
    AppState.activeCategory = 'all';
    this.renderCurrentTab();
  },

  toggleWishlist(productId) {
    SoundEffects.playTap();
    if (AppState.wishlist.has(productId)) {
      AppState.wishlist.delete(productId);
      this.showToast('Removed from Wishlist');
    } else {
      AppState.wishlist.add(productId);
      this.showToast('Added to Wishlist ❤️');
    }
    AppState.save();
    this.renderCurrentTab();
  },

  quickAddToCart(productId) {
    const p = BAKINGO_DATA.products.find(item => item.id === productId);
    if (!p) return;
    this.addToCart(p.id, p.name, p.price, p.image, '1.0 Kg');
  },

  addToCart(id, name, price, image, meta = '1.0 Kg') {
    SoundEffects.playAdd();
    const existing = AppState.cart.find(c => c.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      AppState.cart.push({ id, name, price, image, meta, qty: 1 });
    }
    AppState.save();
    this.updateCartBadge();
    this.showToast(`${name} added to bag 🛍️`);
    if (AppState.currentTab === 'cart') this.renderCurrentTab();
  },

  updateCartQty(id, delta) {
    SoundEffects.playTap();
    const item = AppState.cart.find(c => c.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      AppState.cart = AppState.cart.filter(c => c.id !== id);
    }
    AppState.save();
    this.updateCartBadge();
    this.renderCurrentTab();
  },

  removeFromCart(id) {
    SoundEffects.playTap();
    AppState.cart = AppState.cart.filter(c => c.id !== id);
    AppState.save();
    this.updateCartBadge();
    this.renderCurrentTab();
    this.showToast('Item removed from bag');
  },

  clearCart() {
    AppState.cart = [];
    AppState.appliedCoupon = null;
    AppState.save();
    this.updateCartBadge();
    this.renderCurrentTab();
  },

  updateCartBadge() {
    const totalCount = AppState.cart.reduce((sum, i) => sum + i.qty, 0);
    const badge = document.getElementById('cart-nav-badge');
    if (badge) {
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? 'flex' : 'none';
    }
  },

  selectSlot(slotId) {
    SoundEffects.playTap();
    AppState.selectedSlot = slotId;
    this.renderCurrentTab();
  },

  applyCoupon(code) {
    SoundEffects.playTap();
    const cleaned = (code || '').trim().toUpperCase();
    const coupon = BAKINGO_DATA.coupons.find(c => c.code === cleaned);
    if (!coupon) {
      this.showToast('Invalid Coupon Code');
      return;
    }
    AppState.appliedCoupon = coupon;
    this.showToast(`Coupon ${coupon.code} applied! 🎉`);
    this.renderCurrentTab();
  },

  removeCoupon() {
    AppState.appliedCoupon = null;
    this.renderCurrentTab();
    this.showToast('Coupon removed');
  },

  // ==========================================
  // 8. CAKE STUDIO METHODS
  // ==========================================
  updateCakeStudioFlavor(id, name, color, basePrice) {
    SoundEffects.playTap();
    AppState.cakeStudio.flavorId = id;
    AppState.cakeStudio.flavorName = name;
    AppState.cakeStudio.flavorColor = color;
    AppState.cakeStudio.price = basePrice;
    this.renderCurrentTab();
  },

  updateCakeStudioSize(tier, weight, mult) {
    SoundEffects.playTap();
    AppState.cakeStudio.tier = tier;
    AppState.cakeStudio.weight = weight;
    const base = BAKINGO_DATA.products[0].price * 1.5;
    AppState.cakeStudio.price = Math.round(base * mult);
    this.renderCurrentTab();
  },

  updateCakeStudioMessage(msg) {
    AppState.cakeStudio.message = msg;
    const msgEl = document.querySelector('.cake-piped-message');
    if (msgEl) msgEl.textContent = msg || 'Happy Moments';
  },

  updateCakeStudioTopper(topper) {
    SoundEffects.playTap();
    AppState.cakeStudio.topper = topper;
    this.renderCurrentTab();
  },

  updateCakeStudioPreview() {
    const l1 = document.getElementById('cake-layer-1');
    if (l1) l1.style.backgroundColor = AppState.cakeStudio.flavorColor;
    const l2 = document.getElementById('cake-layer-2');
    if (l2) l2.style.backgroundColor = AppState.cakeStudio.flavorColor;
  },

  addCustomCakeToCart() {
    const s = AppState.cakeStudio;
    const customId = `custom-cake-${Date.now()}`;
    const customName = `Custom ${s.flavorName} (${s.topper !== 'None' ? s.topper : 'Cake'})`;
    const metaDesc = `${s.weight} • Msg: "${s.message}"`;
    const previewImg = 'https://lh3.googleusercontent.com/aida/AP1WRLuGcpxm5tuyUQFYU53WTRCYi2h5SUhhLCyrn2BKo9HPEYCdtEn1KHwIPRSobtBdjHhQoGcoPkHMSMm7foY3zKsfqUNyH2MuoqZwHSpIb5waCJ0QPkao352miUUzazWf3zEcrreyF3FiriZ0BjGQXF58BlMR77gofDCKmJ-1SVfBSpS8ffKlWp_VlC83KAPaBLx-PLaxSUk4h8v-yHUI33WN-JxTRJpXaXiunFbWogjLzg3LGT-siMoxDWpc';

    this.addToCart(customId, customName, s.price, previewImg, metaDesc);
    this.switchTab('cart');
  },

  // ==========================================
  // 9. MODALS & BOTTOM SHEETS
  // ==========================================
  openProductModal(productId) {
    SoundEffects.playTap();
    const p = BAKINGO_DATA.products.find(item => item.id === productId);
    if (!p) return;
    AppState.selectedProductForModal = p;

    const modalContent = document.getElementById('generic-sheet-content');
    modalContent.innerHTML = `
      <div class="sheet-handle-bar" onclick="App.closeBottomSheet()"></div>
      <div class="overflow-y-auto max-h-[80vh] p-5 space-y-4">
        <div class="aspect-[4/3] rounded-2xl overflow-hidden bg-surface-dim relative">
          <img src="${p.image}" class="w-full h-full object-cover" alt="${p.name}" />
          ${p.isEggless ? `
            <span class="absolute bottom-3 left-3 bg-white/95 px-2.5 py-1 rounded-full text-[10px] font-bold text-green-700 flex items-center gap-1 shadow-sm">
              <span class="w-2 h-2 rounded-full bg-green-600"></span> 100% Eggless Patisserie
            </span>
          ` : ''}
        </div>
        <div>
          <div class="flex justify-between items-start">
            <h2 class="font-display-lg text-lg font-bold text-on-surface">${p.name}</h2>
            <span class="font-bold text-base text-primary">₹ ${p.price}</span>
          </div>
          <p class="text-xs text-secondary mt-1.5 leading-relaxed">${p.description}</p>
        </div>

        <!-- Weight Selection -->
        ${p.weights ? `
          <div>
            <label class="font-bold text-xs text-on-surface block mb-2">Select Weight / Size</label>
            <div class="grid grid-cols-3 gap-2">
              ${p.weights.map((w, idx) => `
                <button 
                  onclick="App.selectProductWeight('${p.id}', '${w.label}', ${w.price})" 
                  class="p-2.5 rounded-xl border text-center transition-all ${idx === 0 ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-[#eae5e4]'}"
                >
                  <div class="text-xs font-bold text-on-surface">${w.label}</div>
                  <div class="text-[10px] text-primary font-semibold mt-0.5">₹ ${w.price}</div>
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Message on cake input -->
        <div>
          <label class="font-bold text-xs text-on-surface block mb-1">Message on Cake (Optional)</label>
          <input 
            type="text" 
            id="modal-cake-message"
            maxlength="28" 
            placeholder="e.g. Best Wishes Sarah"
            class="w-full h-10 px-3.5 bg-surface rounded-xl border border-[#eae5e4] text-xs font-medium focus:outline-none focus:border-primary"
          />
        </div>

        <button 
          onclick="App.addFromModal('${p.id}')"
          class="w-full py-3.5 bg-primary text-white text-xs font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 active:scale-95"
        >
          <span class="material-symbols-outlined text-base">shopping_bag</span>
          <span>Add to Bag • ₹ ${p.price}</span>
        </button>
      </div>
    `;

    document.getElementById('generic-bottom-sheet').classList.add('active');
  },

  selectProductWeight(productId, label, price) {
    SoundEffects.playTap();
    const p = AppState.selectedProductForModal;
    if (p) p._selectedWeight = { label, price };
  },

  addFromModal(productId) {
    const p = AppState.selectedProductForModal;
    if (!p) return;
    const msg = (document.getElementById('modal-cake-message')?.value || '').trim();
    const weight = p._selectedWeight || (p.weights ? p.weights[0] : { label: '1.0 Kg', price: p.price });
    const meta = msg ? `${weight.label} • Msg: "${msg}"` : weight.label;

    this.addToCart(p.id, p.name, weight.price, p.image, meta);
    this.closeBottomSheet();
  },

  openCheckoutModal(grandTotal) {
    SoundEffects.playTap();
    const modalContent = document.getElementById('generic-sheet-content');
    modalContent.innerHTML = `
      <div class="sheet-handle-bar" onclick="App.closeBottomSheet()"></div>
      <div class="overflow-y-auto max-h-[85vh] p-5 space-y-4">
        <h2 class="font-display-lg text-lg font-bold text-on-surface">Confirm Order & Payment</h2>
        
        <!-- Delivery Address Box -->
        <div class="p-3.5 bg-surface rounded-2xl border border-[#eae5e4] space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold uppercase tracking-wider text-secondary">Delivery Destination</span>
            <button onclick="App.openLocationModal()" class="text-[11px] font-bold text-primary">Change</button>
          </div>
          <div class="font-bold text-xs text-on-surface flex items-center gap-1.5">
            <span class="material-symbols-outlined text-primary text-base">home</span>
            <span>Home • ${AppState.selectedArea}</span>
          </div>
          <p class="text-[11px] text-secondary">Flat 402, Royal Residency, Jaipur 302001</p>
        </div>

        <!-- Payment Method Options -->
        <div class="space-y-2">
          <label class="font-bold text-xs text-on-surface block">Select Payment Method</label>
          
          <label class="p-3 rounded-2xl border border-primary bg-primary/5 flex items-center justify-between cursor-pointer">
            <div class="flex items-center gap-2.5">
              <input type="radio" name="pay-method" checked class="text-primary focus:ring-0" />
              <div>
                <div class="font-bold text-xs text-on-surface">UPI Instant (GPay / PhonePe / Paytm)</div>
                <div class="text-[10px] text-green-700 font-semibold">⚡ Fastest & Zero Convenience Fee</div>
              </div>
            </div>
            <span class="material-symbols-outlined text-primary">qr_code_scanner</span>
          </label>

          <label class="p-3 rounded-2xl border border-[#eae5e4] flex items-center justify-between cursor-pointer">
            <div class="flex items-center gap-2.5">
              <input type="radio" name="pay-method" class="text-primary focus:ring-0" />
              <div>
                <div class="font-bold text-xs text-on-surface">Credit / Debit Card</div>
                <div class="text-[10px] text-secondary">Visa, Mastercard, RuPay</div>
              </div>
            </div>
            <span class="material-symbols-outlined text-secondary">credit_card</span>
          </label>

          <label class="p-3 rounded-2xl border border-[#eae5e4] flex items-center justify-between cursor-pointer">
            <div class="flex items-center gap-2.5">
              <input type="radio" name="pay-method" class="text-primary focus:ring-0" />
              <div>
                <div class="font-bold text-xs text-on-surface">Cash on Delivery (COD)</div>
                <div class="text-[10px] text-secondary">Pay upon receiving fresh cake</div>
              </div>
            </div>
            <span class="material-symbols-outlined text-secondary">payments</span>
          </label>
        </div>

        <!-- Pay Button -->
        <button 
          onclick="App.placeOrderSuccess(${grandTotal})"
          class="w-full py-4 bg-primary text-white text-xs font-bold rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <span class="material-symbols-outlined text-base">lock</span>
          <span>Pay ₹ ${grandTotal} & Place Order</span>
        </button>
      </div>
    `;

    document.getElementById('generic-bottom-sheet').classList.add('active');
  },

  placeOrderSuccess(grandTotal) {
    SoundEffects.playCelebrate();
    const newOrder = {
      id: Math.floor(100000 + Math.random() * 900000),
      items: [...AppState.cart],
      total: grandTotal,
      eta: '24 mins',
      step: 2,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    AppState.activeOrder = newOrder;
    AppState.cart = [];
    AppState.save();
    this.updateCartBadge();
    this.closeBottomSheet();

    // Trigger celebration confetti
    this.launchConfetti();

    this.switchTab('orders');
    this.showToast('🎉 Order Placed Successfully! Chef is baking now.');
  },

  openLiveMapModal() {
    SoundEffects.playTap();
    const modalContent = document.getElementById('generic-sheet-content');
    modalContent.innerHTML = `
      <div class="sheet-handle-bar" onclick="App.closeBottomSheet()"></div>
      <div class="p-4 space-y-3">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-bold text-sm text-on-surface">Rider Rahul on the way</h3>
            <p class="text-[11px] text-primary font-semibold">⚡ Arriving in 18 minutes</p>
          </div>
          <div class="flex gap-2">
            <button onclick="App.showToast('Calling delivery partner Rahul...')" class="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
              <span class="material-symbols-outlined text-base">call</span>
            </button>
            <button onclick="App.showToast('Opening chat with Bakingo Support...')" class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <span class="material-symbols-outlined text-base">chat</span>
            </button>
          </div>
        </div>

        <!-- Simulated Interactive Map Canvas -->
        <div class="h-64 rounded-2xl bg-[#e5e7eb] relative overflow-hidden border border-[#d1d5db]">
          <svg class="w-full h-full" viewBox="0 0 400 300">
            <!-- Road map simulation lines -->
            <rect width="400" height="300" fill="#f1f5f9"/>
            <path d="M 50 150 Q 150 80 250 160 T 350 120" fill="none" stroke="#cbd5e1" stroke-width="14"/>
            <path d="M 120 30 L 120 280" fill="none" stroke="#cbd5e1" stroke-width="10"/>
            <path d="M 280 20 L 280 270" fill="none" stroke="#cbd5e1" stroke-width="10"/>
            <!-- Active Route Path -->
            <path d="M 60 150 Q 150 80 220 130" fill="none" stroke="#ad0d18" stroke-width="4" stroke-dasharray="6,4"/>
            <!-- Bakery Kitchen Dot -->
            <circle cx="60" cy="150" r="10" fill="#1b1c1c"/>
            <text x="60" y="180" font-size="10" font-weight="bold" fill="#1b1c1c" text-anchor="middle">Bakingo Kitchen</text>
            <!-- Destination Pin -->
            <circle cx="320" cy="130" r="10" fill="#15803d"/>
            <text x="320" y="160" font-size="10" font-weight="bold" fill="#15803d" text-anchor="middle">Your Location</text>
            <!-- Rider Icon -->
            <g transform="translate(210, 120)">
              <circle cx="10" cy="10" r="16" fill="#ad0d18" opacity="0.2"/>
              <circle cx="10" cy="10" r="10" fill="#ad0d18"/>
              <text x="10" y="14" font-size="12" fill="white" text-anchor="middle">🛵</text>
            </g>
          </svg>
          <div class="absolute bottom-3 left-3 bg-white/95 px-3 py-1.5 rounded-xl shadow-md text-[11px] font-bold text-on-surface">
            📍 Current location: MI Road, Jaipur
          </div>
        </div>

        <button onclick="App.closeBottomSheet()" class="w-full py-2.5 bg-surface text-secondary text-xs font-bold rounded-xl border border-[#eae5e4]">
          Close Map
        </button>
      </div>
    `;

    document.getElementById('generic-bottom-sheet').classList.add('active');
  },

  openLocationModal() {
    SoundEffects.playTap();
    const modalContent = document.getElementById('generic-sheet-content');
    modalContent.innerHTML = `
      <div class="sheet-handle-bar" onclick="App.closeBottomSheet()"></div>
      <div class="p-5 space-y-3">
        <h3 class="font-bold text-sm text-on-surface">Select Delivery Location in Jaipur</h3>
        <p class="text-xs text-secondary">Choose your area for real-time 2-hr bakery slot availability</p>
        <div class="space-y-1.5 pt-2 max-h-60 overflow-y-auto">
          ${BAKINGO_DATA.jaipurAreas.map(area => `
            <button 
              onclick="App.setDeliveryArea('${area}')"
              class="w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${AppState.selectedArea === area ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-[#eae5e4] text-on-surface'}"
            >
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm">location_on</span>
                <span class="text-xs">${area}</span>
              </div>
              ${AppState.selectedArea === area ? '<span class="text-xs">✓</span>' : ''}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    document.getElementById('generic-bottom-sheet').classList.add('active');
  },

  setDeliveryArea(area) {
    SoundEffects.playTap();
    AppState.selectedArea = area;
    AppState.save();
    this.closeBottomSheet();
    this.renderCurrentTab();
    this.showToast(`Delivering to ${area}`);
  },

  openWishlistModal() {
    SoundEffects.playTap();
    const wishlistedProducts = BAKINGO_DATA.products.filter(p => AppState.wishlist.has(p.id));
    const modalContent = document.getElementById('generic-sheet-content');
    modalContent.innerHTML = `
      <div class="sheet-handle-bar" onclick="App.closeBottomSheet()"></div>
      <div class="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
        <h3 class="font-bold text-sm text-on-surface">Your Wishlist (${wishlistedProducts.length})</h3>
        ${wishlistedProducts.length === 0 ? `
          <div class="text-center py-8 text-secondary text-xs">No favorites added yet. Tap the heart on any cake to save it!</div>
        ` : `
          <div class="space-y-3">
            ${wishlistedProducts.map(p => `
              <div class="flex items-center justify-between p-2.5 bg-surface rounded-xl border border-[#eae5e4]">
                <div class="flex items-center gap-3">
                  <img src="${p.image}" class="w-12 h-12 rounded-lg object-cover" alt="${p.name}" />
                  <div>
                    <h5 class="font-bold text-xs text-on-surface">${p.name}</h5>
                    <span class="font-bold text-xs text-primary">₹ ${p.price}</span>
                  </div>
                </div>
                <button onclick="App.quickAddToCart('${p.id}'); App.closeBottomSheet();" class="px-3 py-1 bg-primary text-white text-[11px] font-bold rounded-lg">+ Add</button>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;

    document.getElementById('generic-bottom-sheet').classList.add('active');
  },

  openProfileModal() {
    SoundEffects.playTap();
    const modalContent = document.getElementById('generic-sheet-content');
    modalContent.innerHTML = `
      <div class="sheet-handle-bar" onclick="App.closeBottomSheet()"></div>
      <div class="p-5 space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-14 h-14 rounded-full bg-primary text-white font-bold text-xl flex items-center justify-center shadow-md">
            BK
          </div>
          <div>
            <h3 class="font-bold text-sm text-on-surface">Bakingo VIP Member</h3>
            <p class="text-xs text-secondary">+91 98290 12345 • Jaipur</p>
            <span class="inline-block mt-1 px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full">⭐ 450 Bakingo Club Points</span>
          </div>
        </div>

        <div class="space-y-2 pt-2 text-xs">
          <button onclick="App.switchTab('orders'); App.closeBottomSheet();" class="w-full p-3 rounded-xl bg-surface border border-[#eae5e4] flex items-center justify-between text-on-surface font-semibold">
            <span class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-base">receipt_long</span> Orders & Invoices</span>
            <span class="material-symbols-outlined text-secondary text-sm">chevron_right</span>
          </button>
          <button onclick="App.showToast('Jaipur customer helpline: 1800-BAKINGO');" class="w-full p-3 rounded-xl bg-surface border border-[#eae5e4] flex items-center justify-between text-on-surface font-semibold">
            <span class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-base">support_agent</span> 24x7 Customer Support</span>
            <span class="material-symbols-outlined text-secondary text-sm">chevron_right</span>
          </button>
          <button onclick="App.showToast('App version: 2.4.0 (Jaipur Edition)');" class="w-full p-3 rounded-xl bg-surface border border-[#eae5e4] flex items-center justify-between text-on-surface font-semibold">
            <span class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-base">info</span> About Bakingo Artisanal</span>
            <span class="material-symbols-outlined text-secondary text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    `;

    document.getElementById('generic-bottom-sheet').classList.add('active');
  },

  openStoryModal(storyId) {
    SoundEffects.playTap();
    const story = BAKINGO_DATA.stories.find(s => s.id === storyId);
    if (!story) return;
    this.showToast(`Viewing ${story.title} • ${story.label}`);
    this.switchTab('menu');
  },

  openCustomHamperModal() {
    SoundEffects.playTap();
    this.showToast('Launching Custom Hamper Builder...');
    this.switchTab('studio');
  },

  reorderItem(productId) {
    this.quickAddToCart(productId);
    this.switchTab('cart');
  },

  closeBottomSheet() {
    const sheet = document.getElementById('generic-bottom-sheet');
    if (sheet) sheet.classList.remove('active');
  },

  showToast(message) {
    const toast = document.getElementById('app-toast');
    if (!toast) return;
    toast.innerHTML = `<span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  },

  launchConfetti() {
    try {
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;
      const colors = ['#ad0d18', '#f59e0b', '#10b981', '#ffffff', '#e11d48'];

      (function frame() {
        if (Date.now() > end) return;
        for (let i = 0; i < 4; i++) {
          const piece = document.createElement('div');
          piece.style.position = 'fixed';
          piece.style.top = '10%';
          piece.style.left = `${Math.random() * 80 + 10}%`;
          piece.style.width = '8px';
          piece.style.height = '8px';
          piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
          piece.style.zIndex = '9999';
          piece.style.pointerEvents = 'none';
          piece.style.transform = `rotate(${Math.random() * 360}deg)`;
          piece.style.transition = 'all 1.5s cubic-bezier(0.25, 1, 0.5, 1)';
          document.body.appendChild(piece);

          setTimeout(() => {
            piece.style.transform = `translate(${(Math.random() - 0.5) * 200}px, 600px) rotate(${Math.random() * 720}deg)`;
            piece.style.opacity = '0';
          }, 20);

          setTimeout(() => piece.remove(), 1600);
        }
        requestAnimationFrame(frame);
      })();
    } catch (e) {}
  },

  // ==========================================
  // 10. DESKTOP VIEWPORT CONTROLS
  // ==========================================
  setDeviceMode(mode) {
    SoundEffects.playTap();
    const wrapper = document.getElementById('app-viewport-wrapper');
    const frame = document.getElementById('device-frame');
    document.querySelectorAll('.desktop-controls-bar button').forEach(b => b.classList.remove('active-device'));

    if (mode === 'iphone') {
      wrapper.classList.remove('fullscreen-mode');
      frame.style.width = '412px';
      frame.style.height = '875px';
      frame.style.borderRadius = '54px';
      document.getElementById('btn-iphone').classList.add('active-device');
    } else if (mode === 'android') {
      wrapper.classList.remove('fullscreen-mode');
      frame.style.width = '390px';
      frame.style.height = '844px';
      frame.style.borderRadius = '40px';
      document.getElementById('btn-android').classList.add('active-device');
    } else if (mode === 'fullscreen') {
      wrapper.classList.add('fullscreen-mode');
      document.getElementById('btn-full').classList.add('active-device');
    }
  },

  bindEvents() {
    // Backdrop click to close bottom sheet
    document.getElementById('generic-bottom-sheet')?.addEventListener('click', (e) => {
      if (e.target.id === 'generic-bottom-sheet') {
        this.closeBottomSheet();
      }
    });
  },

  initPWA() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  }
};

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
