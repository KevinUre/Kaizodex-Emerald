import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Data, { LearnedMove, Pokemon } from '../DataContext';
import { useState } from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { GetSafeName } from '../helpers';
import '../Types/Types.css';

function getMoves(pokemon:Pokemon):LearnedMove[] {
  if (!pokemon) { return [] }
  const pkmn = Data.Pokemon.find((p) => p.Name == pokemon.Name)
  if(!pkmn) {  return [] }
  return pkmn.Moves
}

function getPokemonTankEffectivenessForType(pokemon:Pokemon, type:string) {
  var aggregate = 1;
  pokemon.Types.forEach(defenderType => {
    const typeData = Data.Types.find(t => GetSafeName(t.Type) === GetSafeName(type))
    if (typeData) {
      //@ts-ignore
      aggregate *= typeData[GetSafeName(defenderType)]
    }
  })
  return aggregate * 100;
}

function getEffectivenessForMoveSetAgainstType(moveset:LearnedMove[], type:string) {
  if(moveset.length == 0) { return 100; }
  var best = 0;
  moveset.forEach( setMove => {
    const moveData = Data.Moves.find(m => m.Name == setMove.Move)
    if(moveData) {
      if(parseInt(moveData.Power) > 0) {
        const moveTypeData = Data.Types.find(t => GetSafeName(t.Type) === GetSafeName(moveData.Type))
        if(moveTypeData) {
          //@ts-ignore
          if (moveTypeData[GetSafeName(type)] > best) {
            //@ts-ignore
            best = moveTypeData[GetSafeName(type)]
          }
        }
      }
    }
  })
  return best * 100;
}

function getTableIcon(effectiveness:any) {
  switch(effectiveness) {
    case 0:
      return '0';
    case 25:
      return '¼';
    case 50:
      return '½';
    case 100:
      return '';
    case 200:
      return '2';
    case 400:
      return '4';
    default:
      return '';
  } 
}

function getTankTableColor(effectiveness:any) {
  switch(effectiveness) {
    case 0:
      return 0;
    case 25:
      return 400;
    case 50:
      return 200;
    case 100:
      return 100;
    case 200:
      return 50;
    case 400:
      return 25;
    default:
      return 100;
  } 
}

const pokemonSpacing = '2rem'
const tableSpacing = '2rem'
const moveSetSpacing = '0.5rem'

function Coverage() {
  const [pokemon1, setPokemonOne] = useState<any>();
  const [moveSet1, setMovesOne] = useState<any>();
  const [pokemon2, setPokemonTwo] = useState<any>();
  const [moveSet2, setMovesTwo] = useState<any>();
  const [pokemon3, setPokemonThree] = useState<any>();
  const [moveSet3, setMovesThree] = useState<any>();
  const [pokemon4, setPokemonFour] = useState<any>();
  const [moveSet4, setMovesFour] = useState<any>();
  const [pokemon5, setPokemonFive] = useState<any>();
  const [moveSet5, setMovesFive] = useState<any>();
  const [pokemon6, setPokemonSix] = useState<any>();
  const [moveSet6, setMovesSix] = useState<any>();

  return (
    <div style={{display:'flex', flexDirection: 'column'}}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={Data.Pokemon}
        getOptionLabel={(pokemon) => pokemon.Name}
        onChange={(event,value) => {setPokemonOne(value)}}
        sx={{ width: 160 }}
        renderInput={(params) => <TextField variant="standard" {...params} label="Pokemon 1" />}
      />
      { getMoves(pokemon1).length > 0 && 
        <Autocomplete
          multiple
          id="combo-box-demo"
          options={getMoves(pokemon1)}
          //@ts-ignore
          getOptionLabel={(move) => move.Move}
          onChange={(event,value) => {setMovesOne(value)}}
          sx={{ width: 750 }}
          style={{marginTop: moveSetSpacing}}
          renderInput={(params) => <TextField variant="standard" {...params} label="Pokemon 1's Moves" />}
        />
      }
      { pokemon1 && 
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={Data.Pokemon}
          getOptionLabel={(pokemon) => pokemon.Name}
          onChange={(event,value) => {setPokemonTwo(value)}}
          sx={{ width: 160 }}
          style={{marginTop: pokemonSpacing}}
          renderInput={(params) => <TextField variant="standard" {...params} label="Pokemon 2" />}
        />
      }
      { getMoves(pokemon2).length > 0 && 
        <Autocomplete
          multiple
          id="combo-box-demo"
          options={getMoves(pokemon2)}
          //@ts-ignore
          getOptionLabel={(move) => move.Move}
          onChange={(event,value) => {setMovesTwo(value)}}
          sx={{ width: 750 }}
          style={{marginTop: moveSetSpacing}}
          renderInput={(params) => <TextField variant="standard" {...params} label="Pokemon 2's Moves" />}
        />
      }
      { pokemon2 && 
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={Data.Pokemon}
          getOptionLabel={(pokemon) => pokemon.Name}
          onChange={(event,value) => {setPokemonThree(value)}}
          sx={{ width: 160 }}
          style={{marginTop: pokemonSpacing}}
          renderInput={(params) => <TextField variant="standard" {...params} label="Pokemon 3" />}
        />
      }
      { getMoves(pokemon3).length > 0 && 
        <Autocomplete
          multiple
          id="combo-box-demo"
          options={getMoves(pokemon3)}
          //@ts-ignore
          getOptionLabel={(move) => move.Move}
          onChange={(event,value) => {setMovesThree(value)}}
          sx={{ width: 750 }}
          style={{marginTop: moveSetSpacing}}
          renderInput={(params) => <TextField variant="standard" {...params} label="Pokemon 3's Moves" />}
        />
      }
      { pokemon3 && 
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={Data.Pokemon}
          getOptionLabel={(pokemon) => pokemon.Name}
          onChange={(event,value) => {setPokemonFour(value)}}
          sx={{ width: 160 }}
          style={{marginTop: pokemonSpacing}}
          renderInput={(params) => <TextField variant="standard" {...params} label="Pokemon 4" />}
        />
      }
      { getMoves(pokemon4).length > 0 && 
        <Autocomplete
          multiple
          id="combo-box-demo"
          options={getMoves(pokemon4)}
          //@ts-ignore
          getOptionLabel={(move) => move.Move}
          onChange={(event,value) => {setMovesFour(value)}}
          sx={{ width: 750 }}
          style={{marginTop: moveSetSpacing}}
          renderInput={(params) => <TextField variant="standard" {...params} label="Pokemon 4's Moves" />}
        />
      }
      { pokemon4 && 
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={Data.Pokemon}
          getOptionLabel={(pokemon) => pokemon.Name}
          onChange={(event,value) => {setPokemonFive(value)}}
          sx={{ width: 160 }}
          style={{marginTop: pokemonSpacing}}
          renderInput={(params) => <TextField variant="standard" {...params} label="Pokemon 5" />}
        />
      }
      { getMoves(pokemon5).length > 0 && 
        <Autocomplete
          multiple
          id="combo-box-demo"
          options={getMoves(pokemon5)}
          //@ts-ignore
          getOptionLabel={(move) => move.Move}
          onChange={(event,value) => {setMovesFive(value)}}
          sx={{ width: 750 }}
          style={{marginTop: moveSetSpacing}}
          renderInput={(params) => <TextField variant="standard" {...params} label="Pokemon 5's Moves" />}
        />
      }
      { pokemon5 && 
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={Data.Pokemon}
          getOptionLabel={(pokemon) => pokemon.Name}
          onChange={(event,value) => {setPokemonSix(value)}}
          sx={{ width: 160 }}
          style={{marginTop: pokemonSpacing}}
          renderInput={(params) => <TextField variant="standard" {...params} label="Pokemon 6" />}
        />
      }
      { getMoves(pokemon6).length > 0 && 
        <Autocomplete
          multiple
          id="combo-box-demo"
          options={getMoves(pokemon6)}
          //@ts-ignore
          getOptionLabel={(move) => move.Move}
          onChange={(event,value) => {setMovesSix(value)}}
          sx={{ width: 750 }}
          style={{marginTop: moveSetSpacing}}
          renderInput={(params) => <TextField variant="standard" {...params} label="Pokemon 6's Moves" />}
        />
      }
      <table className="type-table Type-Table" style={{marginTop: tableSpacing}}>
        <thead>
          <tr>
            <th className="">As an Defender</th>
            <th><Link className="type-icon type-normal type-cell type-abbr" to={`../types/${GetSafeName("normal")}`} title="Normal">Nor</Link></th>
            <th><Link className="type-icon type-fire type-cell type-abbr" to={`../types/${GetSafeName("fire")}`} title="Fire">Fir</Link></th>
            <th><Link className="type-icon type-water type-cell type-abbr" to={`../types/${GetSafeName("water")}`} title="Water">Wat</Link></th>
            <th><Link className="type-icon type-electric type-cell type-abbr" to={`../types/${GetSafeName("electric")}`} title="Electric">Ele</Link></th>
            <th><Link className="type-icon type-grass type-cell type-abbr" to={`../types/${GetSafeName("grass")}`} title="Grass">Gra</Link></th>
            <th><Link className="type-icon type-ice type-cell type-abbr" to={`../types/${GetSafeName("ice")}`} title="Ice">Ice</Link></th>
            <th><Link className="type-icon type-fighting type-cell type-abbr" to={`../types/${GetSafeName("fighting")}`} title="Fighting">Fig</Link></th>
            <th><Link className="type-icon type-poison type-cell type-abbr" to={`../types/${GetSafeName("poison")}`} title="Poison">Poi</Link></th>
            <th><Link className="type-icon type-ground type-cell type-abbr" to={`../types/${GetSafeName("ground")}`} title="Ground">Gro</Link></th>
            <th><Link className="type-icon type-flying type-cell type-abbr" to={`../types/${GetSafeName("flying")}`} title="Flying">Fly</Link></th>
            <th><Link className="type-icon type-psychic type-cell type-abbr" to={`../types/${GetSafeName("psychic")}`} title="Psychic">Psy</Link></th>
            <th><Link className="type-icon type-bug type-cell type-abbr" to={`../types/${GetSafeName("bug")}`} title="Bug">Bug</Link></th>
            <th><Link className="type-icon type-rock type-cell type-abbr" to={`../types/${GetSafeName("rock")}`} title="Rock">Roc</Link></th>
            <th><Link className="type-icon type-ghost type-cell type-abbr" to={`../types/${GetSafeName("ghost")}`} title="Ghost">Gho</Link></th>
            <th><Link className="type-icon type-dragon type-cell type-abbr" to={`../types/${GetSafeName("dragon")}`} title="Dragon">Dra</Link></th>
            <th><Link className="type-icon type-dark type-cell type-abbr" to={`../types/${GetSafeName("dark")}`} title="Dark">Dar</Link></th>
            <th><Link className="type-icon type-steel type-cell type-abbr" to={`../types/${GetSafeName("steel")}`} title="Steel">Ste</Link></th>
          </tr>
        </thead>
        <tbody>
          { pokemon1 && 
            <tr>
              <th><Link className="" to={`../pokemon/${GetSafeName(pokemon1.Name)}`}>{pokemon1.Name}</Link></th>
              {
                Data.Types.map((type) => {
                  const effectiveness = getPokemonTankEffectivenessForType(pokemon1,type.Type)
                  return (
                    <td className={`type-fx-cell type-fx-${getTankTableColor(effectiveness)}`}>{getTableIcon(effectiveness)}</td> 
                  )
                })
              }
            </tr>
          }
          { pokemon2 && 
            <tr>
              <th><Link className="" to={`../pokemon/${GetSafeName(pokemon2.Name)}`}>{pokemon2.Name}</Link></th>
              {
                Data.Types.map((type) => {
                  const effectiveness = getPokemonTankEffectivenessForType(pokemon2,type.Type)
                  return (
                    <td className={`type-fx-cell type-fx-${getTankTableColor(effectiveness)}`}>{getTableIcon(effectiveness)}</td> 
                  )
                })
              }
            </tr>
          }
          { pokemon3 && 
            <tr>
              <th><Link className="" to={`../pokemon/${GetSafeName(pokemon3.Name)}`}>{pokemon3.Name}</Link></th>
              {
                Data.Types.map((type) => {
                  const effectiveness = getPokemonTankEffectivenessForType(pokemon3,type.Type)
                  return (
                    <td className={`type-fx-cell type-fx-${getTankTableColor(effectiveness)}`}>{getTableIcon(effectiveness)}</td> 
                  )
                })
              }
            </tr>
          }
          { pokemon4 && 
            <tr>
              <th><Link className="" to={`../pokemon/${GetSafeName(pokemon4.Name)}`}>{pokemon4.Name}</Link></th>
              {
                Data.Types.map((type) => {
                  const effectiveness = getPokemonTankEffectivenessForType(pokemon4,type.Type)
                  return (
                    <td className={`type-fx-cell type-fx-${getTankTableColor(effectiveness)}`}>{getTableIcon(effectiveness)}</td> 
                  )
                })
              }
            </tr>
          }
          { pokemon5 && 
            <tr>
              <th><Link className="" to={`../pokemon/${GetSafeName(pokemon5.Name)}`}>{pokemon5.Name}</Link></th>
              {
                Data.Types.map((type) => {
                  const effectiveness = getPokemonTankEffectivenessForType(pokemon5,type.Type)
                  return (
                    <td className={`type-fx-cell type-fx-${getTankTableColor(effectiveness)}`}>{getTableIcon(effectiveness)}</td> 
                  )
                })
              }
            </tr>
          }
          { pokemon6 && 
            <tr>
              <th><Link className="" to={`../pokemon/${GetSafeName(pokemon6.Name)}`}>{pokemon6.Name}</Link></th>
              {
                Data.Types.map((type) => {
                  const effectiveness = getPokemonTankEffectivenessForType(pokemon6,type.Type)
                  return (
                    <td className={`type-fx-cell type-fx-${getTankTableColor(effectiveness)}`}>{getTableIcon(effectiveness)}</td> 
                  )
                })
              }
            </tr>
          }
        </tbody>
      </table>
      <table className="type-table Type-Table" style={{marginTop: tableSpacing}}>
        <thead>
          <tr>
            <th className="">As an Attacker</th>
            <th><Link className="type-icon type-normal type-cell type-abbr" to={`../types/${GetSafeName("normal")}`} title="Normal">Nor</Link></th>
            <th><Link className="type-icon type-fire type-cell type-abbr" to={`../types/${GetSafeName("fire")}`} title="Fire">Fir</Link></th>
            <th><Link className="type-icon type-water type-cell type-abbr" to={`../types/${GetSafeName("water")}`} title="Water">Wat</Link></th>
            <th><Link className="type-icon type-electric type-cell type-abbr" to={`../types/${GetSafeName("electric")}`} title="Electric">Ele</Link></th>
            <th><Link className="type-icon type-grass type-cell type-abbr" to={`../types/${GetSafeName("grass")}`} title="Grass">Gra</Link></th>
            <th><Link className="type-icon type-ice type-cell type-abbr" to={`../types/${GetSafeName("ice")}`} title="Ice">Ice</Link></th>
            <th><Link className="type-icon type-fighting type-cell type-abbr" to={`../types/${GetSafeName("fighting")}`} title="Fighting">Fig</Link></th>
            <th><Link className="type-icon type-poison type-cell type-abbr" to={`../types/${GetSafeName("poison")}`} title="Poison">Poi</Link></th>
            <th><Link className="type-icon type-ground type-cell type-abbr" to={`../types/${GetSafeName("ground")}`} title="Ground">Gro</Link></th>
            <th><Link className="type-icon type-flying type-cell type-abbr" to={`../types/${GetSafeName("flying")}`} title="Flying">Fly</Link></th>
            <th><Link className="type-icon type-psychic type-cell type-abbr" to={`../types/${GetSafeName("psychic")}`} title="Psychic">Psy</Link></th>
            <th><Link className="type-icon type-bug type-cell type-abbr" to={`../types/${GetSafeName("bug")}`} title="Bug">Bug</Link></th>
            <th><Link className="type-icon type-rock type-cell type-abbr" to={`../types/${GetSafeName("rock")}`} title="Rock">Roc</Link></th>
            <th><Link className="type-icon type-ghost type-cell type-abbr" to={`../types/${GetSafeName("ghost")}`} title="Ghost">Gho</Link></th>
            <th><Link className="type-icon type-dragon type-cell type-abbr" to={`../types/${GetSafeName("dragon")}`} title="Dragon">Dra</Link></th>
            <th><Link className="type-icon type-dark type-cell type-abbr" to={`../types/${GetSafeName("dark")}`} title="Dark">Dar</Link></th>
            <th><Link className="type-icon type-steel type-cell type-abbr" to={`../types/${GetSafeName("steel")}`} title="Steel">Ste</Link></th>
          </tr>
        </thead>
        <tbody>
          { pokemon1 && moveSet1 && moveSet1.length > 0 && 
            <tr>
              <th><Link className="" to={`../pokemon/${GetSafeName(pokemon1.Name)}`}>{pokemon1.Name}</Link></th>
              {
                Data.Types.map((type) => {
                  const effectiveness = getEffectivenessForMoveSetAgainstType(moveSet1,type.Type)
                  return (
                    <td className={`type-fx-cell type-fx-${effectiveness}`}>{getTableIcon(effectiveness)}</td> 
                  )
                })
              }
            </tr>
          }
          { pokemon2 && moveSet2 && moveSet2.length > 0 && 
            <tr>
              <th><Link className="" to={`../pokemon/${GetSafeName(pokemon2.Name)}`}>{pokemon2.Name}</Link></th>
              {
                Data.Types.map((type) => {
                  const effectiveness = getEffectivenessForMoveSetAgainstType(moveSet2,type.Type)
                  return (
                    <td className={`type-fx-cell type-fx-${effectiveness}`}>{getTableIcon(effectiveness)}</td> 
                  )
                })
              }
            </tr>
          }
          { pokemon3 && moveSet3 && moveSet3.length > 0 && 
            <tr>
              <th><Link className="" to={`../pokemon/${GetSafeName(pokemon3.Name)}`}>{pokemon3.Name}</Link></th>
              {
                Data.Types.map((type) => {
                  const effectiveness = getEffectivenessForMoveSetAgainstType(moveSet3,type.Type)
                  return (
                    <td className={`type-fx-cell type-fx-${effectiveness}`}>{getTableIcon(effectiveness)}</td> 
                  )
                })
              }
            </tr>
          }
          { pokemon4 && moveSet4 && moveSet4.length > 0 && 
            <tr>
              <th><Link className="" to={`../pokemon/${GetSafeName(pokemon4.Name)}`}>{pokemon4.Name}</Link></th>
              {
                Data.Types.map((type) => {
                  const effectiveness = getEffectivenessForMoveSetAgainstType(moveSet4,type.Type)
                  return (
                    <td className={`type-fx-cell type-fx-${effectiveness}`}>{getTableIcon(effectiveness)}</td> 
                  )
                })
              }
            </tr>
          }
          { pokemon5 && moveSet5 && moveSet5.length > 0 && 
            <tr>
              <th><Link className="" to={`../pokemon/${GetSafeName(pokemon5.Name)}`}>{pokemon5.Name}</Link></th>
              {
                Data.Types.map((type) => {
                  const effectiveness = getEffectivenessForMoveSetAgainstType(moveSet5,type.Type)
                  return (
                    <td className={`type-fx-cell type-fx-${effectiveness}`}>{getTableIcon(effectiveness)}</td> 
                  )
                })
              }
            </tr>
          }
          { pokemon6 && moveSet6 && moveSet6.length > 0 && 
            <tr>
              <th><Link className="" to={`../pokemon/${GetSafeName(pokemon6.Name)}`}>{pokemon6.Name}</Link></th>
              {
                Data.Types.map((type) => {
                  const effectiveness = getEffectivenessForMoveSetAgainstType(moveSet6,type.Type)
                  return (
                    <td className={`type-fx-cell type-fx-${effectiveness}`}>{getTableIcon(effectiveness)}</td> 
                  )
                })
              }
            </tr>
          }
        </tbody>
      </table>
      
    </div>
  )
}

export default Coverage
