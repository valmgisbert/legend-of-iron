import React, { Component } from 'react';
import {withAuth} from "./../lib/Auth";
import storyContentMaker from './../story/storyContent';
import StoryFrame from './../components/StoryFrame';
import ChoiceMenu from './../components/ChoiceMenu';
import SaveLoadMenu from './../components/SaveLoadMenu';
import choicesContent from './../story/choicesContent';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Fullscreen from "react-full-screen";
import WheelReact from "wheel-react";

class Story extends Component {
  constructor() {
    super();
    this.setFrame = this.setFrame.bind(this);
    this.state = {
      // font: "Trebuchet MS",
      isFull: false,
      choicesStore: {},
      index: 0,
      stateHistory: [],
      choicesHistory: [],
      choicesIndexHistory: [],
      indexHistory: [],
      choicesExist: false,
      frameIsRendering: false,
      mainMenuShown: true,
      textBoxShown: true,
      storyContent: null
    }
  }


  //pop up to notify unsaved changes when the user tries to leave the pg
  componentDidMount() {
    this.beginStory();
    // window.addEventListener("beforeunload", e => (e.returnValue = "You sure you want to leave? any unsaved progress will be lost forever."));
  }

  //render the specific frame that follows the beginning of a route post-choice
  setFramePostChoice(choice, routeStart) {
    const {storyContent} = this.state;
    for (var i = 0; i < storyContent.length; i++) {
      if (routeStart === storyContent[i].routeStart) {
        this.setFrame(i);
      }
    }
    
    //where the choices are stored after making them
    let choicesStore = { ...this.state.choicesStore };
    choicesStore[choice]++ || (choicesStore[choice] = 1); //CAPUQ: i can put just the first one, right?
    this.setState({ choicesStore });
  }

  //depending on the choice, render a certain frame in the storyCont index
  setNextFrame() {
    const {storyContent} = this.state;
    const currentIndex = this.state.index;
    const jumpToBecauseStore = storyContent[currentIndex].jumpToBecauseStore;
    if (storyContent[currentIndex].jumpToBecauseStore) {
      for (let i = 0; i < storyContent.length; i++) {
        if (storyContent[i].receiveJumpBecauseStore) {
          if (
            jumpToBecauseStore === storyContent[i].receiveJumpBecauseStore[0] &&
            this.state.choicesStore[jumpToBecauseStore] === storyContent[i].receiveJumpBecauseStore[1]
          ) {
            this.setFrame(i);
            return;
          }
        }
      }
    }
    if (storyContent[currentIndex].jumpTo) {
      for (let i = 0; i < storyContent.length; i++) {
        if (storyContent[currentIndex].jumpTo === storyContent[i].receiveJump) {
          this.setFrame(i);
          return;
        }
      }
    }
    if (
      !this.state.choicesExist &&
      !this.state.titleScreenShown
    ) {
      this.setFrame(currentIndex + 1);
    }
  }

  setFrame(index) {
    const {storyContent} = this.state;
    // Makes sure the index is within the story array
    if (index >= storyContent.length) {
      index = storyContent.length - 1;
    } else if (index <= -1) {
      index = 0;
    }

    // Updates story with new index
    this.setState({
      index: index,
      bg: storyContent[index].bg,
      bgm: storyContent[index].bgm,
      choicesExist: storyContent[index].choicesExist,
      // soundEffect: storyContent[index].soundEffect,
      speaker: storyContent[index].speaker,
      // sprite: story[index].sprite,
      // spriteEffect: story[index].spriteEffect,
      spriteTransition: storyContent[index].spriteTransition,
      text: storyContent[index].text,
      bgTransition: storyContent[index].bgTransition
    });
    //this is to set the loaded index as the current one
    this.props.setCurrentGameIndex(index);
  }

  setChoice(choicesIndex) {
    // Makes sure the index is within the Choices array
    if (choicesIndex >= choicesContent.length) {
      choicesIndex = choicesContent.length - 1;
    } else if (choicesIndex <= -1) {
      choicesIndex = 0;
    }

    this.setState({
      choicesIndex: choicesIndex,
      choiceOptions: choicesContent[choicesIndex].choices
    });
  }

  handleChoiceSelected(event) {
    this.setFramePostChoice(event.currentTarget.name, event.currentTarget.alt);
    let nextIndex = 0;
    if (event.currentTarget.id) {
      this.setState({ choicesStore: {} });
    }
    if (event.currentTarget.placeholder) {
      nextIndex = parseInt(event.currentTarget.placeholder, 10);
    } else {
      nextIndex = this.state.choicesIndex + 1;
    }
    this.setChoice(nextIndex);
  }

  renderChoiceMenu() {
    return (
      <ChoiceMenu choiceOptions={this.state.choiceOptions} onChoiceSelected={this.handleChoiceSelected.bind(this)} />
    );
  }

  //Toggles
  toggleTextBox() {
    this.setState(prevState => ({
      textBoxShown: !prevState.textBoxShown
    }));
  }


  //save & load slots
  saveSlot(number) {
    var date = new Date();
    var fullDateInfo =
      ("0" + date.getDate()).slice(-2) +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      date.getYear() +
      " " +
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2);

    localStorage.setItem("time" + number, fullDateInfo);
    localStorage.setItem(number, JSON.stringify(this.state, (k, v) => (v === undefined ? null : v)));
    this.setState(this.state);
  }

  loadSlot(number) {
    this.setState(JSON.parse(localStorage.getItem(number)));
    this.setState({
      saveMenuShown: false
    }); // save menu to false and not load because save is true when saving
  }

  renderFrame() {
    return (
      <StoryFrame
        font={this.state.font}
        setNextFrame={this.setNextFrame.bind(this)}
        bg={this.state.bg}
        // sprite={this.state.sprite}
        // spriteEffect={this.state.spriteEffect}
        // spriteTransition={this.state.spriteTransition}
        speaker={this.state.speaker}
        text={this.state.text}
        textBoxShown={this.state.textBoxShown}
        bgTransition={this.state.bgTransition}
      />
    );
  }

  beginStory() {
    //this is coming from the authProvider
    const {studentName, cohort} = this.props.user;
    const storyContent = storyContentMaker(studentName, cohort);
    const {currentGameIndex} = this.props;
    //one new arr with all the names needed
    this.setState({
      titleScreenShown: false,
      frameIsRendering: true,
      choicesIndex: 0,
      choiceOptions: choicesContent[0].choices,
      storyContent
    }, () => this.setFrame(currentGameIndex));
    //once the setState is done, set the frame
  }

  // saveMenu() {
  //   return (
  //     <SaveLoadMenu
  //       choicesExist={this.state.choicesExist}
  //       choiceOptions={this.state.choiceOptions}
  //       confirmationMessage="Overwrite save?"
  //       currentTime={this.state.currentTime}
  //       menuType="Save"
  //       executeSlot={this.saveSlot.bind(this)}
  //       toggleMenu={this.toggleSaveMenu.bind(this)}
  //       speaker={this.state.speaker}
  //       text={this.state.text}
  //       textBoxShown={this.state.textBoxShown}
  //     />
  //   );
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.index < this.state.index) {
      this.setState({
        choicesHistory: [...this.state.choicesHistory, prevState.choicesStore],
        choicesIndexHistory: [...this.state.choicesIndexHistory, prevState.choicesIndex],
        indexHistory: [...this.state.indexHistory, prevState.index]
      });
    }
  }

  //sound-related functions
  // playBGM() {
  //   return <Sound url={this.state.bgm} volume={this.state.bgmVolume} playStatus={Sound.status.PLAYING} loop={true} />;
  // }
  // playSoundEffect() {
  //   return (
  //     <Sound url={this.state.soundEffect} volume={this.state.soundEffectVolume} playStatus={Sound.status.PLAYING} />
  //   );
  // }

  render() {
    let zoomMultiplier = 0;
    if (window.innerWidth * 1 / window.innerHeight <= 1280 * 1 / 720) {
      zoomMultiplier = window.innerWidth * 1 / 1280;
    } else {
      zoomMultiplier = window.innerHeight * 1 / 720;
    }
    return (
      <div {...WheelReact.events} style={this.state.isFull ? { zoom: zoomMultiplier } : null}>
        <Fullscreen enabled={this.state.isFull} onChange={isFull => this.setState({ isFull })}>
        <ReactCSSTransitionGroup
            className="container"
            component="div"
            transitionName="menu"
            transitionEnterTimeout={400}
            transitionLeaveTimeout={400}
          >
          {!this.state.storyContent ? null : <div>
              {this.state.frameIsRendering ? this.renderFrame() : null}
              {this.state.choicesExist ? this.renderChoiceMenu() : null}
            </div>
          }
        </ReactCSSTransitionGroup>
        </Fullscreen>
      </div>
    )
  }
}

export default withAuth(Story);