'use client'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { getBanners } from '@/apis/admin';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const HomeBanners = () => {
    const [banners,setBanners] = useState([])

    useEffect(()=>{
        const fetchData = async()=>{
            const res =  await getBanners()
            // console.log(res?.data.data.banners)
            const banners = res?.data.data.banners
            setBanners(banners)
        }
        fetchData()
    },[])

    const settings = {
        dots: true,
        infinite: true, // Enables infinite looping
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Enables automatic sliding
        autoplaySpeed: 4000, // Adjust the speed as needed
    };

    console.log('tgis',banners)

    if(banners.length == 0){
        return (
        <div className="overflow-hidden m-3 sm:m-8 rounded-3xl">
            <Skeleton height={500}/>
        </div>
        )
    }

    return (
        <div className="overflow-hidden m-3 sm:m-8 rounded-3xl">
            <Slider {...settings}>
                {banners.map((banner,index)=>(
                    <div className="" key={index}>
                        <Image width={1524} height={563} src={banner} alt="banner" className='overflow-hidden'/>
                    </div>
                ))}
                
            </Slider>
        </div>
    )
}

export default HomeBanners
