import { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SerDetail.scss';

export default function SerDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [serviceData, setServiceData] = useState(location.state || null);

  useEffect(() => {
    if (!serviceData) {
      const fetchData = async () => {
        try {
          const apiUrl = `https://harmonious-memory-891ffc92a8.strapiapp.com/${id}?populate=*`;
          const response = await axios.get(apiUrl);
          setServiceData(response.data.data);
        } catch (error) {
          console.error('Error fetching service details:', error);
        }
      };
      fetchData();
    }
  }, [id, serviceData]);

  if (!serviceData) {
    return <p className="loading">Loading...</p>;
  }

  const { title, desc, images } = serviceData;

  return (
    <div className="service-details">
      <Navbar />
      <div className="service-header">
        <img src="/route1.jpeg" alt="Service header background" />
        <h1>تفاصيل الخدمه</h1>
      </div>
      <div className="sec-service">
        <Link to="/" className="service-title">
          <h2>{title}&rarr;</h2>
        </Link>
        {images && images.length > 0 ? (
          <Swiper
            pagination={{ clickable: true }}
            navigation
            modules={[Navigation, Pagination]}
            className="mySwiper"
            spaceBetween={30}
            slidesPerView={1}
            loop={true}>
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="swiper-image-container">
                  <img
                    src={`${image.url}`}
                    alt={`Service image ${index + 1}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="no-images">No images available</p>
        )}
        <p className="service-description">{desc}</p>
      </div>
      <Footer />
    </div>
  );
}
