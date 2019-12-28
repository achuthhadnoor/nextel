import React, { Component } from 'react';
class home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: [],
            snips:[],
            tags:[],
            dialog:false,
            activeTab: "snippets",
         };
    }
    render() {
        return (
            <div>Home</div>
        );
    }
}

export default home;