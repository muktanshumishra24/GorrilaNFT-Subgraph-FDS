import { Transfer as TransferEvent } from "../generated/gorrila/gorrila";
import { Gorrila, GorrilaMetadata, User } from "../generated/schema";
import { GorrilaMetadata as GorrilaMetadataTemplate } from "../generated/templates";

import { json, Bytes, dataSource, log } from "@graphprotocol/graph-ts";

const ipfsHash = "QmYtkZs7FnuVKNNKRzEJ8diWELCiJwiRv35BkKFy2wjJ1L";

export function handleTransfer(event: TransferEvent): void {
  let gorrila = Gorrila.load(event.params.tokenId.toString());

  if (!gorrila) {
    gorrila = new Gorrila(event.params.tokenId.toString());
    gorrila.owner = event.params.to.toHexString();
    gorrila.tokenID = event.params.tokenId;
    gorrila.tokenURI = event.params.tokenId.toString();

    const ipfsHashUri = ipfsHash + "/" + gorrila.tokenURI + ".json";
    gorrila.ipfsHashURI = ipfsHashUri;
    GorrilaMetadataTemplate.create(ipfsHashUri);
  }
  gorrila.updatedAtTimestamp = event.block.timestamp;
  gorrila.save();

  let user = User.load(event.params.to.toHexString());
  if (!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }
}

export function handleMetadata(content: Bytes): void {
  let gorrilaMetadata = new GorrilaMetadata(dataSource.stringParam());

  const value = json.fromBytes(content).toObject();

  if (value) {
    const image = value.get("image");
    const name = value.get("name");
    const attributes = value.get("attributes");
    const description = value.get("description");

    if (name && image && description && attributes) {
      gorrilaMetadata.name = name.toString();
      gorrilaMetadata.image = image.toString();
      gorrilaMetadata.description = description.toString() ;
      const attributesArray = attributes.toArray();

      if (attributesArray) {
        for (let i = 0; i < attributesArray.length; i++) {
          const attributeObject = attributesArray[i].toObject();
          const trait_type = attributeObject.get("trait_type");
          const value = attributeObject.get("value");

          if (trait_type && value) {
            switch (i) {
              case 0:
                gorrilaMetadata.traitType0 = trait_type.toString();
                gorrilaMetadata.value0 = value.toString();
                break;
              case 1:
                gorrilaMetadata.traitType1 = trait_type.toString();
                gorrilaMetadata.value1 = value.toString();
                break;
              case 2:
                gorrilaMetadata.traitType2 = trait_type.toString();
                gorrilaMetadata.value2 = value.toString();
                break;
              case 3:
                gorrilaMetadata.traitType3 = trait_type.toString();
                gorrilaMetadata.value3 = value.toString();
                break;
              case 4:
                gorrilaMetadata.traitType4 = trait_type.toString();
                gorrilaMetadata.value4 = value.toString();
                break;
              case 5:
                gorrilaMetadata.traitType5 = trait_type.toString();
                gorrilaMetadata.value5 = value.toString();
                break;
              case 6:
                gorrilaMetadata.traitType6 = trait_type.toString();
                gorrilaMetadata.value6 = value.toString();
                break;
            }
          }
        }
      }
      gorrilaMetadata.save();
    }
  }
}
