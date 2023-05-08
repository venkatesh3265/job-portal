
import styled from 'styled-components';
import logo from '../assets/images/logo.svg';
import main from '../assets/images/main-alternative.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import {Logo} from '../components';
import { Link } from 'react-router-dom';
const Landing = () => {
    return (
        <Wrapper>
            <nav>
                

            </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                        job <span>tracking</span> app
                    </h1>
                    <p>I'm baby health goth polaroid knausgaard chicharrones roof party. Cliche neutra letterpress readymade mustache XOXO kogi big mood. Humblebrag bespoke beard pour-over gentrify coloring book. Lyft ascot 8-bit plaid hella, activated charcoal roof party keffiyeh irony shabby chic.</p>
                    <Link  to='/register' className='btn btn-hero'>
                        Login/Register

                    </Link>
                </div>
                <img src={main}  alt='job hunt'  className='img  main-img'  />
                

            </div>
        </Wrapper>
    )
}


export default Landing