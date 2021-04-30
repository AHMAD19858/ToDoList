
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Image, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
import TaskComponent from './components/Tasks';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
export default function App() {
  const [Task, setTask] = useState()
  const [TaskItems, setTaskItems] = useState([])
  const addTask = () => {
    Keyboard.dismiss();
    setTaskItems([...TaskItems, Task])
    setTask(null)
  }


  const completeTask = (index) => {
    let itemsCopy = [...TaskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
  }
  if (TaskItems.length == 0) {
    return (
      <View style={styles.containerEmpty}>
        <Image source={require('./assets/todo.png')} style={styles.image} />
        <Text style={styles.emptyText}>Your Task List is Empty</Text>
        <KeyboardAvoidingView behavior={'height'} style={styles.writeTaskWrapper}>

          <TextInput
            style={styles.input}
            placeholder='Write a task'
            onChangeText={text => setTask(text)}
            value={Task}
          />
          <TouchableOpacity onPress={() => addTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>

        </KeyboardAvoidingView>
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        {/* today's task */}
        <View style={styles.taskWrapper}>
          <Text style={styles.sectionTitle}> Today's Task </Text>

          <View style={styles.items}>
            {/* here will be the tasks */}
            {
              TaskItems.map((item, index) => {
                return <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <TaskComponent text={item} />
                </TouchableOpacity>

              })
            }

          </View>

        </View>
        {/* add a task */}

        <KeyboardAvoidingView behavior={'height'} style={styles.writeTaskWrapper}>

          <TextInput
            style={styles.input}
            placeholder='Write a task'
            onChangeText={text => setTask(text)}
            value={Task}
          />
          <TouchableOpacity onPress={() => addTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>

        </KeyboardAvoidingView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed',
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },

  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    padding: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 60,
    borderColor: '#c0c0c0',
    borderWidth: 1
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#c0c0c0',
    borderWidth: 1
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  emptyText: {
    margin: 24,
    fontSize: 18,
    letterSpacing: 1,
    textAlign: 'center',
    color: '#6D6D6D'
  },
  containerEmpty:{
    flex: 1,
    backgroundColor: '#e8eaed',
    flexDirection: 'column',
    justifyContent: 'center',
    width: width,
    height: height
  }
});
