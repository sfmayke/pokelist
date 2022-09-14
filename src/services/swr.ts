import useSWR from "swr";

const fetcher = async (args: any): Promise<any> => {
  const response = await fetch(args);
  return await response.json();
};

export default function useGetAllPokemons() {
  const { data, error } = useSWR(
    "https://api.pokemontcg.io/v2/cards?pageSize=20&page=1",
    fetcher
  );

  return {
    pokemonData: data,
    loading: !error && !data,
    error,
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
