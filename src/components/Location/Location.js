import React from 'react';
export const Location = ({link, name}) => {
    return (
        <React.Fragment>
            <li><a href={link} className="location">
                <span className="span-loc">{name}</span></a></li>
        </React.Fragment>
    )
}
