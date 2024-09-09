import React from 'react'
import notFoundImg from '../../Assets/images/not-found-img.jpg'

export default function NotFound() {
  return <>
    <div className="w-100 d-flex align-items-center justify-content-center">
    <div className="w-50">
        <picture>
            <img src={notFoundImg} alt="notFoundImg" className='w-100' />
        </picture>
    </div>  
    </div>
  </>
}
