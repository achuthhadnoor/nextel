import styled from 'styled-components'
import Row from './../Components/row'
//services
import { exportUser, importUser, clearHistory } from './../config/settings'
import Router from 'next/router';
import Icon from 'react-icons-kit'
import { twitter, mail, award } from 'react-icons-kit/feather';
import { arrowLeft, logOut } from 'react-icons-kit/feather';
import firebase from './../config/firebase'
class Settings extends React.Component {
    constructor() {
        super();
        this.state = {
            toast: '',
            opacity: 0
        }
        this.clear = this.clear.bind(this)
    }
    clear() {
        clearHistory();
        this.setState({
            toast: 'All Snippetss are deleted'
        })
        this.setState({ opacity: 1 }, () => {
            if (!this.timeout)
                clearTimeout(this.timeout);
            this.timeout = setTimeout(() => this.setState({ opacity: 0 }), 1000);
        });
    } 
    render() {
        return (
            <Wrapper >
                <Header>
                    <Icon icon={arrowLeft} onClick={() => Router.push('/home')} />
                    <h3>Settings</h3>

                </Header>
                {this.state.toast ?
                    <div className="toast">{this.state.toast}</div>
                    : ''}
                <ul style={{ flex: 1, margin: 0, padding: 10 }}>
                    <Row title="Import Snips" description="Import and override local snippets from cloud" icon="import" onclick={importUser} />
                    <Row title="Export Snips" description="Export Snippets to cloud" icon="export" onclick={exportUser} />
                    <Row title="Delete Snips" description="Delete all the snippets" icon="trash" onclick={this.clear} />
                    <Row title="Sign Out " description="SignOut and clear the data" icon="signOut"
                        onclick={() => {
                            firebase.signOut();
                            Router.push('/');
                            localStorage.setItem('onboard', false)
                        }} />
                    <Row title="Onboarding" description="View Onboarding screens" icon="" onclick={()=>{
                        localStorage.setItem('onboard',false);
                        Router.push('/')
                    }} />
                </ul>

                <style jsx="true">{`
                  .toast{
                    opacity:${this.state.opacity};
                    bottom: 20px;
                    left: calc(50% - 70px);
                    padding: 5px 10px;
                    background: #fff;
                    color: #222;
                    position:absolute;
                    border-radius: 25px;
                    -webkit-animation-duration: 3s;animation-duration: 3s;
                    -webkit-animation-fill-mode: both;animation-fill-mode: both;
                }
                .contentz{
                     height: calc(500px - 40px);
                    overflow: auto;
                    margin: 15px 0px;
                    padding: 0px 10px;
                    display:flex;
                    flex-direction:column;
                    width:100%;
                }
                `}</style>
            </Wrapper>
        )
    }
}
export default Settings

const Wrapper = styled.div`
    display:flex;
    max-width:400px;
    width:100%;
    flex-direction:column;
    background:${props => props.theme.primary};
    color:${props => props.theme.color};
`
const Footer = styled.footer`
    padding:10px;
    text-align:center;
    position:fixed;
    bottom:0;
    a{
        padding:10px;
    }
`
const Header = styled.header`
padding:10px;
display:flex;
h3{
    text-align:center;
    flex:1;
    margin:0;
    padding:10
}
`