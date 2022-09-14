import { Link } from "react-router-dom";
import { Card, Container } from "../../components/ui";
import { Pokemon } from "../../components/ui/Card/Card";
import useGetAllPokemons from "../../services/swr";
import "./Home.scss";

function Home() {
  const { pokemonData } = useGetAllPokemons();

  // const { data, error } = useSWR("https://api.pokemontcg.io/v2/cards?pageSize=3&page=1", fetcher)
  console.log(pokemonData);
  // if (error) return <div>falhou ao carregar</div>
  // if (!data) return <div>carregando...</div>

  return (
    <Container>
      <div className="home-root">
        {pokemonData?.data.map((pokemon: Pokemon) => (
          <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
            <Card key={pokemon.id} pokemon={pokemon} />
          </Link>
        ))}
      </div>
    </Container>
  );
}

export default Home;
