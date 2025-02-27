import React from "react";
import { useState, useEffect } from "react";
import JSONBlock from "./components/JSONBlock";
import "./App.css";

// Import example data files
import basicExamples from "./data/basicExamples";
import advancedExamples from "./data/advancedExamples";
import arrayExamples from "./data/arrayExamples";
import gridLayoutExamples from "./data/gridLayoutExamples";
import unifiedLayoutExamples from "./data/unifiedLayoutExamples";

// Define the example type
type ExampleType = "basic" | "nested" | "array" | "grid" | "unified";

const App: React.FC = () => {
  // State for controlling which example set to display
  const [currentExample, setCurrentExample] = useState<ExampleType>("basic");
  const [showConventionInfo, setShowConventionInfo] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Get the current data set based on active example
  const getCurrentData = () => {
    switch (currentExample) {
      case "nested":
        return advancedExamples;
      case "array":
        return arrayExamples;
      case "grid":
        return gridLayoutExamples;
      case "unified":
        return unifiedLayoutExamples;
      case "basic":
      default:
        return basicExamples;
    }
  };

  return (
    <div className="max-w-[1200px] w-[95%] mx-auto p-6 bg-background text-foreground rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-semibold">
          Smart JSON Component Renderer
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="btn btn-outline"
          aria-label={darkMode ? "切换到亮色模式" : "切换到暗色模式"}
        >
          {darkMode ? "🌞" : "🌙"}
        </button>
      </div>
      <p className="mb-6">
        This system intelligently matches components based on data patterns or
        explicit type declarations.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setCurrentExample("basic")}
          className={`btn ${currentExample === "basic" ? "btn-primary" : ""}`}
        >
          基础示例
        </button>
        <button
          onClick={() => setCurrentExample("nested")}
          className={`btn ${currentExample === "nested" ? "btn-primary" : ""}`}
        >
          嵌套示例
        </button>
        <button
          onClick={() => setCurrentExample("array")}
          className={`btn ${currentExample === "array" ? "btn-primary" : ""}`}
        >
          数组示例
        </button>
        <button
          onClick={() => setCurrentExample("grid")}
          className={`btn ${currentExample === "grid" ? "btn-primary" : ""}`}
        >
          网格布局示例
        </button>
        <button
          onClick={() => setCurrentExample("unified")}
          className={`btn ${currentExample === "unified" ? "btn-primary" : ""}`}
        >
          统一布局系统
        </button>
        <button
          onClick={() => setShowConventionInfo(!showConventionInfo)}
          className="btn btn-secondary"
        >
          {showConventionInfo ? "隐藏设计理念" : "显示设计理念"}
        </button>
      </div>

      {showConventionInfo && (
        <div className="card p-6 mb-6 bg-muted/30">
          <h2 className="text-xl font-bold mb-3">约定大于配置的设计理念</h2>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong>减少配置复杂度</strong> -
              通过智能默认值和自动检测，减少显式配置的需求
            </li>
            <li>
              <strong>降低认知负担</strong> -
              开发者只需关注业务数据，而非布局细节
            </li>
            <li>
              <strong>提高开发效率</strong> - 更少的代码，更快的开发速度
            </li>
            <li>
              <strong>保持灵活性</strong> - 需要时仍可进行细粒度控制
            </li>
          </ul>
          <p className="text-muted-foreground">
            这种设计理念让我们能够用更少的代码实现更丰富的功能，同时保持代码的可维护性。
          </p>
        </div>
      )}

      {currentExample === "grid" ? (
        <div className="card p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">高级网格布局</h2>
          <JSONBlock data={gridLayoutExamples} />
        </div>
      ) : (
        <div className="card p-6 mb-6">
          <JSONBlock data={getCurrentData()} />
        </div>
      )}

      <div className="card bg-muted p-6 rounded">
        <h3 className="text-lg font-bold mb-2">使用方法：</h3>
        <pre className="bg-card p-4 rounded mb-4 text-sm font-mono">{`<JSONBlock data={yourJsonData} />`}</pre>
        <p className="mb-4">
          系统会根据数据结构或显式类型声明自动渲染适当的组件。
        </p>

        <h4 className="text-md font-semibold mb-2">约定大于配置的示例：</h4>
        <pre className="bg-card p-4 rounded mb-2 text-sm font-mono">{`// 极简配置，系统会自动检测布局类型
{
  _type: "unifiedLayout",
  title: "仪表盘",
  items: [
    { title: "销售额", content: { value: "¥128,430" } },
    { title: "用户数", content: { value: "8,240" } }
  ]
}`}</pre>
        <p className="text-muted-foreground text-sm">
          无需指定布局类型、列数等配置，系统会根据数据结构自动选择最合适的布局。
        </p>
      </div>
    </div>
  );
};

export default App;
