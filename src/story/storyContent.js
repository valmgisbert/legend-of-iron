function storyContentMaker (mcName, cohortType) {

  //background
  const entrance = require('./bg/entrance-resize.JPG');
  const puffsArea = require('./bg/puffs-area-resize.JPG')
  const dishes = require('./bg/dirty-dishes-resize.JPG')
  const kitchen = require('./bg/kitchen-resize.JPG')
  const board = require('./bg/board-resize.JPG')

  //background music
  
  //characters
  const urosChar = "Uros";
  const nevanChar = "Nevan";
  const tjerekChar = "Trejek";
  const boardMsg = "Board Message";
  const lokiChar = "Loki";
  const gretaChar = "Greta";
 
  
  //sprites
  const urosSpr = require('./sprites/uros.png')
  const nevanSpr = require('./sprites/nevan.png')
  const tjerekSpr = require('./sprites/tjerek.png')
  const lokiSpr = require('./sprites/loki.png')
  const gretaSpr = require('./sprites/greta.png')

  //helper func
  function getTeacher (cohortStr) { 
    if (cohortStr === 'ux/ui'){
      return nevanChar;
    }
    else if (cohortStr === 'web'){
      return urosChar;
    }
    else if (cohortStr === 'data'){
      return tjerekChar;
    }
  }
  function getTeacherSprite (cohortStr) { 
    if (cohortStr === 'ux/ui'){
      return nevanSpr;
    }
    else if (cohortStr === 'web'){
      return urosSpr;
    }
    else if (cohortStr === 'data'){
      return tjerekSpr;
    }
  }

  //character values post function
  const mc = mcName;
  let teacher = getTeacher(cohortType);
  let teacherSpr = getTeacherSprite(cohortType);


  //story 
  let storyContent = [
  {
    bg: kitchen,
    speaker: mc,
    text: "Early in the morning, I walk to the IH campus. It’s the middle of project week, and I barely know how to live with myself."
  }, {
    bg: kitchen,
    speaker: mc,
    text: "A good samaritan put the coffee machine to work, thank the Heavens! I thought I wouldn’t make it to 11a.m."
  }, {
    bg: kitchen,
    speaker: mc,
    text: "I grabbed a cup from the cupboard, luckily getting a clean one on the first try. It’s a bingo at this point. "
  }, {
    bg: kitchen,
    speaker: mc,
    text: "Practically chugging down the coffee, I hear my teacher call my classmates to go back to the classroom for an important lesson."
  },{
    bg: kitchen,
    speaker: mc,
    text: "After I finish the coffee, I glance down to the sink."
  }, {
    bgTransition: "scene-change",
    bg: dishes,
    speaker: mc,
    text: "There are lots of cups and plates stacked. It’s not even midday, how is it already like this?"
  }, {
    bg: dishes,
    speaker: mc,
    choicesExist: true, 
    text: "What do I do? I need to get to class..."
  },{
    bg: dishes,
    speaker: mc,
    routeStart: "Goodboi",
    text: "Still, I should clean up after myself. They did say this is like our home during the bootcamp and my mom didn’t raise a nasty gremlin.",
    store: "goodBoiPoints"
  },
  {
    bg: dishes,
    speaker: mc,
    text: "I wash my cup quickly and hurry to the class.",
    jumpTo: "backToStory"
  },  
  {
    bg: dishes,
    speaker: mc,
    routeStart: "Badboi",
    text: "Uhh, nobody has time for being a decent person. Also, I don't want to lose anything of the lecture, either.",
    store: "badBoiPoints"
  },
  {
    bg: dishes,
    speaker: mc,
    text: "I leave my cup there and hurry to the classroom.",
    jumpTo: "backToStory"
  },
  {
    bg: dishes,
    speaker: mc,
    text: `I see ${teacher} holding the door to check who was missing. He smiles and ushers me to the classroom.`,
    receiveJump: "backToStory"
  },
  {
    bg: puffsArea,
    speaker: mc,
    text: "I walk quickly to the classroom before he closes it."
  },
  {
    sprite: teacherSpr,
    bg: board,
    spriteEffect: "move-left",
    speaker: teacher,
    text: "Alright guys, give me 2 minutes and we'll start"
  }, 
  {
    bg: board,
    spriteEffect: "from-left-leave-right",
    speaker: mc,
    text: "Everybody takes their seats to wait for the lecture to start."
  },
  {
    bg: board,
    speaker: mc,
    text: "But something in the board catches my attention."
  },
  {
    bg: board,
    speaker: mc,
    text: "It's a teeny tiny message!"
  },
  {
    bg: board,
    speaker: mc,
    choicesExist: true,
    text: `Should I read it? There might be a bit of time left before ${teacher} comes back...`
  },
  {
    routeStart: "thankYou",
    bg: board,
    speaker: mc,
    text: "If I don't read it now it will haunt me later. Let's see..."
  },
  {
    bg: board,
    bgTransition: "grow",
    speaker: boardMsg,
    text: "Look at you, you absolute star. You barely knew about coding 9 weeks ago, and now?"
  },
  {
    bg: board,
    speaker: boardMsg,
    text: "You're glowing with knowledge and resilience! Ready (maybe) to punch the tech market in the face!"
  },
  {
    bg: board,
    speaker: boardMsg,
    text: "And you, teachers! Absolute blessings. We are all eternally grateful."
  },
  {
    bg: board,
    speaker: boardMsg,
    text: "Know that wherever you, I am proud of you.",
    jumpTo: "continueStory"
  },
  {
    routeStart: "noThankYou",
    bg: board,
    speaker: boardMsg,
    text: "Meh, there is no boiling need of gossip right now. I should sit down.",
    jumpTo: "continueStory"
  },
  {
    sprite: teacherSpr,
    bg: board,
    spriteEffect: "move-left",
    speaker: teacher,
    text: "Okay! everybody ready?",
    receiveJump: "continueStory"
  },
]

return storyContent;

}
export default storyContentMaker; 