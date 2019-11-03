import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Input, Item, Button, Icon} from 'native-base';

import firebase from './firebase';

export default class App extends Component {

todoDatabase = firebase.database().ref('todo');

  state = { todos: {}, selectedId: '' }

//Read data
  componentDidMount() {
    this.todoDatabase.on('value', todos => {
      const todosJSON = todos.val();
      this.setState({ todos: todosJSON === null ? {} : todosJSON });
    })
  }

  //Create data retrieved from input
  create(data) {
    var key = firebase.database().ref('todo').push({task: data}).key
    firebase.database().ref('todo').child(key).set({task: data})
  }

  //Update
  update(){
    this.todoDatabase.child(this.state.selectedId).set({task:'white'})
  }

  //Delete data
  deleteList(data){
    if(this.state.selectedId === ''){
      return;
    }
    this.todoDatabase.child(this.state.selectedId).set(null)
    this.setState({selectedId:''})
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headertext}>My To-Do-List</Text>
        </View>


        {/* Add new value to firebase */}
        <Item>
              <Input 
                onChangeText = {(newTask) => this.setState({newTask})}
                placeholder="Add Task" 
              />
              <Button>
                <Icon name="add" onPress={() => this.create(this.state.newTask)}/>
              </Button>
        </Item>


        {/* Where and how data will be shown to the user */}
        <ScrollView>
        {
          Object.keys(this.state.todos).map( (data, index) =>
            <TouchableOpacity key={index} onPress={() => this.setState({selectedId: data})}>
                <Text style={styles.content}>{JSON.stringify(this.state.todos[data])}</Text> 
            </TouchableOpacity>
          )
        }
        </ScrollView>
        
        {/* Delete data based on Id from firebase */}
        <Item style={styles.deleteList}>
          <TextInput placeholder="Click any task to delete" value={this.state.selectedId} style={styles.textInput}></TextInput>
          <Button>
            <Icon name="trash" onPress={() => this.deleteList()}/>
          </Button>
        </Item>

      </View>
    );
  }
}


// Stylesheet

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    fontSize: 20,
    fontFamily: 'Avenir',
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: "#ffe89a"
  },
  textInput: {
    backgroundColor: '#d75128',
    width: 300,
    borderRadius: 10,
    color: 'white',
    fontFamily: 'Avenir',
    fontSize: 24,
    padding: 6,
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#FFEC59',
    height: 100,
    top: 0,
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
  },
  headertext: {
    textAlign: "center",
    justifyContent: "center",
    fontFamily: 'Avenir',
    top: 25,
    fontSize: 24
  },
  deleteBtn: {
    display: "flex",
    justifyContent: "space-between"
  },
  deleteList: {
    bottom: 0,
    top: 100
  }
});
