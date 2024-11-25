import React, { useEffect, useState } from 'react'
import './RelatedProducts.css';
import Item from '../Item/Item';

const RelatedProducts = () => {
  const [related,setRelated] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:3000/relatedproducts')
    .then((response)=>response.json()).then((data)=>setRelated(data));
  },[])
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr></hr>
      <div className="relatedproducts-item">
        {related.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default RelatedProducts

