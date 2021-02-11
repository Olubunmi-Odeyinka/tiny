import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { gql, useMutation, useQuery, useLazyQuery, useApolloClient} from '@apollo/client';

const GET_LINK_QUERY = gql`
  query GetLink ( $hash: String! ) {
    link (hash: $hash) {
      hash
      longUrl
    }
  }
`;


const Redirect = (props) => {

  const onCompleted = (e) => {
    navigateUrl(e.link.longUrl);
  };

  const { loading, error, link } = useQuery(GET_LINK_QUERY, {
      variables: { hash: props.match.params.hash },
      onCompleted: onCompleted
    });

  const ensureUrlHasProtocol = (url) => {
    let validUrl = url
    if(!(url.startsWith('http://') || url.startsWith('https://'))){
      validUrl = 'http://' + url;
    }
    return validUrl;
  }

  const navigateUrl = (url) => {
    console.log(url)
    let element = document.createElement('a');
    element.href =  ensureUrlHasProtocol(url);
  
    element.click();
  }

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return 'Redirecting...'
}

export default Redirect;