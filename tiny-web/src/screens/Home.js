import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { gql, useMutation, useQuery, useLazyQuery, useApolloClient} from '@apollo/client';

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

const Home = (props) => {

  const [longUrl, setLongUrl] = useState('');
 // const location = useLocation();

  


  const [createLink, {data}] = useMutation(CREATE_LINK_MUTATION);



  const inputChangeHandler = (e) => {
    setLongUrl(e.target.value);
  };

  const onSubmitHandler = () => {
    createLink({ variables: { longUrl: longUrl } });
  }

  const ensureUrlHasProtocol = (url) => {
    let validUrl = url
    if(!(url.startsWith('http://') || url.startsWith('https://'))){
      validUrl = 'http://' + url;
    }
    return validUrl;
  }

  const createUrlFromHash = (hash) => {
    return window.location.origin +'/'+ hash 
  }

  const copyToClipClipBoard = (hash) => {
    var e = document.createElement("textarea");
    document.body.appendChild(e);
    e.value = createUrlFromHash(hash);
    e.select();
    document.execCommand("copy");
    document.body.removeChild(e);

  }

  const navigateUrl = (url) => {
    console.log(url)
    let element = document.createElement('a');
    element.href =  ensureUrlHasProtocol(url);
   

    element.click();
  }

  return (
    <div className="m-4 jumbotron">
      <h1 className="display-4">Shorten you url!</h1>
      <p className="lead">Past in the textbox below and click the left button.</p>
      <hr className="my-4"/>
        <form >
          <label htmlFor="basic-url">Your URL</label>
          <div className="input-group mb-3">
            <input id="longUrl" onChange={inputChangeHandler} value={longUrl} type="text" className="form-control" placeholder="Long Url Here" aria-label="Recipient's username" aria-describedby="basic-addon2" />
            <div className="input-group-append">
              <button onClick={onSubmitHandler} className="btn btn-outline-secondary" type="button">Press here to Shorten</button>
            </div>
          </div>
        </form>
        <hr className="my-4"/>

        {data && data.createLink ? <div className="alert alert-dark d-flex" role="alert">
        <span className="mr-auto p-2">{ createUrlFromHash(data.createLink.hash) } </span>
        <button type="button" onClick={() => navigateUrl(data.createLink.longUrl)} className="btn btn-success ml-4 p-2">Test Link</button>
        <button type="button" onClick={() => copyToClipClipBoard(data.createLink.hash)} className="btn btn-dark ml-4 p-2">Copy Link</button>
      </div>
          
        : null }
        
    </div>
  );
}

export default Home;