import React, { useState } from 'react'
import {ethers} from 'ethers';

const Listproperty = ({ walletAddress, walletAbi,account,propertyId}) => {
    const [property, setProperty] = useState({
        time:'',
        price:''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperty((prev) => ({ ...prev, [name]: value }));
        console.log(property.time,property.price)
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hello");
        try {
          if (window.ethereum) {
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const walletContract = new ethers.Contract(walletAddress, walletAbi, signer);
      
            // Format property price to Wei
            const formattedPrice = ethers.utils.parseEther(property.price);
      
            // Convert property time to BigNumber
            const formattedTime = ethers.BigNumber.from(property.time);
      
            // Call listProperty with formatted inputs
            console.log(account,propertyId,formattedPrice,formattedTime);
            const result = await walletContract.listProperty(
              account, propertyId, formattedPrice, formattedTime
            );
            
            // Display transaction hash
            console.log('Txn Hash:', result.hash);
            
            // Optionally, update UI or perform other actions after successful transaction
          } else {
            throw new Error('MetaMask not installed or not detected');
          }
        } catch (error) {
          console.error('Error:', error.message);
          // You can handle the error here, for example, display a message to the user
        }
      };
      

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto my-10 p-5 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">List Property</h2>
      <div className="mb-4">
        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-700">Property Price</label>
        <input type="text" id="price" name="price" onChange={handleChange} value={property.price} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
      </div>
      <div className="mb-4">
        <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-700">Property Title</label>
        <input type="text" id="time" name="time" onChange={handleChange} value={property.time} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
      </div>
      <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Submit Detail</button>
    </form>

  )
}

export default Listproperty
