
Input = require("../sdk/input");
ThreeUtils = require("../sdk/threeutils");
GlobalVariables = require("./globalvariables.js");

var InfoBox =
{
    currentText: undefined,
}

InfoBox.added = function()
{
    this.element = document.getElementById("infobox");
    this.element.style.visibility = "hidden";
}
InfoBox.display = function(name)
{
    var text = this.retrieveText(name);
    if (text){
        this.currentText = name;
        this.element.innerHTML = text;
        this.element.style.visibility = "visible";
    }
}
InfoBox.retrieveText = function(name)
{
    for (var i = InfoBox.info[name].cycle; i < InfoBox.info[name].data.length; i++)
    {
        var temp = this.parseConditionals(InfoBox.info[name].data[i]);
        if (temp)
        {
            if ((i+1) < InfoBox.info[name].data.length){
                 InfoBox.info[name].cycle = i + 1;
            }else{
                InfoBox.info[name].cycle = 0;
            }
            return temp;
        }
    }
    for (var i = 0; i < InfoBox.info[name].cycle; i++)
    {
        var temp = this.parseConditionals(InfoBox.info[name].data[i]);
        if (temp)
        {
            if ((i+1) < InfoBox.info[name].data.length){
                 InfoBox.info[name].cycle = i + 1;
            }else{
                InfoBox.info[name].cycle = 0;
            }
            return temp;
        }
    }
    return undefined;
}
InfoBox.hide = function()
{
    this.element.style.visibility = "hidden";
    this.currentText = undefined;
}
InfoBox.parseConditionals = function(item)
{
    for (var i = 0; item.isFalse && i < item.isFalse.length; i++)
    {
        if (GlobalVariables.getVariable(item.isFalse[i]))
		{
			return undefined;
        }
    }
    for (var i = 0; item.isTrue && i < item.isTrue.length; i++)
    {
		if (!GlobalVariables.getVariable(item.isTrue[i]))
		{
			return undefined;
		}
    }
    return item.text;
}

InfoBox.info = 
{
    prophet: 
    {
        cycle: 0,
        data:
        [
            {
                text: "\"Ladies and Gentlemen. Cardboard is the greatest thing ever!\"",
                isTrue: ["BOX_IN_WORMHOLE"],
                isFalse: ["SPEAKER_BROKEN"]
            },
            {
                text: "\"When I saw the holy cardboard box soar majestically through a portal in the sky, I knew it was destiny.\"",
                isTrue: ["BOX_IN_WORMHOLE"],
                isFalse: ["SPEAKER_BROKEN"]
            },
            {
                text: "\"Cardboard is simple, yet majestic.\"",
                isTrue: ["BOX_IN_WORMHOLE"],
                isFalse: ["SPEAKER_BROKEN"]
            },
            {
                text: "\"Don't talk to me. My holy destiny is foiled. If I cannot proclaim to the crowds than I shan't proclaim at all.\"",
                isTrue: ["BOX_IN_WORMHOLE", "SPEAKER_BROKEN"],
                isFalse: []
            }
        ]
    },
    speaker: 
    { 
        cycle: 0,
        data:
        [
            {
                text: "It looks like you could break Maximus's speaker so he finally shuts up.",
                isTrue: [],
                isFalse: ["SPEAKER_BROKEN"]
            },
            {
                text: "The speaker is broken",
                isTrue: ["SPEAKER_BROKEN"],
                isFalse: []
            }
        ]
    },
    wormhole: 
    {
        cycle: 0,
        data: 
        [
            {
                text: "The wormhole is almost mesmerizing.",
                isTrue: ["WORMHOLE_ACTIVATED"],
                isFalse: ["BOX_IN_WORMHOLE"]
            },
            {
                text: "The wormhole looks like it broke after you threw the box in. Shoddy workmanship.",
                isTrue: ["WORMHOLE_ACTIVATED", "BOX_IN_WORMHOLE"],
                isFalse: []
            },
        ]
    },
    crystal1:
    {
        cycle: 0,
        data:
        [
            {
                text: "It's me, trapped in a pathetic prison."
            },
            {
                text: "This is the dark artifact that houses my essense."
            },
            {
                text: "I must free myself from these walls."
            },
        ]
    },
    forceField:
    {
        cycle: 0,
        data:
        [
            {
                text: "This is a strong force field."
            },
            {
                text: "I need to deactivate it somehow."
            },
        ]
    },
    laser_force_exit: {
        cycle: 0,
        data: [
            {
                text: "The lasers shouldn't hurt anymore, but I still can't get past the force field.",
                isTrue: ["LASERS_DONT_HURT"],
                isFalse: ["NO_FUTURE_TECH"]
            },
            {
                text: "The force field is down, but if I try to get through those lasers I'll probably look like french fries.",
                isFalse: ["LASERS_DONT_HURT"],
                isTrue: ["NO_FUTURE_TECH"]
            },
            {
                text: "There is a force field and lasers in the way.",
                isTrue: [],
                isFalse: ["LASERS_DONT_HURT", "NO_FUTURE_TECH"]
            }
        ]
    },
    moatImpassable:
    {
        cycle: 0,
        data:
        [
            {
                text: "There is a moat in the way. It is full of water and dark-crystal-eating crocodiles.",
            }
        ]
    },
    crystal2:
    {
        cycle: 0,
        data:
        [
            {
                text: "A crocodile moat, really?"
            },
            {
                text: "Did they build their prison by looing at the \"Cartoon Villain Notebook of Cliches\"?"
            },
            {
                text: "I can't swim in this form."
            },
        ]
    },
    moat: 
    {
        cycle: 0,
        data: [
            {
                text: "That moat is filled with very hungry-looking crocodiles.",
                isTrue: [],
                isFalse: ["DAM_BUILT", "FOOD_FOR_ANIMALS"]
            },
            {
                text: "Poor hungry crocodiles.",
                isTrue: [],
                isFalse: ["DAM_BUILT", "FOOD_FOR_ANIMALS"]
            },
            {
                text: "Those crocodiles are so fat now. I don't think they want to eat me anymore.",
                isTrue: ["FOOD_FOR_ANIMALS"],
                isFalse: ["DAM_BUILT"]
            },
            {
                text: "I can walk across the crocodiles' backs now.",
                isTrue: ["FOOD_FOR_ANIMALS"],
                isFalse: ["DAM_BUILT"]
            },
            {
                text: "No water. No crocodiles. Easy.",
                isTrue: ["DAM_BUILT"],
                isFalse: []
            },
            {
                text: "The dam must have diverted the water.",
                isTrue: ["DAM_BUILT"],
                isFalse: []
            }
        ],
    },
    moatDoor: 
    {
        cycle: 0,
        data: [
            {
                text: "There is a crocodile-filled moat in the way.",
                isTrue: [],
                isFalse: ["DAM_BUILT", "FOOD_FOR_ANIMALS"]
            }
        ],
    },
    crystal3:
    {
        cycle: 0,
        data:
        [
            {
                text: "I don't like locked doors."
            },
            {
                text: "It's really a lot harder to open doors when you have no hands."
            }
        ]
    },
    keypad: 
    {
        cycle: 0,
        data: [
            {
                text: "The door is locked.",
                isTrue: [],
                isFalse: ["BAD_DOOR", "LAMP_PLUGGED_IN", "DAM_BUILT"]
            },
            {
                text: "I tried \"0000\". I guess the manufacturers aren't that stupid.",
                isTrue: [],
                isFalse: ["BAD_DOOR", "LAMP_PLUGGED_IN", "DAM_BUILT"]
            },
            {
                text: "\"Password\" doesn't work either.",
                isTrue: [],
                isFalse: ["BAD_DOOR", "LAMP_PLUGGED_IN", "DAM_BUILT"]
            },
                       {
                text: "The door is locked.",
                isTrue: ["DAM_BUILT"],
                isFalse: ["BAD_DOOR"]
            },
            {
                text: "I tried \"0000\". I guess the manufacturers aren't that stupid.",
                isTrue: ["DAM_BUILT"],
                isFalse: ["BAD_DOOR"]
            },
            {
                text: "\"Password\" doesn't work either.",
                isTrue: ["DAM_BUILT"],
                isFalse: ["BAD_DOOR"]
            },
            {
                text: "Well, what do you know? \"0000\" does work. I guess that cousin hit his head pretty hard.",
                isTrue: ["BAD_DOOR"],
                isFalse: ["LAMP_PLUGGED_IN"]
            },
            {
                text: "Since the door no longer has power, I can slide it open.",
                isTrue: ["LAMP_PLUGGED_IN"],
                isFalse: ["DAM_BUILT"]
            }
        ]
    },
    outlet: 
    {
        cycle: 0,
        data: [
            {
                text: "This outlet appears to be connected to the same power source as the door.",
                isTrue: [],
                isFalse: ["LAMP_PLUGGED_IN"]
            },
            {
                text: "Why is there a random outlet here, anyway?",
                isTrue: [],
                isFalse: ["LAMP_PLUGGED_IN"]
            },
            {
                text: "The lamp is draining all the electricity from the door. I guess they have a power shortage issue.",
                isTrue: ["LAMP_PLUGGED_IN"],
                isFalse: ["DAM_BUILT"]
            },
            {
                text: "The lamp is plugged in, but doesn't seem to affect the door at all. I guess they have plenty of electricity.",
                isTrue: ["LAMP_PLUGGED_IN", "DAM_BUILT"], 
                isFalse: []
            },
        ]
    },
    lamp: 
    {
        cycle: 0,
        data: [
            {
                text: "The lamp is working.",
            },
            {
                text: "Funny. The lamp has no off button. It just turns on when you plug it in.",
            },
            {
                text: "That seems like a design flaw...",
            },
            {
                text: "The lamp is draining all the electricity from the door. I guess they have a power shortage issue.",
                isTrue: ["LAMP_PLUGGED_IN"],
                isFalse: ["DAM_BUILT"]
            },
        ]
    },
    crystal4:
    {
        cycle: 0,
        data:
        [
            {
                text: "Call me \"Theseus\"."
            },
            {
                text: "If there's a minotaur in there, I'm done."
            },
            {
                text: "Next up: six hours of underwater maze levels."
            },
            {
                text: "Just kidding. I hope."
            }
        ]
    },
    labyrinth: 
    {
        cycle: 0,
        data: [
            {
                text: "An underwater labyrinth. [Sigh]. Too bad I can't swim as a crystal.",
                isTrue: [],
                isFalse: ["DAM_BUILT", "BAD_LABYRINTH"]
            },
            {
                text: "I'm not going into the labyrinth while it's filled with water.",
                isTrue: [],
                isFalse: ["DAM_BUILT"]
            },
            {
                text: "That labyrinth is too complicated to solve easily. I don't want to get lost.",
                isTrue: ["DAM_BUILT"],
                isFalse: ["BAD_LABYRINTH"]
            },
            {
                text: "Wow. That idiot cousin made this labyrinth a piece of cake to get through.",
                isTrue: ["DAM_BUILT", "BAD_LABYRINTH"],
                isFalse: []
            },
            {
                text: "There are pipes along the sides as if someone once pumped water into it.",
                isTrue: ["DAM_BUILT"],
                isFalse: []
            },
        ]
    },
    puddle:
    {
        cycle: 0,
        data: [
            {
                text: "The labyrinth is leaking. Who floods a labyrinth with water?",
                isTrue: [],
                isFalse: ["DAM_BUILT", "BAD_LABYRINTH"]
            },
            {
                text: "If I had legs, I might make some money off a slip-and-fall lawsuit.",
                isTrue: [],
                isFalse: ["DAM_BUILT", "BAD_LABYRINTH"]
            },
        ]
    },
    crystal5:
    {
        cycle: 0,
        data:
        [
            {
                text: "I wouldn't want to work as a guard down here.",
                isTrue: [],
                isFalse: ["ANIMAL_REST"]
            },
            {
                text: "Puzzles and tigers and guards, oh my!",
                isTrue: ["CARNIVAL"],
                isFalse: ["ANIMAL_REST"]
            },
            {
                text: "This place has so much security."
            }
        ]
    },
    guard: 
    {
        cycle: 0,
        data:
        [
            {
                text: "I can't talk to the guard. He'll pull the alarm.",
            },
            {
                text: "He looks like he takes his job very seriously."
            },
            {
                text: "I bet his name is \"Angel Johnson\"."
            },
            {
                text: "Great. Now, he has a pet tiger.",
                isTrue: ["CARNIVAL"],
                isFalse: []
            },
            {
                text: "Was having a guard dog too mundane?",
                isTrue: ["CARNIVAL"],
                isFalse: []
            },
        ]
    },
    guardDoor: 
    {
        cycle: 0,
        data:
        [
            {
                text: "I have to get past the guard somehow.",
                isFalse: ["CARNIVAL", "ANIMAL_REST"],
            },
            {
                text: "I don't have much of a shot at fisticuffs in this form.",
                isFalse: ["CARNIVAL", "ANIMAL_REST"],
            },
            {
                text: "I have to get past the guard and that pet tiger somehow.",
                isTrue: ["CARNIVAL"],
                isFalse: ["ANIMAL_REST"]
            },
        ]
    },
    crystal6:
    {
        cycle: 0,
        data:
        [
            {
                text: "I suppose a solid wall is effective, if simple.",
            },
            {
                text: "How did the guard from the other room get down here, I wonder?",
            },
        ]
    },
    wall: 
    {
        cycle: 0,
        data: 
        [
            {
                text: "This is a solid steel wall.",
                isTrue: [],
                isFalse: ["BRICK_WALL", "WOOD_WALL", "CARDBOARD_WALL"]
            },
            {
                text: "This is a solid brick wall.",
                isTrue: ["BRICK_WALL"],
                isFalse: ["WOOD_WALL", "CARDBOARD_WALL"]
            },
            {
                text: "This is a solid wooden wall. It's too thick to break.",
                isTrue: ["WOOD_WALL"],
                isFalse: ["CARDBOARD_WALL"]
            },
            {
                text: "I can break through this cardboard easily.",
                isTrue: ["CARDBOARD_WALL"],
                isFalse: []
            },
            {
                text: "There are no handles or buttons. It's just a wall.",
                isTrue: [],
                isFalse: ["CARDBOARD_WALL"]
            },
            {
                text: "There's no need to examine it more. I don't think I'll find any secrets.",
                isTrue: [],
                isFalse: ["CARDBOARD_WALL"]
            },
            {
                text: "Oh look! It's...nothing. Again. It's just a solid wall.",
                isTrue: [],
                isFalse: ["CARDBOARD_WALL"]
            },
            {
                text: "Really. It's just a wall.",
                isTrue: [],
                isFalse: ["CARDBOARD_WALL"]
            },
            {
                text: "And onwards, we go.",
                isTrue: ["CARDBOARD_WALL_BROKEN"],
                isFalse: []
            },
        ]
    },
    crystal7:
    {
        cycle: 0,
        data:
        [
            {
                text: "I must be careful to avoid the pitfalls of life.",
            },
        ]
    },
    pit: 
    {
        cycle: 0,
        data:
        [
            {
                text: "The pit is filled with spikes, acid, poison gas, and the heat death of the universe.",
                isTrue: [],
                isFalse: ["MAGNETS_PLACED", "CARDBOARD_PLACED"]
            },
            {
                text: "There are also strong electromagnets at the bottom. I guess it's because I'm made of metal.",
                isTrue: [],
                isFalse: ["MAGNETS_PLACED", "CARDBOARD_PLACED"]
            },
            {
                text: "I don't think most people use magnets for security in this way.",
                isTrue: [],
                isFalse: ["MAGNETS_PLACED", "CARDBOARD_PLACED"]
            },
            {
                text: "This seems overkill.",
                isTrue: [],
                isFalse: ["MAGNETS_PLACED", "CARDBOARD_PLACED"]
            },
            {
                text: "It's like: \"Yes. Let's throw everything that seems bad into the pit.\" \"Great idea!\"",
                isTrue: [],
                isFalse: ["MAGNETS_PLACED", "CARDBOARD_PLACED"]
            },
            {
                text: "The magnets are floating over the pit, but the gaps between them are too big to jump.",
                isTrue: ["MAGNETS_PLACED"],
                isFalse: ["CARDBOARD_PLACED"]
            },
            {
                text: "I need to make a bridge of some kind.",
                isTrue: ["MAGNETS_PLACED"],
                isFalse: ["CARDBOARD_PLACED"]
            },
            {
                text: "Don't question the magnet physics.",
                isTrue: ["MAGNETS_PLACED"],
                isFalse: ["CARDBOARD_PLACED"]
            },
            {
                text: "The cardboard wall makes a good bridge across the floating magnets.",
                isTrue: ["MAGNETS_PLACED","CARDBOARD_PLACED"],
                isFalse: []
            },
        ]
    },
    pitDoor:
    {
        cycle: 0,
        data:
        [
            {
                text: "I have to get across the pit first.",
            },
        ]
    },
    crystal8: 
    {
        cycle: 0,
        data: 
        [
            {
                text: "I'm so close.",
            },
            {
                text: "Seeeing the outside world is tantalizing.",
            },
            {
                text: "One more obstacle, and I'm free!",
            },
        ]
    },
    portcullis: 
    {
        cycle: 0,
        data: 
        [
            {
                text: "The portcullis is too heavy to lift.",
                isTrue: [],
                isFalse: ["GRAVITY_LIGHTER"]
            },
            {
                text: "I'm free!",
                isTrue: ["GRAVITY_LIGHTER"],
                isFalse: []
            },
        ]
    },
    win: 
    {
        cycle: 0,
        data: 
        [
            {
                text: "You win!",
            }
        ]
    },
}


module.exports = InfoBox;