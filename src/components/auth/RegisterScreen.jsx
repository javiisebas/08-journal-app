import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from "validator";
import { startRegister } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {

    const [formValue, handleInputChange] = useForm({
        name: 'Javi',
        email: 'javi.sebas@hotmail.es',
        password: 'qweASDasd',
        repassword: 'qweASDasd',
    })


    const dispatch = useDispatch()
    const { msgError } = useSelector(state => state.ui)

    const handleSubmitRegister = (e) => {
        e.preventDefault()
        if (isFormValid()) {
            dispatch(startRegister(name, email, password))
        }
    }

    const isFormValid = () => {

        if (name.trim().length === 0) {
            dispatch(setError('Name is required'))
            return false
        } else if (!validator.isEmail(email)) {
            dispatch(setError('Email is not valid'))
            return false
        } else if (password !== repassword || password.length < 5) {
            dispatch(setError('Password do not match'))
            return false
        }
        dispatch(removeError())
        return true
    }

    const { name, email, password, repassword } = formValue

    return (
        <>
            <h3 className='auth-title'>Register </h3>

            <form onSubmit={handleSubmitRegister}>

                {
                    msgError !== null &&
                    <div className='auth-alert-error'>
                        {msgError}
                    </div>
                }

                <input type="text"
                    placeholder='name'
                    name='name'
                    className='auth-input'
                    autoComplete='off'
                    value={name}
                    onChange={handleInputChange} />

                <input type="text"
                    placeholder='email'
                    name='email'
                    className='auth-input'
                    autoComplete='off'
                    value={email}
                    onChange={handleInputChange} />

                <input type="password"
                    placeholder='password'
                    name='password'
                    className='auth-input'
                    value={password}
                    onChange={handleInputChange} />

                <input type="password"
                    placeholder='re-password'
                    name='repassword'
                    className='auth-input'
                    value={repassword}
                    onChange={handleInputChange} />

                <button type='submit'
                    className='btn btn-primary btn-block mb-5'>
                    Register
                </button>

                <Link to='/auth/login' className='link'>
                    Already register?
                </Link>

            </form>
        </>
    )
}
