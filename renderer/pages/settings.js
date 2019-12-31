import styled from 'styled-components'
import Row from './../Components/row'
//services
import { exportUser, importUser, clearHistory } from './../config/settings'

class Settings extends React.Component {
constructor(){
    super();
    this.state={
        toast:'',
        opacity:0
    }
    this.clear = this.clear.bind(this)
}
clear(){
    clearHistory();
    this.setState({
        toast:'All Snips are deleted'
    })
    this.setState({opacity: 1}, () => {
        if(!this.timeout)
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => this.setState({opacity:0}),1000);
   });
}
    render(){
        return(
            <Wrapper > 
                {this.state.toast ?  
                   <div className="toast">{this.state.toast}</div> 
                   : ''}
                    <Row title="Import Snips" description="import snips from JSON" icon="import" onclick={importUser}/>
                    <Row title="Export Snips" description="import snips from JSON" icon="export" onclick={exportUser} />
                    <Row title="Delete Snips" description="import snips from JSON" icon="trash"  onclick={this.clear}/>
                 
                settings
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
    background:${props=>props.theme.primary};
    color:${props=>props.theme.color}
`
//resolution app for all