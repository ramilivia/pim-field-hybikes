import { getItems } from "../utils";

const BikesQueryMockapi = `
  query Bikes {
    mockapiBikesRemoteSource {
      id
      name
      image
    }
  }
`;

export const fetchBikesMockapi = async (context: any) => {
  const response = await getItems(context.environment.endpoint, context.environment.authToken, BikesQueryMockapi);
  const { data: { mockapiBikesRemoteSource } } = await response.json();
  return mockapiBikesRemoteSource;
};

const BikeQueryMockapi = (bikeId: string) => `
    query MyQuery {
      mockapiBikeRemoteSource(bikeId: "${bikeId}") {
        id
        image
        name
      }
    }
`;

export const fetchBikeMockapi = async (context: any, bikeId: string) => {
  const response = await getItems(context.environment.endpoint, context.environment.authToken, BikeQueryMockapi(bikeId));
  const { data: { mockapiBikeRemoteSource } } = await response.json();
  return mockapiBikeRemoteSource;
};