import { useEffect, useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Swiper2.scss';
import whitelogo from '/whitelogo.png';

function ExactArabicProjectsCarousel() {
  const [upcomingProjects, setUpcomingProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const navigate = useNavigate();

  const handleCardClick = useCallback(
    (id, isCompleted, projectData) => {
      navigate(`/projects/${id}`, { state: { projectData, isCompleted } });
    },
    [navigate],
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const upcomingResponse = await axios.get(
          'https://phenomenal-apparel-b276e02b81.strapiapp.com/api/upcoming-projects?populate=*',
        );
        setUpcomingProjects(upcomingResponse.data.data);

        const completedResponse = await axios.get(
          'https://phenomenal-apparel-b276e02b81.strapiapp.com/api/completed-projects?populate=*',
        );
        setCompletedProjects(completedResponse.data.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="exact-arabic-projects-carousel">
      <div className="decorative-pattern"></div>
      <div className="carousel-header">
        <div className="tab-switch">
          <button
            className={activeTab === 'completed' ? 'active' : ''}
            onClick={() => setActiveTab('completed')}>
            مشاريعنا المكتملة
          </button>
          <button
            className={activeTab === 'upcoming' ? 'active' : ''}
            onClick={() => setActiveTab('upcoming')}>
            مشاريعنا القادمة
          </button>
        </div>
      </div>
      <div className="main-content">
        <div className="side-content">
          <img src={whitelogo} alt="Company Logo" className="company-logo" />
          <h2>نقدم لك تجربة مميزة وفريدة من نوعها لضمان راحتك</h2>
        </div>
        <div className="carousel-container">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{ clickable: true, el: '.swiper-pagination' }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            dir="rtl">
            {(activeTab === 'upcoming'
              ? upcomingProjects
              : completedProjects
            ).map((item, index) => (
              <SwiperSlide key={`${item.id}-${index}`}>
                <div
                  className="carousel-item"
                  onClick={() =>
                    handleCardClick(item.id, activeTab === 'completed', item)
                  }>
                  <div className="image-container">
                    {item.images && item.images.length > 0 && (
                      <img
                        src={`${item.images[0].url}`} // تأكد من استدعاء الصورة الأولى فقط
                        alt={item.title}
                      />
                    )}
                    <div className="overlay">
                      <h3>{item.title || 'عنوان غير متوفر'}</h3>
                      <span className="view-details">
                        استكشف تفاصيل المشروع &larr;
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-navigation">
            <div className="swiper-pagination"></div>
          </div>
          <div className="swiper-button-container1">
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExactArabicProjectsCarousel;
