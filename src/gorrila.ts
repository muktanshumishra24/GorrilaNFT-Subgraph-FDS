// Running `graph codegen` generates resource file for the logic to refer, for example the Event Types to Monitor, The Entity Created from our Schema and the Template for IPFS through Template Defs.
import { Transfer as TransferEvent } from "../generated/gorrila/gorrila";
import { Gorrila, GorrilaMetadata, User } from "../generated/schema";
import { GorrilaMetadata as GorrilaMetadataTemplate } from "../generated/templates";

//The Helpers to handle the Metadata
import { json, Bytes, dataSource } from "@graphprotocol/graph-ts";

//The IPFS Hash for creating the URL
const ipfsHash = "QmYtkZs7FnuVKNNKRzEJ8diWELCiJwiRv35BkKFy2wjJ1L";

export function handleTransfer(event: TransferEvent): void {
  let gorrila = Gorrila.load(event.params.tokenId.toString());
  //To Check if the NFT Token is already present on the Subgraph's Local Store and Render/Load it by Passing the ID, if not then create a new one.

  if (!gorrila) {
    gorrila = new Gorrila(event.params.tokenId.toString());
    //The Token owner is the address to which the token is transferred to.
    gorrila.owner = event.params.to.toHexString();
    //Pass the Token ID to the Gorrila Entity to further Store it and also help call certain specific data.
    gorrila.tokenID = event.params.tokenId;
    //The Token URI is stored for keep the data and also construct the URL for the Metadata.
    gorrila.tokenURI = event.params.tokenId.toString();
    
    // Create the iphsHashUri to trigger the TokenMetadata template that will create the TokenMetadata entity.
    const ipfsHashUri = ipfsHash + "/" + gorrila.tokenURI + ".json";
    gorrila.ipfsHashURI = ipfsHashUri;
    GorrilaMetadataTemplate.create(ipfsHashUri);
  }
  gorrila.updatedAtTimestamp = event.block.timestamp;
  gorrila.save();

  //Create a User Entity and Assigned the TO Address to it.
  let user = User.load(event.params.to.toHexString());
  if (!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }
}

//The Function to handle the Metadata triggered by the TokenMetadata Template.
export function handleMetadata(content: Bytes): void {
  let gorrilaMetadata = new GorrilaMetadata(dataSource.stringParam());
  // Create a new TokenMetadata entity and pass in the dataSource as its ID. Datasource===IPFSHashURI Created Above.

  const value = json.fromBytes(content).toObject();
  // Create a value variable that will be used to store the json object that is passed in as the content parameter.
  if (value) {
    const image = value.get("image");
    const name = value.get("name");
    const attributes = value.get("attributes");
    const description = value.get("description");

    //The Check to see if all these values are present in the JSON Object and are not NULL.

    if (name && image && description && attributes) {
      gorrilaMetadata.name = name.toString();
      gorrilaMetadata.image = image.toString();
      gorrilaMetadata.description = description.toString();
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
