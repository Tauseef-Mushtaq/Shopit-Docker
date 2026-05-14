import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text }) => {
  return (
    <div className='d-flex align-items-center'>
      <div className='text-warning me-2'>
        {[1, 2, 3, 4, 5].map((star) => {
          if (value >= star) return <FaStar key={star} />;
          if (value >= star - 0.5) return <FaStarHalfAlt key={star} />;
          return <FaRegStar key={star} />;
        })}
      </div>

      {text && <small className='text-muted'>{text}</small>}
    </div>
  );
};

export default Rating;
