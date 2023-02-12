import * as React from 'react';
import { Card, Text, Badge } from 'react-native-paper';
import { StyleSheet, View, Pressable } from 'react-native';
import { formatSlotsData } from '../DataFormatFunctions/formatSlotData';

function ClinicCard(props) {

    //count the number of slots available in the slots map
    const slotsAvailable = formatSlotsData(props.slots, props.date).length

    return (
        <Pressable
            style={({ pressed }) => [
                { backgroundColor: pressed ? '#F7C3E9' : '#0000', borderRadius: 5 },
            ]}
            //only allow clinics to be selected if they have appointment slots available
            onPress={() => slotsAvailable == 0 ? null : props.details(props.id)}
        >
            <Card mode='outlined' style={styles.card}>
                <Card.Title title={props.location} subtitle={props.center} />
                <Card.Content>
                    <Text variant="titleMedium">{props.date}</Text>
                    <Text variant="titleLarge">Start Time: {props.time}</Text>
                    <View style={styles.availabilityRow}>
                        <Text variant="titleLarge">Capacity: {props.capacity}</Text>
                        <Badge
                            size={25}
                            visible={true}
                            style={slotsAvailable == 0 ? { backgroundColor: 'red', } : { backgroundColor: 'green' }}
                        >{slotsAvailable == 0 ? "Full" : slotsAvailable}</Badge>
                    </View>
                </Card.Content>
                <Card.Actions>
                </Card.Actions>
            </Card>
        </Pressable>
    );
}

export default ClinicCard;

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