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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SearchInputWithNoSSR onInputChange={handleInputChange} />
      <MapWithNoSSR userInput={userInput} />
    </div>
  );
}

export default Page;