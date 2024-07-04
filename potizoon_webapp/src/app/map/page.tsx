'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const MapWithNoSSR = dynamic(() => import('../components/map'), { ssr: false });
const SearchInputWithNoSSR = dynamic(() => import('../components/searchinput'), { ssr: false });

function Page() {
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (input: string) => {
    setUserInput(input);
  };

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SearchInputWithNoSSR onInputChange={handleInputChange} />
      <MapWithNoSSR userInput={userInput} />
    </div>
  );
}

export default Page;