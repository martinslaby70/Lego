import React, { useContext } from 'react'
import { UserContext } from './contexts/userContext';
import { NavLink } from 'react-router-dom';
import legoBrick from './../imgs/brick.png';
//scss
import './../scss/navbar.scss'


const Navbar = () => {
    
    const { user } = useContext(UserContext)!;
    
    const profile = user !== null ? <NavLink to="">{user.name}</NavLink> : <NavLink to="/login" >Prihlásit se</NavLink>

    return(
        <header>
            <div className="logo" id="logo">
                <div>
                    <img src={legoBrick} alt="logo"/>
                    <h1>Postav si svůj svět</h1>
                    <img src={legoBrick} alt="logo"/>
                </div>
            </div>
            <div className="navbar">
                <div>
                    <NavLink exact to="/">Stavebnice</NavLink>
                    <NavLink to="/sales">Lego ve slevě</NavLink>
                    <NavLink to="/user/contributions">Mé příspěvky</NavLink>
                    {profile}
                </div>
            </div>
        </header>
    )
}
export default Navbar;