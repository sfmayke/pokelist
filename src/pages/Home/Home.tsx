import { Container } from '../../components/ui';
import useGetAllPokemons from '../../services/swr';
import './Home.scss';

function Home() {

  const { pokemonData, error } = useGetAllPokemons();

  // const { data, error } = useSWR("https://api.pokemontcg.io/v2/cards?pageSize=3&page=1", fetcher)
  console.log(pokemonData);
  // if (error) return <div>falhou ao carregar</div>
  // if (!data) return <div>carregando...</div>

  return (
    <div className="App">
      <Container>
        <div className="App__container">
          {pokemonData && pokemonData.data.map((pokemon: any) => (
            <img key={pokemon.id} src={pokemon.images.small} alt="pokemon" />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
