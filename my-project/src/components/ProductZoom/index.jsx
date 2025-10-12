import React, { useRef, useState } from 'react'
import InnerImageZoom from 'react-inner-image-zoom'
// import "react-inner-image-zoom/lib/InnerImageZoom/styles.css"
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export const ProductZoom = () => {

  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSlideBig = useRef();
  const zoomSlideSml = useRef();

  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderSml.current.swiper.slideTo(index);
    zoomSliderBig. current.swiper.slideTo(index);
  }

  return (
    <>
      <div className="flex gap-3">
        <div className="slider w-[15%]">
          <Swiper
          ref={zoomSlideSml}
            direction={"vertical"}
            slidesPerView={4}
            spaceBetween={0}
            navigation={true}
            modules={[Navigation]}
            className="zoomProductSliderThumbs h-[500px] overflow-hidden rounded-md">
            <SwiperSlide>
              <div className={`item rounded-md overflow-hidden cursor-pointer group $ {slideIndex===0 ? 'opacity-1' : 'opacity-30'}`} onClick={()=> GoToo(0)}>
                <img src="https://api.spicezgold.com/download/file_1734527612717_deel-band-women-rayon-embroidered-kurta-pant-dupatta-set-product-images-rvz2bvyrm2-1-202404071602.jpg" className="w-full transition-all group-hover:scale-105" />
              </div>
            </SwiperSlide>

             <SwiperSlide>
              <div className="item rounded-md overflow-hidden cursor-pointer group" onClick={()=> GoToo(1)}>
                <img src="https://api.spicezgold.com/download/file_1734527612715_deel-band-women-rayon-embroidered-kurta-pant-dupatta-set-product-images-rvz2bvyrm2-0-202404071602.webp" className="w-full transition-all group-hover:scale-105" />
              </div>
            </SwiperSlide>

             <SwiperSlide>
              <div className="item rounded-md overflow-hidden cursor-pointer group" onClick={()=> GoToo(2)}>
                <img src="https://api.spicezgold.com/download/file_1734527612717_deel-band-women-rayon-embroidered-kurta-pant-dupatta-set-product-images-rvz2bvyrm2-1-202404071602.jpg" className="w-full transition-all group-hover:scale-105" />
              </div>
            </SwiperSlide>

             <SwiperSlide>
              <div className="item rounded-md overflow-hidden cursor-pointer group" onClick={()=> GoToo(3)}>
                <img src="https://api.spicezgold.com/download/file_1734527612717_deel-band-women-rayon-embroidered-kurta-pant-dupatta-set-product-images-rvz2bvyrm2-2-202404071602.jpg" className="w-full transition-all group-hover:scale-105" />
              </div>
            </SwiperSlide>

             <SwiperSlide>
              <div className="item rounded-md overflow-hidden cursor-pointer group" onClick={()=> GoToo(4)}>
                <img src="https://api.spicezgold.com/download/file_1734527612717_deel-band-women-rayon-embroidered-kurta-pant-dupatta-set-product-images-rvz2bvyrm2-1-202404071602.jpg" className="w-full transition-all group-hover:scale-105" />
              </div>
            </SwiperSlide>

             <SwiperSlide>
              <div className="item rounded-md overflow-hidden cursor-pointer group" onClick={()=> GoToo(5)}>
                <img src="https://api.spicezgold.com/download/file_1734527612715_deel-band-women-rayon-embroidered-kurta-pant-dupatta-set-product-images-rvz2bvyrm2-0-202404071602.webp" className="w-full transition-all group-hover:scale-105" />
              </div>
            </SwiperSlide>

             <SwiperSlide>
              <div className="item rounded-md overflow-hidden cursor-pointer group" onClick={()=> GoToo(6)}>
                <img src="https://api.spicezgold.com/download/file_1734527612717_deel-band-women-rayon-embroidered-kurta-pant-dupatta-set-product-images-rvz2bvyrm2-1-202404071602.jpg" className="w-full transition-all group-hover:scale-105" />
              </div>
            </SwiperSlide>

             <SwiperSlide>
              <div className="item rounded-md overflow-hidden cursor-pointer group" onClick={()=> GoToo(7)}>
                <img src="https://api.spicezgold.com/download/file_1734527612717_deel-band-women-rayon-embroidered-kurta-pant-dupatta-set-product-images-rvz2bvyrm2-2-202404071602.jpg" className="w-full transition-all group-hover:scale-105" />
              </div>
            </SwiperSlide>

             <SwiperSlide>
              <div className="item rounded-md overflow-hidden cursor-pointer group" onClick={()=> GoTools(8)}>
                <img src="https://api.spicezgold.com/download/file_1734527612717_deel-band-women-rayon-embroidered-kurta-pant-dupatta-set-product-images-rvz2bvyrm2-1-202404071602.jpg" className="w-full transition-all group-hover:scale-105" />
              </div>
            </SwiperSlide>

            <SwiperSlide></SwiperSlide>

          </Swiper>
        </div>

        <div className="ProductZoomContainer w-[85%] h-[500px] overflow-hidden">
                    <Swiper
                    ref={zoomSlideBig}
            slidesPerView={1}
            spaceBetween={0}
            navigation={false}
       >
              <SwiperSlide>
          <InnerImageZoom
            zoomType="hover"
            zoomScale={1}
            src={"https://api.spicezgold.com/download/file_1734527612717_deel-band-women-rayon-embroidered-kurta-pant-dupatta-set-product-images-rvz2bvyrm2-1-202404071602.jpg"} />
            </SwiperSlide>

            <SwiperSlide>
          <InnerImageZoom
            zoomType="hover"
            zoomScale={1}
            src={"https://api.spicezgold.com/download/file_1734527612715_deel-band-women-rayon-embroidered-kurta-pant-dupatta-set-product-images-rvz2bvyrm2-0-202404071602.webp"} />
            </SwiperSlide>

            <SwiperSlide>
          <InnerImageZoom
            zoomType="hover"
            zoomScale={1}
            src={"https://api.spicezgold.com/download/file_1734527612717_deel-band-women-rayon-embroidered-kurta-pant-dupatta-set-product-images-rvz2bvyrm2-2-202404071602.jpg"} />
            </SwiperSlide>
            </Swiper>
        </div>
      </div>
    </>
  );
};
