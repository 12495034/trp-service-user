import * as React from 'react';
import { Avatar, Card, Text, Badge } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

function ClinicCard(props) {
    //count the number of slots available in the slots map
    const slotsAvailable = Object.keys(props.slots).length
    return (
        <Card mode='outlined' style={styles.card} onPress={() => slotsAvailable == 0 ? null : props.details(props.id)}>
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
                    {/* <Badge
                        size={25}
                        children={10}
                        visible={true}
                    >{props.status}</Badge> */}
                </View>

            </Card.Content>
            <Card.Actions>
            </Card.Actions>
        </Card>
    );
}

export default ClinicCard;

const styles = StyleSheet.create({
    card: {
        marginBottom: 5,
        borderColor: 'black',
        borderStyle: 'solid'
    },
    availabilityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})