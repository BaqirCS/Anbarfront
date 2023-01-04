import React, { useEffect } from 'react';

function MessageBox({ showMessage, color, message }) {
  useEffect(() => {
    setTimeout(() => {
      showMessage();
    }, 1500);
    return clearTimeout();
  });
  return (
    <>
      <div className="col"> </div>
      <div
        className={`alert alert-${color} text-center col mx-auto`}
        role="alert"
      >
        <small>{message}</small>
      </div>
      <div className="col"></div>
    </>
  );
}

export default MessageBox;
