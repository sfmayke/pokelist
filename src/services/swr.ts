import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

interface Params {
  name?: string;
}

const fetcher = async (args: any): Promise<any> => {
  const response = await fetch(args);
  return await response.json();
};

const PAGE_SIZE = 16;

export default function useGetPokemons(props?: Params) {
  let params = "";
  if(props) {
    params += "&q=";
    for (const [key, value] of Object.entries(props)) {
      params += `${key}:${value as string}`;
    }
  }

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `https://api.pokemontcg.io/v2/cards?page=${index + 1}&pageSize=${PAGE_SIZE}&orderBy=name${params}`
    , fetcher, {revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false});

  return {
    pokemonData: data,
    loading: !error && !data,
    error,
    setSize,
    size,
    isValidating
  };
}

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
