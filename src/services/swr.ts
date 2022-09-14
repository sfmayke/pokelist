import useSWR from 'swr';

const fetchWithToken = async(...args: any) => await fetch({...args}).then(res => res.json());

export default function useGetAllPokemons () {
  const headerDict = {
    'X-Api-Key': '8df22d6b-da30-427f-9883-c7ef95d74589',
  }
  
  const requestOptions = {                                                                                                                                                                                 
    headers: new Headers(headerDict), 
  };

  const { data, error } = useSWR([`https://api.pokemontcg.io/v2/cards?pageSize=3&page=1`, requestOptions], fetchWithToken, { refreshInterval: 100000 })

  return {
    data: data,
    loading: !error && !data,
    error: error
  }
}
