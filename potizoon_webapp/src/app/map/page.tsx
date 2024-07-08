'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

const MapWithNoSSR = dynamic(() => import('../components/map'), { ssr: false });
const SearchInputWithNoSSR = dynamic(() => import('../components/searchinput'), { ssr: false });

function Page() {
  const [userInput, setUserInput] = useState('');
  const [uid, setUid] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    // This ensures we only read from the router after the component has mounted and the router is ready.
    if (router.isReady) {
      const queryUid = router.query.uid as string;
      setUid(queryUid);
    }
  }, [router.isReady, router.query.uid]);

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
      <SearchInputWithNoSSR onInputChange={handleInputChange} uid={uid as string} />
      <MapWithNoSSR userInput={userInput} />
    </div>
  );
}

export default Page;