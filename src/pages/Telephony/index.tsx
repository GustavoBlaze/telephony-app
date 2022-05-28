import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  View,
  StyleSheet,
  Alert
} from 'react-native'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'

export function Telephony() {
  const [line_number, setLine_Number] = useState('')
  const [chip_number, setChip_Number] = useState('')
  const [data_plan, setDataPlan] = useState('')
  const [account_name, setAccount_Name] = useState('')
  const [telephone_operator, setTelephone_Operator] = useState('')

  async function handleAddTelephone() {
    const telephone = {
      id: new Date().getTime(),
      line_number,
      chip_number,
      data_plan,
      account_name,
      telephone_operator
    }
    try {
      const data = await AsyncStorage.getItem('@mytelephony:telephone')
      const currentData = data ? JSON.parse(data) : []
      const dataFormatted = [
        ...currentData,
        telephone
      ]
      await AsyncStorage.setItem('@mytelephony:telephone',
        JSON.stringify(dataFormatted))
    } catch (err) {
      console.log(err)
      Alert.alert('Error ao salvar os dados da telefonia')
    }
    setLine_Number('')
    setChip_Number('')
    setDataPlan('')
    setAccount_Name('')
    setTelephone_Operator('')
  }

  async function loadDataTelephone() {
    const data = await AsyncStorage.getItem('@mytelephony:telephone')
    const currentData = data ? JSON.parse(data) : []
    // await AsyncStorage.clear()
  }

  useEffect(() => {
    loadDataTelephone()
  }, [])

  return (
    <View style={styles.container}>
      <Header title='Cadastro de Telefonia' />

      <Input
        placeholder='Número da linha'
        value={line_number}
        onChangeText={value => setLine_Number(value)}
      />

      <Input
        placeholder='Número do chip'
        value={chip_number}
        onChangeText={value => setChip_Number(value)}
      />

      <Input
        placeholder='Plano de dados'
        value={data_plan}
        onChangeText={value => setDataPlan(value)}
      />

      <Input
        placeholder='Número da conta'
        value={account_name}
        onChangeText={value => setAccount_Name(value)}
      />

      <Input
        placeholder='Operadora do Telefone'
        value={telephone_operator}
        onChangeText={value => setTelephone_Operator(value)}
      />

      <Button
        title='Incluir'
        onPress={handleAddTelephone}
      />
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f2f5'
  }
})



