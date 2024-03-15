import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";

const Profile = ({ walletAddress, walletAbi, account, userProperty, showproperty ,handleState,changeProduct}) => {
    const [property, setProperty] = useState(userProperty);
    const LeaseProperty = (propertyId, owner) => {
        handleState("Listproperty");
        changeProduct(propertyId);
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
                                            <button onClick={() => { LeaseProperty(Number(item[0]), item[3], item[1]) }} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                                                Lease Now
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
