import {
  View,
  TouchableOpacity,
  Text, StyleSheet,
  TouchableOpacityProps
} from 'react-native'

interface ListTelephonyProps {
  id: string,
  line_number: string,
  chip_number: string,
  data_plan: string,
  account_name: string,
  telephone_operator: string
}

interface ListCardProps extends TouchableOpacityProps {
  item: ListTelephonyProps;
}

export function ListCard({ item, ...rest }: ListCardProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonCard}
        key={item.id}
        {...rest}>
        <Text style={styles.titleCard}>Dados da Linha</Text>
        <Text style={styles.textCard}>Número da linha: {item.line_number}</Text>
        <Text style={styles.textCard}>Número do Chip: {item.chip_number}</Text>
        <Text style={styles.textCard}>Plano de dados: {item.data_plan}</Text>
        <Text style={styles.textCard}>Número da Conta: {item.account_name}</Text>
        <Text style={styles.textCard}>Operadora do Telefone: {item.telephone_operator}</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
  },
  buttonCard: {
    width: '100%',
    padding: 6,
    backgroundColor: '#969CB2',
    borderRadius: 10
  },
  textCard: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    flexDirection: 'row',
  },
  titleCard: {
    color: '#ff872c',
    fontSize: 26,
    fontWeight: 'bold',
    flexDirection: 'row',
  }
})




