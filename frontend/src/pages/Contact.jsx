import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 border-t'>
          <Title text1={'СВЪРЖИ СЕ С'} text2={'НАС'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <div className='flex flex-col justify-center items-start gap-6'>
          <li><a href="tel:+359899179294">+359 899 179 294</a></li>
          <li><a href="mailto:diplomnadvma@gmail.com">diplomnadvma@gmail.com</a></li>
        </div>
        <div className='flex flex-col justify-center items-start gap-6'>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1313.6572893875068!2d24.73334483049895!3d42.34122530094655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a9dbae9e0142e9%3A0x2c2e6508d564d5fc!2zRHJha29uIFJhY2V0cmFjayAvINCf0LjRgdGC0LAg0JTRgNCw0LrQvtC9!5e0!3m2!1sen!2sbg!4v1736827329317!5m2!1sen!2sbg" 
            style={{
              border: '1px solid black',
              width: '100%', 
              height: '450px' 
            }} 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default Contact
