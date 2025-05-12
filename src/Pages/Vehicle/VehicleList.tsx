import React, { useEffect, useState } from "react";
import { useGetVehiclesQuery } from "../../Api/vehicleApi";
import { vehicleModel } from "../../interfaces/vehicleModel";
import "./Styles/VehicleList.css";
import Circle from "./Circle";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import { SD_FilterTypes } from "../../interfaces/enums/SD_FilterTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/store";

function VehicleList() {
  const { data } = useGetVehiclesQuery(null);

  const [filterResponse, setFilterResponse] = useState<vehicleModel[]>([]);
  const [result, setResultState] = useState<vehicleModel[]>([]);
  const [vehicles, setVehicleState] = useState<vehicleModel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>();
  const defaultPaginationArr: number[] = [];
  const [setSearch, setSearchState] = useState("");
  let searchElement: string = useSelector(
    (state: RootState) => state.vehicleStore.search
  );
  const filterOptions: Array<SD_FilterTypes> = [
    SD_FilterTypes.NAME_A_Z,
    SD_FilterTypes.NAME_Z_A,
    SD_FilterTypes.PRICE_HIGH_LOW,
    SD_FilterTypes.PRICE_LOW_HIGH,
  ];
  function handleFilterClick(sortTypes: any, index?: number) {
    let forSortArray = [...result];
    if (filterOptions[sortTypes] === SD_FilterTypes.PRICE_HIGH_LOW) {
      forSortArray.sort((a, b) => {
        return b.price - a.price;
      });
    }
    if (filterOptions[sortTypes] === SD_FilterTypes.PRICE_LOW_HIGH) {
      forSortArray.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (filterOptions[sortTypes] === SD_FilterTypes.NAME_A_Z) {
      forSortArray.sort((a, b) =>
        a.brandAndModel
          .toLowerCase()
          .localeCompare(b.brandAndModel.toLowerCase())
      );
    }
    if (filterOptions[sortTypes] === SD_FilterTypes.NAME_Z_A) {
      forSortArray.sort((a, b) =>
        b.brandAndModel
          .toLowerCase()
          .localeCompare(a.brandAndModel.toLowerCase())
      );
    }

    if (sortTypes === SD_FilterTypes.Pagination) {
      setCurrentPage(index!);
      const constantPage = 8;
      forSortArray = [];
      const reelResult = index! * constantPage;
      for (
        let index = reelResult;
        index <= reelResult + constantPage - 1;
        index++
      ) {
        if (data.result[index] !== undefined) {
          forSortArray.push(data.result[index]);
        }
      }
    }

    setFilterResponse(forSortArray);
  }

  useEffect(() => {
    if (data) {
      setVehicleState(data.result);
      setResultState(data.result);
      setFilterResponse(data.result);
    }
  }, [data]);
  useEffect(() => {
    const myArray: vehicleModel[] = [];
    setSearchState(searchElement);
    if (vehicles) {
      vehicles.forEach((element) => {
        const response = element.brandAndModel
          .toLowerCase()
          .includes(searchElement.toLocaleLowerCase());
        if (response === true) {
          myArray.push(element);
        }
      });
      if (setSearch !== "") {
        setFilterResponse(myArray);
      }
    }

    if (data && searchElement === "") {
      setFilterResponse(data.result);
    }
  }, [vehicles, data, searchElement]);

  const cellCalc = data && data.result ? Math.ceil(data.result.length / 8) : 0;
  for (let index = 0; index < cellCalc; index++) {
    defaultPaginationArr.push(index);
  }

  return (
    <div className="container">
      <Banner></Banner>
      <div className="row">
        <div className="dropdown mt-3">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Filter
          </button>
          <ul className="dropdown-menu">
            {filterOptions.map((filterTypes, index) => {
              return (
                <>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => handleFilterClick(index)}
                    >
                      {" "}
                      {filterTypes}{" "}
                    </a>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
        {filterResponse.map((vehicle: any, index: any) => {
          return (
            <div className="col" key={index}>
              <div className="auction-card text-center">
                <div className="card-image text-center">
                  <img src={vehicle.image} alt="Car" />
                </div>
                <div className="card-details text-center">
                  <h2>{vehicle.brandAndModel} </h2>
                  <p>
                    {" "}
                    <strong>Year:</strong>
                    {vehicle.manufacturingYear}
                  </p>
                  <p>
                    {" "}
                    <strong>Color:</strong>
                    {vehicle.color}{" "}
                  </p>
                  <p>
                    {" "}
                    <strong>Current Bid:</strong> ${vehicle.price}{" "}
                  </p>
                  <p>
                    <strong>EndTime:</strong>
                    {new Date(vehicle.endTime).toLocaleString("sv-SE", {
                      timeZone: "Europe/Stockholm",
                    })}
                  </p>
                </div>
                <div>
                  <Link to={`Vehicle/VehicleId/${vehicle.vehicleId}`}>
                    <button className="btn btn-danger">Detail</button>
                  </Link>
                  <Circle vehicle={vehicle}></Circle>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
          <a
            className="page-link"
            onClick={() => {
              if (currentPage! > 0) {
                handleFilterClick("Pagination", currentPage! - 1);
              }
            }}
          >
            Previous
          </a>
        </li>

        {defaultPaginationArr.map((key, index) => (
          <li
            className={`page-item ${currentPage === index ? "active" : ""}`}
            key={index}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => handleFilterClick("Pagination", index)}
            >
              {key + 1}
            </a>
          </li>
        ))}

        <li
          className={`page-item ${
            currentPage === defaultPaginationArr.length - 1 ? "disabled" : ""
          }`}
        >
          <a
            className="page-link"
            href="#"
            onClick={() => {
              if (currentPage! < defaultPaginationArr.length - 1) {
                handleFilterClick("Pagination", currentPage! + 1);
              }
            }}
          >
            Next
          </a>
        </li>
      </ul>
    </div>
  );
}

export default VehicleList;
