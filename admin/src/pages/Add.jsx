import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [serial_num, setSerialNum] = useState("")
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [compatibleModels, setCompatibleModels] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("serial_num", serial_num)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("compatibleModels", compatibleModels) 

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setCompatibleModels('')
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>СНИМКИ</p>

        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>ИМЕ</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>ОПИСАНИЕ</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

      <div>
        <p className='mb-2'>ПРОИЗВОДИТЕЛ</p>
        <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value=""></option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="Audi">Audi</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="BMW">BMW</option>
            <option value="Bosch">Bosch</option>
            <option value="Mann">Mann</option>
            <option value="Mahle">Mahle</option>
            <option value="NGK">NGK</option>
            <option value="Denso">Denso</option>
            <option value="Continental">Continental</option>
            <option value="Gates">Gates</option>
            <option value="Dayco">Dayco</option>
            <option value="Brembo">Brembo</option>
            <option value="Zimmermann">Zimmermann</option>
            <option value="TRW">TRW</option>
            <option value="Ferodo">Ferodo</option>
            <option value="KYB">KYB</option>
            <option value="Monroe">Monroe</option>
            <option value="SWAG">SWAG</option>
            <option value="Varta">Varta</option>
            <option value="Exide">Exide</option>
            <option value="Nissens">Nissens</option>
            <option value="HJS">HJS</option>
            <option value="MTS">MTS</option>
            <option value="Castrol">Castrol</option>
            <option value="Osram">Osram</option>
            <option value="Philips">Philips</option>
        </select>
      </div>

      <div>
          <p className='mb-2'>КАТЕГОРИЯ</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
          <option value=""></option>
            <option value="Engine">Engine</option>
            <option value="Transmission">Transmission</option>
            <option value="Brakes">Brakes</option>
            <option value="Suspension">Suspension</option>
            <option value="Exhaust">Exhaust</option>
            <option value="Fuel-System">Fuel-System</option>
            <option value="Cooling-System">Cooling-System</option>
            <option value="Air-Conditioning">Air-Conditioning</option>
            <option value="Electrical">Electrical</option>
            <option value="Lighting">Lighting</option>
            <option value="Wheels-And-Tires">Wheels-And-Tires</option>
            <option value="Interior">Interior</option>
            <option value="Exterior">Exterior</option>
            <option value="Filters">Filters</option>
            <option value="Batteries">Batteries</option>
            <option value="Ignition-System">Ignition-System</option>
            <option value="Clutch">Clutch</option>
            <option value="Steering">Steering</option>
            <option value="Body-Parts">Body-Parts</option>
            <option value="Engine-Oil">Engine-Oil</option>
            <option value="Belts-And-Hoses">Belts-And-Hoses</option>
            <option value="Tools-And-Equipment">Tools-And-Equipment</option>
            <option value="Sensors">Sensors</option>
            <option value="Accessories">Accessories</option>
            <option value="Performance-Parts">Performance-Parts</option>
          </select>
        </div>

        <div className='w-full'>
          <p className='mb-2'>СЕРИЕН НОМЕР</p>
          <input onChange={(e) => setSerialNum(e.target.value)} value={serial_num} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
        </div>

        <div>
          <p className='mb-2'>ЦЕНА</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='' />
        </div>

      </div>
      <div className='w-full'>
        <p className='mb-2'>СЪВМЕСТИМИ МОДЕЛИ</p>
        <textarea 
          onChange={(e) => setCompatibleModels(e.target.value)} 
          value={compatibleModels} 
          className='w-full max-w-[500px] px-3 py-2' 
          placeholder='Въведи модели, разделени със запетаи (напр. Model1,Model2,Model3)' 
        />
      </div>
      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">БЕСТСЕЛЪР?</label>
      </div>

      <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>ДОБАВИ</button>

    </form>
  )
}

export default Add