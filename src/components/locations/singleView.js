import React from 'react';



export default class SingleLocationView extends React.Component {

  render() {  
    console.log(this.props) 
    const { location, locationAttributes, customer, customerAttributes } = this.props;
        const extraInfos = [];
    locationAttributes.forEach(attribute => {
      const value = location[attribute.value];
      if (value) {
        extraInfos.push(
          <div className="isoLocationCardInfos" key={attribute.value}>
            <p className="isoInfoLabel">{`${attribute.title}`}</p>
            <p className="isoInfoDetails">{value}</p>
          </div>,
        );
      }
    });
      const customerInfo = [];
    customerAttributes.forEach(attribute => {
      const value = customer[attribute.value];
      if(value) {
        customerInfo.push(
          <div className="isoLocationCardInfos" key={attribute.value}>
          <p className="isoInfoLabel">{`${attribute.title}`}</p>
          <p className="isoInfoDetails">{value}</p>
        </div>,
        )
      }
    })
    return (
      <div className="isoLocationCard">
        <div className="isoLocationCardHead">
          <div className="isoLocationImage">
            {<img alt="#" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Tom%27s_Restaurant%2C_NYC.jpg/220px-Tom%27s_Restaurant%2C_NYC.jpg"} />}
          </div>
          <h1 className="isoLocationName">{location.locationName}</h1>
        </div>
        <div className="isoLocationInfoWrapper">
          {extraInfos}
          {customerInfo}
        </div>
      </div>
    );
  }
}

