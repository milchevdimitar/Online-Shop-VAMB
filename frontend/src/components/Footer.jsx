import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>СВЪРЖИ СЕ С НАС</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
              <li><a href="tel:+359899179294">+359 899 179 294</a></li>
              <li><a href="mailto:diplomnadvma@gmail.com">diplomnadvma@gmail.com</a></li>
            </ul>
        </div>

      </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>VAMB™ - Всички права запазени.</p>
        </div>

    </div>
  )
}

export default Footer
