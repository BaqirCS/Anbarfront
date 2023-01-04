import React from 'react';

function Loader() {
  return (
    <div className="text-center" style={{ marginTop: '130px' }}>
      <div
        className="spinner-grow"
        style={{ width: '4rem', height: '4rem' }}
        role="status"
      >
        <span className="sr-only">...</span>
      </div>
    </div>
  );
}

export default Loader;
