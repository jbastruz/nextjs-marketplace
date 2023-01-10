import { useState, useEffect, useRef } from "react"
import styles from "./styles.module.scss"
import uploadIcon from "./imgs/upload.png"
import plusIcon from "./svgs/plus.svg"
import closeIcon from "./svgs/close.svg"
import { Logo } from "web3uikit"
import { NFTStorage, File, Blob } from "nft.storage"

// const dotenv = require("dotenv")
// dotenv.config()

//il suffit de changer ce truc la pour que la page se mette à jour sur le bon NFT
//const nftAddress = "0xF75011cE85280CA4B15D972bE578175FDb01B095"

function App() {
    const NFT_STORAGE_TOKEN =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk2Mjg3MEYzN0E5Mjg0NTI0NDE4YzIwMGU0ODM2ZTgwN2Q1OTE1RjciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3Mjg0MTU0NDg2MywibmFtZSI6Ik1BUktFVFBMQUNFIn0.VH15x9nAwdDyhH66630Rf8vN8UxZwiX4eGPlSflxC6Y"
    const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })
    const [logo, setLogo] = useState(null)
    const inputRef = useRef(null)

    useEffect(() => {}, [])

    const removeImage = () => {
        setLogo(null)
    }

    const handleFileSelect = async (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0]

            const reader = new FileReader()

            reader.onload = function (e) {
                setLogo(e.target.result)
            }

            const imageFile = new File([file], "nft.png", { type: "image/png" })
            const metadata = await client.store({
                name: "My sweet NFT 2",
                description: "Just try to funge it. You can't do it.",
                image: imageFile,
            })

            reader.readAsDataURL(file)
        }
    }

    return (
        <div className={styles.inputGroup}>
            <div className={styles.inputTitle}>Logo Image *</div>
            <div className={styles.inputSubTitle}>
                This image will also be used for navigation. 300x300 recommended.
            </div>
            <div className={styles.inputWrapper}>
                <div className={styles.logoUploadBox}>
                    {logo ? (
                        <>
                            <img src={logo} />
                            <div className={styles.removeOverlay}>
                                <div className={styles.removeIcon} onClick={removeImage}>
                                    <img src={closeIcon} />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div
                            className={styles.uploadOverlay}
                            onClick={() => inputRef.current?.click()}
                        >
                            <input
                                ref={inputRef}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleFileSelect}
                            />
                            <div className={styles.upload}>
                                <div className={styles.uploadInner}>
                                    <img src={uploadIcon} />
                                </div>
                                <div className={styles.plusIcon}>
                                    <img src={plusIcon} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default App
