'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var formBank = {};

var LabelForm = React.createClass({
  render: function(){
    return (
      <div>
        <h1>Here's the form!</h1>
        <form>
          <textarea value="text goes here"></textarea>
          <button>Submit</button>
        </form>
      </div>
    )
  }
});

formBank["Label"] = LabelForm;

var FormBuilder = React.createClass({
  getInitialState: function() {
    // currentForm starts as an empty array when page is loaded
    return {currentForm: []}
  },
  addTool: function(toolName) {
    var currentForm = this.state.currentForm;
    currentForm.push(toolName);
    this.setState({currentForm: currentForm})
  },
  render: function(){
    return (
      <div>
        <Builder formElements={this.state.currentForm} />
        <Toolbar addTool={this.addTool}/>
      </div>
    );
  }
});

var Builder = React.createClass({
  render: function() {
    var formElements = [];
    var body;

    for (var i = 0; i < this.props.formElements.length; i++) {
      var formForElement = formBank["label"]
      formElements.push(<FormElement key={i} element={this.props.formElements[i]} formForElement={formForElement}/>)
    }

    if(this.props.formElements[0] == null) {
      body = <span>Add form elements by clicking toolbar ––––></span>
    } else {
      body = (
        <div id="form=element-list">
          {formElements}
        </div>
      )
    }
    return(
      <div id="preview-pane">
        <h2>Builder</h2>
        {body}
      </div>
    );
  }
});

var FormElement = React.createClass({
  render: function() {
    return (
      <div className="form-element">
        <h3>{this.props.element}</h3>
        <div className="form-wrapper">
          {this.props.formForElement}
        </div>
      </div>
    )
  }
});

var Toolbar = React.createClass({
  render: function() {
    // all elements in toolbar will share same handleClick function to add to builder
      // (later, use inheritance/mixin/module pattern to make the code DRYer)
    return(
      <div id="toolbar-pane">
        <h2>Toolbar</h2>
        <Header />
        <Label handleClick={this.props.addTool}/>
      </div>
    );
    // need to hard-code other toolbar elements within toolbar-pane div above,
    // and create each of them as a unique React class below.
  }
});

var Header = React.createClass({
  render: function() {
    return(
      <div className="toolbar-element">
        <h3>Header</h3>
      </div>
    )
  }
})

var Label = React.createClass({
  getInitialState: function() {
    return {toolName: "Label"};
  },
  addTool: function() {
    this.props.handleClick(this.state.toolName);
  },
  render: function() {
    return(
      <div className="toolbar-element" onClick={this.addTool}>
        <h3>Label</h3>
      </div>
    )
  }
  // Looking ahead, we probably won't be passing the actual form element object [or its name] around.
  // Instead, maybe we'll pass a *reference* to an element up to the
  // parent, which will then render a *different* component containing an HTML form.
  // The match could happen on a unique keyword that is shared between toolbar
  // element and builder form element.
})

ReactDOM.render(<FormBuilder />, document.getElementById('form-builder'));
