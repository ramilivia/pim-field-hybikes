import { getItems } from "../utils";

const BikesQueryMockapi = (userGroup: string) => `
  query Bikes {
    mockapiBikesRemoteSource(userGroup: "${userGroup}") {
      id
      name
      image
      userGroup
    }
  }
`;

export const fetchBikesMockapi = async (context: any, userGroup: string) => {
  const response = await getItems(context.environment.endpoint, context.environment.authToken, BikesQueryMockapi(userGroup));
  const { data: { mockapiBikesRemoteSource } } = await response.json();
  return mockapiBikesRemoteSource;
};

const BikeQueryMockapi = (bikeId: string) => `
    query MyQuery {
      mockapiBikeRemoteSource(bikeId: "${bikeId}") {
        id
        image
        name
        userGroup
      }
    }
`;

export const fetchBikeMockapi = async (context: any, bikeId: string) => {
  const response = await getItems(context.environment.endpoint, context.environment.authToken, BikeQueryMockapi(bikeId));
  const { data: { mockapiBikeRemoteSource } } = await response.json();
  return mockapiBikeRemoteSource;
};