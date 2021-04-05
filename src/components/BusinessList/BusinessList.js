import React from 'react';
import { Business } from '../Business/Business';
import './BusinessList.css'

export class BusinessList extends React.Component{
    render(){
        return(
            <div className="businessList-container">
                {this.props.businesses ? this.props.businesses.map((business) => {
                    return <Business businessid={business.id} businessname={business.name} 
                    businessrating={business.rating} 
                    businessprice={business.price} businessrcount={business.reviewCount} 
                    businessloc={business.city} 
                    businesspic={business.imageSrc} businesstitle={business.category} businessurl={business.url}/>
                }) : <div>Sorry we could not find anything that matches this request. Please try again.</div>}
            </div>
        )
    }
}