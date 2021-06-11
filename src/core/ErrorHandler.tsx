import React, { Component, PropsWithChildren } from 'react';
import { Page404Component } from '../views';

class ErrorHandler extends Component<PropsWithChildren<any>, {hasError: boolean}> {
    constructor(props: PropsWithChildren<any>) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(error: any) {
        console.log('errorhandler1', error);
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log('errorhandler', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <Page404Component />
        }

        return this.props.children;
    }
}

export default ErrorHandler;