import Categories from '../components/Categories';
import Search from '../components/Search';
import Pagination from '../components/Pagination';
import PizzaList from '../components/PizzaList';
import Sorting from '../components/Sorting';

const Home = () => {
  return (
    <div className="content">
      <div className="container">
        <Search />
        <div className="content__top">
          <Categories />
          <Sorting />
        </div>
        <PizzaList />
        <Pagination />
      </div>
    </div>
  );
};

export default Home;
