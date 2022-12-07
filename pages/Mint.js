import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { useMoralis, useWeb3Contract } from "react-moralis"
import nftabi from "../constants/Nft.json"
const nftAddress = "0x3a2AB2DEB7A380A3285ea182935d4507E7203AAC"

function App() {
    const [error, setError] = useState("")
    const [data, setData] = useState({})
    const { account } = useMoralis()
    const { runContractFunction: getContractURI } = useWeb3Contract({
        abi: nftabi,
        contractAddress: nftAddress,
        functionName: "tokenURI",
        params: {
            _tokenId: 0,
        },
    })

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        if (typeof window.ethereum !== "undefined") {
            const contractURI = await getContractURI()
            console.log(`The contractURI is ${contractURI}`)
            const requestURL = contractURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            console.log(requestURL)
            const ContractURIResponse = await (await fetch(requestURL)).json()

            try {
                const name = await ContractURIResponse.name
                const description = await ContractURIResponse.description
                const object = { name: String(name), description: String(description) }
                setData(object)
            } catch (err) {
                setError(err.message)
            }
        }
    }

    async function mint() {
        if (typeof web3.currentProvider !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            await provider.send("eth_requestAccounts", [])
            const signer = provider.getSigner()
            let overrides = {
                from: account,
            }
            const contract = new ethers.Contract(nftAddress, nftabi, signer)
            try {
                const transaction = await contract.mint(overrides)
                console.log(transaction)
                await transaction.wait()
                fetchData()
            } catch (err) {
                setError(err.message)
            }
        }
    }

    return (
        <div className="App">
            <div className="container">
                {error && <p>{error}</p>}
                <h1>Mint an {data.name} NFT !</h1>
                <p className="cost">Each NFT costs {0.0} AVAX (excluding gas fees)</p>
                <button onClick={mint}>BUY {data.description} NFT</button>
            </div>
        </div>
    )
}

export default App
