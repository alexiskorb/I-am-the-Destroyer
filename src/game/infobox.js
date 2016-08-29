
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
                text: "That labyrinth is complicated. There are also pipes along the sides as if someone once pumped water into it.",
                isTrue: ["DAM_BUILT"],
                isFalse: ["BAD_LABYRINTH"]
            },
            {
                text: "Wow. That idiot cousin made this labyrinth a piece of cake to get through. There are also pipes along the sides as if someone once pumped water into it.",
                isTrue: ["DAM_BUILT", "BAD_LABYRINTH"],
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
                isTrue: ["DAM_BUILT"],
                isFalse: ["BAD_LABYRINTH"]
            },
        ]
    },
    guard: 
    {
        cycle: 0,
        data:
        [

            {
                text: "I can't talk to the guard. He'll pull the alarm.",
                isTrue: [],
                isFalse: ["ANIMAL_REST", "CARNIVAL"]
            },
            {
                text: "He looks like he takes his job very seriously."
            }
        ]
    },
    guardDoor: 
    {
        cycle: 0,
        data:
        [
            {
                text: "I have to get past the guard somehow.",
                isTrue: ["CARNIVAL", "ANIMAL_REST"],
            },
            {
                text: "I don't have much of a shot at fisticuffs in this form.",
                isTrue: ["CARNIVAL", "ANIMAL_REST"],
            },
            {
                text: "I have to get past the guard and that pet tiger somehow.",
                isTrue: ["CARNIVAL"],
                isFalse: ["ANIMAL_REST"]
            },
        ]
    },
    wall: 
    {
        cycle: 0,
        data: 
        [
            {
                text: "This is a solid steel wall with no doors.",
                isTrue: [],
                isFalse: ["BRICK_WALL", "WOOD_WALL", "CARDBOARD_WALL"]
            },
            {
                text: "This is a solid brick wall with no doors.",
                isTrue: ["BRICK_WALL"],
                isFalse: ["WOOD_WALL", "CARDBOARD_WALL"]
            },
            {
                text: "This is a solid wooden wall with no doors. It's too thick to break.",
                isTrue: ["WOOD_WALL"],
                isFalse: ["CARDBOARD_WALL"]
            },
            {
                text: "I can break through this cardboard easily.",
                isTrue: ["CARDBOARD_WALL"],
                isFalse: []
            },
        ]
    },
    pit: 
    {
        cycle: 0,
        data:
        [
            {
                text: "The pit is filled with spikes, acid, poison gas, and strong electromagnets since I'm made of metal. It seems like overkill.",
                isTrue: [],
                isFalse: ["MAGNETS_PLACED", "CARDBOARD_PLACED"]
            },
            {
                text: "The magnets are floating over the pit, but the gaps between them are too big to jump. I need a bridge.",
                isTrue: ["MAGNETS_PLACED"],
                isFalse: ["CARDBOARD_PLACED"]
            },
            {
                text: "The wall makes a good bridge across the floating magnets.",
                isTrue: ["MAGNETS_PLACED","CARDBOARD_PLACED"],
                isFalse: []
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
        ]
    },
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
}


module.exports = InfoBox;