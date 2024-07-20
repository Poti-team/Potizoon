'use client'
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import debounce from 'lodash/debounce';

import dados from '../../data/output.json';

import { getUserMapSearchHistory, updateUserMapSearchHistory } from '../../../utils/firebase/firebase.utils';

import styles from './searchinput.module.css';

import bussIcon from './buss.png';
import arrowLeftIcon from './arrow-left.svg';
import marker from './red_marker.svg';
import pickOnMapIcon from './pick_on_map.svg';

interface DadosItem {
  nome: string;
  estado: string;
  // Add other properties if necessary
  UF: {
    sigla: string;
    nome: string;
  };
}

const dadosTyped: DadosItem[] = dados.map((item) => ({
  nome: item.nome || item.UF.nome,
  // Set estado to null if nome is not present, otherwise use UF.nome
  estado: item.nome ? item.UF.nome : null,
  UF: {
    sigla: item.UF.sigla,
    nome: item.UF.nome,
  },
}));


interface SearchInputProps {
  onInputChange: (value: string, isState: boolean) => void;
  uid?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ onInputChange, uid }): React.ReactNode => {

  const fetchMapSearchHistory = async () => {
    console.log(`Fetching Map Search History for UID: ${uid}`);
    const history = await getUserMapSearchHistory(uid || '');
    console.log('Map Search History:', history);
    return history;
  };
  
  interface MapSearchHistoryItem {
    cidade?: string;
    estado?: string;
  }
  
  const [MapSearchHistory, setMapSearchHistory] = useState<MapSearchHistoryItem[]>([]);
  
  useEffect(() => {
    fetchMapSearchHistory().then((history) => {
      console.log('Map Search History Fetched:', history);
      setMapSearchHistory(history || []);
    });
  }, [uid]);

  const [inputValue, setInputValue] = useState('');
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // State to manage focus
  const [icon, setIcon] = useState(bussIcon);
  const [suggestions, setSuggestions] = useState<DadosItem[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<DadosItem | null>(null);
  
  useEffect(() => {
    if (selectedSuggestion) {
      // If it's a state, show only the state name
      if (selectedSuggestion.estado === null) {
        setInputValue(selectedSuggestion.UF.nome);
      } else {
        // If it's a city, show "City, State"
        setInputValue(`${selectedSuggestion.nome}, ${selectedSuggestion.UF.nome}`);
      }
    }
  }, [selectedSuggestion]);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useRef(debounce((value) => {
    const filteredSuggestions: DadosItem[] = dadosTyped.filter((item) =>
      (item.nome.toLowerCase().includes(value)) // Now item.nome is always defined, either as its own or as UF.nome
    ).slice(0, 10); // Limit to the first 10 suggestions
    setSuggestions(filteredSuggestions);
  }, 300)).current;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    console.log(`Input Changed: ${value}`);
    setInputValue(value);
    debouncedSearch(value);
  };

    //clicou em uma sugestão
    const handleSuggestionClick = (nome: string) => {
      console.log(`Suggestion Clicked: ${nome}`);
      const selectedItem = dadosTyped.find(item => item.nome === nome);
      if (!selectedItem) return;
      
      console.log(`Selected Item: ${JSON.stringify(selectedItem)}`);
      const isStateSelected = selectedItem.estado === null;
      setSelectedSuggestion(selectedItem);
      setInputValue(nome);
      setSuggestions([]);
      setIsFocused(false);
      setIsOverlayVisible(false);
      
      const newHistoryItem = { cidade: isStateSelected ? undefined : nome, estado: selectedItem.UF.nome };
      console.log(`New History Item: ${JSON.stringify(newHistoryItem)}`);
      const newMapSearchHistory = [...MapSearchHistory, newHistoryItem];
      setMapSearchHistory(newMapSearchHistory);
      
      if (uid) {
        console.log(`Updating User Map Search History for UID: ${uid}`);
        updateUserMapSearchHistory(uid, newMapSearchHistory);
      }
      
      onInputChange(nome, isStateSelected);

      console.log(`LOCAL_SELECIONADO: ${selectedSuggestion}`);//null
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

  const handleIconClick = () => {
    if (isOverlayVisible) {
      handleHideOverlay();
    } else {
      setIsOverlayVisible(true); // Show the overlay if it's not already visible
      inputRef.current?.focus(); // Optionally focus the input
    }
  };
    
  
return (
    
    <div className={`${styles['search-container']} ${isFocused ? styles['expanded'] : ''}`}>

      <div className={`${styles['top-menu-search']} ${isFocused ? styles['expanded'] : ''}`}>
      <div className={`${styles['icone-bussola-container']} ${isFocused ? styles['expanded'] : ''}`} onClick={handleIconClick}>
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
      </div>

      {isOverlayVisible && (
        <div className={styles['autocomplete-overlay']}>

          <div id='escolher-no-mapa' className={styles['searchItem']}>
            <Image src={pickOnMapIcon} alt="Ícone de escolher no mapa" className={styles['imagem']}/>
            <span>Escolher no mapa</span>  
          </div>

          <div className={styles['map_search_options']}>
            <div className={styles['map_search_history']}>
              <div id={styles['recentes']}>
                <span>Recentes</span>
              </div>

               {MapSearchHistory.map((item: MapSearchHistoryItem, index: number) => (
                <div key={index} className={styles['searchItem']}>
                  <Image src={marker} alt="Ícone de marcador" className={styles['marker-icon']}/>
                  <div className={styles['searchItemTextContainer']}>
                    {item.cidade && <span className={styles['cidade']}>{item.cidade}</span>}
                    {item.estado && <span className={styles['estado']}>{item.estado}</span>}
                  </div>
                </div>
              ))}         

            </div>

            <div id={styles['autocomplete-suggestions']}>

            {suggestions.map((item, index) => (
              <div key={index} className={styles['searchItem']} onClick={() => handleSuggestionClick(item.nome)}>
              <Image src={marker} alt="Ícone de marcador" className={styles['marker-icon']}/>
              <div className={styles['searchItemTextContainer']}>
              {/* Display nome if available, otherwise display UF.nome */}
              <span className={styles['cidade']}>{item.nome || item.UF.nome}</span>
              {/* Conditionally render estado if available */}
              {item.estado && <span className={styles['estado']}>{item.estado}</span>}
          </div>
      </div>
      ))};

            </div>
          </div>

                             
        </div>
      )}

      
    </div>
  );

};
export default SearchInput;