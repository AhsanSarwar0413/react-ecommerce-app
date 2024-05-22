import styled from "styled-components"
import { useFilterContext } from "../context/filterContext"
import { FaCheck } from "react-icons/fa"
import FormatPrice from "../Helpers/FormatPrice"
import { Button } from "../styles/Button"

const FilterSection = () => {

  const { filter: { text, category, color, price, maxPrice, minPrice },
    updateFilterValue,
    all_products,
    clearFilters,
  } = useFilterContext();

  //get unique data of category
  const getUniqueData = (data, property) => {
    let newValue = data.map((product) => product[property]);
    if (property === 'colors') newValue = newValue.flat();
    newValue = ["all", ...new Set(newValue)];
    return newValue;
  };

  const catergoryOnlyData = getUniqueData(all_products, 'category');
  const companyOnlyData = getUniqueData(all_products, 'company');
  const colorsData = getUniqueData(all_products, 'colors');

  return (
    <Wrapper>
      <div className="filter-search">
        <form action="#" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            id="filterText"
            value={text}
            onChange={updateFilterValue}
            placeholder="Search"
          />
        </form>
      </div>
      <div className="filter-category">
        <h3>Category</h3>
        <div>
          {
            catergoryOnlyData.map((cat, index) => {
              return (
                <button
                  key="index"
                  type="button"
                  name="category"
                  value={cat}
                  className={cat === category && 'active'}
                  onClick={updateFilterValue}>
                  {cat}
                </button>
              )
            })
          }
        </div>
      </div>
      <div className="filter-category">
        <h3>Company</h3>
        <select name="company" id="company" onChange={updateFilterValue}>
          {
            companyOnlyData.map((company, index) => {
              return <option key={index} value={company} name="company">{company}</option>
            })
          }
        </select>
      </div>
      <div className="filter-colors colors">
        <h3>Colors</h3>
        <div className="filter-color-style">
          {
            colorsData.map((currentColor, index) => {
              return (
                currentColor === 'all' ?
                  <button
                    key={index}
                    value="all"
                    name="color"
                    onClick={updateFilterValue}
                    className={color === 'all' ? 'color-all--style active' : 'color-all--style'}
                  >
                    All
                  </button>
                  :
                  <button
                    key={index}
                    value={currentColor}
                    name="color"
                    className={color === currentColor ? 'btnStyle active' : 'btnStyle'}
                    style={{ backgroundColor: currentColor }}
                    onClick={updateFilterValue}
                  >
                    {color === currentColor ? <FaCheck className="checkStyle" /> : null}
                  </button>
              )
            })
          }
        </div>
      </div>

      <div class="filter_price">
        <h3>Price</h3>
        <p> <FormatPrice price={price} /></p>
        <input type="range" name="price" min={minPrice} value={price} max={maxPrice} onChange={updateFilterValue} />
      </div>

      <div className="filter-clear">
        <Button className="btn" onClick={clearFilters}>Clear Filters</Button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }

    select, option {
      text-transform: capitalize;
    }
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }
  

  .filter-color-style {
    display: flex;
    justify-content: center;

    .color-all--style {
      background-color: transparent;
      text-transform: capitalize;
      border: none;
      cursor: pointer;

      &:hover {
        color: ${({ theme }) => theme.colors.btn};
      }
    }

    .color-all--style.active {
      border-bottom: 1px solid #000;
      color: ${({ theme }) => theme.colors.btn};
    }
  }

  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;

export default FilterSection