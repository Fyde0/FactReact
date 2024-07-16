export default interface IRoute {
    path: string;
    element: any;
    title?: string;
    loader?: any;
}