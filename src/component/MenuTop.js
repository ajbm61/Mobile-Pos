import React, {  } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function MenuTop() {

    const navigation = useNavigation();

    let _menu = null;

    const setMenuRef = ref => {
        _menu = ref;
    };

    const hideMenu = () => {
        _menu.hide();
    };

    const showMenu = () => {
        _menu.show();
    };

    const toBluetoothPage = () => {
        hideMenu()
        navigation.navigate('SearchBluetooth')
    }

    const toAboutPage = () => {
        hideMenu()
        navigation.navigate('About')
    }

    const toConfig = () => {
        hideMenu()
        navigation.navigate('Config')
    }
        
    return (
        <View style={{ paddingHorizontal: 10, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Menu
                animationDuration={100}
                ref={setMenuRef}
                button={
                    <TouchableOpacity onPress={showMenu}>
                        <Ionicons name="menu-outline" size={30} color="#000" />
                    </TouchableOpacity>
                }
            >
                <MenuItem onPress={() => toBluetoothPage()}>Search Printer</MenuItem>
                <MenuItem onPress={() => toConfig()}>Config</MenuItem>
                <MenuDivider />
                <MenuItem onPress={() => {
                    hideMenu()
                    navigation.navigate('HowToConnect')
                }}>How To Connect Printer</MenuItem>
                <MenuItem onPress={() => toAboutPage()}>About</MenuItem>
            </Menu>
        </View>           
    )
}