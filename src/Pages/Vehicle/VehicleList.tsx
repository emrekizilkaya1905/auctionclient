import React, { useEffect, useState } from 'react'
import { useGetVehiclesQuery } from '../../Api/vehicleApi'
import { vehicleModel } from '../../interfaces/vehicleModel';
import './Styles/VehicleList.css';
import Circle from './Circle';

function VehicleList(props:{vehicles:vehicleModel[]}) {
  
  return (
  <>
      {props.vehicles.map((vehicle:any, index:any) => {
        return (
          <div className='col'key={index}>
        <div className="auction-card text-center">
          <div className="card-image text-center">
            <img src={vehicle.image}  alt="Car image"/>
          </div>
          <div className="card-details text-center">
            <h2>{vehicle.brandAndModel} </h2>
              <p> <strong>Year:</strong>{vehicle.manufacturingYear}</p>
              <p> <strong>Color:</strong>{vehicle.color} </p>
              <p> <strong>Current Bid:</strong> ${vehicle.price} </p>
              <p> <strong>EndTime:</strong> {vehicle.endTime} </p>
          
          </div>
          <div>
            <button className='btn btn-danger'>Detail</button>
            <Circle vehicle={vehicle}></Circle>
          </div>
        </div>
        
        </div>
        )
      })
    }
    </>
  );
}

export default VehicleList
