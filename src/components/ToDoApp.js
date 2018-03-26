import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header.js';
import Action from './Action';
import OptionModal from './OptionModal';

export default class ToDoApp extends React.Component {
    state = {
        options: [],
        selectedOption: this.props.selectedOption || undefined
    };
    componentWillUnmount = () => {
        console.log('componentWillUnmount');
    };
    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    };
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter(option => optionToRemove !== option)
        }));
    };
    handlePick = (props) => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({
           selectedOption: option
        }));
    };
    handleAddOption = option => {
        if (!option) {
            return (<p className = "widget__message add-option-error">Enter valid value to add item</p>);
        } else if (this.state.options.indexOf(option) > -1) {
            return (<p className = "widget__message add-option-error">This option already exists</p>);
        };
        this.setState(prevState => ({ options: prevState.options.concat([option]) }));
    };
    handleCloseModal = () => {
        this.setState(() => ({
            selectedOption: undefined
        }))
    };
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if (options) {
                this.setState(() => ({ options }));
            }
        } catch(e) {
            // Do nothing at all.
        };
        
    };
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        };
    };
    render() {
        const title = 'Checklist';
        const subtitle = 'What you gonna do?';
       
        return (
            <div>
                <Header title = { title || this.props.title } subtitle = { subtitle } />
                <div className="container">
                    
                    <Action 
                        hasOptions = { this.state.options.length > 0 }
                        handlePick = { this.handlePick }
                    />
                    <div className = "widget">
                        <AddOption 
                            handleAddOption = { this.handleAddOption }
                        />
                        <Options 
                            options = { this.state.options }
                            handleDeleteOptions = { this.handleDeleteOptions }
                            handleDeleteOption = { this.handleDeleteOption }
                        />
                        
                    </div>
                    <OptionModal 
                        selectedOption={ this.state.selectedOption }
                        handleCloseModal = { this.handleCloseModal }
                    />
                    
                </div>
            </div>
        );
    };
};