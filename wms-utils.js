/**
 * WMS工具库 - 跟踪号和SKU识别工具
 * 可以通过script标签直接引入使用
 * 作者: WMS团队
 * 版本: 1.0.0
 */

// 创建全局命名空间，避免污染全局作用域
window.WMSUtils = window.WMSUtils || {};

/**
 * 识别跟踪号 - 根据扫描的原始数据识别快递公司和跟踪号
 * @param {string} rawScan - 原始扫描数据
 * @returns {Object} - 返回包含carrier（快递公司）和tracking_number（跟踪号）的对象
 */
window.WMSUtils.getIdentifyTrackNumber = function(rawScan) {
    if (!rawScan) return { carrier: 'Unknown', tracking_number: '' };

    // 数据清洗：去除前后空格
    const cleaned = rawScan.trim();

    // UPS: 1Z开头，后面16位字母或数字
    if (/^1Z[0-9A-Z]{16}$/.test(cleaned)) {
        return { carrier: 'UPS', tracking_number: cleaned };
    }
    // FedEx嵌套条码: 963109 + 16位 + tracking
    // Fedex国际件服务码: 18 + 主跟踪号12 + 日期/序列 + 辅助跟踪号12
    else if (cleaned.length == 34 && (/^96\d{20}\d+$/.test(cleaned) || /^18\d{20}\d+$/.test(cleaned))) {
        let tracking = '';
        if (/^96\d{20}\d+$/.test(cleaned)) {
            tracking = cleaned.replace(/^96\d{20}/, '');
        } else if (/^18\d{20}\d+$/.test(cleaned)) {
            tracking = cleaned.replace(/^18\d{20}/, '');
        }
        return { carrier: 'FedEx', tracking_number: tracking || cleaned };
    } 
    // USPS/FedEx SmartPost 处理
    else if (/^420\d{5,9}(\d{20,22})$/.test(cleaned)) {
        let tracking = '';
        if (/^420\d{9}/.test(cleaned) && /^\d{20,22}$/.test(cleaned.replace(/^420\d{9}/, ''))) {
            tracking = cleaned.replace(/^420\d{9}/, '');
        }
        if (!tracking && /^420\d{5}/.test(cleaned) && /^\d{20,22}$/.test(cleaned.replace(/^420\d{5}/, ''))) {
            tracking = cleaned.replace(/^420\d{5}/, '');
        }
        
        // 获取FedEx SmartPost | USPS
        if (/^(92|93|94|95)(\d{18,20})+$/.test(tracking)) {
            if (/^612(\d{17})+$/.test(tracking.replace(/^(92|93|94|95)/, ''))) {
                tracking = tracking.replace(/^(92|93|94|95)/, '');
            }
        }
        return { carrier: 'USPS/FedEx SmartPost', tracking_number: tracking || cleaned };
    }
    // 未知快递公司
    else {
        return { carrier: 'Unknown', tracking_number: cleaned };
    }
};

/**
 * 识别内部SKU编码 - 从SKU字符串中提取实际的商品编码
 * @param {string} sku - SKU字符串
 * @returns {string} - 返回提取后的商品编码
 */
window.WMSUtils.getSkucode = function(sku) {
    if (!sku) return '';
    
    const cleaned = sku.trim();
    
    // 内部SKU格式：s + 6位数字 + 连字符 + 商品编码
    if (/^s\d{6}-[a-zA-Z0-9-]+$/.test(cleaned)) {
        // 提取s######-后面的部分作为实际SKU
        return cleaned.replace(/^s\d{6}-/, '');
    }
    // 如果不是内部SKU格式，直接返回原始值
    else {
        return cleaned;
    }
};

/**
 * 工具库版本信息
 */
window.WMSUtils.version = '1.0.0';

/**
 * 获取支持的快递公司列表
 */
window.WMSUtils.getSupportedCarriers = function() {
    return ['UPS', 'FedEx', 'USPS/FedEx SmartPost'];
};

// 控制台输出加载信息
console.log('WMS工具库已加载 - 版本:', window.WMSUtils.version); 
