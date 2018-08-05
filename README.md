# Sử dụng Realm Database trong React Native

## Mục tiêu

- Hiểu và sử dụng Realm Databases để lưu trữ dữ liệu có cấu trúc.
- Biết cách thêm, sửa, xóa, lấy dữ liệu.

## Mô tả

- Tạo 1 project với `creact-react-native-app`.
- Tích hợp `realm` database vào project.
- Tạo màn hình hiển thị danh sách các công việc cần làm hàng ngày (tasks).
- Các task cho phép `xóa` hoặc `complete/uncomplete`.
- Tạo 1 form để tạo task mới.
- Ứng dụng cho phép lưu lại danh sách các tasks khi đã tắt ứng dụng và mở lại ứng dụng lần sau.

## Hướng dẫn

### Bước 1

- Thêm `realm` vào project React Native

```
npm install --save realm
```

- Link `realm` vào project.

```
react-native link realm
```

Note: Nếu project có sử dụng `create-react-native-app` thì phải `reject` để sử dụng được `realm`.

### Bước 2

- Tạo file `StorageServices.js` để thêm, sửa, xóa, và lấy dữ liệu.
```javascript
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
```

### Bước 3

- Tạo 1 component tên là: `HomePage.js`, trong componenent này sẽ quản lý các tasks trong state và giao tiếp với `realm` thông qua StorageServices.js để thay dổi dữ liệu.

- Khi `componentDidMount` thì ta sẽ lấy ra list tasks hiện tại đã lưu lại trước đó. Còn lại là lắng nghe các event từ các child components để thêm, sửa, xóa các task.

```javascript
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
```

### Bước 4

- Chạy chương trình và quan sát kết quả.


## Mã nguồn

Tham khảo tại: https://github.com/tutv/rn-realm

# Ảnh demo

![Home page](/demo/home.png)