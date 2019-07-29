import React from 'react';
import { StyleSheet, Text, View, FlatList,AsyncStorage } from 'react-native';
import Header from './app/components/Header'
import SubTitle from './app/components/Subtitle'
import Input from './app/components/Input'
import TodoItem from './app/components/Todo'
// App.js

export default class App extends React.Component {
  
  state = {
    inputValue : '',
    todos: [
      {
        title: "물 3잔 마시기",
        isComplete: false
      },
      {
        title: "30분 이상 걷기",
        isComplete: false
      }
    ]
  }
  saveItem = () => {
    //state를 문자열로 바꿔서 저장함
    AsyncStorage.setItem('@todo:state',JSON.stringify(this.state));
  }

  componentWillMount() {
    AsyncStorage.getItem('@todo:state').then((state)=> {
        if( state != null){
            this.setState(JSON.parse(state));
        }
    });
  }

  _addTodo = () => {
    const prevTodo = this.state.todos

    const newTodo = {title:this.state.inputValue,isComplete:false}

    this.setState({
      inputValue: '',
      todos: prevTodo.concat(newTodo)
    },this.saveItem)
  }

  _changeText = (value) => {
    this.setState({inputValue: value},this.saveItem)
  }

  _makeTodoItem = ({ item, index }) => {
    return (
      <TodoItem 
      text={item.title}
      isComplete={item.isComplete}
      changeComplete={() => {
        const newTodo = [...this.state.todos]
        newTodo[index].isComplete = !newTodo[index].isComplete
        this.setState({todos:newTodo},this.saveItem)
      }}
      deleteItem={() => {
        const newTodo = [...this.state.todos]
        newTodo.splice(index,1)
        this.setState({todos:newTodo},this.saveItem)
      }}  />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.centered}>
            <Header/>
        </View>
        <View style={styles.inputContainer}>
          <SubTitle title="To-Do 입력"/>
          <Input 
            value={this.state.inputValue}
            changeText={this._changeText}
            addTodo={this._addTodo}
            />
        </View>
        <View style={styles.todoContainer}>
          <SubTitle title="To-Do List"/>
          <FlatList
            data={this.state.todos}
            renderItem={this._makeTodoItem} 
            keyExtractor={(item, index) => { return `${index}`}}
            />
        </View>
      </View>
                
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centered: {
    alignItems: 'center',
  },
  inputContainer: {
    marginLeft:20
  },
  todoContainer:{
    marginLeft:20,
    marginTop:20
  }
});