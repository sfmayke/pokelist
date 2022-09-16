import "./Card.scss";
import 'react-loading-skeleton/dist/skeleton.css'
import { useState } from 'react';
import Skeleton from "react-loading-skeleton";
import Tilt from 'react-parallax-tilt';

export interface Attacks {
  name: string,
  cost: [string],
  damage: string,
  convertedEnergyCost: number,
  text: string
}

export interface Weaknesses {
  type: string,
  value: number
}

export interface Resistances {
  type: string,
  value: number
}

export interface Pokemon {
  id: number;
  name: string;
  images: {
    small: string;
    large: string;
  };
  resistances: [Resistances],
  weaknesses: [Weaknesses]
  types: [string];
  attacks: [Attacks]
}

interface CardProps {
  pokemon: Pokemon;
}

export default function Card({ pokemon }: CardProps) {
  const [useSkeleton, setUseSkeleton] = useState<boolean>(true);

  return (
    <div className="card-root">
      <>
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
          <img src={pokemon.images.small} onLoad={() => setUseSkeleton(false)} alt="pokemon" />
        </Tilt>
        { useSkeleton ? <Skeleton /> : (
          <div className="card-root__box-info">
            <div>
              <span><b>Id:</b> {pokemon.id}</span><br/>
              <span><b>Nome:</b> {pokemon.name}</span>
            </div>
            <div>
              <span><b>Tipos</b></span><br/>
              <span>
                {pokemon.types.map((type) => type)}
              </span>
            </div>
          </div>
        )}
      </>
    </div>
  );
}
