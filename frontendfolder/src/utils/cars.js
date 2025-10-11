import carActive from "../assets/smcar.svg";
import carInactive from "../assets/nonactivecar.svg";
import planeActive from "../assets/activeplane.svg";
import planeInactive from "../assets/grayplane.svg";
import locationActive from "../assets/activelocation.svg";
import locationInactive from "../assets/graylocation.svg";

export const CATEGORY_DATA = [
  { label: "All", activeIcon: carActive, inactiveIcon: carInactive },
  { label: "Airport", activeIcon: planeActive, inactiveIcon: planeInactive },
  {
    label: "Nearby",
    activeIcon: locationActive,
    inactiveIcon: locationInactive,
  },
  { label: "Taxi", activeIcon: carActive, inactiveIcon: carInactive },
  { label: "Flight", activeIcon: planeActive, inactiveIcon: planeInactive },
  {
    label: "Hotel",
    activeIcon: locationActive,
    inactiveIcon: locationInactive,
  },
];

export const CARS_DATA = [
  {
    id: 1,
    name: "Mercedes Benz 480",
    type: "SUV",
    year: 2022,
    price: 500,
    mode: "Auto",
    seatnum: "5",
  },
  {
    id: 2,
    name: "Toyota Corolla",
    type: "Sedan",
    year: 2020,
    price: 300,
    mode: "Manual",
    seatnum: "5",
  },
  {
    id: 3,
    name: "Ford F-150",
    type: "Truck",
    year: 2025,
    price: 600,
    mode: "Manual",
    seatnum: "2",
  },
  {
    id: 4,
    name: "Honda Odyssey",
    type: "Family Car",
    year: 2019,
    price: 200,
    mode: "Auto",
    seatnum: "5",
  },
  {
    id: 5,
    name: "BMW X5",
    type: "SUV",
    year: 2023,
    price: 550,
    mode: "Auto",
    seatnum: "5",
  },
  {
    id: 6,
    name: "Kia Rio",
    type: "Hatchback",
    year: 2021,
    price: 250,
    mode: "Manual",
    seatnum: "5",
  },
  {
    id: 7,
    name: "Audi A6",
    type: "Sedan",
    year: 2022,
    price: 400,
    mode: "Auto",
    seatnum: "5",
  },
  {
    id: 8,
    name: "Lexus GX460",
    type: "SUV",
    year: 2020,
    price: 480,
    mode: "Auto",
    seatnum: "5",
  },
];
