import styled from "styled-components";
import mouseTrap from "mousetrap";
import Link from "next/link";
import Router from "next/router";
import Icon from "react-icons-kit";
import { logOut, settings, plus, x } from "react-icons-kit/feather";
import firebase from "./../config/firebase";
import { getUser } from './../config/localstorage'

import Logo from "./../Components/logo";
import Snippets from "./../Components/snippets";
import Input from "./../Components/Input";
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            snips: [],
            tags: [],
            dialog: false,
            activetab: "snippets",
            selectedSnipID: -1,
            searchTerm: "",
            command: false
        };
        this._nextSnip = this._nextSnip.bind(this);
        this._prvSnip = this._prvSnip.bind(this);
    }

    componentDidMount() {
        // Check if user exists
        const { user } = getUser();
        if (!user.uid) {
            Router.push("/login");
        }

        // Onboard user for the first time
        const onboard = localStorage["onboard"];
        if (onboard === "false") {
            localStorage.setItem("onboard", true);
            Router.push("/");
        }

        // get userdata from firestore to display the list
        this.setState({ user: user, tags: user.tags, snips: user.snips });

        // initialize the keyboard shortcuts 
        mouseTrap.bind(["down", "alt+r"], this._nextSnip);
        mouseTrap.bind(["up", "alt+r"], this._prvSnip);
        mouseTrap.bind(["enter", "alt+l"], () => {
            Router.push("/snip/" + this.state.selectedSnipID);
        });
    }
    componentWillUnmount() {
        mouseTrap.unbind(["left", "alt+l"], this.lefttab);
        mouseTrap.unbind(["enter", "alt+l"], this._gotoSnip);
    }
    _nextSnip() {
        this.setState({
            selectedSnipID:
                this.state.selectedSnipID === this.state.user.snips.length - 1
                    ? this.state.user.snips.length - 1
                    : this.state.selectedSnipID + 1
        });
    }
    _prvSnip() {
        this.setState({
            selectedSnipID:
                this.state.selectedSnipID !== 0 ? this.state.selectedSnipID - 1 : 0
        });
    }
    // Key bindings
    onChange = e => {
        const { target } = e;
        const { name, value } = target;
        this.setState({ [name]: value });
        // debugger
        if (name === 'searchTerm') {
            this.filteredList(value);
        }
    };

    filteredList = (value) => {
        if (!value) {
            this.setState({ snips: this.state.user.snips });
            return;
        }
        const _snips = this.state.user.snips.length > 0 && this.state.user.snips.filter(snip => {
            // debugger
            if (snip.title.toLowerCase().includes(value.toLowerCase())) {
                return true;
            }
            if (snip.tags.length > 0) {
                const _tags = snip.tags.filter((s) => {
                    if (s.id.toLowerCase().includes(value.toLowerCase())) {
                        return true;
                    }
                })
                if (_tags.length > 0) {
                    return snip
                }
            }
        })
        this.setState({ snips: _snips })
    }
    render() {
        return (
            <Wrapper>
                <Header {...this.props} />
                <section style={{ flex: 1, maxWidth: '400px' }}>
                    <Input
                        type="search"
                        placeholder="Search for tags or snippets"
                        icon="search"
                        name="searchTerm"
                        onChange={this.onChange}
                        value={this.state.searchterm}
                        style={{ position: "sticky", top: '0px' }}
                        Commands={() => this.setState({ command: !this.state.command })}
                    />
                    <Snippets
                        snips={this.state.snips}
                        tags={this.state.tags}
                        selectedSnip={this.state.selectedSnipID}
                        onSelect={id => this.setState({ selectedSnip: id })}
                    />
                    {this.state.command && <Commands close={() => this.setState({ command: false })} />}
                </section>
                <Footer />
            </Wrapper>
        );
    }
}
// Components
const Commands = (props) => {
    return (
        <div style={{ position: 'fixed', top: '0px', height: '100%', width: '100%', background: '#000', zIndex: '99999' }}>
            <Icon icon={x} style={{ padding: "1em" }} onClick={() => props.close()} />
            list of all the shortcuts
        </div>
    )
}

const Header = (props) => (
    <header style={{ display: "flex" }}>
        <Link href="/">
            <a> <Logo />  </a>
        </Link>
        <h2 style={{ margin: 0, padding: ".5em", flex: 1, textAlign: "center" }}>
            Snipcode
    </h2>
        <Link href="/settings">
            <a >
                <Icon icon={settings} style={{ padding: "1em" }} />
            </a>
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
    </header>
);

const Footer = () => (
    <Link href="/new">
        <a 
            style={{
                position: "fixed",
                zIndex: 999,
                padding: 15,
                background: "#5D9E6B",
                borderRadius: "5em",
                bottom: 5,
                right: 10,
                color: "#222"
            }} >
            <Icon icon={plus} />
        </a>
    </Link>
);

// styles
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: fixed;
  background: #25282c;
  color: #fff;
`;
export default Home;

// background: ${props => console.log(props.theme)};