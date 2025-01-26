import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products , search , showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent')

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
        setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }

  }

  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();
  
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.compatibleModels.some(model => model.toLowerCase().includes(search.toLowerCase()))
      )
    }
  
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
  
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }
  
    setFilterProducts(productsCopy);
  }
  

  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }

  }

  useEffect(()=>{
      applyFilter();
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
        <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>ФИЛТРИ
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' :'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>КАТЕГОРИЯ</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Engine'} onChange={toggleSubCategory}/> Двигател
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Transmission'} onChange={toggleSubCategory}/> Трансмисия
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Brakes'} onChange={toggleSubCategory}/> Спирачки
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Suspension'} onChange={toggleSubCategory}/> Окачване
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Exhaust'} onChange={toggleSubCategory}/> Изпускателна система
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Fuel-System'} onChange={toggleSubCategory}/> Горивна система
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Cooling-System'} onChange={toggleSubCategory}/> Охладителна система
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Air-Conditioning'} onChange={toggleSubCategory}/> Климатици
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Electrical'} onChange={toggleSubCategory}/> Електрическа система
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Lighting'} onChange={toggleSubCategory}/> Осветление
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Wheels-And-Tires'} onChange={toggleSubCategory}/> Колела и гуми
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Interior'} onChange={toggleSubCategory}/> Интериор
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Exterior'} onChange={toggleSubCategory}/> Екстериор
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Filters'} onChange={toggleSubCategory}/> Филтри
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Batteries'} onChange={toggleSubCategory}/> Батерии
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Ignition-System'} onChange={toggleSubCategory}/> Запалителна система
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Clutch'} onChange={toggleSubCategory}/> Съединител
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Steering'} onChange={toggleSubCategory}/> Управление
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Body-Parts'} onChange={toggleSubCategory}/> Части на каросерията
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Engine-Oil'} onChange={toggleSubCategory}/> Масло за двигател
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Belts-And-Hoses'} onChange={toggleSubCategory}/> Колани и маркучи
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Tools-And-Equipment'} onChange={toggleSubCategory}/> Инструменти и оборудване
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Sensors'} onChange={toggleSubCategory}/> Сензори
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Accessories'} onChange={toggleSubCategory}/> Аксесоари
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Performance-Parts'} onChange={toggleSubCategory}/> Части за производителност
          </p>


          </div>
        </div>
        {}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' :'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>ПРОИЗВОДИТЕЛ</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Volkswagen'} onChange={toggleCategory}/> Volkswagen
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Audi'} onChange={toggleCategory}/> Audi
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Mercedes-Benz'} onChange={toggleCategory}/> Mercedes-Benz
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'BMW'} onChange={toggleCategory}/> BMW
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Bosch'} onChange={toggleCategory}/> Bosch
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Mann'} onChange={toggleCategory}/> Mann
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Mahle'} onChange={toggleCategory}/> Mahle
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'NGK'} onChange={toggleCategory}/> NGK
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Denso'} onChange={toggleCategory}/> Denso
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Continental'} onChange={toggleCategory}/> Continental
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Gates'} onChange={toggleCategory}/> Gates
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Dayco'} onChange={toggleCategory}/> Dayco
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Brembo'} onChange={toggleCategory}/> Brembo
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Zimmermann'} onChange={toggleCategory}/> Zimmermann
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'TRW'} onChange={toggleCategory}/> TRW
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Ferodo'} onChange={toggleCategory}/> Ferodo
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'KYB'} onChange={toggleCategory}/> KYB
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Monroe'} onChange={toggleCategory}/> Monroe
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'SWAG'} onChange={toggleCategory}/> SWAG
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Varta'} onChange={toggleCategory}/> Varta
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Exide'} onChange={toggleCategory}/> Exide
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Nissens'} onChange={toggleCategory}/> Nissens
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'HJS'} onChange={toggleCategory}/> HJS
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'MTS'} onChange={toggleCategory}/> MTS
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Castrol'} onChange={toggleCategory}/> Castrol
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Osram'} onChange={toggleCategory}/> Osram
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Philips'} onChange={toggleCategory}/> Philips
          </p>

          </div>
        </div>
        {}

      </div>

      {}
      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <Title text1={'ВСИЧКИ'} text2={'ПРОДУКТИ'} />
            {}
            <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
              <option value="relavent">Sort by: Relavent</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
        </div>

        {}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item,index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Collection
