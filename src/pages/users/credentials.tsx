import { useState } from 'react';

import '../../css/usersLogin.css'

const Cred = () => {
    // User Inputs for login/sign up
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    
    // Error validation
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateForm = () => {
        let isValid = true;
        // Resetting errors
        setNameError('');
        setEmailError('');
        setPasswordError('');
        console.log("form validate");
        console.log(userName, userEmail, userPassword)

        // Checks each value for an any input no crazy validation at the moment
        if (!userName) {
            setNameError('Name is required');
            isValid = false;
            console.log("No Name");
        }
        if (!userEmail) {
            setEmailError('Email is required');
            console.log("No Email");
            isValid = false;
        }
        if (!userPassword) {
            setPasswordError('Password is required');
            console.log("No Password");
            isValid = false;
        }

        return isValid;
    };

    // On form submit will run the validation
    // No erros submits form
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents the default form submit action

        if (validateForm()) {
            clearForm();
        }
    };

       // Sample way to set a useState
    const handleEmailChange = (event) => {
        setUserEmail(event.target.value);
    }

    // Clears for after submit
    const clearForm = () => {
        setUserName('');
        setUserEmail('');
        setUserPassword('');
        console.log("Clear Form");
     };


  return (
    <>    
        {/* User page for login or sign up */}
        <div className="wrapper">
            <div className="card-switch">
                <label className="switch">
                <input type="checkbox" className="toggle" />
                <span className="slider"></span>
                <span className="card-side"></span>
                <div className="flip-card__inner">
                    <div className="flip-card__front">
                    <div className="title">Log in</div>
                    <form className="flip-card__form" action="">
                        <input
                        className="flip-card__input"
                        name="email"
                        placeholder="Email"
                        type="email"
                        />
                        <input
                        className="flip-card__input"
                        name="password"
                        placeholder="Password"
                        type="password"
                        />
                        <button className="flip-card__btn">Let's go!</button>
                    </form>
                    </div>

                    <div className="flip-card__back">
                    <div className="title">Sign up</div>
                    <form className="flip-card__form" action="" onSubmit={handleSubmit}> {/* Handle submmit runs the application for signing up */}
                        <input
                        className="flip-card__input"
                        placeholder="Name"
                        type="text"
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)} 
                        />{/* sets value for name */}
                        {nameError && <span className='fNameError'>{nameError}</span>} {/* Error message display */}
                        <input
                        className="flip-card__input"
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={userEmail}
                        onChange={(event) => setUserEmail(event.target.value)} 
                        />{/* sets value for user email */}
                        {emailError && <span className='fNameError'>{emailError}</span>} {/* Error message display */}
                        <input
                        className="flip-card__input"
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={userPassword}
                        onChange={(event) => setUserPassword(event.target.value)}
                        /> {/* sets value for user password */}
                        {passwordError && <span className='fNameError'>{passwordError}</span>} {/* Error message display */}
                        <button className="flip-card__btn">Confirm!</button>
                    </form>
                    </div>
                </div>
                </label>
            </div>
        </div>
        {userName}




    </>
  );
};

export default Cred;
