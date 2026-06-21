const dialogue = document.getElementById("dialogue");
const choices = document.getElementById("choices");
const floatingMessage = document.getElementById("floatingMessage");
const chapterTag = document.querySelector(".chapter-tag");
const bgMusic = document.getElementById("bgMusic");
const heartContainer = document.getElementById("hearts");
const balloonArea = document.getElementById("balloons");

let chapter8Completed = false;
let bgMusicStarted = false;

let typing = false;
let typingInterval = null;

let inputLocked = false;

function lockInput() {
    inputLocked = true;
    choices.style.pointerEvents = "none";
    choices.style.opacity = "0.6";
}

function unlockInput() {
    inputLocked = false;
    choices.style.pointerEvents = "auto";
    choices.style.opacity = "1";
}

function returnToMainStory() {
    chapter9();
}

let frogsCollected = 0;
let frogUnlocked = false;

const bunFace = document.getElementById("bunFace");
function setFace(face){
bunFace.textContent = face;
}

const intro = [

{
text: "Hellooooooooo.",
face: "˶◕‿◕˵"
},

{
text: "Oh. Right. I should probably introduce myself first.",
face: "•ᴗ•"
},

{
text: "Hey! I am Bunbun. Your guide, your birthday host, and... well, let's not talk about my qualifications.",
face: "≧◡≦"
},

{
text: "I have been informed that today is your birthday.",
face: "˶ᵔ ᵕ ᵔ˶"
},

{
text: "I have also been informed that you stepped into this website without much expectations.",
face: "╥﹏╥"
},

{
text: "Which is a bold thing to say while opening something that definitely was built secretly just for you.",
face: "ಠᴗಠ"
},

{
text: "That's like watching Anupama and not expecting any unneccessary drama",
face: "•᷄⌓•᷅ "
},

{
text: "Suspicious behavior.",
face: "¬_¬"
},

{
text: "Very suspicious behavior.",
face: "ಠ_ಠ"
},

{
text: "So after careful consideration...",
face: "˵•̀ ᴗ •́ ˵"
},

{
text: "I have decided to ignore that information.",
face: "~⩊~"
},

{
text: "Welcome to today’s little unfolding adventure.",
face: "✦‿✦"
},

{
text: "Please remain calm during the ride.",
face: "◕ᴗ◕"
},

{
text: "Or don't.",
face: " ◔_◔ "
},

{
text: "Either way, we're doing this.",
face: " ✧⩊✧ "
},

{
text: "Brace yourself...",
face: "◉_◉"
},

{
text: "Because our magic carpet is waiting.",
face: "˃̵ᴗ˂"
}

];

let introIndex = 0;



function typeText(text, callback){

    if (typing) return;

    typing = true;
    lockInput();   // always block clicks

    dialogue.innerHTML = "";

    let i = 0;

    if (typingInterval) {
        clearInterval(typingInterval);
        typingInterval = null;
    }

    typingInterval = setInterval(() => {

        if (text.charAt(i) === "\n") {
            dialogue.innerHTML += "<br>";
        } else {
            dialogue.innerHTML += text.charAt(i);
        }

        i++;

        if (i >= text.length) {

            clearInterval(typingInterval);
            typingInterval = null;

            typing = false;
            unlockInput();

            if (callback) callback();
        }

    }, 25);
}

function bunbunThought(text){

floatingMessage.innerHTML = text;
}


function nextDialogue(){

if(typing) return;

if(introIndex < intro.length){

setFace(intro[introIndex].face);

typeText(intro[introIndex].text);

introIndex++;
}
else{

choices.innerHTML = `
       <button onclick="startAdventure()">
       ✨ CLIMB ABOARD THE MAGIC CARPET
       </button>
       `;
}
}

function showAchievement(text){

const achievement =
document.getElementById("achievement");

achievement.innerHTML = text;

achievement.classList.add("show");

setTimeout(()=>{

achievement.classList.remove("show");

},3000);
}

function createConfetti(){

const container =
document.getElementById(
"confettiContainer"
);

for(let i=0;i<30;i++){

const piece =
document.createElement("div");

piece.classList.add(
"confetti"
);

piece.style.left =
Math.random()*100 + "vw";

piece.style.top =
"-20px";

piece.style.background =
["#ffd7ef","#ffe8a3","#d6c4ff","#ffb7b7"][Math.floor(Math.random()*4)];

container.appendChild(piece);

setTimeout(()=>{

piece.remove();

},3000);
}
}

// ================== HEARTS & BALLOONS ==================
function startHeartsAndBalloons() {
  setInterval(() => {
    // HEART
    const heart = document.createElement('span');
    heart.textContent = '💖';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 10 + 15 + 'px';
    heart.style.animationDuration = Math.random() * 3 + 4 + 's';
    heartContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);

    // BALLOON
    const b = document.createElement('span');
    b.textContent = '🎈';
    b.style.left = Math.random() * 100 + 'vw';
    b.style.fontSize = Math.random() * 30 + 30 + 'px';
    b.style.animationDuration = Math.random() * 5 + 6 + 's';
    balloonArea.appendChild(b);
    setTimeout(() => b.remove(), 13000);

  }, 500);
}

function startAdventure(){

if(!bgMusicStarted){
bgMusic.volume = 0.2;
bgMusic.play().catch((err) => {
console.log("Music blocked:", err);
});
bgMusicStarted = true;
}

showAchievement(
"🏆  Passenger Princess "
);

bunbunThought(
"🪄 The carpet is warming up..."
);

typeText(
"Excellent. The carpet appears to be functioning. This is really surprising.",
()=>{

choices.innerHTML = `
       <button onclick="chapter1()">
       Continue
       </button>
       `;

});

}

function chapter1(){

chapterTag.innerHTML =
"Chapter 1";
setFace("˵•̀ ᴗ •́ ˵"); 

bunbunThought(
"🪄 Passenger inspection in progress..."
);

typeText(
"Before we continue, the carpet requires a quick passenger check. What's your current mood? "
);

choices.innerHTML = `

   <button onclick="chooseMood('🫠 Too bored')">
   🫠 Bored
   </button>

   <button onclick="chooseMood('😴 Feeling Sleepy')">
   😴 Sleepy
   </button>

   <button onclick="chooseMood('🍕 Definetely Hungry')">
   🍕 Hungry
   </button>

   <button onclick="chooseMood('✨ Absoulutely Not Sure')">
   ✨ Not Sure
   </button>

   <button onclick="chooseMood('🌙 Feeling Mysterious')">
   🌙 Mysterious
   </button>

   `;
}

function chooseMood(mood){

showAchievement(
"🏆 Passenger Alive"
);

typeText(

`Current status detected:

${mood}

Wonderful.
You have successfully met the minimum requirements for today's adventure.
Which, surprisingly, were very low.`

);

choices.innerHTML = `
   <button onclick="chapter2()">
   Continue
   </button>
   `;
}

let clueSet = new Set();
let cluesFound = 0;

function chapter2(){

chapterTag.innerHTML =
"Chapter 2";

setFace(" ╭ರ_•́ ");
    
bunbunThought(
"🕵️ Investigation mode activated."
);

typeText(

`Uh oh.
I’ve received reports that something important is quietly hiding in plain sight.
This is deeply concerning.
We must investigate immediately.`

);

choices.innerHTML = `

  <button onclick="collectClue('Multiple whispers suggest today carries unusual warmth in its corners.')">
✨ Clue 1
</button>

<button onclick="collectClue('Soft messages of kindness have been spotted drifting through the air.')">
✨ Clue 2
</button>

<button onclick="collectClue('Something special appears to have been prepared for no particular reason at all.')">
✨ Clue 3
</button>

<button onclick="collectClue('A certain traveler is already part of the unfolding journey.')">
✨ Clue 4
</button>

   `;
}

function collectClue(text){
    if (clueSet.has(text)) return;

    clueSet.add(text);
    cluesFound++;

    typeText(text);

    if (cluesFound >= 4){
        choices.innerHTML = `
            <button onclick="solveMystery()">
            🕵️ Review Evidence
            </button>
        `;
    }
}

function solveMystery(){

showAchievement(
"🏆 Birthday Investigator "
);

typeText(

` ---
Hmm.
Interesting.
After a careful investigation (and a few unnecessary dramatic pauses), the conclusion is simple:
It turns out nothing was ever lost.
Some things don’t go missing.
They just wait quietly for the right moment to be noticed.

And today…
you noticed it.

Case status: unfolding.
Verdict: already in motion.

Case closed. 🎂
 `

);

choices.innerHTML = `
   <button onclick="chapter3()">
   Continue Journey
   </button>
   `;
}

function chapter3(){

chapterTag.innerHTML =
"Chapter 3";

setFace(" •̀ - •"); 
bunbunThought(
"🎁 These boxes look suspicious."
);

typeText(

`Welcome to the Valley of Suspicious Gift Boxes.
Please choose wisely.
Or don't.
They all seem suspicious.`

);

choices.innerHTML = `

<button onclick="openGift()">
🎁 Box A
</button>

<button onclick="openGift()">
🎁 Box B
</button>

<button onclick="openGift()">
🎁 Box C
</button>

<button onclick="giftFrog()">
🐸 Suspicious Frog
</button>

`;
}


function giftFrog(){

findFrog(
"Gift Valley"
);
setFace("⊙.☉");
typeText(

`You found a frog hiding behind one of the gift boxes.
It claims it was helping organize presents.
The evidence is... inconclusive.
The frog seems very proud of itself regardless.`
);

choices.innerHTML = `

   <button onclick="chapter4()">
   Continue Journey
   </button>

   `;
}

function openGift(){

const gifts = [

        "🎂 Virtual Cake",
        "🧸 Pocket-Sized Comfort Bun",
        "🌸 Tiny Bouquet",
        "🧠 Bunbun's Last Braincell",
       "🍟 One Stolen French Fry",
       "🍪 Half-Eaten Cookie From Bunbun"

];

const reward =
gifts[
Math.floor(Math.random()*gifts.length)
];

setFace("•́⩊•̀");
    
typeText(

`Congratulations.
You received:
${reward}
Please use it responsibly.
Or irresponsibly.
I am not your supervisor.`
);

choices.innerHTML = `
   <button onclick="chapter4()">
   Continue
   </button>
   `;
}

function chapter4(){

chapterTag.innerHTML =
"Chapter 4";

bunbunThought(
"🎂 This can only go well."
);

setFace("˵•́ ᴗ •̀˵");
    
typeText(

`To celebrate your birthday being officially recovered… I thought I’d bake you a cake.
Important detail: I have no experience baking cakes. At all. This may or may not be a crime.
But we’re committed now.
So please choose a cake.
And let’s make slightly questionable decisions together. 🎂`
);

choices.innerHTML = `

   <button onclick="finishCake()">
    ☁️ Cloudberry Cake
   </button>

   <button onclick="finishCake()">
   🍫 Triple Chocolate Catastrophe
   </button>

   <button onclick="finishCake()">
   🌙 Moonlight Vanilla Cake
   </button>

   <button onclick="cakeFrog()">
🐸 Ask The Frog
</button>

   `;
}

function cakeFrog(){

findFrog(
"Cake Disaster"
);

setFace("ಠ‿ಠ");
typeText(
`You have chosen to consult the frog.
An interesting decision.

This raises several questions.
The frog stared into the distance for several seconds.
Then he offered exactly one piece of advice:

"ribbit."
...

Thank you, frog.
That was completely unhelpful.
Bunbun has decided to interpret this as approval.`

);

choices.innerHTML = `

   <button onclick="finishCake()">
    🐸 Follow The Frog's Wisdom
   </button>

   `;
}

function finishCake(){

showAchievement(
"🏆 Chaos Baker"
);

createConfetti();

setFace("≧◡≦");
    
typeText(

`The cake is finished.
Technically.
It leans slightly to the left.
One layer appears to be floating.
Also...
I may have eaten half of the frosting during construction.
In my defense,
quality control is important.

But...
it was made especially for you.
So despite several structural concerns...
I think it's perfect.
After all, birthdays aren't about perfect cakes.
They're about celebrating wonderful people like you.
Now hurry and blow out the candles before the frosting starts doing anything suspicious.✨`
);

  choices.innerHTML = `
        <button onclick="chapter5()">🪞 Continue Journey</button>
    `;
}

// =========================
// CHAPTER 5
// MIRROR OF TRUTH
// =========================

function chapter5(){

chapterTag.innerHTML =
"Chapter 5";

bunbunThought(
"🪞 Mirrors are weird."
);

setFace("˃̵ᴗ˂");
typeText(

`We have arrived at the Mirror of Truth.
It is a very rare magical artifact.
Most mirrors show your reflection.
This one shows the things that make you special.
Which is considerably more useful.
So let's see what it has to say.`

);

choices.innerHTML = `
   <button onclick="useMirror()">
   🪞 Look Into Mirror
   </button>

<button onclick="mirrorFrog()">
🐸 Mirror Frog
</button>
   `;
}

function mirrorFrog(){

findFrog(
"Mirror of Truth"
);
setFace("ᗜ_ᗜ");
typeText(

`You found a frog staring into the Mirror of Truth.
The mirror displayed:
"Absolutely magnificent."
The frog nodded.
The mirror nodded.
This feels suspiciously biased.
But nobody seems interested in my opinion.`

);

choices.innerHTML = `

   <button onclick="useMirror()">
   Continue
   </button>

   `;
}

function useMirror(){

const truths = [
"You are someone's favorite person to talk to.",
"You have made more people smile than you'll ever know.",
"You make ordinary days better without even trying.",
"You have a kindness people remember.",
"You are part of many happy memories.",
"You make people feel seen, heard, and appreciated.",
"You bring warmth wherever you go.",
"You are loved for reasons you don't even realize.",
"You have made the world brighter simply by being yourself.",
"The day you were born became one of the luckiest days for the people who know you."
];

const truth = truths[Math.floor(Math.random()*truths.length)];

setFace("¬‿¬");
typeText(
`The Mirror of Truth says:
...
Loading...
Please wait.
...
*Bunbun squints suspiciously.*
*Bunbun taps the mirror.*
Nothing.
*Bunbun taps it harder.*
Nothing.
*Bunbun smacks it.*
🪞💥

The mirror flickers to life.
*Bunbun nods.*
"Yep. That usually works."

The mirror says:

"${truth}"

*Bunbun looks at the mirror, then at you.*
"Yeah… I approve this message." `
, () => {

choices.innerHTML = `
   <button onclick="chapter6()">
    Continue the chaos ✨
   </button>
`;
});
}

// =========================
// CHAPTER 6
// WHEEL OF CHAOS
// =========================

function chapter6(){

chapterTag.innerHTML =
"Chapter 6";

bunbunThought(
    "🎡 This feels... legally unstable."
);

setFace("◕‿◕");
    
typeText(

`Welcome to the Wheel of Chaos.

I have absolutely no idea what happens next.

If anything goes wrong,
please pretend it was intentional.

Good luck.`

);

choices.innerHTML = `
   <button onclick="spinWheel()">
    🎡 SPIN (bad idea)
   </button>
   `;
}

function spinWheel(){

    const outcomes = [
        "🎂 Cake That Slightly Moves When Unwatched",
        "✨ Borrowed Luck (expires in 24 hours)",
        "🌙 Moonlight Shortcut (skips one bad moment)",
        "🪞 Mirror Echo (it repeats your last thought... loudly)",
        "🎡 Wheel Speed Upgrade (this is a mistake)",
        "📜 Unwritten Plot Twist (you’ll find out later)",
        "🌈 Reality Gets a Minor Color Correction",
        "🕰️ Perfect Timing (once, never again)",
        "🎭 Temporary Main Character Energy",
        "🧠 Bunbun's Last Braincell"
    ];

    const reward = outcomes[Math.floor(Math.random() * outcomes.length)];

    if (reward.includes("Braincell")) {
        showAchievement("🧠 Braincell Owner ");
    }

setFace("⊙_☉");
    
        typeText(
`Bunbun approaches the Wheel of Chaos.
He reads the warning label.
He ignores it.
He spins it anyway. 🎡

The wheel stops.
You received:
👉 ${reward}

Bunbun squints at it.
"...I don't remember agreeing to this result."
So please do not ask me how this works.
I barely understand it myself.`,
        () => {

            choices.innerHTML = `
                <button onclick="chapter7()">
                    Continue
                </button>
            `;
        });
}

// =========================
// CHAPTER 7
// JAR OF TINY GOOD THINGS
// =========================

function chapter7(){

chapterTag.innerHTML = "Chapter 7";

bunbunThought("🫙 Tiny things are suspiciously powerful.");

setFace("◡‿◡✿");
    
typeText(
`Sometimes a whole happy day feels difficult.
So let's aim smaller.
Welcome to the Jar of Tiny Good Things.`
);

choices.innerHTML = `
   <button onclick="openJar()">
   🫙 Open Jar
   </button>

   <button onclick="jarFrog()">
   🐸 Jar Frog
   </button>
`;
}

function jarFrog(){

findFrog("Jar of Tiny Good Things");

setFace("ಠಿ_ಠ");
typeText(
`You found a frog inside the jar.
It appears to have been living there comfortably.
The frog refuses to explain it's rent situation.
Instead, it stares at you.
Judgmentally.`
);

choices.innerHTML = `
   <button onclick="openJar()">
    Proceed anyway
   </button>
`;
}

function openJar(){

const notes = [
    "Your favourite snack exists somewhere in the world.",
    "Blankets are still real, still warm, still available.",
    "Someone, somewhere, is smiling because of you.",
    "The sky has been beautiful before—and will be again.",
    "Tomorrow hasn’t arrived yet. It’s still being written.",
    "You are allowed to rest. No permission needed.",
    "Cake still exists. This is scientifically reassuring.",
    "You have already survived your hardest unknown day.",
    "Small joys are waiting for you quietly.",
    "You are not behind. You are just arriving in your own time."
];

const note = notes[Math.floor(Math.random() * notes.length)];
setFace("•᷄ࡇ•᷅");

typeText(
`You try to open the jar.
It refuses.
It simply vibrates slightly.

*Bunbun stares at it.*
"...this is personal now."
He pauses.
He very respectfully smashes the jar. 🫙💥
A tiny note falls out.`
);

setTimeout(() => {
    const btn = document.createElement("button");
    btn.textContent = "📜 Read Note";
    btn.onclick = () => readNote(note);

    choices.innerHTML = "";
    choices.appendChild(btn);
}, 1200);
}

function readNote(note){

setFace("¬‿¬");
    
typeText(
`You unfold the tiny note.
It is soft. Slightly wrinkled. Like it survived something.
It says:
"${note}"
...
The jar has now accepted defeat.`
);

choices.innerHTML = `
   <button onclick="chapter8()">
   Continue the journey
   </button>
`;
}
// =========================
// CHAPTER 8
// Highly classified
// =========================


function chapter8(){

chapterTag.innerHTML = "Chapter 8";

bunbunThought("📁 No. Don’t open that.");
    
setFace("⊙﹏⊙");
    
typeText(

`You have discovered the Secret Files.

Bunbun is standing very still.
That is never a good sign.
"...don’t open it."
"...why is it even here?"
Bunbun takes a step closer.
The air feels heavier.
"I am not emotionally prepared for what is inside that file."
"...and I definitely did NOT approve its placement here !! "
He pauses.
Slowly turns his head.
"...I am going to have a very serious conversation with the carpet after this."`

);

choices.innerHTML = `
   <button onclick="openSecretFile()">
   📁 Open it anyway
   </button>

   <button onclick="fileFrog()">
   🐸 Ask the frog
   </button>
`;

}


function fileFrog(){

findFrog("Secret Files");

setFace("◉_◉");
    
typeText(
`You ask the frog if you should open the file.
The frog examines the Secret File carefully.
It does not blink.
This is unsettling.
After a long silence...
the frog shrugs.`

);

choices.innerHTML = `
   <button onclick="openSecretFile()">
  📁 Take that as permission
   </button>
`;

}

function openSecretFile(){
setFace("°□°");
typeText(
`Bunbun suddenly appears in front of the file.
"Wait."
"No no no no."
He points at it like it personally offended him.
"...why is this still here?"
Bunbun looks at you.
"I know what you're going to do."
"You’re going to ignore me."
He sighs.
"...fine."
He steps aside very dramatically.`,
() => {
    choices.innerHTML = `
        <button onclick="revealLetter()">
        📖 Open File
        </button>
    `;
}
);
}

function revealLetter(){

setFace(" ¬_¬' ");

typeText(

    
    
    
    
    `
You open the file.
Bunbun is not watching.
He is absolutely watching.
He just doesn’t want to admit it.
...
It says:

“Hey.”

So you opened it. I’m not even surprised.Honestly, I had a backup file ready in case you ignored it.  That would’ve been emotionally inconvenient.

Anyways, I’m not great at serious letters, So if this gets weird halfway through, that’s normal.
That’s just me losing control of the narrative again.

This whole thing we’ve been doing, the chaos, the choices, the frogs showing up where they absolutely shouldn’t, yeah… that wasn’t all accidental. Some of it was, yes. A concerning amount, actually. 
And yet somehow… it became something that behaves like a story.

But I didn’t plan for this part. That you’d actually be here.
I didn’t think you’d actually go through all of it.
Click everything.
Ignore every warning label I carefully didn’t write.

So I’ll say it properly, once.
I’m glad you made it this far. Mostly because it means I didn’t break anything critical.

Also, I’m kind of glad I got “appointed” for this task. I’m never doing this again. I only did it because… you’re special. Don’t make me regret saying that.

Okay. Now please stop opening classified things. I’m running out of files.

— Bunbun 🐰 `
,
() => {

chapter8Completed = true;

if (frogUnlocked) {

    choices.innerHTML = `
        <button onclick="chapter9()">
        Continue Adventure 
        </button>

        <button onclick="frogCouncil()">
        🐸 Visit Frog Council
        </button>
    `;

}
else {

    choices.innerHTML = `
        <button onclick="chapter9()">
        Continue Adventure
        </button>
    `;

}
}
);
}
// =========================
// CHAPTER 9
// BIG RED BUTTON
// =========================

function chapter9(){

chapterTag.innerHTML =
"Chapter 9";

bunbunThought(
    "🔴 Do not press it. (This will not go well)"
);

setFace("ಠ_ಠ");
    
typeText(

` This is the Big Red Button.
Please do not press it.
It has been labeled very clearly.
With emotional emphasis.
Seriously.
"Please Do Not Press It."
...
Bunbun is watching.
This is important.
"Don't do it ! "`

);

choices.innerHTML = `
   <button onclick="pressButton()">
    🔴 PRESS IT [You don't have a choice]
   </button>
   `;
}

function pressButton(){

showAchievement("🏆 Self-Control? Never Heard Of It ");
createConfetti();

setFace("ಥ_ಥ");
    
typeText(
`...
You pressed it.
Of course you did.
Bunbun is staring at you in silence.
This is worse than shouting.
"...why."
"I specifically said not to do that.."
It literally said NOT to !!
"... I even asked you nicely."
*Takes a breath.*
"... you know what?"
"Enough.."
"No more buttons for you."`
);

choices.innerHTML = `
   <button onclick="chapter10()">
   Continue
   </button>
`;
}

// =========================
// FINAL CHAPTER
// =========================

function chapter10(){

chapterTag.innerHTML =
"Final Chapter";

bunbunThought(
    "🪄 The carpet is… landing? This is your fault, isn’t it."
);

createConfetti();

setFace("˶ᵔ ᵕ ᵔ˶");
    
typeText(

`I know you probably didn’t expect this to turn into… whatever this little universe became.

But the carpet has finally landed.
Somehow.
I’m not fully convinced it followed safety regulations.
It made it all the way here without falling apart, so I am not going to question it.

So I guess this is the part where everything “officially ends.”

And I think that’s okay.

Somewhere along the way, this stopped being just buttons and choices.
It started behaving like it had a mind of its own.
Which is concerning, because I definitely did NOT give it permission.

The carpet showed up like it had something to say.
The investigation kept insisting on answers nobody asked for.
The gift boxes appeared even when they weren’t invited.
The frogs… I don’t know what happened there. They now seem professionally employed.
Somehow, all of it happened anyway.

But before everything shuts down properly…
There's just one last thing I want to let you know...

After coding this without letting you find out… (Not during my exams obviously..)
1500+ JavaScript lines…
and approximately 100 internal meltdowns later…

I really, really hope it brought a smile to your face.

If you smiled even once… I think Bunbun did his job.

That was the only goal.
No logic. No reason. Just that.

And if it did… even a small one…
then it was worth every error, every chaos moment, and every time Bunbun refused to behave.

Because this whole thing?
It was made thinking of you.

So here's your final achievement:
🏆 The Star Of This Entire Universe
Congratulations.

You did it !
You completed the adventure.
The carpet can finally retire.
The frogs can return to their mysterious frog business.
And Bunbun is pretending he’s not emotional about this, which is not convincing anyone.
And maybe that’s enough for today.

So whether you celebrated a lot, a little, or accidentally got dragged into a magical carpet adventure...
I hope today reminded you that you're appreciated more than you know.
Happy Birthday, Mummmyyyy !!!!
Thank you for coming on this very serious, extremely professional, and definitely not ridiculous adventure.
Now go enjoy the rest of your day.
Eat some cake.
Or at least think about cake.
— Your little funny bunny 🐰`

);

choices.innerHTML = `
   <button onclick="location.reload()">
   🌙 Start Adventure Again
   </button>
   `;
}


function findFrog(location){

frogsCollected++;
checkFrogCouncil();

showAchievement(
`🐸 Frog Found (${frogsCollected}/5)`
);

let frogComment = "";

if(frogsCollected === 1)
frogComment = "Interesting. A frog.";

if(frogsCollected === 2)
frogComment = "There appears to be a second frog.";

if(frogsCollected === 3)
frogComment = "This is becoming a pattern.";

if(frogsCollected === 4)
frogComment = "I am becoming concerned.";

if(frogsCollected === 5)
frogComment = "The Frog Council knows.";

bunbunThought(
`🐸${frogComment}`
);
    
}

// =========================
// FROG COUNCIL SYSTEM
// =========================

function checkFrogCouncil() {
    if (frogsCollected >= 5 && !frogUnlocked) {
        frogUnlocked = true;

        showAchievement("🐸 Frog Royalty");

        const btn = document.createElement("button");
        btn.textContent = "🐸 Visit Frog Council";
        btn.onclick = frogCouncil;

        choices.appendChild(btn);
    }
}
// =========================
// FROG COUNCIL ENTRY
// =========================

function frogCouncil() {

    chapterTag.innerHTML = "Secret Chapter";

    createConfetti();
setFace("⊙﹏⊙");
    typeText(
        `Bunbun is staring at the screen.
"...why is this happening again."

A group of frogs appears.
They are holding something.
It looks like a message.

Bunbun leans closer.
"...I did not approve frog delivery services."
The frogs ignore him.
They wait silently.`,
        () => {
            choices.innerHTML = `
                <button onclick="frogMessage()">
                    📜 Read Frog Message
                </button>
            `;
        }
    );
}

// =========================
// FROG MESSAGE
// =========================

function frogMessage() {
setFace("ಠಿ_ಠ");
    
    typeText(
        `🐸 OFFICIAL FROG MESSAGE:

Ribbit.
We have arrived.
Ribbit ribbit.

We are watching your journey from a respectful distance.
(One frog is too close. Please ignore him.)

The Frog Council has been observing you.
Quietly.
From various locations.
Mostly ponds.

After careful consideration...

The council has reached a decision.

We are proud.
Not because everything made sense.
But because you did it anyway.

Ribbit ribbit.

This is important frog philosophy.
We learned it yesterday.

You are officially Frog Approved.

IMPORTANT ANNOUNCEMENTS:
- Do not trust shiny objects.
- Do not trust frogs who say “trust me”.
- Do not trust Bunbun when he says “this is normal”.
He is lying.
Ribbit.

FINAL NOTE:
If confusion increases, remain calm.
Frogs are handling it.
(We are not handling it.)

Ribbit ribbit ribbit.

— The Frogs 🐸`,
        () => {
            choices.innerHTML = `
                <button onclick="bunbunReact()">
                    🐰 Ask Bunbun why frogs are like this
                </button>
            `;
        }
    );
}

// =========================
// BUNBUN REACTION
// =========================

function bunbunReact() {
setFace("ಠ益ಠ");
    typeText(
        `Bunbun is staring at the message.

"...what did I just read."

He scrolls back.
"...why is there ribbiting in official documents."

Pause.
...

"...who allowed this council to function unsupervised?"

He looks around like the frogs might still be listening.
They probably are.

"...I need a different job."`,
        () => {
            choices.innerHTML = `
                <button onclick="returnFromCouncil()">
                    🐰 Continue
                </button>
            `;
        }
    );
}

// =========================
// RETURN SCENE
// =========================

function returnFromCouncil() {
setFace("-_-");
    typeText(
        `The council nods in agreement.
One frog immediately falls off the table.
This is considered a formal conclusion.

A tiny frog approaches you.
It hands you a sticker.
It is slightly damp.
No one explains why.

It simply says:
"Certified Cool Mummy"

The ink is questionable.
It may or may not still be moving.

The meeting has officially concluded.
A frog whispers something about snacks.
The council ignores him.
As usual.`,
        () => {
           choices.innerHTML = `
  <button onclick="returnToMainStory()">
    Return to Journey
  </button>
`;
        }
    );
}

window.addEventListener("load", () => {
    startHeartsAndBalloons();
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("choices").innerHTML = `
        <button onclick="nextDialogue()">
            Continue
        </button>
    `;
});
