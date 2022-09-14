import useSWR from 'swr';

const fetcher = async(args: any) => await fetch(args).then(res => res.json());

export default function useGetAllPokemons () {
  const { data, error } = useSWR('https://api.pokemontcg.io/v2/cards?pageSize=20&page=1', fetcher);

  return {
    pokemonData: data,
    loading: !error && !data,
    error: error
  }
}

export function useCheckPokemonID(id: string) {
  const { data, error } = useSWR(`https://api.pokemontcg.io/v2/cards/${id}`, fetcher);

  return {
    pokemonData: data,
    loading: !error && !data,
    error: error
  }
}