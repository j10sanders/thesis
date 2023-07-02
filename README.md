
### Thesis chatGPT powered ETH transactions

AI is poised to take full advantage of crypto.  AI agents won't have bank accounts - [they will have crypto wallets](https://www.bloomberg.com/opinion/articles/2023-06-09/what-s-the-best-use-for-crypto-ai-will-figure-it-out).  This app is a simple implementation of using chatGPT to send transactions, but could easily be extended to any type of on-chain activity, and then further extended to use in an autonomous agent.

#### Running the code:
You will need to run ganache locally on port 8545 (`npm install ganache --global`) and run it with `ganache`.

Then run the app with `yarn run dev` (after `yarn install`).  I included a screen recording of the functionality.

<div style="padding:62.53% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/841670378?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Screen Recording 2023-07-02 at 1.51.27 PM"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>


You will also need an openAI api key to save in the project's .env as `OPENAI_API_KEY`. 

I built this app in a short amount of time (as per the instructions) and would love to expand on it.
