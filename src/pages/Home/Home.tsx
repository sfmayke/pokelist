import { Link } from 'react-router-dom';
import { Card, Container } from '../../components/ui';
import useGetAllPokemons from '../../services/swr';
import './Home.scss';

function Home() {

  const { pokemonData, error } = useGetAllPokemons();

  // const { data, error } = useSWR("https://api.pokemontcg.io/v2/cards?pageSize=3&page=1", fetcher)
  console.log(pokemonData);
  // if (error) return <div>falhou ao carregar</div>
  // if (!data) return <div>carregando...</div>

  return (
    <Container>
      <div className="home-root">
        {pokemonData && pokemonData.data.map((pokemon: any) => (
          <Link to={`/pokemon/${pokemon.id}`}>
            <Card key={pokemon.id} pokemon={pokemon} />
          </Link>
        ))}
      </div>
    </Container>
  );
}

export default Home;
