import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState, useRef } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { GetDataSimple } from "../../services";
import "../../index.css";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function MainCarousel() {
    const [data, setData] = useState([]);
    const [language, setLanguage] = useState(null);
    const swiperRef = useRef(null); // Create ref for Swiper instance

    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang) {
            setLanguage(lang);
        }
    }, []);

    useEffect(() => {
        GetDataSimple("main/part/v1/sliders").then((data) => {
            setData(data);
        });
    }, []);

    return (
        <div className="relative">
            <Swiper
                ref={swiperRef} // Attach Swiper instance to the ref
                cssMode={true}
                navigation={false} // Disable default navigation
                pagination={{
                    clickable: true,
                    renderBullet: (index, className) => {
                        return `<span class="${className} custom-bullet"></span>`;
                    },
                }} // Custom pagination
                mousewheel={true}
                loop={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="my-swiper"
            >
                {data?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <div className="bg-black w-full h-full absolute">
                                <img
                                    src={item?.slider_image}
                                    alt={`slide ${index + 1}`}
                                    className="absolute h-full w-full object-cover"
                                />
                            </div>
                            <div className="w-full h-full absolute flex justify-center items-center">
                                <h1 className="absolute z-[999] text-center text-[#fe6803] w-4/6 md:w-5/6 md:font-extrabold">
                                    {language === "uz"
                                        ? item?.translations?.uz?.title
                                        : language === "ru"
                                        ? item?.translations?.ru?.title
                                        : language === "en"
                                        ? item?.translations?.en?.title
                                        : item?.translations?.uz?.title}
                                </h1>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Next and Prev buttons */}
            <button
                className="absolute top-1/2 left-4 z-50 text-white   p-2 rounded-full shadow-md"
                onClick={() => swiperRef.current?.swiper.slidePrev()} // Call Swiper's slidePrev method
            >
                <IoIosArrowBack size={30} />
            </button>
            <button
                className="absolute top-1/2 right-4 text-white z-50 p-2 rounded-full shadow-md"
                onClick={() => swiperRef.current?.swiper.slideNext()} // Call Swiper's slideNext method
            >
                <IoIosArrowForward size={30} />
            </button>
        </div>
    );
}
