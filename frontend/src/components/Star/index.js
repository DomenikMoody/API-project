import React from 'react';
import { FaStar } from "react-icons/fa";

const Star = ({ filled, onClick }) => {
  return (
    <FaStar
      color={filled ? '#ffc107' : '#5A5A5A'}
      onClick={onClick}
    />
  );
};

export default Star;
