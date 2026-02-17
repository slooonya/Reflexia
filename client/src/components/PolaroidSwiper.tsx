import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards } from 'swiper/modules';
import { Polaroid } from './Polaroid';

import './PolaroidSwiper.css';
import TestImage1 from '../assets/images/test-image.png';
import TestImage2 from '../assets/images/test-image2.jpg';
import TestImage3 from '../assets/images/test-image3.png';
import TestImage4 from '../assets/images/test-image4.png';
import TestImage5 from '../assets/images/test-image5.png';

export function PolaroidSwiper() {
  const cards = [
    { src: TestImage1, caption: "Jan. 26 - Feb. 1" },
    { src: TestImage2, caption: "Mar. 23 - Mar. 29" },
    { src: TestImage3, caption: "May 11 - May 17" },
    { src: TestImage4, caption: "Jul. 27 - Aug. 2" },
    { src: TestImage5, caption: "Oct. 19 - Oct. 25" }
  ];

  return (
    <Swiper effect="cards" grabCursor modules={[EffectCards, Autoplay]} autoplay={{ delay: 2500 }} className="auth-swiper"
      cardsEffect={{
        perSlideOffset: 18,
        perSlideRotate: 7,
      }}
    >
      {cards.map((card, i) => (
        <SwiperSlide key={i}>
          <Polaroid imageSrc={card.src} caption={card.caption} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}