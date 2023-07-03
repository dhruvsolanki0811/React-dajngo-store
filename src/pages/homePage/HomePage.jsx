import React from 'react'
import "./homePage.css";
import { Navbar,Footer} from "../../components/components";
import {
  dealsImages,
  featureTrendsImgs,
  homeDecorImgs,
  roundImgCategory,
} from "./homePageData";
import {  useNavigate } from "react-router-dom";


function HomePage() {
  const navigate = useNavigate();

  return (
    <>
    <header>
    <div className="pointer relative flex display-img-container w-100">
          <img
            className="display-img"
            src="https://rb.gy/ksmj18"
            alt="display img of product"
          />
        </div>

        <section>
          <p className="w-100 category-title txt-center txt-lg lt-bold">
            DEALS OF THE DAY
          </p>
          <div className="flex-container p-0 m-0 category-container">
            {dealsImages.map((img) => (
              <img
              onClick={()=>navigate("/shop")}
                key={img.id}
                className="img-container pointer"
                src={img.img}
                alt="product feature img"
              ></img>
            ))}
          </div>
        </section>
        <section>
          <p className="w-100 txt-center txt-lg lt-bold category-title">
            CATEGORIES TO BAG
          </p>
          <div className="flex-container category-container circle-box">
            {roundImgCategory.map((img) => (
              <img
                loading="lazy"
                onClick={()=>navigate("/shop")}
                key={img.id}
                className="img-container pointer"
                src={img.img}
                alt="product feature img"
              ></img>
            ))}
          </div>
        </section>
        <section>
          <p className="w-100 txt-center txt-lg lt-bold category-title">
            TRENDING IN INDIAN WEAR
          </p>
          <div className="flex-container width-full p-0 category-container">
            {featureTrendsImgs.map((img) => (
              <img
                loading="lazy"
                onClick={()=>navigate("/shop")}
                key={img.id}
                className="img-container pointer"
                src={img.img}
                alt="model featuring Indian fashion wear"
              ></img>
            ))}
          </div>
        </section>
        <section>
          <p className="w-100 txt-center txt-lg lt-bold category-title">
            Stylish home decor
          </p>
          <div className="flex-container width-full p-1 category-container ">
            {homeDecorImgs.map((img) => (
              <img
                loading="lazy"
                onClick={()=>navigate("/shop")}
                key={img.id}
                className="img-container pointer"
                src={img.img}
                alt="featuring home decor product"
              ></img>
            ))}
          </div>
        </section>
      <Navbar menuRequired={true} />
    </header>
    <main>

    <Footer />
    </main>
    </>
  )
}

export {HomePage}