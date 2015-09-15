//Dependencies.
'use strict';

var builder = require('focus').component.builder;
var React = require('react');

var markdownEditorMixin = {
  /** @inherideddoc */
  getInitialState: function getMarkdownInitialState() {
    return { value: this.props.value };
  },
  /** @inherideddoc */
  componentDidMount: function markdownComponentDidMount() {
    if (!window.Showdown) {
      console.warn('The showdown library should be imported. See https://github.com/showdownjs/showdown');
    }
  },
  /**
   * Handle the change of the value.
   */
  handleChange: function handleMarkdownChange() {
    this.setState({ value: React.findDOMNode(this.refs.textarea).value });
  },
  /** @inherideddoc */
  render: function renderMarkdownComponent() {
    var converter = window.Showdown ? function (data) {
      console.warn('showdown should be imported/');return data;
    } : new window.Showdown.converter();
    return React.createElement(
      'div',
      { className: 'MarkdownEditor' },
      React.createElement('textarea', {
        onChange: this.handleChange,
        ref: 'textarea',
        defaultValue: this.state.value }),
      React.createElement('div', {
        className: 'content',
        dangerouslySetInnerHTML: {
          __html: converter.makeHtml(this.state.value)
        }
      })
    );
  }
};

module.exports = builder(markdownEditorMixin);