import React, { useContext } from 'react'
import HeroSection from './components/HeroSection'
import { useProductContext } from './context/productContext';

function About() {
    const { myName } = useProductContext();
    const data = {
        name: myName
    };

    return (
        <HeroSection pageName={data} />
    )
}

export default About