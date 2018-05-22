import React from 'react';

import BbqHoc from './bbq/BbqHoc';
import BitcoinHoc from './bitcoin/BitcoinHoc';
import BooksHoc from './books/BooksHoc';
import CarHoc from './car/CarHoc';
import ClothesHoc from './clothes/ClothesHoc';
import ComputerHoc from './computer/ComputerHoc';
import CupHoc from './cup/CupHoc';
import FurnitureHoc from './furniture/FurnitureHoc';
import HomeHoc from './home/HomeHoc';
import PetHoc from './pet/PetHoc';
import TabletHoc from './tablet/TabletHoc';
import TvHoc from './tv/TvHoc';


export default {
    apartment: <HomeHoc />,
    bbq: <BbqHoc />,
    bitcoin: <BitcoinHoc />,
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
    tv: <TvHoc />,
};