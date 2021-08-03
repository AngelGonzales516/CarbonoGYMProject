// Basado en el toturial https://www.youtube.com/watch?v=bNuwwkgRQOk&t=301s
import React from 'react';
import { View, StyleSheet, ScrollView,FlatList } from 'react-native';
import { useTabBar } from '../context/TabBarProvider';
import Post from '../../../Shared/Post'

let offsetY = 0;
const AnimatedScrollView = ({ children, ...restProps }) => {
  const { setShowTabBar } = useTabBar();
  return (
    <ScrollView
      
      {...restProps}
      onScroll={({ nativeEvent }) => {
        const newOffset = nativeEvent.contentOffset.y;
        if (newOffset <= 0) return setShowTabBar(true);
        offsetY < newOffset ? setShowTabBar(false) : setShowTabBar(true);
        offsetY = newOffset;
      }}
    
      
    >
      {children}
   </ScrollView>
  );
};


/*{children} */
const styles = StyleSheet.create({
  container: {},
});

export default AnimatedScrollView;