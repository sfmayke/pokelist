import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { Pokemon } from '../components/ui/Card/Card';

interface Params {
  name: string;
}

const fetcher = async (args: any): Promise<any> => {
  const response = await fetch(args);
  return await response.json();
};

const PAGE_SIZE = 16;

export default function useGetPokemons({ name }: Params) {

  // TODO: Object interator in case multiple params where added in the future
  // 
  // let params = "";
  // if(props) {
  //   for (const [key, value] of Object.entries(props)) {
  //     if(key === "name") {
  //       params += "&q=";
  //       params += `${key}:${value as string}*`;
  //       break;
  //     }
  //     params += `${key}:${value as string}`;
  //   }
  // }

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `https://api.pokemontcg.io/v2/cards?page=${index + 1}&pageSize=${PAGE_SIZE}&q=name:${name}* supertype:pokemon&orderBy=name`
    , fetcher, {revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false});

  const dataFlatten: {count: number, data: [Pokemon] | []} = {
    count: 0,
    data: []
  };
  data?.map((data) => {
    dataFlatten.count += data.count as number;
    dataFlatten.data = dataFlatten.data.concat(data.data) as [Pokemon];
    return dataFlatten;
  });

  return {
    data: data && dataFlatten,
    loading: !error && !data,
    error,
    setSize,
    size,
    isValidating
  };
}

// Used to check if pokemon exist before entering it's detail page
export function useCheckPokemonID(id: string) {
  const { data, error } = useSWR(
    `https://api.pokemontcg.io/v2/cards/${id}`,
    fetcher
  );

  return {
    pokemonData: data,
    loading: !error && !data,
    error,
  };
}
