import React from 'react';
/**
import logo from "./logo.svg" ;
 **/

import "./App.css";
import { faFreeCodeCamp} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExpandArrowsAlt} from "@fortawesome/free-solid-svg-icons";
import {faCompressArrowsAlt} from "@fortawesome/free-solid-svg-icons";
import marked_1 from "marked/lib/marked.esm";

const DEFAULTINPUT = "# Welcome to my React Markdown Previewer!\n" +
    "\n" +
    "## This is a sub-heading...\n" +
    "### And here's some other cool stuff:\n" +
    "  \n" +
    "Heres some code, `<div></div>`, between 2 backticks.\n" +
    "\n" +
    "```\n" +
    "// this is multi-line code:\n" +
    "\n" +
    "function anotherExample(firstLine, lastLine) {\n" +
    "  if (firstLine == '```' && lastLine == '```') {\n" +
    "    return multiLineCode;\n" +
    "  }\n" +
    "}\n" +
    "```\n" +
    "  \n" +
    "You can also make text **bold**... whoa!\n" +
    "Or _italic_.\n" +
    "Or... wait for it... **_both!_**\n" +
    "And feel free to go crazy ~~crossing stuff out~~.\n" +
    "\n" +
    "There's also [links](https://www.freecodecamp.com), and\n" +
    "> Block Quotes!\n" +
    "\n" +
    "And if you want to get really crazy, even tables:\n" +
    "\n" +
    "Wild Header | Crazy Header | Another Header?\n" +
    "------------ | ------------- | ------------- \n" +
    "Your content can | be here, and it | can be here....\n" +
    "And here. | Okay. | I think we get it.\n" +
    "\n" +
    "- And of course there are lists.\n" +
    "  - Some are bulleted.\n" +
    "     - With different indentation levels.\n" +
    "        - That look like this.\n" +
    "\n" +
    "\n" +
    "1. And there are numbererd lists too.\n" +
    "1. Use just 1s if you want! \n" +
    "1. But the list goes on...\n" +
    "- Even if you use dashes or asterisks.\n" +
    "* And last but not least, let's not forget embedded images:\n" +
    "\n" +
    "![React Logo w/ Text](https://goo.gl/Umyytc)";
/**
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
 **/


class MarkdownPreviewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: DEFAULTINPUT,
            editorSize: true,
            previewSize: true,
            output: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickPrev = this.handleClickPrev.bind(this);
    }

    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }

    handleClickEdit() {
        this.setState(state => {
            if (state.editorSize === true) {
                return Object.assign({}, state, {editorSize: false});
            }
            return Object.assign({}, state, {editorSize: true});
        });
    }

    handleClickPrev() {
        this.setState(state => {
            if (state.previewSize === true) {
                return Object.assign({}, state, {previewSize: false});
            }
            return Object.assign({}, state, {previewSize: true});
        });
    }


    render() {


        return (
            <div className={"both"}>
                <div className={"row"}>
                    <div className={"col-6 editor"}>
                        <div className={"wrapperheader"}>
                            <FontAwesomeIcon className={"fccSymb"} icon={faFreeCodeCamp} size={"lg"}/>
                            <div
                                className={"title"}> Editor
                            </div>
                            <button className={"expandEditor windowsizebtn"} onClick={this.handleClickEdit}>
                                <FontAwesomeIcon
                                    icon={faExpandArrowsAlt}/></button>
                        </div>
                        <textarea id={"editor"} className={"inputfield"} value={this.state.input}
                                  onChange={this.handleChange}/>
                    </div>
                </div>
                <div className={"col-6 previewer"}>
                    <div className={"wrapperheader"}>
                        <FontAwesomeIcon className={"fccSymb"} icon={faFreeCodeCamp} size={"lg"}/>
                        <div className={"title"}> Previewer</div>
                        <button className={"extendPreview windowsizebtn"} onClick={this.handleClickPrev}>
                            <FontAwesomeIcon icon={faExpandArrowsAlt}/></button>
                    </div>

                        <PreviewTranslator input={this.state.input}/>

                </div>
            </div>
        );
    }
}



class PreviewTranslator extends React.Component{
    constructor(props){
        super(props);
        this.rawMarkup = this.rawMarkup.bind(this);
    };
    rawMarkup(){
        let rawMarkup = marked_1(this.props.input, {sanitize : true, breaks: true, gfm: true});
        return {__html: rawMarkup} ;
    };

    render(){

        return(
                <span id={"preview"} dangerouslySetInnerHTML={this.rawMarkup()}/>
        )
    };
}



//<PreviewTranslator input={this.state.input}/>



export {
  MarkdownPreviewer,
    PreviewTranslator
};

