
# React Native Marquee View
[![npm version](https://badge.fury.io/js/react-native-marquee-view.svg)](https://badge.fury.io/js/react-native-marquee-view) ![](https://img.shields.io/github/issues/minhchienwikipedia/react-native-marquee-view.svg) ![](https://img.shields.io/github/forks/minhchienwikipedia/react-native-marquee-view.svg) ![](https://img.shields.io/github/stars/minhchienwikipedia/react-native-marquee-view.svg) ![](https://img.shields.io/github/license/minhchienwikipedia/react-native-marquee-view.svg)
#### Help you auto scroll content

## Demo
<img src="./demo.gif" data-canonical-src="./demo.gif" width="300" height="200" />


## Getting started

```sh
npm install react-native-marquee-view --save
```

- OR


```sh
yarn add react-native-marquee-view
```

## Usage
```javascript
import MarqueeView from 'react-native-marquee-view';

<MarqueeView
	style={{
		backgroundColor: 'blue',
		width: 200,
	}}>
	<View style={{ backgroundColor: 'red' }}>
		<Text>This is demo content</Text>
	</View>
</MarqueeView>

```

## Properties

| Prop                  | Description                                         | Default |
| --------------------- | --------------------------------------------------- | ------- |
| **`style`**           | `View` style                                        | \_      |
| **`speed`**        	| Speed                         | 0.1     |
| **`delay`**           | Delay time before start auto scroll animation (ms). | 0    |
| **`autoPlay`**        | Auto start when it's mount | true    |
| **`playing`**         | You can put state value to this prop to handle play/stop depend on value | \_    |


### Method:
- `start`: Start animation  
- `stop`: Reset animation


### More
This package inspired by https://github.com/homielab/react-native-auto-scroll

## License

This module is [MIT licensed](./LICENSE)

---
  
