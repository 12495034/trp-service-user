import React from 'react'
import { Appbar, Menu } from 'react-native-paper'
import { StyleSheet, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

export default function CustomNavigationBar({ navigation, back, route }) {

    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <Appbar.Header style={styles.headerBar}>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title="" color='white' />
            {back ? (
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <Appbar.Action icon="menu" color="white" onPress={openMenu} />
                    }>
                    <Menu.Item onPress={() => { console.log('Option 1 was pressed') }} title="Sign Out" />
                    <Menu.Item onPress={() => { console.log('Option 3 was pressed') }} title="Option 3" disabled />
                </Menu>
            ) : null}
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    headerBar: {
        backgroundColor: '#5e95e7'
    }
})


