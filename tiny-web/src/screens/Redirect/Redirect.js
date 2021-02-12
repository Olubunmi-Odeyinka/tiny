import React from "react";
import {navigateUrl} from '../../helper/urlFunctions';
import { gql, useQuery} from '@apollo/client';

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
      fetchPolicy: "cache-first",
      variables: { hash: props.match.params.hash },
      onCompleted: onCompleted
    });



  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return 'Redirecting...'
}

export default Redirect;