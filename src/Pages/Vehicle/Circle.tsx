import React, { useEffect, useState } from 'react'
import { vehicleModel } from '../../interfaces/vehicleModel'
import "./Styles/Circle.css"
import formatTime from '../../Utility/formatTime';

function Circle(props:{vehicle:vehicleModel}) {
  const {vehicle}=props;
  const [countdown,setCountDown]= useState(calculateCountDown());

  function calculateCountDown() {
    const endTime= new Date(vehicle.endTime).getTime();
    const currentTime= new Date().getTime();
    const timeRemaining=endTime-currentTime;
    if(timeRemaining===0) {
      return 0;
    }
    return Math.max(0,timeRemaining)
  }

useEffect(() => {
  const interval = setInterval(() => {
      setCountDown(prevCountdown => {
          if (prevCountdown <= 0) {
              clearInterval(interval); 
              return 0; 
          }
          return prevCountdown - 1000; 
      });
  }, 1000); 
  return () => clearInterval(interval); 
}, []); 

  return (
    <div className='circle' style={{display:"flex", 
    justifyContent:"center", alignItems:"center"}}>
      <h1 className='text-dark'style={{fontSize:"16px"}}>
        {countdown===0 ? "Auction Ended": formatTime(countdown)}
      </h1>
    </div>
  )
}

export default Circle
