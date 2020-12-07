import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';


import './../../../scss/login.scss'


const LoginForm = () => {

    const handleSubmit = (email: string, psw: string) => {
        //server
    }

    useEffect(() => {
        if (!document.getElementById('logo')?.classList.contains('compressed'))
            document.getElementById('logo')?.classList.add('compressed');
    })

    return(
        <div className="container">  
            <div className="text">
                    <h2>cau</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem velit modi perferendis in corrupti aut libero aperiam ex veritatis exercitationem, assumenda itaque similique omnis accusamus quod voluptatem animi fugit. Consequatur?
                    </p>
                    <Link to="/register">Zaregistrovat se</Link>
            </div>

            <Form handleSubmit={handleSubmit}/>
        </div>
    )
}


const Form = ({handleSubmit}: {handleSubmit: (email: string, psw: string) => void}) => {

    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');

    const [isDisabled, setDisable] = useState(true);

    useEffect(() => {
        if ((email.length && psw.length) > 5)
            setDisable(false);
        else
            setDisable(true);
    },[email, psw])

    return(
        <form onSubmit={() => handleSubmit(email, psw)} className="loginform">
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
                    <button type="submit" disabled={isDisabled}>Přihlásit se</button>
                </div>
            </form>
    )
}

export default LoginForm;