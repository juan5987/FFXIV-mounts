import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Mount from '../components/Mount';

import '../styles/app.scss';
import '../styles/_reset.css';

import logo from '../assets/images/logo.png';

const App = () => {

  const [mounts, setMounts] = useState([]);
  const [displayedMounts, setDisplayedMounts] = useState(mounts);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [extensionValue, setExtensionValue] = useState("all");



  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://xivapi.com/mount?limit=3000&Columns=ID,Name_fr,Description_fr,GamePatch.ExName,GamePatch.Version,Icon,Description_fr&pretty=1',
    })
    .then((response) => {
      const results = response.data.Results.filter(e => e.Description_fr && e.ID && e.Icon && e.Name_fr);
      return results;
    })
    .then((results) => {
      setMounts(results);
      setDisplayedMounts(results);
    })
    .catch((error) => {
      console.log(error);
    })
  }, [])

  useEffect(() => {    
    setDisplayedMounts(mounts);
    if(extensionValue === "all" && !searchInputValue){
      return mounts
    } else if(extensionValue !== "all" && !searchInputValue){
      setDisplayedMounts(mounts.filter(e => e.GamePatch.ExName === extensionValue));
    } else if(extensionValue === "all" && searchInputValue){
      setDisplayedMounts(mounts.filter(e => e.Name_fr.toUpperCase().includes(searchInputValue.toUpperCase())));
    } else if(extensionValue !== "all" && searchInputValue) {
      setDisplayedMounts(mounts.filter(e => e.GamePatch.ExName === extensionValue &&  e.Name_fr.toUpperCase().includes(searchInputValue.toUpperCase())));
    }
  }, [extensionValue, searchInputValue])

  return (
    <div className="app">
      <header className="header">
        <img onClick={() => window.location.reload(false)} className="header__logo" src={logo} />
        <h1 className="header__title">La référence pour collectionner vos montures sur Final Fantasy XIV</h1>
      </header>

      <div className="searchBar">
        <form onSubmit={(e) => e.preventDefault()}className="searchBar__form">
          <div className="searchBar__form__container">
            <h2 className="searchBar__form__container__title">Recherche par nom</h2>
            <input onChange={(e) => setSearchInputValue(e.target.value)} className="searchBar__form__container__textInput" type="text" placeholder="Nom de la monture" value={searchInputValue}/>
          </div>
          <div className="searchBar__form__container">
            <h2 className="searchBar__form__container__title">Filtre par extension</h2>
            <select onChange={(e) => setExtensionValue(e.target.value)} className="searchBar__form__container__select" name="extension" id="extension-select" value={extensionValue}>
              <option className="searchBar__form__container__select__option" value="all">Toutes les extensions</option>
              <option className="searchBar__form__container__select__option" value="A Realm Reborn">A Realm Reborn</option>
              <option className="searchBar__form__container__select__option" value="Heavensward">Heavensward</option>
              <option className="searchBar__form__container__select__option" value="Stormblood">Stormblood</option>
              <option className="searchBar__form__container__select__option" value="Shadowbringers">Shadowbringers</option>
              <option className="searchBar__form__container__select__option" value="Endwalker">Endwalker</option>
            </select>
          </div>
        </form>
      </div>

      <main className="main">
        <div className="mounts">
          {
            displayedMounts[0]
            ?
            displayedMounts.map(mount => (
              <Mount key={mount.ID} mount={mount} />
            ))
            :
            <p className='mounts__noResult'>Aucun résultat</p>
          }
        </div>
      </main>
    </div>
  );
}

export default App;
