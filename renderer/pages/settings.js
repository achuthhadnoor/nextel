import { Component } from 'react'

//layout
import Page from './../layouts/page'

//components
import Row from './../ui/row'

//services
// import { exportUser, importUser, clearHistory } from './../services/settings'

class Settings extends Component {
    constructor(){
        super();
    }
    
    render(){
        return(
            <Page title="settings" home="true">
                <div className="contentz">
                    <Row title="Import Snips" description="import snips from JSON" icon="import" />
                    <Row title="Export Snips" description="import snips from JSON" icon="export"  />
                    <Row title="Delete Snips" description="import snips from JSON" icon="trash"  />
                </div>
                <style>{`
                .contentz{
                     height: calc(500px - 40px);
                    overflow: auto;
                    margin: 15px 0px;
                    padding: 0px 10px;
                }
                `}</style>
            </Page>
            )
    }
}
export default Settings


//resolution app for all

