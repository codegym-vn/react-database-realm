import React, {Component} from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'
import TaskItem from "./TaskItem"

class ListTasks extends Component {

    render() {
        const {tasks, onRemove, onToggle} = this.props

        return (
            <View style={styles.container}>
                <ScrollView>
                    {
                        tasks.map((task, index) => {
                            return (
                                <TaskItem
                                    key={index} index={index}
                                    onToggle={onToggle} onRemove={onRemove}
                                    task={task}/>
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
    }
})

ListTasks.propTypes = {
    tasks: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onRemove: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
}

export default ListTasks