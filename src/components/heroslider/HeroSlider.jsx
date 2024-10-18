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

import link2 from '/link2.png';
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
          'https://credible-frogs-c0463567d4.strapiapp.com/api/herosections?populate=*',
        );
        setSlides(response.data.data);
      } catch (error) {
        console.error('Error fetching hero slides:', error);
      }
    };

    fetchSlides();
  }, []);

  const [data, setData] = useState({});
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch(
          'https://credible-frogs-c0463567d4.strapiapp.com/api/albyanats/?populate=*',
        );
        const responseData = await response.json();
        setData(responseData.data[0]); // استخدم "attributes" إذا كانت البيانات تحتوي عليها
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };

    fetchContactInfo();
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
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
            <div className="slide-content">
              {slide.image && slide.image.mime ? ( // تحقق من وجود slide.image و mime
                slide.image.mime.includes('video') ? ( // التحقق إذا كان الملف فيديو
                  <video controls autoPlay muted loop>
                    <source src={slide.image.url} type={slide.image.mime} />
                    المتصفح الخاص بك لا يدعم تشغيل الفيديو.
                  </video>
                ) : slide.image.mime.includes('image') ? ( // التحقق إذا كان الملف صورة
                  <div
                    style={{
                      backgroundImage: `url(${slide.image.url})`, // عرض الصورة
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '100%',
                      width: '100%',
                    }}
                    className="background-image"
                  />
                ) : (
                  <div>الملف غير مدعوم</div> // إذا كان نوع الملف غير مدعوم
                )
              ) : (
                <div>الصورة أو الفيديو غير متوفر</div> // نص بديل إذا لم تكن الصورة أو الفيديو متوفر
              )}
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
                    to="contact"
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
                  <a
                    href={
                      data.instagram || 'https://www.instagram.com/smaeast/'
                    }
                    aria-label="Snapchat">
                    <img src={link2} alt="Snapchat" />
                  </a>
                  <a
                    href={data.twitter || 'https://x.com/SmaEast'}
                    aria-label="WhatsApp">
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
