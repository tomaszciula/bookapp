import { useEffect, useState } from "react";
import Clock from "react-clock";
import 'react-clock/dist/Clock.css';


const MyClock = (value, setValue) => {
  
    return (
      <div>
        <p>Current time:</p>
        <Clock value={value} />
      </div>
    );
}

export default MyClock