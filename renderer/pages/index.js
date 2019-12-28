import { Component } from 'react'
import Page from './../layouts/page'
import {Input} from './../Components'
export default class extends Component {
    state = {
        input: '',
        message: null,
    }
    render() {
        return (
            <Page>
                <span>Hello World!</span>
                <Input search placeholder="Search for snippets"/>
            </Page>
        )
    }
}
