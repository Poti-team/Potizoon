'use client';
import React, { useState, useEffect , Suspense} from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';

const MapWithNoSSR = dynamic(() => import('../components/map'), { ssr: false });
const SearchInputWithNoSSR = dynamic(() => import('../components/searchinput'), { ssr: false });


function Page() {
  const [userInput, setUserInput] = useState('');
  const [isState, setIsState] = useState(false);
 
  console.log('Page Component Rendered');

  const handleInputChange = (input: string, isState: boolean) => {
    console.log(`handleInputChange called with input: ${input} and isState: ${isState}`);
    setUserInput(input);
    setIsState(isState);
  }

  const SearchParams = () => {
    console.log('SearchParams Component Rendered');
    const searchParams = useSearchParams();
    const uid = searchParams.get('uid');
    console.log(`UID from searchParams: ${uid}`);
    return (
        <div>
        <SearchInputWithNoSSR onInputChange={handleInputChange} uid={uid as string} />
        <MapWithNoSSR userInput={userInput} isState={isState} />
        </div>
    )
  }
  
  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Suspense fallback={<div>Loading...</div>}>
        <SearchParams />
      </Suspense>
    </div>
  );
}

export default Page;