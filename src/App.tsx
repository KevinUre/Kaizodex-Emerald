import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import Pokemon from './Pokemon/Pokemon';
import Abilities from './Abilities/Abilities';
import Moves from './Moves/Moves';
import Locations from './Locations/Locations';
import Types from './Types/Types';
import Natures from './Natures/Natures';
import Coverage from './Coverage/Coverage';
import MoveSetSelector from './MoveSetSelector/MoveSetSelector';
import Data from './DataContext';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { GetSafeName } from './helpers';
import { styled, alpha } from '@mui/material/styles';

// https://reactrouter.com/web/guides/quick-start

interface SearchData {
  SearchType: string,
  Name: string
}

function getSearch() {
  var searchItems:SearchData[] = []
  const pokemon:SearchData[] = Data.Pokemon.map((pokemon) => {
    return {
      SearchType: 'Pokemon',
      Name: pokemon.Name
    }
  })
  const moves:SearchData[] = Data.Moves.map((move) => {
    return {
      SearchType: 'Move',
      Name: move.Name
    }
  })
  const locations:SearchData[] = Data.Locations.map((loc) => {
    return {
      SearchType: 'Location',
      Name: loc.Location
    }
  })
  const abilities:SearchData[] = Data.Abilities.map((ability) => {
    return {
      SearchType: 'Ability',
      Name: ability.Name
    }
  })
  searchItems = searchItems.concat(pokemon)
  searchItems = searchItems.concat(moves)
  searchItems = searchItems.concat(locations)
  searchItems = searchItems.concat(abilities)
  return searchItems
}

function getSearchLink(item:SearchData): string {
  if(!item) { return '/' }
  switch(item.SearchType) {
    case 'Pokemon':
      return `/pokemon/${GetSafeName(item.Name)}`
    case 'Move':
      return `/moves/${GetSafeName(item.Name)}`
    case 'Location':
      return `/locations/${GetSafeName(item.Name)}`
    case 'Ability':
      return `/abilities/${GetSafeName(item.Name)}`
  }
  return '/'
}

function App() {
  const [search, setSearch] = useState<SearchData>();

  return (
    <BrowserRouter>
      <div>
        <nav className="Nav-bar">
          <Link className="Navbar-Link Home-Button" to="/">Kaizodex Emerald</Link>
          <Link className="Navbar-Link" to="/types">Types</Link>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            size="small"
            options={getSearch()}
            //@ts-ignore
            getOptionLabel={(i) => i.Name}
            //@ts-ignore
            onChange={(event,value) => {setSearch(value)}}
            sx={{ width: 260 }}
            style={{marginLeft: '1rem', borderColor:'white'}}
            renderInput={(params) => {
              return (
                <div style={{display: 'flex', flexDirection:'row', alignContent: 'center'}}>
                  <TextField {...params} label={`Search`}/>
                  {/* @ts-ignore */}
                  <Link style={{textDecoration: 'none', color: 'white'}} to={`${getSearchLink(search)}`}>
                    <IconButton size="medium" color="inherit" onClick={()=>{ /* figure out how to clear search box */ }}>
                      <SearchIcon />
                    </IconButton>
                  </Link>
                </div>
              ) 
            }}
          />
        </nav>
        <div className="Main">
          <Switch>
            <Route path="/pokemon">
              <Pokemon />
            </Route>
            <Route path="/locations">
              <Locations/>
            </Route>
            <Route path="/moves">
              <Moves />
            </Route>
            <Route path="/types">
              <Types />
            </Route>
            <Route path="/abilities">
              <Abilities />
            </Route>
            <Route path="/natures">
              <Natures />
            </Route>
            <Route path="/coverage">
              <Coverage />
            </Route>
            <Route path="/moveSetSelector">
              <MoveSetSelector />
            </Route>
            <Route path="/">
              <div style={{display: 'flex', flexDirection:'column', width:'fit-content'}}>
                <Link className="Main-Link" to="/pokemon">Pokemon</Link>
                <Link className="Main-Link" to="/locations">Locations</Link>
                <Link className="Main-Link" to="/moves">Moves</Link>
                <Link className="Main-Link" to="/types">Types</Link>
                <Link className="Main-Link" to="/abilities">Abilities</Link>
                <Link className="Main-Link" to="/natures">Natures</Link>
                <Link className="Main-Link" to="/coverage">Coverage</Link>
                <Link className="Main-Link" to="/moveSetSelector">Move Selector</Link>
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;