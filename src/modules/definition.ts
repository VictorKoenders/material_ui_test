export interface IModuleProps {
}

export abstract class Module<T> {
    public static module_name: string;
    public static module_description: string;
    public static icon_url: string;

    protected state: T;
    protected props: IModuleProps;

    public setProps(newProps: IModuleProps): void {
        this.props = newProps;
    }

    public abstract render(): JSX.Element | JSX.Element[];
}
