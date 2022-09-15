import "./Card.scss";

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
  return (
    <div className="card-root">
      <img src={pokemon.images.small} alt="pokemon" />
      <div className="card-root__box-info">
        <span>Id</span>
        {pokemon.id}
        <span>Nome</span>
        {pokemon.name}
        <span>Tipos</span>
        {pokemon.types.map((type) => type)}
      </div>
    </div>
  );
}
