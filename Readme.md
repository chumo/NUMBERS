# NUMBERS

### Description
This is a D3 web app provided with a machine learning engine (_random forest_ and _svm_ algorithms) to identify handwritten digits from 0 to 9. No need to use convolutional neural nets because the input data is not an image, but a sequence of coordinates along the handwritten path defining the digit.

The training data set is extremely small (just one data point per digit) and yet the app performs very well. The chosen features (or predictors) for training the models are one of the following two:

- The **x** and **y** coordinates of 50 equally spaced points along the handwritten path (100 predictors in total)

- The angles between consecutive points along the handwritten path (49 predictors in total).

The path coordinates are normalised to the unitary space (**x**->[0,1], **y**->[0,1]) before using them in the models.

### Usage
Draw a number (from 0 to 9) with a single path in the top-left panel. Once you are finished, click on this panel to compute the classification results from both the random forest algorithm and the svm algorithm. The result of this computation is visualised in the bottom panel. The top digit is the one predicted by the model.

The purple shadow on the right panels marks which predictors are used for training the models (either _coordinates_ or _angles_). You can choose to use one set of features or the other by clicking this purple shadow.

### Libraries
- [d3.js](https://d3js.org) (for interactivity)
- [plotly.js](https://plot.ly/javascript/) (for feature visualisation)
- [randomforest.js](https://github.com/karpathy/forestjs) (machine learning)
- [svm.js](https://github.com/karpathy/svmjs) (machine learning)

### License
GNU GENERAL PUBLIC LICENSE v3.0 (see [LICENSE](LICENSE) file).

Enjoy!

Jesús Martínez-Blanco
