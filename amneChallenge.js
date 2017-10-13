var readSingleFile = (event) => {
  var file = event.target.files[0];

  if (file) {
    var fileReader = new FileReader();
    fileReader.onload = function(e) {
      var contents = parseFileText(e.target.result);
      relativeSubrangeOutput(contents.windowSize, contents.avgHomeSalePrices);
    }
    fileReader.readAsText(file);
  } else {
    alert("Failed to load file");
  }
};

var parseFileText = (fileText) => {
  var content = fileText.split('\n');
  var result = {};
  result['windowSize'] = Number(content[0].split(' ')[1]);
  result['avgHomeSalePrices'] = content[1].split(' ').map(price=>Number(price));
  return result;
};

var relativeSubrangeOutput = (windowSize, avgHomeSalePrices) => {
  var appendOutput = (output) => {document.getElementById('output').append(output)};
  appendOutput('hi');
  appendOutput('world')
};

document.getElementById('fileinput').addEventListener('change', readSingleFile, false);
