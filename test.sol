pragma solidity ^0.5.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";

contract MonNFT is ERC721 {
    // Déclarez un contrat ERC20 pour stocker les USDC
    ERC20 public usdc;

    // Constructeur qui initialise les propriétés du contrat
    constructor(address _usdc) public {
        // Appelez le constructeur de la classe ERC721 pour initialiser les propriétés de base
        ERC721("MonNFT", "MNFT");

        // Stockez l'adresse du contrat ERC20 pour les USDC
        usdc = ERC20(_usdc);
    }

    // Fonction pour acheter un jeton NFT en utilisant des USDC
    function buyNFT(uint256 _tokenId) public payable {
        // Vérifiez si le montant envoyé est suffisant pour acheter le jeton NFT
        require(msg.value >= nftPrice(_tokenId), "Le montant envoyé est insuffisant");

        // Transférez les USDC du porteur du message au contrat NFT
        require(
            usdc.transferFrom(msg.sender, address(this), nftPrice(_tokenId)),
            "Le transfert des USDC a échoué"
        );

        // Envoyez le jeton NFT au porteur du message
        _safeTransferFrom(address(0), msg.sender, _tokenId);
    }

    // Fonction pour calculer le prix d'un jeton NFT
    function nftPrice(uint256 _tokenId) public view returns (uint256) {
        // Placez ici votre logique de calcul du prix du jeton NFT
        return 0;
    }
}
