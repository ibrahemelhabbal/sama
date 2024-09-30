import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link as ScrollLink } from 'react-scroll';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './HeroSlider.scss';

import link1 from '/link1.png';
import link2 from '/link2.png';
import link3 from '/link3.png';
import link4 from '/link4.png';

const StatItem = ({ number, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(number);
    if (start === end) return;

    let incrementTime = Math.floor(2000 / end);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [number]);

  return (
    <div className="stat">
      <h3>{count}+</h3>
      <p>{label}</p>
    </div>
  );
};

StatItem.propTypes = {
  number: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get(
          'https://inspiring-eggs-3c9510aeb2.strapiapp.com/api/herosections?populate=*',
        );
        setSlides(response.data.data);
      } catch (error) {
        console.error('Error fetching hero slides:', error);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      // تحديث عناصر التنقل والصفحات بعد تحميل الشرائح
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
      swiperRef.current.pagination.render();
      swiperRef.current.pagination.update();
    }
  }, [slides]);

  return (
    <section className="hero-slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        className="swiper-container">
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div
              className="slide-content"
              style={{
                backgroundImage: `url(http://localhost:1337${slide.image.url})`,
              }}>
              <div className="project-counter">
                <div className="counter">
                  <StatItem number="150" label="مشروع" />
                </div>
              </div>
              <div className="overlay">
                <h1>{slide.title || 'عنوان غير متوفر'}</h1>
                <p>{slide.desc || 'وصف غير متوفر.'}</p>
                <div className="cta-buttons">
                  <ScrollLink
                    to="services"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={1000}
                    className="btn1">
                    تواصل معنا
                  </ScrollLink>
                  <ScrollLink
                    to="services"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={1000}
                    className="btn2">
                    مشاهدة المنتجات
                  </ScrollLink>
                </div>
                <div className="social-icons">
                  <a href="#" aria-label="Instagram">
                    <img src={link1} alt="Instagram" />
                  </a>
                  <a href="#" aria-label="Snapchat">
                    <img src={link2} alt="Snapchat" />
                  </a>
                  <a href="#" aria-label="Twitter">
                    <img src={link3} alt="Twitter" />
                  </a>
                  <a href="#" aria-label="WhatsApp">
                    <img src={link4} alt="WhatsApp" />
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-container3">
        <div className="swiper-button-prev" aria-label="Previous slide"></div>
        <div className="swiper-button-next" aria-label="Next slide"></div>
      </div>
    </section>
  );
};

export default HeroSlider;
