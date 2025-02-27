import React, { useMemo, useContext, createContext } from 'react'
import SmartLayout from './patterns/SmartLayout'
import SmartCard from './patterns/SmartCard'
import { detectContentType, isCustomContent } from '../utils/contentTypes'

// Create a context for sharing rendering configuration and seen objects
const JSONBlockContext = createContext({
  config: {},
  seenObjects: new WeakSet(),
  depth: 0,
  path: []
});

/**
 * JSONBlock - 智能JSON渲染组件 2.0
 * 
 * 核心理念：打破常规，简化复杂度
 * 1. 上下文感知 - 使用React Context传递配置和状态，避免props drilling
 * 2. 路径追踪 - 自动跟踪渲染路径，支持更精确的定制
 * 3. 记忆化渲染 - 使用useMemo优化性能
 * 4. 插件系统 - 支持自定义渲染器和转换器
 * 5. 声明式配置 - 使用函数式API简化配置
 */

const JSONBlock = ({ data, config = {}, path = [] }) => {
  // 创建记忆化的上下文值
  const contextValue = useMemo(() => ({
    config,
    seenObjects: new WeakSet(),
    depth: 0,
    path
  }), [config, path]);
  
  // 无效数据处理
  if (data === undefined || data === null) {
    return <div className="empty-state">无数据</div>
  }
  
  // 使用上下文提供器包装渲染
  return (
    <JSONBlockContext.Provider value={contextValue}>
      <JSONBlockRenderer data={data} />
    </JSONBlockContext.Provider>
  )
}

/**
 * 内部渲染组件 - 使用上下文
 */
const JSONBlockRenderer = ({ data }) => {
  const context = useContext(JSONBlockContext);
  
  // 基本类型直接显示
  if (typeof data !== 'object') {
    return <div className="primitive-value">{String(data)}</div>
  }

  // 智能渲染策略
  return smartRender(data, context)
}

/**
 * 智能渲染函数 - 核心逻辑
 * 打破常规：使用函数式API和插件系统
 */
function smartRender(data, context) {
  const { config, seenObjects, depth, path } = context;
  
  // 防止循环引用导致无限递归
  if (typeof data === 'object' && data !== null) {
    if (seenObjects.has(data)) {
      return <div className="circular-reference">[循环引用]</div>;
    }
    seenObjects.add(data);
  }
  
  // 防止过深递归
  if (depth > (config.maxDepth || 10)) {
    return <div className="max-depth-reached">[达到最大深度]</div>;
  }
  
  // 创建新的上下文
  const newContext = {
    ...context,
    depth: depth + 1
  };
  
  // 应用自定义渲染器 (插件系统)
  if (config.renderers) {
    for (const renderer of config.renderers) {
      const result = renderer(data, newContext);
      if (result !== undefined) return result;
    }
  }
  
  // 1. 自定义组件类型处理
  if (isCustomContent(data)) {
    return renderCustomComponent(data, newContext);
  }
  
  // 2. 数组处理
  if (Array.isArray(data)) {
    return renderArray(data, newContext);
  }
  
  // 3. 空对象处理
  if (Object.keys(data).filter(key => !key.startsWith('_')).length === 0) {
    return <div className="empty-state">空对象</div>
  }
  
  // 4. 已经是SmartLayout格式的数据
  if (data.items && Array.isArray(data.items)) {
    return <SmartLayout data={data} />
  }
  
  // 5. 已经是SmartCard格式的数据
  if ((data.title && data.content) || data.image || 
      (typeof data === 'object' && ('value' in data || 'image' in data))) {
    return <SmartCard data={data} />
  }
  
  // 6. 普通对象 - 智能转换为最佳格式
  return renderObject(data, newContext);
}

/**
 * 自定义组件渲染
 */
function renderCustomComponent(data, context) {
  const { config } = context;
  const { _type, ...props } = data;
  
  // 查找自定义组件渲染器
  if (config.components && config.components[_type]) {
    const Component = config.components[_type];
    return <Component {...props} />;
  }
  
  // 默认渲染为卡片
  return <SmartCard 
    data={{
      title: _type,
      content: <pre className="text-xs">{JSON.stringify(props, null, 2)}</pre>
    }} 
  />;
}

/**
 * 数组智能渲染 - 使用上下文
 */
function renderArray(array, context) {
  const { config, path } = context;
  
  // 空数组处理
  if (array.length === 0) {
    return <div className="empty-state">空数组</div>
  }
  
  // 检测数组内容类型
  const contentTypes = array.map(item => detectContentType(item));
  const primaryType = getMostCommonType(contentTypes);
  
  // 如果数组元素主要是对象且具有相似结构，渲染为表格
  if (primaryType === 'generic' && array.every(item => typeof item === 'object' && item !== null)) {
    const hasConsistentKeys = hasSimilarStructure(array);
    
    if (hasConsistentKeys) {
      // 转换为SmartLayout表格格式
      return <SmartLayout data={{
        items: array,
        config: {
          layoutType: 'table',
          ...config.tableConfig
        }
      }} />;
    }
  }
  
  // 渲染为网格或列表
  return <SmartLayout data={{
    items: array.map((item, index) => {
      // 为每个项目创建新的路径
      const itemPath = [...path, index];
      
      // 递归渲染每个项目
      return {
        content: (
          <JSONBlockContext.Provider 
            value={{...context, path: itemPath}}
          >
            <JSONBlockRenderer data={item} />
          </JSONBlockContext.Provider>
        )
      };
    }),
    config: {
      layoutType: array.length > 3 ? 'grid' : 'list',
      ...config.arrayConfig
    }
  }} />;
}

/**
 * 对象智能渲染 - 使用上下文
 */
function renderObject(obj, context) {
  const { config, path } = context;
  const entries = Object.entries(obj).filter(([key]) => !key.startsWith('_'));
  
  // 提取元数据
  const metadata = Object.entries(obj)
    .filter(([key]) => key.startsWith('_') && key !== '_type')
    .reduce((acc, [key, value]) => {
      acc[key.substring(1)] = value;
      return acc;
    }, {});
  
  // 智能决策：是否应该渲染为卡片
  if (shouldUseSmartCard(obj, entries)) {
    return renderAsSmartCard(obj, entries, metadata, context);
  }
  
  // 默认渲染为属性列表
  return renderAsSmartLayout(obj, entries, metadata, context);
}

/**
 * 判断对象是否应该渲染为卡片
 */
function shouldUseSmartCard(obj, entries) {
  // 如果有title或name属性，倾向于使用卡片
  const hasTitle = entries.some(([key]) => 
    ['title', 'name', 'header', 'subject'].includes(key.toLowerCase())
  );
  
  // 如果有描述类属性，倾向于使用卡片
  const hasDescription = entries.some(([key]) => 
    ['description', 'desc', 'summary', 'content', 'text', 'body'].includes(key.toLowerCase())
  );
  
  // 如果有图片类属性，倾向于使用卡片
  const hasImage = entries.some(([key]) => 
    ['image', 'img', 'avatar', 'thumbnail', 'cover', 'photo'].includes(key.toLowerCase())
  );
  
  return (hasTitle && (hasDescription || hasImage)) || hasImage;
}

/**
 * 渲染为SmartCard
 */
function renderAsSmartCard(obj, entries, metadata, context) {
  // 查找标题
  const titleEntry = entries.find(([key]) => 
    ['title', 'name', 'header', 'subject'].includes(key.toLowerCase())
  );
  
  // 查找描述
  const descEntry = entries.find(([key]) => 
    ['description', 'desc', 'summary', 'content', 'text', 'body'].includes(key.toLowerCase())
  );
  
  // 查找图片
  const imageEntry = entries.find(([key]) => 
    ['image', 'img', 'avatar', 'thumbnail', 'cover', 'photo'].includes(key.toLowerCase())
  );
  
  // 构建卡片数据
  const cardData = {
    ...metadata,
    title: titleEntry ? obj[titleEntry[0]] : undefined,
    description: descEntry ? obj[descEntry[0]] : undefined,
    image: imageEntry ? obj[imageEntry[0]] : undefined,
    // 过滤掉已经使用的属性
    content: (
      <div className="grid grid-cols-1 gap-2">
        {entries
          .filter(([key]) => 
            key !== (titleEntry?.[0]) && 
            key !== (descEntry?.[0]) && 
            key !== (imageEntry?.[0])
          )
          .map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">{key}</span>
              <JSONBlockContext.Provider 
                value={{...context, path: [...context.path, key]}}
              >
                <JSONBlockRenderer data={value} />
              </JSONBlockContext.Provider>
            </div>
          ))
        }
      </div>
    )
  };
  
  return <SmartCard data={cardData} />;
}

/**
 * 渲染为SmartLayout
 */
function renderAsSmartLayout(obj, entries, metadata, context) {
  return (
    <SmartLayout 
      data={{
        ...metadata,
        items: entries.map(([key, value]) => ({
          title: key,
          content: (
            <JSONBlockContext.Provider 
              value={{...context, path: [...context.path, key]}}
            >
              <JSONBlockRenderer data={value} />
            </JSONBlockContext.Provider>
          )
        })),
        config: {
          layoutType: entries.length > 6 ? 'grid' : 'list',
          ...context.config.objectConfig
        }
      }} 
    />
  );
}

/**
 * 获取最常见的类型
 */
function getMostCommonType(types) {
  const counts = types.reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    [0][0];
}

/**
 * 检查数组是否有相似结构
 */
function hasSimilarStructure(array) {
  if (array.length < 2) return true;
  
  // 获取第一个对象的键
  const firstKeys = Object.keys(array[0]).sort();
  
  // 检查所有对象是否有相似的键
  return array.every(item => {
    const keys = Object.keys(item).sort();
    // 至少有70%的键相同
    const commonKeys = keys.filter(key => firstKeys.includes(key));
    return commonKeys.length >= Math.min(firstKeys.length, keys.length) * 0.7;
  });
}

export default JSONBlock;
