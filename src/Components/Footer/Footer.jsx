import React from 'react'

export default function Footer() {
  return <>
        <footer className='w-100 p-5 pb-3 bg-body-tertiary'>
            <h2 className='h5 fw-bold '>Get the Fresh Cart APP NOW!</h2>

            <p className='text-muted'>we will send you a link open it on your phone to downlaod it.</p>

            <div className='row justify-content-between px-2 '>
                <div className="col-md-10">
                    <input type="email" placeholder='Email...' className='form-control' />
                </div>

                <div className="col-md-2">
                    <button className='btn bg-main text-light px-4'>Share App Link</button>
                </div>
            </div>

            <div className='d-flex justify-content-between px-1 py-3 align-items-center '>
                    <div className="d-flex align-items-center ">
                        <p className='m-0'>Payment Printers</p>
                        <div>
                            <i className='fab mx-2 fa-amazon fs-4 text-main cursor-pointer'></i>
                            <i className='fab mx-2 fa-paypal fs-4 text-main cursor-pointer'></i>
                        </div>
                    </div>

                    <div className="d-flex align-items-center">
                        <p className='m-0'>Get Deliveries With Fresh Cart</p>
                        <div>
                            <i className='fab mx-2 fa-apple fs-4 text-main cursor-pointer'></i>
                            <i className='fab mx-2 fa-google-play fs-4 text-main cursor-pointer'></i>
                        </div>
                    </div>
            </div>

        </footer>
  </>
}
