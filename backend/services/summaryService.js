const {getGenerativeModel} = require('@/config/googleAIConfig') ;

export async function generateSummary(transcript, style  ) {
  try {
    const model = getGenerativeModel();

    let prompt = `Summarize the following text in a ${style} style:\n\n${transcript}\n\nSummary:`;

        if (style === "bullet") {
            prompt = `Create a bullet point summary of the following text:\n\n${transcript}\n\nSummary:
            
            give responses in <body></body> tag of html format without any <ul></ul> <li></li> tags and  use <b> tag for bold text`;
        }
        if (style === "genz") {
          prompt = `Summarize the following in a super casual, super Gen Z brain rot style. Keep it quirky, relatable, and super funny while summarizing key points.  

          use brainrot keywords like:
          skibidi: A reference to the viral "Skibidi Dop Dop Yes Yes" meme song by Little Big, often accompanied by silly dance moves.
          gyatt: Slang derived from "goddamn" to express admiration or surprise, often used to comment on someone's Butt.
          rizz: Slang for charisma or charm, particularly in the context of attracting a romantic interest.
          only in ohio: A meme implying that strange or bizarre events supposedly only happen in Ohio.
          duke dennis: A popular YouTuber and Twitch streamer known for his gaming content, especially related to NBA 2K.
          did you pray today: A meme phrase that became popular, often used humorously to check on someone's well-being or behavior. Often associated with Go/Jo
          livvy dunne: A famous gymnast and social media influencer known for her presence on TikTok and Instagram.
          rizzing up: The act of using charm or charisma to attract someone romantically.
          baby gronk: Refers to a young football prodigy, sometimes used metaphorically to describe someone showing great potential.
          sussy imposter: A phrase from the game Among Us, referring to a suspicious player who might be the imposter.
          pibby glitch: A reference to the animated series "Come and Learn with Pibby!" where characters are affected by a glitchy corruption.
          in real life: Often abbreviated as IRL, referring to events or interactions happening outside the internet or virtual space.
          sigma male: A term from manosphere communities describing a lone wolf type who is successful but doesn't conform to traditional social hierarchies.
          alpha male: A term describing a dominant, assertive man who is perceived as a leader or authority figure.
          omega male: A term describing a man who is on the fringes of social hierarchies, often seen as the opposite of an alpha male.
          grindset: A mindset focused on relentless hard work and hustle to achieve success.
          andrew tate: A controversial internet personality known for his views on masculinity and success, often criticized for promoting toxic behavior.
          goon cave: A space dedicated to "gooning," which refers to a prolonged state of arousal, often involving corn.
          freddy fazbear: The main animatronic character from the horror game series Five Nights at Freddy's.
          colleen ballinger: A YouTuber and comedian best known for her character Miranda Sings.
          smurf cat: A whimsical, fictional character that combines elements of a Smurf and a cat, typically used in memes.
          strawberry elephant: Another whimsical, fictional character or concept used in memes, combining a strawberry and an elephant
          blud: Slang for "blood," often used in British slang to refer to a friend or close associate.
          dawg: Slang for "dog," often used to refer to a friend or buddy.
          shmlawg: A variation of "dawg," used in similar contexts to refer to a friend or close acquaintance.
          ishowspeed: A popular YouTuber and streamer known for his energetic and sometimes controversial content.
          a whole bunch of turbulence: A meme phrase referring to unexpected disruptions or chaos.
          ambatukam: A viral meme phrase that plays on phonetically misleading language, often used humorously.
          bro really thinks he's carti: A phrase used to mock someone who emulates rapper Playboi Carti's style or persona.
          literally hitting the griddy: Refers to performing the "Griddy" dance, popularized in the NFL and on social media.
          the ocky way: A catchphrase from TikTok, referring to customizing food orders in a unique or extravagant way, coined by a New York City bodega worker.
          kai cenat: A prominent YouTuber and Twitch streamer known for his energetic personality and humorous content.
          fanum tax: A playful reference within Kai Cenat's community, where streamer Fanum 'taxes' others by taking a portion of their food.
          garten of banban: A reference to an indie horror game that became popular for its quirky and eerie design.
          no edging in class: A humorous or mocking phrase likely referring to the act of self-control, used out of its original context in a school setting.
          not the mosquito again: A meme phrase that expresses frustration or disbelief about a recurring nuisance.
          bussing: Slang for something that is really good or delicious, often used to describe food.
          axel in harlem: Refers to a meme involving a specific animation clip that became widely parodied.
          whopper whopper whopper whopper: A catchy jingle from a Burger King advertisement that became a meme.
          1 2 buckle my shoe: A nursery rhyme that became a meme, often used humorously in various contexts.
          goofy ahh: A phrase used to describe something or someone as silly or ridiculous.
          aiden ross: A popular Twitch streamer known for his gaming and reaction content, often involved in controversies.
          sin city: Often refers to Las Vegas or to the aesthetic and lifestyle associated with it, sometimes used in memes.
          monday left me broken: A phrase from a TikTok trend or song lyric expressing the melancholy associated with the start of the week.
          quirked up white boy: A meme phrase describing a young white man with an unexpected or quirky talent, often followed by "busting it down sexual style."
          busting it down style: Part of a meme phrase implying that someone is dancing provocatively.
          goated with the sauce: Slang for someone who is exceptionally skilled or impressive, "goat" being short for "greatest of all time."
          john pork: A fictional character often depicted as a pig-human hybrid, used in various memes.
          grimace shake: Refers to a McDonald's promotional shake named after the character Grimace, often used in memes.
          kiki do you love me: Lyrics from Drake's song "In My Feelings," which became part of a viral dance challenge.
          51. huggy wuggy: A character from the horror game Poppy Playtime, known for its unsettling appearance.
          2. nathaniel b: A meme originating from a viral TikTok where a freestyle rap battle mistakenly names "Nathaniel B."
          53. lightskin stare: Refers to a stereotypical intense or sultry look often associated with light-skinned individuals in memes.
          54. biggest bird: A meme phrase often used to boast about being the best or most significant in some way.
          55. omar the referee: A character from the game “Bully” known for his iconic look and actions, sometimes referenced in memes.
          56. amogus: A humorous corruption of "Among Us," often used to denote something suspicious or "sus."
          57. uncanny: Refers to something that looks eerily realistic or disturbingly close to reality, often used in the context of the "uncanny valley" effect.
          58. wholesome: Describes content that is uplifting, heartwarming, or generally positive.
          59. reddit: A social media platform known for its diverse range of communities and discussions.
          60. chungus: A meme featuring a large, rotund version of Bugs Bunny, often used humorously to describe something large or excessive.
          61. keanu reeves: A popular actor often praised for his kindness and humility, leading to various memes and adoration online.
          62. pizza tower: An indie game known for its unique art style and gameplay, gaining a cult following.
          63. zesty: Slang describing something or someone as lively, spicy, or full of flavor, often used to compliment someone's personality.
          64. poggers: An emote from Twitch used to express excitement or amazement.
          65. kumalala savesta: Nonsense words used humorously in memes to mimic an exotic or foreign-sounding language.
          66. quandale dingle: A fictional character name that became popular in memes, often accompanied by surreal or absurd scenarios.
          67. glizzy: Slang for a hotdog or a pp, often used humorously in various memes.
          68. rose toy: A reference to a popular adult "toy" shaped like a rose, frequently discussed in social media.
          69. ankha zone: Refers to a viral and explicit animation involving the character Ankha from Animal Crossing, widely shared and parodied.
          70. thug shaker: A meme phrase likely referring to a specific dance or movement.
         
          
          as well as emojis to make it super fun and engaging.
        
          give responses in <body></body> tag of html format without any <ul></ul> <li></li> tags and use <b> tag for bold text 
         
          Here’s the transcript:\n\n${transcript}\n\nSummary:`;
      }

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate timestamps';
    throw new Error(`Failed to generate timestamps: ${errorMessage}`);
  }
}
