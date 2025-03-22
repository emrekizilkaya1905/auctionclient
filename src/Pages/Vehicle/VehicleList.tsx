import React, { useEffect, useState } from 'react'
import { useGetVehiclesQuery } from '../../Api/vehicleApi'
import { vehicleModel } from '../../interfaces/vehicleModel';

function VehicleList() {
  const {data,isLoading} = useGetVehiclesQuery(null)
  const [vehicles,setVehiclesState]= useState<vehicleModel[]>([])
  useEffect(() => {
    if (data) {
      console.log(data)
      setVehiclesState(data.result || []);
    }
    
  }, [data]);
  return (
    <div>
     
    </div>
  )
}

export default VehicleList
