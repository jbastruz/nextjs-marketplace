import { ConnectButton } from "web3uikit"
import Link from "next/link"

export default function Header() {
    return (
        <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
            <h1 className="py-4 px-4 font-bold text-3xl">WhyNotGames MP</h1>
            <div className="flex flex-row items-center">
                <Link href="/">
                    <a className="mr-4 p-6">Home</a>
                </Link>
                <Link href="/sell-nft">
                    <a className="mr-4 p-6">Sell NFT</a>
                </Link>
                <Link href="/graphExample">
                    <a className="mr-4 p-6">OwnedNFT</a>
                </Link>
                <Link href="/Mint">
                    <a className="mr-4 p-6">Mint</a>
                </Link>
                {/* <Link href="/create">
                    <a className="mr-4 p-6">Create</a>
                </Link> */}
                <ConnectButton />
            </div>
        </nav>
    )
}
