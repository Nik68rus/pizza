import React from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaItem from './components/PizzaItem';
import Sorting from './components/Sorting';
import './scss/app.scss';
import pizzas from './assets/pizzas.json';
import { IPizza } from './types';

const pizzaList = pizzas as IPizza[];

function App() {
  console.log(pizzas);

  return (
    <div className="wrapper">
      <Header />
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
    </div>
  );
}

export default App;
