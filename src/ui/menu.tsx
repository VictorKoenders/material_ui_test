import * as React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import SettingsMenu from "./settings_menu";

interface IProps {
    open: boolean;
    toggleOpen: (value?: boolean) => void;
}

interface IState {
    settings_open: boolean;
}

export default class Menu extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            settings_open: false
        };
    }

    public render(): JSX.Element {
        return (
            <Drawer
                docked={false}
                width={200}
                open={this.props.open}
                onRequestChange={(open) => {
                    console.log("request change");
                    this.props.toggleOpen(open);
                }}
            >
                <MenuItem onClick={() => this.props.toggleOpen()}>Menu Item</MenuItem>
                <MenuItem onClick={() => this.toggle_child()}>Settings</MenuItem>
                <SettingsMenu
                    open={this.state.settings_open}
                    toggleOpen={this.toggle_child.bind(this)}
                />
            </Drawer>
        );
    }

    private toggle_child(value: boolean = null): void {
        if (value === null) {
            value = !this.state.settings_open;
        }
        this.setState({
            settings_open: value
        });
    }
}