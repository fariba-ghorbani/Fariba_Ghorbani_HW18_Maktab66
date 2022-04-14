import { useEffect, useState, memo } from 'react';
import axios from 'axios'
import { Authentication } from './Context/authentication';
import ManageForms from './Components/ManageForms'
import MessageModal from './Components/MessageModal';

function App() {
	const [data, setData] = useState({})
	const [currentUser, setCurrentUser] = useState("")
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState("");
	const [show, setShow] = useState(false);

    useEffect(() => {
		setLoading(true);
		axios.get('http://localhost:3001/users')
			.then(res => {
				setData(res.data)
			})
			.catch(err => setErr(err))
			.finally(() => setLoading(false));
    }, [])

	const addUser = (newUser) => {
		axios.post('http://localhost:3001/users', newUser)
		.then(res => console.log(res))
		.catch(err => setErr(err))
		.finally(setShow(true))
	}

	const changeCurrentUser = (user) => {
		setCurrentUser(user)
	}

    return (
        <>
			<Authentication.Provider value={{
				accounts: data,
				currentUser: currentUser,
				changeCurrentUser: changeCurrentUser,
				addUser: addUser,
			}}>
				<ManageForms loading={loading} err={err} />
			</Authentication.Provider>
			<MessageModal show={show} setShow={setShow}/>
        </>
    );
}

export default App;
