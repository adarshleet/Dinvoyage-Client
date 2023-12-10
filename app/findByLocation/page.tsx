'use client'
import React, { useEffect, useRef, useState, RefObject } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from '../components/user/navbar'
import ReactMapGL, { GeolocateControl, Marker, NavigationControl, MapRef } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import GeoCoder from '../components/user/geoCoder'
import { restaurantsToDisplay } from '@/apis/user'
import SuperCluster from 'supercluster'
import PopupMap from '../components/user/popupMap'

interface location {
    longitude: number,
    latitude: number,
    zoom: number
}

const page = () => {

    const [viewport, setViewport] = useState<location>({
        longitude: 0,
        latitude: 0,
        zoom: 10
    })

    const [points, setPoints] = useState([])
    const [clusters, setClusters] = useState([])
    const [bounds, setBounds] = useState([-180, -85, 180, 85])
    const [zoom, setZoom] = useState(0)
    const [restaurants, setRestaurants] = useState([])

    const mapRef: RefObject<MapRef> = useRef(null);
    const [showIndex,setShowindex] = useState<number | null>(null)

    const supercluster = new SuperCluster({
        radius: 75,
        maxZoom: 20
    })

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


    useEffect(() => {
        const fetchData = (async () => {
            const res = await restaurantsToDisplay(2)
            const restaurants = res?.data.data.restaurants
            console.log('res',restaurants)
            setRestaurants(restaurants)
        })
        fetchData()
    }, [])

    useEffect(() => {
        const points = restaurants.map((restaurant) => ({
            type: 'Feature',
            properties: {
                clusters: false,
                restaurantId: restaurant._id,
                restaurantName: restaurant.restaurantName,
                landmark : restaurant.landmark,
                locality : restaurant.locality,
                minCost : restaurant.minCost,
                banner : restaurant.banners,
                longitude: restaurant.location.longitude,
                latitude: restaurant.location.latitude
            },
            geometry: {
                type: 'Point',
                coordinates: [parseFloat(restaurant.location.longitude), parseFloat(restaurant.location.latitude)]
            }
        }))
        setPoints(points)
    }, [restaurants])


    useEffect(() => {
        supercluster.load(points)
        setClusters(supercluster.getClusters(bounds,zoom))
    }, [points, zoom, bounds])

    useEffect(() => {
        if (mapRef.current) {
            setBounds(mapRef.current.getMap().getBounds().toArray().flat())
        }
    }, [mapRef])

    const closeModal = ()=>{
        setShowindex(null)
    }


    return (
        <>
            <Toaster position='bottom-center' />
            <header>
                <Navbar />
            </header>
            <main className='pt-24 pb-7 px-2 md:px-6 flex justify-center w-screen h-screen'>
                <ReactMapGL
                    ref={mapRef}
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API}
                    initialViewState={
                        viewport
                    }
                    mapStyle='mapbox://styles/mapbox/streets-v11'
                    onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
                >

                   
                    {clusters.map((cluster,index) => {
                        const { cluster: isCluster, point_count } = cluster?.properties;
                        const [longitude, latitude] = cluster?.geometry.coordinates;

                        if (isCluster) {
                            return (
                                <Marker
                                    key={`cluster-${cluster.id}`}
                                    longitude={longitude}
                                    latitude={latitude}
                                >
                                    <div className='bg-cyan-700 rounded-full flex justify-center items-center text-white p-4'
                                        style={{
                                            width: `${10 + (point_count / points.length) * 20}px`,
                                            height: `${10 + (point_count / points.length) * 20}px`
                                        }}
                                        onClick={()=>{
                                            const zoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id),20)
                                            mapRef.current?.flyTo({
                                                center:[longitude,latitude],
                                                zoom,
                                                speed:1
                                            })
                                        }}
                                    >
                                        {point_count}
                                    </div>
                                </Marker>
                            );
                        } else {
                            return (
                                
                                <Marker
                                    key={`point-${cluster.properties.restaurantId}`}
                                    longitude={longitude}
                                    latitude={latitude}
                                >
                                    {showIndex==index ? <PopupMap restaurant={cluster.properties} closeModal={closeModal}/>
                                    :
                                    <div className='flex flex-col text-black overflow-hidden z-20'
                                        key={index}
                                        style={{
                                            // width: '5rem',
                                            // height: `5rem`
                                        }}
                                        onClick={()=>setShowindex(index)}
                                    >
                                        <div className='w-20 h-20 rounded-full overflow-hidden'>
                                            <img src={cluster.properties.banner[0]} alt="" />
                                        </div>
                                    </div>
                                    }
                                </Marker>
                            );
                        }
                    })}




                    <NavigationControl position='bottom-right' />
                    <GeolocateControl
                        position='top-left'
                        trackUserLocation
                        onGeolocate={(e) => setViewport({ latitude: e.coords.latitude, longitude: e.coords.longitude, zoom: 10 })}
                    />
                    <GeoCoder setViewport={setViewport} />
                    
                </ReactMapGL>
            </main>
        </>
    )
}

export default page
