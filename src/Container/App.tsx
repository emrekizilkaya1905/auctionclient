import React from 'react';

import './App.css';

import VehicleBase from '../Pages/Vehicle/VehicleBase';
import { Header } from '../Layout';

function App() {
  return (
    <div className="App">
    <Header></Header>
    <VehicleBase></VehicleBase>
    </div>
  );
}

export default App;
