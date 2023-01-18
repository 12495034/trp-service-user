import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';

export default function Instructions() {
    const [expanded, setExpanded] = useState(true);
    const handlePress = () => setExpanded(!expanded);

    return (
        
            <List.Section title="How to make a booking">
                <List.Accordion
                    title="Booking Process"
                    right={props => <List.Icon {...props} icon="calendar" />}>
                    <List.Item title="Click on the New Booking tab below" />
                    <List.Item title="Complete our questionnaire" />
                    <List.Item title="Search for a suitible clinic" />
                    <List.Item title="Second item" />
                    <List.Item title="Second item" />
                    <List.Item title="Second item" />
                    <List.Item title="Second item" />
                </List.Accordion>
            </List.Section>
       
    );
};




