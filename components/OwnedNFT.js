import { useState, useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import nftAbi from "../constants/Nft.json"
import Image from "next/image"
import { Card, useNotification, CryptoLogos } from "web3uikit"
import { ethers } from "ethers"
import { validate } from "graphql"

const nftAddress_old = "0x3a2AB2DEB7A380A3285ea182935d4507E7203AAC"
const nftAddress = "0xF75011cE85280CA4B15D972bE578175FDb01B095"

export default function OwnedNFT() {
    //const [Balance, setBalance] = useState("")
    const { account, isWeb3Enabled } = useMoralis()
    const [ImageURIURL, setImageURI] = useState("")
    const [TokenId, setTokenId] = useState("")
    const [tokenName, setTokenName] = useState("")
    const [tokenDescription, setTokenDescription] = useState("")
    const [tokenAttributes, setTokenAttributes] = useState("")

    var nft = function () {
        ;(this.name = ""),
            (this.description = ""),
            (this.image = ""),
            (this.attribute = ""),
            (this.tokenId = "")
    }
    var nft = function (_name, _description, _image, _attribute, _tokenId) {
        ;(this.name = _name),
            (this.description = _description),
            (this.image = _image),
            (this.attribute = _attribute),
            (this.tokenId = _tokenId)
    }
    var listedNftsOwned = []

    function checkUndefined(_val) {
        if (_val.name != undefined) {
            return _val
        }
    }

    async function ListNfts() {
        //console.log(typeof window.ethereum !== "undefined")
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(nftAddress, nftAbi, provider)
            const temp = parseInt(await contract.balanceOf(account))
            //console.log(temp)
            //console.log(`parseInt : ${parseInt(temp, 16)}`)
            const Balance = parseInt(temp, 16)
            //setBalance(parseInt(temp, 16))
            //console.log(Balance)

            for (let i = 0; i < Balance; i++) {
                console.log(i)
                const tokenId = await contract.tokenOfOwnerByIndex(account, i)
                let tokenMetadataURI = await contract.getTokenURI(tokenId)
                if (tokenMetadataURI.startsWith("ipfs://")) {
                    tokenMetadataURI = tokenMetadataURI.replace("ipfs://", "https://ipfs.io/ipfs/")
                }
                const tokenMetadata = await fetch(tokenMetadataURI).then((response) =>
                    response.json()
                )
                //console.log(tokenMetadata, i)

                const imageURI = tokenMetadata.image
                const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")

                listedNftsOwned.push(new nft())

                listedNftsOwned[i].name = tokenMetadata.name
                listedNftsOwned[i].image = imageURIURL
                listedNftsOwned[i].tokenId = i
                listedNftsOwned[i].attribute = tokenMetadata.attributes
                listedNftsOwned[i].description = tokenMetadata.description

                setImageURI(listedNftsOwned.image)
                setTokenName(listedNftsOwned.name)
                setTokenDescription(listedNftsOwned.description)
                setTokenAttributes(listedNftsOwned.attribute)
                setTokenId(listedNftsOwned.tokenId)
            }
        }
        return listedNftsOwned.filter(checkUndefined)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            ListNfts().then(console.log)
            console.log(tokenName)
        }
    }, [isWeb3Enabled])

    // isWeb3Enabled ? (
    //     !listedNftsOwned ? (
    //         <div>Loading...</div>
    //     ) : (
    //         listedNftsOwned.map((nft) => {
    //             console.log(nft)
    //             const { image, name, description, tokenId, attribute } = nft
    //             return (
    //                 <div>
    //                     <div>
    //                         {image ? (
    //                             <div>
    //                                 <Card
    //                                     title={name}
    //                                     description={description}
    //                                     //il faut trouver un moyen de ne pas faire planter le code si l'info manque
    //                                     tooltipText={
    //                                         attribute[3].trait_type + ": " + attribute[3].value
    //                                     }
    //                                     //onClick={handleCardClick}
    //                                 >
    //                                     <div className="p-4">
    //                                         <div className="flex flex-col items-end gap-2">
    //                                             <div>#{tokenId}</div>
    //                                             {/* <div className="italic text-sm">
    //                                 Owned by {formattedSellerAddress}
    //                             </div> */}
    //                                             <Image
    //                                                 loader={() => image}
    //                                                 src={image}
    //                                                 height="200"
    //                                                 width="400"
    //                                             />
    //                                         </div>
    //                                     </div>
    //                                 </Card>
    //                             </div>
    //                         ) : (
    //                             <div>Loading...</div>
    //                         )}
    //                     </div>
    //                 </div>
    //             )
    //         })
    //     )
    // ) : (
    //     <div>Web3 Currently Not Enabled</div>
    // )
}
