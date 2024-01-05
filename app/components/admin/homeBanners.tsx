'use client'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { getBanners } from '@/apis/admin';

const HomeBanners = () => {
    const [banners,setBanners] = useState([])

    useEffect(()=>{
        const fetchData = async()=>{
            const res =  await getBanners()
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

    return (
        <div className="overflow-hidden">
            <Slider {...settings}>
                {banners.map((banner,index)=>(
                    <div className="" key={index}>
                        <Image width={1524} height={563} src={banner} alt="banner" />
                    </div>
                ))}
                
            </Slider>
        </div>
    )
}

export default HomeBanners
