import { gql } from "@apollo/client";
import { apolloClient } from "..";

const Query = {
  post: gql(`mutation($request: CreatePublicPostRequest!) {
              createPostTypedData(request: $request){
                id
                expiresAt
                typedData{
                    types{
                      PostWithSig{
                        name
                        type
                      }
                    }
                    value{
                        nonce
                        deadline
                        profileId
                        contentURI
                        collectModule
                        collectModuleInitData
                        referenceModule
                        referenceModuleInitData
                    }
                    domain{
                      name
                      chainId
                      version
                      verifyingContract
                    }
                }
              }
          }
  `),
};

class PublicationApi {
  createPostTypeData(request) {
    return apolloClient.mutate({
      mutation: Query.post,
      variables: {
        request: request,
      },
    });
  }
}

export default new PublicationApi();
