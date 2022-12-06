import { useQuery, gql } from "@apollo/client"
import { NFTBalance } from "web3uikit"

const GET_ACTIVE_ITEMS = gql`
    {
        activeItems(first: 5, where: { buyer: "0x0000000000000000000000000000000000000000" }) {
            id
            buyer
            seller
            nftAddress
            tokenId
            price
        }
    }
`

export default function GraphExample() {
    const { loading, error, data } = useQuery(GET_ACTIVE_ITEMS)
    console.log(data)
    return (
        <div>
            hi
            <NFTBalance address="0x8bD67Fb2A4112E94f5d54eDCDd239246c7ec30f7" chain="eth" />
        </div>
    )
}
