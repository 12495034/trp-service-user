import * as React from 'react';
import { Card, Text, Badge } from 'react-native-paper';
import { StyleSheet, View, Pressable } from 'react-native';
import { createDateString } from '../commonFunctions/createDateString';

function ClinicCard(props) {
    return (
        <Pressable
            style={({ pressed }) => [
                { backgroundColor: pressed ? '#F7C3E9' : '#0000', borderRadius: 5 },
            ]}
            //only allow clinics to be selected if they have appointment slots available
            onPress={() => props.slots == 0 ? null : props.details(props.id)}
        >
            <Card mode='outlined' style={styles.card}>
                <Card.Title title={props.location} titleStyle={{fontSize:18}} subtitleStyle={{fontSize:14}} subtitle={`${props.center}, ${props.addDetails}` } />
                <Card.Content>
                    <Text variant="titleMedium">{createDateString(props.date)}</Text>
                    <Text variant="titleLarge">Start Time: {props.time}</Text>
                    <View style={styles.availabilityRow}>
                        <Text variant="titleLarge">Capacity: {props.capacity}</Text>
                        <Badge
                            size={25}
                            visible={true}
                            style={props.slots == 0 ? { backgroundColor: 'red', } : { backgroundColor: 'green' }}
                        >{props.slots == 0 ? "Full" : props.slots}</Badge>
                    </View>
                </Card.Content>
                <Card.Actions>
                </Card.Actions>
            </Card>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 2,
        // borderColor: 'black',
        // borderStyle: 'solid'
    },
    availabilityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default ClinicCard;