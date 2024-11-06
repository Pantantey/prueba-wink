import React from 'react';
import { SafeAreaView } from 'react-native';
import Table from './Table';


//Formats currency values to CRC.
const TableData = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      minimumFractionDigits: 2,
    }).format(value);
  };

  // Data for the table
  const tableData = [
    { title: 'SINPE móvil - Arturo Robles', subtitle: 'Hoy 10:12 a.m', number: formatCurrency(-1850.00) },
    { title: 'Dato 2', subtitle: 'Detalle 2', number: formatCurrency(305345) },
    { title: 'Dato 3', subtitle: 'Detalle 3', number: formatCurrency(723453) },
    { title: 'Dato 4', subtitle: 'Detalle 3', number: formatCurrency(72546) },
    { title: 'SINPE móvil - Maria Pérez', subtitle: '11/10/22 11:30 a.m', number: formatCurrency(1850.00) },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Table data={tableData} />
    </SafeAreaView>
  );
};

export default TableData;
