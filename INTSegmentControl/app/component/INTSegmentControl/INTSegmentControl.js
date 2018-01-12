// Copyright (C) 2018 INTUZ. 

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to
// the following conditions:

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
// ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH
// THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import styles from './styles';

const SegmentIconPosition = {
  Left :   'left',
  Right : 'right',
  Top: 'top',
  Bottom: 'bottom'
}

const SegmentWidthStyle = {
  Fixed :   'fixed',
  Dynamic : 'dynamic'
}

const SelectionStyle = {
  Box :   'box',
  Stripe : 'stripe'
}

export default class INTSegmentControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrSegment: this.props.arrSegment == undefined ? [] : this.props.arrSegment,
      selectedIndex : this.props.selectedIndex > this.props.arrSegment.length ? (this.props.arrSegment.length - 1) : (this.props.selectedIndex ||  0)     
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.selectedIndex != undefined){
      this.setState({selectedIndex : nextProps.selectedIndex > this.state.arrSegment.length ? (this.state.arrSegment.length - 1) : (nextProps.selectedIndex ||  -1)})
    }     
  }

  componentDidMount() {
  }

  static defaultProps = {    
    segmentWidthStyle : SegmentWidthStyle.dynamic, // fixed | dynamic 
    segmentWidth : 100, // Will use when segment width style is fixed
    segmentIconPosition : SegmentIconPosition.Left,
    spaceBetweenIconAndTitle : 10,
    spaceBetweenSegment : 5,
    segmentStyle:{}, // Optional
    isTextOnlySegment : true,
    selectionStyle : SelectionStyle.Box,
    selectedSegmentColor:'#ffffff40',
    stripeColor:'white', // seperator color which display selected indicator
    stripHeight : 3
  };

  segmentItemDidSelect(segmentObj, index){
    if ((index + 1) < this.state.arrSegment.length) {
      this.listView.scrollToIndex({ index: index + 1  || 0 , animated: true, viewPosition:1, viewOffset: 0});
    }    
    this.setState({selectedIndex : index})
    if (this.props.onSelectionDidChange != undefined) {
      this.props.onSelectionDidChange(index);
    }
  }
 
  renderSegmentItem (rowData) {
    var segmentObj = rowData.item;
    var rowIndex = rowData.index;
    
    if (typeof(segmentObj) == 'string') {
      var segmentTitle = segmentObj      
    } else {
      var segmentTitle = segmentObj[this.props.titleDisplayKey]
    }

    var arrSegmentStyle =  [styles.segmentItem];
    var arrTitleStyle =  [styles.title]
    //Add default style
    if (this.props.segmentWidthStyle == SegmentWidthStyle.Fixed) {
      arrSegmentStyle.push({width:this.props.segmentWidth})
    }

    //Set custom style provided by dev
    arrSegmentStyle.push(this.props.segmentStyle)

    //Add space bewtween segment
    if (rowIndex != 0) {
      arrSegmentStyle.push({marginLeft : this.props.spaceBetweenSegment})
    }

    // Add flex direction 
    if (this.props.segmentIconPosition == SegmentIconPosition.Left || this.props.segmentIconPosition == SegmentIconPosition.Right){
      arrSegmentStyle.push({flexDirection:'row'})
    } else {
      arrSegmentStyle.push({flexDirection:'column'})
    }
    
    //Change style and icon for selected segment
    let viewSeperator = null
    var icon =  segmentObj.icon
    if (this.state.selectedIndex == rowIndex) {

      if (this.props.selectionStyle == SelectionStyle.Box) {
        arrSegmentStyle.push({backgroundColor:this.props.selectedSegmentColor})
      }
      else if (this.props.selectionStyle == SelectionStyle.Stripe) {
        viewSeperator = <View style = {[styles.selectionStrip,{backgroundColor:this.props.stripeColor, height : this.props.stripHeight}]}/>
      }
      arrTitleStyle.push(this.props.titleStyleSelected || this.props.titleStyle) 
      icon = segmentObj.iconSelected || segmentObj.icon 
    }else {
      arrTitleStyle.push(this.props.titleStyle) 
    }

    // Add icon and space view if isTextOnlySegment = false default value is true
    var iconView =  <Image key = {1} source = {icon}></Image> 
    var viewSpaceBetween = <View key = {2} style = {{ width:this.props.spaceBetweenIconAndTitle, height : this.props.spaceBetweenIconAndTitle}}></View>
    
    if (this.props.isTextOnlySegment == true){
      iconView = null
      viewSpaceBetween = null
    }

    return <TouchableOpacity style= {arrSegmentStyle} onPress={() => this.segmentItemDidSelect(segmentObj, rowIndex)} activeOpacity= {0.95}>      

        {(this.props.segmentIconPosition == SegmentIconPosition.Left || this.props.segmentIconPosition == SegmentIconPosition.Top) 
          ? [iconView, viewSpaceBetween]
          : null}
        
        <Text style = {arrTitleStyle}> {segmentTitle} </Text>      

        {(this.props.segmentIconPosition == SegmentIconPosition.Right || this.props.segmentIconPosition == SegmentIconPosition.Bottom) 
          ? [viewSpaceBetween,iconView] 
          : null}
          
          {viewSeperator}
    </TouchableOpacity>    
  }

  render() {
    return (
      <View>
          <FlatList style={[styles.listView,this.props.controllStyle]} 
          ref = {(_listView) => {this.listView = _listView}}
          data={this.state.arrSegment} 
          renderItem={this.renderSegmentItem.bind(this)} 
          horizontal={true}
          keyExtractor={(item, index) => index} 
          showsHorizontalScrollIndicator={false}  
          extraData={this.state}/>
      </View>     
    );
  }
}
