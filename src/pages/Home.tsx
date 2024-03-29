import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Catigories from '../components/Catigories';
import Sort, { OptionsItem, optionsList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { RootState } from '../redux/store';
import { useAppDispatch } from '../redux/store';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { setActiveSortOption, setFilter, setSelectedCategory, setSortDirection } from '../redux/filter/slice';
import { SearchPizzaParams } from '../redux/pizza/types';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { selectedCategory, sortDirection, activeSortOption, textFilter } = useSelector(
    (state: RootState) => state.filter,
  );
  const { items, status } = useSelector((state: RootState) => state.pizza);

  const getPizzas = () => {
    const category = selectedCategory > 0 ? `category=${selectedCategory}` : '';
    const sortBy = `sortBy=${activeSortOption.optionName}`;
    const orderDirection = sortDirection ? 'order=asc' : 'order=desc';
    const searchFilter = textFilter ? `search=${textFilter}` : '';

    dispatch(fetchPizzas({ category, sortBy, orderDirection, searchFilter }));
  };

  const handleChangeCategory = React.useCallback(
    (i: number) => dispatch(setSelectedCategory(i)),
    [],
  );

  const handleClickSortOption = React.useCallback(
    (obj: OptionsItem) => dispatch(setActiveSortOption(obj)),
    [],
  );

  const handleClickSortDirection = React.useCallback(
    () => dispatch(setSortDirection(!sortDirection)),
    [],
  );

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
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const activeSortOption = optionsList.find((obj) => obj.optionName === params.sortBy);

      dispatch(
        setFilter({
          selectedCategory: Number(params.category),
          sortDirection: Boolean(params.orderDirection),
          activeSortOption: activeSortOption || optionsList[0],
          textFilter: params.searchFilter,
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
        <Catigories selectedCategory={selectedCategory} onClickCategory={handleChangeCategory} />
        <Sort
          activeSortOption={activeSortOption.option}
          onClickOption={handleClickSortOption}
          sortDirection={String(sortDirection)}
          onClickSortDirection={handleClickSortDirection}
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
