const express = require('express');
const path = require('path');

const app = express();

// app.get('/', (req, res) => {
//   res.sendFile(
//     path.resolve(__dirname, '../', 'Frontend', 'public', 'index.html')
//   );
// });

app.use(express.static(path.resolve(__dirname, '../', 'Frontend', 'public')));

app.listen(3000, () => {
  console.log('Express listening on port 3000');
});
