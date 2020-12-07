import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';

import './../../../scss/login.scss'

const RegisterForm = () => {

    const handleSubmit = (email: string, psw: string, username: string) => {


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
                <Link to="/login">Přihlásit se</Link>
        </div>

        <Form handleSubmit={handleSubmit}/>

        <div className="help">
            <p>heslo musi obsahovat alespoň </p>
            <ul>
                <li>6 znaků</li>
                <li>Jedno velké písmeno</li>
                <li>Jednu číslici</li>
            </ul>
        </div>
    </div>
    )
}

interface formProps {
    handleSubmit: (email: string, psw: string, username: string) => void;
}
const Form = ({handleSubmit}:formProps) => {
    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [psw_, setPsw_] = useState('');
    const [username, setUsername] = useState('');


    const [isDisabled, setDisable] = useState(true);

    useEffect(() => {
        if ((email.length && psw.length && psw_.length && username.length) > 3)
            setDisable(false);
        else
            setDisable(true);
    },[email, psw, psw_, username])


    const verify = () => {
        if (psw === psw_)
            handleSubmit(email, psw, username);   
        /*else 
            addError('hesla se musí shodovat');*/
    }

    return(
        <form onSubmit={verify} className="registerform">
            <h2>Registrace</h2>
            <div className="form-group">
                <label htmlFor="text" className="group-label" >Uživatelé jméno</label>
                <input type="text" maxLength={20} minLength={3} onChange={(e) => setUsername(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label htmlFor="email" className="group-label">E-mailová adresa</label>
                <input type="email" id="emain" onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label className="group-label">Heslo</label>
                <input type="password" pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{6,}" onChange={(e) => setPsw(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label className="group-label">Heslo znovu</label>
                <input type="password" pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{6,}" onChange={(e) => setPsw_(e.target.value)} required/>
            </div>
            <div className="form-group">
                <button type="submit" disabled={isDisabled}>Začít</button>
            </div>
        </form>
    )
}

export default RegisterForm;