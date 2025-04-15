import { getItems } from "../utils";

const BikesQueryHygraph = (userGroup: string) => `
  query Bikes {
    hygraphBikesRemoteSource(userGroup: "${userGroup}") {
      id
      sku
      name
      images {
        url
      }
    }
  }
`;

const BikeQueryHygraphConverter = (bike: any) => (
  {
    id: bike.sku,
    name: bike.name,
    image: bike.images[0].url,
  }
);

export const fetchBikesHygraph = async (context: any, userGroup: string) => {
  const response = await getItems(context.environment.endpoint, context.environment.authToken, BikesQueryHygraph(userGroup));
  const { data: { hygraphBikesRemoteSource } } = await response.json();
  const bikes = hygraphBikesRemoteSource.map(BikeQueryHygraphConverter);
  return bikes;
};

const BikeQueryHygraph = (bikeId: string) => `
  query MyQuery {
    hygraphBikeRemoteSource(bikeId: "${bikeId}") {
      name
      sku
      images {
        url
      }
    userGroup
    }
  }
`;

export const fetchBikeHygraph = async (context: any, bikeId: string) => {
  const response = await getItems(context.environment.endpoint, context.environment.authToken, BikeQueryHygraph(bikeId));
  const { data: { hygraphBikeRemoteSource } } = await response.json();
  return BikeQueryHygraphConverter(hygraphBikeRemoteSource[0]);
};