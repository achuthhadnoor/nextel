import React, { Component } from 'react';
import Router from 'next/router'

import styled from 'styled-components';

import Input from './../Input'
import Logo from './../logo'

import Icon from 'react-icons-kit'
import { check, arrowLeft, trash } from 'react-icons-kit/feather'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editTitle: true,
            editProject: false,
            snipTitle: props.title
        };
        this.textInput = React.createRef();
    }
    componentDidMount() {
        // debugger
        // this.textInput.current.focusTextInput();
    }
    onChange = (e) => {
        const { target } = e;
        const { name, value } = target;
        this.setState({ [name]: value });
    }
    onKeyDown = (e) => {
        if (e.key === "Enter") {
            this.props.changeTitle(this.state.snipTitle, this.state.project);
            this.setState({ editTitle: false, snipTitle: this.state.snipTitle });
        }
    }
    render() {
        return (
            <HeaderWrapper>
                <Button onClick={() => {
                    this.props.onSave();
                    Router.push('/home')
                }}>
                    <Icon icon={arrowLeft} />
                </Button>
                {this.state.editTitle ?
                    <Input
                        name="snipTitle"
                        style={{ flex: 1, margin: 0, textAlign: 'center' }}
                        placeholder="Enter Snippet Title"
                        onKeyDown={this.onKeyDown}
                        onChange={this.onChange}
                        onBlur={() => {
                            this.setState({ editTitle: !this.state.editTitle });
                            this.props.changeTitle(
                                this.state.snipTitle
                            );
                        }}
                        value={this.state.snipTitle}
                    // ref={this.textInput} 
                    />
                    :
                    <Button
                        style={{ flex: 1 }}
                        onClick={() => {
                            // this.textInput.current.focus();
                            this.setState({ editTitle: !this.state.editTitle })
                        }}
                        tooltip="Click to edit the title"
                    >
                        {this.state.snipTitle}
                    </Button>}
                    {this.props.new ? null : <Button onClick={() => this.props.removeSnip()}>
                        <Icon icon={trash} />
                    </Button>}
            </HeaderWrapper>
        );
    }
}

export default Header;
const HeaderWrapper = styled.header` 
  display: flex;
  text-align: center; 
  text-align:center;
  padding:5px;
`;
const Button = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  outline: none;
`;