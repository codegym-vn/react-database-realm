import realm from '../realm'

export const getListTasks = () => {
    const tasks = realm.objects('Task')

    return Promise.resolve(tasks)
}

export const addTask = (name) => {
    if (!name) {
        return Promise.reject('Task name is empty')
    }

    const data = {
        created: new Date(),
        name,
        completed: false
    }

    const tasks = realm.objects('Task')

    return new Promise((resolve, reject) => {
        realm.write(() => {
            realm.create('Task', data)

            resolve(tasks)
        })
    })
}

export const removeTask = (task) => {
    const tasks = realm.objects('Task')

    return new Promise(resolve => {
        realm.write(() => {
            realm.delete(task)

            resolve(tasks)
        })
    })
}

export const toggleTask = (task) => {
    const tasks = realm.objects('Task')

    return new Promise(resolve => {
        realm.write(() => {
            task.completed = !task.completed

            resolve(tasks)
        })
    })
}