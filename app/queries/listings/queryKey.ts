import QueryKeyNameSpace from "queries/queryKeyNameSpace";

export const listKey = {
  create: [QueryKeyNameSpace.Listings, "create"] as const,
};
