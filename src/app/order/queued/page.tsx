import React from "react";
import OrderSelector from "../components/OrderSelector";
import OrdersTable from "../components/OrdersTable";


const Home = () => {
  return (
    <div className="bg-white w-full">
      <OrderSelector />

        <OrdersTable />
    </div>
  );
};

export default Home;
