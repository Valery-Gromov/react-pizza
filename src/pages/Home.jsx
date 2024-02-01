import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Catigories from '../components/Catigories';
import Sort, { optionsList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

import {
  setSelectedCategory,
  setSortDirection,
  setActiveSortOption,
  setFilter,
} from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { selectedCategory, sortDirection, activeSortOption, textFilter } = useSelector(
    (state) => state.filter,
  );
  const { items, status } = useSelector((state) => state.pizza);

  const getPizzas = () => {
    const category = selectedCategory > 0 ? `category=${selectedCategory}` : '';
    const sortBy = `sortBy=${activeSortOption.optionName}`;
    const orderDirection = sortDirection ? 'order=asc' : 'order=desc';
    const searchFilter = textFilter ? `search=${textFilter}` : '';

    dispatch(fetchPizzas({ category, sortBy, orderDirection, searchFilter }));
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortOption: activeSortOption.optionName,
        selectedCategory,
        sortDirection,
        textFilter,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [selectedCategory, activeSortOption, sortDirection, textFilter]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const activeSortOption = optionsList.find((obj) => obj.optionName === params.sortOption);

      dispatch(
        setFilter({
          ...params,
          activeSortOption,
        }),
      );

      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [selectedCategory, activeSortOption, sortDirection, textFilter]);

  return (
    <>
      <div className="content__top">
        <Catigories
          selectedCategory={selectedCategory}
          onClickCategory={(i) => dispatch(setSelectedCategory(i))}
        />
        <Sort
          activeSortOption={activeSortOption.option}
          onClickOption={(obj) => dispatch(setActiveSortOption(obj))}
          sortDirection={sortDirection}
          onClickSortDirection={() => dispatch(setSortDirection(!sortDirection))}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'loading'
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((item) => {
              return <PizzaBlock key={item.id} {...item} />;
            })}
      </div>
    </>
  );
};

export default Home;
