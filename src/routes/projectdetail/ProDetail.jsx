import { useEffect, useState } from 'react';
import axios from 'axios';
import './ProDetail.scss';
import route2 from '/route2.jpeg';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { useLocation, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';

function ProDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [projectData, setProjectData] = useState(
    location.state?.projectData || null,
  );

  useEffect(() => {
    if (!projectData) {
      const fetchProject = async () => {
        try {
          const apiEndpoint = location.state?.isCompleted
            ? `http://localhost:1337/api/completed-projects/${id}?populate=*`
            : `http://localhost:1337/api/upcoming-projects/${id}?populate=*`;

          const response = await axios.get(apiEndpoint);
          setProjectData(response.data.data);
        } catch (error) {
          console.error('Error fetching project:', error);
        }
      };
      fetchProject();
    }
  }, [id, projectData, location.state]);

  if (!projectData) {
    return <p>Loading...</p>;
  }

  const { title, desc, images } = projectData;

  return (
    <div>
      <div className="service-details">
        <Navbar />
        <div className="service-header">
          <img src={route2} alt="route2" />
          <h1>تفاصيل المشروع</h1>
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

export default ProDetail;
