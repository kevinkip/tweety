import useSWR from 'swr'

import fetcher from '@/libs/fetcher';

const useCurrentUser = () => {
    // this is what we just created in pages/api/current.ts
    const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);

    // SWR is going to fetch the /api/current using the axios.fetcher in fetcher.ts. The store it in its global store.

    // replacing our global state like redux
    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useCurrentUser;