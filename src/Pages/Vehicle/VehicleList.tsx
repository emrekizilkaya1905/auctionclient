import React, { useState } from 'react'
import { useGetVehiclesQuery } from '../../Api/vehicleApi'

function VehicleList() {
  const {data,isLoading} = useGetVehiclesQuery(null);
  const [write,setWriteState]= useState("data is loading");
  const handleCLickForVehicels=()=> {
    console.log(data)
    setWriteState("Data is loading on console.")
  }
  return (
    <div>
      <button className='btn btn-warning' onClick={handleCLickForVehicels}> GetVehicles</button>
      <h1>{write}</h1>
    </div>
  )
}

export default VehicleList
