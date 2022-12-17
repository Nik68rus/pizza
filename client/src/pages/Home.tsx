import React from 'react';
import Categories from '../components/Categories';
import PizzaItem from '../components/PizzaItem';
import Sorting from '../components/Sorting';
import pizzas from '../assets/pizzas.json';
import { IPizza } from '../types';

const pizzaList = pizzas as IPizza[];

const Home = () => {
  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sorting />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {pizzaList.map((pizza) => (
            <PizzaItem key={pizza.id} {...pizza} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
