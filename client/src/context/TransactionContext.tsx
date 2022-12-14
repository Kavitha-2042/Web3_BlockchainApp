import  React, {createContext, useEffect, useState} from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

interface  TransactionContextCreateInterface{
    connectWallet: () => Promise<void>,
    currentAccount: string,
    setFormData: React.Dispatch<React.SetStateAction<{
        addressTo: string;
        amount: string;
        keyword: string;
        message: string;
    }>>,
    formData: {
        addressTo: string;
        amount: string;
        keyword: string;
        message: string;
    },
    handleChange: (e: any, name: any) => void,
    sendTransaction: () => Promise<void>
    
}

// interface IContextProps {
//     // state: IState;
//     // dispatch: ({type}:{type:string}) => void;
//     // connectWallet: (()=>Promise<void>)
//     connectWallet: ()=>{}
//   }


// export const TransactionContext = createContext({} as IContextProps);
export const TransactionContext = createContext({} as TransactionContextCreateInterface) 

const { ethereum }:any = window;

const getEthereumContract = () =>{
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        transactionContract

    })

    return transactionContract;
}

export const TransactionProvider = ({children}:any) =>{

    const [ formData, setFormData ] = useState({addressTo:'', amount:'', keyword:'', message:''});
    const [ currentAccount, setCurrentAccount ] = useState("")
    const [ isloading, setIsLoading ] = useState(false)
    // const [ transactionCount, setTransactionCount ] = useState(0)
    const [ transactionCount, setTransactionCount ] = useState(localStorage.getItem('transactionCount'))


    const handleChange = (e:any,name:any) =>{
        setFormData((prevState)=>({...prevState, [name]:e.target.value}))
    }

    const checkIfWalletIsConnected = async () =>{
        try {
            if(!ethereum) return alert("Please install metamask");
    
            const accounts = await ethereum.request({method: 'eth_accounts'});
            if(accounts.length){
                setCurrentAccount(accounts[0]);
            }
            else{
                console.log("No account found");
            }
            console.log(accounts)

        } catch (error) {
             console.log(error);

            throw new Error("No ethereum object")
        }
    }

    const connectWallet = async() =>{
        try{
            if(!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({method: 'eth_requestAccounts',});

            setCurrentAccount(accounts[0]);

            console.log(accounts[0])

        }catch(error){
            console.log(error);

            throw new Error("No ethereum object")
        }
    }

    const sendTransaction = async () =>{
        try{
            if(!ethereum) return alert("Please install metamask");

            //get the data from form;
            const { addressTo, amount, keyword, message} = formData;

            const transactionContract =  getEthereumContract();

            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params:[{
                    from: currentAccount,
                    to: addressTo,
                    gas:'0x5208', //21000 GWEI
                    value: parsedAmount._hex, 
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            alert(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash.hash}`);
            alert(`Success - ${transactionHash.hash}`);
            setIsLoading(false);

            const transactionCount = await transactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());

        }catch(error){
            console.log(error);

            throw new Error("No ethereum object")
        }
    }

    useEffect(()=>{
        checkIfWalletIsConnected();
    },[])

    return(
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}

//0.75499395

//0.10004