import { useState, useEffect } from "react"
import nftAbi from "../constants/Nft.json"
import NFTBox from "../components/NFTBox"
import { ethers } from "ethers"
import { useMoralis } from "react-moralis"

const nftAddress = "0x3a2AB2DEB7A380A3285ea182935d4507E7203AAC"

export default function GraphExample() {
    const [Balance, setBalance] = useState("")
    const { account } = useMoralis()

    useEffect(() => {
        ListNfts()
    }, [])

    async function ListNfts() {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(nftAddress, nftAbi, provider)

            const temp = parseInt(await contract.balanceOf(account))
            setBalance(parseInt(temp, 16))
            console.log(Balance)

            for (let i = 0; i < Balance; i++) {
                const tokenId = await contract.tokenOfOwnerByIndex(account, i)
                let tokenMetadataURI = contract.getTokenURI(tokenId)
                console.log(tokenMetadataURI)
            }
        }
    }
    return <div> hi </div>
}
