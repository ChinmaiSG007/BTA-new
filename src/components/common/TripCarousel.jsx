import Carousel from "../styling/Carousel";
import { regions } from "./../../tours.json"

const TripCarousel = () => {
    return (
        <div className="mb-16 px-4 grid grid-cols-1 gap-7 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1">
            {regions.map((region, index) => (
                <Carousel
                    key={index}
                    baseWidth={300}
                    autoplay={true}
                    autoplayDelay={3000}
                    pauseOnHover={true}
                    loop={true}
                    round={false}
                    tripData={region.tours}
                />
            ))}
        </div>
    )
}

export default TripCarousel