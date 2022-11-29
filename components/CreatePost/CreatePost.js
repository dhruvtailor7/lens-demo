import { ethers } from "ethers";
import React, { useRef } from "react";

import { v4 as uuidv4 } from "uuid";
import { useContract, useSigner, useSignTypedData } from "wagmi";
import PublicationApi from "../../graphql/PublicationApi";
import LENS_HUB_ABI from "../../abis/lenshubabis.json"

const IPFS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYxRjA0OWJjYTJFOWQyOGEyNTNmOTM0MDhDYzk3Q0YyMzIxOTFmM0IiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njc0ODUzNTQ4NTksIm5hbWUiOiJGaXJzdCBUb2tlbiJ9.eArlzoXBOs_rac_Zk8OHdv7kT1oa3RxEJ4zaoLg5WtY";

const LENS_HUB_CONTRACT = "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82"
export const PublicationMainFocus = {
  VIDEO: 'VIDEO',
  IMAGE: 'IMAGE',
  ARTICLE: 'ARTICLE',
  TEXT_ONLY: 'TEXT_ONLY',
  AUDIO: 'AUDIO',
  LINK: 'LINK',
  EMBED: 'EMBED',
}

function CreatePost() {
  const imageRef = useRef(null);

  const { signTypedDataAsync } = useSignTypedData();
  const signer = useSigner();
  const contract = useContract({address: LENS_HUB_CONTRACT, abi: LENS_HUB_ABI, signerOrProvider: signer.data})

  async function createNewPost() {

    const hasImage = !!imageRef.current.cid
    const postData = {
      version: "2.0.0",
      mainContentFocus: hasImage ? PublicationMainFocus.IMAGE : PublicationMainFocus.TEXT_ONLY,
      metadata_id: uuidv4(),
      description: "Description",
      locale: "en-US",
      content: "Image Description",
      external_url: null,
      image: `ipfs://${imageRef.current.cid}`,
      imageMimeType: imageRef.current.mimeType,
      name: imageRef.current.name,
      media: [
        {
          item: `ipfs://${imageRef.current.cid}`,
          type: imageRef.current.mimeType,
        },
      ],
      attributes: [],
      tags: [],
      appId: "react-lens",
    };
    // const bufferData = Buffer.from(JSON.stringify(postData));

    // image: `ipfs://${cid}`,
    // imageMimeType: mediaFiles[0]?.type,

    const response = await fetch("https://api.web3.storage/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${IPFS_TOKEN}`,
        contentType: "application/json",
      },
      body: JSON.stringify(postData),
    });
    console.log({ response });
    const responseJson = await response?.json();
    const cid = responseJson?.cid;
    console.log("Content added with CID:", cid);
    const ipfslink = "ipfs://" + cid;

    const postRequest = {
      profileId: "0x5671",
      contentURI: ipfslink,
      collectModule: {
        freeCollectModule: {
          followerOnly: false,
        },
      },
      referenceModule: {
        followerOnlyReferenceModule: false,
      },
    };

    const signedData = (await PublicationApi.createPostTypeData(postRequest)).data?.createPostTypedData;

    console.log("create post: createPostTypedData", signedData);

    const typedData = signedData.typedData;
    console.log("create post: typedData", typedData);

    // remove the __typedname from the signature!

    const _d = omit(typedData.domain, "__typename")
    const _t = omit(typedData.types, "__typename")
    const _v = omit(typedData.value, "__typename")

    console.log("create post: omit", {_d, _v, _t})

    const signature = (await signTypedDataAsync({
      domain: _d,
      types: _t,
      value: _v,
    }));
    console.log("create post: signature", signature);

    const { v, r, s } = ethers.utils.splitSignature(signature);
    console.log("create post: split done> signer:", signer)
    
    // const contract = new ethers.Contract(LENS_HUB_CONTRACT, LENS_HUB_ABI, signer);

    const tx = await contract.postWithSig({
      profileId: typedData.value.profileId,
      contentURI: typedData.value.contentURI,
      collectModule: typedData.value.collectModule,
      collectModuleInitData: typedData.value.collectModuleInitData,
      referenceModule: typedData.value.referenceModule,
      referenceModuleInitData: typedData.value.referenceModuleInitData,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    });

    console.log({tx})
  }

  async function uploadFile(event) {
    const mediaFiles = event.target.files;
    let formData = new FormData(); //formdata object

    formData.append("file", mediaFiles[0]);
    const response = await fetch("https://api.web3.storage/upload", {
      method: "POST",
      headers: {
        "X-NAME": mediaFiles[0].name,
        Authorization: `Bearer ${IPFS_TOKEN}`,
      },
      body: formData,
    });
    const responseJson = await response?.json();

    const cid = responseJson?.cid;
    // const cid = await uploadImage(mediaFiles[0]);
    console.log("Image cid ", cid);
    console.log({ mediaFiles });
    // access file here
    imageRef.current = {cid, name: mediaFiles[0].name, mimeType: mediaFiles[0].type}
  }

  return (
    <div>
      {/* <form> */}
      <h4>File Upload</h4>
      <input type={"File"} onChange={uploadFile} />
      {/* </form> */}
      <button
        onClick={() => {
          createNewPost();
        }}
      >
        Create Post
      </button>
    </div>
  );
}

function omit(obj = {}, key){
  const objCopy = {...obj};
  delete objCopy[key]
  return objCopy;
}

export default CreatePost;
