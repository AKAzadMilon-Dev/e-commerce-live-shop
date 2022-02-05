import React from 'react';
import { useParams } from "react-router-dom";

const ProductDetails = () => {
    let params = useParams();
  return (
    <>
      {params.slug}
    </>
  )
}

export default ProductDetails
