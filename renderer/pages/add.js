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
// import ButtonLink from './../ui/button-link'

// Services
import { addTask, getUser, updateUser } from './../services/local-storage'

class Add extends Component {
  constructor() {
    super()

    this.inputChange = this.inputChange.bind(this)
    this.createTask = this.createTask.bind(this)

    this.state = {
      title: '',
      snip: '',
    }
  }

  inputChange(event) {
    const { target } = event
    const { name, value } = target

    this.setState({ [name]: value })
  }

  createTask(e) {
    e.preventDefault()
    const { title, snip} = this.state
    const { user } = getUser()
    if (!user.createOn) {
      user.createOn = new Date()
      updateUser(user)
    }
    addTask({ title, snip})
      .then(() => Router.push('/home'))
      .catch(err => console.log(err))
  }

  render() {
    const { title, snip  } = this.state

    return (
      <Page title="New Snip" home="true">
          <section>
            <form onSubmit={this.createTask}>
              <fieldset>
                <Input
                  label="Title"
                  name="title"
                  placeholder="Create Node Project"
                  autoFocus={true}
                  onChange={this.inputChange}
                  value={title}
                  inputRef="title"
                />

                <Input
                  label="snip"
                  name="snip"
                  placeholder="npm init -y"
                  // multiline={true}
                  onChange={this.inputChange}
                  value={snip}
                  inputRef="snip"
                />
              </fieldset>
              <div>
                <Button type="submit">Save</Button>
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

export default Add