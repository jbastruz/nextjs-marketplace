import { useState, useEffect } from "react"
import nftAbi from "../constants/Nft.json"
import NFTBox from "../components/NFTBox"
import { ethers } from "ethers"
import { useMoralis } from "react-moralis"

const nftAddress_old = "0x3a2AB2DEB7A380A3285ea182935d4507E7203AAC"
const nftAddress = "0xF75011cE85280CA4B15D972bE578175FDb01B095"

export default function GraphExample() {
    const [Balance, setBalance] = useState("")
    const { account, isWeb3Enabled } = useMoralis()

    // useEffect(() => {
    //     ListNfts()
    // }, [])

    useEffect(() => {
        ListNfts()
    })

    async function ListNfts() {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(nftAddress, nftAbi, provider)

            const temp = parseInt(await contract.balanceOf(account))
            setBalance(parseInt(temp, 16))

            for (let i = 0; i < Balance; i++) {
                const tokenId = await contract.tokenOfOwnerByIndex(account, i)
                let tokenMetadataURI = await contract.getTokenURI(tokenId)
                if (tokenMetadataURI.startsWith("ipfs://")) {
                    tokenMetadataURI = tokenMetadataURI.replace("ipfs://", "https://ipfs.io/ipfs/")
                }
                const tokenMetadata = await fetch(tokenMetadataURI).then((response) =>
                    response.json()
                )
                console.log(tokenMetadata)
            }
        }
    }
    return <div>hi {Balance}</div>
}
