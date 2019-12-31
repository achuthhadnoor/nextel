import { Component } from 'react';
import Router from 'next/router'
import styled from 'styled-components'

import {
    Header,
    Editor
} from './../Components/snip'
import Tags from './../Components/snip/tags'
import { getUser, addSnip, updatesnip, removeSnip } from './../config/localstorage'
class New extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
            snip: {
                title: 'untitled',
                code: '',
                tags: [],
                language: 'java',
                trash: false,
            }
        };
        debugger
        if (Router.router !== null) {
            const id = Router.router.query.id;
            if (id !== undefined) {
                const { user } = getUser();
                const { snips } = user;
                var snip = {};
                snips.map((s) => { if (s.id === id) { snip = s } });
                this.state.snip = snip ;
            }
            else {
                this.state.new = true ; 
            }
        }
    }
    // componentWillMount() {

    // }
    changeTitle = (title) => {
        const snip = this.state.snip;
        if (title) {
            snip.title = title;
            this.setState({ snip: snip });
        }
    }
    onSave = () => {
        console.log(this.state);
        if (this.state.new) {
            addSnip(this.state.snip).then(() => Router.push('/home'));
        }
        else {
            updatesnip({ id: this.state.snip.id, newsnip: this.state.snip }).then(() => {
                Router.push('/home')
            });
        }

        // const { match: { params: { id } } } = this.props; 
        // updatesnip({ id: id, newsnip: this.state.snip }).catch(e=>{console.log(e);
        // })
    }
    removeSnip = ()=>{
            removeSnip(this.state.snip.id).then(()=>{
                alert('snippet deleted');
                Router.push('/home');
            });
    }
    render() {
        return (
            <Wrapper>
                <Header
                    title={this.state.snip.title}
                    changeTitle={this.changeTitle}
                    onSave={this.onSave}
                    removeSnip={this.removeSnip}
                    new={this.state.new}
                />
                <Tags
                    onChangeTag={(tags) => {
                        const { snip } = this.state;
                        snip.tags = tags;
                        this.setState({ snip: snip })
                    }}
                    tags={this.state.snip.tags}
                />
                <Editor
                    code={this.state.snip.code}
                    language={this.state.snip.language}
                    onDataChange={(code, language) => {
                        var snip = this.state.snip;
                        snip.language = language;
                        snip.code = code;
                        this.setState({ snip: snip });
                    }}
                />
            </Wrapper>
        );
    }
}

export default New;
//#25282c
const Wrapper = styled.div`
background:${props => props.theme.primary} ;
height: 100%;
width: 100%;
color: ${props => props.theme.color};
display:flex;
flex-direction:column;
`