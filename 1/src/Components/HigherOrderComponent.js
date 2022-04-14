import React, { useContext } from 'react'
import { Authentication } from '../Context/authentication';
import { Spinner } from 'react-bootstrap';

const HigherOrderComponent = (Component) => {
    const WithApp = ({ err, loading, ...props}) => {
        const { currentUser, changeCurrentUser } = useContext(Authentication)

        if (err) return <p className='error'> {err.message} </p>;
        if (loading) return <Spinner className='spinner'sixe="lg" animation="border" variant="success" />;
        return (
            <>
                {currentUser? 
                <div className='app'>
                    <h1 className='app-title'>سلام کاربر {currentUser.name}</h1>
                    <button onClick={() => changeCurrentUser("")}>Log out</button>
                </div>
                : 
                <Component {...props}/>
                }
            </>
        );
    }

    return WithApp
}

export default HigherOrderComponent;
