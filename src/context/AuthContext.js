import { createContext, useContext, useEffect } from "react";
import axios from "axios";

import { useCartContext } from "./cartContext";
import { useWishlistContext } from "./wishlistContext";
// import { useNavigate } from 'react-router-dom'

import { useState } from "react";
import { useLocalStorageGetItem, useLocalStorageSetItem } from "../customHooks/customHooks";
const AuthContext = createContext();


function AuthProvider({ children }) {
	const { setCart } = useCartContext();
	const { setWishlist } = useWishlistContext();
	let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)

	const [userState, setUserState] = useState({ id: "" });
	const [status, setStatus] = useState({status:false,type:"",text:""});

	
	let [loading, setLoading] = useState(true)
	// const navigate = useNavigate();

	const userToken = useLocalStorageGetItem("user-token");
        async function logInUser(email, password, setState) {
        	try {
        		setState(true);
        		const response = await axios.post("https://shopruv.onrender.com/api/accounts/login/", {
        			email: email,
        			password: password,
        		});
        		const encodedToken = response.data.access;
        		if (response) {
					setState(false);
					setUserState({  id: encodedToken?encodedToken:"" });
					localStorage.setItem("user-token", encodedToken);
					setAuthTokens(response.data.refresh)
					
					localStorage.setItem('authTokens', JSON.stringify(response.data.refresh))
					setStatus({status:true,type:"success",text:"Successful login!"})

				}
        	} catch (error) {
        		setState(false);
        		console.log(error);
				setStatus({status:true,type:"error",text:error.response.data.error})
        	}
        }
	const guestLogin = async () => {
		try {
			const loginResponse = await axios.post("https://shopruv.onrender.com/api/accounts/login/", {
				email: "okay2@gmail.com",
				password: "okay@123",
			});
			
			const encodedToken = loginResponse.data.access;
			const refresh = loginResponse.data.refresh;
			if (loginResponse) {
				setUserState({ ...userState, id: encodedToken });
				localStorage.setItem('authTokens', refresh)
				localStorage.setItem("user-token", encodedToken);
				setAuthTokens(loginResponse.data.refresh)
				setStatus({status:true,type:"success",text:"Successfull Guest login!"})

			}

			const getCartData = await axios.get("https://shopruv.onrender.com/api/cart/", {
				headers: {
					authorization: "Bearer "+encodedToken,
				},
			});
			if (getCartData) {
				setCart(getCartData.data.cart);
			}

			const getWishlistData = await axios.get("ttps://shopruv.onrender.com/api/wishlist", {
				headers: {
					authorization: "Bearer "+encodedToken,
				},
			});
			if (getWishlistData) {
				setWishlist(getWishlistData.data.wishlist);
			}

			localStorage.setItem("user-token", encodedToken);

		} catch (error) {
		}
	};

	async function signUpUser(firstName, lastName, email, password,password2,username,phone,setState) {
		try {
			setState(true);
			const response = await axios.post("https://shopruv.onrender.com/api/accounts/create/", {
				"first_name": firstName,
				"last_name": lastName,
				"username":username,
				"email": email,
				"password": password,
				"password2":password2,
				"phone_number":phone,

			});
			const encodedToken = response.data.access;
			
			if (response) {
				setState(false);
				setUserState({ ...userState, id: encodedToken?encodedToken:"" });
				localStorage.setItem("user-token", encodedToken);
				setAuthTokens(response.data.refresh)
				localStorage.setItem('authTokens', JSON.stringify(response.data.refresh))
				setStatus({status:true,type:"success",text:"Successful login!"})
			}
		} catch (error) {
			setState(false);
			setStatus({status:true,type:"error",text:error.response.data.error})

		}
	}
	// function logOutUser() {
	// 	localStorage.clear();
	// 	setUserState([]);
	// 	setCart([]);
	// 	setWishlist([]);
	// }
	let logoutUser = () => {
        setAuthTokens(null)
        setUserState("")
        localStorage.removeItem('authTokens')
        // navigate('/login')
		localStorage.clear();
		// setStatus({status:true,type:"success",text:"Successfull Logout!"})
    }



	let updateToken = async ()=> {

        let response = await fetch('https://shopruv.onrender.com/api/accounts/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens})
        })

        let data = await response.json()
        
        if (response.status === 200){
            // setAuthTokens(data?.refresh)
			setUserState({ ...userState, id: data?data.access:"" });
			localStorage.setItem('authTokens', JSON.stringify(data?.refresh))
			localStorage.setItem("user-token",data?data.access:"" );
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

	// useEffect(() => {
	// 	(async () => 
	// 	{
	// 		try {
	// 			if (userState.id!=="") {

	// 				const response = await axios.post('https://shopruv.onrender.com/api/accounts/token/refresh/', {
	// 					refresh: authTokens,
	// 				});
	// 				const encodedToken = response.data.access;
	// 				if (response) {
	// 					setUserState({ ...userState, id: encodedToken?encodedToken:"" });

	// 				}


	// 				// const getCartData = await axios.get("/api/user/cart", {
	// 				// 	headers: { 
	// 				// 		authorization: encodedToken,
	// 				// 	},
	// 				// });
	// 				// if (getCartData) {
	// 				// 	// setCart(getCartData.data.cart);
	// 				// }
	// 				// const getWishlistData = await axios.get("/api/user/wishlist", {
	// 				// 	headers: {
	// 				// 		authorization: encodedToken,
	// 				// 	},
	// 				// });
	// 				// if (getWishlistData) {
	// 				// 	// setWishlist(getWishlistData.data.wishlist);
	// 				// }
	// 			}
	// 		} catch (error) {}
	// 	})();
	// }, [userState]);


	useEffect(()=> {

        if(loading){
            updateToken()
        }

			let fourMinutes = 1000 * 60 * 5

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])


	
	return (
		<AuthContext.Provider value={{
			 logInUser, logoutUser,
			  signUpUser, 
			  userState
			  , guestLogin ,status,setStatus
			  }}>
			{children}
		</AuthContext.Provider>
	);
}

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthProvider };