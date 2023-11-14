import QueryKeyNameSpace from "queries/queryKeyNameSpace";

export const authKey = {
  signUp: [QueryKeyNameSpace.Auth, "signUp"] as const,
};
