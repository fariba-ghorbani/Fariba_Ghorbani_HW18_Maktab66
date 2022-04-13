import { useEffect, useState } from 'react';
import Login from './Components/Login'
import axios from 'axios'
import { authentication } from './Context/authentication';
import ManageApp from './Components/ManageApp'

function App() {
	const [data, setData] = useState({})

    useEffect(() => {
		axios.get('http://localhost:3001/users')
			.then(res => {
				setData(res.data)
			})
			.catch(err => console.log(err))
    }, [])

	useEffect(() => {
		console.log(data)
	}, [data])

    return (
        <>
		<authentication.Provider value={{accounts: data}}>
			<ManageApp />
		
            {/* <Login /> */}
		</authentication.Provider>
        </>
    );
}

export default App;
