import React from 'react'
import JSONBlock from './components/JSONBlock'

const TestJSONBlock = () => {
  // 测试数据
  const testData = {
    // 基本类型测试
    basicTypes: {
      string: "这是一个字符串",
      number: 42,
      boolean: true,
      null: null,
      undefined: undefined
    },
    
    // 数组测试
    arrays: {
      emptyArray: [],
      stringArray: ["苹果", "香蕉", "橙子", "葡萄"],
      numberArray: [1, 2, 3, 4, 5],
      mixedArray: ["文本", 42, true, { name: "对象" }],
      objectArray: [
        { id: 1, name: "项目1", status: "活跃" },
        { id: 2, name: "项目2", status: "完成" },
        { id: 3, name: "项目3", status: "暂停" }
      ]
    },
    
    // 对象测试
    objects: {
      emptyObject: {},
      simpleObject: { name: "简单对象", value: 100 },
      nestedObject: { 
        level1: { 
          level2: { 
            level3: "嵌套对象" 
          } 
        } 
      }
    },
    
    // 统计数据测试
    stats: {
      simpleStat: { value: 1234, description: "简单统计" },
      trendStat: { value: 5678, description: "趋势统计", trend: "up", change: 15 },
      statArray: [
        { value: 1000, description: "销售额", trend: "up", change: 12 },
        { value: 234, description: "新用户", trend: "up", change: 8 },
        { value: 45, description: "退款", trend: "down", change: 5 }
      ]
    },
    
    // 媒体内容测试
    media: {
      simpleImage: { 
        image: "https://picsum.photos/200/300", 
        caption: "简单图片" 
      },
      mediaArray: [
        { image: "https://picsum.photos/200/300?random=1", caption: "图片1" },
        { image: "https://picsum.photos/200/300?random=2", caption: "图片2" },
        { image: "https://picsum.photos/200/300?random=3", caption: "图片3" }
      ]
    },
    
    // 列表内容测试
    lists: {
      simpleList: { 
        items: ["项目1", "项目2", "项目3"] 
      },
      complexList: { 
        items: [
          { name: "项目1", value: 100 },
          { name: "项目2", value: 200 },
          { name: "项目3", value: 300 }
        ] 
      }
    },
    
    // 循环引用测试
    circularReference: {}
  };
  
  // 创建循环引用
  testData.circularReference.self = testData.circularReference;
  
  // 测试SmartCard
  const cardData = {
    title: "智能卡片测试",
    subtitle: "自动检测最佳卡片类型",
    content: "这是卡片内容",
    footer: "卡片页脚",
    actions: [
      { text: "确定", variant: "primary" },
      { text: "取消", variant: "secondary" }
    ]
  };
  
  // 测试SmartLayout
  const layoutData = {
    title: "智能布局测试",
    description: "自动检测最佳布局类型",
    items: [
      { title: "项目1", content: "内容1" },
      { title: "项目2", content: "内容2" },
      { title: "项目3", content: "内容3" },
      { title: "项目4", content: "内容4" }
    ]
  };
  
  // 特殊类型测试数据
  const specialTypesData = {
    // 表格类型测试
    itemTable: {
      _type: 'itemTable',
      data: [
        { id: 1, name: "产品A", price: 199, stock: 42, category: "电子产品" },
        { id: 2, name: "产品B", price: 299, stock: 18, category: "家居用品" },
        { id: 3, name: "产品C", price: 99, stock: 56, category: "办公用品" },
        { id: 4, name: "产品D", price: 399, stock: 7, category: "电子产品" }
      ]
    },
    
    // 统计类型测试
    statType: {
      _type: 'stat',
      value: 8642,
      description: "总销售额",
      trend: "up",
      change: 23
    },
    
    // 媒体类型测试
    mediaType: {
      _type: 'media',
      url: "https://picsum.photos/400/300",
      caption: "示例图片"
    },
    
    // 混合类型测试
    dashboard: {
      title: "销售仪表盘",
      description: "实时销售数据概览",
      items: [
        {
          title: "总销售额",
          content: {
            _type: 'stat',
            value: 12345,
            description: "本月销售总额",
            trend: "up",
            change: 15
          }
        },
        {
          title: "新客户",
          content: {
            _type: 'stat',
            value: 42,
            description: "本月新增客户",
            trend: "up",
            change: 8
          }
        },
        {
          title: "退款率",
          content: {
            _type: 'stat',
            value: "2.5%",
            description: "本月退款比例",
            trend: "down",
            change: 3
          }
        },
        {
          title: "热销产品",
          content: {
            _type: 'itemTable',
            data: [
              { name: "产品A", sales: 120, revenue: 23880 },
              { name: "产品B", sales: 85, revenue: 25415 },
              { name: "产品C", sales: 65, revenue: 6435 }
            ]
          },
          span: 2
        },
        {
          title: "产品图片",
          content: {
            _type: 'media',
            url: "https://picsum.photos/300/200",
            caption: "最新产品展示"
          }
        }
      ]
    }
  };
  
  return (
    <div className="test-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>JSONBlock 测试</h1>
      
      <section style={{ marginBottom: '40px', padding: '20px', border: '1px solid #eaeaea', borderRadius: '8px' }}>
        <h2 style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '10px', marginBottom: '20px' }}>特殊类型测试</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h3>表格类型 (itemTable)</h3>
            <JSONBlock data={specialTypesData.itemTable} />
          </div>
          <div>
            <h3>统计类型 (stat)</h3>
            <JSONBlock data={specialTypesData.statType} />
          </div>
          <div>
            <h3>媒体类型 (media)</h3>
            <JSONBlock data={specialTypesData.mediaType} />
          </div>
          <div>
            <h3>混合仪表盘</h3>
            <JSONBlock data={specialTypesData.dashboard} />
          </div>
        </div>
      </section>
      
      <section style={{ marginBottom: '40px', padding: '20px', border: '1px solid #eaeaea', borderRadius: '8px' }}>
        <h2 style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '10px', marginBottom: '20px' }}>基本类型测试</h2>
        <JSONBlock data={testData.basicTypes} />
      </section>
      
      <section style={{ marginBottom: '40px', padding: '20px', border: '1px solid #eaeaea', borderRadius: '8px' }}>
        <h2 style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '10px', marginBottom: '20px' }}>数组测试</h2>
        <JSONBlock data={testData.arrays} />
      </section>
      
      <section style={{ marginBottom: '40px', padding: '20px', border: '1px solid #eaeaea', borderRadius: '8px' }}>
        <h2 style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '10px', marginBottom: '20px' }}>对象测试</h2>
        <JSONBlock data={testData.objects} />
      </section>
      
      <section style={{ marginBottom: '40px', padding: '20px', border: '1px solid #eaeaea', borderRadius: '8px' }}>
        <h2 style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '10px', marginBottom: '20px' }}>统计数据测试</h2>
        <JSONBlock data={testData.stats} />
      </section>
      
      <section style={{ marginBottom: '40px', padding: '20px', border: '1px solid #eaeaea', borderRadius: '8px' }}>
        <h2 style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '10px', marginBottom: '20px' }}>媒体内容测试</h2>
        <JSONBlock data={testData.media} />
      </section>
      
      <section style={{ marginBottom: '40px', padding: '20px', border: '1px solid #eaeaea', borderRadius: '8px' }}>
        <h2 style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '10px', marginBottom: '20px' }}>列表内容测试</h2>
        <JSONBlock data={testData.lists} />
      </section>
      
      <section style={{ marginBottom: '40px', padding: '20px', border: '1px solid #eaeaea', borderRadius: '8px' }}>
        <h2 style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '10px', marginBottom: '20px' }}>循环引用测试</h2>
        <JSONBlock data={testData.circularReference} />
      </section>
      
      <section style={{ marginBottom: '40px', padding: '20px', border: '1px solid #eaeaea', borderRadius: '8px' }}>
        <h2 style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '10px', marginBottom: '20px' }}>SmartCard 测试</h2>
        <JSONBlock data={cardData} />
      </section>
      
      <section style={{ marginBottom: '40px', padding: '20px', border: '1px solid #eaeaea', borderRadius: '8px' }}>
        <h2 style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '10px', marginBottom: '20px' }}>SmartLayout 测试</h2>
        <JSONBlock data={layoutData} />
      </section>
    </div>
  );
};

export default TestJSONBlock; 