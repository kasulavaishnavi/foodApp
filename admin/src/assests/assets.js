import basket_icon from "./basket_icon.png";
import search_icon from "./search_icon.png";
import add_icon_white from "./add_icon_white.png";
import add_icon_green from "./add_icon_green.png";
import remove_icon_red from "./remove_icon_red.png";
import cross_icon from "./cross_icon.png";
import selector_icon from "./selector_icon.png";
import confirmed from "./confirmed.jpg";

import burger_logo from "./burger logo.png";
import vegan_burger from "./-vegan-burger.avif";
import grilled_beef from "./grilled beef burger.avif";
import double_cheese from "./double cheeseburger.avif";
import deep_fired_chicken from "./deep fired chicken.avif";

import pizza_logo from "./pizza logo.png";
import pepporoni from "./pepperoni pizza.avif";
import margherita from "./pizza1.jpg";
import bellpeper_olives from "./pizza2.jpg";
import eggPlant from "./eggplant tomato topping.avif";
import mushroom from "./mushrooms tomato sauce.avif";
import chicken_bellpepper from "./chicken pizza with bellpepper.avif";

import sandwich_logo from "./sandwich logo.png";
import sandwich1 from "./sandwich.png";
import sandwich2 from "./sandwich2.png";
import sandwich3 from "./sandwich3.png";
import salted_cucumbers from "./salted-cucumbers.avif";

import salad_logo from "./salad logo.png";
import salad from "./salad.png";
import salad1 from "./salad1.png";
import salad2 from "./salad2.png";
import salad3 from "./salad3.png";
import salad4 from "./salad4.png";
import salad5 from "./salad5.png";
import salad6 from "./salad6.png";

import roll_logo from "./roll logo.png";
import roll from "./roll.png";
import roll1 from "./roll1.png";
import roll2 from "./roll2.png";
import grilled_chicken from "./grilled-chicken.avif";
import paneer from "./paneer.avif";

import fries_logo from "./fries logo.png";
import melted_cheese from "./french-fries-with-melted-cheese.avif";
import sausage from "./fried-potatoes-with-sausage.avif";
import chicken_courgette from "./chicken-courgette-served-with-mayonnaise-with-herbs.jpg";
import peri_peri from "./peri peri.avif";

import dessert_logo from "./dessert logo.png";
import dessert from "./dessert.png";
import dessert1 from "./dessert1.png";
import dessert2 from "./dessert2.png";
import dessert3 from "./dessert3.png";
import dessert4 from "./dessert4.png";
import dessert5 from "./dessert5.png";
import dessert6 from "./dessert6.png";

import coffee_logo from "./coffee logo.png";
import latte from "./latte-.avif";
import cappuccino from "./cappuccino.avif";
import three_layer from "./cup three layered.avif";
import iced_coffee from "./iced Coffee.avif";
import frappuccino from "./frappuccino.avif";
import latte_macchiato from "./latte macchiato.avif";
import espresso from "./espresso dark.avif";

import pasta_logo from "./pasta logo.png";
import pasta from "./pasta.png";
import pasta1 from "./pasta1.png";
import pasta2 from "./pasta2.png";
import pasta3 from "./pasta3.png";
import pasta4 from "./pasta4.png";
import pasta5 from "./pasta5.png";
import pasta6 from "./pasta6.png";
import pasta7 from "./pasta7.png";


export const assets = {
  basket_icon,
  search_icon,
  add_icon_green,
  add_icon_white,
  remove_icon_red,
  cross_icon,
  burger_logo,
  pizza_logo,
  sandwich_logo,
  salad_logo,
  roll_logo,
  fries_logo,
  dessert_logo,
  coffee_logo,
  pasta_logo,
};

export const menu_list = [
  {
    menu_name: "Coffee",
    menu_image: coffee_logo,
    time:10
  },
  {
    menu_name: "Fries",
    menu_image: fries_logo,
    time:10
  },
  {
    menu_name: "Salad",
    menu_image: salad_logo,
    time: 10
  },
  {
    menu_name: "Sandwich",
    menu_image: sandwich_logo,
    time: 10
  },
  {
    menu_name: "Rolls",
    menu_image: roll_logo,
    time: 15
  },
  {
    menu_name: "Pizza",
    menu_image: pizza_logo,
    time: 20
  },
  {
    menu_name: "Burger",
    menu_image: burger_logo,
    time: 20
  },
  {
    menu_name: "Pasta",
    menu_image: pasta_logo,
    time:20
  },
  {
    menu_name: "Deserts",
    menu_image: dessert_logo,
    time: 20,
  },
];

export const food_list = [
  {
    _id: "1",
    name: "Chicken Mango Salad",
    image: salad1,
    price: 220,
    category: "Salad",
  },
  {
    _id: "2",
    name: "Cobb salad",
    image: salad,
    price: 230,
    category: "Salad",
  },
  {
    _id: "3",
    name: "Radicchio Salad",
    image: salad2,
    price: 220,
    category: "Salad",
  },
  {
    _id: "4",
    name: "Halloumi Salad",
    image: salad3,
    price: 240,
    category: "Salad",
  },
  {
    _id: "5",
    name: "Eggplant Salad",
    image: salad4,
    price: 200,
    category: "Salad",
  },
  {
    _id: "6",
    name: "Chickpea Chicken Salad",
    image: salad5,
    price: 250,
    category: "Salad",
  },
  {
    _id: "7",
    name: "Ceasar Salad",
    image: salad6,
    price: 240,
    category: "Salad",
  },
  {
    _id: "8",
    name: "Latte",
    image: latte,
    price: 160,
    category: "Coffee",
  },
  {
    _id: "9",
    name: "Cappuccino",
    image: cappuccino,
    price: 150,
    category: "Coffee",
  },
  {
    _id: "10",
    name: "Three Layered",
    image: three_layer,
    price: 190,
    category: "Coffee",
  },
  {
    _id: "11",
    name: "Frappuccino",
    image: frappuccino,
    price: 150,
    category: "Coffee",
  },
  {
    _id: "12",
    name: "Latte macchiato",
    image: latte_macchiato,
    price: 160,
    category: "Coffee",
  },
  {
    _id: "13",
    name: "Iced Coffee",
    image: iced_coffee,
    price: 170,
    category: "Coffee",
  },
  {
    _id: "14",
    name: "Espresso",
    image: espresso,
    price: 140,
    category: "Coffee",
  },
  {
    _id: "15",
    name: "French Fries with Sausage",
    image: sausage,
    price: 140,
    category: "Fries",
  },
  {
    _id: "16",
    name: "French Fries with Melted Cheese",
    image: melted_cheese,
    price: 150,
    category: "Fries",
  },
  {
    _id: "17",
    name: "Chicken Courgtte",
    image: chicken_courgette,
    price: 170,
    category: "Fries",
  },
  {
    _id: "18",
    name: "Peri Peri Fries",
    image: peri_peri,
    price: 180,
    category: "Fries",
  },
  {
    _id: "19",
    name: "Grilled Chicken Sandwich",
    image: sandwich1,
    price: 180,
    category: "Sandwich",
  },
  {
    _id: "20",
    name: "Salted Cucumbers",
    image: salted_cucumbers,
    price: 160,
    category: "Sandwich",
  },
  {
    _id: "21",
    name: "Pepperoni",
    image: sandwich2,
    price: 180,
    category: "Sandwich",
  },
  {
    _id: "22",
    name: "Cucumber Tomato with Salami",
    image: sandwich3,
    price: 180,
    category: "Sandwich",
  },
  {
    _id: "23",
    name: "Veg Sandwich ",
    image: sandwich1,
    price: 180,
    category: "Sandwich",
  },
  {
    _id: "24",
    name: "Lasagna Roll",
    image: roll,
    price: 120,
    category: "Rolls",
  },
  {
    _id: "25",
    name: "Grilled Paneer",
    image: roll1,
    price: 130,
    category: "Rolls",
  },
  {
    _id: "26",
    name: "Chicken Roll",
    image: roll2,
    price: 140,
    category: "Rolls",
  },
  {
    _id: "27",
    name: "Grilled Chicken",
    image: grilled_chicken,
    price: 150,
    category: "Rolls",
  },
  {
    _id: "28",
    name: "Paneer",
    image: paneer,
    price: 120,
    category: "Rolls",
  },
  {
    _id: "29",
    name: "Pepporoni",
    image: pepporoni,
    price: 210,
    category: "Pizza",
  },
  {
    _id: "30",
    name: "Margherita",
    image: margherita,
    price: 200,
    category: "Pizza",
  },
  {
    _id: "31",
    name: "Bellpepper olives",
    image: bellpeper_olives,
    price: 220,
    category: "Pizza",
  },
  {
    _id: "32",
    name: "Eggplant",
    image: eggPlant,
    price: 200,
    category: "Pizza",
  },
  {
    _id: "33",
    name: "Mushroom",
    image: mushroom,
    price: 220,
    category: "Pizza",
  },
  {
    _id: "34",
    name: "Chicken Bellpepper",
    image: chicken_bellpepper,
    price: 220,
    category: "Pizza",
  },
  {
    _id: "35",
    name: "Vegan Burger",
    image: vegan_burger,
    price: 200,
    category: "Burger",
  },
  {
    _id: "36",
    name: "Grilled Beef",
    image: grilled_beef,
    price: 220,
    category: "Burger",
  },
  {
    _id: "37",
    name: "Double Chees",
    image: double_cheese,
    price: 220,
    category: "Burger",
  },
  {
    _id: "38",
    name: "Deep Fried Chicken",
    image: deep_fired_chicken,
    price: 220,
    category: "Burger",
  },
  {
    _id: "39",
    name: "Natto Cheese Penne",
    image: pasta,
    price: 230,
    category: "Pasta",
  },
  {
    _id: "40",
    name: "Tomato Fusilli",
    image: pasta1,
    price: 220,
    category: "Pasta",
  },
  {
    _id: "41",
    name: "Fettuccine Alfredo",
    image: pasta2,
    price: 220,
    category: "Pasta",
  },
  {
    _id: "42",
    name: "Tuscan Chicken",
    image: pasta3,
    price: 230,
    category: "Pasta",
  },
  {
    _id: "43",
    name: "Spaghetti",
    image: pasta4,
    price: 220,
    category: "Pasta",
  },
  {
    _id: "44",
    name: " Tomato Spaghetti",
    image: pasta5,
    price: 220,
    category: "Pasta",
  },
  {
    _id: "45",
    name: "Shrimp Spaghetti",
    image: pasta6,
    price: 220,
    category: "Pasta",
  },
  {
    _id: "46",
    name: "Pho",
    image: pasta7,
    price: 220,
    category: "Pasta",
  },
  {
    _id: "47",
    name: "Raspberry Ice Cream",
    image: dessert,
    price: 200,
    category: "Deserts",
  },
  {
    _id: "48",
    name: "Apricot Delight",
    image: dessert1,
    price: 220,
    category: "Deserts",
  },
  {
    _id: "49",
    name: "Strawberry Ice Cream",
    image: dessert2,
    price: 210,
    category: "Deserts",
  },
  {
    _id: "50",
    name: "Vanilla Ice Cream",
    image: dessert3,
    price: 200,
    category: "Deserts",
  },
  {
    _id: "51",
    name: "Cup Cake",
    image: dessert4,
    price: 190,
    category: "Deserts",
  },
  {
    _id: "52",
    name: "Strawberry Cheese Cake",
    image: dessert5,
    price: 220,
    category: "Deserts",
  },
  {
    _id: "53",
    name: "Caramel cheese Cake",
    image: dessert6,
    price: 210,
    category: "Deserts",
  },
];
