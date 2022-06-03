import React from 'react';
export const Service = ({link, name, iconStyle}) => {
    return (
        <React.Fragment>
            <li>
                <a href={link} className="location">
                    <span className="span-loc">
                    <i className={`${iconStyle} service-icon`}/>{name}
                    </span>
                </a>
            </li>
        </React.Fragment>
    )
}
