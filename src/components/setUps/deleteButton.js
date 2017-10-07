import React from 'react';
import Popconfirm from '../feedback/popconfirm';
import Button from '../uielements/button';
import notification from '../notification';

export default class DeleteButton extends React.Component {
  render() {
    const { setUp, deleteSetUp } = this.props;
    let name = '';
    if (setUp.oilService.service.location.locationName) {
      name = `${setUp.oilService.service.location.locationName} `;
    }
    if (!name) {
      name = 'No Name';
    }
    return (
      <Popconfirm
        title={`Sure to delete ${name} Set Up?`}
        okText="DELETE"
        cancelText="No"
        onConfirm={() => {
          notification('error', `Deleted ${name}`, '');
          deleteSetUp(setUp.id);
        }}
      >
        <Button icon="close" type="button" className="isoDeleteBtn" />
      </Popconfirm>
    );
  }
}
