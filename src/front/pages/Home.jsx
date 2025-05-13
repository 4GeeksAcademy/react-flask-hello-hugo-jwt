import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { users } from "../fecht_user.js";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const history = useNavigate();
	const handleNavigate = () => history("https://literate-spoon-x5vj4v74wq65299rj-3001.app.github.dev/api/private");

	/*	const loadMessage = async () => {
			try {
				const backendUrl = import.meta.env.VITE_BACKEND_URL
	
				if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")
	
				const response = await fetch(backendUrl + "/api/hello")
				const data = await response.json()
	
				if (response.ok) dispatch({ type: "set_hello", payload: data.message })
	
				return data
	
			} catch (error) {
				if (error.message) throw new Error(
					`Could not fetch the message from the backend.
					Please check if the backend is running and the backend port is public.`
				);
			}
	
		}
	
		useEffect(() => {
			loadMessage()
		}, [])*/

	const handleCreatuser = async () => {
		try {
			const data = await users.createuser(store.email, store.password)
			
			console.log(data)
		} catch (error) {

		}
	};
	const handleprivate = async () => {
		try {
			const data = await users.privateareauser(store.token)
			console.log(data)
			swal({
				title: "Ya eatás en tu area PRIVADA",
					text: `${data.message}`,
					icon: "success",
					buttons: true,
					dangerMode: true,
			})
		} catch (error) {

		}
	};

	const handleLogingUser = async () => {
		try {
			const data = await users.loginguser(store.email, store.password)
				dispatch({ type: "addToken", value: data.token })
				if (data.msg==="El email o la contraseña es incorrecto"){
					swal({
				title: "ERROR",
					text: `${data.msg}`,
					icon: "warning",
					buttons: true,
					dangerMode: true,
			})
				}
			
			
		} catch (error) {

		}
		
	};

	const createContact = async () => {
		if (store.name !== ""
			&& store.password !== ""
		) {
			await
				handleCreatuser();
			store.email = ""
			store.password = ""
		}
	};
	const logingUser = async () => {
		if (store.name !== ""
			&& store.password !== ""
		) {
			await
				handleLogingUser();
			await
				handleprivate();	
			store.token=""
			
		}

	}

	return (
		<div className="text-center mt-5">

			<h1 className="title">Wellcome Your Private Area</h1>
			<div className="log mt-5">
				<label className="form-label">Enter Email</label>
				<input type="text" className="form-control" placeholder="Enter Email"
					value={store.email} onChange={(e) => dispatch({ type: "addEmail", value: e.target.value })} />
				<label className="form-label">Enter Password</label>
				<input type="text" className="form-control" placeholder="Enter Password"
					value={store.password} onChange={(e) => dispatch({ type: "addPassword", value: e.target.value })} />
				<button type="button" id="formButton" className="btn btn-primary mt-5" onClick={createContact}>Register</button>
				<button type="button" id="formButton" className="btn btn-primary mt-5" onClick={logingUser}>Login</button>
			</div>
		</div>
	);
}; 