import './style.css'
import React, { useCallback, useRef,useState } from 'react';
import useFetch from './useFetch';
import Product from './item';


const ProductsList = () => {
    const [number, setNumber] = useState(1)
    const { loading, error, hasMore, products = [] } = useFetch(number)
 
    const observer = useRef()
    const lastCardRef = useCallback(node => { 
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            entries[0].target.classList.toggle('show', entries[0].isIntersecting)
            if (entries[0].isIntersecting && hasMore)  setNumber(p => p + 1)
        },{
    threshold: 0.2})
        if (node) observer.current.observe(node)
    },[loading ,hasMore])

    return (
        <div className='container'>
            <h1>List of exhibits</h1>
            {
                products.map((product, index) => {
                    if (products.length === index + 1) {
                        return (
                            <div ref={lastCardRef} key={product.id} className='card card-items'>
                                <Product {...product} />
                            </div>
                        )
                    } else {
                        return (
                            <div key={product.id} className='card card-items'>
                                <Product {...product} />
                            </div>
                        )
                    }
                })
            }
            
            {
                error ? `Error! Somthing goes wrong :/` : (loading && 'loading...')
            }

        </div>
        
    );
}

export default ProductsList;
