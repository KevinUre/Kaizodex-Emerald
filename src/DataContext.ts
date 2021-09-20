import React from 'react';
import pokemon from './data/Pokemon.json'
import locations from './data/Locations.json'
import moves from './data/Moves.json'
import abilities from './data/Abilities.json'
import types from './data/Types.json'
import natures from './data/Natures.json'

const Data = {
    Pokemon: pokemon,
    Locations: locations,
    Moves: moves,
    Abilities: abilities,
    Types: types,
    Natures: natures,
};

export default Data;

export interface LearnedMove {
  Move: string,
  Level: string
}

export interface Pokemon{
  Name: string,
  Number: string,
  Stats: {
    HP: string,
    Attack: string,
    Defense: string,
    SpecialAttack: string,
    SpecialDefense: string,
    Speed: string
  },
  Types: string[],
  Abilities: string[],
  Moves: LearnedMove[],
  EvolvesFrom?: {
    From: string,
    Level?: string,
    Stone?: string,
    Friendship?: string,
    Beauty?: string,
    Trade?: boolean,
  }
  EvolvesInto?: {
    Into: string,
    Level?: string,
    Stone?: string,
    Friendship?: string,
    Beauty?: string,
    Trade?: boolean,
  }[]
  FoundAt?: {
    Location: string,
    Type: string,
    Frequency: string,
  }[]
}

export interface Move {
  Name: string,
  Type: string,
  Category: string,
  Power: string,
  Accuracy: string,
  PP: string,
  Description: string,
  Targets: string,
}

export interface Type {
  Type: string,
  normal: number,
  fire: number,
  water: number,
  electric: number,
  grass: number,
  ice: number,
  fighting: number,
  poison: number,
  ground: number,
  flying: number,
  psychic: number,
  bug: number,
  rock: number,
  ghost: number,
  dragon: number,
  dark: number,
  steel: number
}
