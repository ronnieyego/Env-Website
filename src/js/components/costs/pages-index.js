import React from 'react';

import BooksHoc from './books/BooksHoc';
import BbqHoc from './bbq/BbqHoc';
import CarHoc from './car/CarHoc';
import ClothesHoc from './clothes/ClothesHoc';
import CupHoc from './cup/CupHoc';
import FurnitureHoc from './furniture/FurnitureHoc';

export default {
    books: <BooksHoc />,
    bbq: <BbqHoc />,
    car: <CarHoc />,
    clothes: <ClothesHoc />,
    cup: <CupHoc />,
    furniture: <FurnitureHoc />
};
