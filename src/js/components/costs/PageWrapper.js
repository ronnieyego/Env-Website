import React from "react";
import PropTypes from 'prop-types'

import Header from '../Header';

import BooksHoc from './books/BooksHoc';
import BbqHoc from './bbq/BbqHoc';
import CarHoc from './car/CarHoc';
import ClothesHoc from './clothes/ClothesHoc';
import CupHoc from './cup/CupHoc';


export default class PageWrapper extends React.Component {

    static propTypes = {
        page: PropTypes.string.isRequired
    }

	render() {
        let page;
        switch(this.props.page) {
           
            case 'books': 
                page = <BooksHoc />
                break;
            case 'bbq':
                page = <BbqHoc />;
                break;
            case 'car':
                page = <CarHoc />;
                break;
            case 'clothes':
                page = <ClothesHoc />;
                break;
            case 'cup':
                page = <CupHoc />;
                break;
        }

		return (
            <div>
                <Header />
                <div className="costs-page">
                    {page}
                </div>
                <br />
                <br />
                <br />
            </div>
		);
	}
}


