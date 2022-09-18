/* eslint-disable @typescript-eslint/no-misused-promises */
import { InView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { Card, Container } from "../../components/ui";
import { Pokemon } from "../../components/ui/Card/Card";
import useGetPokemons from "../../services/swr";
import { useAppSelector } from "../../redux/hooks";
import PokeballIcon from "../../components/icons/Pokeball";
import "./Home.scss";

function Home() {
  const searchTerm = useAppSelector((state) => state.search.searchTerm);
  const { data: pokemons, error, size, setSize } = useGetPokemons({name: searchTerm});
  const isLoadingInitialData = !pokemons && !error;

  async function loadMore () {
    return await setSize(size + 1);
  }

  console.log(pokemons);

  return (
    <Container>
      <div className="home-root">
        <>  
          {
            pokemons?.data.map((pokemon: Pokemon) => (
              <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`} style={{textDecoration: "none", color: "inherit"}}>
                <Card pokemon={pokemon} />
              </Link>
            ))
          }
        </>
      </div>
      <div className="home-root__loading">
      { pokemons?.count === 0 ?
        <div>
          <h1>NO POKEMON FOUND!</h1>
          <img src="./open-pokeball.png" alt="open-pokeball" loading="eager" />
        </div>
        :
        <InView 
          skip={isLoadingInitialData}
          trackVisibility 
          delay={700} 
          onChange={ (inView) => inView && loadMore() } 
        >
          <PokeballIcon />
          Loading
        </InView>
      }
      </div>
    </Container>
  );
}

export default Home;

