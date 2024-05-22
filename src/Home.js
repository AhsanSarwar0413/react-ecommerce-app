import React from 'react'
import styled from 'styled-components';
import HeroSection from './components/HeroSection';
import Services from './components/Services';
import Trusted from './components/Trusted';
import FeatureProducts from './components/FeatureProducts';

function Home() {
    const data = {
        name: 'Thapa Store'
    };

    return (
        <Wrapper className="test">
            <HeroSection pageName={data} />
            <FeatureProducts />
            <Services />
            <Trusted />
        </Wrapper>
    );
}

const Wrapper = styled.section`
    background-color: ${({ theme }) => theme.colors.bg};
`;

export default Home;