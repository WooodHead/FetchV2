import React from 'react';
import { gql, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import LayoutWrapper from '../../components/utility/layoutWrapper';
import PageHeader from '../../components/utility/pageHeader';
import moment from 'moment';
import FlipMove from 'react-flip-move';
import IntlMessages from '../../components/utility/intlMessages';

class ListItem extends React.Component {
  
  render() {
    
    const listClass = `isoSingleCard card ${this.props.view}`;
    const style = { zIndex: 100 - this.props.index };

    return (
      
        <li id={this.props.id} className={listClass} style={style}>
          <div className="isoCardImage">
            <Link to={`/dashboard/trucks/${this.props.id}`}>
              <img alt="#" src={process.env.PUBLIC_URL + this.props.image} />
            </Link>
          </div>
          <div className="isoCardContent">
            <h3 className="isoCardTitle">
              {this.props.name}
            </h3>
            <span className="isoCardDate">
              {moment(this.props.createdAt).format('MMM Do, YYYY')}
            </span>
          </div>
        </li>


    );
  }
}

class Trucks extends React.Component {
  constructor(props) {
    super(props);

    const trucks = this.props.data.allTrucks;

    this.state = {
      removedArticles: [],
      view: 'grid',
      order: 'asc',
      sortingMethod: 'chronological',
      enterLeaveAnimation: 'accordionVertical',
      trucks
    };

    this.toggleList = this.toggleList.bind(this);
    this.toggleGrid = this.toggleGrid.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
  }

  toggleList() {
    this.setState({
      view: 'list',
      enterLeaveAnimation: 'accordionVertical'
    });
  }

  toggleGrid() {
    this.setState({
      view: 'grid',
      enterLeaveAnimation: 'accordionHorizontal'
    });
  }

  toggleSort() {
    const sortAsc = (a, b) => a.createdAt - b.createdAt;
    const sortDesc = (a, b) => b.createdAt - a.createdAt;

    this.setState({
      order: this.state.order === 'asc' ? 'desc' : 'asc',
      sortingMethod: 'chronological',
      trucks: this.state.trucks.sort(
        this.state.order === 'asc' ? sortDesc : sortAsc
      )
    });
  }

  render() {
    if(this.props.data.loading) {
      return(
        <div>Loading...</div>
      )

    }
    console.log(this.props.data)
    return (
      <LayoutWrapper className="isomorphicTrucks" style={{ background: "none" }}>
        <PageHeader><IntlMessages id="trucks.index" /></PageHeader>
          <div id="shuffle" className={`isomorphicSortableCardsHolder ${this.state.view}`}>
            <div className="isoSortableCardsContainer">
              <FlipMove
                staggerDurationBy="30"
                duration={500}
                enterAnimation={this.state.enterLeaveAnimation}
                leaveAnimation={this.state.enterLeaveAnimation}
                typeName="ul"
              >
              {this.props.data.allTrucks.map((truck, i) => {
                return (
                  <ListItem
                    key={truck.id}
                    view={this.state.view}
                    index={i}
                    {...truck}
                  />
                );
              })}
              </FlipMove>
            </div>
          </div>
    </LayoutWrapper>    
    );
  }
}

const AllTrucksQuery = gql`
query {
  allTrucks{
    id
    image
    name
    createdAt
    updatedAt
  }
}
`;

export default graphql(AllTrucksQuery)(Trucks);
