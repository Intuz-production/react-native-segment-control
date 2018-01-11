/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';

import INTSegmentControl from './app/component/INTSegmentControl';

    var arrSegmentText =  ['iOS','Android','React','React Native','Facebook', 'Google', 'Twitter','Linked In'];

    var arrSegment =  [{title:'Facebook',
                        icon:require('./app/images/ic_facebook.png'),
                        iconSelected:require('./app/images/ic_facebook_fill.png')},

                        {title:'Google',
                        icon:require('./app/images/ic_google.png'),
                        iconSelected:require('./app/images/ic_google_fill.png')},

                        {title:'Twitter',
                        icon:require('./app/images/ic_twitter.png'),
                        iconSelected:require('./app/images/ic_twitter_fill.png')},
        
    ];

export default class App extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <View style={{backgroundColor:'#ffffff', flex:1}}>
      <View style={{margin: 10, marginTop: 40, padding : 0, height : 500, justifyContent : 'space-between'}}>

      <View>
        <Text style={{marginBottom: 10, padding : 0,}}>• Segment style Box with Dynamic width as per text </Text>
        <INTSegmentControl controllStyle = {{height : 50, backgroundColor : '#74DDEE'}} 
          arrSegment ={arrSegmentText} 
          titleDisplayKey = 'title'
          titleStyle = {{color:'#038EA5', fontSize : 16}}
          selectedSegmentColor = {'#2BCCE6'}
          onSelectionDidChange = {(selectedIndex) => {console.log('Selected Index ========' +  selectedIndex)}}
        />
      </View>

      <View>
        <Text style={{marginBottom: 10, padding : 0,}}>• Segment style Stripe with Fixed width </Text>
        <INTSegmentControl controllStyle = {{height : 50, backgroundColor : '#74DDEE'}} 
          arrSegment ={arrSegmentText} 
          titleDisplayKey = 'title'
           segmentWidthStyle = 'fixed' 
           segmentWidth = {120}
          titleStyle = {{color:'#038EA5', fontSize : 16}}
          titleStyleSelected = {{color:'black', fontSize : 16}}
          selectedSegmentColor = {'#2BCCE6'}
           selectionStyle = 'stripe'// box || stripe
           stripeColor = '#057183'
           stripHeight = {4}
          onSelectionDidChange = {(selectedIndex) => {console.log('Selected Index ========' +  selectedIndex)}}
        />
      </View>

      <View>
        <Text style={{marginBottom: 10, padding : 0,}}>• Segment with icon and text</Text>
        <INTSegmentControl controllStyle = {{height : 50, backgroundColor : '#057689'}} 
          arrSegment ={arrSegment} 
          titleDisplayKey = 'title'            
           isTextOnlySegment = {false}      
          titleStyle = {{color:'#ffffff80', fontSize : 16}}
          titleStyleSelected = {{color:'#ffffff', fontSize : 16}}
          selectedSegmentColor = {'#ffffff40'}  
          onSelectionDidChange = {(selectedIndex) => {console.log('Selected Index ========' +  selectedIndex)}}
        />
      </View>


      <View>
        <Text style={{marginBottom: 10, padding : 0,}}>• Segment with icon position at top of the text</Text>
        <INTSegmentControl controllStyle = {{height : 70, backgroundColor : '#057689'}} 
          arrSegment ={arrSegment} 
          titleDisplayKey = 'title'            
           isTextOnlySegment = {false}
           segmentWidthStyle = 'fixed' 
           segmentWidth = {345/3} 
           segmentIconPosition ='top'
           spaceBetweenIconAndTitle = {5}
          titleStyle = {{color:'#ffffff80', fontSize : 16}}
          titleStyleSelected = {{color:'#ffffff', fontSize : 16}}
          selectedSegmentColor = {'#ffffff40'}
            selectionStyle = 'stripe'// box || stripe
            stripeColor = '#ffffff70'
            stripHeight = {4}
          onSelectionDidChange = {(selectedIndex) => {console.log('Selected Index ========' +  selectedIndex)}}
        />
      </View>

        </View>        
      </View>
    );
  }
}
