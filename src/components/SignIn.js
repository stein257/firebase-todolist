import heroImage from "../images/person.svg";
import * as React from "react";
import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function SingIn({auth}) {

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);

    }

    return <>
        <div className="holder">
        </div>
        <img src={heroImage} alt="person" className="person-image"/>

        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet assumenda aut beatae corporis
            deserunt eligendi, id ipsum iste itaque labore maxime odio quibusdam repellendus reprehenderit, rerum ut
            veniam vitae.
        </p>

        <button className="sign-in" onClick={signInWithGoogle}>
            Sign In!
        </button>
    </>;
}

export default SingIn;