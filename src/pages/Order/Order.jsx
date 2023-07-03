import React, { useEffect, useState } from 'react'
import { Loading,Navbar } from '../../components/components'
import { useCartContext } from "../../context/context";
import "./Order.css";
import {Link,  useNavigate} from "react-router-dom";
import { useInputHandler } from "../../pages/AuthenticationPage/authFunctions";
import { useAuthContext } from "../../context/AuthContext";
import Axios from "axios";

function Order() {
  
   
  const [formSubmitState, setformSubmitState] = useState(false);
    const { Cart,clearCart } = useCartContext();
    const [ showOrder,setShowOrder]= useState(false)
    
    const cartTotalMRP = Cart?.reduce(
      (totalMRP, item) => (totalMRP += (item.price*item.quantity)),
      0
    );
    const cartTotalPrice = Cart.reduce(
      (totalPrice, item) => (totalPrice += (item.price*item.quantity)),
      0
    );
    const cartDiscountAmount = Cart.reduce(
      (totalDiscount, item) =>
        (totalDiscount += (item.price - item.price)*item.quantity),
      0
    );
    const { inputState, inputUpdate } = useInputHandler({
      email: "",
      phone:"",
      address:""
    })
    const handlePaymentSuccess = async (response) => {
      try {
        let bodyData = new FormData();
        const userToken = localStorage.getItem("user-token");

        // we will send the response we've got from razorpay to the backend to validate the payment
        bodyData.append("response", JSON.stringify(response));
  
        await Axios({
          url: `https://shopruv.onrender.com/api/orders/payment/success/`,
          method: "POST",
          data: bodyData,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: "Bearer " + userToken,
          },
        })
          .then((res) => {
            setShowOrder(true)
            clearCart()
            // navigate('/user/orders')
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error)
      }
    };
  

    const loadScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);
    };
  
    async function submitFormHandler(e) {
      let purchases=[]
      Cart.map((a)=>purchases.push({size:a.size,quantity:a.quantity,product:a.name}))
      e.preventDefault();
      const userToken = localStorage.getItem("user-token");

      const res = await loadScript();
      const data = await Axios({
        url: `https://shopruv.onrender.com/api/orders/`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: "Bearer " + userToken,
        },
        data: {
          // total:cartTotalPrice,
          total:1,
          shipping_address:inputState.address,
          email:inputState.email,
          phone_number:inputState.phone,
          purchases:purchases
        },
      }).then((res) => {
        return res;
      });
      var options = {
        key_id: process.env.REACT_APP_PUBLIC_KEY, // in react your environment variable must start with REACT_APP_
        key_secret: process.env.REACT_APP_SECRET_KEY,
        amount: data.data.total,
        currency: "INR",
        name: "Dhruv ecommerce",
        description: "Test teansaction",
        image: "", // add image url
        order_id: data.data.order_payment_id,
        handler: function (response) {
          // we will handle success by calling handlePaymentSuccess method and
          // will pass the response that we've got from razorpay
          handlePaymentSuccess(response);
        },
        prefill: {
          name: "User's name",
          email: "User's email",
          contact: "User's phone",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    
      
    }
  return (
    <>    
    <Navbar
        isMenuRequired={false}
        navTxt={"Cart"}
        logoRemove={"logo-remove"}
      />

{Cart.length>0 &&
<section className="flex cart-container">
        <div className="w-100 cart-products-container">
        <form
            onSubmit={submitFormHandler}
            action="sign-up form register"
            // className="signup-form"
          >
            <h2 className=" txt-center h2 ">Fill The Details</h2>
            
            <div className="input-with-icon">
              {/* <MdEmail className="icon size-xs" /> */}
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                onChange={inputUpdate}
                className="input email-input"
              />
            </div>
            <div className="input-with-icon">
              {/* <FaPhone className="icon size-xs" /> */}
              <input
                type="text"
                placeholder="Phone"
                required
                name="phone"
                onChange={inputUpdate}
                className="input email-input"
              />
            </div>
            <div className="input-with-icon">
              {/* <FaUserAlt className="icon size-xs" /> */}
              <input
                type="text"
                placeholder="Address"
                required
                name="address"
                onChange={inputUpdate}
                className="input email-input"
              />
            </div>
            
            <button type="submit" className="signup-btn btn btn-md link">
              {formSubmitState ? (
                <Loading width="15px" height="15px" />
              ) : (
                `Submit`
              )}
            </button>
           
          </form>
            </div>
        {Cart.length > 0
         && (
          <div className="h-100 border-radius cart-price-container">
            <div className="txt-sm border-radius cart-offer-msg ">
              Whistles! Get extra 15% cashback on prepaid orders
            </div>
            <div className="lt-bold cart-summary-container">
              <p className="txt-sm cart-summary-heading lt-bold">
                Order SUMMARY
              </p>
              <div className="cart-price-item">
                <p>Total MRP (Incl. of taxes) </p>
                <span>₹{cartTotalMRP}</span>
              </div>
              <div className="cart-price-item">
                <p>Delivery Fee</p>
                <span>₹0</span>
              </div>
              <div className="cart-price-item">
                <p>Bag Discount </p>
                <span>-₹{cartDiscountAmount}</span>
              </div>
              <div className="cart-price-item">
                <p>Subtotal</p>
                <span>₹{cartTotalPrice}</span>
              </div>
              <div className="txt-xs cart-savings-msg">
                {/* <p>
                  You are saving
                  <span> {cartDiscountPercent}% </span>
                  on this order
                </p> */}
              </div>
            </div>
            <div className="flex cart-action-container">
              <span className="border-radius cart-final-price lt-bold">
                Total <span>Rs {cartTotalPrice}</span>
              </span>
              {/* <Link to="/order">
              <button className="w-100 cta-btn btn btn-xs">CONTINUE</button>
              </Link> */}
            </div>
          </div>
        )}
              </section>
}
        {Cart.length === 0 
        && (
          <div style={{marginTop:"10rem"}} >
           <div className="flex empty-page-box" >
           <h1 className="empty-page-title" >YOUR CART IS EMPTY !</h1>
           <img className="flex empty-page-image" src="https://images.bewakoof.com/images/doodles/empty-cart-page-doodle.png" alt="empty cart" />
           <Link to="/shop">
           <button className="btn btn-sm outline ">View Products</button>
           </Link>
         </div>
         </div>
        )}
        {showOrder && (
           <div className="flex empty-page-box" >
           <h1 className="empty-page-title" >ORDER PLACED SUCCESSFULLY</h1>
           {/* <Link to="/shop">
           <button className="btn btn-sm outline ">View Products</button>
           </Link> */}
         </div>
        )}
      </>

  )
}

export {Order}