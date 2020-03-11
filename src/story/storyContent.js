function storyContentMaker (mcName, cohortType) {

  //background
  const entrance = require('./bg/entrance.jpg');
  const puffsArea = require('./bg/puffs-area.jpg')
  const dishes = require('./bg/dirty-dishes.jpg')

  //background music
  
  //characters
  const urosChar = "Uros";
  const nevanChar = "Nevan";
  const tjerekChar = "Trejek";
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
    bg: entrance,
    speaker: mc,
    text: "Early in the morning, I walk to the IH campus. It’s the middle of project week, and I barely know how to live with myself."
  }, {
    bg: entrance,
    speaker: mc,
    text: "A good samaritan put the coffee machine to work, thank the Heavens! I thought I wouldn’t make it to 11a.m."
  }, {
    bg: puffsArea,
    speaker: mc,
    text: "I grabbed a cup from the cupboard, luckily getting a clean one on the first try. It’s a bingo at this point. "
  }, {
    bg: puffsArea,
    speaker: mc,
    text: "Practically chugging down the coffee, I hear my teacher call my classmates to go back to the classroom for an important lesson."
  },{
    bg: puffsArea,
    speaker: mc,
    text: "After I finish the coffee, I glance down to the sink."
  }, {
    bg: dishes,
    speaker: mc,
    text: "There are lots of cups and plates stacked. It’s not even midday, how is it already like this?"
  }, {
    // bg: dishes,
    speaker: mc,
    choicesExist: true, text: "What do I do? I need to get to class..."
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
    text: " OH FOR FUCKS SAKEUNCLEAN",
    store: "badBoiPoints"
  },
  {
    bg: dishes,
    speaker: mc,
    text: "iufheuhfuwehf bAD ROUTE",
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
    bg: puffsArea,
    // spriteEffect: "move-left",
    speaker: teacher,
    sprite: teacherSpr,
    text: "I walk quickly to the classroom before he closes it."
  }, 


]

return storyContent;

}
export default storyContentMaker; 