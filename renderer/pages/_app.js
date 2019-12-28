import App from 'next/app';
import Page from './../layouts/page' 
import { getUser } from '../config/localstorage';

class Mainapp extends App {
    constructor(){
        super();
        this.state={
            user:[]
        }
    }
    componentDidMount(){
        const {user} = getUser();
        this.setState({user});
    }
    render() {
        const { Component } = this.props; 
        return (
            <Page>
                <Component  user={this.state.user}/>
            </Page>
        );
    }
}

export default Mainapp;