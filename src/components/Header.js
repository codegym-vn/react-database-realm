import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

class Header extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>ToDo App</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'green',
        justifyContent: 'center'
    },

    text: {
        padding: 10,
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    }
})

export default Header