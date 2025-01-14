import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import OurPolicy from '../components/OurPolicy'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ЗА'} text2={'НАС'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>Добре дошли в нашия онлайн магазин за авточасти! Ние сме екип от професионалисти, които се стремим да предложим на нашите клиенти най-висококачествените авточасти и аксесоари на пазара. Независимо дали търсите части за поддръжка на автомобила си, или се нуждаете от специфични компоненти за ремонт или подобрения, при нас ще намерите всичко, от което се нуждаете.</p>
              <p>Нашата мисия е да предоставим лесен и удобен начин за закупуване на авточасти с гарантирано качество и на конкурентни цени. Ние сътрудничим с водещи производители и доставчици.</p>
              <p>Пазаруването при нас е лесно, бързо и безопасно. С нашата подробна система за търсене и навигация, ще откриете нужната част за вашето превозно средство само с няколко клика. А ако имате въпроси или нужда от съвет, нашият екип за обслужване на клиенти е винаги на разположение да ви помогне.</p>
              <b className='text-gray-800'></b>
              <p>Заложете на качеството и надеждността с нас – вашият партньор за авточасти онлайн!</p>
          </div>
      </div>

      <NewsletterBox/>
      <OurPolicy/>
    </div>
  )
}

export default About
