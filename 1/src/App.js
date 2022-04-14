import { useEffect, useState, memo } from 'react';
import axios from 'axios'
import { Authentication } from './Context/authentication';
import ManageForms from './Components/ManageForms'

function App() {
	const [data, setData] = useState({})
	const [currentUser, setCurrentUser] = useState("")
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState("");

	console.log("app")
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
		.then((e) => e.preventDefault())
		.catch(err => setErr(err))
		.finally(res => console.log(res.data))
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
			addUser: addUser
		}}>
			<ManageForms />
		
            {/* <Login /> */}
		</Authentication.Provider>
        </>
    );
}

export default App;
