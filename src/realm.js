import Realm from 'realm'

const TaskSchema = {
    name: 'Task',
    properties: {
        name: 'string',
        created: 'date',
        completed: 'bool'
    }
}

export default new Realm({
    schema: [TaskSchema]
})
