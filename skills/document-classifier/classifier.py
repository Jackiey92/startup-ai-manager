"""Default semantic folder policy; extension and filename are not inputs."""
def classify(text: str) -> str:
    scores = {
        "财务": sum(x in text for x in ("利润", "资产负债", "现金流", "发票", "会计")),
        "技术与产品": sum(x in text for x in ("技术", "产品", "研发", "专利", "规格")),
        "客户与市场": sum(x in text for x in ("客户", "市场", "销售", "订单", "渠道")),
        "法务": sum(x in text for x in ("合同", "诉讼", "知识产权", "法务", "合规")),
    }
    return max(scores, key=scores.get) if max(scores.values()) else "技术与产品"
