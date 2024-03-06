import Navbar from "./components/user/navbar"
import OfferCard from "./components/user/offerCard"
import HotelCard from "./components/user/hotelCard"
import { Toaster } from "react-hot-toast"
import HomeBanners from "./components/admin/homeBanners"
import Search from "./components/user/search"
import PopularRestaurants from "./components/user/popularRestaurants"
import { useEffect, useState } from "react"
import { popularRestaurants } from "@/apis/user"
import Footer from "./components/user/Footer"


export default function Home() {


    return (
        <>
            <div><Toaster/></div>
            <header>
                <Navbar />
            </header>
            <main className="pt-16">
                <HomeBanners/>
                
                <Search/>
                {/* <div className="flex justify-center pt-4 pb-16 px-4 items-center container mx-auto">
                    <div className="flex justify-start flex-col" style={{ width: '50rem' }}>
                        <h3 className="text-lg font-bold pb-1">Offers For You</h3>
                        <div className="flex flex-wrap">
                            <OfferCard />
                            <OfferCard />
                        </div>
                    </div>
                </div> */}
                <PopularRestaurants/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    )
}
