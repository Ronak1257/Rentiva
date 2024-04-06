import NavBar from "./components/NavBar";
import Footer from "./components/Footer"
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Createproperty from "./components/Createproperty";
import Profile from "./components/Profile";
import { ethers } from "ethers";
import Singleproperty from "./components/Singleproperty";
import Firstpage from "./components/Firstpage";
import Listproperty from "./components/Listproperty";

function App() {
  const [account, setAccount] = useState('');
  const [state, setState] = useState('Home');
  const [listedProperty,setListedProperty]=useState([]);
  const [userProperty,setUserProperty]=useState([]);
  const [property,setProperty]=useState();
  const [productId,setProductId]=useState('');
  const [Owner,setOwner]=useState('0x25a1148ea2F07083f5E08AF20c9A69cC382B4ee3');
  const walletAddress='0xB9CaF5cc444B4603C6664A3D60922B76C24688A1';
  const provierApi='https://sepolia.infura.io/v3/87330cb0d1304f8ebcfe156fedf0d0e3';
  const walletAbi=[
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_propertyTitle",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_images",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_proprertyAddress",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        }
      ],
      "name": "createProperty",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "productId",
          "type": "uint256"
        }
      ],
      "name": "leaseProperty",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "productId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_time",
          "type": "uint256"
        }
      ],
      "name": "listProperty",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "PropertyCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "tenant",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "leaseTime",
          "type": "uint256"
        }
      ],
      "name": "PropertyLeased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "tenant",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "PropertyReleased",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "productId",
          "type": "uint256"
        }
      ],
      "name": "releaseProperty",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getListedProperty",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "productID",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "tenant",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "startTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "leaseTime",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "propertyTitle",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "images",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "propertyAddress",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "list",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "lease",
              "type": "bool"
            }
          ],
          "internalType": "struct RealState.Property[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "propertyId",
          "type": "uint256"
        }
      ],
      "name": "getProperty",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "productID",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "tenant",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "startTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "leaseTime",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "propertyTitle",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "images",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "propertyAddress",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "list",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "lease",
              "type": "bool"
            }
          ],
          "internalType": "struct RealState.Property",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getUserProperties",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "productID",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "tenant",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "startTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "leaseTime",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "propertyTitle",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "images",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "propertyAddress",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "list",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "lease",
              "type": "bool"
            }
          ],
          "internalType": "struct RealState.Property[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "propertyIndex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  const provider=new ethers.providers.JsonRpcProvider(provierApi);
  const walletContract=new ethers.Contract(walletAddress,walletAbi,provider);
  const handleAccount = async(acc) => {
    const getProperty=await walletContract.getListedProperty();
    setListedProperty(getProperty);
    console.log(getProperty);
    const getUserProperty=await walletContract.getUserProperties();
    setUserProperty(getUserProperty);
    console.log(getUserProperty);
    setAccount(acc);
  }
  const handleState = (state) => {
    setState(state);
  }
  const showproperty = async(productId)=>{
    const property = await walletContract.getProperty(productId);
    // console.log(property);
    setProperty(property);
  }

  const changeProduct = async(productId)=>{
    setProductId(productId);
  }
  return (
    <div>
      <NavBar handleAccount={handleAccount} handleState={handleState} />
      {/* <p className="text-black">{account}</p> */}
      {
        account && (
          property ? <Singleproperty property={property}/>:
          state === "Home" ? <Home walletAddress={walletAddress} walletAbi={walletAbi} listedProperty={listedProperty} showproperty={showproperty} handleState={handleState} account={account}/> :
          state === "CreateProperty" ? <Createproperty walletAddress={walletAddress} walletAbi={walletAbi} account={account}/>:
          state === "Profile" ? <Profile walletAddress={walletAddress} walletAbi={walletAbi} account={account} userProperty={userProperty} showproperty={showproperty} handleState={handleState} changeProduct={changeProduct}/> :
          state === "Listproperty" ? <Listproperty walletAddress={walletAddress} walletAbi={walletAbi} account={account} propertyId={productId} owner={Owner}/> :
          state === "Property" ? <Singleproperty property={property}/> : null
        )
      }
      {
        !account && <Firstpage /> 
      }
      <Footer/>
    </div>
  )
}

export default App
