import { Component } from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import Router from 'next/router'
import Progress from 'nprogress'

// Global Styles
const GlobalStyle = createGlobalStyle`
html,body{
  margin:0;
  padding:0;  
  position:relative;
  height:100%;
  width:100%;
}
#root{
  padding:0;
  margin:0;
  display:flex;
  height:100%;
  width:100%;
  font-family:monospace;
}
input[type="submit"] {
      padding: 5px 15px;
      background: #ccc;
      border: 0 none;
      cursor: pointer;
      -webkit-border-radius: 5px;
      border-radius: 5px;
    }
    a{
      text-decoration:none;
      color:inherit;
      outline:none;
    }
`;

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

const light = {
    color: '#eee',
    bgCol: '#0f1113'
};
const dark = {
    color: '#333',
    bgCol: '#eee'
}
class Page extends Component {
    constructor() {
        super();
        this.state = {
            selectedTheme: 'light',
            theme: {}
        }
    }

    UNSAFE_componentWillMount() {
        if (this.state.selectedTheme.theme === 'light') {
            this.setState({ theme: light })
        }
        else {
            this.setState({ theme: dark })
        }
    }
    render() {
        const { children } = this.props;
        return (
            <>
                <ThemeProvider theme={this.state.theme}>
                    <GlobalStyle />
                    <button onClick={() => {
                    this.state.selectedTheme === 'light' ? this.setState({ theme: light,selectedTheme:'dark' }) : this.setState({ theme: dark ,selectedTheme:'light'})
                    }}>toggle mode</button>
                    {children}
                </ThemeProvider>
            </>
        )
    }
}
export default Page