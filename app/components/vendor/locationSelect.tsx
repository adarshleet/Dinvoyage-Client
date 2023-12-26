'use client'
import React, { useEffect, useRef, useState, RefObject } from 'react'
import ReactMapGL, { GeolocateControl, Marker, NavigationControl, MapRef } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import GeoCoder from '../user/geoCoder'
import { IoMdClose } from "react-icons/io";

interface location {
    longitude: number,
    latitude: number,
    zoom: number
}

interface viewPort{
    longitude:number
    latitude:number
}

interface locationProps{
    closeModal: ()=>void
    submitLocation: (viewport:viewPort)=>void
}

const LocationSelect = ({closeModal,submitLocation}:locationProps) => {


    const [viewport, setViewport] = useState<location>({
        longitude: 0,
        latitude: 0,
        zoom: 10
    })

    const mapRef: RefObject<MapRef> = useRef(null);

    useEffect(() => {
        if (!viewport.latitude && !viewport.longitude) {
            fetch('https://ipapi.co/json').then(response => {
                return response.json()
            }).then(data => {
                mapRef.current?.flyTo({
                    center: [data.longitude, data.latitude]
                })
                setViewport({
                    latitude: data.latitude,
                    longitude: data.longitude,
                    zoom: 10
                })
            })
        }
        console.log(viewport)
    }, [viewport])


    return (
        <div className='flex flex-col justify-center fixed z-50 top-0 left-0 right-0 items-center'>
            <div className='w-screen h-screen bg-gray-900 bg-opacity-50'>
                <main className='py-24 md:px-10 flex flex-col justify-center w-full h-full'>
                    <ReactMapGL
                        ref={mapRef}
                        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API}
                        // latitude={19}
                        // longitude={72}
                        initialViewState={
                            viewport
                        }
                        mapStyle='mapbox://styles/mapbox/streets-v12'
                    >
                        <Marker
                            longitude={viewport.longitude}
                            latitude={viewport.latitude}
                            draggable
                            onDragEnd={(e) => setViewport({ latitude: e.lngLat.lat, longitude: e.lngLat.lng, zoom: 10 })}
                        />
                        <NavigationControl position='bottom-right' />
                        <GeolocateControl
                            position='top-left'
                            trackUserLocation
                            onGeolocate={(e) => setViewport({ latitude: e.coords.latitude, longitude: e.coords.longitude, zoom: 10 })}
                        />

                        <GeoCoder setViewport={setViewport} />
                    </ReactMapGL>
                    <div className='flex justify-center items-center gap-3 text-center py-3'>
                        <button className='py-2 px-3 rounded-md bg-black text-white font-bold' onClick={()=>submitLocation(viewport)}>Select the marked location</button>
                        <button className='py-2 px-3 bg-red-700 font-bold text-white rounded-md' onClick={closeModal}>Close</button>
                    </div>

                </main>
            </div>
            
        </div>
    )
}

export default LocationSelect
