import { useState } from "react";
import Carousel from "../styling/Carousel";
import { regions } from "./../../tours.json"

const TripCarousel = () => {
    return (
        <div className="mx-4 ">
            <h1 className="mb-8 section-heading ">Discover Freedom: Unforgettable Motorcycle Tours for Every Rider</h1>
            <div className="mb-16 mx-12 px-4 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-2 lg:grid-rows-2">
                {regions.map((region, index) => (
                    <Carousel
                        key={index}
                        baseWidth={500}
                        autoplay={true}
                        autoplayDelay={3000}
                        pauseOnHover={true}
                        loop={true}
                        round={false}
                        tripData={region.tours}
                        tripName={region.name}
                    />
                ))}
            </div>
        </div>
    )
}

export default TripCarousel