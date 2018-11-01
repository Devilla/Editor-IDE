import React, { Component } from 'react';
// eslint-disable-next-line import/no-unresolved, import/extensions
import MonacoEditor from 'react-monaco-editor';
import Button from 'react-bootstrap-button-loader';
/* eslint-enable import/no-extraneous-dependencies */
import './App.css';
import safeEval from 'safe-eval';
import * as CampK12 from './components/CampK12'


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '// type your code... \n',
      message:'',
      chatbot: 'ok',
      messageData: [],
      chatbotData: [],
      loading: false
    }
    // this.state.messageData.push('Begin ?');
    // this.state.chatbotData.push('hi, how can i help?');
  }

  onChange = (newValue, e) => {
    // console.log('onChange', newValue, e); // eslint-disable-line no-console
    this.setState({ code: newValue });
    console.log('CODE : ',this.state.code);
  }
  onSubmit = (e) => {
    if(e.keyCode === 13) {
    this.setState({message: ""});
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
    this.setState({loading:true});
    this.setState({chatbot : safeEval(this.state.code+'()') });
    CampK12.askSusi();
  }

  render() {
    const { code } = this.state;
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: false,
    };

    return (
      <div className="App">
      <div style={{width: "113%", height: "50px", backgroundColor: "#171717"}}>
      <div id="AI-Playground" style={{color: "#ffffff", width: "113%", marginLeft: "-1109px", marginTop:"0px", paddingTop: "13px"}}>AI Playground
      <div style={{color: "#ffffff", marginRight: "-3100px", marginTop: "-27px", paddingTop: "13px"}}>Learn AI</div>
      <div style={{color: "#ffffff", marginRight: "-3250px", marginTop: "-31px", paddingTop: "13px"}}>Docs</div>
      <div style={{color: "#ffffff", marginRight: "-3349px", marginTop: "-24px", paddingTop: "14px"}}>
      <img style={{borderRadius:"60px",  marginTop: "-31px", hight:"25px", width:"25px"}} src="https://secure.gravatar.com/avatar/ae9ba1e5d720e581296722b558d48283?s=36&d=https://app.zeplin.io/img/emotars/emotarGift.png" />
      <div className="caret" style={{color: "#ffffff", height:"25px", marginLeft: "100px", marginTop: "-25px"}} >Account</div>
      </div>
      </div>
      </div>
      <div id="navbar-top" style={{backgroundColor: "#1f1f1f", color: "white"}}>
      <Button className="Apply-Changes" loading={this.state.loading} onClick={this.applyChange}>Apply Changes!</Button>
      </div>
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

            return( <div>


            <img style={{borderRadius:"60px", marginLeft: "78px", marginTop: "-31px", hight:"25px", width:"25px"}} src="https://secure.gravatar.com/avatar/ae9ba1e5d720e581296722b558d48283?s=36&d=https://app.zeplin.io/img/emotars/emotarGift.png" />
            <div key={i} className="Rectangle-4-Copy-3">{this.state.messageData[i]}</div>
            <img style={{borderRadius:"60px", marginLeft: "-444px", marginTop: "-31px", hight:"25px", width:"25px"}} src="bot.jpg" />
            <div key={i} className="Rectangle-4-Copy-2">{item}</div>
            </div>


          );
          })
         }
         </div>
         <input
         placeholder="Type message here..."
         className="Type-message-here"
         value={this.state.message}
         onChange={ this.handleChange }
         onKeyUp={ this.onSubmit }/>
         </div>
        </header>
      </div>
    );
  }
}

export default App;
