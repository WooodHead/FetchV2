import { createNetworkInterface, ApolloClient } from 'react-apollo';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { addGraphQLSubscriptions } from 'add-graphql-subscriptions';


const wsClient = new SubscriptionClient('wss://subscriptions.us-west-2.graph.cool/v1/cj4ejvgsk8zx30124n5y8vdpb', {
  reconnect: true,
});

const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj4ejvgsk8zx30124n5y8vdpb' })

// Extend the network interface with the WebSocket
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient

);

export const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject: o => o.id,
});
