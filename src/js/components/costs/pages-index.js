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
import PetHoc from './pet/PetHoc';

export default {
    apartment: <HomeHoc />,
    bbq: <BbqHoc />,
    books: <BooksHoc />,
    car: <CarHoc />,
    cat: <PetHoc />,
    clothes: <ClothesHoc />,
    dog: <PetHoc />,
    desktop: <ComputerHoc />,
    computer: <ComputerHoc />,
    cup: <CupHoc />,
    home: <HomeHoc />,
    hamster: <PetHoc />,
    iphone: <ComputerHoc />,
    furniture: <FurnitureHoc />,
    laptop: <ComputerHoc />,
    pet: <PetHoc />,
    tablet: <ComputerHoc />,
};
