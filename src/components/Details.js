
import React, {useCallback, useState} from 'react'
import { useSelector }  from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import axios from '../config/api'
import { View, Image, Alert, ScrollView, TextInput, StyleSheet } from 'react-native'
import {
   Container, Header, Content, Card, CardItem, List, ListItem,
   Thumbnail, Text, Button, Icon, Left, Body, Right, Lest
} from 'native-base';
import {dim} from '../styles'
 
export default function DetailFilm({route, navigation}) {
 
   // const token = useSelector(state => state.auth.token)
   const [film, setFilm] = useState({})
 
   useFocusEffect(
      useCallback(() => {
 
         // const config = {headers: {Authorization : token}}
         axios.get(`/film/${route.params.id}`)
            .then(res => setFilm(res.data))
            .catch(err => console.log({err}))
      }, [])
   )
 
   const onEditFilm = () => {
      navigation.navigate("EditFilm", {id: film.id})
   }
 
   return (
      <Container>
         <ScrollView>
            <View style={{flex: 1}} >
               <Image
                  source={{uri : `http://localhost:2020/film/picture/${film.picture}?unq=${new Date()}` }}
                  style={{width: '100%', height: dim.fullHeight * 0.5}}
               />
               <View style={{marginHorizontal: 7}} >
                  <Text
                     style={{fontSize: 20, fontWeight: 'bold', marginVertical: 10}}
                  >{film.title} </Text>
                  <Text
                     style={{fontSize: 20, color: 'purple', fontWeight: 'bold', marginBottom: 10}}
                  >{film.year} </Text>
                  <Text
                     style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}
                  >{film.director} </Text>
                  <Text
                     style={{fontSize: 16}}
                  >{film.description} </Text>
               </View>
            </View>
         </ScrollView>
         <View style={{height: 40, flexDirection: 'row', justifyContent: 'space-around'}} >
            <Button style={[styles.btn, styles.btnDelete]} onPress={onEditFilm} >
               <Text>Edit</Text>
            </Button>
         </View>
      </Container>
   )
}
 
const styles=StyleSheet.create({
   btn: {
     width: '45%',
     borderWidth: 1,
     borderRadius: 3,
     height: '80%',
     marginVertical: 3,
   },
   btnEdit: {
     backgroundColor: '#8632ed'
   },  
   btnDelete: {
     backgroundColor: 'purple'
   },
   btnText: {
     width: '100%',
     textAlign: 'center'
   }
 })