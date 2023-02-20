import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react-native'
import LocationPicker from '../assets/components/LocationPicker';

const locationData = [{ 'id': 'Belfast' }, { 'id': 'Derry' }, { 'id': 'Ballymena' }]
const chosenLocation = 'Belfast'

describe('Location Selection', () => {

    it('displays chosen Location', () => {
        const rendered = render(<LocationPicker
            locationData={locationData}
            chosenLocation={chosenLocation}
        />);
        const textInput = rendered.getByTestId('selectedLocation')
        expect(textInput.props.value).toEqual('Belfast');
    });
});
