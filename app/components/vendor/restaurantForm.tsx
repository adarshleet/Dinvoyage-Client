'use client'
import { addRestaurant } from '@/apis/vendor';
import React, { ChangeEvent, cloneElement, useEffect, useState } from 'react'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Spinner from '../loadingPages/spinner';
import { allLocalities } from '@/apis/admin';
import { MdMyLocation } from "react-icons/md";
import LocationSelect from './locationSelect';
import Image from 'next/image';

interface viewPort{
    longitude:number
    latitude:number
}

interface formData{
    restaurantName: string;
    landmark: string;
    locality: string;
    district: string;
    openingTime: string;
    closingTime: string;
    minCost: number;
    googlemapLocation: string;
    location: {
        longitude: number;
        latitude: number;
    };
    contactNumber: string;
    tableCounts: {
        [key: string]: number;
    };
    banners: string[];
}

const RestaurantForm = () => {

    const router = useRouter()

    const [formData, setFormData] = useState<formData>({
        restaurantName: '',
        landmark: '',
        locality: '',
        district: '',
        openingTime: '',
        closingTime: '',
        minCost: 0,
        googlemapLocation: '',
        location : {
            longitude:0,
            latitude:0
        },
        contactNumber: '',
        tableCounts: {
            '2Seater': 0,
            '4Seater': 0,
            '6Seater': 0,
            '8Seater': 0
        },
        banners: ['', '', '', ''] // To store file paths for banners
    });

    const [images, setImages] = useState<File[]>([])

    const [loading, setLoading] = useState(false)

    const [locationModal,setLocationModal] = useState(false)


    useEffect(()=>{
        const fetchData = async()=>{
            const res = await allLocalities()
            console.log(res?.data.data)
        }
        fetchData()
    },[])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: string) => {
        const value = e.target.value;
        setFormData({ ...formData, [key]: value });
        console.log(formData)
    };

    const handleTableCountChange = (e: ChangeEvent<HTMLSelectElement>, type: string) => {
        const value = parseInt(e.target.value);
        setFormData({ ...formData, tableCounts: { ...formData.tableCounts, [type]: value } });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const newBanners = [...formData.banners];
            newBanners[index] = URL.createObjectURL(file);
            setFormData({ ...formData, banners: newBanners });
            setImages([...images, file])
        }
    };


    //selecting coordinates
    const submitLocation = (viewport:viewPort)=>{
        console.log('jer',location)
        setFormData({...formData,location:{longitude:viewport.longitude,latitude:viewport.latitude}})
        closeModal()
    }


    const handleRequestApproval = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData();
        if (formData.restaurantName.length < 5) {
            toast.error('Please enter valid restaurant name')
        }
        else if (formData.landmark.length < 3) {
            toast.error('Please enter Landmark')
        }
        else if (formData.locality.length < 3) {
            toast.error('Please enter locality')
        }
        else if (formData.district.length < 4) {
            toast.error('Please enter district')
        }
        else if (!formData.openingTime || !formData.closingTime) {
            toast.error('Please enter the time of opening and closing')
        }
        else if (formData.minCost < 200) {
            toast.error('Please enter valid minimum cost')
        }
        else if (formData.googlemapLocation.length < 10) {
            toast.error('Please enter a valid location link')
        }
        else if (formData.contactNumber.length != 10) {
            toast.error('Please Enter a valid contact number')
        }
        else if (formData.banners[0] === '') {
            toast.error('Please select atleast one banner')
        }


        else {
            setLoading(true)
            // Append the image files
            images.forEach((banner, index) => {
                if (banner) {
                    form.append('image', banner);
                }
            });

            // Object.keys(formData.tableCounts).forEach((key) => {
            //     form.append(`tableCounts[${key}]`, formData.tableCounts[key]);
            // });

            Object.keys(formData.tableCounts).forEach((key) => {
                const value = String(formData.tableCounts[key]);
                form.append(`tableCounts[${key}]`, value);
            });

            console.log(formData.restaurantName, images)
            form.append('restaurantName', formData.restaurantName)
            form.append('landmark', formData.landmark)
            form.append('locality', formData.locality)
            form.append('district', formData.district)
            form.append('openingTime', formData.openingTime)
            form.append('closingTime', formData.closingTime)
            form.append('minCost', formData.minCost.toString())
            form.append('googlemapLocation', formData.googlemapLocation)
            form.append('contactNumber', formData.contactNumber)
            // form.append('location',{longitude:formData.location.longitude,latitude:formData.location.latitude})
            form.append('location[longitude]', formData.location.longitude.toString());
            form.append('location[latitude]', formData.location.latitude.toString());

            const res = await addRestaurant(form)
            const data = res?.data
            if (data.status) {
                setLoading(false)
                router.replace('/vendor/restaurants')
            }
        }
    }

    const closeModal = ()=>{
        setLocationModal(false)
    }




    return (
        <>
            <form onSubmit={handleRequestApproval} encType='multipart/form-data'>
                <div className='flex flex-wrap'>
                    <div className='flex flex-col p-2 w-full md:w-1/2 '>
                        <label htmlFor="">Restaurant Name</label>
                        <input type="text" name='restaurantName' value={formData.restaurantName} onChange={(e) => handleInputChange(e, 'restaurantName')} className='border border-gray-400 p-2' />
                    </div>
                    <div className='flex flex-col p-2 w-full md:w-1/2'>
                        <label htmlFor="">Landmark</label>
                        <input type="text" name='landmark' value={formData.landmark} onChange={(e) => handleInputChange(e, 'landmark')} className='border border-gray-400 p-2' />
                    </div>
                    <div className='flex flex-col p-2 w-full md:w-1/2'>
                        <label htmlFor="">District</label>
                        {/* <input type="text" name='district' value={formData.district} onChange={(e) => handleInputChange(e, 'district')} className='border border-gray-400 p-2' /> */}
                        <select name='district' value={formData.district} onChange={(e) => handleInputChange(e, 'district')} className='border border-gray-400 p-2' >
                            <option className='py-2 px-1' value="">Select a district</option>
                            <option value="kasargod">Kasargod</option>
                            <option value="kannur">Kannur</option>
                            <option value="kozhikode">Kozhikode</option>
                            <option value="wayanad">Wayanad</option>
                            <option value="malappura">Malappuram</option>
                            <option value="thrissur">Thrissur</option>
                            <option value="ernakulam">Ernakulam</option>
                            <option value="palakkad">Palakkad</option>
                            <option value="idukki">Idukki</option>
                            <option value="alappuzha">Alappuzha</option>
                            <option value="kottayam">Kottayam</option>
                            <option value="pathanamthitta">Pathanamthitta</option>
                            <option value="kollam">Kollam</option>
                            <option value="thiruvananthapuram">Thiruvanthapuram</option>
                        </select>

                    </div>
                    <div className='flex flex-col p-2 w-full md:w-1/2 '>
                        <label htmlFor="">Locality</label>
                        <input type="text" name='locality' value={formData.locality} onChange={(e) => handleInputChange(e, 'locality')} className='border border-gray-400 p-2' />
                    </div>

                    <div className='flex flex-col p-2 w-full md:w-1/2 '>
                        <label htmlFor="">Opening Time</label>
                        <input type="time" name="openingTime" value={formData.openingTime} onChange={(e) => handleInputChange(e, 'openingTime')} className='border border-gray-400 p-2' />
                    </div>
                    <div className='flex flex-col p-2 w-full md:w-1/2'>
                        <label htmlFor="">Closing Time</label>
                        <input type="time" name='closingTime' value={formData.closingTime} onChange={(e) => handleInputChange(e, 'closingTime')} className='border border-gray-400 p-2' />
                    </div>
                    <div className='flex flex-col p-2 w-full md:w-1/2'>
                        <label htmlFor="">Minimum Cost For Two People</label>
                        <input type="number" name='minCost' value={formData.minCost} onChange={(e) => handleInputChange(e, 'minCost')} className='border border-gray-400 p-2' />
                    </div>
                    <div className='flex flex-col p-2 w-full md:w-1/2'>
                        <label htmlFor="">Googlemap Location</label>
                        <input type="text" name='googlemapLocation' value={formData.googlemapLocation} onChange={(e) => handleInputChange(e, 'googlemapLocation')} className='border border-gray-400 p-2' />
                    </div>
                    <div className='flex flex-col p-2 w-full md:w-1/2'>
                        <label htmlFor="">Restaurant Contact Number</label>
                        <input type="text" name='contactNumber' value={formData.contactNumber} onChange={(e) => handleInputChange(e, 'contactNumber')} className='border border-gray-400 p-2' />
                    </div>
                    <div className='flex flex-col p-2 w-full md:w-1/2' onClick={()=>setLocationModal(true)}>
                        <label htmlFor="">Restaurant Location</label>
                        <div className='p-2 border border-gray-400 flex gap-1 items-center cursor-pointer'>
                            <MdMyLocation/>{formData.location.latitude == 0 ? <p>Select Location</p> : <p>Latitude : {formData.location.latitude} Longitude:{formData.location.longitude}</p> }
                        </div>
                    </div>
                </div>
                
                <div className='p-2 mt-3'>
                    <label htmlFor="">Enter Table Counts</label>
                    <div className='flex py-2 gap-2'>
                        <div className='p-2 border border-gray-900 w-1/2 md:w-1/4 flex justify-between'>
                            <h4>2 Seater</h4>
                            <select name="tableCounts" id="" value={formData.tableCounts['2Seater']} onChange={(e) => handleTableCountChange(e, '2Seater')} className='w-1/4'>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                        <div className='p-2 border border-gray-900 w-1/2 md:w-1/4 flex justify-between'>
                            <h4>4 Seater</h4>
                            <select name="" id="" value={formData.tableCounts['4Seater']} onChange={(e) => handleTableCountChange(e, '4Seater')} className='w-1/4'>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                        <div className='p-2 border border-gray-900 w-1/2 md:w-1/4 flex justify-between'>
                            <h4>6 Seater</h4>
                            <select name="" id="" value={formData.tableCounts['6Seater']} onChange={(e) => handleTableCountChange(e, '6Seater')} className='w-1/4'>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                        <div className='p-2 border border-gray-900 w-1/2 md:w-1/4 flex justify-between'>
                            <h4>8 Seater</h4>
                            <select name="" id="" value={formData.tableCounts['8Seater']} onChange={(e) => handleTableCountChange(e, '8Seater')} className='w-1/4'>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='py-4 p-2'>
                    <label htmlFor="">Select Banners</label>
                    <div className='py-2 flex flex-wrap gap-3'>
                        {formData.banners.map((banner, index) => (
                            <div key={index} className='p-2 border border-gray-400'>
                                <label htmlFor={`bannerFileInput${index}`} className='flex items-center font-bold'>
                                    Banner {index + 1}
                                    <input type="file" accept="image/*" id={`bannerFileInput${index}`} onChange={(e) => handleFileChange(e, index)} name='image' className='hidden' />
                                </label>
                                {banner && <Image src={banner} alt={`Banner ${index + 1}`} style={{ maxWidth: '200px' }} />}
                            </div>
                        ))}
                    </div>
                    <button className='w-full text-center mt-8 p-2 text-white font-bold bg-gray-600'>REQUEST ADMIN FOR APPROVAL</button>
                </div>
            </form>
            {locationModal && <LocationSelect closeModal={closeModal} submitLocation={submitLocation}/>}
            {loading &&
                <Spinner />
            }
        </>
    )
}

export default RestaurantForm
