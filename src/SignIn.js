import './App.css';
import React, {useState} from "react";

import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

function SignIn(props) {

    const provider = new GoogleAuthProvider();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const [signUp, setSignUp] = useState(false);

    function handleSignInWithEmail() {
        signInWithEmailAndPassword(props.auth, email, password).catch((error) => setError(error.message));
    }

    function handleSignUpWithEmail() {
        if (password === confirmPassword) {
            createUserWithEmailAndPassword(props.auth, email, password).then((userCredential) => {
                sendEmailVerification(userCredential.user);
            }).catch((error) => setError(error.message));
        }
    }

    function handleSignInWithGoogle() {
        signInWithPopup(props.auth, provider);
    }

    function handleKeyPress(e) {
        if(e.key === 'Enter') {
            if (signUp) {
                handleSignUpWithEmail();
            }
            else {
                handleSignInWithEmail()
            }
        }
    }

    return (
        <div>
            <h1 id={"sign-up-text"}>{signUp ? "sign up" : "sign in"}</h1>
            <button onClick={() => setSignUp(!signUp)} className={"toggle-sign-up-button"}>{signUp ? "sign in instead" : "sign up instead"}</button>
            <br/>
            <br/>
            <button onClick={handleSignInWithGoogle} className={"sign-up-button"}>sign {signUp ? "up" : "in"} with google</button>

            <br/><br/>

            <label htmlFor={"email"} className={"input-label"}>email</label> <br/>
            <input type={"text"} onChange={(e) => setEmail(e.target.value)}
                   placeholder={"example@todo.com"} id={"email"} className={"sign-up-input"}/>

            <br/>

            {signUp &&
                <p>
                    <br/>
                    {(password.length >= 6) ? '✅' : '❌'} password must be at least 6 characters
                    <br/>
                    {(password === confirmPassword) ? '✅' : '❌'} passwords must match
                    <br/>
                </p>
            }

            <label htmlFor={"password"} className={"input-label"}>password</label> <br/>
            <input type={"password"} onChange={(e) => setPassword(e.target.value)}
                   onKeyPress={handleKeyPress}
                   placeholder={"password"} id={"password"} className={"sign-up-input"}/>

            {signUp &&
                <>
                    <br/>
                    <label htmlFor={"confirm-password"} className={"input-label"}>confirm password</label>
                    <br/>
                    <input type={"password"} onChange={(e) => setConfirmPassword(e.target.value)}
                       onKeyPress={handleKeyPress}
                       placeholder={"confirm password"} id={"confirm-password"} className={"sign-up-input"}/>
                </>
            }

            <br/> <br/>

            {signUp ?
                <button className={"sign-up-button"} onClick={handleSignUpWithEmail}>sign up</button>
                :
                <button className={"sign-up-button"} onClick={handleSignInWithEmail}>sign in</button>
            }

            {(error !== "") &&
                <>
                    <br/>
                    <p id={'auth-error'}>
                        {error}
                    </p>
                    <p id={'close-error'} onClick={() => setError("")}> X&nbsp;</p>
                </>

            }
        </div>
    )
}

export default SignIn;
