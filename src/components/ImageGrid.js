import React from 'react'
import useFirestore from '../hooks/useFiresotre'

const ImageGrid = () => {
  const { docs } = useFirestore("images");

  return (
    <div className='img-container'>
      {docs && docs.map(doc => (
        <div className='img-wrapper' key={doc.id}>
          <img src={doc.url} alt="img" />
        </div>
      ))}
    </div>
  )
}

export default ImageGrid