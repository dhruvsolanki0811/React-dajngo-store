import axios from "axios";

async function getProductsData(){
try{
    const initialProductsData=await axios.get('https://shopruv.onrender.com/api/products/')

    return initialProductsData.data
    
}catch(error) {
    console.log('Error is', error);
}

}

export {getProductsData}