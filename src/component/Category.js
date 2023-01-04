import React from 'react';

function Category({ categories, filterItems }) {
  return (
    <div>
      {categories.map((item, index) => {
        return (
          <button
            className=" btn "
            key={index}
            style={{
              backgroundColor: '#009000',
              color: 'white',
              borderColor: '#009000',
            }}
            onClick={() => filterItems(item)}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

export default Category;
