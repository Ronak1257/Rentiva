import React, { useState } from 'react';
import { ethers } from 'ethers';

const Createproperty = ({ walletAddress, walletAbi,account }) => {
  const [property, setProperty] = useState({
    title: '',
    image: '',
    address: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const walletContract = new ethers.Contract(walletAddress, walletAbi, signer);
        const { title, image, address, description } = property;
        const result = await walletContract.createProperty(
          account,title, image,address, description
        );
        console.log('Txn Hash:', result.hash);
      } else {
        console.error('MetaMask not installed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto my-10 p-5 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">Submit Property</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">Property Title</label>
        <input type="text" id="title" name="title" onChange={handleChange} value={property.title} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700">Property Image Url</label>
        <input type="text" id="image" name="image" onChange={handleChange} value={property.image} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-700">Property Address</label>
        <input type="text" id="address" name="address" onChange={handleChange} value={property.address} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">Property Description</label>
        <textarea id="description" name="description" onChange={handleChange} value={property.description} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" rows="4"></textarea>
      </div>
      <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Submit Property</button>
    </form>
  )
}

export default Createproperty

