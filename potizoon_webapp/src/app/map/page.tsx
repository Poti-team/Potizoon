'use client'

import dynamic from 'next/dynamic'
import geoJsonData from '../components/map/brasil.json' // Corrected import for JSON data

const Map = dynamic(() => import('../components/map'), { ssr: false })

export default function Page() {
    return (
        <Map geoJsonData={geoJsonData} /> // Corrected prop passing
    )
}