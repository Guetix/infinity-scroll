import React from 'react';

const Product = ({ id, title, price, description, image }) => {
    return (
        <>
            <div className="image-wrapper">
                <img src={image} className='card-image' alt='' />
            </div>
            <div className='info info-items'>
                <h2>{title}</h2>
                <div><span className='detail-title' >price:</span> {price}$</div >
                <p><span className='detail-title' >description: </span>{description}</p>
            </div>
        </>
    );
}

export default Product;
