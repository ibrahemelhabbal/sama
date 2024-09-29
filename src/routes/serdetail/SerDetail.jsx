import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './SerDetail.scss';
import route1 from '/route1.jpeg';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';

function SerDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [serviceData, setServiceData] = useState(location.state || null);

  useEffect(() => {
    if (!serviceData) {
      const fetchData = async () => {
        try {
          const apiUrl = `http://localhost:1337/api/first-swipers/${id}?populate=*`;
          const response = await axios.get(apiUrl);
          console.log(response.data); // للتحقق من هيكل البيانات
          setServiceData(response.data.data);
        } catch (error) {
          console.error('Error fetching service details:', error);
        }
      };
      fetchData();
    }
  }, [id, serviceData]);

  if (!serviceData) {
    return <p>Loading...</p>;
  }

  // استدعاء title وdesc وimages هنا
  const { title, desc, images } = serviceData;

  return (
    <div>
      <div className="service-details">
        <Navbar />
        <div className="service-header">
          <img src={route1} alt="route1" />
          <h1>تفاصيل الخدمه</h1>
        </div>
        <div className="sec-service">
          <h1>{title}</h1>

          {/* Slider section */}
          {images && images.length > 0 ? (
            <Swiper
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
              className="mySwiper"
              spaceBetween={30}
              slidesPerView={1}
              loop={true}>
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    className="swiper-image"
                    src={`http://localhost:1337${image.url}`}
                    alt={`Slide ${index}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p>No images available</p>
          )}

          <p>{desc}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SerDetail;
