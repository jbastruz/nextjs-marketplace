import { gql } from "@apollo/client"

const GET_ACTIVE_ITEMS = gql`
    {
        # activeItems(where: { nftAddress: "0xf75011ce85280ca4b15d972be578175fdb01b095" }) {
        #     id
        #     seller
        #     nftAddress
        #     tokenId
        #     price
        # }
        activeItems(where: { buyer: "0x0000000000000000000000000000000000000000" }) {
            id
            seller
            nftAddress
            tokenId
            price
        }
    }
`
export default GET_ACTIVE_ITEMS
