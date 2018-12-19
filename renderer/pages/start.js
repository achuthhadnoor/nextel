
import {Component} from 'react'
import Router from 'next/router'
//Layout
import Page from './../layouts/page'
//services
import {getUser,updateUser} from './../services/local-storage'
import {getCookie} from './../services/cookies'

//components 
import Logo from './../icons/logo'

class Start extends Component{
  constructor(){
    super()
  }
 componentDidMount() {
    const { user } = getUser()
    // const cfg = remote && remote.app ? remote.app.config : {}
    const token = getCookie('taskr')
    const { pro } = user
    const skipOnboard = user.onboard ? '/home' : '/start'
    const redirectUrl = pro && token ? '/home' : skipOnboard

    if (!user.onboard) {
      const userUpdated = Object.assign(user, { onboard: true })
      updateUser(userUpdated)
    }
    Router.push(redirectUrl)
  }
  render(){
    return(
      <Page >
          <section className="section">
                    <Logo/>
                    <h1><span className="light">Welcome to</span><br/> Snip</h1>
                    <span>Manage your single line snippets at ease!</span>
                </section>
                <style>{`
                    h1{
                        font-size:3em;
                        margin:10px 0px;
                    }
                    .light{
                      font-weight:200;
                    }
                    span{
                        line-height:2;
                        letter-spacing:1.2;
                        margin:10px 0px
                    }
                    .section{
                        display: flex;
                        text-align: left;
                        justify-content: center;
                        max-width: 800px;
                        flex-direction: column;
                        margin: auto;
                        height:100%
                    }
                    .started{
                      width: 100%;
                      padding:10px 15px;
                      background-color: #fff;
                      color: #000;
                      border: none;
                      font-weight:500;
                      font-size: 1.2em;
                      cursor: pointer;
                      text-align:center;
                      color:#222;
                      text-transform: uppercase;
                      letter-spacing: 2px;
                      outline: none;
                    }
                `}</style>
      </Page>
      )
  }
}
export default Start