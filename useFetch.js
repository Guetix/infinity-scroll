import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (number) => {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel;
        axios.get(`https://fakestoreapi.com/products/${number}`,{
            axiosToken:new axios.CancelToken(c=> cancel = c)
        })
            .then(res => {
                setLoading(false)
                if (!res.data){
                    setHasMore(false)
                }else{
                    setHasMore(true)
                    setProducts(prevProducts => [...prevProducts , res.data])
                }
            }).catch(() => {
                setError(true)
            })
            return ()=> cancel()
    }, [number])
    return { loading, error, hasMore, products }
}

export default useFetch;
