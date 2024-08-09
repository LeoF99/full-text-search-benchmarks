/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import axios from 'axios';

const FILE_PATH = path.join(__dirname, '..', '..', 'assets', 'recipes.csv');

const URL = 'http://localhost:3000';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const client = axios.create({
  baseURL: URL,
  headers: {
    'X-API-KEY': '1ab2c3d4e5f61ab2c3d4e5f6',
  },
});

async function processCsvFile(
  filePath: string,
  callback: (data: any) => Promise<void>,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const readStream = fs.createReadStream(filePath);
    readStream
      .pipe(csv())
      .on('data', async (data) => {
        await callback(data);
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        resolve();
      })
      .on('error', (error) => {
        console.error(error);
        reject(error);
      });
  });
}

function parseArrayStringToString(arrayString: string): string {
  try {
    const cleanedString = arrayString.slice(1, -1);

    const stringsArray = cleanedString.split(', ');

    return stringsArray.map((str) => str.replace(/"/g, '')).join('; ');
  } catch (error) {
    return null;
  }
}

async function populateRecipesTable(data: any): Promise<void> {
  const payload = {
    recipes: [
      {
        title: data.title,
        ingredients: parseArrayStringToString(data.ingredients),
        instructions: parseArrayStringToString(data.directions),
      },
    ],
  };

  if (
    payload.recipes[0].ingredients === null ||
    payload.recipes[0].instructions === null
  ) {
    return;
  }

  await client.post('/recipes', payload);
}

async function main(): Promise<void> {
  await processCsvFile(FILE_PATH, populateRecipesTable);
}

main();
