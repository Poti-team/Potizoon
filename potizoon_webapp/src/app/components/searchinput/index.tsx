import React, { useState, useRef } from 'react';
import Image from 'next/image';

import styles from './searchinput.module.css';

import bussIcon from './buss.png';
import arrowLeftIcon from './arrow-left.svg';
import marker from './red_marker.png';
import pickOnMapIcon from './pick_on_map.svg';

const SearchInput = ({ onInputChange }: { onInputChange: (value: string) => void }) => {
  const [inputValue, setInputValue] = useState('');
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // State to manage focus
  const [icon, setIcon] = useState(bussIcon);
  
  const inputRef = useRef(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onInputChange(event.target.value);
  };

  const handleFocus = () => {
    setIsOverlayVisible(true);
    setIsFocused(true); // Update focus state
    setIcon(arrowLeftIcon);
  };

  const handleHideOverlay = () => {
    setIsOverlayVisible(false);
    setIcon(bussIcon);
    setIsFocused(false); // Update focus state
  };



  return (
    
    <div className={`${styles['search-container']} ${isFocused ? styles['expanded'] : ''}`}>
      <div className={styles['icone-bussola-container']} onClick={isOverlayVisible ? handleHideOverlay : undefined}>
        <Image src={icon} alt="Ícone de bússola" />
      </div>
      <input
        ref={inputRef}
        type="text"
        id="search"
        placeholder="Digite um lugar"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
    
      />
      {isOverlayVisible && (
        <div className={styles['autocomplete-overlay']}>

          <div id='escolher-no-mapa' className={styles['searchItem']}>
            <Image src={pickOnMapIcon} alt="Ícone de escolher no mapa" className={styles['imagem']}/>
            <span>Escolher no mapa</span>  
          </div>

          <div className='map_search_history'>
            <div id={styles['recentes']}>
              <span>Recentes</span>
            </div>

            <div className={styles['searchItem']}>
              <Image src={marker} alt="Ícone de marcador" className={styles['imagem']}/>
              <span>Natal, RN</span>
            </div>

            <div className={styles['searchItem']}>
              <Image src={marker} alt="Ícone de marcador" className={styles['imagem']}/>
              <span>São José dos Campos, SP</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default SearchInput;