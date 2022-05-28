import { useState, useEffect, useCallback, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, FlatList, Alert, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { Header } from "../../components/Header";
import { ListCard } from "../../components/ListCard";

interface ListTelephonyProps {
  id: string;
  line_number: string;
  chip_number: string;
  data_plan: string;
  account_name: string;
  telephone_operator: string;
  ddd?: string;
}

function groupBy(list = [], key) {
  return list?.reduce(
    (accumulator, item) => ({
      ...accumulator,
      [item[key]]: [...(accumulator[item[key]] || []), item],
    }),
    {}
  );
}

function appendDDD(data) {
  return data.map(item => ({
    ...item,
    ddd: item?.line_number?.substring(0, 2)
  }))
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function Total() {
  const [telephonyData, setTelephonyData] = useState<ListTelephonyProps[]>([]);

  const groupedByOperator = useMemo(
    () => groupBy(telephonyData, "telephone_operator"),
    [telephonyData]
  );

  const groupedByPlan = useMemo(
    () => groupBy(telephonyData, "data_plan"),
    [telephonyData]
  );

  const groupedByDDD = useMemo(
    () => groupBy(telephonyData, "ddd"),
    [telephonyData]
  );

  const loadData = useCallback(() => {
    AsyncStorage.getItem("@mytelephony:telephone")
      .then((data) => (data ? JSON.parse(data) : []))
      .then(appendDDD)
      .then(setTelephonyData);
  }, []);

  useEffect(loadData, [loadData]);
  useFocusEffect(loadData);

  console.log({groupedByOperator, groupedByPlan, groupedByDDD});

  return (
    <View style={styles.container}>
      <Header title="Listam de telefonia" />

      <Text>Total de linhas cadastradas: {telephonyData?.length}</Text>

      <View>
        {Object.entries(groupedByOperator).map(([operator, arr]) => (
          <Text key={operator}>
            Total de linhas {capitalize(operator)}: {arr.length}
          </Text>
        ))}
      </View>

      <View>
        {Object.entries(groupedByPlan).map(([plan, arr]) => (
          <Text key={plan}>
            Total de linhas {plan}GB: {arr.length}
          </Text>
        ))}
      </View>

      <View>
        {Object.entries(groupedByDDD).map(([ddd, arr]) => (
          <Text key={ddd}>
            Total de linhas DDD {ddd}: {arr.length}
          </Text>
        ))}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f0f2f5",
  },
});
