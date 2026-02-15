'use client'

import { useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import './swiper-page.css'

export default function Home() {
  const verticalSwiperRef = useRef<SwiperType>()
  const fadeSwiperRef = useRef<SwiperType>()
  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)
  const verticalWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = verticalWrapperRef.current
    if (!wrapper) return

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (touch) {
        touchStartX.current = touch.clientX
        touchStartY.current = touch.clientY
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0]
      if (touch && verticalSwiperRef.current && touchStartX.current !== 0) {
        const deltaX = touch.clientX - touchStartX.current
        const deltaY = touch.clientY - touchStartY.current
        const absDeltaX = Math.abs(deltaX)
        const absDeltaY = Math.abs(deltaY)
        
        // If horizontal swipe is more prominent than vertical swipe
        if (absDeltaX > absDeltaY && absDeltaX > 50) {
          if (deltaX < 0) {
            // Swipe left - move upward (next slide)
            alert('Left swipe detected!')
            verticalSwiperRef.current.slideNext()
          } else {
            // Swipe right - move upward (next slide)
            alert('Right swipe detected!')
            verticalSwiperRef.current.slideNext()
          }
        }
        
        // Reset touch start
        touchStartX.current = 0
        touchStartY.current = 0
      }
    }

    wrapper.addEventListener('touchstart', handleTouchStart, { passive: true })
    wrapper.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      wrapper.removeEventListener('touchstart', handleTouchStart)
      wrapper.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <main className="swiper-container">
      <div className="header">
        <h1>Swiper.js Demo</h1>
        <p>Beautiful carousel implementation in Next.js</p>
      </div>

      {/* Basic Swiper */}
      {/* <section className="swiper-section">
        <h2>Basic Swiper</h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation={true}
          pagination={false}
          modules={[Navigation]}
          className="basic-swiper"
        >
          <SwiperSlide>
            <div className="slide-content slide-1">
              <h3>Slide 1</h3>
              <p>This is the first slide</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-content slide-2">
              <h3>Slide 2</h3>
              <p>This is the second slide</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-content slide-3">
              <h3>Slide 3</h3>
              <p>This is the third slide</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-content slide-4">
              <h3>Slide 4</h3>
              <p>This is the fourth slide</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </section> */}

      {/* Multiple Slides Per View */}
      {/* <section className="swiper-section">
        <h2>Multiple Slides Per View</h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          className="multi-swiper"
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <SwiperSlide key={num}>
              <div className="card-slide">
                <div className="card-number">{num}</div>
                <h4>Card {num}</h4>
                <p>Responsive card slide</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section> */}

      {/* Autoplay Swiper */}
      {/* <section className="swiper-section">
        <h2>Autoplay Swiper</h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="autoplay-swiper"
        >
          <SwiperSlide>
            <div className="slide-content slide-1">
              <h3>Auto Slide 1</h3>
              <p>Automatically advances every 3 seconds</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-content slide-2">
              <h3>Auto Slide 2</h3>
              <p>Beautiful transitions</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-content slide-3">
              <h3>Auto Slide 3</h3>
              <p>Smooth animations</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </section> */}

      {/* Fade Effect Swiper */}
      {/* <section className="swiper-section">
        <h2>Fade Effect Swiper</h2>
        <div className="fade-swiper-wrapper">
          <Swiper
            effect="fade"
            spaceBetween={30}
            slidesPerView={1}
            navigation={false}
            pagination={false}
            modules={[EffectFade]}
            className="fade-swiper"
            onSwiper={(swiper) => {
              fadeSwiperRef.current = swiper
            }}
          >
            <SwiperSlide>
              <div 
                className="slide-content slide-1"
                onClick={() => alert('Card 1')}
              >
                <h3>Fade Slide 1</h3>
                <p>Elegant fade transition</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div 
                className="slide-content slide-2"
                onClick={() => alert('Card 2')}
              >
                <h3>Fade Slide 2</h3>
                <p>Smooth crossfade effect</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div 
                className="slide-content slide-3"
                onClick={() => alert('Card 3')}
              >
                <h3>Fade Slide 3</h3>
                <p>Professional look</p>
              </div>
            </SwiperSlide>
          </Swiper>
          <button
            className="fade-nav-btn fade-nav-left"
            onClick={(e) => {
              e.stopPropagation()
              alert('Left arrow clicked!')
              fadeSwiperRef.current?.slideNext()
            }}
            aria-label="Next slide"
          >
          </button>
          <button
            className="fade-nav-btn fade-nav-right"
            onClick={(e) => {
              e.stopPropagation()
              alert('Right arrow clicked!')
              fadeSwiperRef.current?.slideNext()
            }}
            aria-label="Next slide"
          >
          </button>
        </div>
      </section> */}

      {/* Vertical Slider */}
      <section className="swiper-section">
        <h2>Vertical Slider</h2>
        <div className="vertical-swiper-wrapper" ref={verticalWrapperRef}>
          <Swiper
            direction="vertical"
            spaceBetween={30}
            slidesPerView={1}
            navigation={false}
            pagination={false}
            className="vertical-swiper"
            onSwiper={(swiper) => {
              verticalSwiperRef.current = swiper
            }}
          >
            <SwiperSlide>
              <div 
                className="slide-content slide-1"
                onClick={() => alert('Card 1')}
              >
                <h3>Vertical Slide 1</h3>
                <p>Scrolls vertically</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div 
                className="slide-content slide-2"
                onClick={() => alert('Card 2')}
              >
                <h3>Vertical Slide 2</h3>
                <p>Up and down navigation</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div 
                className="slide-content slide-3"
                onClick={() => alert('Card 3')}
              >
                <h3>Vertical Slide 3</h3>
                <p>Auto-advancing vertically</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div 
                className="slide-content slide-4"
                onClick={() => alert('Card 4')}
              >
                <h3>Vertical Slide 4</h3>
                <p>Smooth vertical transitions</p>
              </div>
            </SwiperSlide>
          </Swiper>
          <button
            className="vertical-nav-btn vertical-nav-left"
            onClick={(e) => {
              e.stopPropagation()
              alert('Left arrow clicked!')
              verticalSwiperRef.current?.slideNext()
            }}
            aria-label="Previous slide"
          >
          </button>
          <button
            className="vertical-nav-btn vertical-nav-right"
            onClick={(e) => {
              e.stopPropagation()
              alert('Right arrow clicked!')
              verticalSwiperRef.current?.slideNext()
            }}
            aria-label="Next slide"
          >
          </button>
        </div>
      </section>
    </main>
  )
}
