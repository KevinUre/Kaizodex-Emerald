import { Component } from 'react';
import DataContext from './DataContext';

export class DataProvider extends Component {
    state = {
        Name: 'Kevin'
    };

    render() {
        return (
            <DataContext.Provider
                value={{
                    Name: this.state.Name,
                }}
            >
                {this.props.children}
            </DataContext.Provider>
        );
    }
}