import React, { Component } from 'react';

import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider,
} from 'react-apollo';

import logo from './logo.svg';
import './App.css';


const client = new ApolloClient();

const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

const ChannelsList = ({data: {loading, error, channels}}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return <ul>
    { channels.map( ch => <li key={ch.id}>{ch.name}</li> ) }
  </ul>;
};

const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Apollo</h1>
          </header>
          <ChannelsList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
