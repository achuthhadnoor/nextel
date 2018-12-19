import { Component } from 'react'
import Page from './../layouts/page'
import Search from './../components/home/search'
import Lists from './../components/home/lists'
import { getUser } from './../services/local-storage'
class Onboard extends Component {
    constructor(){
        super()
    }
    componentDidMount(){

    }
    render() {
        return (
            <Page title="Snips" home="true">
                
            </Page>
        )
    }
}
export default Onboard