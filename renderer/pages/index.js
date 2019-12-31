import { Component } from 'react';
import styled from 'styled-components'
import Router from 'next/router'
import Link from 'next/link'

import {getUser} from './../config/localstorage'
class Onboard extends Component {
    constructor() {
        super();
        this.state = { user:[] };
    }
    componentDidMount(){
        
        const { user } = getUser();   
        if(user.uid === ''){
            Router.push('/login')
        }
        else {
            const onboard = localStorage.getItem('onboard');
        console.log(onboard)
            if(!onboard){
                localStorage.setItem('onboard',true)
            } 
            else{
                Router.push('/home')
            }
        }
    } 
    render() {
        return (
            <Wrapper>
                <Link href="/home"><a >go home</a></Link>
            </Wrapper>
        );
    }
}
const Wrapper = styled.div`
    background:${props=>props.theme.primary}
    color:${props=>props.theme.color}
`
export default Onboard;