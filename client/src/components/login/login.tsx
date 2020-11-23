import React, { useState } from 'react'


//scss
import './../../scss/login.scss';

const Login = () => {

    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');

    const handleLoginSubmit = () => {
        

    }

    return(
        <div className="loginContainer">   

            <div className="text">
                <h2>cau</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem velit modi perferendis in corrupti aut libero aperiam ex veritatis exercitationem, assumenda itaque similique omnis accusamus quod voluptatem animi fugit. Consequatur?
                </p>
            </div>

            <form onSubmit={handleLoginSubmit}>
                <h2>Přihlásit se</h2>
                <div className="form-group">
                    <label htmlFor="email" className="group-label">E-mailová adresa</label>
                    <input type="email" id="emain" onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="group-label">Heslo</label>
                    <input type="password" id="password" onChange={(e) => setPsw(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <button type="submit">Přihlásit se</button>
                </div>
            </form>

        </div>
    )
}

export default Login;