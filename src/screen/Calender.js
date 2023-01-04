import React from 'react';
import JCalendar from 'reactjs-persian-calendar';

function Calender({ setTime }) {
  return (
    <div className="">
      <div className="App-header">
        <JCalendar
          size={30}
          key="fa"
          locale="fa"
          color="#000066"
          onClick={(fa) => setTime({ fa })}
        />
      </div>
    </div>
  );
}

export default Calender;
