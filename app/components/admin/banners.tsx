'use client'
import { addBanner, deleteBanner, getBanners } from '@/apis/admin';
import React, { useEffect, useState } from 'react'
import Spinner from '../loadingPages/spinner';
import toast from 'react-hot-toast';

const Banners = () => {
    const [banners, setBanners] = useState([]);
    const [bannersForDelete, setBannersForDelete] = useState([]);
    const [banner,setBanner] =  useState('')
    const [bannerToUpload,setBannerToUpload] = useState([])
    const [loading,setLoading] = useState(false)


    useEffect(()=>{
        const fetchData = async() =>{
            const res = await getBanners()
            const banners = res?.data.data.banners
            setBanners(banners)
            setBannersForDelete(banners)
        }
        fetchData()
    },[])

  
    const handleImageUpload = (index, imageURL,file) => {
      // Update the banners array by replacing the old URL at the specified index
      setBanners((prevBanners) => {
        const newBanners = [...prevBanners];
        newBanners[index] = imageURL;
        return newBanners;
      });
      setBannerToUpload([...bannerToUpload,file])

      console.log(banners)
    };


    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const form = new FormData()
        form.append('image', bannerToUpload[0]);
        if(banners.length === bannersForDelete.length){
            return toast.error('Select a file to upload')
        }
        setLoading(true)
        
        const res = await addBanner(form)
        console.log(res)

        if(res?.data.data){
            setLoading(false)
            return toast.success('Banner uploaded succesfully')
        }
    }


    const deleteTheBanner = async(banner:string)=>{
        console.log(banner)
        const res = await deleteBanner(banner)
        console.log(res)
        if(res?.data.data){
            toast.success('Banner Deleted SuccessFully')
        }
    }
  
    return (
      <>
        <form onSubmit={handleSubmit} className='flex flex-wrap'>
          {[...Array(3)].map((_, index) => (
            <div key={index} className='w-full lg:w-1/2 xl:w-1/3 p-4'>
              {typeof banners[index] === 'string' ? (
                <>
                    <img src={banners[index]} alt='' className='w-full h-auto' />
                    {(bannersForDelete.includes(banners[index]) && bannersForDelete.length > 1) && <button className='py-2 px-3 bg-red-700 text-white font-bold rounded-sm mt-2' onClick={()=>deleteTheBanner(bannersForDelete[index])}>Delete</button>}
                </>  
                
              ) : (
                <div className='py-2 flex justify-center items-center'>
                  <label htmlFor={`banner${index}`} className='py-2 px-3 bg-gray-500 font-bold text-white rounded-sm'>
                    Banner
                  </label>
                  <input
                    type='file'
                    accept="image/*"
                    id={`banner${index}`}
                    name='image'
                    className='hidden'
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const imageURL = URL.createObjectURL(file);
                        handleImageUpload(index, imageURL,file);
                      }
                    }}
                  />
                </div>
              )}
            </div>
          ))}
          <div className='flex justify-center w-full'>
            <button type='submit' className='py-2 px-3 bg-cyan-900 text-white font-bold rounded-sm'>UPLOAD BANNER</button>
          </div>
        </form>
        {loading &&
            <Spinner/>
        }
      </>
    );
  };
  
  export default Banners;