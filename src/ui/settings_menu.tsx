import * as React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";

interface IProps {
    open: boolean;
    toggleOpen: (value?: boolean) => void;
}

export default class SettingsMenu extends React.Component<IProps, null> {

    constructor(props: IProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <Drawer
                docked={false}
                width={200}
                open={this.props.open}
                onRequestChange={(open) => this.props.toggleOpen(open)}
            >
                <MenuItem onClick={() => this.props.toggleOpen()}>
                    <FontIcon className="material-icons">keyboard_return</FontIcon>
                </MenuItem>
            </Drawer>
        );
    }
}