import React from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaItem from './components/PizzaItem';
import Sorting from './components/Sorting';
import './scss/app.scss';

function App() {
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
            <PizzaItem />
            <PizzaItem />
            <PizzaItem />
            <PizzaItem />
            <PizzaItem />
            <PizzaItem />
            <PizzaItem />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
