import React, { useEffect, useMemo, useState } from 'react'

const OrdersDashboard = () => {

    const [orderCount, setOrderCount] = useState(0);
    const [orders, setOrders] = useState([]);
    
    const computedValue = useMemo(() => heavyFn(), [orders]); // Object.is(ordersBeforeRendering, orders)
    function heavyFn(){
        console.log("useMemo has been called!");
        return [1,2,3,4,5]
    }
    console.log(computedValue);
    

    function createNewOrder(){
        const newOrder = {
            id: orderCount + 1,
            price: 500
        }

        setOrderCount(prev => prev + 1)
        setOrders((prevOrders) => {
            prevOrders.push(newOrder);
            return prevOrders;
        });

        // setOrders((prevOrders) => [...prevOrders, newOrder])
    }

    useEffect(() => console.log("Orders are updated"), [orders]) 

    return (
        <>
            <h1>Hello, useMemo</h1>
            <button onClick={createNewOrder} className='bg-red-500 text-white p-3 rounded-full'>
                create new order
            </button>
            <p>{JSON.stringify(computedValue)}</p>
        </>
    )
}

export default OrdersDashboard