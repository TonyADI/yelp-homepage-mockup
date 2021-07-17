import React from 'react';
import { BusinessList } from '../BusinessList/BusinessList';
import { SearchBar } from '../SearchBar/SearchBar'
import { Yelp } from '../../utilities/Yelp';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {businesses:[], termsList:[], hotBusinesses:[], longitude: '',
     latitude: ''}
    this.yelpSearch = this.yelpSearch.bind(this)
    this.yelpAutocomplete = this.yelpAutocomplete.bind(this)
  }

  yelpSearch(term, location){
    Yelp.search(term, location).then(businesses => {this.setState({businesses:
      businesses})});
  }

  yelpAutocomplete(term){
    Yelp.autocomplete(term).then(terms => {this.setState({termsList: terms})});
  }

  componentDidMount(){
    let longitude = '';
    let latitude = '';
    navigator.geolocation.getCurrentPosition((position) => {
        longitude = position.coords.longitude; 
        latitude = position.coords.latitude;
        Yelp.sortBy(longitude, latitude, 3, 'rating').then(businesses => 
          {this.setState({hotBusinesses: businesses})});
        this.setState({longitude: longitude, latitude: latitude});
    });
  }

  render(){
    return (
      <div className="App-body">
        <div className="hero-background">
          <div className="overlay">
          <div className="vertical-center">
            <div>
              <img id="yelp-logo" alt="yelp logo"
              src="https://s3-media0.fl.yelpcdn.com/assets/public/default@2x.yji-3e0b6fdd67576efda4390daddc35c8f1.png"/>
            </div>
            <div><SearchBar yelpSearch={this.yelpSearch} yelpAutocomplete={this.yelpAutocomplete} 
            termsList={this.state.termsList} latitude={this.state.latitude} 
            longitude={this.state.longitude}/></div>
            <div id="service-type-container">
              <ul>
                <li>
                  <a href='https://www.yelp.ca/search?cflt=restaurants' className='service-type-link'>
                  <span className="service-type"><i className="fas fa-hamburger 
                  service-icon"/>Restaurants</span></a>
                </li>
                <li>
                  <a href='https://www.yelp.ca/search?cflt=nightlife' className='service-type-link'>
                  <span className="service-type"><i className="fa fa-glass 
                  service-icon"/>Nightlife</span></a>
                </li>
                <li>
                  <span className="service-type"><i className="fa fa-wrench 
                  service-icon"/>Local Services</span> 
                </li>
                <li> 
                  <a href='https://www.yelp.ca/search?find_desc=Delivery' className='service-type-link'>
                  <span className="service-type"><i className="fa fa-bicycle 
                  service-icon"/>Delivery</span></a>
                </li>
                <li>
                  <span className="service-type"><i className="fa fa-home 
                  service-icon"/>Black Owned</span>
                </li>
              </ul>
            </div>
            <div className="photo-creds">
              <div><span><b><a href="https://unsplash.com/photos/N_Y88TWmGwA" 
              className="photo-creds-details">
                Gourmet Meal and White Wine</a></b></span></div>
              <div><span>Photo by <b><a href="https://unsplash.com/@jaywennington" 
              className="photo-creds-details">
                Jay Wennington</a></b></span></div>
            </div>
          </div>
          </div>
        </div>
        <div className="section">
          <div><h3 className="yelp-color">Welp Toronto</h3></div>
          <div className="locations">
            <ul>
              <li><a href='https://www.yelp.ca/richmond-hill' className="location">
                <span className="span-loc">Richmond Hill</span></a></li>
              <li><a href='https://www.yelp.ca/vancouver' className="location">
                <span className="span-loc">Vancouver</span></a></li>
              <li><a href='https://www.yelp.ca/calgary' className="location">
                <span className="span-loc">Calgary</span></a></li>
              <li><a href='https://www.yelp.ca/edmonton' className="location">
                <span className="span-loc">Edmonton</span></a></li>
              <li><a href='https://www.yelp.ca/halifax' className="location">
                <span className="span-loc">Halifax</span></a></li>
              <li><a href='https://www.yelp.ca/montreal' className="location">
                <span className="span-loc">Montreal</span></a></li>
              <li><a href='https://www.yelp.ca/locations' className="location">
                <span className="span-loc">More Cities</span></a></li>
            </ul>
          </div>
        </div>
        <div className="article">
          <div><h4 className="yelp-color">Hot {'&'} New Businesses</h4></div>
          <div>
            {this.state.hotBusinesses ? <BusinessList businesses={this.state.hotBusinesses}/> :
            'Loading...'}
          </div>
          <div>
            <h4 className="yelp-color">Search Results</h4>
            <BusinessList businesses={this.state.businesses}/>
            </div>
        </div>
      </div>
    );
  }
}

export default App;