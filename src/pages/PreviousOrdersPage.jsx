import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import OrderCard from "../components/OrderPage/OrderCard";

const PreviousOrdersPage = () => {
  const { user } = useContext(AuthContext);

  const[previousOrders,setPreviousOrders] = useState(null);

  const getPreviousOrders = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/userOrders?userId=${user.id}`
      );
      if (response.ok) {
        const orderData = await response.json();
        const previousOrders = orderData[0].previousOrders;
        setPreviousOrders(previousOrders);
      }
    } catch (error) {
      console.log(error, "on getting previous orders");
    }
  };

  useEffect(() => {
    getPreviousOrders();
  }, []);

  return (
    <>
    {previousOrders && previousOrders.map((order,index) =>{
        return(
            <OrderCard key={index} restaurantData={order}/>
        )
    })}
    </>
  );
};

export default PreviousOrdersPage;
