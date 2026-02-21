import DomeGallery from '../styling/DomeGallery';
import Balatro from '../styling/Balatro';
import { TiLocationArrow } from "react-icons/ti";

const Gallery = () => {
    // All images from the gallery folder
    const galleryImages = [
        '/img/images/gallery/compressedImages/8B3E6BE5-64F3-4774-A321-E56233B5BD2B.jpg',
        '/img/images/gallery/compressedImages/DSC_4980.jpg',
        '/img/images/gallery/compressedImages/DSC_4983.jpg',
        '/img/images/gallery/compressedImages/DSC_5007.jpg',
        '/img/images/gallery/compressedImages/DSC_5011.jpg',
        '/img/images/gallery/compressedImages/DSC_5015.jpg',
        '/img/images/gallery/compressedImages/DSC_5025.jpg',
        '/img/images/gallery/compressedImages/DSC_5192.jpg',
        '/img/images/gallery/compressedImages/DSC_5195.jpg',
        '/img/images/gallery/compressedImages/DSC_5272.jpg',
        '/img/images/gallery/compressedImages/DSC_5275.jpg',
        '/img/images/gallery/compressedImages/DSC_5284.jpg',
        '/img/images/gallery/compressedImages/DSC_5315.jpg',
        '/img/images/gallery/compressedImages/DSC_5427.jpg',
        '/img/images/gallery/compressedImages/DSC_5436.jpg',
        '/img/images/gallery/compressedImages/DSC_5469.jpg',
        '/img/images/gallery/compressedImages/DSC_5480.jpg',
        '/img/images/gallery/compressedImages/DSC_5492.jpg',
        '/img/images/gallery/compressedImages/DSC_5753.jpg',
        '/img/images/gallery/compressedImages/DSC_5768.jpg',
        '/img/images/gallery/compressedImages/DSC_5781.jpg',
        '/img/images/gallery/compressedImages/DSC_5826.jpg',
        '/img/images/gallery/compressedImages/DSC_6412.jpg',
        '/img/images/gallery/compressedImages/DSC_6452.jpg',
        '/img/images/gallery/compressedImages/DSC_6472.jpg',
        '/img/images/gallery/compressedImages/IMG-20210421-WA0000.jpg',
        '/img/images/gallery/compressedImages/SMR_4246.jpg',
        '/img/images/gallery/compressedImages/SMR_4468.jpg',
        '/img/images/gallery/compressedImages/SMR_4543.jpg',
        '/img/images/gallery/compressedImages/SMR_4883.jpg',
        '/img/images/gallery/compressedImages/SMR_4897.jpg',
        '/img/images/gallery/compressedImages/SMR_4924.jpg',
        '/img/images/gallery/compressedImages/SMR_5012.jpg',
        '/img/images/gallery/compressedImages/SMR_5034.jpg',
        '/img/images/gallery/compressedImages/SMR_5056.jpg',
        '/img/images/gallery/compressedImages/SMR_5061.jpg',
        '/img/images/gallery/compressedImages/SMR_5088.1.jpg',
        '/img/images/gallery/compressedImages/SMR_5088.jpg',
        '/img/images/gallery/compressedImages/SMR_5095.jpg',
        '/img/images/gallery/compressedImages/SMR_5188.jpg',
        '/img/images/gallery/compressedImages/SMR_5221.jpg',
        '/img/images/gallery/compressedImages/SMR_5380.jpg',
        '/img/images/gallery/compressedImages/SMR_6550.jpg',
        '/img/images/gallery/compressedImages/SMR_6636.jpg',
        '/img/images/gallery/compressedImages/SMR_6639.jpg',
        '/img/images/gallery/compressedImages/SMR_6718.jpg',
        '/img/images/gallery/compressedImages/SMR_6726.jpg',
        '/img/images/gallery/compressedImages/SMR_6743.jpg',
        '/img/images/gallery/compressedImages/SMR_6771.jpg',
        '/img/images/gallery/compressedImages/SMR_6773.jpg',
        '/img/images/gallery/compressedImages/SMR_6777.jpg',
        '/img/images/gallery/compressedImages/SMR_9259.jpg',
        '/img/images/gallery/compressedImages/SMR_9387.jpg',
        '/img/images/gallery/compressedImages/SMR_9388.jpg',
        '/img/images/gallery/compressedImages/SMR_9402.jpg',
        '/img/images/gallery/compressedImages/SMR_9439.jpg',
        '/img/images/gallery/compressedImages/SMR_9574.jpg',
        '/img/images/gallery/compressedImages/SMR_9577.jpg',
        '/img/images/gallery/compressedImages/SMR_9579.jpg',
        '/img/images/gallery/compressedImages/SMR_9594.jpg',
        '/img/images/gallery/compressedImages/SMR_9597.jpg',
        '/img/images/gallery/compressedImages/SMR_9635.jpg',
        '/img/images/gallery/compressedImages/SMR_9636.jpg',
        '/img/images/gallery/compressedImages/SMR_9638.jpg',
        '/img/images/gallery/compressedImages/SMR_9644.jpg',
        '/img/images/gallery/compressedImages/SMR_9658.jpg',
        '/img/images/gallery/compressedImages/SMR_9661.jpg',
        '/img/images/gallery/compressedImages/SMR_9669.jpg',
        '/img/images/gallery/compressedImages/SMR_9676.jpg',
        '/img/images/gallery/compressedImages/SMR_9680.jpg',
        '/img/images/gallery/compressedImages/SMR_9682.jpg',
        '/img/images/gallery/compressedImages/SMR_9683.jpg',
        '/img/images/gallery/compressedImages/SMR_9690.jpg',
        '/img/images/gallery/compressedImages/SMR_9692.jpg',
        '/img/images/gallery/compressedImages/SMR_9701.jpg',
        '/img/images/gallery/compressedImages/SMR_9707.jpg',
        '/img/images/gallery/compressedImages/SMR_9708.jpg',
        '/img/images/gallery/compressedImages/SMR_9712.jpg',
        '/img/images/gallery/compressedImages/SMR_9715.jpg'
    ];

    return (
        <div className="min-h-screen w-screen bg-neutral-black text-white">
            {/* Hero Intro Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24">
                {/* Background with gradient overlay */}
                <div className="absolute inset-0 bg-neutral-black">
                    <div className="absolute inset-0 bg-gradient-to-b from-neutral-black/60 via-neutral-black/80 to-neutral-black z-10" />
                </div>

                <Balatro
                    isRotate={false}
                    mouseInteraction={true}
                    pixelFilter={1000}
                    color1="#763919"
                    color2="#102103"
                    color3="#010b18"
                />

                <div className="relative z-20 text-center px-6">
                    <h1 className="special-font hero-heading text-blue-75 mb-6">
                        OUR GALLERY
                    </h1>
                    <p className="font-robert-regular text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-neutral-gray leading-relaxed mb-8">
                        Explore our adventures through this immersive 3D gallery experience
                    </p>
                </div>

                <div className="absolute bottom-20 w-full px-6 z-20">
                    <div className="flex gap-4 justify-center items-center">
                        <TiLocationArrow className="text-brown-100 text-3xl sm:text-4xl animate-bounce" />
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                        <p className="font-general text-xs sm:text-sm text-neutral-gray uppercase tracking-widest animate-pulse">Scroll to explore</p>
                    </div>
                </div>
            </section>

            {/* DomeGallery Section */}
            <section className="relative w-full h-screen bg-neutral-black">
                <div className="w-full h-full">
                    <DomeGallery
                        images={galleryImages}
                        fit={0.65}
                        fitBasis="auto"
                        minRadius={700}
                        maxRadius={Infinity}
                        padFactor={0.25}
                        overlayBlurColor="#060010"
                        maxVerticalRotationDeg={5}
                        dragSensitivity={20}
                        enlargeTransitionMs={300}
                        segments={35}
                        dragDampening={2}
                        openedImageWidth="700px"
                        openedImageHeight="700px"
                        imageBorderRadius="16px"
                        openedImageBorderRadius="24px"
                        grayscale={false}
                    />
                </div>

                {/* Instructions - positioned outside the dome area */}
                <div className="absolute bottom-12 left-0 right-0 z-[100] text-center px-4 pointer-events-none">
                    <div className="inline-block bg-neutral-black/80 backdrop-blur-sm px-6 py-3 rounded-full border border-neutral-gray/20">
                        <p className="text-neutral-gray text-sm md:text-base font-robert-regular">
                            Drag to rotate • Click on any image to view in full size • Press ESC to close
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Gallery;
