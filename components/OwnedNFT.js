import { useState, useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import nftAbi from "../constants/Nft.json"
import Image from "next/image"
import { Card, useNotification, CryptoLogos } from "web3uikit"
import { ethers } from "ethers"

const nftAddress_old = "0x3a2AB2DEB7A380A3285ea182935d4507E7203AAC"
const nftAddress = "0xF75011cE85280CA4B15D972bE578175FDb01B095"

export default function OwnedNFT() {
    const [Balance, setBalance] = useState("")
    const { account, isWeb3Enabled } = useMoralis()
    const [ImageURIURL, setImageURI] = useState("")
    const [TokenId, setTokenId] = useState({})
    const [tokenName, setTokenName] = useState({})
    const [tokenDescription, setTokenDescription] = useState({})
    const [tokenAttributes, setTokenAttributes] = useState({})

    var nft = function () {
        ;(this.name = ""),
            (this.description = ""),
            (this.image = ""),
            (this.attribute = ""),
            (this.tokenId = "")
    }
    var listedNftsOwned = []

    useEffect(() => {
        if (isWeb3Enabled) {
            ListNfts()
            //console.log(ListNfts())
        }
    }, [isWeb3Enabled])

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
                //console.log(tokenMetadata, i)

                await listedNftsOwned.push(new nft())

                const imageURI = tokenMetadata.image
                const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")

                listedNftsOwned[i].name = tokenMetadata.name
                listedNftsOwned[i].image = imageURIURL
                listedNftsOwned[i].tokenId = i
                listedNftsOwned[i].attribute = tokenMetadata.attributes
                listedNftsOwned[i].description = tokenMetadata.description

                setImageURI(listedNftsOwned[i].image)
                setTokenName(listedNftsOwned[i].name)
                setTokenDescription(listedNftsOwned[i].description)
                setTokenAttributes(listedNftsOwned[i].attribute)
                setTokenId(listedNftsOwned[i].tokenId)
            }
            console.log(listedNftsOwned)
        }
    }
    return (
        <div>
            <div>
                {ImageURIURL ? (
                    <div>
                        <Card
                            title={tokenName}
                            description={tokenDescription}
                            //il faut trouver un moyen de ne pas faire planter le code si l'info manque
                            tooltipText={
                                tokenAttributes[3].trait_type + ": " + tokenAttributes[3].value
                            }
                            //onClick={handleCardClick}
                        >
                            <div className="p-4">
                                <div className="flex flex-col items-end gap-2">
                                    <div>#{TokenId}</div>
                                    {/* <div className="italic text-sm">
                                        Owned by {formattedSellerAddress}
                                    </div> */}
                                    <Image
                                        loader={() => ImageURIURL}
                                        src={ImageURIURL}
                                        height="200"
                                        width="400"
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    )
}
