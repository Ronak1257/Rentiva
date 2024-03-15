import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";

const Profile = ({ walletAddress, walletAbi, account, userProperty, showproperty ,handleState,changeProduct}) => {
    const [property, setProperty] = useState(userProperty);
    const LeaseProperty = (propertyId) => {
        handleState("Listproperty");
        changeProduct(propertyId);
    }
    const ReleaseProperty=async (propertyId)=>{
        console.log('hello');
        try {
            if (window.ethereum) {
              // Request account access if needed
              await window.ethereum.request({ method: 'eth_requestAccounts' });
              const provider = new ethers.providers.Web3Provider(window.ethereum);
              const signer = provider.getSigner();
              const walletContract = new ethers.Contract(walletAddress, walletAbi, signer);
              console.log(walletContract);
        
              const result = await walletContract.releaseProperty(
                propertyId,'0x25a1148ea2F07083f5E08AF20c9A69cC382B4ee3'
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
    }
    return (
        <div>
            <div className='mx-auto flex justify-center items-center flex-col'>
                <h1 className='text-4xl text-center font-bold'>User Property</h1>
                <hr className='w-1/4 border-2 border-black mx-auto my-4' />
            </div>

            <div className='flex-wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12'>
                {
                    property.map((item) => (
                        <div
                            className="shadow-xl hover:ring ring-navyblue-200 rounded-xl border ml-6 p-3 hover:scale-110 duration-500 hover:bg-zinc-200 mx-auto"
                            id="card"
                        >
                            {console.log(item)}
                            <div className="mt-5 -overflow-hidden flex justify-center" id="card-img">
                                <img
                                    src={item[7]}
                                    className="h-80 w-80 object-cover hover:scale-80 duration-500"
                                    alt=""
                                />
                            </div>
                            <div className="text-center mt-4">
                                <p className='text-[12px]'>{item[1]}</p>
                                <p>Price : {(ethers.utils.formatEther(item[3]))} ETH</p>
                                <p>{Number(item[5])} seconds</p>
                            </div>
                            <div>
                                {
                                    !item[10] && (
                                        <div className=" text-center mb-8">
                                            <button onClick={() => { LeaseProperty(Number(item[0])) }} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                                                Lease Now
                                            </button>
                                        </div>
                                    )
                                }
                                {
                                    item[10] && (
                                        <div className=" text-center mb-8">
                                            <button onClick={() => { ReleaseProperty(Number(item[0])) }} className="mt-4 bg-green-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                                                Release Property
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Profile
