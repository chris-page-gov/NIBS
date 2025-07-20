// Sample documents from Project Gutenberg for NIBS testing

export const gutenbergTexts = {
  "alice-wonderland": {
    title: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
    year: "1865",
    sections: [
      {
        id: "chapter1",
        title: "Chapter 1: Down the Rabbit-Hole",
        subsections: [
          {
            id: "beginning",
            title: "The Beginning",
            content: `
              <h3>Down the Rabbit-Hole</h3>
              <p>Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, 'and what is the use of a book,' thought Alice 'without pictures or conversation?'</p>
              <p>So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.</p>
              <p>There was nothing so very remarkable in that; nor did Alice think it so very much out of the way to hear the Rabbit say to itself, 'Oh dear! Oh dear! I shall be late!' (when she thought it over afterwards, it occurred to her that she ought to have wondered at this, but at the time it all seemed quite natural);</p>
            `
          },
          {
            id: "rabbit-hole",
            title: "Into the Rabbit Hole",
            content: `
              <h3>Following the Rabbit</h3>
              <p>But when the Rabbit actually took a watch out of its waistcoat-pocket, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it, and burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge.</p>
              <p>In another moment down went Alice after it, never once considering how in the world she was to get out again.</p>
              <p>The rabbit-hole went straight on like a tunnel for some way, and then dipped suddenly down, so suddenly that Alice had not a moment to think about stopping herself before she found herself falling down a very deep well.</p>
              <p>Either the well was very deep, or she fell very slowly, for she had plenty of time as she went down to look about her and to wonder what was going to happen next.</p>
            `
          }
        ]
      },
      {
        id: "chapter2",
        title: "Chapter 2: The Pool of Tears",
        subsections: [
          {
            id: "too-big",
            title: "Growing Too Big",
            content: `
              <h3>The Pool of Tears</h3>
              <p>'Curiouser and curiouser!' cried Alice (she was so much surprised, that for the moment she quite forgot how to speak good English); 'now I'm opening out like the largest telescope that ever was! Good-bye, feet!' (for when she looked down at her feet, they seemed to be almost out of sight, they were getting so far off).</p>
              <p>'Oh, my poor little feet, I wonder who will put on your shoes and stockings for you now, dears? I'm sure I shan't be able! I shall be a great deal too far off to trouble myself about you: you must manage the best way you can;—but I must be kind to them,' thought Alice, 'or perhaps they won't walk the way I want to go!'</p>
            `
          },
          {
            id: "tears",
            title: "A Pool of Tears",
            content: `
              <h3>Swimming in Tears</h3>
              <p>And she began fancying the sort of thing that would happen: '"Miss Alice! Come here directly, and get ready for your walk!" "Coming in a minute, nurse! But I've got to see that the mouse doesn't get out." Only I don't think,' Alice went on, 'that they'd let Dinah stop in the house if it began ordering people about like that!'</p>
              <p>By this time she had drunk half the bottle, she found her head pressing against the ceiling, and had to stoop to save her neck from being broken. She hastily put down the bottle, saying to herself 'That's quite enough—I hope I shan't grow any more—As it is, I can't get out at the door—I do wish I hadn't drunk quite so much!'</p>
            `
          }
        ]
      }
    ]
  },
  
  "pride-prejudice": {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: "1813",
    sections: [
      {
        id: "chapter1",
        title: "Chapter 1",
        subsections: [
          {
            id: "famous-opening",
            title: "The Famous Opening",
            content: `
              <h3>Chapter 1</h3>
              <p>It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.</p>
              <p>However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.</p>
              <p>"My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?"</p>
              <p>Mr. Bennet replied that he had not.</p>
            `
          },
          {
            id: "conversation",
            title: "The Bennet Conversation",
            content: `
              <h3>Mr. and Mrs. Bennet Discuss</h3>
              <p>"But it is," returned she; "for Mrs. Long has just been here, and she told me all about it."</p>
              <p>Mr. Bennet made no answer.</p>
              <p>"Do you not want to know who has taken it?" cried his wife impatiently.</p>
              <p>"You want to tell me, and I have no objection to hearing it."</p>
              <p>This was invitation enough.</p>
              <p>"Why, my dear, you must know, Mrs. Long says that Netherfield is taken by a young man of large fortune from the north of England; that he came down on Monday in a chaise and four to see the place, and was so much delighted with it, that he agreed with Mr. Morris immediately;"</p>
            `
          }
        ]
      }
    ]
  },

  "metamorphosis": {
    title: "The Metamorphosis",
    author: "Franz Kafka",
    year: "1915",
    sections: [
      {
        id: "chapter1",
        title: "Chapter 1",
        subsections: [
          {
            id: "transformation",
            title: "The Transformation",
            content: `
              <h3>One morning...</h3>
              <p>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</p>
              <p>The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked.</p>
              <p>"What's happened to me?" he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.</p>
            `
          },
          {
            id: "realization",
            title: "Coming to Terms",
            content: `
              <h3>The Reality Sets In</h3>
              <p>A collection of textile samples lay spread out on the table—Samsa was a travelling salesman—and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.</p>
              <p>It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer.</p>
              <p>Gregor then turned to look out the window at the dull weather. Drops of rain could be heard hitting the pane, which made him feel quite sad.</p>
            `
          }
        ]
      }
    ]
  }
};
