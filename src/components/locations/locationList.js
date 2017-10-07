import React from 'react';
import { Link } from 'react-router-dom'
import Input from '../uielements/input';
import DeleteButton from './deleteButton';
import { PropTypes } from "prop-types";

const Search = Input.Search;

function filterLocations(locations, search) {
  search = search.toUpperCase();
  return search
    ? locations.filter(location => location.locationName.toUpperCase().includes(search))
    : locations;
}

export default class LocationList extends React.Component {
  constructor(props) {
    super(props);
    this.singleLocation = this.singleLocation.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      search: '',
    };
  }
  singleLocation(location) {
    const { selectedId, deleteLocation } = this.props;
    const activeClass = selectedId === location.id ? 'active' : '';
    //const onChange = () => changeLocation(location.id);
    return (
      <div
        key={location.id}
        className={`${activeClass} isoSingleLocation`}
        
      >
      <Link to={`/dashboard/locations/${location.id}`} >
        <div className="isoLocationName">
          <h3>{`${location.locationName}` ? `${location.locationName}` : 'No Name'}</h3>
          <h4>{location.city}, {location.state}</h4>
        </div>
      </Link>
        
        <DeleteButton deleteLocation={deleteLocation} location={location} />
      </div>
    );
  }
  onChange(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    const { search } = this.state;
    const locations = filterLocations(this.props.locations, search);    
    return(
      <div className="isoLocationListWrapper">
        <Search
          placeholder={this.context.intl.formatMessage({id:"locationlist.searchLocations"})}
          value={search}
          onChange={this.onChange}
          className="isoSearchBar"
        />
        {locations && locations.length > 0
          ? <div className="isoLocationList">
              {locations.map(location => this.singleLocation(location))}
            </div>
          : 'No Location with that name found...'}
      </div>
    )
  }
}

LocationList.contextTypes ={
  intl: PropTypes.object.isRequired
 }