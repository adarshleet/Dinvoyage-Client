'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import Spinner from '../loadingPages/spinner'
import { deleteRestaurantBanner, editRestaurant, getRestaurantDetails } from '@/apis/vendor'
import { useRouter } from 'next/navigation'

interface editProps {
    restaurantId: string
}

const EditRestaurantForm = ({ restaurantId }: editProps) => {

    const [restaurant, setRestaurant] = useState({})
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])
    const [existingImages,setExistingImages] = useState([])

    const [formData, setFormData] = useState({
        restaurantName: '',
        landmark: '',
        locality: '',
        district: '',
        openingTime: '',
        closingTime: '',
        minCost: 0,
        googlemapLocation: '',
        contactNumber: '',
        tableCounts: {
            '2Seater': 0,
            '4Seater': 0,
            '6Seater': 0,
            '8Seater': 0
        },
        banners: ['', '', '', ''] // To store file paths for banners
    });

    const router = useRouter()


    useEffect(() => {
        const fetchData = async () => {
            const res = await getRestaurantDetails(restaurantId)
            const restaurantData = res?.data.data
            console.log(restaurantData)
            setRestaurant(restaurantData)
            if (restaurantData) {
                setFormData({
                    restaurantName: restaurantData.restaurantName || '',
                    landmark: restaurantData.landmark || '',
                    locality: restaurantData.locality || '',
                    district: restaurantData.district || '',
                    openingTime: restaurantData.openingTime || '',
                    closingTime: restaurantData.closingTime || '',
                    minCost: restaurantData.minCost || 0,
                    googlemapLocation: restaurantData.googlemapLocation || '',
                    contactNumber: restaurantData.contactNumber || '',
                    tableCounts: {
                        '2Seater': restaurantData.tableCounts?.['2Seater'] || 0,
                        '4Seater': restaurantData.tableCounts?.['4Seater'] || 0,
                        '6Seater': restaurantData.tableCounts?.['6Seater'] || 0,
                        '8Seater': restaurantData.tableCounts?.['8Seater'] || 0
                    },
                    banners: restaurantData.banners || ['', '', '', '']
                });
                setExistingImages(restaurantData.banners)
            }
        }
        fetchData()
    }, [])


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
        const value = e.target.value;
        setFormData({ ...formData, [key]: value });
    };

    const handleTableCountChange = (e: ChangeEvent<HTMLSelectElement>, type: string) => {
        const value = e.target.value;
        setFormData({ ...formData, tableCounts: { ...formData.tableCounts, [type]: value } });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const newBanners = [...formData.banners];
            newBanners[index] = URL.createObjectURL(file);
            setFormData({ ...formData, banners: newBanners });
            setImages([...images, file])
            console.log(images)
        }
    };


    const handleEditDetails = async (e: React.FormEvent<HTMLFormElement>) => {
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

            Object.keys(formData.tableCounts).forEach((key) => {
                form.append(`tableCounts[${key}]`, formData.tableCounts[key]);
            });

            console.log(formData.restaurantName, images)
            form.append('restaurantName', formData.restaurantName)
            form.append('landmark', formData.landmark)
            form.append('locality', formData.locality)
            form.append('district', formData.district)
            form.append('openingTime', formData.openingTime)
            form.append('closingTime', formData.closingTime)
            form.append('minCost', formData.minCost)
            form.append('googlemapLocation', formData.googlemapLocation)
            form.append('contactNumber', formData.contactNumber)

            const res = await editRestaurant(restaurantId,form)
            console.log(res)
            const data = res?.data
            if (data.status) {
                setLoading(false)
                router.replace('/vendor/restaurants')
            }
        }
    }

    const deleteImage = async(image:string)=>{
        const res = await deleteRestaurantBanner(restaurant._id,image)
        setExistingImages((prevImages) => {
            const index = prevImages.indexOf(image);

            if (index !== -1) {
                const newArray = [...prevImages];
                newArray.splice(index, 1);
                return newArray;
            }

            return prevImages;
        });
        setFormData((prevFormData) => {
            // Copy the existing state
            const updatedFormData = { ...prevFormData };
    
            // Ensure banners is an array
            if (Array.isArray(updatedFormData.banners)) {
                // Find the index of the image in the banners array
                const imageIndex = updatedFormData.banners.indexOf(image);
    
                // Check if the image name is found
                if (imageIndex !== -1) {
                    // Remove the image by index
                    updatedFormData.banners.splice(imageIndex, 1);
                }
            }
    
            return updatedFormData;
        });
        console.log(res)
    }


    return (
        <>
            <form onSubmit={handleEditDetails} encType='multipart/form-data'>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
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
                    {/* <div className='py-2 flex flex-wrap gap-3'>
                        {formData.banners.map((banner, index) => (
                            <div key={index} className='p-2 border border-gray-400 overflow-hidden' style={{ maxWidth: '200px',maxHeight:'9rem' }}>
                                <label htmlFor={`bannerFileInput${index}`} className='flex items-center font-bold'>
                                    Banner {index + 1}
                                    <input type="file" accept="image/*" id={`bannerFileInput${index}`} onChange={(e) => handleFileChange(e, index)} name='image' className='hidden' />
                                </label>
                                {banner && <img src={banner} alt={`Banner ${index + 1}`} className=''  />}
                            </div>
                        ))}
                    </div> */}
                    <div className='py-2 flex flex-wrap gap-3'>
                        {[0, 1, 2, 3].map((index) => (
                            <div key={index} className='p-2 border border-gray-400 overflow-hidden' style={{ maxWidth: '200px', maxHeight: '12rem' }}>
                                
                                <input type="file" accept="image/*" id={`bannerFileInput${index}`} onChange={(e) => handleFileChange(e, index)} name='image' className='hidden' />
                                {formData.banners[index] && (
                                    <>
                                        <img src={formData.banners[index]} alt={`Banner ${index + 1}`} className='' />
                                       {(existingImages.includes(formData.banners[index]) && existingImages.length != 1) && <h1 className='px-3 py-2 mt-1 text-center bg-red-700 text-white font-bold text-sm cursor-pointer' onClick={()=>deleteImage(formData.banners[index])}>Delete</h1>}
                                    </>
                                )}
                                {!formData.banners[index] && (
                                    <div key={index} className='p-2 border border-gray-400 overflow-hidden' style={{ maxWidth: '200px', maxHeight: '9rem' }}>
                                        <label htmlFor={`bannerFileInput${index}`} className='flex items-center font-bold'>
                                            Banner {index + 1}
                                            <input type="file" accept="image/*" id={`bannerFileInput${index}`} onChange={(e) => handleFileChange(e, index)} name='image' className='hidden' />
                                        </label>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <button className='w-full text-center mt-8 p-2 text-white font-bold bg-gray-600'>REQUEST ADMIN FOR APPROVAL</button>
                </div>
            </form>
            {loading &&
                <Spinner />
            }
        </>
    )
}

export default EditRestaurantForm
