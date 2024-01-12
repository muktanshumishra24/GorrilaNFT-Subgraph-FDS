import { Transfer as TransferEvent } from "../generated/gorrila/gorrila";
import { Token, TokenMetadata, User } from "../generated/schema";
import { TokenMetadata as TokenMetadataTemplate } from "../generated/templates";

import { json, Bytes, dataSource, log } from "@graphprotocol/graph-ts";

const ipfsHash = "QmYtkZs7FnuVKNNKRzEJ8diWELCiJwiRv35BkKFy2wjJ1L";

export function handleTransfer(event: TransferEvent): void {
  let token = Token.load(event.params.tokenId.toString());

  if (!token) {
    token = new Token(event.params.tokenId.toString());
    token.owner = event.params.to.toHexString();
    token.tokenID = event.params.tokenId;
    token.tokenURI = event.params.tokenId.toString();


    const ipfsHashUri = ipfsHash + "/" + token.tokenURI + ".json";

    token.ipfsHashURI = ipfsHashUri;

    TokenMetadataTemplate.create(ipfsHashUri);
  }
  token.updatedAtTimestamp = event.block.timestamp;
  token.save();



  let user = User.load(event.params.to.toHexString());
  if (!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }
}



export function handleMetadata(content: Bytes): void {
  let tokenMetadata = new TokenMetadata(dataSource.stringParam());

  const value = json.fromBytes(content).toObject();

  if (value) {
    const image = value.get("image");
    const name = value.get("name");
    const attributes = value.get("attributes");
    const description = value.get("description");

    if (name && image && description && attributes) {
      tokenMetadata.name = name.toString();
      tokenMetadata.image = image.toString();
      tokenMetadata.description = description.toString() ;
      const attributesArray = attributes.toArray();

      if (attributesArray) {
        for (let i = 0; i < attributesArray.length; i++) {
          const attributeObject = attributesArray[i].toObject();
          const trait_type = attributeObject.get("trait_type");
          const value = attributeObject.get("value");

          if (trait_type && value) {
            switch (i) {
              case 0:
                tokenMetadata.traitType0 = trait_type.toString();
                tokenMetadata.value0 = value.toString();
                break;
              case 1:
                tokenMetadata.traitType1 = trait_type.toString();
                tokenMetadata.value1 = value.toString();
                break;
              case 2:
                tokenMetadata.traitType2 = trait_type.toString();
                tokenMetadata.value2 = value.toString();
                break;
              case 3:
                tokenMetadata.traitType3 = trait_type.toString();
                tokenMetadata.value3 = value.toString();
                break;
              case 4:
                tokenMetadata.traitType4 = trait_type.toString();
                tokenMetadata.value4 = value.toString();
                break;
              case 5:
                tokenMetadata.traitType5 = trait_type.toString();
                tokenMetadata.value5 = value.toString();
                break;
              case 6:
                tokenMetadata.traitType6 = trait_type.toString();
                tokenMetadata.value6 = value.toString();
                break;
            }
          }
        }
      }
      tokenMetadata.save();
    }
  }
}
