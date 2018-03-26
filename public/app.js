'use strict';

console.log('App.js is running!');
var appRoot = document.querySelector('#app');

// JSX - JavaScript XML
var app = {
    title: 'Checklist',
    subtitle: 'This is some additional info.',
    options: []
};
var removeAll = function removeAll() {
    app.options = [];
    renderTemplate();
};
var optionList = function optionList() {
    if (app.options && app.options.length > 0) {
        var optionsTpl = React.createElement(
            'ol',
            null,
            app.options.map(function (option) {
                return React.createElement(
                    'li',
                    { key: option },
                    ' ',
                    option,
                    ' '
                );
            })
        );
        return optionsTpl;
    };
};

var optionsRender = function optionsRender() {
    var templ = React.createElement(
        'div',
        null,
        React.createElement(
            'p',
            null,
            app.options.length
        ),
        optionList()
    );
    return templ;
};

var onFormSubmit = function onFormSubmit(e) {
    e.preventDefault();
    var option = e.target.elements.option.value;

    if (option) {
        app.options.push(option);

        e.target.elements.option.value = '';
    }
    renderTemplate();
};

var renderTemplate = function renderTemplate() {
    var template = React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            app.title
        ),
        app.subtitle && React.createElement(
            'p',
            null,
            app.subtitle
        ),
        React.createElement(
            'p',
            null,
            (app.options && app.options.length) > 0 ? 'These are your options:' : 'No options!'
        ),
        React.createElement(
            'form',
            { onSubmit: onFormSubmit },
            React.createElement('input', { type: 'text', name: 'option' }),
            React.createElement(
                'button',
                null,
                'Add option'
            ),
            React.createElement(
                'button',
                { onClick: removeAll },
                'Remove all'
            ),
            99,
            ' ',
            98,
            ' ',
            97,
            React.createElement(
                'div',
                null,
                app.options && app.options.length ? optionsRender() : 'Nothing to show'
            )
        )
    );
    ReactDOM.render(template, appRoot);
};

renderTemplate();
