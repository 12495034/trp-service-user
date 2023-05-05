import React from 'react';
import renderer from 'react-test-renderer';
import CheckInIcon from '../assets/Icons/CheckInIcon';

describe('Check In Icon Tests', () => {
  test('check render of checked in icon for checked in user', () => {
    const tree = renderer.create(<CheckInIcon
      checkedIn={true}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  test('check render of checked in icon for non checked in user', () => {
    const tree = renderer.create(<CheckInIcon
      checkedIn={false}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  })
});