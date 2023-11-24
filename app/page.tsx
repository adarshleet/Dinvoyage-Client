import Navbar from "./components/user/navbar"
import OfferCard from "./components/user/offerCard"
import HotelCard from "./components/user/hotelCard"
import { Toaster } from "react-hot-toast"
import HomeBanners from "./components/admin/homeBanners"
import Search from "./components/user/search"


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
