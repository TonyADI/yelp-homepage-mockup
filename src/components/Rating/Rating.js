import React from 'react';
import './Rating.css'

export class Rating extends React.Component{
    constructor(props){
        super(props);
        this.rating = this.rating.bind(this)
    }

    rating(value){
       if((this.props.rating - value) === 0.5){
            return {background: 
                `linear-gradient(to right, ${this.props.rating > 4 ? '#ff523d' :'#ff9242'}
                 50%, rgb(206, 201, 201) 0%)`};
           }
       else if(this.props.rating > value){
            return {backgroundColor: this.props.rating >= 4 ? '#ff523d' : '#ff9242'};
       }
    }

    render(){
        return(
            <div className='rating-container'>
                <div className='box' style={this.rating(0)}>
                    <span className="fa fa-star star"></span></div>
                <div className='box' style={this.rating(1)}>
                    <span className="fa fa-star star"></span></div>
                <div className='box' style={this.rating(2)}>
                    <span className="fa fa-star star"></span></div>
                <div className='box' style={this.rating(3)}>
                    <span className="fa fa-star star"></span></div>
                <div className='box' style={this.rating(4)}>
                    <span className="fa fa-star star"></span></div>
            </div>
        )
    }
}