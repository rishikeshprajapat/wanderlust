const mongoose = require('mongoose');

const sampleListings = [
  {
    title: "Rajasthan",
    description: "Beautiful desert and historical forts",
    image: {
      url: "https://picsum.photos/200",
      filename: "rajasthan.jpg"
    },
    price: 4000,
    location: "Jaipur",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [75.7873, 26.9124] // Jaipur
    }
  },
  {
    title: "Goa Beach",
    description: "Best place for vacation and parties",
    image: {
      url: "https://picsum.photos/201",
      filename: "goa.jpg"
    },
    price: 8000,
    location: "Goa",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [74.1240, 15.2993] // Goa
    }
  },
  {
    title: "Manali Hills",
    description: "Snowy mountains and peaceful environment",
    image: {
      url: "https://picsum.photos/202",
      filename: "manali.jpg"
    },
    price: 6000,
    location: "Himachal Pradesh",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [77.1892, 32.2432] // Manali
    }
  },
  {
    title: "Kerala Backwaters",
    description: "Nature beauty with houseboats",
    image: {
      url: "https://picsum.photos/203",
      filename: "kerala.jpg"
    },
    price: 7000,
    location: "Kerala",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [76.2711, 9.9312] // Kerala
    }
  },
  {
    title: "Taj Mahal",
    description: "Symbol of love and world wonder",
    image: {
      url: "https://picsum.photos/204",
      filename: "tajmahal.jpg"
    },
    price: 5000,
    location: "Agra",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [78.0421, 27.1751] // Agra
    }
  }
];

module.exports = { data: sampleListings };