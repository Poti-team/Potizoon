
import React, { useState } from 'react';

import styles from './searchinput.module.css';

const SearchInput = ({ onInputChange }: { onInputChange: (value: string) => void }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onInputChange(event.target.value);
  };

  return (
    <div className={styles['search-container']}>
      <div className={styles['icone-bussola-container']}>
        <img src="./buss.png" alt="Ícone de bússola" />
      </div>
      <input
        type="text"
        id="search"
        placeholder="Digite um lugar"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchInput;