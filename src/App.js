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
      chatbot: 'ok',
      messageData: [],
      chatbotData: []
    }
    this.state.chatbotData.push('hi, how can i help?');
  }

  onChange = (newValue, e) => {
    // console.log('onChange', newValue, e); // eslint-disable-line no-console
    this.setState({ code: newValue });
    console.log('CODE : ',this.state.code);
  }
  onSubmit = (e) => {
    if(e.keyCode === 13) {
    console.log("Enter pressed",e.target.value); // eslint-disable-line no-console
    this.state.messageData.push(e.target.value);
    this.state.chatbotData.push(this.state.chatbot);
    }
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

  applyChange = () => {
    // console.log('onChange', newValue, e); // eslint-disable-line no-console
    // this.setState({ code: newValue });
    // console.log('This CODE to be eval : ',eval(this.state.code));
    this.state.chatbot = this.state.code.split('"', 2);
    console.log("CHATBOT DATA :",this.state.chatbot[1]);
    this.state.chatbot = this.state.chatbot[1];
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
      <button  className="Apply-Changes" onClick={this.applyChange}>Apply Changes</button>
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
         
         { 
            this.state.chatbotData.map((item, i) => {
          
            return <div><div key={i} className="Rectangle-4-Copy-2">{item}</div> 
            <div key={i} className="Rectangle-4-Copy-3">{this.state.messageData[i]}</div></div>;
          })
         }
         </div>
         <input 
         placeholder="Type message here..." 
         className="Type-message-here" 
      
         onChange={ this.handleChange }
         onKeyUp={ this.onSubmit }/>
         </div>
        </header>
      </div>
    );
  }
}

export default App;
