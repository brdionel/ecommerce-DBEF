import React from 'react';
import NavBar from '../../Components/NavBar'
import ClosedOrder from '../../Components/ClosedOrdersTable';
import Footer from '../../Components/Footer'

const Orders = () => (
    <>
        <NavBar />
        <ClosedOrder />
        <Footer />
    </>
)

export default Orders;