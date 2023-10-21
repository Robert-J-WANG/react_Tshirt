// 实例化一个Intl对象，调用去数字格式话的端口，设置格式化的配置
const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "NZD",
  style: "currency",
});

export function formatCurrency(price: number) {
  return CURRENCY_FORMATTER.format(price);
}
