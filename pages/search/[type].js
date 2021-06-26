import React from 'react';
import SearchResult from '@component/content/Search_Result';

export default function SearchPage({ query }) {
  return <SearchResult query={query} />;
}

export async function getServerSideProps(context) {
  const { query } = context;
  return {
    props: {
      query,
    },
  };
}
