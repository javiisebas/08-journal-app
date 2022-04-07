import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";

export const LoginScreen = () => {

    const [formValues, handleInputChange] = useForm({
        email: "javi.sebas@hotmail.es",
        password: "qweASDasd",
    });
    const { email, password } = formValues;

    // Hooks propio de Redux
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.ui)

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        dispatch(startLoginEmailPassword(email, password));
    };

    const handleLoginGoogle = (e) => {
        e.preventDefault()
        dispatch(startGoogleLogin())
        // Lanza la action y hará que se abra el popUp
    }

    return (
        <>
            <h3 className="auth-title">Login</h3>

            <form onSubmit={handleSubmitLogin}>
                <input
                    type="text"
                    placeholder="email"
                    name="email"
                    className="auth-input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="auth-input"
                    value={password}
                    onChange={handleInputChange}
                />

                <button type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}>
                    Login
                </button>

                <div className="auth-social-networks">
                    <p>Login with social networks</p>

                    <div className="google-btn">
                        <div className="google-icon-wrapper">
                            <img
                                className="google-icon"
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="google button"
                            />
                        </div>
                        <p className="btn-text" onClick={handleLoginGoogle}>
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to="/auth/register" className="link">
                    Create new account
                </Link>
            </form>
        </>
    );
};
