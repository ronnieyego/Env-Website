import React from 'react';
import { string } from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import { BLUE_GRAY_FACEBOOK } from '../../utils/shared-styles/colors';
import {
    ShareButtons,
    //ShareCounts,
    generateShareIcon
  } from 'react-share';


const { FacebookShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');

export default class FacebookShare extends React.Component {
    static propTypes = {
        id: string,
        displayText: string
    };

	render() {
        return (
            <FacebookShareButton url={`http://www.footprint-finder.com/footprint/${this.props.id}`} quote="Do you contribute more to global warming than me?">
                <FlatButton 
                    backgroundColor={BLUE_GRAY_FACEBOOK}
                    style={{ borderRadius: '1rem', overflow: 'visible' }}
                    label="See if your footprint is smaller than your friend's."
                    labelStyle={{ verticalAlign: 'top', color: 'white', textTransform: 'none' }}
                >
                    <div className="results-changer-facebook-button">
                        <FacebookIcon round={true} size={30} />
                    </div>
                </FlatButton>
            </FacebookShareButton>
        );
    }
}
