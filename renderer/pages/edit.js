'use strict'

// Packages
import { Component } from 'react'
import Router from 'next/router'

// Layouts
import Page from './../layouts/page'

// Components
import Row from './../ui/row'
import Input from './../ui/input'
import Button from './../ui/button'

// Services
import { getUser, updateTask  } from './../services/local-storage'

class Edit extends Component {
  constructor() {
    super()

    this.inputChange = this.inputChange.bind(this)
    this.editTask = this.editTask.bind(this)
    this.state = { title: '', snip: ''}
  }

  componentDidMount() {
    const { url: { query: { id } } } = this.props
    const { user } = getUser()
    const { title, snip } = user.tasks.filter(task => task.id === id)[0]
    if (title) {
      return this.setState({ title, snip })
    }
  }

  inputChange(event) {
    const { target } = event
    const { name, value } = target

    this.setState({ [name]: value })
  }

  editTask(e) {
    e.preventDefault()
    const { url: { query: { id } } } = this.props
    const { title, snip} = this.state
    const newTask = { title, snip }
    updateTask({ id, newTask })
      .then(() => Router.push('/home'))
      .catch(err => console.log(err))
  }

  render() {
    const { title, snip } = this.state
    return (
      <Page title="Snip" home="true">
          <section>
            <form onSubmit={this.editTask}>
              <fieldset>
                <Input
                  label="Title"
                  name="title"
                  placeholder={title}
                  size="large"
                  autoFocus={true}
                  onChange={this.inputChange}
                  value={title}
                  inputRef="title"
                />

                <Input
                  label="snip"
                  name="snip"
                  placeholder={snip}
                  onChange={this.inputChange}
                  value={snip}
                  inputRef="snip"
                />
              </fieldset>

              <div>
                <Button type="submit">Save changes</Button>
              </div>
            </form>
          </section>

        <style jsx>{`
          section {
            display: flex;
            flex-direction: column;
            jutify-content: space-between;
            height: 500px;
            padding:0px 10px;
          }
          form {
            height: calc(580px - 230px);
            max-height: calc(580px - 230px);
            margin-top: 30px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          span {
            display: block;
            width: 100%;
            color: #eee;
            height: 36px;
            font-weight:600;
            font-size:1em;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-align: center;
            transition: 0.2s all;
          }
          span:hover {
            color:#ff;
          }
        `}</style>
      </Page>
    )
  }
}

export default Edit