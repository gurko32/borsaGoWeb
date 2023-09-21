import { Stock } from './Stock'; // Assuming Stock model is defined in stock.model.ts

export function generateDummyStockData(count: number): Stock[] {
  const dummyData: Stock[] = [];

  for (let i = 1; i <= count; i++) {
    const stock: Stock = new Stock(
      Math.random() * 1000, // Random rate
      Math.random() * 100, // Random last price
      `Last Price ${i}`,
      Math.floor(Math.random() * 10000), // Random hacim
      `Hacim ${i}`,
      Math.random() * 100, // Random min
      `Min ${i}`,
      Math.random() * 200, // Random max
      `Max ${i}`,
      new Date(), // Current time
      `Text ${i}`,
      `Code ${i}`
    );

    dummyData.push(stock);
  }

  return dummyData;
}
