import React from "react";

function CreateBid() {
  return (
    <div className="container">
      <form>
        <label htmlFor="bidAmount">Bid Amount:</label>
        <input
          type="number"
          name="bidAmount"
          id="bidAmount"
          className="form-control"
        />
        <div className="text-center">
          <button type="submit">Place Bid</button>
        </div>
      </form>
    </div>
  );
}

export default CreateBid;
