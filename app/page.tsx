'use client'
import Navbar from "./components/user/navbar"
import Image from "next/image"
import banner from '../public/dineVoyageBanner.png'
import OfferCard from "./components/user/offerCard"
import HotelCard from "./components/user/hotelCard"
import { Toaster } from "react-hot-toast"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {

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
        <>
            <div><Toaster/></div>
            <header>
                <Navbar />
            </header>
            <main className="pt-16">
                <div className="overflow-hidden">
                    <Slider {...settings}>
                        <div className="">
                            <Image priority={false} src={banner} alt="banner" />
                        </div>
                        <div className="">
                            <Image priority={false} src={banner} alt="banner" />
                        </div>
                    </Slider>
                </div>
                
                <div className="flex justify-center py-16 px-4 items-center container mx-auto">
                    <div style={{ width: '50rem' }}>
                        <div>
                            <h1 className="text-xl md:text-3xl font-bold py-2 text-center" style={{ color: '#94A911' }}>Indulge your cravings with peace of mind! </h1>
                            <div className="flex bg-white border-2 rounded-md">
                                <input placeholder="Search for  Restaurants, Locations " className="w-full border-gray-300  focus:outline-none p-3" type="text" />
                                <button className="px-4 m-2 text-white font-bold rounded-md" style={{ backgroundColor: "#247F9E" }}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center pt-4 pb-16 px-4 items-center container mx-auto">
                    <div className="flex justify-start flex-col" style={{ width: '50rem' }}>
                        <h3 className="text-lg font-bold pb-1">Offers For You</h3>
                        <div className="flex flex-wrap">
                            <OfferCard />
                            <OfferCard />
                        </div>
                    </div>
                </div>
                <div className="bg-white py-16 px-4 flex justify-center">
                    <div className="flex flex-col" style={{ width: '65rem' }}>
                        <h1 className="text-xl font-bold py-2">Restaurants Near You</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                            {/* <HotelCard />
                            <HotelCard />
                            <HotelCard /> */}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
