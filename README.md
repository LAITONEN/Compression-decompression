## What is this app
The app contains algorithms for encoding decoding words by the following principles:
A string:
```
string
stroller
fear
forest
```

will get encoded into:
```
0 string
3 oller
0 fear
1 orest
```

which in turn can be decoded back into:
```
string
stroller
fear
forest
```

The logic is as following:
1. An algorithm takes a string on each line and a previous line.
2. If a string on the previous line starts with similar characters than the string on the current line, those characters are being stripped off the current string and converted into a number representing the count of such characters.
3. Which means, that `0` in `0 fear` stands for 0 characters from the beginning of the current string match the beginning of the previous string `stroller`.
4. Decoding will not work otherwise if the encoded string did not follow this logic during the compression.

## Using this app
1. Get this repository to your computer, how - https://help.github.com/articles/cloning-a-repository/
2. Use Terminal / Command Prompt to navigate to the folder you have just downloaded using command `cd`.
3. Run `npm install` to install server dependencies.
4. Run `cd client && npm install` to install client dependencies.
5. Run `cd .. && npm run dev` to start both client and server.
6. If the browser tab with the website has not opened automatically, do it manually by going to http://localhost:3000/
7. Server runs at http://localhost:5000/
