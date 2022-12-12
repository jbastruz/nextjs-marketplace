import { useState, useEffect } from "react"
import nftAbi from "../constants/Nft.json"
import NFTBox from "../components/NFTBox"
import { ethers } from "ethers"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { Card, useNotification, CryptoLogos } from "web3uikit"

const nftAddress_old = "0x3a2AB2DEB7A380A3285ea182935d4507E7203AAC"
const nftAddress = "0xF75011cE85280CA4B15D972bE578175FDb01B095"

export default function GraphExample() {
    const [Balance, setBalance] = useState("")
    const { account, isWeb3Enabled } = useMoralis()
    const [ImageURIURL, setImageURI] = useState("")
    const [tokenId, setTokenId] = useState({})
    const [tokenName, setTokenName] = useState({})
    const [tokenDescription, setTokenDescription] = useState({})
    const [tokenAttributes, setTokenAttributes] = useState({})

    // useEffect(() => {
    //     ListNfts()
    // }, [])
    console.log(isWeb3Enabled)
    useEffect(() => {
        if (isWeb3Enabled) {
            //ListNfts()
            console.log(ListNfts())
        }
    }, [isWeb3Enabled])

    // {isWeb3Enabled ? (
    //     loading || !listedNfts ? (
    //         <div>Loading...</div>
    //     ) : (
    //         listedNfts.activeItems.map((nft) => {
    //             console.log(nft)
    //             const { price, nftAddress, tokenId, seller } = nft
    //             return (
    //                 <NFTBox
    //                     price={price}
    //                     nftAddress={nftAddress}
    //                     tokenId={tokenId}
    //                     marketplaceAddress={marketplaceAddress}
    //                     seller={seller}
    //                     key={`${nftAddress}${tokenId}`}
    //                 />
    //             )
    //         })
    //     )
    // ) : (
    //     <div>Web3 Currently Not Enabled</div>
    // )}
    // const { runContractFunction: getTokenURI } = useWeb3Contract({
    //     abi: nftAbi,
    //     contractAddress: nftAddress,
    //     functionName: "tokenURI",
    //     params: {
    //         _tokenId: tokenId,
    //     },
    // })

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
                console.log(tokenMetadata, i)

                const imageURI = tokenMetadata.image
                const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")

                setTokenId(i)
                setImageURI(imageURIURL)
                setTokenName(tokenMetadata.name)
                setTokenDescription(tokenMetadata.description)
                setTokenAttributes(tokenMetadata.attributes)

                console.log(
                    `the tokenId is: ${tokenId}, 
                    the image is visible here: ${ImageURIURL}, 
                    the name is: ${tokenName}, 
                    the Color is ${tokenAttributes[3].value}`
                )

                // return (
                //     <div>
                //         <div>
                //             {ImageURIURL ? (
                //                 <div>
                //                     <Card
                //                         title={tokenName}
                //                         description={tokenDescription}
                //                         //il faut trouver un moyen de ne pas faire planter le code si l'info manque
                //                         tooltipText={
                //                             tokenAttributes[3].trait_type +
                //                             ": " +
                //                             tokenAttributes[3].value
                //                         }
                //                         //onClick={handleCardClick}
                //                     >
                //                         <div className="p-4">
                //                             <div className="flex flex-col items-end gap-2">
                //                                 <div>#{tokenId}</div>
                //                                 {/* <div className="italic text-sm">
                //                                 Owned by {formattedSellerAddress}
                //                             </div> */}
                //                                 <Image
                //                                     loader={() => ImageURIURL}
                //                                     src={ImageURIURL}
                //                                     height="200"
                //                                     width="400"
                //                                 />
                //                             </div>
                //                         </div>
                //                     </Card>
                //                 </div>
                //             ) : (
                //                 <div>Loading...</div>
                //             )}
                //         </div>
                //     </div>
                // )
            }
        }
    }
}
