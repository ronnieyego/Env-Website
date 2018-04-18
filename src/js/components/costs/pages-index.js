import React from 'react';

import BooksHoc from './books/BooksHoc';
import BbqHoc from './bbq/BbqHoc';
import CarHoc from './car/CarHoc';
import ClothesHoc from './clothes/ClothesHoc';
import ComputerHoc from './computer/ComputerHoc';
import CupHoc from './cup/CupHoc';
import FurnitureHoc from './furniture/FurnitureHoc';
import HomeHoc from './home/HomeHoc';
import TabletHoc from './tablet/TabletHoc';

export default {
    apartment: <HomeHoc />,
    bbq: <BbqHoc />,
    books: <BooksHoc />,
    car: <CarHoc />,
    clothes: <ClothesHoc />,
    computer: <ComputerHoc />,
    cup: <CupHoc />,
    home: <HomeHoc />,
    furniture: <FurnitureHoc />,
    galaxy: <TabletHoc />,
    tablet: <TabletHoc />
};
