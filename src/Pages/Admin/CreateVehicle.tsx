import React from "react";
import { withAdminAuth } from "../../HOC";

function CreateVehicle() {
  return (
    <div>
      <div
        className="container"
        style={{ border: "1px solid black", position: "absolute" }}
      >
        <form encType="multipart/form-data">
          <div className="text-center">
            <div className="mb-3">
              <label className="form-label">Brand And Model</label>
              <input
                type="text"
                className="form-control"
                placeholder="Brand And Model"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Manufacturing Year</label>
              <input
                type="number"
                className="form-control"
                placeholder="Year"
                name="manufacturing"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Color</label>
              <input type="text" className="form-control" placeholder="Color" />
            </div>

            <div className="mb-3">
              <label className="form-label">Engine Capacity</label>
              <input
                type="number"
                className="form-control"
                placeholder="Engine Capacity"
                required
                name="engine"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Price"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Millage</label>
              <input
                type="number"
                className="form-control"
                placeholder="Millage"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Plate Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Plate Number"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Auction Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Auction Price"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Additional Information</label>
              <input
                type="text"
                className="form-control"
                placeholder="Additional Information"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Start Time</label>
              <input
                type="date"
                className="form-control"
                placeholder="Start Time"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">End Time</label>
              <input
                type="date"
                className="form-control"
                placeholder="End Time"
              />
            </div>

            <div className="text-center row">
              <span>Is Active</span>
              <div className="mb-3 col">
                <label className="form-label">True</label>
                <input
                  type="radio"
                  className="form-control"
                  placeholder="True"
                />
              </div>
              <div className="mb-3 col">
                <label className="form-label">False</label>
                <input
                  type="radio"
                  className="form-control"
                  placeholder="False"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Image</label>
              <input type="file" className="form-control" placeholder="Image" />
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withAdminAuth(CreateVehicle);
