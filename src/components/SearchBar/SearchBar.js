import React from 'react';
import { locationIQ } from '../../utilities/LocationIQ';
import './SearchBar.css';

export class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {term:'', location:'', termDisplay:'', locationDisplay: ''};
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTermClick= this.handleTermClick.bind(this);
        this.handleLocationClick = this.handleLocationClick.bind(this);
        this.reverseGeocoding = this.reverseGeocoding.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    handleChange(e){
        switch(e.target.name){
            case 'term':
                this.setState({term:e.target.value, termDisplay:'block'})
                this.props.yelpAutocomplete(e.target.value);
              break;
            case 'location':
                this.setState({location: e.target.value})
              break;
            default:
              console.log('Error!');
          }
    }
    
    handleSearch(e){
        this.props.yelpSearch(this.state.term, this.state.location);
        e.preventDefault();
    }

    handleTermClick(e){
        this.setState({term: e.target.value, termDisplay: 'none'})
    }

    handleLocationClick(){
        this.reverseGeocoding(this.props.longitude, this.props.latitude)
        this.setState({locationDisplay: 'none'});
    }

    reverseGeocoding(long, lat){
        if(long && lat){
            locationIQ.reverse(long, lat).then(city => {this.setState({location: city})}, 
            error => console.log(error));
        }
        else{
            alert("You need to grant acess to your location.")
        }
    }

    handleClick(event){
          if(event.target.nodeName !== 'BUTTON'){
              this.setState({termDisplay: 'none', locationDisplay: 'none'})
          }
        
    }

    handleFocus(e){
        switch(e.target.name){
            case 'term':
                this.setState({termDisplay: 'block'})
                break;
            case 'location':
                this.setState({locationDisplay: 'block'});
                break;
            default:
                console.log('There was an error.');

        }
    }

    componentDidMount(){
        document.addEventListener('mousedown', this.handleClick);
    }

    componentDidUpdate(prevProps){
        if(this.props.latitude !== prevProps.latitude){
            this.reverseGeocoding(this.props.longitude, this.props.latitude);
        }
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSearch}>
                    <label className="label-background">
                    <div className="input-container">
                        <span className="span-background">Find</span>
                        <input type='text' name='term' placeholder='burgers, barbers, spas, handymen...' 
                        className="input-background"
                        onChange={this.handleChange} value={this.state.term} onFocus={this.handleFocus}/>
                        {!this.state.term && 
                            <div className="dropdown" style={{display: this.state.termDisplay}}>
                            <ul>
                                <li><button className="dropdown-item" onClick={this.handleTermClick} value="Restaurants">
                                    <i className="fas fa-hamburger icon"></i>Restaurants</button></li>
                                <li><button className="dropdown-item" onClick={this.handleTermClick} value="Delivery">
                                    <i className="fas fa-truck icon"></i>Delivery</button></li>
                                <li><button className="dropdown-item" onClick={this.handleTermClick} value="Takeout">
                                    <i className="fas fa-shopping-bag icon"></i>Takeout</button></li>
                                <li><button className="dropdown-item" onClick={this.handleTermClick} value="Accountants">
                                    <i className="fas fa-calculator icon"></i>Accountants</button></li>
                                <li><button className="dropdown-item" onClick={this.handleTermClick} value="Plumbers">
                                    <i className="fa fa-bath icon"></i>Plumbers</button></li>
                                <li><button className="dropdown-item" onClick={this.handleTermClick} value="Auto Repair">
                                    <i className="fa fa-wrench icon"></i>Auto Repair</button></li>
                            </ul>
                            </div>
                        }
                        <div className="dropdown" style={{display: this.state.termDisplay}}>
                            <ul>
                            {(this.props.termsList && this.state.term) ? this.props.termsList.map((text)=>{
                                return <li><button className="dropdown-item" onClick={this.handleTermClick}
                                value={text.term}
                                >{text.term}</button></li>
                            }) : null}
                            </ul>
                        </div>
                    </div>
                    <div className="input-container">
                        <span className="span-background near-span">Near</span>
                        <input type='text' value={this.state.location} name='location' placeholder='address, city...' className="input-background" 
                        onChange={this.handleChange} onFocus={this.handleFocus}/>
                        <div className="dropdown dropdown-location" style={{display: this.state.locationDisplay}}>
                            <button className="dropdown-item" onClick={this.handleLocationClick}>
                                <i className="fa fa-location-arrow icon">
                                </i>Current Location</button>
                        </div>
                    </div>
                        <button type="submit" className="submit-button"><i className="fa fa-search search"></i></button>
                    </label>
                </form>
            </div>
        )
    }
}