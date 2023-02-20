import React from 'react';
import renderer from 'react-test-renderer';
import CalledIcon from '../assets/Icons/CalledIcon';

test('check render of called Icon for checked in and called', () => {
  const tree = renderer.create(<CalledIcon 
    checkedIn={true} 
    called={true}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});


test('check render of called Icon for checked in and not called', () => {
    const tree = renderer.create(<CalledIcon 
      checkedIn={true} 
      called={false}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('check render of called Icon for not checked in and not called', () => {
    const tree = renderer.create(<CalledIcon 
      checkedIn={false} 
      called={false}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });