import {useEffect, useState} from "react";

interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export function useFetch<T>(url: string): UseFetchResult<T> {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isActive = true;
        setLoading(true);
        setError(null);

        fetch(url)
            .then((res) => res.json())
            .then((json) => {
                if (isActive) setData(json);
            })
            .catch((err) => {
                if (isActive) setError(err.message);
            })
            .finally(() => {
                if (isActive) setLoading(false);
            });

        return () => {
            isActive = false;
        };
    }, [url]);

    return { data, error, loading };

}
