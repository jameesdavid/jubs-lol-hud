import React from 'react';
import cx from 'classnames';

import banImgBlue from "../assets/banblue.svg";
import banImgRed from "../assets/banred.svg";

import css from './style/index.module.scss';

const Bans = props => (
    <div className={cx(css.Ban)}>
        <div style={{backgroundImage: 'url('+props.champion.squareImg+')'}} className={cx(css.BanImage, {
            [css.Active]: props.isActive
        })}>
            
            <img src={props.side === 'blue' ? banImgBlue : banImgRed} alt="" />
        </div>
    </div>
);

export default Bans;
