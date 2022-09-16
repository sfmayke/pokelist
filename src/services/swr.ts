import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

const fetcher = async (args: any): Promise<any> => {
  const response = await fetch(args);
  return await response.json();
};

const PAGE_SIZE = 16;

export default function useGetAllPokemons() {
  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `https://api.pokemontcg.io/v2/cards?page=${index + 1}&pageSize=${PAGE_SIZE}`
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
