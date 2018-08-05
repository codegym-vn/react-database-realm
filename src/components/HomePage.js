import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import ListTasks from "./ListTasks"
import FormCreate from "./FormCreate"
import {getListTasks, addTask, removeTask, toggleTask} from '../services/StorageServices'

class HomePage extends Component {
    state = {
        tasks: [],
        loading: false
    }

    componentDidMount() {
        this._fetchListTasks()
    }

    _fetchListTasks = () => {
        this.setState({loading: true})

        getListTasks().then(tasks => {
            this.setState({
                loading: false,
                tasks,
            })
        }).catch(error => {
            console.error(error)

            this.setState({loading: false})
        })
    }

    _handleOnCreate = name => {
        addTask(name)
            .then(tasks => {
                this.setState({
                    tasks
                })
            })
    }

    _handleOnRemove = task => {
        removeTask(task)
            .then((currentTasks) => {
                this.setState({
                    tasks: currentTasks
                })
            })
    }

    _handleToggleTask = (id) => {
        toggleTask(id)
            .then((tasks) => {
                this.setState({
                    tasks,
                })
            })
    }

    render() {
        const {tasks} = this.state

        return (
            <View style={styles.container}>
                <FormCreate onCreate={this._handleOnCreate}/>
                <ListTasks onToggle={this._handleToggleTask} onRemove={this._handleOnRemove} tasks={tasks}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#eee'
    }
})

export default HomePage