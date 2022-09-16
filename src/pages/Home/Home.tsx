/* eslint-disable @typescript-eslint/no-misused-promises */
import { InView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { Card, Container } from "../../components/ui";
import { Pokemon } from "../../components/ui/Card/Card";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import useGetPokemons from "../../services/swr";
import "./Home.scss";

function Home() {
  const { pokemonData, error, size, setSize } = useGetPokemons();

  const isLoadingInitialData = !pokemonData && !error;

  async function loadMore () {
    return await setSize(size + 1);
  }

  const PokeballSvg = () => (
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1324.2 1318.9">
      <path d="M803.3 109.4c5.5 1.3 11.2.8 16.7 1.2q33.2 2 66 7.3a644.7 644.7 0 0 1 90.9 21.4A663.1 663.1 0 0 1 1424 618a651.3 651.3 0 0 1 15 90.6c1.9 20.2 3.4 40.5 2.8 60.8-.7 24-1.8 47.8-4.5 71.6a659.2 659.2 0 0 1-176.6 380 658.8 658.8 0 0 1-224.4 155.7 645.6 645.6 0 0 1-125.6 38.7A659.2 659.2 0 0 1 822 1427a674 674 0 0 1-90-.3 659.3 659.3 0 0 1-382.4-157.2q-131.6-113.2-191.8-276a637 637 0 0 1-32.6-127.7c-6.3-42.4-9-85.1-6.7-128A662.3 662.3 0 0 1 641.3 124a676.6 676.6 0 0 1 92.2-13c7-.5 14.1-.7 21.2-1a26.5 26.5 0 0 0 2.9-.5Z" transform="translate(-117.7 -109.4)" fill="#383838"/>
      <path d="M1183.8 708.2H968.6c-2.3 0-3.6-.3-4.6-2.9-25.5-61.8-70.5-101.5-136-115.6-56-12-107.2.7-152.6 35.5a179.7 179.7 0 0 0-59 79.5c-1 2.6-2.1 3.6-5 3.6q-224.8-.2-449.5-.1c-5 0-5 0-4.5-5a575.6 575.6 0 0 1 12.9-75.7 626.8 626.8 0 0 1 490.2-470.9c19.2-3.7 38.4-6.4 57.8-8.2a620 620 0 0 1 68.4-3 670 670 0 0 1 67.3 4.3 615 615 0 0 1 130.6 29.9 627.8 627.8 0 0 1 382 372.8 613.5 613.5 0 0 1 30.7 114.5c2.1 12.6 3.5 25.3 5.4 37.9.5 3.3-1 3.5-3.6 3.5h-215.3Z" transform="translate(-117.7 -109.4)" fill="#ee3f3e"/>
      <path d="M390.8 850.6h227.5c2.5 0 3.7.6 4.7 2.8a186.4 186.4 0 0 0 169.5 104.5c38.4-.8 73.6-12 105-34.3a184.8 184.8 0 0 0 60-70.6 3.6 3.6 0 0 1 3.8-2.4h435.9c4 0 2.6 1.8 2.3 4a447 447 0 0 1-6.8 40 630.8 630.8 0 0 1-23.6 83.2 623 623 0 0 1-87.9 163.6 616.5 616.5 0 0 1-72.8 81.5 625.3 625.3 0 0 1-165.8 112 617.3 617.3 0 0 1-122 41.8 631.1 631.1 0 0 1-83.1 13.2 633.8 633.8 0 0 1-146.9-3.5A624 624 0 0 1 386.9 1254a623.9 623.9 0 0 1-73.9-70 624 624 0 0 1-125.7-214.4 595.5 595.5 0 0 1-22-82c-2.1-11.1-3.8-22.3-5.8-33.5-.5-2.6.2-3.5 3.1-3.5h228.2Z" transform="translate(-117.7 -109.4)" fill="#fdfcfc"/>
      <path d="M789.8 620.8A151 151 0 0 1 941 772.7a151 151 0 0 1-301.8-1.2 151 151 0 0 1 150.6-150.7Z" transform="translate(-117.7 -109.4)" fill="#fff"/>
    </svg>
  );

  const PokeballIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={PokeballSvg} {...props} />
  );

  return (
    <Container>
      <div className="home-root">
        <>
          {pokemonData?.map((dataArray) => 
            dataArray.data.map((pokemon: Pokemon) => (
              <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`} style={{textDecoration: "none", color: "inherit"}}>
                <Card key={pokemon.id} pokemon={pokemon} />
              </Link>
            ))
          )}
        </>
      </div>
      {!isLoadingInitialData && <InView 
        trackVisibility 
        delay={700} 
        onChange={ (inView) => inView && loadMore() } 
      >
        <div className="home-root__loading">
          <PokeballIcon />
          Loading
        </div>
      </InView>}
    </Container>
  );
}

export default Home;

