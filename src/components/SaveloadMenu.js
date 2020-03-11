import React, { Component } from 'react'
import axios from 'axios';
import {withAuth} from './../lib/Auth'
import authService from './../lib/auth-service'

class SaveLoadMenu extends Component {
    state = {
      saveSlotNumber: 1,
      saveSlots: []
    }

    componentDidMount() {
      authService.profile()
        .then( (user) => this.setState({saveSlots: user.saveSlots}))
    }

    saveGame = () => {
      console.log('save');
      //this const is coming from authProvider
      const {currentGameIndex} = this.props;
      axios.post(`${process.env.REACT_APP_API_URL}/settings/saveload`, {currentGameIndex}, {withCredentials: true})
        .then( (response) => {
          const updatedUser = response.data;
          this.setState({saveSlots: updatedUser.saveSlots});
        })
        .catch( (err) => console.log(err));
    }

    loadGame = (saveSlotId) => {
      let selectedSaveSlot = this.state.saveSlots.find((slot) => {
        //if it finds the id that you're looking for, it will return the slot
        return slot._id === saveSlotId
      })
      this.props.setCurrentGameIndex(selectedSaveSlot.currentGameIndex, true )
      // this.props.history.push('/story');
    }
    
    //this is to display buttons 
    isSlotSaved = () => {
      console.log(this.state);
      let slotsToRender = [];
      for (let i = 0; i < 3; i++) {
        console.log(i);
        
        let slotStyle = {};
        let buttonStatus = "save";
        if (this.state.saveSlots[i]) {
          slotStyle["backgroundColor"] = "red";
          buttonStatus = "load";
        } else {
          slotStyle["backgroundColor"] = "green";
        }
        
        const clickHandler = buttonStatus === "save" ? this.saveGame : this.loadGame
        const slotId = this.state.saveSlots[i] ? this.state.saveSlots[i]._id : null;
        
        slotsToRender.push(
          //the loadgame callback will look for the id of that specific saveslot on click
          //the savegame callback will make POST req to server
          <button className="save-load-btn" onClick={() => clickHandler(slotId)}
          style={slotStyle}>
            {buttonStatus} {i}
          </button>
        );
      }
      return <div className="save-load-buttons">{slotsToRender}</div>;
    }

    //
    

  render() {
    return (
      <div className="overlay overlay-save-load">
        { this.isSlotSaved()}
      </div>
    )
  }
}

export default withAuth(SaveLoadMenu);