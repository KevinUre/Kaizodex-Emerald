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
import { styled, alpha, createTheme, ThemeProvider } from '@mui/material/styles';

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

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fff',
      light: '#fff',
      dark: '#fff',
    }
  }
});

function CustomNav(props:any) {
  const [search, setSearch] = useState<SearchData>();
  const [navKey, resetNav] = useState<string>();

  const history = useHistory()
  console.log(`History: ${JSON.stringify((history))}`)

  function navigate(value:SearchData):void {
    (async()=>{setSearch(value)})();
    (async()=>{resetNav(value.Name)})();
    // @ts-ignore
    history.push(getSearchLink(value))
  }

  return (
    <nav className="Nav-bar">
      <Link className="Navbar-Link Home-Button" to="/">Kaizodex Emerald</Link>
      <Link className="Navbar-Link" to="/types">Types</Link>
      <ThemeProvider theme={darkTheme}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          size="small"
          options={getSearch()}
          //@ts-ignore
          getOptionLabel={(i) => i.Name}
          selectOnFocus={true}
          //@ts-ignore
          onChange={(event,value) => {navigate(value)}}
          key={navKey}
          sx={{ flexGrow: 1, minWidth: 260, maxWidth: 500 }}
          style={{marginLeft: '1rem', marginRight: '0.5rem', marginBottom: '0.468rem', alignSelf: 'end'}}
          renderInput={(params) => {
            return (
              <div style={{display: 'flex', flexDirection:'row', alignContent: 'center'}}>
                <TextField {...params} label={`Search`}/>
                {/* @ts-ignore */}
                <Link style={{textDecoration: 'none', color: 'white'}} to={`${getSearchLink(search)}`}>
                  <IconButton size="medium" color="inherit" onClick={()=>{(async()=>{resetNav(search?.Name)})()}}>
                    <SearchIcon />
                  </IconButton>
                </Link>
              </div>
            ) 
          }}
        />
      </ThemeProvider>
    </nav>
  )
}

export default CustomNav