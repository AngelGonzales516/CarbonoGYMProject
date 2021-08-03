import React from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import { SearchBar } from 'react-native-elements';

const { width, heigth } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SearchBar style={styles.container}
        placeholder="Type Here..."
        lightTheme= "true"
        onChangeText={this.updateSearch}
        value={search}
        containerStyle={styles.container2}
        inputContainerStyle={styles.container3}
      />
    );
  }
}

const styles = StyleSheet.create({
    text: {
      fontSize: 20,
    },
    container: {
        backgroundColor: "white",
        borderRadius: 8,
        width: width * 0.64,
        color: "#2f3640",
    },
    container2:{
      backgroundColor: "#f0f0f0",
      borderRadius: 8,
      
    },
    container3:{
      backgroundColor: "#f0f0f0",
      borderRadius: 8,
    },
  });