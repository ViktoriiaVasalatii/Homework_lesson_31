import React, { useState, useRef } from "react";
import { Table, Tabs, Tree, Carousel, Menu, TabPane } from "antd";
import "./index.css";

const defaultTabs = new Array(5).fill(null).map((_, index) => {
  const id = String(index + 1);
  return {
    label: `Tab ${id}`,
    children: `Контент який знаходиться у цій вкладці ${index + 1}`,
    key: id,
  };
});

const App = () => {
  const [activeKey, setActiveKey] = useState(defaultTabs[0].key);
  const [items, setItems] = useState(defaultTabs);
  const newTabIndex = useRef(0);

  const onChange = (key) => {
    setActiveKey(key);
  };

  const add = () => {
    const newActiveKey = `newTab${Date.now()}`;
    setItems([
      ...items,
      {
        label: "Нова вкладка",
        children: (
          <Table
            dataSource={[
              { key: 1, name: "Elon Musk", age: 51, address: "123 Main St" },
              { key: 2, name: "Elon Musk", age: 51, address: "123 Main St" },
              { key: 3, name: "Elon Musk", age: 51, address: "123 Main St" },
              { key: 4, name: "Elon Musk", age: 51, address: "123 Main St" },
            ]}
            columns={[
              { title: "Name", dataIndex: "name" },
              { title: "Age", dataIndex: "age" },
              { title: "Address", dataIndex: "address" },
            ]}
          />
        ),
        key: newActiveKey,
      },
    ]);
    setActiveKey(newActiveKey);
  };

  const remove = (tabKey) => {
    const keyIndex = items.findIndex((tab) => tab.key === tabKey);
    const newTabs = items.filter((tab) => tab.key !== tabKey);
    if (newTabs.length && tabKey === activeKey) {
      const { key } =
        newTabs[keyIndex === newTabs.length ? keyIndex - 1 : keyIndex];
      setActiveKey(key);
    }
    setItems(newTabs);
  };

  const onEdit = (tabKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(tabKey);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">Option 1</Menu.Item>
      <Menu.Item key="2">Option 2</Menu.Item>
      <Menu.Item key="3">Option 3</Menu.Item>
    </Menu>
  );

  const treeData = [
    {
      title: "Node 1",
      key: "0-0",
      // children: [
      //   {
      //     title: "Child Node 1",
      //     key: "0-0-1",
      //   },
      //   {
      //     title: "Child Node 2",
      //     key: "0-0-2",
      //   },
      // ],
    },
    {
      title: "Node 2",
      key: "0-1",
    },
  ];

  const carouselData = [
    {
      image: "https://via.placeholder.com/400x200",
      caption: "Caption 1",
    },
    {
      image: "https://via.placeholder.com/400x200",
      caption: "Caption 2",
    },
    {
      image: "https://via.placeholder.com/400x200",
      caption: "Caption 3",
    },
  ];
  return (
    <div>
      <Tabs
        activeKey={activeKey}
        onChange={onChange}
        onEdit={onEdit}
        tabBarExtraContent={menu}
        type="editable-card"
      >
        {items.map((tab) => (
          <TabPane tab={tab.label} key={tab.key}>
            {tab.children}
          </TabPane>
        ))}
      </Tabs>
      <Tree
        checkable
        defaultExpandedKeys={['0-0-1', '0-0-2']}
        treeData={treeData}
      />
      <Carousel autoplay>
        {carouselData.map((data, index) => (
          <div key={index}>
            <img src={data.image} alt={data.caption} />
            <p>{data.caption}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export { App as Demo };