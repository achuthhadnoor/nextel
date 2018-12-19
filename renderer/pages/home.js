//packages
import { Component } from 'react'
import { arrayMove } from 'react-sortable-hoc'

//layout
import Page from './../layouts/page'

//components
import Search from './../components/home/search'
import Content from './../components/content'
import Today from './../components/home/today'

import { getUser, updateUser } from './../services/local-storage'
class Home extends Component {
    constructor() {
        super()
        this.onDelete = this.onDelete.bind(this)
        this.onSortEnd = this.onSortEnd.bind(this)
        this.onCopy = this.onCopy.bind(this)
        this.state = {
            user: {}
        }
    }
    componentDidMount() {
        const { user } = getUser()
        this.setState({ user })
    }
    onDelete(task) {
        const { user } = getUser()
        user.tasks = user.tasks.filter(({ id }) => id !== task.id)
        updateUser(user)
        this.setState({ user })
    }
    
    onCopy(task) {
        debugger
        document.execCommand(task.snip);
        // const { clipboard } = require('electron')
        // clipboard.writeText(task.snip)
    }
    onMove(type, task) {
        const { user } = getUser()
        const taskUpdated = user.tasks.map(t => {
            if (t.id === task.id) {
                return t
            }
            return t
        })
        user.tasks = taskUpdated
        updateUser(user)
        return this.setState({ user })

    }
    onSortEnd({ oldIndex, newIndex }) {
        const userObj = getUser()
        const { user } = this.state
        const tasks = user.tasks
        const reordered = arrayMove(tasks, oldIndex, newIndex)
        userObj.user.tasks = reordered
        updateUser(userObj.user)
        return this.setState({ user: userObj.user })
    }
    render() {
        const { user } = this.state
        const tasks = user.tasks
        let content = (
            <Today
            tasks={tasks}
            onSortEnd={this.onSortEnd}
            onDelete={this.onDelete}
            onCopy={this.onCopy}
            onMove={(type, task) => this.onMove(type, task)}
          />
        )
        // <input type="search" className="search" placeholder="Search snips..." onChange={this.filterList}/>
        return (
            <Page title="Snip" settings="true">
                    <div className="contentz"> {content}</div>
                    <style>{`
                        .contentz{
                            height: calc(500px - 40px);
                            overflow: auto;
                            margin: 15px 0px;
                            padding: 0px 10px;
                        }
                    `}</style>
            </Page>
        )
    }
}
export default Home
//  { this.state.items ? <Lists items={this.state.items}/> : <div>No items Found</div>}
