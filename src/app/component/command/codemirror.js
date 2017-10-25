/**
 The MIT License (MIT)

 Copyright (c) 2016 Jed Watson

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 **/

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
var className = require('classnames');
var debounce = require('lodash').debounce;
var isEqual = require('lodash').isEqual;
var createReactClass = require('create-react-class');

function normalizeLineEndings(str) {
	if (!str) return str;
	return str.replace(/\r\n|\r/g, '\n');
}

var CodeMirror = createReactClass({
	propTypes: {
		autoFocus: PropTypes.bool,
		className: PropTypes.any,
		codeMirrorInstance: PropTypes.func,
		defaultValue: PropTypes.string,
		name: PropTypes.string,
		onChange: PropTypes.func,
		onCursorActivity: PropTypes.func,
		onFocusChange: PropTypes.func,
		onScroll: PropTypes.func,
		options: PropTypes.object,
		path: PropTypes.string,
		value: PropTypes.string,
		preserveScrollPosition: PropTypes.bool
	},
	getDefaultProps: function getDefaultProps() {
		return {
			preserveScrollPosition: false
		};
	},
	getCodeMirrorInstance: function getCodeMirrorInstance() {
		return this.props.codeMirrorInstance || require('codemirror');
	},
	getInitialState: function getInitialState() {
		return {
			isFocused: false
		};
	},
	componentWillMount: function componentWillMount() {
		this.componentWillReceiveProps = debounce(this.componentWillReceiveProps, 0);
		if (this.props.path) {
			console.error('Warning: react-codemirror: the `path` prop has been changed to `name`');
		}
	},
	componentDidMount: function componentDidMount() {
		var codeMirrorInstance = this.getCodeMirrorInstance();
		this.codeMirror = codeMirrorInstance.fromTextArea(this.textareaNode, this.props.options);

		this.codeMirror.on('change', this.codemirrorValueChanged);
		this.codeMirror.on('cursorActivity', this.cursorActivity);
		this.codeMirror.on('focus', this.focusChanged.bind(this, true));
		this.codeMirror.on('blur', this.focusChanged.bind(this, false));
		this.codeMirror.on('scroll', this.scrollChanged);
		this.codeMirror.setValue(this.props.defaultValue || this.props.value || '');
	},
	componentWillUnmount: function componentWillUnmount() {
		// is there a lighter-weight way to remove the cm instance?
		if (this.codeMirror) {
			this.codeMirror.toTextArea();
		}
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (this.codeMirror && nextProps.value !== undefined && nextProps.value !== this.props.value && normalizeLineEndings(this.codeMirror.getValue()) !== normalizeLineEndings(nextProps.value)) {
			if (this.props.preserveScrollPosition) {
				var prevScrollPosition = this.codeMirror.getScrollInfo();
				this.codeMirror.setValue(nextProps.value);
				this.codeMirror.scrollTo(prevScrollPosition.left, prevScrollPosition.top);
			} else {
				this.codeMirror.setValue(nextProps.value);
			}
		} else {
			if(this.state.origin === "setValue" || this.state.isFocused === false){
				this.codeMirror.setValue(nextProps.value);
			}
		}
		if (typeof nextProps.options === 'object') {
			for (var optionName in nextProps.options) {
				if (nextProps.options.hasOwnProperty(optionName)) {
					this.setOptionIfChanged(optionName, nextProps.options[optionName]);
				}
			}
		}
	},
	setOptionIfChanged: function setOptionIfChanged(optionName, newValue) {
		var oldValue = this.codeMirror.getOption(optionName);
		if (!isEqual(oldValue, newValue)) {
			this.codeMirror.setOption(optionName, newValue);
		}
	},
	getCodeMirror: function getCodeMirror() {
		return this.codeMirror;
	},
	focus: function focus() {
		if (this.codeMirror) {
			this.codeMirror.focus();
		}
	},
	focusChanged: function focusChanged(focused) {
		this.setState({
			isFocused: focused
		});
		this.props.onFocusChange && this.props.onFocusChange(focused);
	},
	cursorActivity: function cursorActivity(cm) {
		this.props.onCursorActivity && this.props.onCursorActivity(cm);
	},
	scrollChanged: function scrollChanged(cm) {
		this.props.onScroll && this.props.onScroll(cm.getScrollInfo());
	},
	codemirrorValueChanged: function codemirrorValueChanged(doc, change) {
		this.setState({
			origin: change.origin
		});
		if (this.props.onChange && change.origin !== 'setValue') {
			this.props.onChange(doc.getValue(), change);
		}
	},
	render: function render() {
		var _this = this;

		var editorClassName = className('ReactCodeMirror', this.state.isFocused ? 'ReactCodeMirror--focused' : null, this.props.className);
		return React.createElement(
			'div',
			{ className: editorClassName },
			React.createElement('textarea', {
				ref: function (ref) {
					return _this.textareaNode = ref;
				},
				name: this.props.name || this.props.path,
				value: this.props.value,
				onChange: this.props.onChange,
				autoComplete: 'off',
				autoFocus: this.props.autoFocus
			})
		);
	}
});

module.exports = CodeMirror;
