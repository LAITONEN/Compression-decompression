const express = require('express');
var logger = require('morgan');
var router = express.Router();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/test', (req, res) => {
  res.send('Test')
})

app.post('/compress', (req, res) => {
  const correctFormat = /^[a-z\n]+$/gm
  if (correctFormat.test(req.body.value) === false) {
    res.status(400).send('Incorrect data format. Please make sure there are no other characters than letters and each word is separated by a new line.');
  }

  const data = req.body.value.split('\n')
  const compress = (arrayOfWords) => {
    const result = arrayOfWords.map((currentWord, wordIndex, array) => {
      if (wordIndex === 0) return `0 ${currentWord}`
      const previousWord = array[wordIndex - 1]
      const firstIndexWithMismatch = currentWord.split('').findIndex((currentWordCharacter, characterIndex) => {
        return previousWord[characterIndex] !== currentWordCharacter
      })

      const matchedCharacters = firstIndexWithMismatch === -1 ? currentWord.length : firstIndexWithMismatch

      const restOfTheWord = currentWord.substring(matchedCharacters)

      return `${matchedCharacters} ${restOfTheWord}`
    })
    return result
  }

  const result = compress(data)

  res.send(result)
})

app.post('/decompress', (req, res) => {
  const correctFormat = /^\d+\s[a-z]+$/gm
  if (correctFormat.test(req.body.value) === false) {
    res.status(400).send('Incorrect data format. Please make sure that each line contains digit and word separated by a white space and nothing else.');
  }

  const data = req.body.value.split('\n')
  const nonLetters = /[^a-zA-Z]/g
  const replaceNonLetters = (string) => string.replace(nonLetters, '')

  const decompress = (arrayOfStrings) => {
    const result = arrayOfStrings.reduce((result, string, stringIndex) => {
      if (stringIndex === 0) {
        return result.concat(replaceNonLetters(string))
      }
      const sharedCharacterAmount = string.match(/\d+/) || 0
      const endOfWordFromCurrentString = replaceNonLetters(string)
      const startOfWordFromPreviousString = replaceNonLetters(result[result.length - 1]).substring(0, sharedCharacterAmount)
      const word = startOfWordFromPreviousString + endOfWordFromCurrentString

      return result.concat(word)
    }, [])
    return result
  }

  const result = decompress(data)

  res.send(result)
})

var PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
});

module.exports = app;
