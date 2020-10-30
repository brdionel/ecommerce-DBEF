import React from 'react'
import Catalogo from '../../Components/Catalogo'
import Carrousel from '../../Components/Carrousel'
import NavBar from '../../Components/NavBar'
import Footer from '../../Components/Footer'

const Home = ({ match, location }) =>  ( 
    <>
        <NavBar />
        <Carrousel/>
        <Catalogo 
            match = {match}
            location = {location}
        />
        <Footer />
    </>
)

export default Home;
