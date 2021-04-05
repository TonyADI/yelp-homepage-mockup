import React from 'react';
import { Rating } from '../Rating/Rating'
import './Business.css';

export class Business extends React.Component{
    render(){
        return(
            <div className="business-container"> 
                <div className="business-image">
                    <a href={this.props.businessurl}><img src={this.props.businesspic} alt='' className="image"></img></a>
                </div>
                <div className="business-details">
                    <div><h4 className='zero-margin'><a className="business-name" href={this.props.businessurl}>
                        {this.props.businessname}</a></h4></div> 
                    <div><Rating rating={this.props.businessrating}/> {this.props.businessrcount} review
                    {this.props.businessrcount !== 1 ? 's': ''}</div>
                    <div>{this.props.businesstitle.map((category)=>{
                        return <span>{category.title} </span>
                    })}</div>
                    <div>{this.props.businessloc}</div>
                    <div></div>
                </div>
            </div>
        )
    }
}