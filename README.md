## Introduction

The goal of this coding exercise is to design a mini library that simulates the analysis of the quality of images in real time to provide feedback on screen.

The mini library must have a component that continuously generates mock images at a fixed rate of `200ms` with properties that provide a quality score of different aspects of the quality of the image, the generated images will be consumed by a different component that will process the images and evaluate their properties to determine the appropriate feedback to show on screen, the analysis of the frames should last a minimum of `500ms` per frame.

For each frame analyzed, the mini library should produce a quality evaluation in the form of feedback to be presented on screen for example, “too blurry” if the sharpness score is bad, and be displayed on screen 2000ms according to the configuration of the mini library.

## Exercise Instructions

Make use of the skeleton project in this package and use it as a starting point to build a mini library with the following requirements.

### A Configuration

Design an API that can be used to configure the mini library settings, the configuration should be “fed” to the mini library and the mini library must make use of the configuration to adjust the behavior, the supported settings must be:

1. Custom feedback text for specific image quality feedback, e.g. the integrator of the library can define that the feedback should be “image is not sharp” when the sharpness score is bad instead of the default “too blurry”.

2. Duration of the feedback text on screen, e.g. the integrator of the library can specify that the feedback should be on screen for 3000ms instead of the default.

The configuration should have default values in case that the integrator decides not to provide a custom configuration, the default values are:

1. Custom feedback text:
    * “blurry” if the sharpness score is low.
    * “too bright” if the exposure score is too high.
    * “too dark” if the exposure score is too low.
    * “low contrast” if the contrast score is too low.
    * “ok” if all the scores are good.

2. Duration of the feedback text on screen: `2000ms`

### An Integration API

Design an integration API so that an integrator can make use of the mini library, the design should consider the minimum exposed API to make the integration as simple as possible while hiding the internals of how the mini library works, the library should provide at least the following API:

1. A way to start the processing of images, e.g. a “start” method, this method should coordinate the different components of the mini library to start processing images and to start visualizing the feedback on screen according to the integrator’s configuration, the processing of images must have a “keep latest” strategy, in which the latest available image is processed, if images are generated while the library is “busy” processing an image, the image should be discarded.

2. A way to stop the processing of images, e.g. a “stop” method, this method should coordinate the different components of the mini library to stop any ongoing processing of images and stop the visualization of feedback on screen.

Consider that the integration API is the “public” API, design it in such a way that is easy to use and that handles unexpected usage gracefully if needed.

### An Inter-library API

The Inter-library API is the “private” API, it includes all the classes, interfaces and methods that encapsulate the internals of the mini library, this API should be designed to support all the mini library needs for internal communication between components, e.g. the API that will be used by the component that generates the images to “stream” those to interested components.

## Starting Point

This exercise includes a skeleton project with the relevant components and purposes. Look into each of the files to learn more about their expected behavior and the requirements listed on the TODOs you must complete as part of this coding exercise.

## Expected Outcome

A .zip package with the contents of the updated exercise with an INSTRUCTIONS.md file explaining how to build and use the mini library.

## Considerations and Hints

* While the exercise comes with predefined classes, methods, and signatures, you are encouraged to change them if needed. you need to.
* Create as many classes, methods and scripts as you need, you’re encouraged to design this mini library in the best way you can.
* Keep in mind the accessor modifiers of the different methods and classes, change them as you need as per your intended design, remember that the library should be easy to use and encapsulate properly the internals.