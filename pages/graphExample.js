import styles from "../styles/Home.module.css"
import { useMoralis } from "react-moralis"
import OwnedNFT from "../components/OwnedNFT"
import networkMapping from "../constants/networkMapping.json"
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries"
import { useQuery } from "@apollo/client"

export default function Home() {
    return <OwnedNFT />
}
