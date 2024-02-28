import { useEffect, useState } from 'react';
import { history } from 'umi';
import { Table, Button } from 'antd';
import dayjs from 'dayjs';

export default function HomePage() {
  const [list, setList] = useState([]);

  const getUserEventList = async () => {
    // const response = await fetch('http://localhost:3000/getAllUserLatestEventList');
    // const result = await response.json();
    // setList(result.data);
  };


  useEffect(() => {
    // console.log(location);
    getUserEventList();
  }, []);

  const columns = [
    {
      dataIndex: 'user_name',
      title: "用户名称",
    },
    {
      dataIndex: 'timestamp',
      title: '最近操作时间',
      render: (timestamp: string) => dayjs(+timestamp).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      render: (row: any) => {
        return <Button onClick={() => history.push(`/event?userName=${row.user_name}`)}>查看</Button>
      },
    },
  ];

  return (
    <div>
      <Table dataSource={list} columns={columns} rowKey="timestamp" pagination={false} />
    </div>
  );
}
