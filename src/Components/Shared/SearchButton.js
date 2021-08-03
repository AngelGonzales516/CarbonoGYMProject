import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const SearchButton = () => {
    return (
        <TouchableOpacity style={styles.search}>
            <Icon
                iconStyle={styles.searchIcon}
                name="search"
                type="font-awesome"
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    search: {
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    searchIcon: {
        fontSize: 30,
        color: "#2f3640"
    }
});

export default SearchButton;