// Packages
import { Component } from 'react'
import Router from 'next/router'
import Progress from 'nprogress'
import Link from 'next/link'
//icons
import Back from './../icons/back'
import Settings from './../icons/settings'
import Add from './../icons/add'
import Trash from './../icons/delete'

//head
import Head from './../components/head'

let progress
const stopProgress = () => {
    clearTimeout(progress)
    Progress.done()
}

Router.onRouteChangeStart = () => {
    progress = setTimeout(Progress.start, 200)
}

Router.onRouteChangeComplete = stopProgress
Router.onRouteChangeError = stopProgress



class Page extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { children , title , settings , home  } = this.props
        return (
            <main>
            <Head />
            <header>
                {settings ? <Link prefetch href="/add"><i className="icon"><Add/></i></Link> :''}
                {home ? <Link prefetch href="/home"><i className="icon"><Back/></i></Link> :''}
                <h1 className="main-title">{title}</h1>
                {settings ? <Link prefetch href="/settings"><i  className="icon"><Settings/></i></Link> : ''}
            </header>
            {children}
            <style jsx global>{`
              * {
                padding: 0;
                margin: 0;
                -webkit-font-smoothing: antialiased;
                box-sizing: border-box;
                font-family: -apple-system, system-ui, BlinkMacSystemFont,
                  'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              }
              body {
                background-color:#000;
                color:#fff;
                max-height: 550px;
                overflow: hidden;
              }
              body,
              html {
                font-size: 1em;
              }
              a {
                text-decoration: none;
              }
              li {
                list-style: none;
              }
              header{
                display:flex;
                text-align:center;
                position:relative;
                height:40px;
                padding:0px 5px;
              }
              img {
                max-width: 100%;
              }
              fieldset {
                border: 0;
              }
              #nprogress {
                pointer-events: none;
              }
              #nprogress .bar {
                background:#fff;
                position: fixed;
                z-index: 1031;
                top: 0;
                left: 0;
                width: 100%;
                height: 2px;
              }
              #nprogress .peg {
                display: block;
                position: absolute;
                right: 0px;
                width: 100px;
                height: 100%;
                box-shadow: 0 0 10px #fff, 0 0 5px rgba(0,0,0.1);
                opacity: 1;
                transform: rotate(3deg) translate(0px, -4px);
              }
              .main-title{
                flex: 1 0;
              }
              main {
                height: 100%;
                display: flex;
                width: 100%;
                max-width:800px;
                width:320px;
                margin:auto;
                flex-direction: column;
              }
              #__next{
                   position: absolute;
                    height: 100%;
                    width: 100%;
                    display: flex;   
              }
              .search{
                   padding: 5px 10px;
                  background: #000;
                  border: none;
                  outline: aliceblue;
                  color: #fff;
                  margin:10px;
                 }   
                 .icon{
                   cursor:pointer;
                 }
            `}</style>
          </main>
        )
    }
}

export default Page
