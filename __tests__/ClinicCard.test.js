import React from 'react';
import renderer from 'react-test-renderer';
import ClinicCard from '../assets/components/ClinicCard';

describe('Clinic Card Tests', () => {
  test('renders clinicCard component correctly', () => {
    const tree = renderer.create(<ClinicCard
      id={123456}
      status={'Active'}
      location={'Belfast'}
      center={'LGBT Center'}
      capacity={8}
      date={'3000-01-01'}
      time={'18:00'}
      slots={8}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  })
});