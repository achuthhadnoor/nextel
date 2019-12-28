import { Component } from 'react';

import Router from 'next/router'
import Link from 'next/link'
// Services
import {getUser} from './../config/localstorage'

class Onboard extends Component {
    constructor() {
        super();
        this.state = { user:[] };
    }
    componentDidMount(){
        const { user } = this.props;  
        if(user.uid !== ''){
            Router.push('/login')
        }
        else {
            const onboard = localStorage.getItem('onboard');
            if(!onboard){
                localStorage.setItem('onboard',true)
                Router.push('/home')
            }
        }
    }
    render() {
        return (
            <>
                <Link href="/home"><a >go home</a></Link>
            </>
        );
    }
}

export default Onboard;