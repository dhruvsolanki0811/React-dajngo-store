import { createContext, useContext, useEffect } from "react";
import axios from "axios";

// import { useCartContext } from "./cartContext";
// import { useWishlistContext } from "./wishlistContext";
// import { useNavigate } from 'react-router-dom'

import { useState } from "react";
import { useLocalStorageGetItem, useLocalStorageSetItem } from "../customHooks/customHooks";
const AuthContext = createContext();


function AuthProvider({ children }) {
	// const { setCart } = useCartContext();
	// const { setWishlist } = useWishlistContext();
	let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)

	const [userState, setUserState] = useState({ id: "" });
	
	
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
				}
        	} catch (error) {
        		setState(false);
        		console.log(error);
        	}
        }
	// const guestLogin = async () => {
	// 	try {
	// 		const loginResponse = await axios.post("/api/auth/login", {
	// 			email: "shekhardhangar@yahoo.com",
	// 			password: "shekhar",
	// 		});
	// 		const encodedToken = loginResponse.data.encodedToken;
	// 		if (loginResponse) {
	// 			setUserState({ ...userState, id: encodedToken });
	// 		}

	// 		const getCartData = await axios.get("/api/user/cart", {
	// 			headers: {
	// 				authorization: encodedToken,
	// 			},
	// 		});
	// 		if (getCartData) {
	// 			setCart(getCartData.data.cart);
	// 		}

	// 		const getWishlistData = await axios.get("/api/user/wishlist", {
	// 			headers: {
	// 				authorization: encodedToken,
	// 			},
	// 		});
	// 		if (getWishlistData) {
	// 			setWishlist(getWishlistData.data.wishlist);
	// 		}

	// 		useLocalStorageSetItem("user-token", encodedToken);
	// 	} catch (error) {
	// 	}
	// };

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
			}
		} catch (error) {
			console.log(error);
			setState(false);
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
			//   , guestLogin 
			  }}>
			{children}
		</AuthContext.Provider>
	);
}

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthProvider };