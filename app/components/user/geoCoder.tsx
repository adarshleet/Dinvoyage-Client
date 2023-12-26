'use client'
import React from 'react'
import { Dispatch, SetStateAction } from 'react';
import mapboxgl from 'mapbox-gl';
import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { useControl } from 'react-map-gl'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

interface geoCoder{
    setViewport : (Dispatch<SetStateAction<Location>>)
}

interface Location {
    longitude: number;
    latitude : number
    zoom : number
    // latitude is missing here
}

const GeoCoder = ({setViewport}:geoCoder) => {


    const ctrl = new MapBoxGeocoder({
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_API as string,
        marker :false,
        collapsed:true
    })

    useControl(()=>ctrl)
    ctrl.on('result',(e)=>{
        const coords = e.result.geometry.coordinates
        setViewport({
            latitude:coords[1],
            longitude:coords[0],
            zoom:8
        })
    })

    return null
}

export default GeoCoder
