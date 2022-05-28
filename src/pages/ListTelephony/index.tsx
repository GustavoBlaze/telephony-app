import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, FlatList, Alert, Text } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { Header } from "../../components/Header";
import { ListCard } from '../../components/ListCard';

interface ListTelephonyProps {
  id: string,
  line_number: string,
  chip_number: string,
  data_plan: string,
  account_name: string,
  telephone_operator: string
}

export function ListTelephony() {
  const [status, setStatus] = useState('')
  const [telephonyData, setTelephonyData] = useState<ListTelephonyProps[]>([])

  function handleDeleteTelephony(id: string) {
    Alert.alert("Exclusão", 'Tem certeza?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK', onPress: () => {
          setStatus('E')
          setTelephonyData(tel =>
            telephonyData.filter(tel => tel.id !== id))
        },
      }
    ])
  }

  async function loadDataTelephony() {
    const data = await AsyncStorage.getItem('@mytelephony:telephone')
    if (data) {
      console.log(data)
      setTelephonyData(JSON.parse(data))
    }
  }

  useEffect(() => {
    loadDataTelephony()
  }, [])

  useFocusEffect(useCallback(() => {
    loadDataTelephony()
  }, []))

  useEffect(() => {
    async function saveTelephone() {
      await AsyncStorage.setItem('@mytelephony:telephone', JSON.stringify(telephonyData))
    }
    saveTelephone()
  }, [telephonyData])

  return (
    <View style={styles.container}>
      <Header title='Listam de telefonia' />

      <FlatList
        data={telephonyData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListCard
            item={item}
            onPress={() => handleDeleteTelephony(item.id)}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f2f5'
  }
})

