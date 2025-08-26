# WMS 跟踪号拦截工具库

一个用于识别快递跟踪号和内部SKU编码的JavaScript工具库。

## 🚀 功能特性

- **跟踪号识别**: 自动识别UPS、FedEx、USPS等快递公司的跟踪号
- **SKU编码提取**: 从内部SKU格式中提取实际商品编码
- **即插即用**: 通过script标签直接引入，无需复杂配置
- **命名空间保护**: 使用WMSUtils命名空间，避免全局变量污染

## 📦 支持的快递公司

- **UPS**: 1Z开头的18位跟踪号
- **FedEx**: 多种格式的嵌套条码
- **USPS/FedEx SmartPost**: 420开头的复合跟踪号

## 🛠️ 使用方法

### 1. 直接引入

```html
<script src="wms-utils.js"></script>
```

### 2. 跟踪号识别

```javascript
// 识别UPS跟踪号
const result1 = WMSUtils.getIdentifyTrackNumber('1Z999AA1234567890');
console.log(result1); 
// 输出: { carrier: 'UPS', tracking_number: '1Z999AA1234567890' }

// 识别FedEx跟踪号
const result2 = WMSUtils.getIdentifyTrackNumber('96112345678901234567890123456789');
console.log(result2); 
// 输出: { carrier: 'FedEx', tracking_number: '提取的跟踪号' }

// 未知格式
const result3 = WMSUtils.getIdentifyTrackNumber('unknown123');
console.log(result3); 
// 输出: { carrier: 'Unknown', tracking_number: 'unknown123' }
```

### 3. SKU编码提取

```javascript
// 提取内部SKU编码
const sku1 = WMSUtils.getSkucode('s123456-ABC123');
console.log(sku1); 
// 输出: 'ABC123'

// 非内部SKU格式
const sku2 = WMSUtils.getSkucode('NORMAL-SKU-001');
console.log(sku2); 
// 输出: 'NORMAL-SKU-001'
```

### 4. 其他实用方法

```javascript
// 获取版本信息
console.log(WMSUtils.version); // 输出: '1.0.0'

// 获取支持的快递公司列表
console.log(WMSUtils.getSupportedCarriers()); 
// 输出: ['UPS', 'FedEx', 'USPS/FedEx SmartPost']
```

## 📁 项目结构

```
wms-intercept-trucknumber/
├── wms-utils.js        # 主工具库文件
├── example.html        # 使用示例
└── README.md          # 项目说明文档
```

## 🧪 在线测试

打开 `example.html`[https://htmlpreview.github.io/?https://github.com/jun454647/wms-intercept-trucknumber/blob/master/example.html] 文件即可在浏览器中测试工具库的各种功能。

## 📋 版本历史

- **v1.0.0** - 初始版本，包含跟踪号识别和SKU编码提取功能

## 🤝 贡献

欢迎提交Issues和Pull Requests来改进这个工具库。

## �� 许可证

MIT License 
