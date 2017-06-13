import * as React from "react";
import * as ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import AppBar from "material-ui/AppBar";
import MenuItem from "material-ui/MenuItem";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import NavigationMenu from "material-ui/svg-icons/navigation/menu";
import { BottomNavigation, BottomNavigationItem } from "material-ui/BottomNavigation";
import FontIcon from "material-ui/FontIcon";
import IconLocationOn from "material-ui/svg-icons/communication/location-on";
import Paper from "material-ui/Paper";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from "material-ui/Table";
import Menu from "./ui/menu";

const recentsIcon: JSX.Element = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon: JSX.Element = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon: JSX.Element = <IconLocationOn />;

interface IAppState {
    result: any;
    menu_is_open: boolean;
}

class App extends React.Component<null, IAppState> {
    constructor() {
        super();
        this.state = {
            result: {},
            menu_is_open: false,
        };
    }

    public componentWillMount(): void {
        this.fetch();
        setInterval(this.fetch.bind(this), 2000);
    }

    public render(): JSX.Element {
        return (
            <MuiThemeProvider>
                <div className="fill vertical">
                    <AppBar
                        title="My awesome app"
                        iconElementLeft={<IconButton onClick={() => this.toggle_open()}><NavigationMenu /></IconButton>}
                    >
                        {/*iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                        iconElementRight={
                            <IconMenu
                                iconButtonElement={
                                    <IconButton><MoreVertIcon /></IconButton>
                                }
                            >
                                <MenuItem
                                    primaryText="Item 1"
                                    onClick={(e: any) => { console.log("item 1 click"); }}
                                />
                                <MenuItem primaryText="Item 2" />
                                <MenuItem primaryText="Item 3" />
                            </IconMenu>
                        }*/}
                    </AppBar>
                    <Paper style={{ flex: 1 }} zDepth={1}>
                        {this.renderContent()}
                    </Paper>
                    <Paper zDepth={1} >
                        <BottomNavigation selectedIndex={0}>
                            {/*<BottomNavigationItem
                                label="Recents"
                                icon={recentsIcon}
                            />
                            <BottomNavigationItem
                                label="Favorites"
                                icon={favoritesIcon}
                            />
                            <BottomNavigationItem
                                label="Nearby"
                                icon={nearbyIcon}
                            />*/}
                        </BottomNavigation>
                    </Paper>
                    <Menu
                        open={this.state.menu_is_open}
                        toggleOpen={b => this.toggle_open(b)}
                    />
                </div>
            </MuiThemeProvider>
        );
    }

    private toggle_open(value: boolean = null): void {
        if (value === null) {
            value = !this.state.menu_is_open;
        }
        console.log("menu open is", value);
        this.setState({
            menu_is_open: value
        });
    }

    private renderContent(): JSX.Element | JSX.Element[] {
        if (!this.state.result) {
            return <div />;
        }
        return (
            <Table>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>USD</TableHeaderColumn>
                        <TableHeaderColumn>EUR</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {Object.keys(this.state.result).map((key, index) => (
                        <TableRow key={index}>
                            <TableRowColumn>{key}</TableRowColumn>
                            <TableRowColumn>$ {this.state.result[key].USD}</TableRowColumn>
                            <TableRowColumn>&euro; {this.state.result[key].EUR}</TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }

    private fetch(): void {
        fetch(
            "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR"
        ).then(res => {
            return res.json();
        }).then(json => {
            this.setState({
                result: json
            });
        });
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("app")
);
