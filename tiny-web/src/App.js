import React, { useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { gql, useMutation, useQuery, useApolloClient} from '@apollo/client';

const GET_LINK_QUERY = gql`
  query GetLink ( $hash: String! ) {
    link (hash: $hash) {
      hash
      longUrl
    }
  }
`;

const CREATE_LINK_MUTATION = gql`
  mutation CreateLink(
    $longUrl: String!
  ) {
    createLink(longUrl: $longUrl ) {
      hash
      longUrl
    }
  }
`;

const App = () => {

  const [longUrl, setLongUrl] = useState('');
 // const location = useLocation();

  // const { loading, error, data } = useQuery(GET_TODOS);
  const [createLink, {data}] = useMutation(CREATE_LINK_MUTATION);

  const inputChangeHandler = (e) => {
    setLongUrl(e.target.value);
  };

  const onSubmitHandler = () => {
    createLink({ variables: { longUrl: longUrl } });
  }

  const testShortUrl = () => {
    console.log(data.createLink.longUrl)
    window.location.replace(data.createLink.longUrl)
    window.open(data.createLink.longUrl, '_blank');
  }

  return (
    <div className="jumbotron">
      <h1 className="display-4">Shorten you url!</h1>
      <p className="lead">Past in the textbox below and click the left button.</p>
      <hr className="my-4"/>
        <form >
          <label htmlFor="basic-url">Your URL</label>
          <div className="input-group mb-3">
            <input id="longUrl" onChange={inputChangeHandler}  type="text" className="form-control" placeholder="Long Url Here" aria-label="Recipient's username" aria-describedby="basic-addon2" />
            <div className="input-group-append">
              <button onClick={onSubmitHandler} className="btn btn-outline-secondary" type="button">Press here to Shorten</button>
            </div>
          </div>
        </form>
        <hr className="my-4"/>

        {data && data.createLink ? <button onClick={testShortUrl} className="btn btn-outline-secondary" type="button"> {window.location.origin +'/'+ data.createLink.hash} </button> : null}
        data.createLink.longUrl
    </div>
  );
}

export default App;
