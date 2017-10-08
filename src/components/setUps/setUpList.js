import React from 'react';
import { Link } from 'react-router-dom'
import Input from '../uielements/input';
import DeleteButton from './deleteButton';
import { PropTypes } from "prop-types";

const Search = Input.Search;

function filterSetUps(setUps, search) {
  search = search.toUpperCase();
  return search
    ? setUps.filter(setUp => setUp.service.location.locationName.toUpperCase().includes(search))
    : setUps;
}

export default class PendingSetUpList extends React.Component {
  constructor(props) {
    super(props);
    this.singleSetUp = this.singleSetUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      search: '',
    };
  }
  singleSetUp(setUp) {
    const { selectedId, deleteSetUp } = this.props;
    const activeClass = selectedId === setUp.id ? 'active' : '';
    //const onChange = () => changeLocation(location.id);
    return (
      <div
        key={setUp.id}
        className={`${activeClass} isoSingleSetUp`}
        
      >
      <Link to={`/dashboard/setups/${setUp.oilService.service.setUpService.id}`} >
        <div className="isoSetUpName">
          <h3>{`${setUp.oilService.service.location.locationName}` ? `${setUp.oilService.service.location.locationName}` : 'No Name'}</h3>
          <h4>{setUp.oilService.service.location.city}, {setUp.oilService.service.location.state}</h4>
        </div>
      </Link>
        
        <DeleteButton deleteSetUp={deleteSetUp} setUp={setUp} />
      </div>
    );
  }
  onChange(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    const { search } = this.state;
    const setUps = filterSetUps(this.props.setUps, search); 
    return(
      <div className="isoSetUpListWrapper">
        <Search
          placeholder={this.context.intl.formatMessage({id:"setUpPage.searchLocations"})}
          value={search}
          onChange={this.onChange}
          className="isoSearchBar"
        />
        {setUps && setUps.length > 0
          ? <div className="isoSetUpList">
              {setUps.map(setUp => this.singleSetUp(setUp))}
            </div>
          : 'No Location with that name found...'}
      </div>
    )
  }
}

PendingSetUpList.contextTypes ={
  intl: PropTypes.object.isRequired
 }