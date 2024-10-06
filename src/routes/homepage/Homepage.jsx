import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './Homepage.scss';
import HeroSlider from '../../components/heroslider/HeroSlider';
import ArabicCarousel from '../../components/swiper/Swiper';
import ExactArabicProjectsCarousel from '../../components/swiper2/Swiper2';
import PropTypes from 'prop-types';
import earth from '/earth.png';
import darklogo from '/darklogo.png';
import whitelogo from '/whitelogo.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import whatsappIcon from '/whatsapp.png';
/* These imports should already be in your CSS or component */
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Footer from '../../components/footer/Footer';
import iiii from '/iiii.png';

import axios from 'axios';
// Import Swiper styles
import { useInView } from 'react-intersection-observer';

const Homepage = () => {
  const StatItem = ({ number, label }) => {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({
      triggerOnce: true, // العداد يعمل مرة واحدة
      threshold: 0.5, // يبدأ العداد عندما يظهر 50% من العنصر
    });

    useEffect(() => {
      if (!inView) return;

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
    }, [inView, number]);

    return (
      <div className="stat" ref={ref}>
        <h3>{count}+</h3>
        <p>{label}</p>
      </div>
    );
  };

  const [customerLogos, setCustomerLogos] = useState([]);

  // Fetch the customer logos using axios
  useEffect(() => {
    const fetchCustomerLogos = async () => {
      try {
        const response = await axios.get(
          `https://phenomenal-apparel-b276e02b81.strapiapp.com/api/swr-alemlaes?populate=*`,
        );

        setCustomerLogos(response.data.data);
      } catch (error) {
        console.error('Error fetching customer logos:', error);
      }
    };

    fetchCustomerLogos();
  }, []);

  // حالة لتتبع ما إذا تم إرسال النموذج بنجاح
  const [isSubmitted, setIsSubmitted] = useState(false);

  // التعامل مع إرسال النموذج
  const handleSubmit = e => {
    e.preventDefault(); // منع إعادة تحميل الصفحة
    setIsSubmitted(true); // تحديث الحالة لتظهر رسالة النجاح
  };
  const [isSubmittedd, setIsSubmittedd] = useState(false);

  // التعامل مع إرسال النموذج
  const handleSubmitedd = e => {
    e.preventDefault(); // منع إعادة تحميل الصفحة
    setIsSubmittedd(true); // تحديث الحالة لتظهر رسالة النجاح
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://phenomenal-apparel-b276e02b81.strapiapp.com/api/alskshn-althanies/?populate=*`,
        ); // تأكد من إضافة المعرف هنا
        const result = await response.json();
        setData(result.data); // تأكد من أن هذا يتوافق مع هيكل البيانات الذي يعود به Strapi
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    fetch('https://your-strapi-url/api/your-endpoint')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <HeroSlider />
      <div className="whatsapp-icon">
        <a
          href="https://wa.me/+966534811111"
          target="_blank"
          rel="noopener noreferrer">
          <img src={whatsappIcon} alt="WhatsApp" />
        </a>
      </div>
      <section className="about-section" id="about">
        <div className="content">
          {/* التأكد من وجود البيانات والتحقق من أنها مصفوفة */}
          {data && Array.isArray(data) && data.length > 0 ? (
            <div className="cards-container">
              {data.map((item, index) => (
                <div key={index} className="card">
                  <div className="card-image-container">
                    <img
                      src={item.imageUrl} // ربط الصورة من Strapi
                      alt={item.title1}
                      className="card-image"
                    />
                  </div>
                  <div className="card-content">
                    <h2>{item.title1}</h2> {/* ربط العنوان من Strapi */}
                    <p>{item.text1}</p> {/* ربط النص من Strapi */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>جارٍ تحميل البيانات...</p> // رسالة عند عدم وجود بيانات
          )}

          {/* زر "الملف التعريفي" */}
          <button className="download-btn">الملف التعريفي</button>
        </div>
      </section>

      <section className="contact-service" id="services">
        <ArabicCarousel />
      </section>
      <section className="contact-service2" id="projects">
        <ExactArabicProjectsCarousel />
      </section>
      <section className="stats-section">
        <div className="world-map">
          <img src={earth} alt="Earth Map" />
        </div>
        <div className="stats-content">
          <h2>
            سما الشرقية في <span>الأرقام</span>
          </h2>
          <p>
            نلتزم في سما الشرقية بالجودة الشفافية، والابتكار، مع تعزيز التعاون
            والاحترام في كل ما نقوم به.
          </p>
          <div className="stats">
            <StatItem number="150" label="مشروع" />
            <StatItem number="50" label="عميل راضٍ" />
            <StatItem number="700" label="مزاد" />
            <StatItem number="20" label="خدمة" />
          </div>
        </div>
      </section>
      <section className="customer-section">
        <img src={iiii} alt="Company Logo" className="customer" />
        <div className="sec-head">
          <img src={darklogo} alt="Company Logo" className="company-logo" />
          <h1 className="title3">عملائنا</h1>
        </div>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={2}
          centeredSlides={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          speed={1000}
          loop={true}
          allowTouchMove={true}
          freeMode={false}>
          {customerLogos.map(logo => (
            <SwiperSlide key={logo.id}>
              <img
                // Construct the full URL for the image
                src={`${logo.image.url}`}
                alt={logo.alt_text || 'Customer Logo'}
                style={{ maxWidth: '150px' }}
              />
            </SwiperSlide>
          ))}
          {/* Add more SwiperSlides as needed */}
        </Swiper>
      </section>
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="logo-container">
            <img src={whitelogo} alt="Logo" className="logo" />
          </div>
          {isSubmittedd ? (
            // عرض رسالة النجاح بعد تقديم النموذج
            <div className="success-message">
              <h2>تم الإرسال بنجاح!</h2>
              <p>شكراً لتواصلك معنا، سنرد عليك في أقرب وقت ممكن.</p>
            </div>
          ) : (
            // عرض النموذج قبل تقديمه
            <div className="contact-form">
              <h2>تواصل معنا</h2>
              <p>
                نلتزم في سما الشرقية بالجودة الشفافية، والابتكار، مع تعزيز
                التعاون والاحترام في كل ما نقوم به.
              </p>
              <form onSubmit={handleSubmitedd}>
                <div className="half-input">
                  <input type="text" placeholder="الاسم كامل" required />
                </div>
                <div className="half-input">
                  <input type="tel" placeholder="رقم التواصل" required />
                </div>
                <div className="half-input">
                  <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    required
                  />
                </div>
                <div className="half-input">
                  <input type="text" placeholder="الموضوع" required />
                </div>
                <div className="full-input">
                  <textarea placeholder="الرسالة" required></textarea>
                  <button type="submit">ارسل الآن</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
      <div className="newsletter-section">
        <div className="newsletter-container">
          {isSubmitted ? (
            // عرض رسالة نجاح الاشتراك بعد تقديم النموذج
            <div className="success-message">
              <h2>شكراً لاشتراكك!</h2>
              <p>لقد تم اشتراكك بنجاح في قائمتنا البريدية.</p>
            </div>
          ) : (
            // عرض النموذج العادي قبل تقديمه
            <>
              <div className="text-content">
                <h2>اشترك في القائمة البريدية</h2>
                <p>
                  لوريم إيبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على
                  العميل ليتصور طريقه وضع النصوص بالتصاميم سواء كانت تصاميم
                  مطبوعه...
                </p>
              </div>
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="email-input"
                  placeholder="اكتب بريدك الإلكتروني"
                  required
                />
                <button type="submit" className="subscribe-btn">
                  اشترك الآن
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
Homepage.propTypes = {
  number: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default Homepage;
