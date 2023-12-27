'use client'
import React, { useEffect, useRef, useState, RefObject, useMemo } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from '../components/user/navbar'
import ReactMapGL, { GeolocateControl, Marker, NavigationControl, MapRef } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import GeoCoder from '../components/user/geoCoder'
import { restaurantsForMap, restaurantsToDisplay } from '@/apis/user'
import SuperCluster,{ AnyProps } from 'supercluster'
import PopupMap from '../components/user/popupMap'
import Image from 'next/image'

interface location {
    longitude: number,
    latitude: number,
    zoom: number
}

interface Point {
    type: string;
    properties: {
      clusters: boolean;
      restaurantId: string;
      restaurantName: string;
      landmark: string;
      locality: string;
      minCost: number;
      banner: string[];
      longitude: string;
      latitude: string;
    };
    geometry: {
      
    };
  }

  type PointFeature<AnyProps> = {
    type: "Feature";
    properties: AnyProps;
    geometry: {
      type: "Point";
      coordinates: [number, number];
    };
  };


interface Restaurant{
    _id: string,
    restaurantName: string
    openingTime: string,
    closingTime: string,
    banners: Array<string>
    landmark: string
    locality: string,
    googlemapLocation: string
    cuisines: string[],
    facilities: string[],
    minCost: number,
    contactNumber: string,
    location:{
        longitude:string,
        latitude:string
    }
}

const Usepage = () => {

    const [viewport, setViewport] = useState<location>({
        longitude: 0,
        latitude: 0,
        zoom: 10
    })

    const [points, setPoints] = useState<any[]>([])
    const [clusters, setClusters] = useState<any>([])
    const [bounds, setBounds] = useState<any>([-180, -85, 180, 85])
    const [zoom, setZoom] = useState(0)
    const [restaurants, setRestaurants] = useState([])

    const mapRef: RefObject<MapRef> = useRef(null);
    const [showIndex,setShowindex] = useState<number | null>(null)

    // const supercluster = new SuperCluster({
    //     radius: 75,
    //     maxZoom: 20
    // })
    const supercluster = useMemo(() => {
        return new SuperCluster({
          radius: 75,
          maxZoom: 20
        });
      }, []); 

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
            const res = await restaurantsForMap()
            const restaurants = res?.data.data
            console.log('res',restaurants)
            setRestaurants(restaurants)
        })
        fetchData()
    }, [])

    useEffect(() => {
        const points = restaurants.map((restaurant:Restaurant) => ({
            type: 'Feature',
            properties: {
                clusters: false,
                restaurantId: restaurant._id,
                restaurantName: restaurant.restaurantName,
                landmark : restaurant.landmark,
                locality : restaurant.locality,
                minCost : restaurant.minCost,
                banner : restaurant.banners,
                longitude: restaurant?.location?.longitude,
                latitude: restaurant?.location?.latitude
            },
            geometry: {
                type: 'Point',
                coordinates: [parseFloat(restaurant?.location?.longitude), parseFloat(restaurant?.location?.latitude)]
            }
        }))
        setPoints(points)
    }, [restaurants])


    useEffect(() => {
        supercluster.load(points)
        setClusters(supercluster.getClusters(bounds,zoom))
    }, [points, zoom, bounds,supercluster])

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
                    mapboxAccessToken='pk.eyJ1IjoibWFzaGhvb3IzMjUiLCJhIjoiY2xwaWVlZTluMGV0bTJpcncyaTRncGprYyJ9.Y2I8DwcQtpZOnvfKjvzVlA'
                    initialViewState={
                        viewport
                    }
                    mapStyle='mapbox://styles/mapbox/streets-v11'
                    onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
                >

                   
                    {clusters.map((cluster:any,index:number) => {
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
                                            <Image width={80} height={53} src={cluster.properties.banner[0]} alt="" />
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

export default Usepage
