import React, { useContext } from 'react'
import { Authentication } from '../Context/authentication';
import { Spinner, Button } from 'react-bootstrap';

const HigherOrderComponent = (Component) => {
    const WithApp = ({ err, loading, ...props}) => {
        const { currentUser, changeCurrentUser } = useContext(Authentication)

        if (err) return <p className='server-error'> network error </p>;
        if (loading) return (
            <div className='spinner'>
                <Spinner sixe="lg" animation="border" variant="success" />
            </div>);
        return (
            <>
                {currentUser? 
                <div className='app'>
                    <h1 className='app-title'>سلام کاربر {currentUser.name}</h1>
                    <Button className='my-3' variant="outline-primary" onClick={() => changeCurrentUser("")}>Log out</Button>
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
