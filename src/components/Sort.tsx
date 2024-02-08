import React from 'react';
import { OptionsNamesEnum } from '../redux/slices/filterSlice';

export type OptionsItem = {
  option: string;
  optionName: OptionsNamesEnum;
}

type SortProps = {
  activeSortOption: string;
  onClickOption: (obj: OptionsItem) => void;
  sortDirection: string;
  onClickSortDirection: () => void;
}

export const optionsList:OptionsItem[] = [
  { option: 'popularity', optionName: OptionsNamesEnum.RATING },
  { option: 'price', optionName: OptionsNamesEnum.PRICE },
  { option: 'alphabet', optionName: OptionsNamesEnum.TITLE },
];

const Sort:React.FC<SortProps> = React.memo(({ activeSortOption, onClickOption, sortDirection, onClickSortDirection }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const onClickOnOptionsItem = (obj: OptionsItem) => {
    onClickOption(obj);
    setOpen(false);
  };

  const handleOutiseClose = (e: MouseEvent) => {
    const composed = e.composedPath()
      if (sortRef.current && !composed.includes(sortRef.current)) {
        setOpen(false);
      }
  }

  React.useEffect(() => {
    document.body.addEventListener('click', handleOutiseClose)

    return () => {
      document.body.removeEventListener('click', handleOutiseClose)
    }
  }, [])

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg 
          className={sortDirection ? '' : 'active'}
          onClick={onClickSortDirection}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sorting by:</b>
        <span onClick={() => setOpen(!open)}>{activeSortOption}</span>
      </div>
      {open && (
        <div className="sort__popup" >
          <ul>
            {optionsList.map((obj, i) => {
              return (
                <li
                  className={activeSortOption === obj.option ? 'active' : ''}
                  onClick={() => onClickOnOptionsItem(obj)}
                  key={obj.optionName}>
                  {obj.option}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
})

export default Sort;
