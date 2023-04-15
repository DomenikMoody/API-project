import React from 'react';
import { FaStar } from "react-icons/fa";

const Star = ({ filled, onClick }) => {
  return (
    <FaStar
      color={filled ? '#ffc107' : '#e4e5e9'}
      onClick={onClick}
    />
  );
};

export default Star;
