import { Request, Response } from 'express';
import axios from 'axios';
import { Client } from '@notionhq/client';
import config from '../config/config';
import ical from 'ical';

const client = new Client({ auth: config.apikey });

const getCal = async (req: Request, res: Response) => {
  (async () => {
    const response = await client.databases.query({ database_id: config.dbkey });
    console.log(response);
  })();
}

const createAll = async (req: Request, res: Response) => {
  const response = await axios(config.caladdr[0]);
  const data = ical.parseICS(response.data);

  const events = Object.values(data)
  .filter((event: any) => event.type === "VEVENT")
  .map((event: any) => ({
    uid: event.uid,
    summary: event.summary,
    start: event.start,
    end: event.end
  }));
    // parse data

  events.forEach(async (e) => {
    await client.pages.create({
      parent: {
        database_id: config.dbkey
      },
      properties: {
        Id: e.uid,
        Name: {
          type: 'title',
          title: [
            {
              type: 'text',
              text: {
                content: e.summary,
              },
            },
          ],
        },
        Date: {
          type: 'date',
          date: {
            start: e.start,
            end: e.end
          }
        }
      }
    });
  })
  res.send(data);
}

export default { createAll, getCal }