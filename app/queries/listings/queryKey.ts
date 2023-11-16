import QueryKeyNameSpace from "queries/queryKeyNameSpace";

export const listKey = {
  create: [QueryKeyNameSpace.Listings, "create"] as const,
  favorite: [QueryKeyNameSpace.Listings, "favorite"] as const,
  unFavorite: [QueryKeyNameSpace.Listings, "unFavorite"] as const,
};
