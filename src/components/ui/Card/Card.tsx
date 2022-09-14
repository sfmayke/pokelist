import './Card.scss';

// type Weaknesses = {
//   type: string,
//   value: number
// }

// type Resistances = {
//   type: string,
//   value: number
// }

type Pokemon = {
  id: number,
  name: string
  images: {
    small: string
  },
  // resistances: [Resistances],
  // weaknesses: [Weaknesses]
  types: [string]
}

interface CardProps {
  pokemon: Pokemon
}

export default function Card({ pokemon }: CardProps) {
  return(
    <div className="card-root">
      <img  src={pokemon.images.small} alt="pokemon" />
      <div className="card-root__box-info">
        <span>Id</span>
        {pokemon.id}
        <span>Nome</span>
        {pokemon.name}
        <span>Tipos</span>
        {
          pokemon.types.map((type) => 
            type
          )
        }
      </div>
    </div>
  );
}