import { useState, useEffect } from "react";
import axios from "axios";
import { useStoreState, useStoreActions } from "easy-peasy";

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const setIsLoading= useStoreActions((actions) => actions.setIsLoading);
    const currentMonth = useStoreState((state) => state.currentMonth);
    const currentYear = useStoreState((state) => state.currentYear);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if(isMounted) {
                    setData(response.data);
                }
            } catch (err) {
                if(isMounted) {
                    setData([]);
                }
            } finally {
                isMounted && setIsLoading(false);
            }
        }

        fetchData(dataUrl);

        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    }, [dataUrl])

    return {data};
}

export default useAxiosFetch;