import { MapPin, Phone, Mail, Instagram, Twitter } from 'lucide-react';
import './Footer.scss';
import whitelogo from '/whitelogo.png';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch(
          'https://harmonious-memory-891ffc92a8.strapiapp.com/api/albyanats/?populate=*',
        );
        const responseData = await response.json();
        setData(responseData.data[0]); // استخدم "attributes" إذا كانت البيانات تحتوي عليها
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };

    fetchContactInfo();
  }, []);

  if (!data) {
    return <p>جارٍ تحميل البيانات...</p>; // نص تحميل
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left side - Contact and Map */}
        <div className="footer-left">
          {/* Contact Information */}
          <div className="footer-contact">
            <ul>
              <li>
                <span>{data.number || 'رقم الهاتف غير متوفر'}</span>
                <Phone size={40} />
              </li>
              <li>
                <span>{data.address || 'العنوان غير متوفر'}</span>
                <MapPin size={40} />
              </li>
              <li>
                <span>{data.email || 'البريد الإلكتروني غير متوفر'}</span>
                <Mail size={40} />
              </li>
            </ul>
          </div>

          {/* Map */}
          <div className="footer-map">
            <h2>: اعثر علينا</h2>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.7834610567624!2d50.1971144!3d26.2324716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEzJzU2LjkiTiA1MMKwMTEnNDkuNiJF!5e0!3m2!1sen!2sus!4v1625136069774!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"></iframe>
            </div>
          </div>
        </div>

        {/* Right side - Company Info */}
        <div className="footer-info">
          <img src={whitelogo} alt="Logo" className="logo" />
          <p className="description">
            هي وجهتك المثالية للعقارات في المنطقة الشرقية، حيث نقدم حلولاً
            عقارية مبتكرة تجمع بين الاحترافية والجودة. نلبي احتياجاتك بأعلى
            معايير الثقة والمصداقية.
          </p>
          <h3>: تابعنا على</h3>
          <div className="social-icons">
            <a
              href={data.instagram || 'https://www.instagram.com/smaeast/'}
              className="social-icon">
              <Instagram size={24} />
            </a>

            <a
              href={data.twitter || 'https://x.com/SmaEast'}
              className="social-icon">
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Sama Elsharqya co.</p>
      </div>
    </footer>
  );
};

export default Footer;
