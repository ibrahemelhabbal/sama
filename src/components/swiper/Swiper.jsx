import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';
import './Swiper.scss';

function ArabicCarousel() {
  const [carouselItems, setCarouselItems] = useState([]);
  const navigate = useNavigate(); // استخدام useNavigate

  // Fetch data from Strapi API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://credible-frogs-c0463567d4.strapiapp.com/api/first-swipers?populate=*',
        );
        setCarouselItems(response.data.data); // Assuming data is in the format { data: [...] }
      } catch (error) {
        console.error('Error fetching carousel items:', error);
      }
    };
    fetchData();
  }, []);

  // Function to handle card click
  const handleCardClick = item => {
    navigate(`/services/${item.id}`, { state: item });
  };

  return (
    <div className="arabic-carousel">
      <div className="carousel-content">
        <div className="text-contentt">
          <h2>خدماتنا</h2>
          <p>
            نلتزم في سما الشرقية بالجودة الشاملة والابتكار مع تعزيز التعاون
            والاحترام في كل ما نقوم به
          </p>
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
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
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          dir="rtl">
          {carouselItems.map(item => {
            const title = item.title || 'عنوان غير متوفر';
            const imageUrl = item.images[0]?.url;

            return (
              <SwiperSlide key={item.id}>
                <div
                  className="carousel-item"
                  onClick={() => handleCardClick(item)}
                  style={{ cursor: 'pointer' }}>
                  <div className="image-container">
                    {imageUrl ? (
                      <img src={`${imageUrl}`} alt={title} />
                    ) : (
                      <p>لا توجد صورة متاحة</p>
                    )}
                    <div className="overlay">
                      <h3>{title}</h3>
                      <span className="view-details">
                        استكشف تفاصيل المشروع &larr;
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="swiper-button-container2">
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
      </div>
    </div>
  );
}

export default ArabicCarousel;
