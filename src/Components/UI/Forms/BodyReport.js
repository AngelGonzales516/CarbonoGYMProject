import React from "react"
import {ListItem,Card, Text} from "react-native-elements"
import { StyleSheet,Dimensions } from "react-native"

const { width, height } = Dimensions.get("window");


const list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman'
    },
     // more items
  ]

const BodyReport = () =>{

    return (<>
                    <ListItem style={styles.ListItem} bottomDivider>
                    <ListItem.Content style={styles.ListItemContent}>
                    <ListItem.Title style={styles.ListItemTitle}>Rutina</ListItem.Title>
                    <ListItem.Title style={styles.ListItemTitle}>Cant Usuarios</ListItem.Title>
                    </ListItem.Content>
                    </ListItem>

         {
                list.map((l, i) => (
                    <ListItem key={i} bottomDivider>
                     
                      <ListItem.Content style={styles.ListItemContent}>
                        <ListItem.Title style={styles.ListItemTitle}>{l.name}</ListItem.Title> 
                        
                        <ListItem.Title style={styles.ListItemTitle}>{l.subtitle}</ListItem.Title>
                        
                      </ListItem.Content>
                    </ListItem>
                  ))
         }
        </>
        )

}


/*<Card>
<Text> HOLA </Text>
</Card>*/
const styles = StyleSheet.create({
    ListItem:{
        marginTop:height * 0.02,
        marginBottom:height * 0.02
    },
    ListItemContent:{
        flex: 1,
        flexDirection: 'row',
        justifyContent:"center"
    },
    ListItemTitle : {
        marginLeft: width * 0.06,
        marginRight: width * 0.06,
        
    }
})

export default BodyReport;


