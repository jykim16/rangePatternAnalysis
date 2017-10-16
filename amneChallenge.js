var readSingleFile = (event) => {
  var file = event.target.files[0];

  if (file) {
    var fileReader = new FileReader();
    fileReader.onload = function(e) {
      var contents = parseFileText(e.target.result);
      relativeSubrangeOutput(contents.windowSize, contents.avgHomePricesLength, contents.avgHomeSalePrices);
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
  result['avgHomePricesLength'] = Number(content[0].split(' ')[0]);
  result['avgHomeSalePrices'] = content[1].split(' ').map(price=>Number(price));
  return result;
};

var relativeSubrangeOutput = (windowSize, avgHomePricesLength, avgHomeSalePrices) => {
  //find backward trends to get number of postives frontloaded
  var trendRight = avgHomeSalePrices.reduceRight((result, salePrice, i, arr) => {
    if(i > 0) {
      if(arr[i-1] < salePrice) {
        if(result[0] < 0) {
          result.unshift(result[0] - 1);
          return result;
        } else {
          result.unshift(-1);
          return result;
        }
      } else if(arr[i-1] > salePrice) {
        if(result[0] > 0) {
          result.unshift(result[0] + 1);
          return result;
        } else {
          result.unshift(1);
          return result;
        }
      } else {
        result.unshift(0)
        return result;
      }
    } else {
      return result;
    }
  }, [])
  //1 variable to represent trend positive or negative.
  var trend = 0;
  //traverse forward to console answer starting from n+1 until end.
  avgHomeSalePrices.reduce((result, salePrice, i, arr) => {
    //update trend
    if(trendRight > 0) {
      trend = trend < 0 ? trend - 1: -1;
    } else if (trendRight < 0) {
      trend = trend > 0 ? trend + 1: 1;
    } else {
      trend = 0;
    }
    //console result
    if(i > windowSize - 1) {
      console.log(result);
      result + trendRight[i];
    }
    //update result
    return result + trend;
  }, 0)
};

document.getElementById('fileinput').addEventListener('change', readSingleFile, false);
