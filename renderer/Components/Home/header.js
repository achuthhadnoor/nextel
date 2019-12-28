import Router from 'next/router'
import Link from 'next/link'

import styled from 'styled-components'

import Icon from 'react-icons-kit'
import {logOut,settings} from 'react-icons-kit/feather'

import Logo from './../logo'

import firebase from './../../config/firebase'

export default (props) => (
    <Header>
         <Logo />  
        <Title style={{ margin: 0, padding: ".5em", flex: 1, textAlign: "center" }}> Snipcode </Title>
        <Link href="/">
              <Icon icon={settings} style={{ padding: "1em" }} />  
        </Link>
        <Icon
            icon={logOut}
            style={{ padding: "1em", cursor: "pointer" }}
            tooltip="Sign Out "
            onClick={() => {
                Router.push("/login");
                firebase.signOut();
                localStorage.clear();
            }}
        />
    </Header>
);

const Header = styled.header`
    display:flex;
    background:${props=>props.theme.primary}
    color:${props=>props.theme.color}
`
const Title = styled.h2`
    margin:0;
    padding:.5em,
    flex:1;
    text-align:center
`