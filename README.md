# react-native-image-autoslider
simple javascript image slider for react native apps!


## Installation

```bash
npm install react-native-image-autoslider
```

No additional settings required!

## Usage

```python
import { ImageAutoSlider }  from 'react-native-image-autoslider';

 <ImageAutoSlider
    dataArray={[
        {
          id: 1,
          imagepath:'https://images.freeimages.com/images/large-previews/e67/bg-test-1605008.jpg',
        },
        {
          id: 2,
          imagepath:'https://thumbs.dreamstime.com/b/young-male-software-programmer-testing-new-app-d-virtual-reality-glasses-office-136728859.jpg',
        },
        ]}
    />

```

## Props

* dataArray	- array, list of data	[]
* disableSlide	- bool, enable/disable auto slide	false
* intervalTime	- number, set auto slide interval time	8000
* containerHeight	- number, container height	-
* containerWidth	- number, container width	-
* containerPadding	- number, container padding	-
* containerPaddingVertical	- number, container padding vertical	-
* vertical	- bool, vertical/horizontal list	false
* height	- number, height of child item	-
* width	- number, width of child item	-
* imageHeight	- number, image height	-
* imageWidth	- number, image width	-
* borderColor	- string, child item border colour if selectedItem true	#A9A9A9
* selectedItem	- string, highlight an item	null
* positiveClick	- func, callback for image item click	null
* hideDot	- bool, to enable/disable dot section	null
* dotStyle	- object, custom style for dots	null
* dotActiveColor	- string, dot active color	black
* dotInActiveColor	- string, dot inactive color	gray


## Future release

* Support to vertical list 
* Text with image support
* More customisation support
* Infinite scroll
* Auto complete scroll
* Restart scroll when no action

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.


## License

MIT