import React from 'react';


export default class SingleSetUpView extends React.Component {

  render() {   
    const { location, setUp, locationAttributes } = this.props;
    const name = `${setUp.service.location.locationName}`;
        const extraInfos = [];
    locationAttributes.forEach(attribute => {
      const value = location[attribute.value];
      if (value) {
        extraInfos.push(
          <div className="isoSetUpCardInfos" key={attribute.value}>
            <p className="isoInfoLabel">{`${attribute.title}`}</p>
            <p className="isoInfoDetails">{value}</p>
          </div>,
        );
      }
    });
    return (
      <div className="isoSetUpCard">
        <div className="isoSetUpCardHead">
          <div className="isoSetUpImage">
            {<img alt="#" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Tom%27s_Restaurant%2C_NYC.jpg/220px-Tom%27s_Restaurant%2C_NYC.jpg"} /> }
          </div>
          <h1 className="isoSetUpName">{name}</h1>
        </div>
        <div className="isoSetUpInfoWrapper">
          {extraInfos}
        </div>
      </div>
    );
  }
}
