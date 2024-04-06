import React, { useState } from 'react';
import { ethers } from "ethers";

const Home = ({walletAddress,walletAbi, listedProperty, showproperty, handleState,account }) => {
    const checkProperty = (propertyId) => {
        showproperty(propertyId);
        handleState('Property');
    }
    const LeaseProperty=async(propertyId,amount)=>{
        // Handle the form submission logic here
        try {
            // Check if MetaMask is installed
            if (window.ethereum) {
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const walletContract = new ethers.Contract(walletAddress, walletAbi, signer);
            const result = await walletContract.leaseProperty(
                propertyId,account,{value:ethers.BigNumber.from(amount)}
            );
            console.log('Txn Hash:', result.hash);
            } else {
            console.error('MetaMask not installed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    console.log('hello');
    return (
        <div>

        </div> 
    )
    }
    return (
        <main className="flex justify-center gap-10 py-12">
            {/* <p>{props.walletContract}</p> */}
            <div className='flex flex-wrap justify-center item-center'>
                {
                    listedProperty.map(item => (
                        <div onClick={() => showproperty(Number(item[0]))}
                        className="shadow-xl hover:ring ring-navyblue-200 rounded-xl border ml-6 p-3 hover:scale-110 duration-500 hover:bg-zinc-200 mx-auto"
                        id="card"
                        >
                            {/* {console.log(item)} */}
                            {/* <p>{console.log(item)}</p> */}

                            <div className="mt-5 -overflow-hidden flex justify-center" id="card-img">
                                <img
                                    src={item[7]}
                                    className="h-80 w-80 object-cover hover:scale-80 duration-500 rounded rounded-xl"
                                    alt=""
                                />
                            </div>
                            <div className="text-center mt-4">
                                <p className='text-[12px]'>{item[1]}</p>
                                <p>Price : {(ethers.utils.formatEther(item[3]))} ETH</p>
                                <p>Time :{Number(item[5])} Seconds</p>
                            </div>
                            <div className="text-center mb-8">
                                <button onClick={()=>{LeaseProperty(Number(item[0]),item[3])}} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                                    Lease Now
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </main>
    )
}

export default Home

