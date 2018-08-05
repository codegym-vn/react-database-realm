import React, {Component} from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'
import moment from 'moment'

class TaskItem extends Component {
    state = {
        now: Date.now()
    }

    _interval = null

    componentDidMount() {
        const ONE_MINUTE=  60 * 1000
        this._interval = setInterval(this._refreshCreatedTime, ONE_MINUTE)
    }

    componentWillUnmount() {
        this._interval && clearInterval(this._interval)
    }

    _refreshCreatedTime = () => {
        this.setState({
            now: Date.now()
        })
    }

    _handlePressRemove = () => {
        this.props.onRemove(this.props.task)
    }

    _handleCompleteTask = () => {
        this.props.onToggle(this.props.task)
    }


    render() {
        const {task} = this.props
        const {name, completed, created} = task
        const {now} = this.state
        const createdTime = moment(created).from(moment(now))

        return (
            <View style={[styles.container, completed ? styles.completed : {}]}>
                <View style={styles.left}>
                    <Button
                        color={completed ? 'green' : 'gray'}
                        onPress={this._handleCompleteTask}
                        title='✓'/>
                    <View style={styles.content}>
                        <Text
                            onPress={this._handleCompleteTask}
                            style={[styles.name]}>{name}</Text>
                        <Text style={styles.created}>{createdTime}</Text>
                    </View>
                </View>

                <Button
                    color='red'
                    onPress={this._handlePressRemove}
                    title="✕"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 10,
        paddingTop: 5,
        paddingBottom: 5,
        flexWrap: 'wrap'
    },

    content: {
        paddingRight: 10
    },

    name: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },

    created: {
        color: '#999',
        fontSize: 10
    },

    completed: {
        opacity: 0.5
    },

    left: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
}

export default TaskItem