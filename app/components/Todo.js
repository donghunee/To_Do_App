import React from "react"
import {View,TouchableOpacity,Text,StyleSheet,Dimensions} from "react-native"
import {FontAwesome,AntDesign} from "@expo/vector-icons"

const {width,height} = Dimensions.get('window');

//Todo.js

//Todo.js

const TodoItem= ({text,isComplete,changeComplete,deleteItem}) => (
    <View style={styles.todoContainer}>
        <View>
            <View style={styles.objContainer}>
                <View style={styles.textContainer}>
                    <TouchableOpacity
                        onPress={changeComplete}>  
                        <AntDesign name={isComplete?"checksquare":"checksquareo"} size={20} style={styles.check} />
                    </TouchableOpacity>
                    <Text 
                    style={isComplete?ifstyle(true):ifstyle(false)}
                    >{text}</Text>
                </View>
                <TouchableOpacity
                    onPress={deleteItem}>  
                    <FontAwesome name="close" size={20}/>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

const ifstyle = (isComplete) => {
    if(isComplete){
        return {
            textDecorationLine: 'line-through',
            fontSize:20,
            color: 'gray'
        }
    }else{
        return {
            fontSize:20
        }
    }
}

const styles = StyleSheet.create({
    todoContainer: {
        padding: 5,
        marginTop: 20,
        borderBottomWidth:1,
        width: width-40
    },
    todos: {
        textDecorationLine: 'line-through',
        fontSize: 70
        
    },
    objContainer: {
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    textContainer: {
        flexDirection:'row',
        alignItems: 'center'

    },check: {
        marginRight:10
    }
})

export default TodoItem