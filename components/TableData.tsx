import React from 'react';
import { Text, FlatList } from 'react-native';
import Table from './Table';

type Transaction = {
  Amount: number;
  ContactName: string;
  DateHour: string;
  TransactionType: string;
  TransactionId: number;
};

const TableData = ({ transactions, onSelectTransaction }: { transactions: Transaction[], onSelectTransaction: (transaction: Transaction) => void }) => {
  // if any transaction exist
  if (!transactions || transactions.length === 0) {
    return <Text style={{ fontSize: 12, fontFamily: 'RedHatDisplay_700Bold' }}>No ha realizado ninguna transacción.</Text>;
  }

  // format currency
  const formatCurrency = (value: number) => {
    return `¢${value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Format hour
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dateFormatter = new Intl.DateTimeFormat('es-CR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
    const timeFormatter = new Intl.DateTimeFormat('es-CR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    return `${dateFormatter.format(date)} ${timeFormatter.format(date).toLowerCase()}`;
  };

  // Format to send data to table
  const mappedTransactions = transactions.map((item) => ({
    title: `${item.TransactionType} - ${item.ContactName}`,
    subtitle: `${formatDate(item.DateHour)}`,
    number: `- ${formatCurrency(item.Amount)}`,
    transaction: item,
  }));

  return (
    <Table
      data={mappedTransactions}
      onSelectTransaction={onSelectTransaction} // send transaction selected
    />
  );
};

export default TableData;
