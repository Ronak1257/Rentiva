import React from 'react'
import headerLogo from '../assets/headerLogo.png';
import metamaskLogo from '../assets/metamask-seeklogo.svg';
import { useState } from 'react';

const NavBar = ({handleAccount,handleState}) => {
    const [account, setAccount] = useState('');
    
    async function disconnectWallet() {
        try{
            await window.ethereum.request({
                method: "eth_requestAccounts",
                params: [{eth_accounts: {}}]
            })
            handleAccount('');
            setAccount('');
        }
        catch(err){
            console.log("metamask not disconnected");
        }
    }
    async function connectWallet() {
        //check metamask exist
        if (window.ethereum) {
            console.log("metamask exist");
            try {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                console.log(accounts);
                setAccount(accounts[0]);
                handleAccount(accounts[0]);
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            console.log("metamask not installed");
        }
    }
    return (
        <div className="container mx-auto flex flex-row flex-col md:flex-row items-center justify-between ">
            <a
                className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
                href="/"
            >
                <img src={headerLogo} className="h-[170px]" />
            </a>
            {
                account ?
                <div className="flex-wrap hidden sm:hidden lg:grid lg:grid-cols-3 md:grid-cols-3">
                    <div onClick={()=>handleState("Home")}className="navItems">
                        Lease Now
                    </div>
                    <div onClick={()=>handleState("CreateProperty")}className="navItems">
                        Create Property
                    </div>
                    <div onClick={()=>handleState("Profile")}className="navItems">
                        Profile
                    </div>
                </div>:
                <div className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center"></div>
            }
            <div>
                {
                !account?
                <button onClick={connectWallet} className=" flex justify-center items-center shadow-sm  hover:text-black hover:bg-gray-500 active:ring ring-offset-neutral-400 font-medium bg-black p-3 rounded-xl text-white">
                    Connect Metamask
                    <img src={metamaskLogo} alt="" className=" ml-2 h-6 w-7" />
                </button>
                :
                <button onClick={disconnectWallet} className=" flex justify-center items-center shadow-sm  hover:text-black hover:bg-gray-500 active:ring ring-offset-neutral-400 font-medium bg-black p-3 rounded-xl text-white">
                    Disconnect Metamask
                    <img src={metamaskLogo} alt="" className=" ml-2 h-6 w-7" />
                </button>
                }
            </div>
        </div>
    )
}

export default NavBar
