import React, { Component } from 'react';
// eslint-disable-next-line import/no-unresolved, import/extensions
import MonacoEditor from 'react-monaco-editor';
/* eslint-enable import/no-extraneous-dependencies */
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '// type your code... \n',
      message: 'hello',
      chatbot: 'hi, how can i help?'
    }
  }

  onChange = (newValue, e) => {
    console.log('onChange', newValue, e); // eslint-disable-line no-console
  }
  onSubmit = (e) => {
    if(e.keyCode == 13)
    console.log("Enter pressed"); // eslint-disable-line no-console
  }

  editorDidMount = (editor) => {
    // eslint-disable-next-line no-console
    console.log('editorDidMount', editor, editor.getValue(), editor.getModel());
    this.editor = editor;
  }

  changeEditorValue = () => {
    if (this.editor) {
      this.editor.setValue('// code changed! \n');
    }
  }

  changeBySetState = () => {
    this.setState({ code: '// code changed by setState! \n' });
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value });
  }

  render() {
    const { code, message, chatbot } = this.state;
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: false,
    };

    return (
      <div className="App">
        <header className="text-left">
        <MonacoEditor
          height="800"
          width="600"
          language="javascript"
          theme="vs-dark"
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
        />
         <div className="Rectangle">
         <div className="Rectangle2">
         <div className="Rectangle-4-Copy-2">{chatbot}</div>
         <div className="Rectangle-4-Copy-3">{message}</div>
         </div>
         <input 
         placeholder="Type message here..." 
         className="Type-message-here" 
      
         onChange={this.handleChange }
         onKeyUp={this.onSubmit}/>
         </div>

        </header>
       
      </div>
    );
  }
}

export default App;
